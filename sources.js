/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * sources.js - Catálogo de Fuentes Documentadas, Casos Públicos y Referencias Verificables
 * 
 * Cumple con la investigación previa obligatoria:
 * - Fuentes institucionales oficiales: PROMPERÚ, ITC, WIPO, Harvard PON, SECO/SIPPO, APC.
 * - Distinción explícita de licencias, tipos de acceso y condiciones de uso educativo.
 */

const NEGOTIATION_SOURCES = [
  {
    id: "SRC-PROMPERU-01",
    title: "Estrategia de Internacionalización de Servicios Creativos: Animación Digital y el caso 'Ainbo'",
    institution: "PROMPERÚ (Comisión de Promoción del Perú para la Exportación y el Turismo) & LatAm Cinema",
    year: "2021",
    url: "https://www.gob.pe/institucion/promperu/noticias/508493-animacion-peruana-ainbo-triunfa-en-el-mundo",
    accessType: "Acceso Público Abierto (Portal Oficial del Estado Peruano)",
    license: "Uso informativo y educativo público (Normativa de Transparencia y Promoción del Comercio Exterior)",
    summary: "Documentación oficial del proceso de coproducción internacional y venta de derechos de distribución global de la película de animación 3D 'Ainbo: La Guerrera Amazónica' (Tunche Films, Perú y Cool Beats, Países Bajos), negociada con Cinema Management Group (CMG, EE. UU.) para más de 80 territorios, con respaldo de PROMPERÚ en festivales internacionales como MIFA / Festival de Annecy y Ventana Sur.",
    relevance: "Sustenta el Escenario SCN-02 de coproducción, distribución internacional de contenidos audiovisuales y cesión de licencias territoriales."
  },
  {
    id: "SRC-ITC-01",
    title: "Model Contracts for Small Firms: Legal Guidance for Doing International Business",
    institution: "International Trade Centre (ITC) / OMC / UNCTAD",
    year: "2010 (Ediciones actualizadas periódicas)",
    url: "https://www.intracen.org/resources/publications/model-contracts-for-small-firms",
    accessType: "Libre acceso (Publicación oficial de Naciones Unidas / ITC)",
    license: "Uso libre para asesoramiento comercial y formación de PYMES exportadoras",
    summary: "Compendio de contratos modelo equilibrados para pequeñas y medianas empresas exportadoras. Incluye contratos modelo para 'International Supply of Services', 'International Commercial Sale of Goods' (incorporando CISG e Incoterms), 'International Distribution' y 'International Contract Manufacture Agreement'. Define cláusulas estándar de pago, penalidades, resolución de disputas, fuerza mayor y traspaso de propiedad.",
    relevance: "Fundamento jurídico y contractual para los escenarios de exportación de servicios de software (SCN-01), consultoría de ingeniería (SCN-06) y venta de bienes agrícolas (SCN-03)."
  },
  {
    id: "SRC-WIPO-01",
    title: "Mastering the Game: Business and Legal Issues for Video Game Developers (WIPO Publication No. 950)",
    institution: "World Intellectual Property Organization (WIPO / OMPI)",
    year: "2014",
    url: "https://www.wipo.int/edocs/pubdocs/en/copyright/950/wipo_pub_950.pdf",
    authors: "David Greenspan, S. Gregory Boyd, Jas Purewal",
    accessType: "Libre acceso (Biblioteca Digital WIPO)",
    license: "Creative Commons / Autorización expresa con fines de formación y desarrollo de capacidades OMPI",
    summary: "Guía especializada para estudios independientes de videojuegos sobre cómo negociar contratos de edición (Publishing Agreements), adelantos por hitos (Milestone Advances), esquemas de regalías (Revenue Share), recuperación de costos (Recoupment), exclusividades temporales por plataforma y retención de propiedad intelectual de personajes y código fuente.",
    relevance: "Sustenta el Escenario SCN-04 de licenciamiento y cofinanciamiento de videojuegos indie peruanos con publishers internacionales."
  },
  {
    id: "SRC-WIPO-02",
    title: "Exchanging Value – Negotiating Technology Licensing Agreements: A Training Manual (WIPO Publication No. 906)",
    institution: "World Intellectual Property Organization (WIPO / OMPI) & International Trade Centre (ITC)",
    year: "2005",
    url: "https://www.wipo.int/edocs/pubdocs/en/sme/906/wipo_pub_906.pdf",
    accessType: "Libre acceso (OMPI / ITC)",
    license: "Material de capacitación y difusión de buenas prácticas tecnológicas",
    summary: "Manual de entrenamiento sobre valuación y negociación de licencias de tecnología, transferencia de software, cláusulas de código fuente, custodia (escrow), garantías técnicas, soporte correctivo, niveles de servicio (SLA) y límites de responsabilidad civil (Indemnity caps).",
    relevance: "Aporta la estructura de negociación de activos intangibles y acuerdos de software a medida en los escenarios SCN-01 y SCN-04."
  },
  {
    id: "SRC-HARVARD-INP-2022",
    title: "Understanding Others through Negotiation: A Guide for Students by Students",
    institution: "Harvard International Negotiation Program (Harvard INP) & Program on Negotiation (PON)",
    year: "2022 (120 págs.)",
    authors: "Lucas Woodley, Ilona Demler, Sarah Lightbody, Uriel Martinez, Clara Nevins, Indumathi Prakash, Dr. Daniel L. Shapiro",
    url: "https://www.inp.harvard.edu",
    accessType: "Documento oficial del curso Gen Ed 1033 de Harvard College (Guía Pedagógica)",
    license: "Uso pedagógico y académico con fines formativos y de desarrollo de capacidades",
    summary: "Guía de referencia desarrollada en Harvard College bajo la dirección académica del Dr. Daniel Shapiro. Desarrolla los 5 Elementos Críticos de Negociación (Intereses, Opciones, Criterios Objetivos, MAAN/BATNA y Relación), las 5 Preocupaciones Fundamentales (Autonomía, Aprecio, Afiliación, Rol, Estatus), los 5 Señuelos de la Mente Tribal (Vértigo, Compulsión a la Repetición, Tabúes, Asalto a lo Sagrado, Identidad), los marcos B.R.A.V.E. y H.E.L.P.S. de comunicación intercultural, y la distinción entre Valor Objetivo y Valor Subjetivo.",
    relevance: "Insumo metodológico central del simulador: sustenta el asistente de propuestas por pasos, la evaluación de valor subjetivo y la retroalimentación diagnóstica a los exportadores."
  },
  {
    id: "SRC-HARVARD-01",
    title: "BATNA Basics: Boost Your Power at the Bargaining Table & International Negotiations: Cross-Cultural Communication Skills",
    institution: "Program on Negotiation (PON) at Harvard Law School",
    year: "2021",
    url: "https://www.pon.harvard.edu/free-reports/",
    accessType: "Libre acceso previa consulta institucional (Harvard Free Reports Portal)",
    license: "Uso pedagógico y académico de conceptos de negociación basada en intereses (Modelo Harvard)",
    summary: "Informes académicos sobre cómo calcular y proteger la Mejor Alternativa a un Acuerdo Negociado (BATNA/MAAN), evitar el 'acuerdo a cualquier costo', calcular el punto de reserva (walkaway price), identificar la Zona de Posible Acuerdo (ZOPA) y adaptar tácticas de negociación a factores culturales específicos.",
    relevance: "Base metodológica de nuestro motor determinista de negociación y del sistema de evaluación de 0 a 100 puntos."
  },
  {
    id: "SRC-PROMPERU-02",
    title: "Plataforma Perú Service Summit e Informes de Inteligencia de Mercados de Software y Marketing Digital",
    institution: "PROMPERÚ - Subdirección de Exportación de Servicios y Red Exportemos.pe",
    year: "2022 - 2024",
    url: "https://peruservicesummit.com",
    accessType: "Acceso Público Abierto (Plataforma Oficial Perú Service Summit)",
    license: "Uso público de información sectorial y buenas prácticas comerciales",
    summary: "Información documentada de las ruedas de negocios internacionales del Perú Service Summit, donde más de 100 empresas peruanas exportadoras de software, marketing digital y servicios a la minería negocian anualmente con compradores corporativos de Chile, México, Colombia y Estados Unidos. Detalla rangos tarifarios, esquemas de squads ágiles y retención de talento.",
    relevance: "Sustenta los escenarios SCN-01 (Software Nearshore a Chile) y SCN-05 (Marketing de Performance a México)."
  },
  {
    id: "SRC-SECO-01",
    title: "Programa SeCompetitivo y Cadenas de Valor de Cacao Fino de Aroma y Café Sostenible (Casos Acopagro y Norandino)",
    institution: "Cooperación Suiza (SECO), Helvetas Perú y Agromercado (Ministerio de Desarrollo Agrario y Riego)",
    year: "2020 - 2023",
    url: "https://www.cooperacionsuiza.pe/proyectos/secompetitivo/",
    accessType: "Acceso Público Institucional",
    license: "Reportes públicos de cooperación técnica y desarrollo económico sostenible",
    summary: "Casos documentados de cooperativas agrarias peruanas (Norandino en Piura y Acopagro en San Martín) exportando cacao orgánico y de comercio justo a Suiza, Alemania y Países Bajos. Registra la mecánica de negociación en ferias como BIOFACH y CHOCCOA, primas de precio sobre la bolsa ICE de Nueva York, trazabilidad satelital para el reglamento europeo de deforestación (EUDR) y términos de pago en exportaciones agroindustriales.",
    relevance: "Sustenta el Escenario SCN-03 de Cacao Orgánico Grado 1 Fino de Aroma hacia Europa Central."
  },
  {
    id: "SRC-APC-01",
    title: "Servicios de Consultoría de Ingeniería y Minería en la Alianza del Pacífico",
    institution: "Asociación Peruana de Consultoría (APC) & PROMPERÚ",
    year: "2023",
    url: "https://apcperu.org",
    accessType: "Público e institucional",
    license: "Difusión gremial para el fomento de la consultoría peruana de exportación",
    summary: "Diagnóstico y casos de firmas peruanas de ingeniería geotécnica, recursos hídricos y monitoreo ambiental que exportan servicios especializados a faenas mineras en México (Sonora, Zacatecas) y Chile, bajo contratos de servicios profesionales con hitos de validación técnica y cláusulas de responsabilidad civil.",
    relevance: "Sustenta el Escenario SCN-06 de consultoría técnica geotécnica en minería."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NEGOTIATION_SOURCES };
}
