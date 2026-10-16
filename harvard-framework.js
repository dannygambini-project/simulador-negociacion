/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * harvard-framework.js - Marco Metodológico Harvard PON & Harvard INP
 * 
 * Basado rigurosamente en el libro insumo:
 * "Understanding Others through Negotiation: A Guide for Students by Students"
 * Autores: Lucas Woodley, Ilona Demler, Sarah Lightbody, Uriel Martinez, Clara Nevins, 
 * Indumathi Prakash, y Dr. Daniel L. Shapiro (Director Académico).
 * Harvard International Negotiation Program (INP), Harvard College / Harvard PON (2022).
 */

const HARVARD_GUIDE_DATA = {
  title: "Understanding Others through Negotiation: A Guide for Students by Students",
  authors: "Lucas Woodley, Ilona Demler, Sarah Lightbody, Uriel Martinez, Clara Nevins, Indumathi Prakash, Daniel L. Shapiro",
  institution: "Harvard International Negotiation Program (Harvard INP / PON)",
  year: "2022",
  totalPages: 120,
  purpose: "Proporcionar a estudiantes y profesionales un marco analítico, emocional y de identidad para transformar negociaciones de suma cero en acuerdos colaborativos sostenibles.",
  
  chapters: [
    {
      number: 1,
      title: "Más allá del regateo de suma cero: Los 5 Elementos Críticos",
      framework: "The Five Critical Elements of Negotiation",
      color: "#2563eb",
      icon: "⚖️",
      summary: "La mayoría piensa que negociar es regatear un precio hasta partir la diferencia. El método Harvard demuestra que centrarse en posiciones destruye valor; negociar intereses lo crea.",
      keyPrinciples: [
        {
          name: "1. Intereses vs. Posiciones",
          desc: "Las posiciones son lo que la parte dice que quiere (ej. 'exijo 42 USD/h'); los intereses son los motivos reales subyacentes (proteger el presupuesto de Q3, mitigar riesgos ante su directorio). Indaga siempre el 'por qué'."
        },
        {
          name: "2. Opciones de Beneficio Mutuo",
          desc: "Antes de cerrar o estancarse, inventa múltiples opciones para agrandar el pastel comercial. Intercambia elementos que sean de bajo costo para ti pero de alto valor para el comprador."
        },
        {
          name: "3. Criterios Objetivos y Legitimidad",
          desc: "En lugar de imponer voluntades, apóyate en estándares justos y externos verificables: tarifas oficiales de PROMPERÚ en el Perú Service Summit, contratos tipo del ITC o Incoterms 2020."
        },
        {
          name: "4. Alternativas y BATNA (MAAN)",
          desc: "Tu Mejor Alternativa a un Acuerdo Negociado (MAAN / BATNA) es tu salvaguarda. Define con precisión tu Punto de Reserva: un acuerdo peor que tu BATNA nunca debe ser aceptado."
        },
        {
          name: "5. Relación y Compromiso",
          desc: "El contrato formal no garantiza el éxito operativo si la relación queda resentida. Los compromisos deben ser claros, viables y basados en confianza recíproca."
        }
      ]
    },

    {
      number: 2,
      title: "Las 5 Preocupaciones Fundamentales (The Core Concerns)",
      framework: "The Five Core Concerns Framework (Fisher & Shapiro)",
      color: "#10b981",
      icon: "❤️",
      summary: "Las emociones determinan el rumbo de cualquier negociación internacional. Abordar las 5 preocupaciones humanas universales estimula emociones positivas y desbloquea concesiones.",
      keyPrinciples: [
        {
          name: "Autonomía (Autonomy)",
          desc: "La libertad de tomar decisiones sin sentirse forzado ni presionado por ultimátums. Dale opciones al comprador en lugar de imposiciones unilaterales."
        },
        {
          name: "Aprecio (Appreciation)",
          desc: "Sentir que sus pensamientos, restricciones y esfuerzos son comprendidos y valorados. Reconoce las limitaciones presupuestales de su empresa antes de defender tu margen."
        },
        {
          name: "Afiliación (Affiliation)",
          desc: "La sensación de conexión y cercanía. Enmarca la reunión como 'socios resolviendo un desafío logístico o técnico juntos', no como rivales que se quitan cuotas."
        },
        {
          name: "Rol (Role)",
          desc: "Tener un papel significativo y constructivo en la mesa. Permite que el comprador se sienta como el arquitecto de una solución inteligente para su corporación."
        },
        {
          name: "Estatus (Status)",
          desc: "El reconocimiento de su posición, experiencia e idoneidad profesional. Respeta el prestigio de la contraparte y resalta la excelencia de la exportación peruana sin arrogancia."
        }
      ]
    },

    {
      number: 3,
      title: "Los 5 Señuelos de la Mente Tribal (The Five Lures)",
      framework: "The Five Lures of the Tribal Mind (Daniel Shapiro)",
      color: "#f59e0b",
      icon: "⚡",
      summary: "Trampas psicológicas invisibles que llevan a los negociadores a polarizarse en 'nosotros contra ellos' y tomar decisiones financieras irracionales.",
      keyPrinciples: [
        {
          name: "Vértigo (Vertigo)",
          desc: "Obsesión emocional con el conflicto donde se pierde la perspectiva global y el objetivo comercial por querer 'ganarle' una discusión al comprador."
        },
        {
          name: "Compulsión a la Repetición (Repetition Compulsion)",
          desc: "Repetir mecánicamente el mismo argumento ronda tras ronda sin alterar el enfoque ni buscar nuevas variables de intercambio."
        },
        {
          name: "Tabúes (Taboos)",
          desc: "Temas o inquietudes implícitas que ninguna parte se atreve a nombrar (ej. miedo a la insolvencia o desconfianza en la entrega remota). Ponerlos con tacto sobre la mesa genera alivio."
        },
        {
          name: "Asalto a lo Sagrado (Assault on the Sacred)",
          desc: "Cuestionar o atacar valores intocables, como la reputación institucional o la ética empresarial de la otra parte. Destruye de inmediato la mesa de diálogo."
        },
        {
          name: "Política de Identidad (Identity Politics)",
          desc: "Atribuir intenciones maliciosas al comprador por ser de otra cultura corporativa o nacional ('los compradores siempre quieren aprovecharse'). Mantén una postura profesional y basada en hechos."
        }
      ]
    },

    {
      number: 4,
      title: "Identidad y Comunicación: Marcos B.R.A.V.E. y H.E.L.P.S.",
      framework: "BRAVE & HELPS Interpersonal Communication Model",
      color: "#8b5cf6",
      icon: "🤝",
      summary: "Herramientas prácticas para gestionar la comunicación intercultural en exportaciones y alinear voluntades en momentos de alta tensión.",
      keyPrinciples: [
        {
          name: "Marco B.R.A.V.E. (Diagnóstico de Identidad)",
          desc: "Beliefs (Creencias sobre el negocio), Rituals (Formatos habituales de contratación corporativa), Allegiances (Lealtades con sus directores o accionistas), Values (Valores de calidad y sostenibilidad), Emotionally charged experiences (Experiencias previas con proveedores fallidos)."
        },
        {
          name: "Marco H.E.L.P.S. (Estrategia Activa de Escucha)",
          desc: "• Hear (Escuchar sin interrumpir)\n• Empathize (Validar la presión que enfrenta el comprador)\n• Learn (Indagar qué variable es verdaderamente crítica para él)\n• Problem-solve (Cocreas soluciones de contingencia)\n• Synthesize (Resumir acuerdos parciales para consolidar avances)"
        }
      ]
    },

    {
      number: 5,
      title: "Safari Zone: Valor Objetivo vs. Valor Subjetivo",
      framework: "Subjective & Objective Value in Negotiation (SPOV)",
      color: "#06b6d4",
      icon: "💎",
      summary: "Un acuerdo excelente en el papel (alto margen) puede ser un fracaso si destruye el 'Valor Subjetivo'. El libro de Harvard enseña que las relaciones comerciales duraderas requieren que ambas partes salgan con la sensación de haber sido tratadas con justicia, respeto y honestidad.",
      keyPrinciples: [
        {
          name: "Valor Objetivo (Objective Value)",
          desc: "Las métricas cuantificables de la transacción: precio de venta, plazo de pago en días, porcentaje de anticipo, meses de garantía, penalidades y retención de propiedad intelectual."
        },
        {
          name: "Sentimientos sobre el Resultado",
          desc: "¿Siente el comprador que el trato es justo y defendible ante sus superiores? ¿Siente el exportador peruano que sus costos directos y nóminas están a salvo?"
        },
        {
          name: "Sentimientos sobre el Proceso",
          desc: "¿Fue un proceso transparente, ágil y colaborativo, o hubo presiones excesivas, juegos de poder y amenazas de romper?"
        },
        {
          name: "Sentimientos sobre la Relación",
          desc: "¿Desean volver a trabajar juntos en el siguiente contrato? El 70% de las exportaciones peruanas rentables provienen de recompras y relaciones de largo plazo."
        }
      ]
    }
  ]
};

/**
 * Provee consejos tácticos en tiempo real para el paso a paso del wizard,
 * contextualizados con el marco del PDF de Harvard.
 */
function getHarvardTipForStep(variableId, scenario) {
  // 1. Precios / Tarifas / Garantía Mínima
  if (variableId.includes("rate") || variableId.includes("price") || variableId.includes("fee") || variableId.includes("guarantee") || variableId.includes("premium")) {
    return {
      chapter: "Cap. 1: Criterios Objetivos & Separar Intereses de Posiciones",
      text: "No justifiques tu tarifa en 'lo que necesitas ganar', sino en estándares externos legítimos (productividad del squad, certificaciones orgánicas o tarifas reportadas en el Perú Service Summit). Si el comprador te pide rebaja, no cedas gratis: vincula cada reducción a un beneficio recíproco.",
      coreConcern: "Estatus & Aprecio: Valora el presupuesto del cliente y resalta con serenidad la solvencia técnica peruana."
    };
  }
  
  // 2. Anticipo / Flujo de Caja
  if (variableId.includes("advance")) {
    return {
      chapter: "Cap. 4: Marco H.E.L.P.S. (Problem-Solving Colaborativo)",
      text: "El comprador teme financiarte a ciegas; tú necesitas liquidez para pagar sueldos quincenales en Lima sin endeudarte al 9.5% bancario. Plantea el anticipo no como una exigencia, sino como la garantía de movilización inmediata y retención exclusiva de los mejores ingenieros.",
      coreConcern: "Autonomía: Ofrece alternativas de desembolso por hitos para que el comprador sienta control."
    };
  }
  
  // 3. Plazos de Pago (Crédito en días)
  if (variableId.includes("payment_term") || variableId.includes("payment_method") || variableId.includes("payment_terms")) {
    return {
      chapter: "Cap. 2: Afiliación y Cooperación Financiera",
      text: "Las corporaciones extranjeras suelen tener políticas rígidas de 60 días. Evita el 'choque frontal' (Señuelo del Vértigo). Si reduces los días a 30, explícale que ese alivio en tu capital de trabajo te permite mantener precios congelados y soporte continuo.",
      coreConcern: "Afiliación: Construye la narrativa de que una tesorería sana del exportador garantiza entregas a tiempo para el comprador."
    };
  }
  
  // 4. Garantías / SLA / Tiempos de Entrega
  if (variableId.includes("warranty") || variableId.includes("sla") || variableId.includes("delivery") || variableId.includes("timeline")) {
    return {
      chapter: "Cap. 1: Opciones de Beneficio Mutuo (Crear Valor)",
      text: "Limitar el periodo de soporte gratuito no significa desproteger al cliente. Propón un periodo de garantía de 3-4 meses para fallas críticas y un esquema de horas bolsa para evolutivos adicionales.",
      coreConcern: "Rol: Define con nitidez el rol de tu equipo técnico para evitar ambigüedades posteriores."
    };
  }
  
  // 5. Propiedad Intelectual / Cláusulas Legales
  if (variableId.includes("ip") || variableId.includes("liability") || variableId.includes("territorial") || variableId.includes("exclusivity")) {
    return {
      chapter: "Cap. 3: Identificar Tabúes y Proteger lo Estratégico",
      text: "La propiedad de tus librerías y activos preexistentes es un activo sagrado de la empresa peruana. Ceder el código custom pero reservar tus frameworks base ('custom_code_only') es la solución recomendada por la OMPI y el ITC.",
      coreConcern: "Autonomía & Legitimidad: Protege tu capacidad de comercializar futuros servicios en otros países."
    };
  }

  // Default
  return {
    chapter: "Cap. 5: Valor Objetivo vs. Valor Subjetivo",
    text: "Busca un equilibrio donde ambos ganen: cuida los números y cuida al mismo tiempo la relación personal y la confianza con la contraparte.",
    coreConcern: "Respeto mutuo y profesionalismo internacional."
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { HARVARD_GUIDE_DATA, getHarvardTipForStep };
}
