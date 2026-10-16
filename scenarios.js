/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * scenarios.js - Catálogo de Escenarios de Negociación Internacional
 * 
 * Cumple exhaustivamente con la Ficha de Escenario requerida:
 * - Identificador, título, sector, países, producto/servicio.
 * - Contexto comercial documentado y referencias bibliográficas verificables.
 * - Tipo de material claramente clasificado.
 * - Objetivos pedagógicos y nivel de dificultad.
 * - Variables negociables estructuradas.
 * - Condiciones iniciales conocidas por el exportador (Costes, BATNA, márgenes).
 * - Perfil confidencial del comprador simulado (umbrales, pesos, estilo, dealbreakers).
 * - Criterios de éxito y condiciones de cierre.
 * - Parámetros hipotéticos añadidos claramente identificados.
 * - Modalidades: 'fixed_rules' (reglas fijas deterministas) y 'ai_ready' (IA).
 */

const NEGOTIATION_SCENARIOS = [
  {
    id: "SCN-01",
    title: "Squad Ágil de Desarrollo Nearshore para Retail Omnicanal en Chile",
    sector: "Desarrollo de Software y Servicios Digitales",
    exporterCountry: "Perú",
    buyerCountry: "Chile",
    productOrService: "Célula Ágil (Dedicated Agile Squad) de desarrollo de software full-stack (4 desarrolladores senior/semi-senior + 1 Scrum Master / Tech Lead) durante 8 meses para modernizar la pasarela omnicanal y microservicios de comercio electrónico.",
    
    documentedContext: "Las exportaciones peruanas de software hacia la Alianza del Pacífico (particularmente Chile y Colombia) han crecido sostenidamente gracias a ventajas de huso horario (GMT-5), afinidad cultural, costos altamente competitivos y la homologación tributaria para la exportación de servicios intangibles (promovida por la Ley de Fomento a la Exportación de Servicios y ruedas de negocio anuales de PROMPERÚ en el Perú Service Summit). Los compradores corporativos chilenos valoran la capacidad técnica pero ejercen alta presión por garantías de código, plazos estrictos de respuesta en incidentes (SLA) y tarifas por hora competitivas frente a competidores de Colombia y Argentina.",
    
    source: {
      sourceId: "SRC-PROMPERU-02",
      institution: "PROMPERÚ & Perú Service Summit",
      reference: "PROMPERÚ (2023). Informe de Inteligencia Comercial de Software y Servicios TI para el Mercado de Chile; y Modelo Contractual ITC 'International Supply of Services' (2010).",
      url: "https://peruservicesummit.com",
      license: "Uso público de información sectorial y buenas prácticas comerciales"
    },
    
    materialType: "Escenario original inspirado en fuentes públicas y modelos contractuales ITC/PROMPERÚ",
    pedagogicalObjective: "Aprender a defender la tarifa hora-hombre sin caer en guerras de precios destructivas, negociar condiciones de pago (anticipo vs. crédito) que aseguren liquidez de nómina, y proteger la titularidad de los frameworks base (propiedad intelectual) mediante cláusulas equilibradas de entrega y SLA.",
    difficulty: "Intermedio",
    
    // Variables de la negociación
    negotiableVariables: [
      {
        id: "hourly_rate",
        name: "Tarifa por Hora / Desarrollador",
        unit: "USD/hora",
        type: "numeric",
        min: 35,
        max: 75,
        step: 1,
        initialExporter: 58,
        initialBuyer: 42,
        description: "Tarifa horaria promedio facturada por cada miembro del squad (considera 800 horas mensuales totales del equipo)."
      },
      {
        id: "advance_payment",
        name: "Anticipo Inicial de Facturación",
        unit: "%",
        type: "numeric",
        min: 0,
        max: 40,
        step: 5,
        initialExporter: 25,
        initialBuyer: 0,
        description: "Porcentaje del valor mensual o del contrato adelantado al inicio del sprint para asegurar flujo de caja."
      },
      {
        id: "sla_warranty_months",
        name: "Garantía de Código y Soporte Post-Entrega",
        unit: "Meses",
        type: "numeric",
        min: 1,
        max: 12,
        step: 1,
        initialExporter: 3,
        initialBuyer: 6,
        description: "Periodo posterior al despliegue en que el exportador asume corrección de bugs sin costo adicional."
      },
      {
        id: "payment_term_days",
        name: "Plazo de Pago de Facturas Mensuales",
        unit: "Días",
        type: "numeric",
        min: 15,
        max: 90,
        step: 15,
        initialExporter: 15,
        initialBuyer: 60,
        description: "Días calendario otorgados al cliente para cancelar las facturas quincenales/mensuales aprobadas."
      },
      {
        id: "ip_rights",
        name: "Cláusula de Propiedad Intelectual",
        unit: "Modalidad",
        type: "select",
        options: [
          { value: "full_assignment", label: "Cesión total del código fuente (incluye librerías internas del exportador)", scoreBonusBuyer: 1.0, scoreBonusExp: -0.8 },
          { value: "custom_code_only", label: "Cesión del código a medida; licencia perpetua de frameworks base del exportador", scoreBonusBuyer: 0.7, scoreBonusExp: 0.5 },
          { value: "exclusive_license", label: "Licencia de uso exclusiva para retail sin cesión de autoría", scoreBonusBuyer: 0.3, scoreBonusExp: 1.0 }
        ],
        initialExporter: "custom_code_only",
        initialBuyer: "full_assignment",
        description: "Régimen legal de los derechos de autor sobre el código y librerías preexistentes."
      }
    ],
    
    // Dossier inicial del Exportador Peruano (Público para el usuario)
    exporterInitialDossier: {
      companyName: "InkaTech Solutions S.A.C. (San Isidro, Lima)",
      costStructure: "Costo directo mensual del squad (5 profesionales senior/semi): 25,600 USD (equivale a aprox. 32 USD/hora de costo marginal con cargas sociales y equipamiento).",
      targetPrice: "55 - 60 USD/hora (Margen bruto objetivo del 42% - 47%).",
      walkawayPoint: "44 USD/hora con al menos 15% de anticipo. Por debajo de 42 USD/hora el proyecto destruye margen operativo y genera riesgo de rotación de ingenieros.",
      batnaDescription: "Propuesta paralela de una startup fintech de Bogotá para contratar 3 desarrolladores a 48 USD/hora a 6 meses con pago a 30 días, aunque con menor volumen de horas totales.",
      criticalNeeds: [
        "No ceder la propiedad de los módulos genéricos de autenticación y pasarela desarrollados previamente por InkaTech (usar fórmula 'custom_code_only').",
        "Evitar plazos de crédito a 60 o 90 días, ya que el exportador debe pagar salarios cada quincena y el costo de financiamiento bancario en Lima es de aprox. 9.5% anual.",
        "Limitar el periodo de garantía a no más de 3-4 meses para evitar arrastrar recursos en mantenimiento no facturado."
      ]
    },
    
    // Perfil Confidencial del Comprador Simulado (Oculto al usuario durante la simulación)
    buyerConfidentialProfile: {
      buyerName: "Gonzalo Valenzuela",
      buyerRole: "Gerente Corporativo de Transformación Digital & Abastecimiento",
      companyName: "Cencor Retail Group Chile (Las Condes, Santiago)",
      negotiationStyle: "Analítico, directo y enfocado en presupuesto corporativo y mitigación de riesgo operacional. Usa la competencia colombiana y argentina como palanca de presión.",
      
      // Parámetros económicos confidenciales
      targetPrice: 46, // Precio deseado
      maxReservationPrice: 53, // Disposición máxima a pagar (Walkaway del comprador)
      minAcceptableAdvance: 0, // Preferencia de no pagar anticipo
      maxAcceptableAdvance: 20, // Límite máximo de anticipo que autoriza finanzas
      targetPaymentDays: 60, // Política corporativa habitual
      minPaymentDaysAllowed: 30, // Solo acepta bajar a 30 días si el exportador concede en tarifa
      targetSlaWarranty: 6,
      minSlaWarranty: 3,
      preferredIp: "custom_code_only", // En realidad su directorio legal acepta custom_code_only, pero piden full_assignment para negociar concesiones
      
      // Ponderación de variables para el cálculo de utilidad
      weights: {
        hourly_rate: 0.40,
        payment_term_days: 0.20,
        advance_payment: 0.15,
        sla_warranty_months: 0.15,
        ip_rights: 0.10
      },
      
      // Respuestas y objeciones tácticas predefinidas según la brecha de oferta
      dialogueTriggers: {
        highRate: "Su tarifa de {rate} USD/h excede nuestro techo presupuestal para el Q3. Tenemos cotizaciones de Medellín en 44 USD/h. Si no ajustan tarifa, el comité desestimará la propuesta.",
        longPayment: "Nuestra política de tesorería corporativa en Chile opera a 60 días. Para autorizar pagos a 30 días o anticipo requerimos que respalden el ahorro con una tarifa no mayor a 50 USD/h.",
        fullIpDemanded: "Requerimos certidumbre jurídica total sobre el código desarrollado. Sin embargo, si nos garantizan licencia perpetua irrestricta de sus frameworks base, podemos flexibilizar la cesión exclusiva únicamente al código custom.",
        closeToAgreement: "Estamos cerca de un acuerdo viable. Si ajustan la tarifa a {target} USD/h y cerramos en 30 días de crédito con 3 meses de garantía técnica, lo someto hoy mismo a aprobación de directorio."
      }
    },
    
    successCriteria: "Cerrar un acuerdo en o por encima de 48 USD/h con pagos no mayores a 30 días, preservando la propiedad de frameworks base (custom_code_only) y limitando la garantía a un máximo de 4 meses.",
    
    hypotheticalParametersFlag: [
      "El nombre de la empresa compradora y los montos exactos de reserva (46-53 USD/h) son parámetros hipotéticos calculados para fines didácticos basados en los rangos promedio reportados por PROMPERÚ en el Perú Service Summit (40-60 USD/h para squads nearshore).",
      "Las ponderaciones de utilidad matemática (40% precio, 20% crédito, etc.) son una modelación pedagógica para alimentar el motor determinista."
    ],
    
    availableModes: ["fixed_rules", "ai_ready"]
  },

  {
    id: "SCN-02",
    title: "Coproducción y Licencia de Distribución Internacional de Largometraje Animado 3D",
    sector: "Producción Audiovisual, Animación 3D y Servicios Creativos",
    exporterCountry: "Perú",
    buyerCountry: "Estados Unidos / Países Bajos",
    productOrService: "Cesión de derechos de distribución internacional, ventas previas (pre-sales) y coproducción de un largometraje animado 3D de alta factura técnica y temática cultural originaria (inspirado en el caso de éxito de 'Ainbo: La Guerrera Amazónica').",
    
    documentedContext: "El caso del largometraje peruano 'Ainbo: La Guerrera Amazónica' (producido por Tunche Films en Lima, coproducido con Cool Beats de Holanda y comercializado por Cinema Management Group - CMG de Los Ángeles) marcó un precedente histórico para la animación en Perú. Logró pre-venderse en más de 80 territorios internacionales antes de su estreno y ganar premios internacionales como el Premio Platino. La negociación con distribuidoras y agentes de ventas globales exige equilibrar el cobro de una Garantía Mínima (Minimum Guarantee - MG), el reparto de ingresos de taquilla/VOD (Revenue Share / Royalties), y retener los derechos para Perú y América Latina, sin perder el control artístico del corte final.",
    
    source: {
      sourceId: "SRC-PROMPERU-01",
      institution: "PROMPERÚ & LatAm Cinema",
      reference: "PROMPERÚ (2021). Noticia oficial: 'Animación peruana Ainbo triunfa en el mundo'; LatAm Cinema (2020) 'El modelo de coproducción internacional de Ainbo'; WIPO Publication No. 950.",
      url: "https://www.gob.pe/institucion/promperu/noticias/508493-animacion-peruana-ainbo-triunfa-en-el-mundo",
      license: "Uso pedagógico e informativo de hechos y modelos de negocio de dominio público"
    },
    
    materialType: "Caso real documentado con parámetros cuantitativos adaptados para simulación",
    pedagogicalObjective: "Comprender la dinámica de una Garantía Mínima (MG) no reembolsable en distribución cinematográfica, negociar los porcentajes de 'back-end' (regalías de taquilla), reservar la explotación comercial en el territorio local y defender la integridad autoral frente a distribuidores internacionales.",
    difficulty: "Avanzado",
    
    negotiableVariables: [
      {
        id: "minimum_guarantee",
        name: "Garantía Mínima de Distribución (MG)",
        unit: "Miles de USD",
        type: "numeric",
        min: 150,
        max: 600,
        step: 25,
        initialExporter: 450,
        initialBuyer: 225,
        description: "Monto no reembolsable que el distribuidor internacional adelanta al estudio peruano contra futuras regalías de explotación."
      },
      {
        id: "revenue_share_pct",
        name: "Participación en Ingresos / Regalías Netas (Back-end)",
        unit: "%",
        type: "numeric",
        min: 10,
        max: 40,
        step: 5,
        initialExporter: 30,
        initialBuyer: 15,
        description: "Porcentaje de los ingresos netos de distribución mundial que recibirá el estudio peruano una vez recuperada la Garantía Mínima y gastos aprobados."
      },
      {
        id: "territorial_rights",
        name: "Exclusión de Territorios para Explotación Directa",
        unit: "Cobertura",
        type: "select",
        options: [
          { value: "peru_and_latam", label: "El exportador retiene Perú y toda América Latina (Distribuidor maneja Resto del Mundo)", scoreBonusBuyer: 0.2, scoreBonusExp: 1.0 },
          { value: "peru_only", label: "El exportador retiene únicamente territorio Perú (Distribuidor maneja todo el exterior)", scoreBonusBuyer: 0.7, scoreBonusExp: 0.5 },
          { value: "worldwide", label: "Distribuidor asume derechos mundiales absolutos (incluido Perú)", scoreBonusBuyer: 1.0, scoreBonusExp: -0.7 }
        ],
        initialExporter: "peru_and_latam",
        initialBuyer: "worldwide",
        description: "Delimitación geográfica de los derechos de explotación teatral, streaming y TV."
      },
      {
        id: "delivery_window_months",
        name: "Plazo de Entrega del Master Final 4K (DCP)",
        unit: "Meses",
        type: "numeric",
        min: 10,
        max: 24,
        step: 2,
        initialExporter: 18,
        initialBuyer: 12,
        description: "Tiempo concedido al estudio de animación para culminar render, iluminación, doblaje y masterización final."
      },
      {
        id: "creative_control",
        name: "Aprobación de Edición y Corte Final (Final Cut)",
        unit: "Cláusula",
        type: "select",
        options: [
          { value: "director_exclusive", label: "Corte final exclusivo del director peruano", scoreBonusBuyer: 0.0, scoreBonusExp: 1.0 },
          { value: "joint_consultation", label: "Aprobación conjunta (estudio peruano y distribuidor internacional)", scoreBonusBuyer: 0.8, scoreBonusExp: 0.7 },
          { value: "distributor_final", label: "Distribuidor tiene la última palabra sobre el montaje comercial", scoreBonusBuyer: 1.0, scoreBonusExp: -0.5 }
        ],
        initialExporter: "director_exclusive",
        initialBuyer: "distributor_final",
        description: "Facultad legal para decidir el montaje definitivo de la película para exhibición global."
      }
    ],
    
    exporterInitialDossier: {
      companyName: "Amazonia Animation Studios (Barranco, Lima)",
      costStructure: "Presupuesto total estimado de producción del largometraje: 1.8 millones de USD. Ya se cuenta con 700,000 USD de fondos concursables de DAFO (Ministerio de Cultura) y coproductores holandeses.",
      targetPrice: "Garantía Mínima (MG) de al menos 350,000 - 400,000 USD y 25% de Revenue Share.",
      walkawayPoint: "MG inferior a 275,000 USD o pérdida de derechos sobre América Latina deja al estudio en grave vulnerabilidad financiera.",
      batnaDescription: "Distribuidora europea independiente ofrece 250,000 USD de MG pero solo para 4 países francófonos, lo cual deja abierta la ventana comercial pero no cubre el presupuesto de cierre de animación.",
      criticalNeeds: [
        "Retener los derechos para Perú y de ser posible Latinoamérica, donde el estudio ya tiene alianzas de exhibición comercial.",
        "Obtener un plazo de entrega realista de mínimo 16 meses para no comprometer la calidad del renderizado y VFX.",
        "Asegurar fórmula de aprobación conjunta (joint_consultation) para no desvirtuar el guion cultural amazónico."
      ]
    },
    
    buyerConfidentialProfile: {
      buyerName: "Arthur Vance",
      buyerRole: "Executive VP of Worldwide Acquisitions & Sales",
      companyName: "Pacific Coast Film Distribution (Beverly Hills, CA, EE. UU.)",
      negotiationStyle: "Agresivo comercialmente, con vasta experiencia en mercados internacionales (Cannes, AFM, EFM). Presiona argumentando los enormes costos de P&A (copias y publicidad) y el riesgo de taquilla.",
      
      targetPrice: 250, // en miles de USD de MG
      maxReservationPrice: 375, // Máxima MG que puede desembolsar
      targetRevenueShare: 15,
      maxRevenueShareAllowed: 25,
      preferredTerritories: "worldwide",
      acceptableTerritories: "peru_only", // Puede aceptar que retengan Perú, pero lucha duro por Latinoamérica
      minDeliveryMonths: 14,
      targetCreativeControl: "distributor_final",
      acceptableCreativeControl: "joint_consultation",
      
      weights: {
        minimum_guarantee: 0.35,
        territorial_rights: 0.25,
        revenue_share_pct: 0.15,
        creative_control: 0.15,
        delivery_window_months: 0.10
      },
      
      dialogueTriggers: {
        highMG: "Un MG de {mg} mil USD es inviable para un estudio de animación sin un track record previo en salas de EE. UU. El mercado del cine independiente está muy contraído.",
        territories: "Para que podamos financiar los trailers y el paquete de doblaje en 15 idiomas necesitamos la distribución mundial completa o al menos toda América Latina excluida de su control directo.",
        creative: "En Hollywood los distribuidores asumen el riesgo de P&A; no podemos arriesgar millones si no tenemos derecho a optimizar el ritmo y montaje comercial para el público internacional.",
        closeToAgreement: "Si acordamos un MG de {target} mil USD, retienen los derechos cinematográficos de Perú, acordamos aprobación mutua de corte y nos entregan el master en 16 meses, cerramos el trato hoy mismo."
      }
    },
    
    successCriteria: "Obtener un MG de al menos 300,000 USD, retener al menos Perú (o Perú + Latam), lograr al menos 20% de revenue share y establecer corte final conjunto (joint consultation).",
    
    hypotheticalParametersFlag: [
      "Los montos exactos de la Garantía Mínima (150k - 600k USD) y los porcentajes de revenue share fueron parametrizados para la jugabilidad del caso basándose en la estructura típica de acuerdos de pre-ventas reportados por WIPO Publication 950 y Variety/LatAm Cinema.",
      "El nombre 'Arthur Vance' y 'Pacific Coast Film' son ficcionales para la simulación pedagógica."
    ],
    
    availableModes: ["fixed_rules", "ai_ready"]
  },

  {
    id: "SCN-03",
    title: "Suministro Anual de Cacao Orgánico Fino de Aroma con Certificación Fairtrade",
    sector: "Agroexportación Sostenible y Cadenas de Valor",
    exporterCountry: "Perú",
    buyerCountry: "Suiza",
    productOrService: "Contrato marco de suministro anual de 125 Toneladas Métricas (5 contenedores de 25 TM c/u) de Granos de Cacao Orgánico Grado 1 Fino de Aroma (variedad Criollo/Nativo) con certificación Fairtrade (Comercio Justo) y debida diligencia de trazabilidad satelital libre de deforestación (EUDR).",
    
    documentedContext: "Las cooperativas cacaoteras peruanas de San Martín, Amazonas y Piura (como Acopagro y Norandino) son líderes mundiales en la exportación de cacao fino de aroma orgánico a chocolateras gourmet de Suiza, Bélgica y Alemania. Con la implementación del Reglamento Europeo sobre Productos Libres de Deforestación (EUDR) y la volatilidad histórica de los precios del cacao en la bolsa ICE de Nueva York, los exportadores deben negociar no solo el precio base FOB, sino primas por sostenibilidad, métodos seguros de pago (Cartas de Crédito irrevocables confirmadas para evitar impagos internacionales) y tolerancias de calidad física (humedad máxima y fermentación).",
    
    source: {
      sourceId: "SRC-SECO-01",
      institution: "Cooperación Suiza (SECO) & SIPPO / Agromercado",
      reference: "SECO (2022). Sistematización de Experiencias del Programa SeCompetitivo: Cadenas de Valor de Cacao Fino de Aroma; Contrato Modelo ITC 'International Commercial Sale of Goods' (CISG/Incoterms 2020).",
      url: "https://www.cooperacionsuiza.pe/proyectos/secompetitivo/",
      license: "Uso institucional y educativo de buenas prácticas de comercio justo"
    },
    
    materialType: "Caso real documentado con modelación de parámetros comerciales según normas ITC",
    pedagogicalObjective: "Aprender a estructurar un contrato de compraventa internacional bajo Incoterms 2020, negociar primas de comercio justo y sostenibilidad, y mitigar el riesgo crediticio transfronterizo mediante instrumentos bancarios garantizados.",
    difficulty: "Principiante",
    
    negotiableVariables: [
      {
        id: "base_price_fob",
        name: "Precio Base FOB Puerto del Callao/Paita",
        unit: "USD / Tonelada Métrica",
        type: "numeric",
        min: 4200,
        max: 6800,
        step: 50,
        initialExporter: 5800,
        initialBuyer: 4600,
        description: "Precio pactado por tonelada métrica de grano seco de cacao puesto a bordo del buque en puerto peruano."
      },
      {
        id: "sustainability_premium",
        name: "Prima por Orgánico + Fairtrade + Trazabilidad EUDR",
        unit: "USD / TM Adicional",
        type: "numeric",
        min: 200,
        max: 800,
        step: 50,
        initialExporter: 600,
        initialBuyer: 300,
        description: "Diferencial sobre el precio base destinado al fondo de desarrollo social de los agricultores y certificación satelital de no deforestación."
      },
      {
        id: "payment_method",
        name: "Modalidad y Término de Pago Internacional",
        unit: "Mecanismo",
        type: "select",
        options: [
          { value: "confirmed_lc", label: "Carta de Crédito Irrevocable y Confirmada a la vista (Máxima seguridad)", scoreBonusBuyer: 0.3, scoreBonusExp: 1.0 },
          { value: "advance_plus_cad", label: "30% de anticipo a la firma + 70% Contra Entrega de Documentos (CAD)", scoreBonusBuyer: 0.7, scoreBonusExp: 0.8 },
          { value: "cad_at_destination", label: "Pago contra documentos a la llegada al puerto de destino (Rotterdam/Hamburgo)", scoreBonusBuyer: 0.9, scoreBonusExp: 0.2 },
          { value: "open_account_60", label: "Cuenta abierta con pago diferido a 60 días tras recepción", scoreBonusBuyer: 1.0, scoreBonusExp: -0.9 }
        ],
        initialExporter: "confirmed_lc",
        initialBuyer: "open_account_60",
        description: "Mecanismo de liquidación bancaria internacional que distribuye el riesgo crediticio."
      },
      {
        id: "max_humidity_pct",
        name: "Tolerancia Máxima de Humedad del Grano",
        unit: "% Humedad",
        type: "numeric",
        min: 6.5,
        max: 8.5,
        step: 0.1,
        initialExporter: 7.5,
        initialBuyer: 6.8,
        description: "Límite físico de humedad aceptado en destino para evitar formación de hongos durante la travesía marítima."
      },
      {
        id: "incoterm",
        name: "Término Internacional de Comercio (Incoterms 2020)",
        unit: "Regla",
        type: "select",
        options: [
          { value: "fob_callao", label: "FOB Callao/Paita (Comprador asume flete marítimo y seguro internacional)", scoreBonusBuyer: 0.4, scoreBonusExp: 0.9 },
          { value: "cif_rotterdam", label: "CIF Rotterdam (Exportador contrata y costea flete marítimo y seguro marítimo)", scoreBonusBuyer: 0.9, scoreBonusExp: 0.3 }
        ],
        initialExporter: "fob_callao",
        initialBuyer: "cif_rotterdam",
        description: "Determina el punto de transferencia de costos, riesgos de transporte y seguro."
      }
    ],
    
    exporterInitialDossier: {
      companyName: "Cooperativa Agroecológica Aromas del Huallaga (San Martín, Perú)",
      costStructure: "Costo de acopio a pequeños agricultores, secado, fermentación y control fitosanitario: 4,400 USD/TM. El coste de certificación orgánica y georreferenciación satelital EUDR demanda 280 USD/TM adicionales.",
      targetPrice: "Precio base FOB de 5,400 USD/TM + 500 USD/TM de prima Fairtrade (Total: 5,900 USD/TM).",
      walkawayPoint: "Precio total menor a 5,000 USD/TM (Base + Prima) o pago a cuenta abierta a 60 días destruye el capital de trabajo de la cooperativa y le impide pagar a los comuneros.",
      batnaDescription: "Trader multinacional holandés en Lima ofrece comprar los 5 contenedores a 4,950 USD/TM FOB en efectivo contra entrega en almacén de Callao, sin pagar prima social de desarrollo.",
      criticalNeeds: [
        "Asegurar cobro garantizado (Carta de crédito irrevocable o al menos 30% de anticipo bancario con CAD).",
        "Negociar FOB puerto peruano para evitar la volatilidad de fletes marítimos en la ruta del Canal de Panamá.",
        "Defender una humedad máxima del 7.3% - 7.5% (el estándar suizo de 6.8% es extremadamente rígido y arriesga penalidades por desecación)."
      ]
    },
    
    buyerConfidentialProfile: {
      buyerName: "Markus Schultheiss",
      buyerRole: "Director de Abastecimiento Sostenible y Calidad",
      companyName: "Chocolats Fins de Berne & Zürich A.G. (Suiza)",
      negotiationStyle: "Meticuloso, enfocado en cumplimiento normativo europeo (EUDR), trazabilidad libre de trabajo infantil y estándares de laboratorio físico-químico.",
      
      targetPrice: 4800,
      maxReservationPrice: 5400,
      targetPremium: 350,
      maxPremiumAllowed: 550,
      preferredPayment: "cad_at_destination",
      acceptablePayment: "advance_plus_cad", // Puede aceptar 30% anticipo + CAD
      targetHumidity: 7.0,
      maxHumidityAllowed: 7.4,
      preferredIncoterm: "cif_rotterdam",
      acceptableIncoterm: "fob_callao",
      
      weights: {
        base_price_fob: 0.35,
        sustainability_premium: 0.20,
        payment_method: 0.25,
        max_humidity_pct: 0.10,
        incoterm: 0.10
      },
      
      dialogueTriggers: {
        highPrice: "Apreciamos la calidad del grano peruano, pero un precio FOB de {price} USD/TM más prima pone nuestro costo en fábrica por encima del cacao ecuatoriano y ghanés.",
        paymentRisk: "Una Carta de Crédito confirmada nos genera altos costos financieros con los bancos helvéticos. Proponemos un esquema mixto de anticipo del 25% y saldo contra conocimiento de embarque (B/L).",
        humidity: "Nuestros maestros chocolateros son estrictos con la humedad: un grano con más del 7.4% corre riesgo de fermentación anaeróbica en el cruce del Atlántico.",
        closeToAgreement: "Si podemos fijar el precio FOB en {target} USD/TM con 450 USD/TM de prima Fairtrade, 30% de anticipo + CAD, e Incoterm FOB Callao, firmamos el contrato anual de los 5 contenedores."
      }
    },
    
    successCriteria: "Alcanzar un precio combinado (Base + Prima) de al menos 5,300 USD/TM, con Incoterm FOB Callao y forma de pago con anticipo o Carta de Crédito.",
    
    hypotheticalParametersFlag: [
      "Los valores de precio base reflejan rangos del mercado internacional de cacao pero han sido normalizados con propósitos didácticos para evitar la volatilidad de commodities en tiempo real.",
      "La empresa compradora suiza y sus límites exactos son una modelación representativa de las chocolateras europeas de especialidad."
    ],
    
    availableModes: ["fixed_rules", "ai_ready"]
  },

  {
    id: "SCN-04",
    title: "Publishing y Cofinanciamiento de Videojuego Indie Multiplataforma",
    sector: "Videojuegos, Software Interactivo y Licenciamiento",
    exporterCountry: "Perú",
    buyerCountry: "Alemania",
    productOrService: "Acuerdo de publicación comercial (Publishing Agreement) y adelanto de cofinanciamiento para culminar el desarrollo de un videojuego de aventura y narrativa cultural andina para plataformas PC (Steam/Epic) y Consolas (Nintendo Switch, PlayStation 5).",
    
    documentedContext: "Estudios independientes de desarrollo de videojuegos en Perú (como Leap Game Studios con 'Arrog' o 'Tunche', ganadores en festivales internacionales y respaldados por misiones de PROMPERÚ en la Game Developers Conference - GDC y Gamescom en Colonia) negocian frecuentemente con publishers europeos. Estas negociaciones definen el adelanto de producción para cubrir nómina de programadores y artistas, el reparto de ingresos post-recuperación (Revenue Share post-recoup), la inversión mínima en marketing del editor y la vital retención de la Propiedad Intelectual (IP) y derechos de secuelas.",
    
    source: {
      sourceId: "SRC-WIPO-01",
      institution: "WIPO (World Intellectual Property Organization)",
      reference: "Greenspan, D., Boyd, S. G., & Purewal, J. (2014). Mastering the Game: Business and Legal Issues for Video Game Developers. WIPO Publication No. 950.",
      url: "https://www.wipo.int/edocs/pubdocs/en/copyright/950/wipo_pub_950.pdf",
      license: "Uso pedagógico oficial de la Organización Mundial de la Propiedad Intelectual"
    },
    
    materialType: "Caso real con adaptación de cláusulas modelo recomendadas por WIPO",
    pedagogicalObjective: "Dominar la mecánica de adelantos de desarrollo (Milestone Advances) vs. recuperación de costes (Recoupment), retener la titularidad de la franquicia y propiedad intelectual (IP) y garantizar un presupuesto de marketing vinculante para el éxito del título.",
    difficulty: "Avanzado",
    
    negotiableVariables: [
      {
        id: "milestone_advance",
        name: "Adelanto de Fondos de Desarrollo (Development Advance)",
        unit: "Miles de USD",
        type: "numeric",
        min: 80,
        max: 300,
        step: 10,
        initialExporter: 240,
        initialBuyer: 110,
        description: "Monto total financiado por el publisher en desembolsos por hitos (alpha, beta, gold) para financiar al estudio."
      },
      {
        id: "revenue_share_post_recoup",
        name: "Reparto de Ingresos para el Estudio (Post-Recoupment)",
        unit: "% a favor del estudio",
        type: "numeric",
        min: 40,
        max: 85,
        step: 5,
        initialExporter: 75,
        initialBuyer: 50,
        description: "Porcentaje de las ventas netas que corresponden al estudio peruano una vez que el publisher recupera el adelanto."
      },
      {
        id: "guaranteed_marketing_budget",
        name: "Presupuesto Mínimo Garantizado de Marketing y PR",
        unit: "Miles de USD",
        type: "numeric",
        min: 30,
        max: 150,
        step: 10,
        initialExporter: 100,
        initialBuyer: 40,
        description: "Monto mínimo que el publisher está contractualmente obligado a invertir en ferias, trailers, prensa e influencers."
      },
      {
        id: "platform_exclusivity_months",
        name: "Exclusividad Temporal de Plataforma / Lanzamiento",
        unit: "Meses",
        type: "numeric",
        min: 0,
        max: 12,
        step: 3,
        initialExporter: 0,
        initialBuyer: 9,
        description: "Meses en que el juego debe ser exclusivo de ciertas plataformas antes de poder lanzarse en otros ecosistemas."
      },
      {
        id: "ip_and_sequel_rights",
        name: "Derechos de Propiedad Intelectual (IP) y Secuelas",
        unit: "Cláusula Legal",
        type: "select",
        options: [
          { value: "studio_owns_all", label: "El estudio retiene 100% de la IP, marcas, personajes y derecho exclusivo de secuelas", scoreBonusBuyer: 0.2, scoreBonusExp: 1.0 },
          { value: "studio_ip_publisher_rofr", label: "El estudio retiene la IP; publisher tiene Derecho de Primera Opción (ROFR) para secuelas", scoreBonusBuyer: 0.7, scoreBonusExp: 0.8 },
          { value: "co_owned_ip", label: "Co-propiedad 50/50 de la marca y de los personajes", scoreBonusBuyer: 0.9, scoreBonusExp: 0.1 },
          { value: "publisher_owns_ip", label: "Cesión total de la IP al publisher (Estudio solo como desarrollador a sueldo)", scoreBonusBuyer: 1.0, scoreBonusExp: -1.0 }
        ],
        initialExporter: "studio_owns_all",
        initialBuyer: "studio_ip_publisher_rofr",
        description: "Determinación de a quién pertenecerán los derechos de franquicia y adaptaciones a otros medios."
      }
    ],
    
    exporterInitialDossier: {
      companyName: "Runa Interactive Studios (Pueblo Libre, Lima)",
      costStructure: "Costo para culminar 10 meses restantes de desarrollo: 160,000 USD (nómina de 6 personas full-time + sonido + licencias de motor de juego).",
      targetPrice: "Adelanto de 180,000 - 200,000 USD con al menos 65% de revenue share post-recoup.",
      walkawayPoint: "Adelanto inferior a 140,000 USD (no alcanza para terminar el juego sin despedir personal) o ceder la propiedad de la IP.",
      batnaDescription: "Lanzar en Early Access / Kickstarter por cuenta propia, con riesgo alto de visibilidad nula en Steam sin presupuesto de marketing profesional.",
      criticalNeeds: [
        "Jamás ceder la propiedad intelectual de la marca y los personajes (la IP es el principal activo a largo plazo del estudio).",
        "Obligar al publisher a un piso mínimo de gasto en marketing (al menos 60,000 USD) para evitar que el juego quede 'sepultado' en la tienda de Steam.",
        "Obtener un revenue share de mínimo 60% tras el recoupment."
      ]
    },
    
    buyerConfidentialProfile: {
      buyerName: "Elena Klaus",
      buyerRole: "Head of Indie Publishing & Developer Relations",
      companyName: "Nordic-Rhine Interactive Publishing GmbH (Colonia, Alemania)",
      negotiationStyle: "Estratégica, conocedora de métricas de mercado de Steam y algoritmos de visibilidad. Busca maximizar su margen en los primeros meses post-lanzamiento.",
      
      targetAdvance: 130,
      maxAdvanceAllowed: 190,
      targetRevShare: 55,
      maxRevShareAllowed: 70, // Puede conceder hasta 70% si el estudio cede en exclusividad
      targetMarketing: 50,
      maxMarketingAllowed: 90,
      preferredIpClause: "studio_ip_publisher_rofr",
      acceptableIpClause: "studio_ip_publisher_rofr", // No insiste en publisher_owns_ip porque sabe que asusta a los estudios, pero exige ROFR
      targetExclusivity: 6,
      minExclusivityAllowed: 3,
      
      weights: {
        milestone_advance: 0.30,
        revenue_share_post_recoup: 0.25,
        guaranteed_marketing_budget: 0.20,
        ip_and_sequel_rights: 0.15,
        platform_exclusivity_months: 0.10
      },
      
      dialogueTriggers: {
        highAdvance: "Un adelanto de {adv} mil USD supera nuestro fondo promedio para títulos debutantes. Podríamos llegar a una cifra intermedia si acordamos un esquema de hitos estricto y derecho de primera opción (ROFR).",
        highRevShare: "Un 75% para el desarrollador deja muy poco margen para nuestra inversión en PR y eventos. Los acuerdos estándar del mercado indie se sitúan entre 55% y 65%.",
        ipOwnership: "Respetamos que la propiedad intelectual sea del creador, pero como socios inversores exigimos por contrato el Derecho de Primera Opción (Right of First Refusal - ROFR) para financiar y publicar la secuela.",
        closeToAgreement: "Si cerramos en {target} mil USD de adelanto, 65% de revenue share, 70 mil USD de marketing y el derecho de primera opción para secuelas, enviamos el borrador definitivo esta semana."
      }
    },
    
    successCriteria: "Obtener al menos 160,000 USD de adelanto, asegurar mínimo 60,000 USD en marketing vinculante, 65% de revenue share y retener la IP del juego.",
    
    hypotheticalParametersFlag: [
      "El publisher alemán y sus límites presupuestarios específicos son ficticios, parametrizados a partir de los rangos estándares de la industria indie expuestos en GDC y WIPO Pub. 950.",
      "Las ponderaciones de utilidad matemática reflejan la priorización habitual de publishers europeos en contratos tipo Steam/Nintendo."
    ],
    
    availableModes: ["fixed_rules", "ai_ready"]
  },

  {
    id: "SCN-05",
    title: "Retainer Anual de Performance y Growth Marketing para E-Commerce Multilatina",
    sector: "Marketing Digital, Publicidad y Servicios Basados en Conocimiento",
    exporterCountry: "Perú",
    buyerCountry: "México",
    productOrService: "Contrato de servicios profesionales continuos (Monthly Retainer) de 12 meses para gestión integral de pauta digital (Google Ads, Meta Ads, TikTok Ads), analítica de conversión (CRO) y optimización de embudos de adquisición para una plataforma de retail de moda en Ciudad de México.",
    
    documentedContext: "De acuerdo con los informes de inteligencia comercial de PROMPERÚ y las ruedas de negocios del Perú Service Summit en México, el marketing digital peruano es altamente valorado por su talento técnico calificado, certificaciones internacionales y tarifas competitivas en comparación con agencias locales mexicanas o de EE. UU. Sin embargo, las corporaciones mexicanas negocian habitualmente términos de pago a 60 o 90 días, esquemas agresivos vinculados a bonos por resultados (ROAS/CAC) y cláusulas de exclusividad territorial estricta en su rubro comercial.",
    
    source: {
      sourceId: "SRC-PROMPERU-02",
      institution: "PROMPERÚ Subdirección de Inteligencia de Mercados",
      reference: "PROMPERÚ (2022). Informe de mercado de marketing digital y publicidad para México y Colombia; y Directorio Oficial PerúXpert.",
      url: "https://exportemos.pe",
      license: "Información pública de promoción de exportaciones de servicios"
    },
    
    materialType: "Escenario original basado en informes de mercado oficiales y ruedas de negocios",
    pedagogicalObjective: "Aprender a negociar contratos de honorarios recurrentes (Retainer), vincular bonos por desempeño a métricas realistas y protegerse contra plazos de crédito excesivos que amenazan la tesorería de la agencia.",
    difficulty: "Intermedio",
    
    negotiableVariables: [
      {
        id: "monthly_retainer_fee",
        name: "Honorario Fijo Mensual (Base Retainer)",
        unit: "USD / Mes",
        type: "numeric",
        min: 4000,
        max: 12000,
        step: 500,
        initialExporter: 9500,
        initialBuyer: 5500,
        description: "Monto fijo mensual facturado por el equipo dedicado de media buyer, estratega CRO y diseñador."
      },
      {
        id: "performance_bonus_pct",
        name: "Bono por Desempeño sobre Crecimiento de ROAS",
        unit: "% sobre excedente",
        type: "numeric",
        min: 0,
        max: 20,
        step: 2,
        initialExporter: 12,
        initialBuyer: 5,
        description: "Porcentaje de bono variable asignado a la agencia cuando el Retorno de Inversión en Pauta (ROAS) supere el benchmark pactado (4.5x)."
      },
      {
        id: "payment_terms_days",
        name: "Término de Crédito para Pago de Honorarios",
        unit: "Días de crédito",
        type: "numeric",
        min: 15,
        max: 75,
        step: 15,
        initialExporter: 15,
        initialBuyer: 60,
        description: "Días concedidos al cliente mexicano para pagar las facturas mensuales del retainer."
      },
      {
        id: "senior_hours_dedicated",
        name: "Horas Mensuales de Asesoría Estratégica Senior",
        unit: "Horas / Mes",
        type: "numeric",
        min: 20,
        max: 80,
        step: 10,
        initialExporter: 30,
        initialBuyer: 60,
        description: "Horas de consultoría directa por parte del Director de Crecimiento / Growth Partner senior de la agencia."
      },
      {
        id: "exclusivity_clause",
        name: "Cláusula de Exclusividad / No Competencia en Moda",
        unit: "Alcance",
        type: "select",
        options: [
          { value: "direct_competitors_only", label: "No trabajar con competidores directos identificados (Lista de 5 marcas)", scoreBonusBuyer: 0.6, scoreBonusExp: 0.8 },
          { value: "full_category_mexico", label: "Exclusividad total en toda la categoría de e-commerce de moda en México", scoreBonusBuyer: 1.0, scoreBonusExp: -0.6 },
          { value: "no_exclusivity", label: "Sin exclusividad de categoría comercial", scoreBonusBuyer: 0.1, scoreBonusExp: 1.0 }
        ],
        initialExporter: "direct_competitors_only",
        initialBuyer: "full_category_mexico",
        description: "Restricción a la agencia para prestar servicios a otras marcas del mismo rubro en el mercado mexicano."
      }
    ],
    
    exporterInitialDossier: {
      companyName: "ViralPeak Growth Agency (Miraflores, Lima)",
      costStructure: "Costo salarial directo del squad asignado (1 Media Buyer Senior, 1 Content/CRO Lead, 1 Data Analyst a medio tiempo): 4,800 USD mensuales.",
      targetPrice: "Retainer base de 8,000 - 8,500 USD/mes + 10% de bono de performance.",
      walkawayPoint: "Retainer inferior a 6,500 USD/mes o pago a 60 días sin bono. A menos de 6,000 USD el margen es nulo y la agencia asume pérdidas financieras por financiamiento.",
      batnaDescription: "Propuesta de una fintech colombiana para un retainer de 7,200 USD/mes con pago quincenal a 15 días, aunque el contrato es solo por 6 meses.",
      criticalNeeds: [
        "No aceptar plazos de crédito de 60 días; lograr 30 días como máximo.",
        "Rechazar la exclusividad total de categoría en México (cerrar solo sobre una lista acotada de competidores directos, direct_competitors_only).",
        "Limitar las horas de asesoría senior a 40 horas/mes para no sobrecargar a los directores de la agencia."
      ]
    },
    
    buyerConfidentialProfile: {
      buyerName: "Rodrigo Morales",
      buyerRole: "Chief Marketing Officer (CMO)",
      companyName: "ModaYa E-Commerce México S.A. de C.V. (Polanco, CDMX)",
      negotiationStyle: "Empático, cordial en las formas (estilo de negocios mexicano de alta relación personal), pero implacable en negociar plazos de crédito y exigir compromisos de resultados con bonos por performance.",
      
      targetPrice: 6500,
      maxReservationPrice: 8200,
      targetBonus: 8,
      maxBonusAllowed: 14,
      targetPaymentDays: 60,
      minPaymentDaysAllowed: 30, // Puede aceptar 30 días si el retainer fijo es moderado
      targetSeniorHours: 50,
      minSeniorHoursAllowed: 30,
      preferredExclusivity: "full_category_mexico",
      acceptableExclusivity: "direct_competitors_only",
      
      weights: {
        monthly_retainer_fee: 0.35,
        payment_terms_days: 0.25,
        senior_hours_dedicated: 0.15,
        performance_bonus_pct: 0.15,
        exclusivity_clause: 0.10
      },
      
      dialogueTriggers: {
        highRetainer: "Estimados amigos, {retainer} USD mensuales fijos nos parece un fee muy elevado para el arranque. Preferimos un fijo más accesible y que ustedes ganen fuerte con un bono por ROAS.",
        paymentTerms: "En el corporativo en México todas las órdenes de compra corren a 60 días por flujo de caja. Si les pagáramos a 30 días necesitaríamos que mantengan el retainer en no más de 7,500 USD.",
        exclusivity: "Entendemos que no quieran cerrar toda la categoría, pero al menos no pueden tocar a nuestros 5 principales competidores directos en calzado y moda online.",
        closeToAgreement: "Si cerramos en {target} USD/mes, 10% de bono por ROAS, 30 días de crédito y exclusividad limitada a competidores directos, firmamos el retainer anual de inmediato."
      }
    },
    
    successCriteria: "Obtener un retainer mensual de al menos 7,500 USD, pago a 30 días, acotar la exclusividad a competidores directos y mantener las horas senior en un rango sostenible (30-40 h/mes).",
    
    hypotheticalParametersFlag: [
      "Los honorarios y nombres corporativos son parámetros representativos diseñados para entrenar habilidades de cotización B2B según promedios reportados en Perú Service Summit.",
      "Las métricas de ROAS (4.5x) y curvas de utilidad son pedagógicas."
    ],
    
    availableModes: ["fixed_rules", "ai_ready"]
  },

  {
    id: "SCN-06",
    title: "Estudio Geotécnico y Monitoreo Ambiental de Presa de Relaves Mineros",
    sector: "Consultoría Empresarial, Ingeniería y Servicios Profesionales",
    exporterCountry: "Perú",
    buyerCountry: "México",
    productOrService: "Servicios de consultoría de alta ingeniería geotécnica: Estudio integral de estabilidad física, modelación hidrológica 3D e implementación de sistema de alerta temprana satelital para depósito de jales/relaves de mina polimetálica en Sonora.",
    
    documentedContext: "Perú posee una de las ingenierías geotécnicas y mineras más reputadas de América Latina debido a la complejidad sísmica y geográfica de la cordillera de los Andes. Firmas peruanas afiliadas a la Asociación Peruana de Consultoría (APC) y participantes en las misiones de PROMPERÚ en México (Perú Service Summit Minería) exportan consultoría técnica a consorcios mineros en Sonora, Zacatecas y Chihuahua. La negociación de estos contratos involucra la definición estricta de honorarios globales, anticipos para movilización de especialistas, plazos de entrega del informe pericial y la limitación de la responsabilidad civil (Indemnity cap) ante riesgos geológicos imprevistos.",
    
    source: {
      sourceId: "SRC-APC-01",
      institution: "Asociación Peruana de Consultoría (APC) & PROMPERÚ",
      reference: "APC (2023). Diagnóstico de la Exportación de Servicios de Consultoría e Ingeniería Peruana; y Modelo Contractual ITC 'International Supply of Services'.",
      url: "https://apcperu.org",
      license: "Difusión gremial e institucional para el desarrollo de servicios profesionales"
    },
    
    materialType: "Caso real adaptado con modelos de contratación de consultoría técnica internacional",
    pedagogicalObjective: "Aprender a cotizar y defender honorarios profesionales en consultoría de alta especialidad, blindar legalmente el límite de responsabilidad civil (Indemnity Cap) y asegurar anticipos que cubran gastos de campo y análisis computacional.",
    difficulty: "Avanzado",
    
    negotiableVariables: [
      {
        id: "total_consulting_fee",
        name: "Honorarios Totales del Estudio Geotécnico",
        unit: "Miles de USD",
        type: "numeric",
        min: 80,
        max: 220,
        step: 5,
        initialExporter: 175,
        initialBuyer: 105,
        description: "Monto total del contrato por el estudio pericial, modelación numérica y entrega del informe técnico visado."
      },
      {
        id: "advance_mobilization_pct",
        name: "Anticipo por Firma y Movilización de Campo",
        unit: "%",
        type: "numeric",
        min: 10,
        max: 40,
        step: 5,
        initialExporter: 35,
        initialBuyer: 15,
        description: "Porcentaje del contrato pagado a la firma para costear viáticos, desplazamientos a faena minera y análisis de laboratorio."
      },
      {
        id: "delivery_timeline_weeks",
        name: "Plazo de Entrega del Informe Técnico Final",
        unit: "Semanas",
        type: "numeric",
        min: 8,
        max: 24,
        step: 2,
        initialExporter: 16,
        initialBuyer: 10,
        description: "Tiempo concedido al equipo técnico para perforaciones, ensayos de laboratorio y modelación de estabilidad."
      },
      {
        id: "liability_cap_pct",
        name: "Límite de Responsabilidad Civil (Indemnity Cap)",
        unit: "% de honorarios",
        type: "select",
        options: [
          { value: "100_pct_fees", label: "Limitada al 100% de los honorarios percibidos del contrato", scoreBonusBuyer: 0.4, scoreBonusExp: 1.0 },
          { value: "200_pct_fees", label: "Limitada al 200% de los honorarios percibidos", scoreBonusBuyer: 0.7, scoreBonusExp: 0.5 },
          { value: "unlimited_damages", label: "Responsabilidad ilimitada por daños indirectos o emergentes", scoreBonusBuyer: 1.0, scoreBonusExp: -1.0 }
        ],
        initialExporter: "100_pct_fees",
        initialBuyer: "unlimited_damages",
        description: "Toque máximo contractual por eventuales daños derivados de errores técnicos no dolosos."
      },
      {
        id: "field_training_sessions",
        name: "Talleres Presenciales de Transferencia en Faena Minera",
        unit: "Sesiones",
        type: "numeric",
        min: 1,
        max: 5,
        step: 1,
        initialExporter: 2,
        initialBuyer: 4,
        description: "Jornadas de capacitación presencial en mina para el equipo de geotecnia del cliente."
      }
    ],
    
    exporterInitialDossier: {
      companyName: "Andina Geoconsulting Ingenieros S.A.C. (Arequipa / Lima)",
      costStructure: "Costo directo de ingeniería (horas de consultor PhD geotécnico, ensayos de laboratorio triaxial y licencias de software de estabilidad): 82,000 USD.",
      targetPrice: "Honorarios de 150,000 - 165,000 USD con al menos 30% de anticipo.",
      walkawayPoint: "Honorarios menores a 120,000 USD o aceptar responsabilidad ilimitada (unlimited damages), lo cual constituiría negligencia legal corporativa inaceptable.",
      batnaDescription: "Licitación pre-adjudicada para un estudio de relaves en Moquegua por 125,000 USD con pago puntual del canon minero, sin riesgo de cambio de divisas ni trámites transfronterizos.",
      criticalNeeds: [
        "Blindar el límite de responsabilidad (Indemnity Cap) al 100% del valor del contrato (máximo 200% con póliza de seguro de errores u omisiones pagada por el cliente).",
        "Asegurar un anticipo mínimo del 25% para movilizar instrumental especializado a México.",
        "Garantizar un plazo no menor a 14 semanas para procesar los ensayos de permeabilidad y estabilidad sísmica con rigor científico."
      ]
    },
    
    buyerConfidentialProfile: {
      buyerName: "Ing. Guillermo Cárdenas",
      buyerRole: "Director de Operaciones & Presas de Jales",
      companyName: "Minera Sierra de Plata S.A. de C.V. (Hermosillo, Sonora, México)",
      negotiationStyle: "Técnico riguroso, pragmático y exigente en plazos de entrega debido a inspecciones inminentes de la autoridad ambiental mexicana (PROFEPA/CONAGUA).",
      
      targetPrice: 120,
      maxReservationPrice: 155,
      targetAdvance: 20,
      maxAdvanceAllowed: 30,
      targetTimeline: 12,
      minTimelineAllowed: 14, // Puede conceder 14 semanas si los talleres presenciales se garantizan
      preferredLiability: "unlimited_damages",
      acceptableLiability: "100_pct_fees", // Legal de la minera sabe que ninguna consultora seria acepta responsabilidad ilimitada
      targetTraining: 4,
      minTrainingAllowed: 2,
      
      weights: {
        total_consulting_fee: 0.35,
        liability_cap_pct: 0.25,
        advance_mobilization_pct: 0.15,
        delivery_timeline_weeks: 0.15,
        field_training_sessions: 0.10
      },
      
      dialogueTriggers: {
        highFee: "Colega, 175 mil USD se sale del CAPEX aprobado para esta auditoría geotécnica. Si no ajustan a un rango más razonable, tendremos que evaluar una firma de Colorado o Guadalajara.",
        liability: "Nuestra área legal exige coberturas por cualquier contingencia ambiental en la presa. Si aceptamos topar la responsabilidad a los honorarios pagados, requerimos que el plazo de entrega no pase de 14 semanas.",
        advance: "Un anticipo del 35% requiere una fianza bancaria de fiel cumplimiento. Si lo dejamos en 25%, el flujo de tesorería se aprueba de inmediato.",
        closeToAgreement: "Si acordamos honorarios por {target} mil USD, 25% de anticipo, 14 semanas de plazo, responsabilidad topada al 100% del contrato y 3 talleres en faena, expedimos la orden de servicio hoy mismo."
      }
    },
    
    successCriteria: "Cerrar en no menos de 135,000 USD, con responsabilidad topada al 100% de los honorarios, anticipo de al menos 25% y plazo no menor a 14 semanas.",
    
    hypotheticalParametersFlag: [
      "El consorcio minero en Sonora y los montos exactos de honorarios han sido formulados como ejercicio de simulación pedagógica basado en los informes gremiales de APC y los lineamientos ITC de exportación de servicios.",
      "Las cláusulas de limitación de responsabilidad civil siguen la práctica contractual internacional FIDIC / ITC."
    ],
    
    availableModes: ["fixed_rules", "ai_ready"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NEGOTIATION_SCENARIOS };
}
