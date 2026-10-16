/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * avatars.js - Catálogo de Avatares Vectoriales de Alta Fidelidad
 * 
 * Genera avatares SVG estilizados, ejecutivos y totalmente autónomos
 * (sin dependencias externas ni imágenes de terceros).
 */

const AVATARS = {
  // EXPORTADOR PERUANO: Carlos Mendoza
  "exporter-carlos": {
    id: "exporter-carlos",
    name: "Carlos Mendoza",
    role: "Director de Negocios Internacionales",
    organization: "Empresa Exportadora Peruana",
    country: "Perú",
    flag: "🇵🇪",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-carlos" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-carlos" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d49a6a"/>
          <stop offset="100%" stop-color="#b87b4b"/>
        </linearGradient>
        <linearGradient id="suit-carlos" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <!-- Fondo circular -->
      <circle cx="50" cy="50" r="48" fill="url(#bg-carlos)" stroke="#38bdf8" stroke-width="2"/>
      <!-- Traje y cuerpo -->
      <path d="M22 92 C24 72, 38 66, 50 66 C62 66, 76 72, 78 92 Z" fill="url(#suit-carlos)"/>
      <polygon points="50,68 44,82 56,82" fill="#ffffff"/>
      <polygon points="50,72 47,94 53,94" fill="#dc2626"/>
      <!-- Cuello -->
      <rect x="44" y="55" width="12" height="14" rx="3" fill="url(#skin-carlos)"/>
      <!-- Cabeza / Rostro -->
      <ellipse cx="50" cy="42" rx="18" ry="21" fill="url(#skin-carlos)"/>
      <!-- Cabello Ejecutivo -->
      <path d="M32 38 C32 25, 42 20, 50 20 C58 20, 68 25, 68 36 C68 38, 65 30, 50 28 C38 27, 34 33, 32 38 Z" fill="#1c1917"/>
      <!-- Ojos y Cejas -->
      <path d="M39 34 Q43 32 46 34" stroke="#1c1917" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M54 34 Q57 32 61 34" stroke="#1c1917" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="43" cy="40" r="2.2" fill="#0f172a"/>
      <circle cx="57" cy="40" r="2.2" fill="#0f172a"/>
      <!-- Gafas ejecutivas modernas -->
      <rect x="37" y="36" width="11" height="8" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.2"/>
      <rect x="52" y="36" width="11" height="8" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.2"/>
      <line x1="48" y1="40" x2="52" y2="40" stroke="#38bdf8" stroke-width="1.2"/>
      <!-- Sonrisa profesional -->
      <path d="M44 52 Q50 56 56 52" stroke="#7c2d12" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <!-- Pin Perú en la solapa -->
      <circle cx="33" cy="78" r="4" fill="#dc2626"/>
      <rect x="31.8" y="75" width="2.4" height="6" fill="#ffffff"/>
    </svg>`
  },

  // EXPORTADORA PERUANA: Sofía Quispe
  "exporter-sofia": {
    id: "exporter-sofia",
    name: "Sofía Quispe",
    role: "Gerente de Negociaciones y Alianzas Globales",
    organization: "Empresa Exportadora Peruana",
    country: "Perú",
    flag: "🇵🇪",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-sofia" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#065f46"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-sofia" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#dca578"/>
          <stop offset="100%" stop-color="#bf8557"/>
        </linearGradient>
        <linearGradient id="blazer-sofia" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#047857"/>
          <stop offset="100%" stop-color="#064e3b"/>
        </linearGradient>
      </defs>
      <!-- Fondo circular -->
      <circle cx="50" cy="50" r="48" fill="url(#bg-sofia)" stroke="#10b981" stroke-width="2"/>
      <!-- Cabello largo posterior -->
      <path d="M30 40 C28 65, 34 85, 36 94 L64 94 C66 85, 72 65, 70 40 Z" fill="#262626"/>
      <!-- Blazer y escote -->
      <path d="M22 94 C25 74, 38 68, 50 68 C62 68, 75 74, 78 94 Z" fill="url(#blazer-sofia)"/>
      <polygon points="50,70 42,94 58,94" fill="#f8fafc"/>
      <!-- Cuello -->
      <rect x="44" y="56" width="12" height="14" rx="3" fill="url(#skin-sofia)"/>
      <!-- Cabeza -->
      <ellipse cx="50" cy="44" rx="17" ry="20" fill="url(#skin-sofia)"/>
      <!-- Cabello frontal con estilo -->
      <path d="M32 38 C32 23, 44 20, 50 20 C62 20, 68 25, 68 38 C63 28, 53 26, 46 28 C38 30, 34 34, 32 38 Z" fill="#262626"/>
      <!-- Ojos y Cejas -->
      <path d="M38 37 Q42 34 46 37" stroke="#262626" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M54 37 Q58 34 62 37" stroke="#262626" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="42" cy="42" r="2.2" fill="#171717"/>
      <circle cx="58" cy="42" r="2.2" fill="#171717"/>
      <!-- Labios / Sonrisa -->
      <path d="M44 53 Q50 58 56 53" stroke="#b91c1c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <!-- Aretes elegantes de plata peruana -->
      <circle cx="32" cy="48" r="2" fill="#e2e8f0"/>
      <circle cx="68" cy="48" r="2" fill="#e2e8f0"/>
      <!-- Pin Perú -->
      <circle cx="34" cy="80" r="4" fill="#dc2626"/>
      <rect x="32.8" y="77" width="2.4" height="6" fill="#ffffff"/>
    </svg>`
  },

  // SCN-01: Gonzalo Valenzuela (Chile)
  "buyer-chile": {
    id: "buyer-chile",
    name: "Gonzalo Valenzuela",
    role: "Gerente Corporativo de Transformación Digital & Abastecimiento",
    organization: "Cencor Retail Group Chile (Santiago)",
    country: "Chile",
    flag: "🇨🇱",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-chile" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-chile" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f2cfab"/>
          <stop offset="100%" stop-color="#dbb28c"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-chile)" stroke="#6366f1" stroke-width="2"/>
      <!-- Traje azul corporativo -->
      <path d="M22 92 C24 72, 38 66, 50 66 C62 66, 76 72, 78 92 Z" fill="#1e293b"/>
      <polygon points="50,68 43,84 57,84" fill="#ffffff"/>
      <polygon points="50,72 47,94 53,94" fill="#2563eb"/>
      <rect x="44" y="55" width="12" height="14" rx="3" fill="url(#skin-chile)"/>
      <ellipse cx="50" cy="42" rx="18" ry="21" fill="url(#skin-chile)"/>
      <!-- Barba cuidada -->
      <path d="M37 46 C37 57, 43 62, 50 62 C57 62, 63 57, 63 46 C60 48, 55 50, 50 50 C45 50, 40 48, 37 46 Z" fill="#292524" opacity="0.6"/>
      <!-- Cabello moderno corto -->
      <path d="M32 35 C33 22, 45 18, 53 19 C63 20, 67 25, 68 33 C62 27, 52 26, 42 27 C36 28, 33 32, 32 35 Z" fill="#292524"/>
      <!-- Gafas rectangulares de titanio -->
      <rect x="36" y="34" width="11" height="7" rx="1" fill="none" stroke="#94a3b8" stroke-width="1.3"/>
      <rect x="53" y="34" width="11" height="7" rx="1" fill="none" stroke="#94a3b8" stroke-width="1.3"/>
      <line x1="47" y1="37" x2="53" y2="37" stroke="#94a3b8" stroke-width="1.3"/>
      <circle cx="41.5" cy="37.5" r="1.8" fill="#1c1917"/>
      <circle cx="58.5" cy="37.5" r="1.8" fill="#1c1917"/>
      <!-- Mirada analítica -->
      <path d="M44 54 Q50 56 56 54" stroke="#44403c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Bandera de Chile micro badge -->
      <circle cx="34" cy="78" r="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
      <path d="M29 78 H39 V83 H29 Z" fill="#dc2626"/>
      <path d="M29 73 H34 V78 H29 Z" fill="#2563eb"/>
      <path d="M34 73 H39 V78 H34 Z" fill="#ffffff"/>
    </svg>`
  },

  // SCN-02: Arthur Van Dijk & Claire Dupont (EE. UU. / Países Bajos)
  "buyer-us-nl": {
    id: "buyer-us-nl",
    name: "Arthur Van Dijk & Claire Dupont",
    role: "Vicepresidencia Senior de Adquisiciones y Ventas Globales",
    organization: "Cinema Management Group & Cool Beats (Hollywood / Ámsterdam)",
    country: "EE. UU. / Países Bajos",
    flag: "🇺🇸 🇳🇱",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-media" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4c1d95"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-arthur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffdfba"/>
          <stop offset="100%" stop-color="#f0b27a"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-media)" stroke="#a855f7" stroke-width="2"/>
      <!-- Look ejecutivo de Hollywood / Cine de animación -->
      <path d="M20 92 C23 72, 38 65, 50 65 C62 65, 77 72, 80 92 Z" fill="#312e81"/>
      <path d="M42 66 L50 82 L58 66 Z" fill="#1e1b4b"/>
      <rect x="44" y="54" width="12" height="13" rx="3" fill="url(#skin-arthur)"/>
      <ellipse cx="50" cy="40" rx="17" ry="19" fill="url(#skin-arthur)"/>
      <!-- Cabello rubio nórdico / ejecutivo -->
      <path d="M33 34 C33 22, 44 17, 52 17 C62 17, 67 22, 67 33 C61 25, 49 23, 40 25 C35 27, 33 30, 33 34 Z" fill="#ca8a04"/>
      <!-- Gafas de diseñador redondo/cine -->
      <circle cx="42" cy="38" r="5.5" fill="none" stroke="#e0e7ff" stroke-width="1.3"/>
      <circle cx="58" cy="38" r="5.5" fill="none" stroke="#e0e7ff" stroke-width="1.3"/>
      <line x1="47.5" y1="38" x2="52.5" y2="38" stroke="#e0e7ff" stroke-width="1.3"/>
      <circle cx="42" cy="38" r="2" fill="#1e1b4b"/>
      <circle cx="58" cy="38" r="2" fill="#1e1b4b"/>
      <!-- Sonrisa astuta -->
      <path d="M45 50 Q50 53 55 50" stroke="#78350f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <!-- Bufanda estilizada de festival de cine -->
      <path d="M38 66 Q50 74 62 66 L58 84 Q50 88 42 84 Z" fill="#c026d3"/>
    </svg>`
  },

  // SCN-03: Hans-Peter Keller (Suiza / Alemania)
  "buyer-swiss": {
    id: "buyer-swiss",
    name: "Hans-Peter Keller",
    role: "Director de Compras de Materias Primas Sostenibles",
    organization: "Chocolats Fins de Berne (Berna, Suiza)",
    country: "Suiza",
    flag: "🇨🇭",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-swiss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7f1d1d"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-swiss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fed7aa"/>
          <stop offset="100%" stop-color="#fbd38d"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-swiss)" stroke="#ef4444" stroke-width="2"/>
      <!-- Traje formal de alta precisión europea -->
      <path d="M22 92 C24 72, 38 66, 50 66 C62 66, 76 72, 78 92 Z" fill="#1c1917"/>
      <polygon points="50,68 43,84 57,84" fill="#ffffff"/>
      <polygon points="50,72 47,94 53,94" fill="#78350f"/>
      <rect x="44" y="55" width="12" height="14" rx="3" fill="url(#skin-swiss)"/>
      <ellipse cx="50" cy="42" rx="18" ry="20" fill="url(#skin-swiss)"/>
      <!-- Cabello canoso distinguido -->
      <path d="M32 35 C32 22, 45 17, 52 17 C62 17, 68 22, 68 33 C64 24, 52 23, 42 24 C36 26, 33 30, 32 35 Z" fill="#94a3b8"/>
      <!-- Ojos perspicaces -->
      <path d="M39 35 Q43 33 46 35" stroke="#475569" stroke-width="1.8" fill="none"/>
      <path d="M54 35 Q57 33 61 35" stroke="#475569" stroke-width="1.8" fill="none"/>
      <circle cx="43" cy="39" r="2" fill="#1e293b"/>
      <circle cx="57" cy="39" r="2" fill="#1e293b"/>
      <!-- Expresión seria de negocios -->
      <line x1="45" y1="52" x2="55" y2="52" stroke="#7c2d12" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Pin Cruz Suiza -->
      <circle cx="34" cy="78" r="5" fill="#dc2626"/>
      <rect x="32" y="76.5" width="4" height="3" fill="#ffffff"/>
      <rect x="33.2" y="75" width="1.6" height="6" fill="#ffffff"/>
    </svg>`
  },

  // SCN-04: Erik Lindqvist (Suecia / Alemania)
  "buyer-sweden": {
    id: "buyer-sweden",
    name: "Erik Lindqvist",
    role: "Head of Indie Publishing & Scout",
    organization: "Nordic-Rhine Games Publishing (Estocolmo / Berlín)",
    country: "Suecia / Alemania",
    flag: "🇸🇪 🇩🇪",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-sweden" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-erik" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffe4c4"/>
          <stop offset="100%" stop-color="#e6bf98"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-sweden)" stroke="#38bdf8" stroke-width="2"/>
      <!-- Ropa tech casual: Hoodie negro + blazer -->
      <path d="M22 92 C24 72, 38 66, 50 66 C62 66, 76 72, 78 92 Z" fill="#0f172a"/>
      <circle cx="50" cy="80" r="8" fill="#1e293b"/>
      <rect x="44" y="55" width="12" height="14" rx="3" fill="url(#skin-erik)"/>
      <ellipse cx="50" cy="42" rx="18" ry="20" fill="url(#skin-erik)"/>
      <!-- Cabello nórdico rubio claro despeinado -->
      <path d="M30 35 C30 20, 42 16, 52 16 C63 16, 70 20, 70 32 C65 24, 55 22, 45 24 C37 26, 33 30, 30 35 Z" fill="#facc15"/>
      <!-- Audífonos gamers colgados al cuello -->
      <path d="M33 58 C33 72, 67 72, 67 58" stroke="#38bdf8" stroke-width="3" fill="none"/>
      <rect x="29" y="55" width="6" height="9" rx="2" fill="#0284c7"/>
      <rect x="65" y="55" width="6" height="9" rx="2" fill="#0284c7"/>
      <!-- Ojos amigables pero agudos -->
      <circle cx="43" cy="39" r="2.2" fill="#0284c7"/>
      <circle cx="57" cy="39" r="2.2" fill="#0284c7"/>
      <path d="M44 51 Q50 55 56 51" stroke="#854d0e" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- Pin bandera sueca -->
      <circle cx="34" cy="80" r="5" fill="#0284c7"/>
      <rect x="32" y="78.5" width="4" height="3" fill="#facc15"/>
    </svg>`
  },

  // SCN-05: Mariana De la Garza (México)
  "buyer-mexico-f": {
    id: "buyer-mexico-f",
    name: "Mariana De la Garza",
    role: "Directora General de Mercadotecnia y Comercio Digital",
    organization: "ModaYa México (CDMX / Monterrey)",
    country: "México",
    flag: "🇲🇽",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-mexf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#be185d"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-mariana" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e2ab7f"/>
          <stop offset="100%" stop-color="#c98a58"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-mexf)" stroke="#f43f5e" stroke-width="2"/>
      <!-- Cabello oscuro elegante con ondas -->
      <path d="M28 42 C26 68, 32 86, 35 94 L65 94 C68 86, 74 68, 72 42 Z" fill="#18181b"/>
      <!-- Blazer fucsia vibrante de e-commerce -->
      <path d="M22 94 C25 74, 38 68, 50 68 C62 68, 75 74, 78 94 Z" fill="#db2777"/>
      <polygon points="50,70 42,94 58,94" fill="#ffffff"/>
      <rect x="44" y="56" width="12" height="14" rx="3" fill="url(#skin-mariana)"/>
      <ellipse cx="50" cy="44" rx="17" ry="20" fill="url(#skin-mariana)"/>
      <path d="M31 38 C31 22, 44 19, 50 19 C62 19, 69 24, 69 38 C64 28, 54 26, 46 27 C38 29, 33 33, 31 38 Z" fill="#18181b"/>
      <!-- Ojos vivos y cejas estilizadas -->
      <path d="M38 37 Q42 34 46 37" stroke="#18181b" stroke-width="1.8" fill="none"/>
      <path d="M54 37 Q58 34 62 37" stroke="#18181b" stroke-width="1.8" fill="none"/>
      <circle cx="42" cy="42" r="2.2" fill="#27272a"/>
      <circle cx="58" cy="42" r="2.2" fill="#27272a"/>
      <path d="M44 53 Q50 58 56 53" stroke="#e11d48" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <!-- Aretes dorados circulares -->
      <circle cx="31" cy="49" r="2.5" fill="#f59e0b"/>
      <circle cx="69" cy="49" r="2.5" fill="#f59e0b"/>
    </svg>`
  },

  // SCN-06: Ing. Roberto Salcedo (México)
  "buyer-mexico-m": {
    id: "buyer-mexico-m",
    name: "Ing. Roberto Salcedo",
    role: "Superintendente General de Proyectos e Infraestructura de Relaves",
    organization: "Minera Sierra de Plata S.A. de C.V. (Sonora / Zacatecas)",
    country: "México",
    flag: "🇲🇽",
    statusText: "En línea",
    svg: `<svg viewBox="0 0 100 100" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-mining" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="skin-roberto" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d99b6d"/>
          <stop offset="100%" stop-color="#b67442"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg-mining)" stroke="#f59e0b" stroke-width="2"/>
      <!-- Chaleco de seguridad minero sobre camisa -->
      <path d="M22 92 C24 72, 38 66, 50 66 C62 66, 76 72, 78 92 Z" fill="#d97706"/>
      <polygon points="50,68 44,92 56,92" fill="#1e293b"/>
      <!-- Franja reflectiva de mina -->
      <line x1="28" y1="82" x2="44" y2="84" stroke="#fef08a" stroke-width="3"/>
      <line x1="72" y1="82" x2="56" y2="84" stroke="#fef08a" stroke-width="3"/>
      <rect x="44" y="55" width="12" height="14" rx="3" fill="url(#skin-roberto)"/>
      <ellipse cx="50" cy="42" rx="18" ry="21" fill="url(#skin-roberto)"/>
      <!-- Bigote / rasgos mineros con experiencia -->
      <path d="M42 49 Q50 53 58 49" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Cabello canoso corto -->
      <path d="M32 36 C32 24, 44 20, 50 20 C58 20, 68 24, 68 35 C64 27, 54 26, 44 27 C38 29, 34 32, 32 36 Z" fill="#52525b"/>
      <!-- Mirada seria y experimentada -->
      <circle cx="43" cy="39" r="2" fill="#1c1917"/>
      <circle cx="57" cy="39" r="2" fill="#1c1917"/>
      <path d="M45 55 Q50 57 55 55" stroke="#78350f" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Bandera de México pin -->
      <circle cx="34" cy="78" r="5" fill="#ffffff"/>
      <rect x="29" y="74" width="3.3" height="8" fill="#15803d"/>
      <rect x="32.3" y="74" width="3.3" height="8" fill="#ffffff"/>
      <rect x="35.6" y="74" width="3.4" height="8" fill="#b91c1c"/>
    </svg>`
  }
};

/**
 * Obtiene el objeto de avatar según el ID del escenario o rol
 */
function getBuyerAvatarForScenario(scenarioId) {
  switch (scenarioId) {
    case "SCN-01": return AVATARS["buyer-chile"];
    case "SCN-02": return AVATARS["buyer-us-nl"];
    case "SCN-03": return AVATARS["buyer-swiss"];
    case "SCN-04": return AVATARS["buyer-sweden"];
    case "SCN-05": return AVATARS["buyer-mexico-f"];
    case "SCN-06": return AVATARS["buyer-mexico-m"];
    default: return AVATARS["buyer-chile"];
  }
}

/**
 * Retorna el avatar del exportador peruano
 */
function getExporterAvatar(personaId = "exporter-carlos") {
  return AVATARS[personaId] || AVATARS["exporter-carlos"];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AVATARS, getBuyerAvatarForScenario, getExporterAvatar };
}
