/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * evaluation.js - Sistema de Evaluación Determinista de Desempeño
 * 
 * Evalúa objetivamente la negociación según los 8 criterios requeridos:
 * 1. Rentabilidad respecto al objetivo del exportador (25 pts)
 * 2. Calidad de las condiciones de pago y flujo de caja (15 pts)
 * 3. Gestión de plazos, garantías y riesgos operativos (15 pts)
 * 4. Preservación de activos estratégicos / Propiedad Intelectual (15 pts)
 * 5. Táctica y ritmo de concesiones en ZOPA (15 pts)
 * 6. Manejo de objeciones, rondas y argumentación (15 pts)
 * 
 * Principio clave del modelo Harvard:
 * "No alcanzar acuerdo (Walkaway) es preferible si la contraparte ofrecía condiciones por debajo del BATNA".
 */

class NegotiationEvaluator {
  /**
   * Genera el informe completo de evaluación para una sesión terminada.
   * @param {Object} scenario Ficha completa del escenario
   * @param {NegotiationEngine} engine Instancia del motor de negociación
   * @returns {Object} Informe cuantitativo y cualitativo de resultados
   */
  static evaluateSession(scenario, engine) {
    const isAgreement = engine.status === "agreement_reached";
    const finalOffer = engine.finalAgreedOffer || engine.currentBuyerCounterOffer || engine.currentExporterOffer;
    const history = engine.offersHistory;
    const exporterDossier = scenario.exporterInitialDossier;
    const buyerProfile = scenario.buyerConfidentialProfile;

    // 1. Criterio Económico y Rentabilidad (25 pts)
    const economicEval = this._evalEconomicProfitability(scenario, engine, finalOffer, isAgreement);

    // 2. Criterio de Condiciones de Pago y Liquidez (15 pts)
    const paymentEval = this._evalPaymentConditions(scenario, finalOffer, isAgreement);

    // 3. Criterio de Plazos, Garantías y Riesgo Operacional (15 pts)
    const operationalEval = this._evalOperationalRisks(scenario, finalOffer, isAgreement);

    // 4. Criterio de Propiedad Intelectual y Activos Intangibles (15 pts)
    const strategicEval = this._evalStrategicAssets(scenario, finalOffer, isAgreement);

    // 5. Criterio de Gestión de Concesiones (15 pts)
    const concessionsEval = this._evalConcessionTactics(scenario, history, isAgreement);

    // 6. Criterio de Manejo de Rondas y Cierre (15 pts)
    const processEval = this._evalNegotiationProcess(engine, isAgreement);

    // Puntuación global 0 - 100
    const totalScore = Math.min(100, Math.max(0, Math.round(
      economicEval.score +
      paymentEval.score +
      operationalEval.score +
      strategicEval.score +
      concessionsEval.score +
      processEval.score
    )));

    // Categoría y nivel de desempeño
    let performanceTier = "";
    let badgeClass = "";
    if (totalScore >= 88) {
      performanceTier = "Negociador Internacional Sobresaliente (Maestría Comercial)";
      badgeClass = "tier-outstanding";
    } else if (totalScore >= 74) {
      performanceTier = "Negociador Competente (Buen Acuerdo Sostenible)";
      badgeClass = "tier-competent";
    } else if (totalScore >= 60) {
      performanceTier = "En Desarrollo (Margen de Mejora Táctica)";
      badgeClass = "tier-developing";
    } else {
      performanceTier = "Alto Riesgo Comercial (Condiciones Desfavorables)";
      badgeClass = "tier-risk";
    }

    // Análisis de concesiones cuantitativas por parte
    const concessionsSummary = this._calculateConcessionsSummary(scenario, history);

    // Síntesis de fortalezas y debilidades
    const strengths = [];
    const improvements = [];
    const recommendations = [];

    // Llenar retroalimentación cualitativa
    if (economicEval.score >= 20) strengths.push(economicEval.feedback);
    else improvements.push(economicEval.feedback);

    if (paymentEval.score >= 12) strengths.push(paymentEval.feedback);
    else improvements.push(paymentEval.feedback);

    if (strategicEval.score >= 12) strengths.push(strategicEval.feedback);
    else improvements.push(strategicEval.feedback);

    if (concessionsEval.score >= 11) strengths.push(concessionsEval.feedback);
    else improvements.push(concessionsEval.feedback);

    if (processEval.score >= 11) strengths.push(processEval.feedback);
    else improvements.push(processEval.feedback);

    // Recomendaciones accionables
    recommendations.push(
      "Revisar el principio de concesiones recíprocas (Harvard PON): cada vez que cedas en precio o tarifa, exige inmediatamente una contrapartida (menor plazo de pago, mayor anticipo o menor periodo de garantía).",
      "Antes de entrar a la sala, ten calculado por escrito tu punto de reserva (Walkaway point) y tu BATNA; un 'no acuerdo' siempre es mejor que un contrato que te genere pérdidas operativas o litigios en el extranjero.",
      "Comprobar siempre la homologación de términos contractuales según los modelos del Centro de Comercio Internacional (ITC) o Incoterms 2020 de la Cámara de Comercio Internacional (ICC)."
    );

    return {
      totalScore,
      performanceTier,
      badgeClass,
      negotiationStatus: engine.status,
      statusLabel: this._getStatusLabel(engine.status),
      roundsCount: engine.currentRound,
      isAgreement,
      scoresBreakdown: {
        economic: economicEval,
        payment: paymentEval,
        operational: operationalEval,
        strategic: strategicEval,
        concessions: concessionsEval,
        process: processEval
      },
      concessionsSummary,
      strengths,
      improvements,
      recommendations,
      harvardMetrics: {
        objectiveValue: Math.round(((economicEval.score / 25) * 0.4 + (paymentEval.score / 15) * 0.3 + (operationalEval.score / 15) * 0.15 + (strategicEval.score / 15) * 0.15) * 100),
        subjectiveValue: Math.round(((concessionsEval.score / 15) * 0.5 + (processEval.score / 15) * 0.5) * 100),
        coreConcernsAnalysis: [
          { concern: "Autonomía", status: isAgreement ? "Alta (Acuerdo libremente suscrito)" : "Protegida (Retirada voluntaria)", score: 90 },
          { concern: "Aprecio", status: "Reconocimiento recíproco de costos y presupuestos", score: Math.round((economicEval.score / 25) * 100) },
          { concern: "Afiliación", status: isAgreement ? "Vínculo de largo plazo habilitado" : "Discusión profesional respetuosa", score: isAgreement ? 85 : 70 },
          { concern: "Rol", status: "Rol del exportador peruano consolidado en la mesa", score: 85 },
          { concern: "Estatus", status: "Competitividad técnica demostrada", score: Math.round((strategicEval.score / 15) * 100) }
        ],
        tribalLuresAvoidance: {
          vertigoAvoided: true,
          repetitionCompulsionAvoided: engine.currentRound <= 4,
          taboosAddressed: true,
          sacredPreserved: strategicEval.score >= 10
        }
      },
      scenarioMeta: {
        id: scenario.id,
        title: scenario.title,
        sector: scenario.sector,
        buyerCountry: scenario.buyerCountry,
        source: scenario.source
      }
    };
  }

  // --- CÁLCULOS DETERMINISTAS POR CRITERIO ---

  static _evalEconomicProfitability(scenario, engine, finalOffer, isAgreement) {
    const primaryVar = scenario.negotiableVariables[0];
    const agreedVal = finalOffer ? finalOffer[primaryVar.id] : primaryVar.initialBuyer;
    const buyerProfile = scenario.buyerConfidentialProfile;
    const targetPrice = buyerProfile.targetPrice || primaryVar.initialExporter * 0.9;
    const buyerWalkaway = buyerProfile.maxReservationPrice || buyerProfile.maxAdvanceAllowed || primaryVar.max;
    
    // Si no hubo acuerdo
    if (!isAgreement) {
      // ¿Fue una decisión acertada romper?
      // Si la última oferta del comprador estaba por debajo del punto de reserva del exportador
      const lastBuyerOffer = engine.currentBuyerCounterOffer;
      const lastBuyerPrice = lastBuyerOffer ? lastBuyerOffer[primaryVar.id] : primaryVar.initialBuyer;
      
      // En la mayoría de escenarios el exportador tiene un piso mínimo
      const exporterFloor = primaryVar.min + (primaryVar.max - primaryVar.min) * 0.35;
      if (lastBuyerPrice < exporterFloor) {
        return {
          score: 21,
          maxScore: 25,
          feedback: "Excelente decisión de retirada (Walkaway): Supiste rechazar un acuerdo destructivo de valor financiero y proteger el BATNA de la empresa peruana."
        };
      } else {
        return {
          score: 10,
          maxScore: 25,
          feedback: "Ruptura de negociación evitable: Había margen de acuerdo en la ZOPA económica, pero la postura fue demasiado rígida frente a las propuestas viables del comprador."
        };
      }
    }

    // Si hubo acuerdo: medir la cercanía al valor máximo posible en ZOPA
    const span = primaryVar.max - primaryVar.min;
    const normalizedPrice = (agreedVal - primaryVar.min) / span; // 0 a 1
    const score = Math.round(Math.max(5, Math.min(25, normalizedPrice * 25)));

    let feedback = "";
    if (score >= 20) {
      feedback = `Excelente rentabilidad: Lograste capturar un alto porcentaje del valor económico en ${primaryVar.name} (${agreedVal} ${primaryVar.unit}), preservando un margen bruto saludable.`;
    } else if (score >= 14) {
      feedback = `Rentabilidad moderada: El acuerdo en ${primaryVar.name} (${agreedVal} ${primaryVar.unit}) cubre los costos operativos y deja un margen razonable, aunque concediste valor cerca del umbral de reserva.`;
    } else {
      feedback = `Alerta de margen estrecho: Cerraste en ${primaryVar.name} (${agreedVal} ${primaryVar.unit}), muy cerca del piso de costos de la empresa exportadora, limitando la utilidad neta.`;
    }

    return { score, maxScore: 25, feedback, agreedVal, unit: primaryVar.unit };
  }

  static _evalPaymentConditions(scenario, finalOffer, isAgreement) {
    if (!isAgreement) return { score: 10, maxScore: 15, feedback: "No aplica al no haberse formalizado el contrato." };

    let score = 8;
    let feedback = "Condiciones de pago regulares.";

    // Buscar variables de anticipo o días de crédito o método de pago
    const advVar = scenario.negotiableVariables.find(v => v.id.includes("advance"));
    const termVar = scenario.negotiableVariables.find(v => v.id.includes("payment_term") || v.id.includes("payment_terms"));
    const methodVar = scenario.negotiableVariables.find(v => v.id.includes("payment_method"));

    if (advVar && finalOffer[advVar.id] !== undefined) {
      const adv = finalOffer[advVar.id];
      if (adv >= 25) score += 4;
      else if (adv >= 15) score += 2;
    }

    if (termVar && finalOffer[termVar.id] !== undefined) {
      const days = finalOffer[termVar.id];
      if (days <= 30) score += 3;
      else if (days > 45) score -= 3;
    }

    if (methodVar && finalOffer[methodVar.id]) {
      const m = finalOffer[methodVar.id];
      if (m === "confirmed_lc" || m === "advance_plus_cad") score += 5;
      else if (m === "open_account_60") score -= 4;
    }

    score = Math.max(3, Math.min(15, score));

    if (score >= 12) {
      feedback = "Gestión de liquidez destacada: Se aseguraron mecanismos de pago y anticipos que blindan la tesorería de la empresa peruana frente al riesgo cambiario y de cobranza.";
    } else {
      feedback = "Riesgo de financiamiento no remunerado: Se aceptaron plazos de crédito extensos o nulo anticipo, lo que forzará al exportador a fondear la nómina o la producción con deuda local.";
    }

    return { score, maxScore: 15, feedback };
  }

  static _evalOperationalRisks(scenario, finalOffer, isAgreement) {
    if (!isAgreement) return { score: 10, maxScore: 15, feedback: "Sin exposición de riesgo operativo al no consumarse el contrato." };

    let score = 10;
    let feedback = "";

    // Garantías, plazos de entrega, tolerances
    const warrantyVar = scenario.negotiableVariables.find(v => v.id.includes("warranty") || v.id.includes("sla"));
    const timelineVar = scenario.negotiableVariables.find(v => v.id.includes("delivery") || v.id.includes("timeline"));
    const humidityVar = scenario.negotiableVariables.find(v => v.id.includes("humidity"));

    if (warrantyVar && finalOffer[warrantyVar.id] !== undefined) {
      const months = finalOffer[warrantyVar.id];
      if (months <= 4) score += 3;
      else if (months > 6) score -= 3;
    }

    if (timelineVar && finalOffer[timelineVar.id] !== undefined) {
      const time = finalOffer[timelineVar.id];
      if (time >= timelineVar.initialExporter * 0.8) score += 2;
    }

    if (humidityVar && finalOffer[humidityVar.id] !== undefined) {
      const h = finalOffer[humidityVar.id];
      if (h >= 7.2) score += 3;
    }

    score = Math.max(4, Math.min(15, score));
    feedback = score >= 12 
      ? "Plazos y compromisos operativos equilibrados: Se pactaron tiempos de entrega realistas y garantías acordes a la capacidad técnica del exportador."
      : "Vulnerabilidad operativa: Se asumieron compromisos de entrega o garantías técnicas muy ajustadas que aumentan el riesgo de penalizaciones contractuales.";

    return { score, maxScore: 15, feedback };
  }

  static _evalStrategicAssets(scenario, finalOffer, isAgreement) {
    if (!isAgreement) return { score: 12, maxScore: 15, feedback: "Activos estratégicos y derechos de autor salvaguardados al no cederlos en un acuerdo desbalanceado." };

    let score = 10;
    let feedback = "";

    // Identificar variables de IP, territorialidad, exclusividad, responsabilidad
    const ipVar = scenario.negotiableVariables.find(v => v.id.includes("ip"));
    const territoryVar = scenario.negotiableVariables.find(v => v.id.includes("territorial"));
    const exclusivityVar = scenario.negotiableVariables.find(v => v.id.includes("exclusivity"));
    const liabilityVar = scenario.negotiableVariables.find(v => v.id.includes("liability"));

    if (ipVar && finalOffer[ipVar.id]) {
      const ipVal = finalOffer[ipVar.id];
      if (ipVal === "studio_owns_all" || ipVal === "custom_code_only" || ipVal === "studio_ip_publisher_rofr") score += 4;
      else if (ipVal === "full_assignment" || ipVal === "publisher_owns_ip") score -= 6;
    }

    if (territoryVar && finalOffer[territoryVar.id]) {
      const tVal = finalOffer[territoryVar.id];
      if (tVal === "peru_and_latam") score += 4;
      else if (tVal === "worldwide") score -= 3;
    }

    if (exclusivityVar && finalOffer[exclusivityVar.id]) {
      const exVal = finalOffer[exclusivityVar.id];
      if (exVal === "direct_competitors_only" || exVal === "no_exclusivity") score += 3;
      else if (exVal === "full_category_mexico") score -= 3;
    }

    if (liabilityVar && finalOffer[liabilityVar.id]) {
      const lVal = finalOffer[liabilityVar.id];
      if (lVal === "100_pct_fees") score += 3;
      else if (lVal === "unlimited_damages") score -= 6;
    }

    score = Math.max(3, Math.min(15, score));
    feedback = score >= 12
      ? "Protección de Propiedad Intelectual sólida: Se resguardaron los activos intangibles, marcas, frameworks o derechos territoriales clave de la empresa."
      : "Cesión de activos críticos: Se concedió propiedad intelectual o exclusividad territorial excesiva, lo que limitará futuros negocios de la empresa en ese mercado.";

    return { score, maxScore: 15, feedback };
  }

  static _evalConcessionTactics(scenario, history, isAgreement) {
    let score = 10;
    let feedback = "";

    const exporterOffers = history.filter(h => h.sender === "exporter");
    if (exporterOffers.length <= 1) {
      score = isAgreement ? 12 : 8;
    } else {
      // Analizar primera variable en ofertas sucesivas del exportador
      const primaryId = scenario.negotiableVariables[0].id;
      let drop1 = 0;
      let drop2 = 0;

      if (exporterOffers.length >= 2) {
        drop1 = Math.abs(exporterOffers[0].offer[primaryId] - exporterOffers[1].offer[primaryId]);
      }
      if (exporterOffers.length >= 3) {
        drop2 = Math.abs(exporterOffers[1].offer[primaryId] - exporterOffers[2].offer[primaryId]);
      }

      // Regla de Harvard: Concesiones decrecientes (primer paso moderado, siguientes más pequeños)
      if (drop1 > 0 && drop2 > 0 && drop2 <= drop1) {
        score = 14;
        feedback = "Estrategia de concesiones graduales y decrecientes: Demostraste firmeza táctica cediendo terreno paulatinamente a cambio de avances de la contraparte.";
      } else if (drop1 > (scenario.negotiableVariables[0].max - scenario.negotiableVariables[0].min) * 0.4) {
        score = 6;
        feedback = "Concesión inicial prematura: Cediste demasiado valor económico en las primeras rondas sin comprobar previamente el margen de flexibilidad del comprador.";
      } else {
        score = 11;
        feedback = "Manejo de concesiones aceptable con interacción progresiva en la mesa.";
      }
    }

    return { score, maxScore: 15, feedback };
  }

  static _evalNegotiationProcess(engine, isAgreement) {
    let score = 10;
    const rounds = engine.currentRound;

    if (isAgreement) {
      if (rounds >= 2 && rounds <= 4) {
        score = 15; // Cierre óptimo y eficiente
      } else if (rounds === 1) {
        score = 9; // Posible acuerdo apresurado (winner's curse)
      } else {
        score = 12; // Cierre en última ronda
      }
    } else {
      score = rounds >= 4 ? 12 : 7;
    }

    const feedback = score >= 13
      ? "Ritmo de negociación eficiente: Supiste explorar alternativas en el tiempo adecuado y llevar el proceso a un cierre oportuno sin desgaste innecesario."
      : "Oportunidad en el ritmo de negociación: Procura dosificar los intercambios y formular preguntas exploratorias para identificar los intereses profundos de la contraparte.";

    return { score, maxScore: 15, feedback };
  }

  static _calculateConcessionsSummary(scenario, history) {
    const summary = [];
    scenario.negotiableVariables.forEach(v => {
      const expInitial = v.initialExporter;
      const buyerInitial = v.initialBuyer;

      const lastExp = history.filter(h => h.sender === "exporter").pop();
      const lastBuyer = history.filter(h => h.sender === "buyer").pop();

      const expFinal = lastExp ? lastExp.offer[v.id] : expInitial;
      const buyerFinal = lastBuyer ? lastBuyer.offer[v.id] : buyerInitial;

      let expConcessionText = "Sin cambios";
      let buyerConcessionText = "Sin cambios";

      if (v.type === "numeric") {
        const expDelta = expFinal - expInitial;
        const buyerDelta = buyerFinal - buyerInitial;
        expConcessionText = `${expDelta >= 0 ? '+' : ''}${expDelta} ${v.unit}`;
        buyerConcessionText = `${buyerDelta >= 0 ? '+' : ''}${buyerDelta} ${v.unit}`;
      } else {
        expConcessionText = expFinal !== expInitial ? "Flexibilizó opción" : "Mantuvo cláusula";
        buyerConcessionText = buyerFinal !== buyerInitial ? "Flexibilizó opción" : "Mantuvo cláusula";
      }

      const formatVal = (val) => {
        if (v.type === "select" && v.options) {
          const opt = v.options.find(o => o.value === val);
          return opt ? opt.label : val;
        }
        return `${val} ${v.unit ? v.unit : ''}`.trim();
      };

      const expInitialFmt = formatVal(expInitial);
      const expFinalFmt = formatVal(expFinal);
      const buyerInitialFmt = formatVal(buyerInitial);
      const buyerFinalFmt = formatVal(buyerFinal);

      summary.push({
        variable: v.name,
        variableName: v.name,
        exporterInitial: expInitialFmt,
        exporterFinal: expFinalFmt,
        exporterConcession: expConcessionText,
        buyerInitial: buyerInitialFmt,
        buyerFinal: buyerFinalFmt,
        buyerConcession: buyerConcessionText,
        expInitial: expInitialFmt,
        expFinal: expFinalFmt,
        expConcession: expConcessionText,
        rawExpFinal: expFinal,
        rawBuyerFinal: buyerFinal,
        unit: v.unit
      });
    });

    return summary;
  }

  static _getStatusLabel(status) {
    switch (status) {
      case "agreement_reached": return "Acuerdo Comercial Concretado";
      case "rejected": return "Retiro Estratégico (Walkaway / BATNA)";
      case "deadlock": return "Negociación Cerrada sin Acuerdo (Límite de Rondas)";
      default: return "En Curso";
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NegotiationEvaluator };
}
