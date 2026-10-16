/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * negotiation-engine.js - Motor Determinista de Negociación y Máquina de Estados
 * 
 * Principios de diseño:
 * 1. Determinismo estricto: Decisiones reproducibles basadas en funciones de utilidad ponderada y umbrales.
 * 2. ZOPA y Curvas de Concesión: Simulación de contraparte según mejores prácticas del Harvard PON y modelos ITC.
 * 3. Gestión de Dealbreakers: Validación rigurosa de techos presupuestales y cláusulas inadmisibles.
 * 4. Generación de contraofertas estructuradas y objeciones contextuales en español de negocios.
 * 5. Arquitectura desacoplada y lista para conector de IA (backend seguro).
 */

class NegotiationEngine {
  constructor(scenario, mode = "fixed_rules") {
    if (!scenario) throw new Error("Se requiere un escenario para inicializar el motor.");
    this.scenario = scenario;
    this.mode = mode; // 'fixed_rules' | 'ai_assisted'
    
    // Límites de la negociación
    this.maxRounds = 5;
    this.currentRound = 1;
    
    // Estados: 'not_started' | 'negotiating' | 'agreement_reached' | 'rejected' | 'deadlock'
    this.status = "not_started";
    
    // Historial y registro de propuestas
    this.chatLog = [];
    this.offersHistory = []; // { round, sender: 'exporter'|'buyer', offer: {...}, utilityBuyer, timestamp }
    
    // Oferta actual en la mesa
    this.currentExporterOffer = null;
    this.currentBuyerCounterOffer = null;
    this.finalAgreedOffer = null;
    
    // Inicializar valores por defecto del comprador
    this.initializeEngine();
  }

  /**
   * Inicializa el estado con la postura inicial del comprador y del exportador.
   */
  initializeEngine() {
    const initialBuyerOffer = {};
    const initialExporterOffer = {};

    this.scenario.negotiableVariables.forEach(v => {
      initialBuyerOffer[v.id] = v.initialBuyer;
      initialExporterOffer[v.id] = v.initialExporter;
    });

    this.currentBuyerCounterOffer = { ...initialBuyerOffer };
    this.currentExporterOffer = { ...initialExporterOffer };
    this.status = "negotiating";

    // Registrar mensaje de apertura formal del comprador
    const openingMsg = this.generateOpeningMessage();
    this.chatLog.push({
      id: "msg-" + Date.now(),
      sender: "buyer",
      senderName: this.scenario.buyerConfidentialProfile.buyerName,
      senderRole: this.scenario.buyerConfidentialProfile.buyerRole,
      company: this.scenario.buyerConfidentialProfile.companyName,
      round: 1,
      text: openingMsg,
      offer: { ...this.currentBuyerCounterOffer },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  /**
   * Genera el saludo y encuadre inicial del comprador según su perfil cultural y corporativo.
   */
  generateOpeningMessage() {
    const buyer = this.scenario.buyerConfidentialProfile;
    const country = this.scenario.buyerCountry;

    if (this.scenario.id === "SCN-01") {
      return `Estimados colegas de InkaTech: Agradecemos su propuesta para el squad ágil. En Cencor Retail Chile valoramos mucho la calidad técnica peruana, pero nuestro directorio ha fijado un marco presupuestal estricto para este ejercicio. Iniciamos con una tarifa referencial de 42 USD/h, pago a 60 días y 6 meses de garantía con cesión integral de código. Escuchamos su contrapropuesta estructurada.`;
    } else if (this.scenario.id === "SCN-02") {
      return `Bienvenidos a la mesa de negociación. Vemos un potencial internacional genuino en su proyecto de animación 3D, pero en el panorama de distribución actual los riesgos comerciales son elevados. Nuestra postura de apertura considera una Garantía Mínima de 225,000 USD, derechos de distribución mundial y corte final reservado al distribuidor. Analicemos cómo acercarnos a un acuerdo beneficioso para ambas partes.`;
    } else if (this.scenario.id === "SCN-03") {
      return `Saludos cordiales desde Berna. En Chocolats Fins de Berne apreciamos la alta reputación del cacao fino de aroma peruano y su certificación orgánica. No obstante, las normativas europeas y los estándares de sostenibilidad nos exigen una rigurosa disciplina de precios y trazabilidad. Nuestra propuesta inicial es de 4,600 USD/TM FOB Callao con prima de 300 USD y pago diferido a 60 días tras recepción en puerto. Quedamos a la espera de sus términos.`;
    } else if (this.scenario.id === "SCN-04") {
      return `¡Hola a todo el equipo! En Nordic-Rhine nos cautivó el prototipo de su videojuego independiente. Publicar un indie hoy exige una inversión colosal en visibilidad y marketing. Nuestra oferta inicial considera un adelanto de 110,000 USD por hitos de desarrollo, 50% de participación en ingresos tras recuperar adelantos y 9 meses de exclusividad temporal en plataformas. Queremos conocer su contraoferta técnica y económica.`;
    } else if (this.scenario.id === "SCN-05") {
      return `Estimados amigos de ViralPeak: En ModaYa México nos apasiona el talento digital peruano. Queremos un aliado estratégico a largo plazo, pero necesitamos cuidar el flujo de caja inicial con un fee base de 5,500 USD/mes, pago a 60 días y un esquema agresivo de bonos donde ustedes ganen cuando nosotros superemos el ROAS meta. ¿Qué números tienen en mente?`;
    } else {
      return `Estimados ingenieros: En Minera Sierra de Plata requerimos máxima rigurosidad pericial para la presa de jales. Nuestro presupuesto inicial para este estudio es de 105,000 USD con entrega en 10 semanas y anticipo del 15% para movilización. Quedamos a la espera de su postura técnica.`;
    }
  }

  /**
   * Evalúa la utilidad del comprador frente a una oferta dada U_buyer in [0, 1].
   */
  calculateBuyerUtility(offer) {
    const buyer = this.scenario.buyerConfidentialProfile;
    const weights = buyer.weights;
    let totalUtility = 0;
    let dealbreakerTriggered = false;
    let dealbreakerReason = "";

    this.scenario.negotiableVariables.forEach(v => {
      const val = offer[v.id];
      const weight = weights[v.id] || 0.1;
      let varScore = 0;

      if (v.type === "numeric") {
        // En precio/costo para el comprador: menor precio = mayor utilidad
        if (v.id.includes("price") || v.id.includes("fee") || v.id.includes("rate") || v.id.includes("advance_advance") || v.id.includes("minimum_guarantee") || v.id.includes("milestone_advance")) {
          const target = buyer.targetPrice || buyer.targetAdvance || (v.min + (v.max - v.min) * 0.3);
          const walkaway = buyer.maxReservationPrice || buyer.maxAdvanceAllowed || v.max;

          if (val > walkaway) {
            dealbreakerTriggered = true;
            dealbreakerReason = `El valor de ${v.name} (${val}) supera el límite de reserva máximo del comprador (${walkaway}).`;
            varScore = -0.5;
          } else if (val <= target) {
            varScore = 1.0;
          } else {
            // Escala lineal decreciente entre target y walkaway
            varScore = Math.max(0, 1 - (val - target) / (walkaway - target));
          }
        } 
        // En anticipo: el comprador prefiere pagar MENOR anticipo
        else if (v.id.includes("advance")) {
          const maxAdv = buyer.maxAcceptableAdvance || buyer.maxAdvanceAllowed || 30;
          if (val > maxAdv) {
            varScore = 0.1;
          } else {
            varScore = 1 - (val / Math.max(1, maxAdv));
          }
        }
        // En plazo de pago: comprador prefiere MÁS días de crédito
        else if (v.id.includes("payment_term") || v.id.includes("payment_terms_days")) {
          const minDays = buyer.minPaymentDaysAllowed || 30;
          const targetDays = buyer.targetPaymentDays || 60;
          if (val < minDays) {
            varScore = 0.2;
          } else {
            varScore = Math.min(1.0, 0.4 + (val - minDays) / (targetDays - minDays) * 0.6);
          }
        }
        // En garantía/SLA: comprador prefiere MÁS meses de garantía
        else if (v.id.includes("warranty") || v.id.includes("sla")) {
          const minW = buyer.minSlaWarranty || 3;
          const targetW = buyer.targetSlaWarranty || 6;
          varScore = Math.min(1.0, (val / targetW));
        }
        // En marketing garantizado: para publishers/distribuidores mayor es más costoso, pero para el exportador es favorable
        else if (v.id.includes("marketing")) {
          const targetM = buyer.targetMarketing || 50;
          const maxM = buyer.maxMarketingAllowed || 90;
          varScore = val > maxM ? 0.2 : (1 - (val - targetM) / (maxM - targetM));
        }
        // Caso genérico numérico
        else {
          const norm = (val - v.min) / (v.max - v.min);
          varScore = norm;
        }
      } 
      // Tipo select (cláusulas legales, opciones discretas)
      else if (v.type === "select") {
        const selectedOpt = v.options.find(opt => opt.value === val);
        if (selectedOpt) {
          varScore = Math.max(0, Math.min(1.0, selectedOpt.scoreBonusBuyer));
          if (selectedOpt.scoreBonusBuyer < 0) {
            dealbreakerTriggered = true;
            dealbreakerReason = `La cláusula elegida para '${v.name}' es inaceptable para la política de la empresa compradora.`;
          }
        }
      }

      totalUtility += varScore * weight;
    });

    totalUtility = Math.max(0, Math.min(1.0, totalUtility));
    return {
      utility: Number(totalUtility.toFixed(3)),
      dealbreakerTriggered,
      dealbreakerReason
    };
  }

  /**
   * Evalúa la utilidad para el Exportador Peruano U_exporter in [0, 1].
   */
  calculateExporterUtility(offer) {
    let totalUtility = 0;
    const numVars = this.scenario.negotiableVariables.length;
    const equalWeight = 1 / numVars;

    this.scenario.negotiableVariables.forEach(v => {
      const val = offer[v.id];
      let score = 0;

      if (v.type === "numeric") {
        // En precios, tarifas, honorarios: mayor es mejor para el exportador
        if (v.id.includes("price") || v.id.includes("fee") || v.id.includes("rate") || v.id.includes("guarantee") || v.id.includes("advance") || v.id.includes("premium")) {
          score = (val - v.min) / (v.max - v.min);
        }
        // En plazos de pago: menor días de crédito = mayor liquidez para el exportador
        else if (v.id.includes("payment_term") || v.id.includes("payment_terms_days")) {
          score = 1 - (val - v.min) / (v.max - v.min);
        }
        // En garantía post-entrega: menor tiempo de garantía gratis = menor sobrecoste
        else if (v.id.includes("warranty") || v.id.includes("sla")) {
          score = 1 - (val - v.min) / (v.max - v.min);
        }
        // En marketing presupuestado para el videojuego: mayor presupuesto es mejor
        else if (v.id.includes("marketing")) {
          score = (val - v.min) / (v.max - v.min);
        }
        // Default proporcional
        else {
          score = (val - v.min) / (v.max - v.min);
        }
      } else if (v.type === "select") {
        const selectedOpt = v.options.find(opt => opt.value === val);
        score = selectedOpt ? Math.max(0, Math.min(1.0, selectedOpt.scoreBonusExp)) : 0.5;
      }

      totalUtility += score * equalWeight;
    });

    return Number(totalUtility.toFixed(3));
  }

  /**
   * Procesa una oferta estructurada enviada por el exportador (usuario).
   * @param {Object} exporterOffer Objeto con pares id_variable: valor
   * @param {String} exporterMessage Mensaje o argumentación del usuario
   * @returns {Object} Resultado de la ronda (estado, respuesta, contraoferta, etc.)
   */
  submitExporterOffer(exporterOffer, exporterMessage = "") {
    if (this.status !== "negotiating") {
      return {
        success: false,
        message: "La negociación ya concluyó o no está activa.",
        status: this.status
      };
    }

    // Guardar oferta actual del exportador
    this.currentExporterOffer = { ...exporterOffer };
    const buyerEval = this.calculateBuyerUtility(exporterOffer);
    const exporterEval = this.calculateExporterUtility(exporterOffer);

    // Registrar en el log de mensajes
    this.chatLog.push({
      id: "msg-" + Date.now(),
      sender: "exporter",
      senderName: "Exportador Peruano (Tú)",
      senderRole: "Gerente Comercial / Representante Exportador",
      company: this.scenario.exporterInitialDossier.companyName,
      round: this.currentRound,
      text: exporterMessage || "Presentamos formalmente nuestra propuesta con las condiciones actualizadas en el panel comercial.",
      offer: { ...exporterOffer },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Guardar en el histórico de propuestas
    this.offersHistory.push({
      round: this.currentRound,
      sender: "exporter",
      offer: { ...exporterOffer },
      buyerUtility: buyerEval.utility,
      exporterUtility: exporterEval,
      dealbreaker: buyerEval.dealbreakerTriggered
    });

    // REGLA DETERMINISTA 1: Aceptación automática del comprador
    // Si la utilidad para el comprador es muy alta (>= 0.76) o (>= 0.70 en rondas finales) y no hay dealbreakers
    const acceptanceThreshold = this.currentRound >= 4 ? 0.70 : 0.78;
    if (buyerEval.utility >= acceptanceThreshold && !buyerEval.dealbreakerTriggered) {
      this.status = "agreement_reached";
      this.finalAgreedOffer = { ...exporterOffer };

      const acceptMsg = `¡Excelente! Hemos revisado minuciosamente las condiciones que acaban de plantear. Consideramos que esta propuesta equilibra adecuadamente las necesidades técnicas y presupuestales de ambas partes. Por nuestra parte, ACEPTAMOS formalmente estos términos para proceder con la redacción del contrato definitivo.`;
      
      this.chatLog.push({
        id: "msg-" + (Date.now() + 1),
        sender: "buyer",
        senderName: this.scenario.buyerConfidentialProfile.buyerName,
        senderRole: this.scenario.buyerConfidentialProfile.buyerRole,
        company: this.scenario.buyerConfidentialProfile.companyName,
        round: this.currentRound,
        text: acceptMsg,
        offer: { ...exporterOffer },
        isAgreement: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      return {
        success: true,
        round: this.currentRound,
        status: this.status,
        buyerUtility: buyerEval.utility,
        message: acceptMsg,
        offerAccepted: true,
        finalOffer: this.finalAgreedOffer
      };
    }

    // REGLA DETERMINISTA 2: Fin de rondas sin acuerdo (Deadlock)
    if (this.currentRound >= this.maxRounds) {
      this.status = "deadlock";
      const deadlockMsg = `Lamentablemente hemos alcanzado el límite de rondas de conversación previsto sin llegar a un punto de encuentro que satisfaga nuestros requisitos mínimos. Valoramos el tiempo invertido, pero en estas condiciones no nos es viable continuar con la operación. Damos por cerrada la negociación sin acuerdo.`;
      
      this.chatLog.push({
        id: "msg-" + (Date.now() + 1),
        sender: "buyer",
        senderName: this.scenario.buyerConfidentialProfile.buyerName,
        senderRole: this.scenario.buyerConfidentialProfile.buyerRole,
        company: this.scenario.buyerConfidentialProfile.companyName,
        round: this.currentRound,
        text: deadlockMsg,
        isDeadlock: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      return {
        success: true,
        round: this.currentRound,
        status: this.status,
        buyerUtility: buyerEval.utility,
        message: deadlockMsg,
        offerAccepted: false
      };
    }

    // REGLA DETERMINISTA 3: Generación de Contraoferta Estratégica del Comprador
    const counterOffer = this.generateDeterministicCounterOffer(exporterOffer, buyerEval);
    this.currentBuyerCounterOffer = counterOffer;
    const buyerResponseText = this.generateDeterministicDialogue(exporterOffer, counterOffer, buyerEval);

    // Incrementar ronda
    this.currentRound++;

    this.chatLog.push({
      id: "msg-" + (Date.now() + 1),
      sender: "buyer",
      senderName: this.scenario.buyerConfidentialProfile.buyerName,
      senderRole: this.scenario.buyerConfidentialProfile.buyerRole,
      company: this.scenario.buyerConfidentialProfile.companyName,
      round: this.currentRound,
      text: buyerResponseText,
      offer: { ...counterOffer },
      isCounterOffer: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.offersHistory.push({
      round: this.currentRound,
      sender: "buyer",
      offer: { ...counterOffer },
      buyerUtility: this.calculateBuyerUtility(counterOffer).utility,
      exporterUtility: this.calculateExporterUtility(counterOffer)
    });

    return {
      success: true,
      round: this.currentRound,
      status: this.status,
      buyerUtility: buyerEval.utility,
      counterOffer,
      buyerMessage: buyerResponseText
    };
  }

  /**
   * Genera una contraoferta determinista basada en la brecha con el objetivo del comprador.
   * Aplica concesiones graduales según la ronda (más dura al inicio, más flexible hacia el final si el exportador concede).
   */
  /**
   * Genera una contraoferta determinista basada en la brecha con el objetivo del comprador.
   * Aplica concesiones graduales según la ronda, garantizando que el comprador nunca contraoferte
   * un precio o fee superior a lo que el propio exportador ha solicitado.
   */
  generateDeterministicCounterOffer(exporterOffer, buyerEval) {
    const counter = { ...this.currentBuyerCounterOffer };
    const buyer = this.scenario.buyerConfidentialProfile;
    // Factor de concesión según la ronda
    const concessionStep = (this.currentRound / this.maxRounds) * 0.7;

    this.scenario.negotiableVariables.forEach(v => {
      const expVal = exporterOffer[v.id];
      const buyerPrev = this.currentBuyerCounterOffer[v.id];

      if (v.type === "numeric") {
        // 1. Variables de precio / tarifa / fee / retainer / garantía mínima / anticipo
        if (v.id.includes("price") || v.id.includes("fee") || v.id.includes("rate") || v.id.includes("retainer") || v.id.includes("guarantee") || (v.id.includes("advance") && !v.id.includes("payment"))) {
          const buyerTarget = buyer.targetPrice || buyer.targetAdvance || buyerPrev;
          const buyerCeiling = buyer.maxReservationPrice || buyer.maxAdvanceAllowed || v.max;
          
          let newPrice;
          if (expVal <= buyerPrev || expVal <= buyerTarget) {
            // Si el exportador pide igual o menos de lo que el comprador ofrecía o tenía como meta
            newPrice = expVal;
          } else if (expVal <= buyerCeiling) {
            // El exportador está dentro del techo de reserva: acercamiento progresivo
            const convergence = 0.45 + (this.currentRound / this.maxRounds) * 0.45;
            newPrice = buyerPrev + (expVal - buyerPrev) * convergence;
            newPrice = Math.min(expVal, newPrice);
          } else {
            // El exportador pide por encima del techo: sube suavemente hacia el techo
            newPrice = buyerPrev + (buyerCeiling - buyerPrev) * concessionStep;
            newPrice = Math.min(buyerCeiling, newPrice);
          }
          
          // Redondear según el step de la variable
          let rounded = Math.round(newPrice / v.step) * v.step;
          // Regla de oro: un comprador jamás ofrece pagar MÁS de lo pedido por el exportador
          rounded = Math.min(expVal, rounded);
          rounded = Math.min(buyerCeiling, Math.max(v.min, rounded));
          counter[v.id] = rounded;
        }
        // 2. En anticipo de pago (advance payment / mobilization)
        else if (v.id.includes("advance_payment") || v.id.includes("advance_mobilization")) {
          const maxAdv = buyer.maxAcceptableAdvance || buyer.maxAdvanceAllowed || 25;
          if (expVal <= maxAdv) {
            counter[v.id] = expVal;
          } else {
            const targetAdv = Math.min(maxAdv, Math.round(expVal * 0.75 / v.step) * v.step);
            counter[v.id] = Math.max(v.min, Math.min(maxAdv, targetAdv));
          }
        }
        // 3. Bono por desempeño o revenue share
        else if (v.id.includes("bonus") || v.id.includes("performance") || v.id.includes("revenue_share")) {
          const buyerBonusTarget = buyer.targetBonus || 8;
          const maxBonus = buyer.maxBonusAllowed || v.max;
          if (expVal <= buyerBonusTarget) {
            counter[v.id] = expVal;
          } else {
            const diff = expVal - buyerPrev;
            let val = buyerPrev + diff * 0.45;
            counter[v.id] = Math.min(expVal, Math.min(maxBonus, Math.round(val / v.step) * v.step));
          }
          counter[v.id] = Math.max(v.min, Math.min(v.max, counter[v.id]));
        }
        // 4. En días de pago (el comprador prefiere más días, el exportador menos días)
        else if (v.id.includes("payment_term") || v.id.includes("payment_terms_days")) {
          const minDays = buyer.minPaymentDaysAllowed || 30;
          if (expVal >= (buyer.targetPaymentDays || 60)) {
            counter[v.id] = expVal;
          } else if (this.currentRound >= 3) {
            counter[v.id] = Math.max(minDays, buyerPrev - 15);
          } else {
            counter[v.id] = buyerPrev;
          }
        }
        // 5. En meses de garantía o entrega o plazo
        else if (v.id.includes("warranty") || v.id.includes("delivery") || v.id.includes("timeline")) {
          const diff = expVal - buyerPrev;
          counter[v.id] = Math.round((buyerPrev + diff * 0.4) / v.step) * v.step;
          counter[v.id] = Math.max(v.min, Math.min(v.max, counter[v.id]));
        }
        // 6. Resto de variables numéricas
        else {
          const diff = expVal - buyerPrev;
          counter[v.id] = Math.round((buyerPrev + diff * 0.35) / v.step) * v.step;
          counter[v.id] = Math.max(v.min, Math.min(v.max, counter[v.id]));
        }
      } 
      // Variables tipo select (cláusulas legales)
      else if (v.type === "select") {
        if (this.currentRound >= 2) {
          if (v.id.includes("ip") && buyer.acceptableIpClause) {
            counter[v.id] = buyer.acceptableIpClause;
          } else if (v.id.includes("liability") && buyer.acceptableLiability) {
            counter[v.id] = buyer.acceptableLiability;
          } else if (v.id.includes("territor") && buyer.acceptableTerritories) {
            counter[v.id] = buyer.acceptableTerritories;
          } else if (v.id.includes("payment_method") && buyer.acceptablePayment) {
            counter[v.id] = buyer.acceptablePayment;
          } else if (v.id.includes("exclusivity") && buyer.acceptableExclusivity) {
            counter[v.id] = buyer.acceptableExclusivity;
          } else {
            counter[v.id] = expVal;
          }
        } else {
          counter[v.id] = buyerPrev;
        }
      }
    });

    return counter;
  }

  /**
   * Genera el texto del mensaje del comprador con argumentos específicos, evaluando todas las variables
   * en disputa de forma congruente para evitar contrasentidos lógicos.
   */
  generateDeterministicDialogue(exporterOffer, counterOffer, buyerEval) {
    const buyer = this.scenario.buyerConfidentialProfile;
    const triggers = buyer.dialogueTriggers || {};
    let text = "";

    const firstVar = this.scenario.negotiableVariables[0];
    const expPrice = exporterOffer[firstVar.id];
    const counterPrice = counterOffer[firstVar.id];
    const buyerTargetPrice = buyer.targetPrice || buyer.targetAdvance || buyer.initialBuyer;

    // 1. Si hubo un dealbreaker flagrante
    if (buyerEval.dealbreakerTriggered) {
      text = `Hemos analizado su propuesta, pero encontramos un obstáculo insalvable: ${buyerEval.dealbreakerReason}. Si insisten en esa postura, no podremos avanzar. Como esfuerzo constructivo de nuestra parte, les formulamos la siguiente contraoferta: `;
    } 
    // 2. Si la propuesta está razonablemente cerca o la utilidad global es alta
    else if (buyerEval.utility >= 0.55) {
      if (triggers.closeToAgreement) {
        text = triggers.closeToAgreement.replace("{target}", counterPrice);
      } else {
        text = `Valoramos positivamente el acercamiento en sus posturas y consideramos viable llegar a un acuerdo. Para asegurar la aprobación del directorio, requerimos los siguientes ajustes: `;
      }
    } 
    // 3. Negociación activa: analizar qué variables causan fricción real
    else {
      // ¿El precio/tarifa está en disputa activa?
      // Sólo se objeta el precio si el comprador ofreció MENOS de lo pedido y la cifra pedida excede la meta
      const priceIsDisputed = expPrice > counterPrice && expPrice > buyerTargetPrice;

      // Variable de términos de pago
      const paymentVar = this.scenario.negotiableVariables.find(v => 
        v.id.includes("payment_term") || v.id.includes("payment_terms_days") || v.id.includes("payment_method")
      );
      const paymentDisputed = paymentVar && (
        (paymentVar.type === "numeric" && exporterOffer[paymentVar.id] < (buyer.targetPaymentDays || 60)) ||
        (paymentVar.type === "select" && exporterOffer[paymentVar.id] !== buyer.preferredPayment)
      );

      // Variable legal / exclusividad / propiedad intelectual
      const legalVar = this.scenario.negotiableVariables.find(v => 
        v.id.includes("exclusivity") || v.id.includes("ip") || v.id.includes("territor") || v.id.includes("creative") || v.id.includes("liability")
      );
      const legalDisputed = legalVar && exporterOffer[legalVar.id] !== (buyer.preferredExclusivity || buyer.preferredIp || buyer.preferredTerritories || buyer.preferredCreative);

      // Selección armónica del argumento comercial según la variable más crítica
      if (!priceIsDisputed && paymentDisputed && (triggers.paymentTerms || triggers.paymentRisk || triggers.longPayment)) {
        text = triggers.paymentTerms || triggers.paymentRisk || triggers.longPayment;
      } else if (!priceIsDisputed && legalDisputed && (triggers.exclusivity || triggers.fullIpDemanded || triggers.territories || triggers.creative || triggers.ipOwnership || triggers.liability)) {
        text = triggers.exclusivity || triggers.fullIpDemanded || triggers.territories || triggers.creative || triggers.ipOwnership || triggers.liability;
      } else if (priceIsDisputed) {
        if (triggers.highRetainer) text = triggers.highRetainer.replace("{retainer}", expPrice);
        else if (triggers.highRate) text = triggers.highRate.replace("{rate}", expPrice);
        else if (triggers.highMG) text = triggers.highMG.replace("{mg}", expPrice);
        else if (triggers.highPrice) text = triggers.highPrice.replace("{price}", expPrice);
        else if (triggers.highAdvance) text = triggers.highAdvance.replace("{adv}", expPrice);
        else if (triggers.highFee) text = triggers.highFee.replace("{target}", counterPrice);
        else text = `Comprendemos su valoración técnica, pero los números solicitados aún sobrepasan nuestros parámetros presupuestales. Hemos formulado una contraoferta equilibrada: `;
      } else if (paymentDisputed && (triggers.paymentTerms || triggers.paymentRisk || triggers.longPayment)) {
        text = triggers.paymentTerms || triggers.paymentRisk || triggers.longPayment;
      } else if (legalDisputed && (triggers.exclusivity || triggers.fullIpDemanded || triggers.territories || triggers.creative || triggers.ipOwnership || triggers.liability)) {
        text = triggers.exclusivity || triggers.fullIpDemanded || triggers.territories || triggers.creative || triggers.ipOwnership || triggers.liability;
      } else if (triggers.highRevShare && exporterOffer.revenue_share_post_recoup > 65) {
        text = triggers.highRevShare;
      } else if (triggers.humidity && exporterOffer.max_humidity_pct > 7.4) {
        text = triggers.humidity;
      } else if (triggers.advance && exporterOffer.advance_mobilization_pct > 25) {
        text = triggers.advance;
      } else {
        text = `Hemos analizado su planteamiento en esta ronda. Para conciliar los requerimientos operativos de ambas firmas, les presentamos la siguiente contrapropuesta: `;
      }
    }

    // Detallar los términos de la contraoferta
    const counterSummary = Object.entries(counterOffer).map(([k, v]) => {
      const variableDef = this.scenario.negotiableVariables.find(x => x.id === k);
      if (!variableDef) return `${k}: ${v}`;
      if (variableDef.type === "select") {
        const opt = variableDef.options.find(o => o.value === v);
        return `${variableDef.name}: "${opt ? opt.label : v}"`;
      }
      return `${variableDef.name}: ${v} ${variableDef.unit}`;
    }).join(" | ");

    return `${text}\n\nNuestra propuesta en mesa (Ronda ${this.currentRound}):\n[${counterSummary}]`;
  }

  /**
   * El exportador (usuario) decide ACEPTAR expresamente la contraoferta del comprador en mesa.
   */
  acceptBuyerCounterOffer() {
    if (this.status !== "negotiating") {
      return { success: false, message: "La negociación no está activa." };
    }

    this.status = "agreement_reached";
    this.finalAgreedOffer = { ...this.currentBuyerCounterOffer };

    const closingMsg = `Hemos aceptado formalmente la contraoferta presentada por la contraparte compradora. Se da por concluida la negociación con un acuerdo comercial vinculante.`;
    
    this.chatLog.push({
      id: "msg-" + Date.now(),
      sender: "exporter",
      senderName: "Exportador Peruano (Tú)",
      senderRole: "Gerente Comercial / Representante Exportador",
      company: this.scenario.exporterInitialDossier.companyName,
      round: this.currentRound,
      text: closingMsg,
      offer: { ...this.finalAgreedOffer },
      isAgreement: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    return {
      success: true,
      status: this.status,
      finalOffer: this.finalAgreedOffer,
      message: closingMsg
    };
  }

  /**
   * El exportador (usuario) decide ROMPER la negociación (Walkaway / BATNA).
   * Nota pedagógica: Esta acción no es un fallo automático. Puede ser la decisión correcta
   * si la oferta del comprador está por debajo del punto de reserva del exportador.
   */
  breakNegotiation(reason = "") {
    if (this.status !== "negotiating") {
      return { success: false, message: "La negociación no está activa." };
    }

    this.status = "rejected";
    const walkawayMsg = `Como representantes de la empresa exportadora peruana, consideramos que las condiciones ofrecidas en la mesa no satisfacen los umbrales mínimos de sostenibilidad de nuestra operación. Preferimos hacer uso de nuestra Mejor Alternativa a un Acuerdo Negociado (BATNA) y damos por cerradas las negociaciones. ${reason ? `Motivo: ${reason}` : ''}`;
    
    this.chatLog.push({
      id: "msg-" + Date.now(),
      sender: "exporter",
      senderName: "Exportador Peruano (Tú)",
      senderRole: "Gerente Comercial / Representante Exportador",
      company: this.scenario.exporterInitialDossier.companyName,
      round: this.currentRound,
      text: walkawayMsg,
      isWalkaway: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    return {
      success: true,
      status: this.status,
      message: walkawayMsg
    };
  }

  /**
   * Reinicia la simulación del escenario actual.
   */
  reset() {
    this.currentRound = 1;
    this.status = "not_started";
    this.chatLog = [];
    this.offersHistory = [];
    this.currentExporterOffer = null;
    this.currentBuyerCounterOffer = null;
    this.finalAgreedOffer = null;
    this.initializeEngine();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NegotiationEngine };
}
