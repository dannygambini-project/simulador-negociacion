# Simulador de Negociación Internacional para Exportadores Peruanos

Plataforma web interactiva desarrollada para capacitar y entrenar a empresarios y exportadores peruanos en negociaciones comerciales transfronterizas frente a compradores extranjeros simulados.

---

## 1. Arquitectura del Proyecto

El sistema está construido con estándares modernos de **HTML5, CSS3 y JavaScript Vanilla**, sin dependencias pesadas de terceros, garantizando portabilidad, velocidad de carga y persistencia local mediante `localStorage` con sincronización opcional a **Supabase**.

```
├── index.html              # Estructura semántica con 7 vistas (Dashboard, Catálogo, Briefing, Sala, Reporte, Fuentes)
├── styles.css              # Sistema de diseño SaaS ejecutivo, modo oscuro/glassmorphism y diseño responsive
├── app.js                  # Orquestador de vistas, persistencia, bindings y ciclo de vida de la negociación
├── scenarios.js            # Catálogo de 6 escenarios documentados con fichas completas y variables estructuradas
├── negotiation-engine.js   # Motor determinista con funciones de utilidad ZOPA, curvas de concesión y dealbreakers
├── evaluation.js           # Evaluador multidimensional (0 a 100 pts) basado en el modelo Harvard PON e ITC
├── sources.js              # Biblioteca de fuentes institucionales verificables (PROMPERÚ, ITC, WIPO, Harvard PON)
├── test-negotiation.js     # Suite de 53 pruebas unitarias y de integración automatizadas
└── README.md               # Documentación técnica y guía de ejecución
```

---

## 2. Investigación Previa Obligatoria: Fuentes y Marco Institucional

Todos los escenarios están sustentados en casos reales, estudios sectoriales y modelos contractuales de acceso público de organismos internacionales y oficiales:

| ID Fuente | Institución | Título del Documento / Publicación | Enlace Verificable | Tipo de Licencia / Acceso |
|---|---|---|---|---|
| **SRC-PROMPERU-01** | PROMPERÚ & LatAm Cinema | *Estrategia de Servicios Creativos: Animación Digital y el caso 'Ainbo'* (2021) | [gob.pe/promperu](https://www.gob.pe/institucion/promperu/noticias/508493-animacion-peruana-ainbo-triunfa-en-el-mundo) | Acceso público abierto |
| **SRC-ITC-01** | International Trade Centre (ITC / OMC) | *Model Contracts for Small Firms: Legal Guidance for Doing International Business* | [intracen.org](https://www.intracen.org/resources/publications/model-contracts-for-small-firms) | Libre acceso formativo PYMES |
| **SRC-WIPO-01** | World Intellectual Property Organization (OMPI) | *Mastering the Game: Business and Legal Issues for Video Game Developers (Pub. 950)* | [wipo.int/pub950](https://www.wipo.int/edocs/pubdocs/en/copyright/950/wipo_pub_950.pdf) | Libre acceso OMPI |
| **SRC-WIPO-02** | OMPI & ITC | *Exchanging Value: Negotiating Technology Licensing Agreements (Pub. 906)* | [wipo.int/pub906](https://www.wipo.int/edocs/pubdocs/en/sme/906/wipo_pub_906.pdf) | Libre acceso formativo |
| **SRC-HARVARD-01** | Harvard Program on Negotiation (PON) | *BATNA Basics: Boost Your Power at the Bargaining Table* | [pon.harvard.edu](https://www.pon.harvard.edu/free-reports/) | Libre acceso educativo |
| **SRC-PROMPERU-02** | PROMPERÚ | *Perú Service Summit e Informes de Inteligencia de Software y Marketing Digital* | [peruservicesummit.com](https://peruservicesummit.com) | Acceso público abierto |
| **SRC-SECO-01** | Cooperación Suiza (SECO) & SIPPO / Agromercado | *Programa SeCompetitivo: Cadenas de Valor de Cacao Fino de Aroma (Acopagro y Norandino)* | [cooperacionsuiza.pe](https://www.cooperacionsuiza.pe/proyectos/secompetitivo/) | Acceso público institucional |
| **SRC-APC-01** | Asoc. Peruana de Consultoría (APC) & PROMPERÚ | *Consultoría de Ingeniería y Minería en la Alianza del Pacífico* | [apcperu.org](https://apcperu.org) | Difusión gremial e institucional |

---

## 3. Catálogo de Escenarios Disponibles

1. **SCN-01: Squad Ágil de Desarrollo Nearshore para Retail Omnicanal en Chile**
   - *Sector:* Software y Servicios Digitales.
   - *Contraparte:* Gonzalo Valenzuela (Cencor Retail Group, Santiago de Chile).
   - *Variables:* Tarifa hora (USD/h), anticipo (%), garantía SLA (meses), plazo de pago (días), cesión de código/IP.
2. **SCN-02: Coproducción y Licencia de Distribución Internacional de Animación 3D (Caso Ainbo)**
   - *Sector:* Audiovisual y Servicios Creativos.
   - *Contraparte:* Arthur Vance (Pacific Coast Film Distribution, Beverly Hills / Ámsterdam).
   - *Variables:* Garantía Mínima (MG en miles USD), Revenue Share (%), exclusión territorial, plazo DCP, corte final.
3. **SCN-03: Suministro Anual de Cacao Orgánico Fino de Aroma Fairtrade (Caso Acopagro / Norandino)**
   - *Sector:* Agroexportación Sostenible.
   - *Contraparte:* Markus Schultheiss (Chocolats Fins de Berne & Zürich A.G., Suiza).
   - *Variables:* Precio base FOB Callao (USD/TM), prima orgánica/Fairtrade, método de pago (Carta de Crédito vs CAD), humedad máx, Incoterm.
4. **SCN-04: Publishing y Cofinanciamiento de Videojuego Indie Multiplataforma (Caso Arrog)**
   - *Sector:* Videojuegos y Licenciamiento.
   - *Contraparte:* Elena Klaus (Nordic-Rhine Publishing GmbH, Colonia, Alemania).
   - *Variables:* Adelanto por hitos (USD), reparto post-recoup (%), presupuesto marketing garantizado, exclusividad temporal, titularidad de IP.
5. **SCN-05: Retainer Anual de Performance y Growth Marketing para E-Commerce Multilatina**
   - *Sector:* Marketing Digital y Servicios Basados en Conocimiento.
   - *Contraparte:* Rodrigo Morales (ModaYa E-Commerce México S.A. de C.V., CDMX).
   - *Variables:* Retainer mensual (USD/mes), bono ROAS (%), crédito (días), horas senior dedicadas, no competencia.
6. **SCN-06: Estudio Geotécnico y Monitoreo Ambiental de Presa de Relaves Mineros**
   - *Sector:* Consultoría e Ingeniería Especializada.
   - *Contraparte:* Ing. Guillermo Cárdenas (Minera Sierra de Plata S.A. de C.V., Sonora, México).
   - *Variables:* Honorarios globales (miles USD), anticipo de movilización (%), plazo de entrega, límite de responsabilidad (Indemnity Cap), talleres en mina.

---

## 4. Motor de Negociación Determinista vs Integración con IA

- **Modalidad Reglas Fijas (Activa por defecto):** Opera con funciones de utilidad ponderada:
  $$U_{buyer} = \sum_{i} w_i \cdot u_i(x_i)$$
  Aplica curvas de concesión progresivas y decrecientes, verifica dealbreakers (límites de reserva y presupuestos máximos) y genera respuestas reproducibles sin consumir APIs externas.
- **Preparación para IA Asistida:** La arquitectura separa el intermediario de negociación en `negotiation-engine.js` para permitir la inyección de un modelo de lenguaje a través de un backend seguro mediante proxy (respetando las directrices de seguridad de no exponer claves API en el navegador del cliente).

---

## 5. Sistema de Evaluación (0 a 100 Puntos)

La evaluación post-negociación no premia ciegamente el cierre de un trato:
- **Rentabilidad Económica (25 pts):** Mide la cercanía al target del exportador en ZOPA. Si el usuario decide retirarse (Walkaway / BATNA) frente a una oferta ruinosa por debajo de sus costes, **se le premia con alta puntuación (18-22 pts)** por proteger a su empresa.
- **Condiciones de Pago y Flujo de Caja (15 pts):** Pondera anticipos, instrumentos bancarios garantizados (Carta de Crédito) y mitigación de mora.
- **Gestión de Riesgos y Plazos (15 pts):** Evalúa garantías técnicas y cronogramas realistas.
- **Preservación de Activos Estratégicos e IP (15 pts):** Evalúa la retención de código fuente, marcas, derechos territoriales o cláusulas de responsabilidad civil.
- **Táctica de Concesiones en ZOPA (15 pts):** Premia concesiones graduales y decrecientes; penaliza concesiones prematuras o unilaterales.
- **Ritmo de Negociación y Cierre (15 pts):** Evalúa la eficiencia del número de rondas.

---

## 6. Base de Datos Supabase (`Simulador de negocios`)

Las tablas han sido inicializadas en el proyecto `Simulador de negocios` (`hiksoutppfjykbzubisp`):
- `negotiation_sessions`: Registro histórico de sesiones, escenarios, ofertas iniciales y finales, puntuación y desglose de competencias.
- `user_stats`: Agregados de desempeño, acuerdos logrados, retiros estratégicos y promedio general.

---

## 7. Instrucciones para Ejecutar y Probar la Aplicación

### Opción 1: Servidor Local Rápido (Python o Node)
En la terminal dentro de esta carpeta:
```bash
# Con Python
python -m http.server 8080

# O con npx serve
npx serve -l 8080 .
```
Abre en tu navegador favorito:
👉 `http://localhost:8080`

### Opción 2: Ejecutar la Suite de Pruebas Automatizadas
Para verificar el motor de negociación, funciones de utilidad, ZOPA, dealbreakers y evaluación:
```bash
node test-negotiation.js
```
Resultado: **130 / 130 pruebas unitarias aprobadas.**

---

## 8. Despliegue Manual en Vercel

Este proyecto está 100% optimizado para desplegarse en **Vercel** de forma estática e instantánea:

1. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** ➔ **"Project"**.
3. Selecciona el repositorio **`simulador-negociacion`**.
4. En la configuración de importación:
   - **Framework Preset:** `Other` (Static Site).
   - **Root Directory:** `./` (raíz).
   - **Build Command:** Déjalo vacío o por defecto (no requiere compilación previa).
   - **Output Directory:** Déjalo vacío o por defecto.
5. Haz clic en **"Deploy"**.
6. En menos de 30 segundos tu simulador estará en vivo con HTTPS gratuito y CDN global.
