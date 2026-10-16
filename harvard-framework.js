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
          desc: "Temas o condiciones no dichas que bloquean el avance por miedo a ofender. Rompe el tabú con empatía y preguntas exploratorias abiertas."
        },
        {
          name: "Asalto a lo Sagrado (Assault on the Sacred)",
          desc: "Atacar valores no negociables de la contraparte (como la soberanía de marca o la reputación ante su junta directiva)."
        },
        {
          name: "Trampa de Identidad (Identity Politics)",
          desc: "Atrincherarse en prejuicios nacionales o corporativos en lugar de buscar la solución óptima del proyecto conjunto."
        }
      ]
    },

    {
      number: 4,
      title: "Modelos B.R.A.V.E. y H.E.L.P.S. de Comunicación",
      framework: "Interpersonal & Cross-Cultural Communication Frameworks",
      color: "#06b6d4",
      icon: "🌐",
      summary: "Metodologías estructuradas para diagnosticar la postura del comprador internacional y comunicar contraofertas complejas con elegancia y firmeza.",
      keyPrinciples: [
        {
          name: "Modelo B.R.A.V.E.",
          desc: "Beliefs (Creencias previas), Rituals (Formatos y protocolos de reunión), Assumptions (Supuestos no verificados), Values (Valores comerciales centrales) y Expectations (Expectativas de entrega y pago)."
        },
        {
          name: "Modelo H.E.L.P.S.",
          desc: "Hear (Escucha activa sin interrumpir), Empathize (Comprende su dolor financiero), Legitimize (Valida sus argumentos legítimos), Problem-solve (Co-crea la solución) y Synthesize (Resume acuerdos por escrito)."
        }
      ]
    },

    {
      number: 5,
      title: "Valor Objetivo vs. Valor Subjetivo (SPOV)",
      framework: "Subjective & Objective Value in Negotiation (Curhan et al. / Harvard)",
      color: "#8b5cf6",
      icon: "💎",
      summary: "La rentabilidad financiera (Valor Objetivo) sólo perdura si ambas partes quedan con una sensación de justicia, dignidad y ganas de trabajar juntas (Valor Subjetivo).",
      keyPrinciples: [
        {
          name: "Sentimientos sobre el Resultado",
          desc: "¿Ambas partes perciben el acuerdo como justo, balanceado y defendible ante sus respectivas organizaciones?"
        },
        {
          name: "Sentimientos sobre el Propio Ser",
          desc: "¿Se negoció con integridad, profesionalismo y defendiendo los principios de la empresa sin capitular ni abusar?"
        },
        {
          name: "Sentimientos sobre el Proceso",
          desc: "¿El proceso fue transparente, respetuoso de los tiempos y constructivo, o hubo trampas y tácticas de desgaste?"
        },
        {
          name: "Sentimientos sobre la Relación",
          desc: "¿Se construyó una base sólida para renovar contratos y expandir el negocio en el mediano y largo plazo?"
        }
      ]
    }
  ]
};

/**
 * Entrega un consejo metodológico de Harvard adaptado a la variable en discusión.
 */
function getHarvardTipForStep(variableId, scenario) {
  if (variableId.includes("price") || variableId.includes("fee") || variableId.includes("rate") || variableId.includes("retainer")) {
    return {
      chapter: "Cap. 1: Criterios Objetivos & Separar Intereses de Posiciones",
      text: "No justifiques tu precio por 'necesidad interna'. Utiliza estándares objetivos del sector (ej. tarifas del Perú Service Summit o cotizaciones benchmark de la región). Defiende tu valor técnico con legitimidad."
    };
  }
  if (variableId.includes("advance") || variableId.includes("payment")) {
    return {
      chapter: "Cap. 2: Atender la Preocupación de Autonomía y Aliviar Riesgo",
      text: "El comprador internacional busca mitigar su exposición financiera ante su corporativo. Ofrecer hitos verificables de entrega o garantías técnicas ayuda a destrabar pagos a menor plazo."
    };
  }
  if (variableId.includes("ip") || variableId.includes("liability") || variableId.includes("exclusivity")) {
    return {
      chapter: "Cap. 1 & 5: Opciones de Beneficio Mutuo y Protección de Activos",
      text: "No aceptes cláusulas absolutas ('todo o nada'). Aplica la técnica de 'acotar el alcance': delimita exclusividades a competidores directos o restringe licencias de propiedad intelectual al código a medida sin ceder tus librerías base."
    };
  }
  return {
    chapter: "Cap. 4: Metodología H.E.L.P.S. de Co-creación",
    text: "Enfoca la propuesta como una solución de ingeniería comercial en beneficio mutuo. Pregúntate qué variable tiene bajo costo marginal para ti pero alto valor percibido para la contraparte."
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { HARVARD_GUIDE_DATA, getHarvardTipForStep };
}
