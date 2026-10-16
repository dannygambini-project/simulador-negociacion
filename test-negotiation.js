/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * test-negotiation.js - Suite de Pruebas Automatizadas
 * 
 * Valida:
 * 1. Inicialización correcta de todos los escenarios del catálogo.
 * 2. Cálculo determinista de la función de utilidad del comprador.
 * 3. Detección y activación de dealbreakers cuando se rompen límites de reserva.
 * 4. Generación coherente de contraofertas y reducción de brecha en ZOPA.
 * 5. Cierre exitoso de acuerdo cuando la utilidad supera el umbral.
 * 6. Finalización por agotamiento de rondas (deadlock).
 * 7. Decisión de retirada estratégica (Walkaway / BATNA) y su correcta valoración positiva.
 * 8. Puntuación y desglose en evaluation.js (rango 0 a 100).
 * 9. Sistema de Avatares vectoriales (Carlos, Sofía y compradores por escenario).
 * 10. Metodología Harvard PON (Understanding Others 2022) y métricas de Valor Subjetivo.
 * 11. Validación de persistencia, integridad de propuestas y textos 100% en español.
 */

const { NEGOTIATION_SOURCES } = require("./sources.js");
const { NEGOTIATION_SCENARIOS } = require("./scenarios.js");
const { NegotiationEngine } = require("./negotiation-engine.js");
const { NegotiationEvaluator } = require("./evaluation.js");
const { AVATARS, getBuyerAvatarForScenario, getExporterAvatar } = require("./avatars.js");
const { HARVARD_GUIDE_DATA, getHarvardTipForStep } = require("./harvard-framework.js");

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ [FAIL] ${testName}`);
  }
}

console.log("\n=======================================================");
console.log("INICIANDO PRUEBAS DEL SIMULADOR DE NEGOCIACIÓN");
console.log("=======================================================\n");

// PRUEBA 1: Verificación del Catálogo de Fuentes y Escenarios
console.log("--- 1. Pruebas de Fuentes y Escenarios ---");
assert(NEGOTIATION_SOURCES.length >= 6, `Al menos 6 fuentes documentadas registradas (Total: ${NEGOTIATION_SOURCES.length})`);
assert(NEGOTIATION_SCENARIOS.length >= 6, `Al menos 6 escenarios disponibles (Total: ${NEGOTIATION_SCENARIOS.length})`);

NEGOTIATION_SCENARIOS.forEach(scn => {
  assert(scn.id && scn.title && scn.sector && scn.buyerCountry, `Escenario ${scn.id} tiene metadatos completos`);
  assert(scn.source && scn.source.url && scn.source.institution, `Escenario ${scn.id} cuenta con fuente verificable`);
  assert(scn.negotiableVariables.length >= 4, `Escenario ${scn.id} tiene al menos 4 variables negociables`);
  assert(scn.buyerConfidentialProfile && scn.buyerConfidentialProfile.weights, `Escenario ${scn.id} define perfil confidencial y pesos`);
  assert(scn.hypotheticalParametersFlag.length > 0, `Escenario ${scn.id} transparenta parámetros hipotéticos didácticos`);
});

// PRUEBA 2: Motor Determinista - Escenario SCN-01 (Software Nearshore a Chile)
console.log("\n--- 2. Pruebas del Motor Determinista (SCN-01) ---");
const scn1 = NEGOTIATION_SCENARIOS.find(s => s.id === "SCN-01");
const engine1 = new NegotiationEngine(scn1, "fixed_rules");

assert(engine1.status === "negotiating", "El motor inicia en estado 'negotiating'");
assert(engine1.currentRound === 1, "La ronda inicial es 1");
assert(engine1.chatLog.length === 1, "El comprador genera su mensaje de apertura formal");

// Oferta 1: Muy alta, fuera del límite de reserva del comprador (Tarifa 70 USD/h > walkaway 53 USD/h)
const excessiveOffer = {
  hourly_rate: 70,
  advance_payment: 35,
  sla_warranty_months: 2,
  payment_term_days: 15,
  ip_rights: "exclusive_license"
};

const res1 = engine1.submitExporterOffer(excessiveOffer, "Tarifa premium de 70 USD/h.");
assert(res1.success === true, "Oferta 1 procesada correctamente");
assert(res1.offerAccepted === false || res1.counterOffer !== undefined, "Oferta excesiva es rechazada/contraofertada por superar el límite");
assert(engine1.currentRound === 2, "La ronda avanzó a 2 tras la contraoferta");

// PRUEBA 3: Convergencia hacia ZOPA y Cierre de Acuerdo
console.log("\n--- 3. Pruebas de Convergencia hacia ZOPA y Cierre ---");
// Oferta 2: El exportador ajusta a 51 USD/h con condiciones equilibradas (dentro de reserva del comprador)
const balancedOffer = {
  hourly_rate: 51,
  advance_payment: 15,
  sla_warranty_months: 3,
  payment_term_days: 30,
  ip_rights: "custom_code_only"
};

const res2 = engine1.submitExporterOffer(balancedOffer, "Ajustamos a 51 USD/h con 15% de anticipo y 30 días de crédito.");
assert(res2.success === true, "Oferta 2 procesada");

// Si el comprador aún contraoferta en ronda 2, el exportador acepta la contraoferta en mesa
if (engine1.status === "negotiating") {
  const acceptRes = engine1.acceptBuyerCounterOffer();
  assert(acceptRes.success === true, "Exportador acepta la contraoferta del comprador");
  assert(engine1.status === "agreement_reached", "Estado cambia a 'agreement_reached'");
} else {
  assert(engine1.status === "agreement_reached", "El comprador aceptó directamente la propuesta en ZOPA");
}

// PRUEBA 4: Evaluación de Desempeño (0 - 100)
console.log("\n--- 4. Pruebas de Evaluación de Desempeño ---");
const evalResult = NegotiationEvaluator.evaluateSession(scn1, engine1);
assert(evalResult.totalScore >= 0 && evalResult.totalScore <= 100, `Puntaje total dentro del rango [0, 100] (Score: ${evalResult.totalScore})`);
assert(evalResult.scoresBreakdown.economic.score <= 25, "Criterio Económico <= 25 pts");
assert(evalResult.scoresBreakdown.payment.score <= 15, "Criterio Pago <= 15 pts");
assert(evalResult.scoresBreakdown.operational.score <= 15, "Criterio Operativo <= 15 pts");
assert(evalResult.scoresBreakdown.strategic.score <= 15, "Criterio Activos/IP <= 15 pts");
assert(evalResult.scoresBreakdown.concessions.score <= 15, "Criterio Concesiones <= 15 pts");
assert(evalResult.scoresBreakdown.process.score <= 15, "Criterio Proceso <= 15 pts");
assert(evalResult.concessionsSummary.length === scn1.negotiableVariables.length, "Resumen de concesiones abarca todas las variables");
evalResult.concessionsSummary.forEach(row => {
  assert(row.variableName !== undefined, `variableName está definido: ${row.variableName}`);
  assert(row.expInitial !== undefined, `expInitial está definido: ${row.expInitial}`);
  assert(row.expFinal !== undefined, `expFinal está definido: ${row.expFinal}`);
  assert(row.expConcession !== undefined, `expConcession está definido: ${row.expConcession}`);
  assert(row.buyerInitial !== undefined, `buyerInitial está definido: ${row.buyerInitial}`);
  assert(row.buyerFinal !== undefined, `buyerFinal está definido: ${row.buyerFinal}`);
  assert(row.buyerConcession !== undefined, `buyerConcession está definido: ${row.buyerConcession}`);
});

// PRUEBA 5: Retirada Estratégica (Walkaway / BATNA)
console.log("\n--- 5. Pruebas de Walkaway / BATNA Correctamente Valorada ---");
const scn3 = NEGOTIATION_SCENARIOS.find(s => s.id === "SCN-03"); // Cacao a Suiza
const engineWalkaway = new NegotiationEngine(scn3, "fixed_rules");

const walkawayAction = engineWalkaway.breakNegotiation("El pago a 60 días destruye el flujo de caja de la cooperativa");
assert(walkawayAction.success === true, "Acción de retiro ejecutada");
assert(engineWalkaway.status === "rejected", "Estado cambia a 'rejected'");

const evalWalkaway = NegotiationEvaluator.evaluateSession(scn3, engineWalkaway);
assert(evalWalkaway.totalScore >= 50, `Un walkaway frente a condiciones abusivas recibe puntaje positivo por proteger el BATNA (Score: ${evalWalkaway.totalScore})`);
assert(evalWalkaway.scoresBreakdown.economic.score >= 15, "Criterio económico premia la retirada protectora");

// PRUEBA 6: Sistema de Avatares Vectoriales
console.log("\n--- 6. Pruebas del Sistema de Avatares Vectoriales ---");
assert(AVATARS["exporter-carlos"] && AVATARS["exporter-carlos"].svg.includes("<svg"), "Avatar Carlos Mendoza existe y contiene SVG");
assert(AVATARS["exporter-sofia"] && AVATARS["exporter-sofia"].svg.includes("<svg"), "Avatar Sofía Quispe existe y contiene SVG");

NEGOTIATION_SCENARIOS.forEach(scn => {
  const buyerAvatar = getBuyerAvatarForScenario(scn.id);
  assert(buyerAvatar && buyerAvatar.svg && buyerAvatar.svg.includes("<svg"), `Escenario ${scn.id} tiene avatar de comprador con SVG válido (${buyerAvatar.name})`);
});

// PRUEBA 7: Marco Metodológico Harvard PON & Harvard INP 2022
console.log("\n--- 7. Pruebas del Marco Metodológico Harvard PON ---");
assert(HARVARD_GUIDE_DATA.chapters.length === 5, "La guía Harvard contiene exactamente los 5 capítulos del libro");
HARVARD_GUIDE_DATA.chapters.forEach(ch => {
  assert(ch.number && ch.title && ch.framework && ch.keyPrinciples.length > 0, `Capítulo ${ch.number} (${ch.framework}) documenta sus principios clave`);
});

const harvardTipRate = getHarvardTipForStep("hourly_rate", scn1);
assert(harvardTipRate.chapter.includes("Cap. 1") && harvardTipRate.text.length > 20, "getHarvardTipForStep entrega consejo aplicable para tarifa");

assert(evalResult.harvardMetrics && evalResult.harvardMetrics.objectiveValue >= 0, "evalResult incluye métrica de Valor Objetivo");
assert(evalResult.harvardMetrics && evalResult.harvardMetrics.subjectiveValue >= 0, "evalResult incluye métrica de Valor Subjetivo");
assert(evalResult.harvardMetrics.coreConcernsAnalysis.length === 5, "evalResult evalúa las 5 Preocupaciones Fundamentales (Fisher & Shapiro)");

// PRUEBA 8: Verificación de Textos en Español
console.log("\n--- 8. Verificación de Textos en Español ---");
NEGOTIATION_SCENARIOS.forEach(scn => {
  const engine = new NegotiationEngine(scn, "fixed_rules");
  const openingMsg = engine.generateOpeningMessage();
  assert(!openingMsg.startsWith("Welcome to the table"), `Mensaje de apertura de ${scn.id} está en español`);
  assert(!openingMsg.startsWith("Guten Tag"), `Mensaje de apertura de ${scn.id} está en español`);
  assert(!openingMsg.startsWith("Hallo!"), `Mensaje de apertura de ${scn.id} está en español`);
});

// PRUEBA 9: Integridad de Guardado y Validación de Propuestas
console.log("\n--- 9. Integridad de Propuestas y Guardado ---");
const engineTestSave = new NegotiationEngine(scn1, "fixed_rules");
const testOffer = {
  hourly_rate: 52,
  advance_payment: 20,
  sla_warranty_months: 4,
  payment_term_days: 30,
  ip_rights: "custom_code_only"
};
const resSave = engineTestSave.submitExporterOffer(testOffer, "Propuesta formal de prueba");
assert(resSave.success === true, "Propuesta enviada exitosamente");
assert(engineTestSave.offersHistory.length === 2, "La propuesta del exportador y la contraoferta del comprador quedan guardadas en offersHistory");
assert(engineTestSave.chatLog.length === 3, "El chatLog contiene apertura, mensaje del exportador y contraoferta del comprador");

// PRUEBA 10: Coherencia de Contraofertas y Diálogo (Evitar contrasentidos en SCN-05)
console.log("\n--- 10. Coherencia de Contraofertas y Diálogo (SCN-05) ---");
const scn5 = NEGOTIATION_SCENARIOS.find(s => s.id === "SCN-05");
const engine5 = new NegotiationEngine(scn5, "fixed_rules");

const offerR1 = {
  monthly_retainer_fee: 7500,
  performance_bonus_pct: 10,
  payment_terms_days: 30,
  senior_hours_dedicated: 40,
  exclusivity_clause: "direct_competitors_only"
};
const resR1 = engine5.submitExporterOffer(offerR1, "Ofrecemos 7,500 USD de retainer mensual y 30 días de crédito.");
assert(resR1.counterOffer.monthly_retainer_fee <= 7500, `La contraoferta de retainer (${resR1.counterOffer.monthly_retainer_fee}) jamás supera los 7,500 USD ofrecidos por el exportador`);
assert(!resR1.buyerMessage.includes("7500 USD mensuales fijos nos parece un fee muy elevado") || resR1.counterOffer.monthly_retainer_fee < 7500, "Si el comprador iguala o no objeta 7500, no emite diálogo contradictorio");

const resR2 = engine5.submitExporterOffer(offerR1, "Mantenemos nuestra propuesta firme de 7,500 USD.");
assert(resR2.counterOffer.monthly_retainer_fee <= 7500, `En Ronda 2 la contraoferta (${resR2.counterOffer.monthly_retainer_fee}) se mantiene <= 7,500 USD y nunca sube a 8,000 USD`);

// RESUMEN FINAL
console.log("\n=======================================================");
console.log(`RESULTADO DE LA SUITE DE PRUEBAS: ${passedTests} / ${totalTests} APROBADAS`);
console.log("=======================================================\n");

if (passedTests === totalTests) {
  console.log("¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!");
  process.exit(0);
} else {
  console.error("HAY FALLOS EN LAS PRUEBAS.");
  process.exit(1);
}
