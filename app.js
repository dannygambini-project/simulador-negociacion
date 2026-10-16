/**
 * SIMULADOR DE NEGOCIACIÓN INTERNACIONAL PARA EXPORTADORES PERUANOS
 * app.js - Controlador de Interfaz, Flujo por Pasos (Wizard), Avatares y Persistencia
 * 
 * Modificaciones integradas:
 * 1. Avatares vectoriales integrados en briefing, chat, header y reportes.
 * 2. Asistente guiado por pasos (Wizard) con contexto detallado y diagnóstico en cada variable.
 * 3. Insumo metodológico de la Guía Harvard PON 2022 ("Understanding Others through Negotiation").
 * 4. Plataforma 100% en español (términos comerciales y contractuales estandarizados).
 * 5. Validación rigurosa de elecciones, guardado local y persistencia.
 */

class SimulatorApp {
  constructor() {
    this.currentView = "dashboard";
    this.selectedScenario = null;
    this.activeEngine = null;
    this.activeMode = "fixed_rules";
    this.selectedPersona = "exporter-carlos"; // 'exporter-carlos' | 'exporter-sofia'
    this.sessionsHistory = [];
    this.userStats = {
      totalSessions: 0,
      dealsClosed: 0,
      walkaways: 0,
      avgScore: 0
    };

    // Estado del asistente de propuestas por pasos
    this.wizardStep = 0; // 0 .. N (donde N es el paso de Resumen y Envío)
    this.currentDraftOffer = {}; // { variableId: value }

    // Tema visual (Claro / Oscuro)
    this.currentTheme = localStorage.getItem("peru_export_theme") || "dark";

    // Supabase config opcional para sincronización
    this.supabaseUrl = "https://hiksoutppfjykbzubisp.supabase.co";
    this.supabaseAnonKey = "sb_publishable_gn4_gs8yagO8RdotQaQDSQ_Jjpt2j31";

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.loadPersistence();
    this.bindNavigationEvents();
    this.bindFilterEvents();
    this.renderCatalog();
    this.renderSources();
    this.renderHarvardSection();
    this.renderDashboard();
    this.initPersonaAvatars();

    if (typeof NEGOTIATION_SCENARIOS !== "undefined" && NEGOTIATION_SCENARIOS.length > 0) {
      this.selectedScenario = NEGOTIATION_SCENARIOS[0];
    }
  }

  /* ==========================================================================
     PERSISTENCIA LOCAL Y MÉTRICAS
     ========================================================================== */
  loadPersistence() {
    try {
      const savedHistory = localStorage.getItem("peru_export_history");
      if (savedHistory) {
        this.sessionsHistory = JSON.parse(savedHistory);
      }
      const savedStats = localStorage.getItem("peru_export_stats");
      if (savedStats) {
        this.userStats = JSON.parse(savedStats);
      }
      const savedPersona = localStorage.getItem("peru_export_persona");
      if (savedPersona) {
        this.selectedPersona = savedPersona;
      }
    } catch (e) {
      console.warn("No se pudo cargar localStorage:", e);
    }
  }

  savePersistence() {
    try {
      localStorage.setItem("peru_export_history", JSON.stringify(this.sessionsHistory));
      localStorage.setItem("peru_export_stats", JSON.stringify(this.userStats));
      localStorage.setItem("peru_export_persona", this.selectedPersona);
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }

    this.syncSessionToSupabase();
  }

  async syncSessionToSupabase() {
    if (!this.sessionsHistory.length) return;
    const latest = this.sessionsHistory[this.sessionsHistory.length - 1];
    try {
      await fetch(`${this.supabaseUrl}/rest/v1/negotiation_sessions`, {
        method: "POST",
        headers: {
          "apikey": this.supabaseAnonKey,
          "Authorization": `Bearer ${this.supabaseAnonKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          scenario_id: latest.scenarioId,
          scenario_title: latest.scenarioTitle,
          buyer_country: latest.buyerCountry,
          mode: latest.mode,
          status: latest.status,
          rounds_count: latest.roundsCount,
          final_score: latest.score,
          score_breakdown: latest.breakdown,
          initial_offer: latest.initialOffer,
          final_offer: latest.finalOffer
        })
      });
    } catch (err) {
      // Sincronización transparente
    }
  }

  /* ==========================================================================
     ENRUTAMIENTO Y VISTAS
     ========================================================================== */
  bindNavigationEvents() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        this.navigateTo(view);
      });
    });
  }

  navigateTo(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

    const targetSec = document.getElementById(`view-${viewName}`);
    const targetBtn = document.getElementById(`nav-btn-${viewName}`);
    if (targetSec) targetSec.classList.add("active");
    if (targetBtn) targetBtn.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewName === "dashboard") {
      this.renderDashboard();
    }
  }

  /* ==========================================================================
     AVATARES Y SELECCIÓN DE PERSONA
     ========================================================================== */
  initPersonaAvatars() {
    const carlosBox = document.getElementById("briefing-avatar-carlos");
    const sofiaBox = document.getElementById("briefing-avatar-sofia");
    if (carlosBox && typeof AVATARS !== "undefined") {
      carlosBox.innerHTML = AVATARS["exporter-carlos"].svg;
    }
    if (sofiaBox && typeof AVATARS !== "undefined") {
      sofiaBox.innerHTML = AVATARS["exporter-sofia"].svg;
    }
  }

  selectExporterPersona(personaId) {
    this.selectedPersona = personaId;
    this.savePersistence();
    this.showToast("Identidad Seleccionada", `Has seleccionado a ${personaId === 'exporter-carlos' ? 'Carlos Mendoza' : 'Sofía Quispe'} como tu representante exportador.`, "info");
  }

  getExporterInfo() {
    if (typeof AVATARS !== "undefined" && AVATARS[this.selectedPersona]) {
      return AVATARS[this.selectedPersona];
    }
    return {
      id: "exporter-carlos",
      name: "Carlos Mendoza",
      role: "Director de Negocios Internacionales",
      organization: "Empresa Exportadora Peruana",
      country: "Perú",
      flag: "🇵🇪",
      svg: ""
    };
  }

  getBuyerInfo(scenario) {
    if (typeof getBuyerAvatarForScenario === "function") {
      return getBuyerAvatarForScenario(scenario.id);
    }
    return {
      name: scenario.buyerConfidentialProfile.buyerName,
      role: scenario.buyerConfidentialProfile.buyerRole,
      organization: scenario.buyerConfidentialProfile.companyName,
      country: scenario.buyerCountry,
      flag: "🌐",
      svg: ""
    };
  }

  /* ==========================================================================
     DASHBOARD
     ========================================================================== */
  renderDashboard() {
    document.getElementById("stat-total-sessions").textContent = this.userStats.totalSessions;
    document.getElementById("stat-avg-score").innerHTML = `${Math.round(this.userStats.avgScore)} <span style="font-size: 1rem; color: var(--text-dim);">/ 100</span>`;
    document.getElementById("stat-deals-closed").textContent = this.userStats.dealsClosed;
    document.getElementById("stat-walkaways").textContent = this.userStats.walkaways;

    const tbody = document.getElementById("dashboard-history-tbody");
    if (!this.sessionsHistory || this.sessionsHistory.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-dim); padding: 2rem;">
            Aún no has completado ninguna negociación. ¡Comienza explorando el catálogo de escenarios!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.sessionsHistory.slice(-8).reverse().map(s => {
      const statusBadge = s.status === "agreement_reached" 
        ? `<span class="difficulty-badge difficulty-principiante">Acuerdo Concretado</span>`
        : `<span class="difficulty-badge difficulty-intermedio">Retiro / MAAN</span>`;

      return `
        <tr>
          <td style="color: var(--text-dim);">${s.date}</td>
          <td><strong>${s.scenarioTitle}</strong></td>
          <td>${s.buyerCountry}</td>
          <td><span style="font-size: 0.75rem; color: var(--accent-cyan);">${s.mode === 'fixed_rules' ? 'Reglas Fijas' : 'IA'}</span></td>
          <td>${statusBadge}</td>
          <td><strong style="color: var(--accent-emerald);">${s.score} pts</strong></td>
          <td>
            <button class="btn btn-secondary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;" onclick="app.loadHistoricalReport('${s.id}')">
              Ver Informe
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  /* ==========================================================================
     CATÁLOGO DE CASOS
     ========================================================================== */
  bindFilterEvents() {
    const sectorFilter = document.getElementById("filter-sector");
    const diffFilter = document.getElementById("filter-difficulty");
    const searchInput = document.getElementById("search-scenario");

    const applyFilters = () => {
      const sector = sectorFilter.value;
      const diff = diffFilter.value;
      const term = searchInput.value.toLowerCase().trim();

      const filtered = NEGOTIATION_SCENARIOS.filter(scn => {
        let matchSector = true;
        if (sector === "software") matchSector = scn.sector.toLowerCase().includes("software");
        else if (sector === "audiovisual") matchSector = scn.sector.toLowerCase().includes("audiovisual");
        else if (sector === "videojuegos") matchSector = scn.sector.toLowerCase().includes("videojuegos");
        else if (sector === "agroexport") matchSector = scn.sector.toLowerCase().includes("agroexportación");
        else if (sector === "marketing") matchSector = scn.sector.toLowerCase().includes("marketing");
        else if (sector === "consulting") matchSector = scn.sector.toLowerCase().includes("consultoría");

        let matchDiff = diff === "all" || scn.difficulty === diff;
        let matchTerm = !term || (
          scn.title.toLowerCase().includes(term) ||
          scn.productOrService.toLowerCase().includes(term) ||
          scn.buyerCountry.toLowerCase().includes(term) ||
          scn.sector.toLowerCase().includes(term)
        );

        return matchSector && matchDiff && matchTerm;
      });

      this.renderFilteredScenarios(filtered);
    };

    sectorFilter.addEventListener("change", applyFilters);
    diffFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
  }

  renderCatalog() {
    this.renderFilteredScenarios(NEGOTIATION_SCENARIOS);
  }

  renderFilteredScenarios(scenariosList) {
    const container = document.getElementById("scenarios-grid-container");
    if (!scenariosList || scenariosList.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-dim);">
          No se encontraron escenarios con los criterios de búsqueda seleccionados.
        </div>
      `;
      return;
    }

    container.innerHTML = scenariosList.map(scn => {
      const diffClass = `difficulty-${scn.difficulty.toLowerCase()}`;
      const buyer = this.getBuyerInfo(scn);

      return `
        <div class="scenario-card">
          <div>
            <div class="card-top">
              <span class="scenario-id-badge">${scn.id}</span>
              <span class="difficulty-badge ${diffClass}">${scn.difficulty}</span>
            </div>
            
            <!-- Perfil del Comprador con Avatar -->
            <div style="display: flex; align-items: center; gap: 0.65rem; margin: 0.75rem 0 0.5rem 0; background: rgba(15,23,42,0.5); padding: 0.5rem 0.75rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.05);">
              <div class="avatar-wrapper avatar-mini" style="width: 32px; height: 32px;">
                ${buyer.svg}
              </div>
              <div>
                <strong style="font-size: 0.84rem; color: #fff;">${buyer.name}</strong>
                <span style="font-size: 0.72rem; color: var(--text-dim); display: block;">${buyer.country} ${buyer.flag}</span>
              </div>
            </div>

            <h3 class="scenario-card-title">${scn.title}</h3>
            <div class="scenario-tags-row">
              <span class="tag-pill">🇵🇪 Origen: Perú</span>
              <span class="tag-pill">Destino: ${scn.buyerCountry}</span>
              <span class="tag-pill">${scn.sector.split(",")[0]}</span>
            </div>
            <p class="scenario-card-desc">${scn.productOrService}</p>

            <div class="scenario-source-box">
              <strong>Fuente Verificable:</strong> ${scn.source.institution} (${scn.source.reference.split(";")[0]})<br>
              <a href="${scn.source.url}" target="_blank" rel="noopener noreferrer">↗ Consultar documento oficial</a>
            </div>
          </div>

          <div class="card-footer">
            <span style="font-size: 0.76rem; color: var(--text-dim);">
              ${scn.negotiableVariables.length} variables negociables
            </span>
            <button class="btn btn-primary" onclick="app.openScenarioBriefing('${scn.id}')">
              Examinar Caso ➔
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  /* ==========================================================================
     FICHA DEL CASO / BRIEFING
     ========================================================================== */
  showBriefing(scenarioId) {
    return this.openScenarioBriefing(scenarioId);
  }

  openScenarioBriefing(scenarioId) {
    const scn = NEGOTIATION_SCENARIOS.find(s => s.id === scenarioId);
    if (!scn) return;
    this.selectedScenario = scn;

    document.getElementById("briefing-scenario-id").textContent = scn.id;
    document.getElementById("briefing-title").textContent = scn.title;
    document.getElementById("briefing-context").textContent = scn.documentedContext;
    document.getElementById("briefing-objective").textContent = scn.pedagogicalObjective;

    // Fuentes y licencias
    document.getElementById("briefing-source-box").innerHTML = `
      <p style="margin-bottom: 0.4rem;"><strong>Institución / Autor:</strong> ${scn.source.institution}</p>
      <p style="margin-bottom: 0.4rem;"><strong>Referencia Bibliográfica:</strong> ${scn.source.reference}</p>
      <p style="margin-bottom: 0.4rem;"><strong>Enlace oficial:</strong> <a href="${scn.source.url}" target="_blank" rel="noopener noreferrer">${scn.source.url}</a></p>
      <p style="margin-bottom: 0;"><strong>Términos de reutilización:</strong> <span style="color: var(--accent-emerald);">${scn.source.license}</span></p>
    `;

    // Parámetros hipotéticos didácticos
    document.getElementById("briefing-hypothetical-list").innerHTML = scn.hypotheticalParametersFlag.map(p => {
      return `<li style="margin-bottom: 0.35rem;">${p}</li>`;
    }).join("");

    // Dossier inicial del exportador
    const dossier = scn.exporterInitialDossier;
    document.getElementById("dossier-company").textContent = dossier.companyName;
    document.getElementById("dossier-cost").textContent = dossier.costStructure;
    document.getElementById("dossier-target").textContent = dossier.targetPrice;
    document.getElementById("dossier-walkaway").textContent = dossier.walkawayPoint;
    document.getElementById("dossier-batna").textContent = dossier.batnaDescription;

    // Seleccionar persona activa en los radios
    const personaRadio = document.querySelector(`input[name="exporter-persona"][value="${this.selectedPersona}"]`);
    if (personaRadio) personaRadio.checked = true;

    // Conectar botón de inicio de negociación
    document.getElementById("btn-start-negotiation").onclick = () => {
      const modeRadio = document.querySelector('input[name="simulation-mode"]:checked');
      const chosenMode = modeRadio ? modeRadio.value : "fixed_rules";
      this.startNegotiation(scn, chosenMode);
    };

    this.navigateTo("briefing");
  }

  /* ==========================================================================
     SALA DE NEGOCIACIÓN: ENTRADA Y SETUP
     ========================================================================== */
  startNegotiation(scenario, mode = "fixed_rules") {
    this.selectedScenario = scenario;
    this.activeMode = mode;
    this.activeEngine = new NegotiationEngine(scenario, mode);

    // Inicializar el borrador de propuesta con los valores iniciales del exportador
    this.currentDraftOffer = {};
    scenario.negotiableVariables.forEach(v => {
      this.currentDraftOffer[v.id] = v.initialExporter;
    });

    // Reiniciar al Paso 1 del Wizard
    this.wizardStep = 0;

    // Actualizar badges de cabecera
    document.getElementById("room-scenario-badge").textContent = scenario.id;
    document.getElementById("room-scenario-title").textContent = scenario.title;
    document.getElementById("room-round-indicator").textContent = `1 / ${this.activeEngine.maxRounds}`;

    // Actualizar indicador de modo
    const modeTag = document.getElementById("room-mode-tag");
    const modeLabel = document.getElementById("active-mode-label");
    if (mode === "ai_assisted") {
      modeTag.innerHTML = `<span class="mode-dot" style="background:#38bdf8; box-shadow:0 0 8px #38bdf8;"></span><span>Modo IA (Asistido)</span>`;
      modeLabel.textContent = "Modo IA Asistido";
    } else {
      modeTag.innerHTML = `<span class="mode-dot"></span><span>Reglas Fijas Deterministas</span>`;
      modeLabel.textContent = "Motor Reglas Fijas";
    }

    // Configurar Cara a Cara (Face-Off) con Avatares
    const exporter = this.getExporterInfo();
    const buyer = this.getBuyerInfo(scenario);

    // Exportador
    document.getElementById("room-exporter-avatar-container").innerHTML = exporter.svg + '<span class="avatar-status-dot pulse"></span>';
    document.getElementById("room-exporter-name").innerHTML = `${exporter.name} <span style="font-size: 0.85rem;">🇵🇪</span>`;
    document.getElementById("room-exporter-company").textContent = scenario.exporterInitialDossier.companyName;

    // Comprador
    document.getElementById("room-buyer-avatar-container").innerHTML = buyer.svg + '<span class="avatar-status-dot pulse"></span>';
    document.getElementById("room-buyer-name-header").innerHTML = `${buyer.name} <span id="room-buyer-flag" style="font-size: 0.85rem;">${buyer.flag}</span>`;
    document.getElementById("room-buyer-company").textContent = buyer.organization;

    // Chat column header
    document.getElementById("room-buyer-avatar").innerHTML = buyer.svg;
    document.getElementById("room-buyer-name").textContent = buyer.name;
    document.getElementById("room-buyer-role").textContent = `${buyer.role} - ${buyer.organization}`;
    document.getElementById("room-buyer-country-label").textContent = `📍 ${scenario.buyerCountry}`;

    // Renderizar Asistente de Propuestas por Pasos (Wizard)
    this.renderStepWizard();

    // Renderizar mensajes del chat
    this.renderChatMessages();

    // Habilitar botón de sala en navegación
    document.getElementById("nav-btn-room").style.display = "flex";
    this.navigateTo("room");

    this.showToast("Mesa de Negociación Abierta", `Comienza la Ronda 1 con ${buyer.name} (${buyer.country}). Utiliza el asistente por pasos para evaluar cada variable.`, "info");
  }

  /* ==========================================================================
     ASISTENTE DE NEGOCIACIÓN POR PASOS (STEP-BY-STEP WIZARD)
     ========================================================================== */
  renderStepWizard() {
    if (!this.selectedScenario || !this.activeEngine) return;
    const scenario = this.selectedScenario;
    const vars = scenario.negotiableVariables;
    const totalSteps = vars.length + 1; // Último paso es 'Resumen y Confirmación'
    const isSummaryStep = this.wizardStep === vars.length;

    // Actualizar indicador del paso
    const stepBadge = document.getElementById("wizard-step-badge");
    const stepTitle = document.getElementById("wizard-step-title");
    const stepCat = document.getElementById("wizard-variable-category");

    if (isSummaryStep) {
      stepBadge.textContent = `Paso Final (${totalSteps} de ${totalSteps})`;
      stepTitle.textContent = "Revisión y Confirmación Vinculante";
      stepCat.textContent = "Validación Integral";
      stepCat.style.background = "rgba(16, 185, 129, 0.2)";
      stepCat.style.borderColor = "rgba(16, 185, 129, 0.4)";
      stepCat.style.color = "#34d399";
    } else {
      const activeVar = vars[this.wizardStep];
      stepBadge.textContent = `Paso ${this.wizardStep + 1} de ${totalSteps}`;
      stepTitle.textContent = activeVar.name;
      
      // Categoría de la variable
      let catName = "Término Comercial";
      if (activeVar.id.includes("price") || activeVar.id.includes("fee") || activeVar.id.includes("rate") || activeVar.id.includes("guarantee")) {
        catName = "Económica / Precio";
      } else if (activeVar.id.includes("advance") || activeVar.id.includes("payment")) {
        catName = "Financiera / Tesorería";
      } else if (activeVar.id.includes("warranty") || activeVar.id.includes("delivery") || activeVar.id.includes("sla")) {
        catName = "Operativa / Garantía";
      } else if (activeVar.id.includes("ip") || activeVar.id.includes("territorial") || activeVar.id.includes("liability")) {
        catName = "Legal / Propiedad Intelectual";
      }
      stepCat.textContent = catName;
      stepCat.style.background = "rgba(37, 99, 235, 0.2)";
      stepCat.style.borderColor = "rgba(37, 99, 235, 0.4)";
      stepCat.style.color = "#60a5fa";
    }

    // Renderizar Píldoras / Tabs del Stepper
    this.renderStepperTabs(vars, totalSteps);

    // Renderizar Contenido del Paso
    const contentBox = document.getElementById("wizard-step-content");
    if (isSummaryStep) {
      contentBox.innerHTML = this.buildSummaryStepHtml(scenario);
    } else {
      const activeVar = vars[this.wizardStep];
      contentBox.innerHTML = this.buildVariableStepHtml(activeVar, scenario);
    }

    // Actualizar botones de navegación
    const prevBtn = document.getElementById("btn-wizard-prev");
    const nextBtn = document.getElementById("btn-wizard-next");

    prevBtn.disabled = this.wizardStep === 0;
    if (isSummaryStep) {
      nextBtn.style.display = "none"; // En el paso final se usa el botón de confirmación formal
    } else {
      nextBtn.style.display = "inline-flex";
      nextBtn.textContent = this.wizardStep === vars.length - 1 ? "Revisar Propuesta Completa ➔" : "Siguiente Paso ➔";
    }
  }

  renderStepperTabs(vars, totalSteps) {
    const tabsContainer = document.getElementById("wizard-stepper-tabs");
    let html = vars.map((v, idx) => {
      const isActive = idx === this.wizardStep;
      const isDone = idx < this.wizardStep;
      const val = this.currentDraftOffer[v.id] ?? v.initialExporter;
      const shortName = v.name.split(" ")[0];

      return `
        <button 
          class="wizard-step-tab ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" 
          onclick="app.goToWizardStep(${idx})"
          title="${v.name}: ${val}"
        >
          <span>${idx + 1}.</span> ${shortName} ${isDone ? '✓' : ''}
        </button>
      `;
    }).join("");

    // Tab final de resumen
    const summaryActive = this.wizardStep === vars.length;
    html += `
      <button 
        class="wizard-step-tab ${summaryActive ? 'active' : ''}" 
        onclick="app.goToWizardStep(${vars.length})"
      >
        <span>📋</span> Revisión y Envío
      </button>
    `;

    tabsContainer.innerHTML = html;
  }

  buildVariableStepHtml(variable, scenario) {
    const buyerCounter = this.activeEngine.currentBuyerCounterOffer || {};
    const buyerVal = buyerCounter[variable.id] ?? variable.initialBuyer;
    const currentVal = this.currentDraftOffer[variable.id] ?? variable.initialExporter;
    const dossier = scenario.exporterInitialDossier;
    const buyer = scenario.buyerConfidentialProfile;

    // Obtener consejo metodológico de Harvard
    const harvardTip = typeof getHarvardTipForStep === "function" 
      ? getHarvardTipForStep(variable.id, scenario)
      : { chapter: "Capítulo 1: Criterios Objetivos", text: "Defiende tus márgenes apoyándote en referencias verificables.", coreConcern: "Respeto mutuo" };

    // Construcción del diagnóstico de posición
    let positionDiagnosis = "";
    if (variable.type === "numeric") {
      if (variable.id.includes("price") || variable.id.includes("rate") || variable.id.includes("fee") || variable.id.includes("guarantee")) {
        const floor = variable.min + (variable.max - variable.min) * 0.35;
        if (currentVal >= variable.initialExporter * 0.95) {
          positionDiagnosis = `<span class="summary-delta-badge better">Postura Ambiciosa (Margen Alto)</span>`;
        } else if (currentVal >= floor) {
          positionDiagnosis = `<span class="summary-delta-badge neutral">En Zona de Posible Acuerdo (ZOPA)</span>`;
        } else {
          positionDiagnosis = `<span class="summary-delta-badge concession">Zona Crítica (Cerca del Límite de Costos)</span>`;
        }
      }
    }

    // 1. Cabecera de Contexto y Diagnóstico
    let contextHtml = `
      <div class="step-context-card">
        <div class="step-context-header">
          <h5><span>📌</span> Contexto & Diagnóstico de la Variable</h5>
          ${positionDiagnosis}
        </div>

        <div class="step-context-grid">
          <div class="context-metric-box">
            <div class="context-metric-label">Postura Actual del Comprador</div>
            <div class="context-metric-value buyer-val">
              ${variable.type === 'select' ? this.getSelectOptionLabel(variable, buyerVal) : `${buyerVal} ${variable.unit}`}
            </div>
          </div>

          <div class="context-metric-box">
            <div class="context-metric-label">Tu Meta Deseada</div>
            <div class="context-metric-value target-val">
              ${variable.type === 'select' ? this.getSelectOptionLabel(variable, variable.initialExporter) : `${variable.initialExporter} ${variable.unit}`}
            </div>
          </div>

          <div class="context-metric-box">
            <div class="context-metric-label">Límite de Reserva (Walkaway)</div>
            <div class="context-metric-value floor-val">
              ${dossier.walkawayPoint.split(".")[0]}
            </div>
          </div>
        </div>

        <div class="step-evaluation-desc">
          <strong>¿Qué estás evaluando aquí?</strong> ${variable.description}
          <div style="margin-top: 0.35rem; color: #94a3b8; font-size: 0.8rem;">
            <strong>Referencia de costos:</strong> ${dossier.costStructure}
          </div>
        </div>

        <!-- Insumo Harvard PON -->
        <div class="step-harvard-box">
          <div class="step-harvard-title">
            <span>📘</span> Insumo Harvard: ${harvardTip.chapter}
          </div>
          <div>${harvardTip.text}</div>
          <div style="margin-top: 0.35rem; font-size: 0.75rem; color: #93c5fd;">
            <strong>Preocupación clave:</strong> ${harvardTip.coreConcern}
          </div>
        </div>
      </div>
    `;

    // 2. Control Interactivo del Valor
    let controlHtml = "";
    if (variable.type === "numeric") {
      controlHtml = `
        <div class="step-interactive-area">
          <div class="step-value-display">
            <span class="step-big-number" id="wizard-val-display">${currentVal}</span>
            <span class="step-unit-label">${variable.unit}</span>
          </div>

          <div class="slider-fine-tune-row">
            <button class="btn-fine-tune" onclick="app.adjustDraftNumeric('${variable.id}', -${variable.step})" title="Reducir un paso">
              −
            </button>
            <input 
              type="range" 
              id="wizard-slider-${variable.id}" 
              class="var-slider" 
              min="${variable.min}" 
              max="${variable.max}" 
              step="${variable.step}" 
              value="${currentVal}" 
              style="flex: 1;"
              oninput="app.updateDraftNumeric('${variable.id}', this.value)"
            >
            <button class="btn-fine-tune" onclick="app.adjustDraftNumeric('${variable.id}', ${variable.step})" title="Aumentar un paso">
              +
            </button>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-dim); margin-top:0.15rem;">
            <span>Mínimo: ${variable.min} ${variable.unit}</span>
            <span>Máximo: ${variable.max} ${variable.unit}</span>
          </div>

          <!-- Accesos Rápidos de Exploración -->
          <div class="step-presets-grid">
            <button class="btn-preset" onclick="app.setStepPreset('${variable.id}', 'buyer')" title="Alinear a la oferta del comprador">
              Postura Comprador (${buyerVal})
            </button>
            <button class="btn-preset" onclick="app.setStepPreset('${variable.id}', 'mid')" title="Proponer punto medio en ZOPA">
              Punto Medio ZOPA (${Math.round((buyerVal + variable.initialExporter) / (2 * variable.step)) * variable.step})
            </button>
            <button class="btn-preset" onclick="app.setStepPreset('${variable.id}', 'target')" title="Mantener tu meta de partida">
              Tu Meta Deseada (${variable.initialExporter})
            </button>
          </div>
        </div>
      `;
    } else if (variable.type === "select") {
      const optionsHtml = variable.options.map(opt => {
        const isSelected = opt.value === currentVal;
        const buyerPreference = opt.value === buyerVal ? '<span style="font-size:0.68rem; color:#38bdf8; font-weight:700;">(Postura Comprador)</span>' : '';
        const exporterPreference = opt.value === variable.initialExporter ? '<span style="font-size:0.68rem; color:var(--accent-emerald); font-weight:700;">(Recomendada Exportador)</span>' : '';

        return `
          <div 
            class="option-tile ${isSelected ? 'selected' : ''}" 
            onclick="app.updateDraftSelect('${variable.id}', '${opt.value}')"
          >
            <input type="radio" name="wizard-opt-${variable.id}" class="option-radio" ${isSelected ? 'checked' : ''}>
            <div style="flex: 1;">
              <div class="option-title">
                ${opt.label} ${buyerPreference} ${exporterPreference}
              </div>
              <div class="option-desc">
                ${opt.scoreBonusExp >= 0.8 ? '✓ Máxima protección y retención para la empresa peruana.' : opt.scoreBonusExp >= 0.4 ? '⚖️ Término medio de cesión con salvaguardas legales.' : '⚠️ Cesión total con alto riesgo de pérdida de propiedad.'}
              </div>
            </div>
          </div>
        `;
      }).join("");

      controlHtml = `
        <div class="step-interactive-area">
          <div class="step-options-container">
            ${optionsHtml}
          </div>
        </div>
      `;
    }

    return contextHtml + controlHtml;
  }

  buildSummaryStepHtml(scenario) {
    const vars = scenario.negotiableVariables;
    const buyerCounter = this.activeEngine.currentBuyerCounterOffer || {};
    const round = this.activeEngine.currentRound;

    const rowsHtml = vars.map(v => {
      const buyerVal = buyerCounter[v.id] ?? v.initialBuyer;
      const proposedVal = this.currentDraftOffer[v.id] ?? v.initialExporter;

      let buyerDisplay = buyerVal;
      let proposedDisplay = proposedVal;
      let deltaBadge = "";

      if (v.type === "select") {
        buyerDisplay = this.getSelectOptionLabel(v, buyerVal);
        proposedDisplay = this.getSelectOptionLabel(v, proposedVal);
        if (buyerVal === proposedVal) {
          deltaBadge = `<span class="summary-delta-badge better">Consenso Pleno</span>`;
        } else {
          deltaBadge = `<span class="summary-delta-badge neutral">Diferencia Pendiente</span>`;
        }
      } else {
        buyerDisplay = `${buyerVal} ${v.unit}`;
        proposedDisplay = `${proposedVal} ${v.unit}`;

        if (proposedVal === buyerVal) {
          deltaBadge = `<span class="summary-delta-badge better">Iguala al Comprador</span>`;
        } else if (Math.abs(proposedVal - buyerVal) < Math.abs(v.initialExporter - buyerVal)) {
          deltaBadge = `<span class="summary-delta-badge concession">Acercamiento en ZOPA</span>`;
        } else {
          deltaBadge = `<span class="summary-delta-badge neutral">Postura Firme</span>`;
        }
      }

      return `
        <tr>
          <td><strong>${v.name}</strong></td>
          <td style="color: #38bdf8;">${buyerDisplay}</td>
          <td><strong style="color: #fff;">${proposedDisplay}</strong></td>
          <td>${deltaBadge}</td>
        </tr>
      `;
    }).join("");

    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.1rem;">
          <h4 style="font-size: 0.92rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>📋</span> Resumen de Propuesta Consolidada para la Ronda ${round}
          </h4>
          
          <div class="table-responsive">
            <table class="summary-offer-table">
              <thead>
                <tr>
                  <th>Variable Comercial</th>
                  <th>Última Oferta Comprador</th>
                  <th>Tu Nueva Propuesta</th>
                  <th>Estado en la Mesa</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>

          <p style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.4rem;">
            💡 Al confirmar y enviar, estos valores se transmitirán como tu postura formal para la evaluación del comprador en esta ronda.
          </p>
        </div>

        <!-- Argumentación Comercial con Sugerencias Harvard -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.1rem;">
          <label for="exporter-argument-input" style="display: block; font-size: 0.84rem; font-weight: 800; color: #fff; margin-bottom: 0.35rem;">
            Mensaje y Fundamentación Comercial al Comprador (Opcional):
          </label>
          <textarea 
            id="exporter-argument-input" 
            class="message-textarea" 
            rows="3" 
            placeholder="Escribe tus argumentos técnicos, justificación de valor o reciprocidad de concesiones..."
          ></textarea>

          <div style="margin-top: 0.65rem;">
            <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: 700;">
              Sugerencias de argumentación basadas en el Método Harvard PON:
            </span>
            <div class="quick-phrases-container">
              <button type="button" class="quick-phrase-pill" onclick="app.insertSuggestedPhrase('Ajustamos la tarifa con la condición de cerrar en 30 días de crédito y 15% de anticipo para garantizar el flujo de caja.')">
                💡 Vincular precio a pronto pago
              </button>
              <button type="button" class="quick-phrase-pill" onclick="app.insertSuggestedPhrase('Respaldamos nuestra cotización en los estándares de calidad del squad y las certificaciones internacionales del Perú Service Summit.')">
                💡 Criterio objetivo de calidad
              </button>
              <button type="button" class="quick-phrase-pill" onclick="app.insertSuggestedPhrase('Proponemos un punto medio en el periodo de garantía técnica para compartir el riesgo de forma equilibrada.')">
                💡 Punto medio en garantía
              </button>
            </div>
          </div>
        </div>

        <!-- Botón Central de Envío y Confirmación -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
          <button class="btn btn-secondary" onclick="app.goToWizardStep(0)">
            ← Revisar Variables desde el Inicio
          </button>
          <button id="btn-submit-offer" class="btn btn-primary" style="padding: 0.75rem 1.75rem; font-size: 0.95rem; font-weight: 800;" onclick="app.handleSendOffer()">
            📨 Confirmar y Enviar Propuesta a la Contraparte
          </button>
        </div>
      </div>
    `;
  }

  getSelectOptionLabel(variable, value) {
    if (!variable.options) return value;
    const opt = variable.options.find(o => o.value === value);
    return opt ? opt.label : value;
  }

  updateDraftNumeric(varId, value) {
    const num = Number(value);
    this.currentDraftOffer[varId] = num;
    const disp = document.getElementById("wizard-val-display");
    if (disp) disp.textContent = num;
  }

  adjustDraftNumeric(varId, delta) {
    const variable = this.selectedScenario.negotiableVariables.find(v => v.id === varId);
    if (!variable) return;
    const current = this.currentDraftOffer[varId] ?? variable.initialExporter;
    const updated = Math.min(variable.max, Math.max(variable.min, Math.round((current + delta) / variable.step) * variable.step));
    this.currentDraftOffer[varId] = updated;

    const slider = document.getElementById(`wizard-slider-${varId}`);
    if (slider) slider.value = updated;
    const disp = document.getElementById("wizard-val-display");
    if (disp) disp.textContent = updated;
  }

  setStepPreset(varId, presetType) {
    const variable = this.selectedScenario.negotiableVariables.find(v => v.id === varId);
    if (!variable) return;
    const buyerCounter = this.activeEngine.currentBuyerCounterOffer || {};
    const buyerVal = buyerCounter[varId] ?? variable.initialBuyer;

    let targetVal = variable.initialExporter;
    if (presetType === "buyer") {
      targetVal = buyerVal;
    } else if (presetType === "mid") {
      targetVal = Math.round((buyerVal + variable.initialExporter) / (2 * variable.step)) * variable.step;
      targetVal = Math.max(variable.min, Math.min(variable.max, targetVal));
    } else {
      targetVal = variable.initialExporter;
    }

    this.currentDraftOffer[varId] = targetVal;
    const slider = document.getElementById(`wizard-slider-${varId}`);
    if (slider) slider.value = targetVal;
    const disp = document.getElementById("wizard-val-display");
    if (disp) disp.textContent = targetVal;
  }

  updateDraftSelect(varId, value) {
    this.currentDraftOffer[varId] = value;
    this.renderStepWizard();
  }

  nextWizardStep() {
    const totalSteps = this.selectedScenario.negotiableVariables.length + 1;
    if (this.wizardStep < totalSteps - 1) {
      this.wizardStep++;
      this.renderStepWizard();
    }
  }

  prevWizardStep() {
    if (this.wizardStep > 0) {
      this.wizardStep--;
      this.renderStepWizard();
    }
  }

  goToWizardStep(stepIdx) {
    const totalSteps = this.selectedScenario.negotiableVariables.length + 1;
    if (stepIdx >= 0 && stepIdx < totalSteps) {
      this.wizardStep = stepIdx;
      this.renderStepWizard();
    }
  }

  insertSuggestedPhrase(phrase) {
    const textarea = document.getElementById("exporter-argument-input");
    if (!textarea) return;
    if (textarea.value.trim().length > 0) {
      textarea.value = textarea.value.trim() + " " + phrase;
    } else {
      textarea.value = phrase;
    }
    textarea.focus();
  }

  /* ==========================================================================
     ENVÍO Y PROCESAMIENTO DE PROPUESTAS
     ========================================================================== */
  handleSendOffer() {
    if (!this.activeEngine) return;

    // Validar completitud de variables
    const scenario = this.selectedScenario;
    const cleanOffer = {};
    for (const v of scenario.negotiableVariables) {
      if (this.currentDraftOffer[v.id] === undefined) {
        this.currentDraftOffer[v.id] = v.initialExporter;
      }
      cleanOffer[v.id] = this.currentDraftOffer[v.id];
    }

    const argumentInput = document.getElementById("exporter-argument-input");
    const argumentText = argumentInput ? argumentInput.value.trim() : "";

    // Notificación Toast de confirmación de envío
    const buyerName = scenario.buyerConfidentialProfile.buyerName;
    const currentRoundNum = this.activeEngine.currentRound;
    this.showToast("Propuesta Vinculante Enviada", `Se transmitió la propuesta de la Ronda ${currentRoundNum} a ${buyerName}. Analizando términos...`, "success");

    // Enviar oferta al motor determinista
    const result = this.activeEngine.submitExporterOffer(cleanOffer, argumentText);

    // Actualizar indicador de ronda
    document.getElementById("room-round-indicator").textContent = `${this.activeEngine.currentRound} / ${this.activeEngine.maxRounds}`;

    // Mostrar typing indicator momentáneo para realismo
    this.showBuyerTypingIndicator(buyerName, () => {
      this.renderChatMessages();

      // Si hay contraoferta y la simulación continúa
      if (result.counterOffer && this.activeEngine.status === "negotiating") {
        // Sincronizar el borrador del wizard para la siguiente ronda con la contraoferta del comprador
        scenario.negotiableVariables.forEach(v => {
          if (result.counterOffer[v.id] !== undefined) {
            this.currentDraftOffer[v.id] = result.counterOffer[v.id];
          }
        });
        // Volver al paso 1 para que el usuario evalúe paso a paso la nueva contraoferta
        this.wizardStep = 0;
        this.renderStepWizard();
      }

      // Si terminó la negociación
      if (this.activeEngine.status === "agreement_reached" || this.activeEngine.status === "deadlock") {
        setTimeout(() => {
          this.finishNegotiation();
        }, 1500);
      }
    });
  }

  showBuyerTypingIndicator(buyerName, callback) {
    const box = document.getElementById("chat-messages-box");
    if (!box) {
      callback();
      return;
    }

    const typingDiv = document.createElement("div");
    typingDiv.id = "buyer-live-typing";
    typingDiv.className = "typing-indicator-box";
    typingDiv.innerHTML = `
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
      <span>${buyerName} está analizando las cifras y preparando respuesta...</span>
    `;
    box.appendChild(typingDiv);
    box.scrollTop = box.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById("buyer-live-typing");
      if (el) el.remove();
      callback();
    }, 650);
  }

  /* ==========================================================================
     CONFIRMACIÓN DE ACCIONES CRÍTICAS (ACEPTAR / RETIRARSE)
     ========================================================================== */
  confirmAcceptCounterOffer() {
    if (!this.activeEngine) return;
    const modal = document.getElementById("modal-confirm-accept");
    const summaryBox = document.getElementById("accept-modal-summary");
    const counter = this.activeEngine.currentBuyerCounterOffer || {};
    
    const items = Object.entries(counter).map(([k, val]) => {
      const v = this.selectedScenario.negotiableVariables.find(x => x.id === k);
      if (!v) return "";
      const label = v.type === "select" ? this.getSelectOptionLabel(v, val) : `${val} ${v.unit}`;
      return `<div><strong>${v.name}:</strong> ${label}</div>`;
    }).join("");

    summaryBox.innerHTML = `
      <div style="font-weight:700; color:var(--accent-emerald); margin-bottom:0.35rem;">Términos a Aceptar:</div>
      ${items}
    `;

    modal.showModal();
  }

  executeAcceptCounterOffer() {
    const modal = document.getElementById("modal-confirm-accept");
    if (modal && modal.open) modal.close();

    this.activeEngine.acceptBuyerCounterOffer();
    this.renderChatMessages();
    this.showToast("Acuerdo Formal Aceptado", "Has aceptado la contraoferta del comprador. Cerrando mesa y generando evaluación...", "success");

    setTimeout(() => {
      this.finishNegotiation();
    }, 900);
  }

  confirmWalkaway() {
    if (!this.activeEngine) return;
    const modal = document.getElementById("modal-confirm-walkaway");
    document.getElementById("walkaway-user-reason").value = "";
    modal.showModal();
  }

  executeWalkaway() {
    const modal = document.getElementById("modal-confirm-walkaway");
    const reasonInput = document.getElementById("walkaway-user-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";
    if (modal && modal.open) modal.close();

    this.activeEngine.breakNegotiation(reason);
    this.renderChatMessages();
    this.showToast("Retirada Estratégica (MAAN)", "Has concluido la negociación sin acuerdo para proteger el piso de costos de la empresa.", "warning");

    setTimeout(() => {
      this.finishNegotiation();
    }, 900);
  }

  /* ==========================================================================
     CHAT LOG CON AVATARES VECTORIALES
     ========================================================================== */
  renderChatMessages() {
    const box = document.getElementById("chat-messages-box");
    if (!this.activeEngine) return;

    const exporter = this.getExporterInfo();
    const buyer = this.getBuyerInfo(this.selectedScenario);

    box.innerHTML = this.activeEngine.chatLog.map(msg => {
      const isExporter = msg.sender === "exporter";
      const senderClass = isExporter ? "msg-exporter" : "msg-buyer";
      const senderName = isExporter ? `${exporter.name} (Tú)` : buyer.name;
      const avatarSvg = isExporter ? exporter.svg : buyer.svg;

      // Resumen visual si adjunta oferta
      let offerBadge = "";
      if (msg.offer && (msg.isCounterOffer || isExporter || msg.isAgreement)) {
        const items = Object.entries(msg.offer).map(([k, val]) => {
          const variableDef = this.selectedScenario.negotiableVariables.find(v => v.id === k);
          if (!variableDef) return "";
          if (variableDef.type === "select") {
            const opt = variableDef.options.find(o => o.value === val);
            return `<div><strong>${variableDef.name}:</strong> ${opt ? opt.label : val}</div>`;
          }
          return `<div><strong>${variableDef.name}:</strong> ${val} ${variableDef.unit}</div>`;
        }).join("");

        const badgeTitle = msg.isAgreement 
          ? "🤝 Términos del Acuerdo Vinculante" 
          : isExporter 
            ? `📨 Propuesta Enviada (Ronda ${msg.round})` 
            : `📬 Contraoferta del Comprador (Ronda ${msg.round})`;

        offerBadge = `
          <div class="msg-offer-summary-badge">
            <div style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.3rem;">${badgeTitle}:</div>
            ${items}
          </div>
        `;
      }

      return `
        <div class="msg-row-with-avatar ${isExporter ? 'exporter-row' : ''}">
          <div class="avatar-wrapper avatar-mini">
            ${avatarSvg}
          </div>
          <div class="message-bubble ${senderClass}">
            <div class="msg-meta">
              <span><strong>${senderName}</strong></span>
              <span>•</span>
              <span>${msg.timestamp}</span>
              <span>•</span>
              <span>Ronda ${msg.round}</span>
            </div>
            <div class="msg-content">
              ${msg.text}
              ${offerBadge}
            </div>
          </div>
        </div>
      `;
    }).join("");

    box.scrollTop = box.scrollHeight;
  }

  /* ==========================================================================
     INFORME DE EVALUACIÓN FINAL
     ========================================================================== */
  finishNegotiation() {
    if (!this.activeEngine || !this.selectedScenario) return;

    const evaluation = NegotiationEvaluator.evaluateSession(this.selectedScenario, this.activeEngine);

    const sessionRecord = {
      id: "ses-" + Date.now(),
      date: new Date().toLocaleDateString("es-PE"),
      scenarioId: this.selectedScenario.id,
      scenarioTitle: this.selectedScenario.title,
      buyerCountry: this.selectedScenario.buyerCountry,
      mode: this.activeMode,
      status: this.activeEngine.status,
      roundsCount: this.activeEngine.currentRound,
      score: evaluation.totalScore,
      breakdown: evaluation.scoresBreakdown,
      evaluation: evaluation
    };

    this.sessionsHistory.push(sessionRecord);

    // Actualizar métricas globales
    this.userStats.totalSessions = this.sessionsHistory.length;
    if (this.activeEngine.status === "agreement_reached") {
      this.userStats.dealsClosed++;
    } else if (this.activeEngine.status === "rejected") {
      this.userStats.walkaways++;
    }

    const scoresSum = this.sessionsHistory.reduce((acc, curr) => acc + (curr.score || 0), 0);
    this.userStats.avgScore = scoresSum / this.sessionsHistory.length;

    this.savePersistence();
    this.renderReport(evaluation);

    document.getElementById("nav-btn-report").style.display = "flex";
    this.navigateTo("report");
  }

  renderReport(evalData) {
    document.getElementById("report-scenario-title").textContent = evalData.scenarioMeta.title;
    document.getElementById("report-outcome-status").textContent = `Resultado: ${evalData.statusLabel}`;
    document.getElementById("report-total-score").textContent = evalData.totalScore;

    const scoreCircle = document.getElementById("report-score-circle");
    scoreCircle.style.setProperty("--score-pct", evalData.totalScore);

    const tierBadge = document.getElementById("report-tier-badge");
    tierBadge.textContent = evalData.performanceTier;
    tierBadge.className = `difficulty-badge ${evalData.badgeClass}`;

    document.getElementById("report-rounds-summary").textContent = `Rondas utilizadas: ${evalData.roundsCount} de 5`;

    // Desglose de Competencias (6 Criterios)
    const critContainer = document.getElementById("criteria-grid-container");
    const b = evalData.scoresBreakdown;
    const criteriaList = [
      { name: "Rentabilidad Económica", score: b.economic.score, max: b.economic.maxScore, fb: b.economic.feedback },
      { name: "Condiciones de Pago y Flujo de Caja", score: b.payment.score, max: b.payment.maxScore, fb: b.payment.feedback },
      { name: "Plazos, Garantías y Riesgo Operacional", score: b.operational.score, max: b.operational.maxScore, fb: b.operational.feedback },
      { name: "Propiedad Intelectual y Activos Críticos", score: b.strategic.score, max: b.strategic.maxScore, fb: b.strategic.feedback },
      { name: "Táctica y Ritmo de Concesiones", score: b.concessions.score, max: b.concessions.maxScore, fb: b.concessions.feedback },
      { name: "Manejo de Rondas y Cierre Colaborativo", score: b.process.score, max: b.process.maxScore, fb: b.process.feedback }
    ];

    critContainer.innerHTML = criteriaList.map(c => {
      const pct = Math.round((c.score / c.max) * 100);
      return `
        <div class="criterion-card">
          <div class="crit-header">
            <span class="crit-name">${c.name}</span>
            <span class="crit-score">${c.score} <small style="color:var(--text-dim);">/ ${c.max} pts</small></span>
          </div>
          <div class="crit-bar-track">
            <div class="crit-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <p class="crit-feedback">${c.fb}</p>
        </div>
      `;
    }).join("");

    // Tabla de Evolución de Concesiones
    const tbody = document.getElementById("concessions-tbody");
    tbody.innerHTML = (evalData.concessionsSummary || []).map(row => {
      const varName = row.variableName || row.variable || "Variable";
      const expInit = row.expInitial || row.exporterInitial || "-";
      const expFin = row.expFinal || row.exporterFinal || "-";
      const expConc = row.expConcession || row.exporterConcession || "Sin cambios";
      const buyerInit = row.buyerInitial || "-";
      const buyerFin = row.buyerFinal || "-";
      const buyerConc = row.buyerConcession || "Sin cambios";

      return `
        <tr>
          <td><strong>${varName}</strong></td>
          <td>${expInit}</td>
          <td class="table-highlight-exporter">${expFin}</td>
          <td><span class="concession-val">${expConc}</span></td>
          <td>${buyerInit}</td>
          <td class="table-highlight-buyer">${buyerFin}</td>
          <td><span class="concession-val">${buyerConc}</span></td>
        </tr>
      `;
    }).join("");

    // Fortalezas y Mejoras
    document.getElementById("report-strengths-list").innerHTML = evalData.strengths.map(s => `<li>${s}</li>`).join("");
    document.getElementById("report-improvements-list").innerHTML = evalData.improvements.map(i => `<li>${i}</li>`).join("");
    document.getElementById("report-recommendations-list").innerHTML = evalData.recommendations.map(r => `<li>${r}</li>`).join("");

    // Referencias Legales
    const src = evalData.scenarioMeta.source;
    document.getElementById("report-legal-ref-box").innerHTML = `
      <strong>Marco Legal y Fuente Documentada:</strong> ${src.institution} - ${src.reference}<br>
      <a href="${src.url}" target="_blank" rel="noopener noreferrer">↗ Consultar documento oficial de respaldo</a>
    `;
  }

  loadHistoricalReport(sessionId) {
    const session = this.sessionsHistory.find(s => s.id === sessionId);
    if (!session || !session.evaluation) return;
    this.renderReport(session.evaluation);
    document.getElementById("nav-btn-report").style.display = "flex";
    this.navigateTo("report");
  }

  retryCurrentScenario() {
    if (this.selectedScenario) {
      this.startNegotiation(this.selectedScenario, this.activeMode);
    }
  }

  /* ==========================================================================
     VISTA: BIBLIOTECA DE FUENTES
     ========================================================================== */
  renderSources() {
    const container = document.getElementById("sources-grid-container");
    if (!container || typeof NEGOTIATION_SOURCES === "undefined") return;

    container.innerHTML = NEGOTIATION_SOURCES.map(src => {
      const isHarvard = src.id.includes("HARVARD");
      const badgeStyle = isHarvard 
        ? "background: rgba(37, 99, 235, 0.2); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.4);" 
        : "";

      return `
        <div class="source-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span class="source-id-badge" style="${badgeStyle}">${src.id}</span>
            <span style="font-size:0.75rem; color:var(--text-dim);">${src.year}</span>
          </div>
          <h3 class="source-title">${src.title}</h3>
          <div class="source-institution">🏛️ ${src.institution}</div>
          <p class="source-summary">${src.summary}</p>
          <div style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0.75rem; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: var(--radius-sm);">
            <strong>Relevancia en el simulador:</strong> ${src.relevance}
          </div>
          <div class="source-meta-row">
            <span><strong>Licencia / Acceso:</strong> ${src.accessType}</span>
            <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-link">
              ↗ Ver Documento
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  /* ==========================================================================
     VISTA: METODOLOGÍA HARVARD PON (UNDERSTANDING OTHERS 2022)
     ========================================================================== */
  renderHarvardSection() {
    const container = document.getElementById("harvard-chapters-container");
    if (!container || typeof HARVARD_GUIDE_DATA === "undefined") return;

    container.innerHTML = HARVARD_GUIDE_DATA.chapters.map(ch => {
      const principlesHtml = ch.keyPrinciples.map(p => `
        <div class="principle-item">
          <div class="principle-name">${p.name}</div>
          <div class="principle-desc">${p.desc.replace(/\n/g, '<br>')}</div>
        </div>
      `).join("");

      return `
        <div class="harvard-chapter-card">
          <div class="chapter-badge" style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.4);">
            <span>${ch.icon}</span> Capítulo ${ch.number}
          </div>
          <div>
            <h4 class="chapter-title">${ch.title}</h4>
            <span class="chapter-framework">${ch.framework}</span>
          </div>
          <p style="font-size: 0.86rem; color: #cbd5e1; line-height: 1.5;">${ch.summary}</p>
          <div class="chapter-principles-list">
            ${principlesHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  openHarvardQuickModal() {
    const modal = document.getElementById("modal-harvard-guide");
    const container = document.getElementById("quick-harvard-content");
    if (!modal || !container || typeof HARVARD_GUIDE_DATA === "undefined") return;

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem; background: rgba(37, 99, 235, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: var(--radius-md); padding: 1rem;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: #fff; margin-bottom: 0.35rem;">
          Guía de Negociación: Understanding Others through Negotiation (Harvard INP 2022)
        </h4>
        <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0;">
          Utiliza estos 5 marcos para fundamentar tus contrapropuestas en la mesa, mitigar objeciones y evitar acuerdos desfavorables.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${HARVARD_GUIDE_DATA.chapters.map(ch => `
          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #38bdf8; text-transform: uppercase;">
              Capítulo ${ch.number}: ${ch.framework}
            </div>
            <h5 style="font-size: 0.92rem; font-weight: 800; color: #fff; margin: 0.25rem 0 0.5rem 0;">
              ${ch.title}
            </h5>
            <p style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 0.75rem;">
              ${ch.summary}
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              ${ch.keyPrinciples.map(p => `
                <div style="background: rgba(0,0,0,0.25); padding: 0.5rem 0.65rem; border-radius: var(--radius-sm); font-size: 0.78rem;">
                  <strong style="color: #f1f5f9;">${p.name}:</strong> 
                  <span style="color: #94a3b8;">${p.desc.split(".")[0]}.</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    modal.showModal();
  }

  toggleDossierModal() {
    const modal = document.getElementById("dossier-quick-modal");
    if (!modal) return;
    if (modal.open) {
      modal.close();
    } else {
      const d = this.selectedScenario.exporterInitialDossier;
      document.getElementById("quick-dossier-content").innerHTML = `
        <p><strong>Empresa:</strong> ${d.companyName}</p>
        <p><strong>Costo Directo Base:</strong> ${d.costStructure}</p>
        <p><strong>Meta Deseada:</strong> <span style="color:var(--accent-emerald); font-weight:bold;">${d.targetPrice}</span></p>
        <p><strong>Punto de Reserva (Límite Mínimo Aceptable):</strong> <span style="color:#f87171; font-weight:bold;">${d.walkawayPoint}</span></p>
        <p><strong>Mejor Alternativa (MAAN / BATNA):</strong> ${d.batnaDescription}</p>
        <div style="margin-top:1rem; border-top:1px solid var(--border-color); padding-top:0.75rem;">
          <strong>Puntos Críticos de Protección:</strong>
          <ul style="padding-left:1.25rem; margin-top:0.35rem;">
            ${d.criticalNeeds.map(n => `<li>${n}</li>`).join("")}
          </ul>
        </div>
      `;
      modal.showModal();
    }
  }

  /* ==========================================================================
     SISTEMA DE NOTIFICACIONES TOAST (VALIDACIÓN DE GUARDADO Y ENVÍO)
     ========================================================================== */
  showToast(title, message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-message toast-${type}`;

    let icon = "✓";
    if (type === "info") icon = "ℹ️";
    else if (type === "warning") icon = "⚠️";
    else if (type === "error") icon = "✕";

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div style="flex: 1;">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3600);
  }

  /* ==========================================================================
     CONMUTADOR DE TEMA (CLARO / OSCURO - DÍA / NOCHE)
     ========================================================================== */
  toggleTheme() {
    this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(this.currentTheme);
    try {
      localStorage.setItem("peru_export_theme", this.currentTheme);
    } catch (e) {
      console.warn("No se pudo guardar la preferencia de tema en localStorage:", e);
    }
    const themeName = this.currentTheme === "light" ? "Modo Día (Claro)" : "Modo Noche (Oscuro)";
    this.showToast("Tema actualizado", `Se ha activado el ${themeName}.`, "info");
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");
    const themeLabel = document.getElementById("theme-label");

    if (theme === "light") {
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "inline";
      if (themeLabel) themeLabel.textContent = "Modo Noche";
    } else {
      if (sunIcon) sunIcon.style.display = "inline";
      if (moonIcon) moonIcon.style.display = "none";
      if (themeLabel) themeLabel.textContent = "Modo Día";
    }
  }
}

// Inicialización global
let app = null;
document.addEventListener("DOMContentLoaded", () => {
  app = new SimulatorApp();
});
