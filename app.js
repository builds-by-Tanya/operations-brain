// ─── OPERATIONS BRAIN — MAIN APPLICATION ─────────────────────────────────────
// Industrial Knowledge Intelligence Platform
// Gemini AI powered · Real-time · 5 modules
// ──────────────────────────────────────────────────────────────────────────────

'use strict';

// ── CONFIG ───────────────────────────────────────────────────────────────────
const CONFIG = {
  GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE', // 🔑 Add your Gemini API key here — get one free at https://aistudio.google.com/apikey

  GEMINI_MODEL: 'gemini-2.0-flash',
  get GEMINI_URL() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.GEMINI_MODEL}:generateContent?key=${this.GEMINI_API_KEY}`;
  }
};

// ── STATE ────────────────────────────────────────────────────────────────────
const State = {
  currentModule: 'dashboard',
  chatHistory: [],
  uploadedDocs: [],
  processingStage: -1,
  rcaStep: 0,
  chartInstances: {}
};

// ── ROUTER ───────────────────────────────────────────────────────────────────
function navigate(moduleId) {
  State.currentModule = moduleId;
  // Update sidebar nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.module === moduleId));
  // Update breadcrumb
  const labels = { dashboard: 'Dashboard', ingestion: 'Document Ingestion', copilot: 'Expert Copilot', maintenance: 'Maintenance Intelligence', compliance: 'Compliance & Quality', lessons: 'Lessons Learned' };
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = labels[moduleId] || moduleId;
  // Render module
  const content = document.getElementById('main-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(10px)';
  setTimeout(() => {
    renderModule(moduleId);
    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 150);
}

function renderModule(id) {
  const content = document.getElementById('main-content');
  // Destroy previous chart instances
  Object.values(State.chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  State.chartInstances = {};
  switch(id) {
    case 'dashboard':   content.innerHTML = renderDashboard();   initDashboard();   break;
    case 'ingestion':   content.innerHTML = renderIngestion();   initIngestion();   break;
    case 'copilot':     content.innerHTML = renderCopilot();     initCopilot();     break;
    case 'maintenance': content.innerHTML = renderMaintenance(); initMaintenance(); break;
    case 'compliance':  content.innerHTML = renderCompliance();  initCompliance();  break;
    case 'lessons':     content.innerHTML = renderLessons();     initLessons();     break;
  }
}

// ── DASHBOARD MODULE ─────────────────────────────────────────────────────────
function renderDashboard() {
  const eq = EQUIPMENT_DATA.registry;
  const criticalAlarms = eq.flatMap(e => e.alarms).filter(a => a.severity === 'critical').length;
  const overdueWOs = EQUIPMENT_DATA.workOrders.filter(w => w.pmStatus === 'overdue' || w.status === 'overdue').length;

  return `
  <div class="ticker-wrap">
    <div class="ticker-content" id="ticker">
      <span class="ticker-item">🟢 <strong>P-205A</strong> Running · Vibration: 3.8 mm/s</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">⚠️ <strong>HE-402</strong> Heat Duty -14% — Cleaning Scheduled</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">🔴 <strong>PSV-203</strong> Inspection Overdue · Action Required</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">📄 <strong>1,723</strong> Documents Indexed · <strong>4,219</strong> Knowledge Nodes</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">🟢 <strong>P-205A</strong> Running · Vibration: 3.8 mm/s</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">⚠️ <strong>HE-402</strong> Heat Duty -14% — Cleaning Scheduled</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">🔴 <strong>PSV-203</strong> Inspection Overdue · Action Required</span>
      <span class="ticker-sep">·</span>
      <span class="ticker-item">📄 <strong>1,723</strong> Documents Indexed · <strong>4,219</strong> Knowledge Nodes</span>
    </div>
  </div>

  <div class="module-header mt-16">
    <div class="module-title">Operations Intelligence Hub</div>
    <div class="module-sub">Bharat Petroleum Refinery · Jamnagar Unit II · 8 MMTPA · Live as of ${new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'})}</div>
  </div>

  <div class="metrics-grid">
    <div class="metric-card teal">
      <div class="metric-icon">📚</div>
      <div class="metric-value" id="m-docs">1,723</div>
      <div class="metric-label">Documents Indexed</div>
      <div class="metric-trend up">↑ 94 new this month</div>
    </div>
    <div class="metric-card amber">
      <div class="metric-icon">🔗</div>
      <div class="metric-value" id="m-nodes">4,219</div>
      <div class="metric-label">Knowledge Graph Nodes</div>
      <div class="metric-trend up">↑ 11,847 edges</div>
    </div>
    <div class="metric-card ${criticalAlarms > 0 ? 'red' : 'green'}">
      <div class="metric-icon">${criticalAlarms > 0 ? '🚨' : '✅'}</div>
      <div class="metric-value">${criticalAlarms}</div>
      <div class="metric-label">Critical Alarms Active</div>
      <div class="metric-trend ${criticalAlarms > 0 ? 'down' : 'up'}">${criticalAlarms > 0 ? '⚠ Requires Attention' : 'All Systems Normal'}</div>
    </div>
    <div class="metric-card green">
      <div class="metric-icon">🛡️</div>
      <div class="metric-value">92.4%</div>
      <div class="metric-label">Regulatory Compliance</div>
      <div class="metric-trend warn">${COMPLIANCE_DATA.criticalGaps} critical gaps open</div>
    </div>
  </div>

  <div class="grid-3-1 mb-16">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">🕸️</span>Knowledge Graph Preview</div>
        <span class="card-action" onclick="navigate('ingestion')">Full View →</span>
      </div>
      <div class="kg-container" id="kg-mini" style="height:260px;border-radius:8px;"></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">⚡</span>Live Activity</div>
      </div>
      <div class="activity-feed">
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(0,212,255,0.1)">📄</div>
          <div class="activity-text"><strong>SOP-OPS-2023-112</strong> re-indexed after revision update</div>
          <div class="activity-time">3m ago</div>
        </div>
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(255,183,0,0.1)">⚠️</div>
          <div class="activity-text"><strong>HE-402</strong> heat duty alert triggered — WO-2024-1047 auto-created</div>
          <div class="activity-time">47m ago</div>
        </div>
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(168,85,247,0.1)">🤖</div>
          <div class="activity-text">AI Copilot answered 14 queries — avg confidence 91.4%</div>
          <div class="activity-time">1h ago</div>
        </div>
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(255,77,106,0.1)">🔴</div>
          <div class="activity-text"><strong>PSV-203</strong> inspection overdue — compliance alert raised</div>
          <div class="activity-time">4h ago</div>
        </div>
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(0,232,138,0.1)">✅</div>
          <div class="activity-text">Quarterly audit package auto-generated for OISD-105</div>
          <div class="activity-time">Yesterday</div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid-3">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">🔧</span>Work Order Status</div>
        <span class="card-action" onclick="navigate('maintenance')">View All</span>
      </div>
      ${['open','in-progress','scheduled','completed'].map(s => {
        const count = EQUIPMENT_DATA.workOrders.filter(w => w.status === s).length;
        const total = EQUIPMENT_DATA.workOrders.length;
        const colors = { open:'var(--red)', 'in-progress':'var(--amber)', scheduled:'var(--teal)', completed:'var(--green)' };
        return `<div class="stat-counter mb-16" style="margin-bottom:10px">
          <span style="width:80px;color:var(--text-2);text-transform:capitalize">${s}</span>
          <div class="stat-bar"><div class="stat-bar-fill" style="width:${(count/total*100).toFixed(0)}%;background:${colors[s]}"></div></div>
          <span style="font-weight:700;color:${colors[s]};font-family:var(--mono);width:20px;text-align:right">${count}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">📊</span>Fleet Health Trend</div>
      </div>
      <canvas id="health-chart" height="120"></canvas>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">🛡️</span>Compliance by Framework</div>
        <span class="card-action" onclick="navigate('compliance')">Details</span>
      </div>
      ${COMPLIANCE_DATA.frameworks.map(f => `
        <div style="margin-bottom:10px">
          <div class="flex items-center justify-between" style="margin-bottom:4px">
            <span style="font-size:11px;color:var(--text-2);font-weight:600">${f.id}</span>
            <span style="font-size:12px;font-weight:700;font-family:var(--mono);color:${f.score>=95?'var(--green)':f.score>=85?'var(--amber)':'var(--red)'}">${f.score}%</span>
          </div>
          <div class="cf-progress-bar"><div class="cf-progress-fill" style="width:${f.score}%;background:${f.color}"></div></div>
        </div>`).join('')}
    </div>
  </div>

  <div class="grid-2 mt-16">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">⚡</span>Equipment Risk Matrix</div>
      </div>
      <canvas id="risk-chart" height="160"></canvas>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title"><span class="card-icon">💡</span>AI-Powered Insights</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="pattern-alert">
          <div class="pattern-alert-icon">🔮</div>
          <div class="pattern-alert-body">
            <div class="pattern-alert-title">Predictive Alert: P-205A</div>
            <div class="pattern-alert-desc">Vibration pattern matches pre-failure profile from INC-2024-007. Based on 3 historical seal failures, <strong>78% probability of failure within 45 days</strong> without intervention.</div>
            <div class="pattern-alert-action" onclick="navigate('maintenance')">→ View Maintenance Intelligence</div>
          </div>
        </div>
        <div class="pattern-alert critical">
          <div class="pattern-alert-icon">⚠️</div>
          <div class="pattern-alert-body">
            <div class="pattern-alert-title">Compliance Risk: PSV-203 Inspection</div>
            <div class="pattern-alert-desc">OISD-105 clause 6.1.2 inspection 10 days overdue. Historical pattern shows OISD follow-up within 30 days of overdue — regulatory action risk elevated.</div>
            <div class="pattern-alert-action" onclick="navigate('compliance')">→ View Compliance Module</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function initDashboard() {
  // Mini knowledge graph
  setTimeout(() => {
    if (window.KnowledgeGraph) KnowledgeGraph.render('kg-mini', { mini: true });
  }, 200);

  // Health trend chart
  const hCtx = document.getElementById('health-chart');
  if (hCtx && window.Chart) {
    const trend = EQUIPMENT_DATA.healthTrend;
    State.chartInstances['health'] = new Chart(hCtx, {
      type: 'line',
      data: {
        labels: trend.map(t => t.month),
        datasets: [{
          data: trend.map(t => t.avgHealth),
          borderColor: '#00D4FF', backgroundColor: 'rgba(0,212,255,0.08)',
          borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#00D4FF',
          fill: true, tension: 0.4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7B93B0', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7B93B0', font: { size: 11 } }, min: 70, max: 100 }
      }}
    });
  }

  // Risk chart
  const rCtx = document.getElementById('risk-chart');
  if (rCtx && window.Chart) {
    const eq = EQUIPMENT_DATA.registry;
    State.chartInstances['risk'] = new Chart(rCtx, {
      type: 'bar',
      data: {
        labels: eq.map(e => e.tag),
        datasets: [{
          label: 'Health Score',
          data: eq.map(e => e.health),
          backgroundColor: eq.map(e => e.health >= 85 ? 'rgba(0,232,138,0.6)' : e.health >= 70 ? 'rgba(255,183,0,0.6)' : 'rgba(255,77,106,0.6)'),
          borderRadius: 4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: {
        x: { grid: { display: false }, ticks: { color: '#7B93B0', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7B93B0', font: { size: 10 } }, min: 0, max: 100 }
      }}
    });
  }

  // Animate metric counters
  animateCounter('m-docs', 0, 1723, 1200);
  animateCounter('m-nodes', 0, 4219, 1500);
}

// ── DOCUMENT INGESTION MODULE ─────────────────────────────────────────────────
function renderIngestion() {
  const docs = DOCUMENT_CORPUS.documents;
  return `
  <div class="module-header">
    <div class="module-title">📄 Universal Document Ingestion</div>
    <div class="module-sub">AI pipeline: OCR → Entity Extraction → Knowledge Graph Linking → RAG Indexing</div>
  </div>

  <div class="grid-2-1 mb-16">
    <div>
      <div class="upload-zone" id="upload-zone" onclick="document.getElementById('file-input').click()" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="handleDrop(event)">
        <div class="upload-icon">📦</div>
        <div class="upload-title">Drop Documents Here</div>
        <div class="upload-sub">PDFs, P&IDs, Spreadsheets, Scanned Forms, Email Archives</div>
        <div class="upload-formats">
          ${['PDF','XLSX','DWG','TIFF','MSG','CSV','DOCX'].map(f => `<span class="tag teal">${f}</span>`).join('')}
        </div>
        <input type="file" id="file-input" multiple accept=".pdf,.xlsx,.csv,.docx,.png,.jpg" style="display:none" onchange="handleFileUpload(this.files)">
      </div>

      <div class="card mt-16" id="pipeline-card" style="display:none">
        <div class="card-title" style="margin-bottom:14px">⚙️ Processing Pipeline</div>
        <div class="pipeline-stages" id="pipeline-stages"></div>
        <div style="margin-top:14px;font-size:12px;color:var(--text-2)" id="pipeline-status-text">Initialising…</div>
        <div style="height:6px;background:var(--bg-3);border-radius:3px;margin-top:10px;overflow:hidden">
          <div id="pipeline-progress" style="height:100%;width:0%;background:linear-gradient(90deg,var(--teal),#0080FF);border-radius:3px;transition:width 0.5s ease"></div>
        </div>
      </div>

      <div class="card mt-16" id="entity-card" style="display:none">
        <div class="card-header">
          <div class="card-title">🏷️ Extracted Entities</div>
          <span class="tag green">AI Extracted</span>
        </div>
        <div id="entity-results"></div>
      </div>
    </div>

    <div class="card" style="display:flex;flex-direction:column;gap:12px;">
      <div class="card-header" style="margin-bottom:4px">
        <div class="card-title">📚 Document Corpus</div>
        <span style="font-size:11px;color:var(--text-3)">${docs.length} of 1,847</span>
      </div>
      <div class="search-bar" style="margin-bottom:4px">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search documents, tags, equipment…" oninput="filterDocs(this.value)" id="doc-search">
      </div>
      <div class="doc-library" id="doc-library" style="max-height:calc(100vh - 280px);overflow-y:auto">
        ${docs.map(renderDocItem).join('')}
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">🕸️ Knowledge Graph — Full View</div>
      <div style="display:flex;gap:8px">
        ${['All','Equipment','Document','Regulation','Incident'].map(t => 
          `<button class="btn btn-ghost btn-sm kg-filter-btn" data-filter="${t.toLowerCase()}" onclick="filterKG(this)">${t}</button>`
        ).join('')}
      </div>
    </div>
    <div class="kg-container" id="kg-full" style="height:450px;border-radius:8px"></div>
  </div>
  <div id="kg-tooltip"></div>`;
}

function renderDocItem(doc) {
  const typeEmoji = { engineering_drawing:'📐', maintenance_procedure:'🔧', regulatory:'🛡️', inspection_report:'🔍', work_order:'📋', incident_report:'⚠️', safety_study:'⚡', oem_manual:'📖', operating_procedure:'▶️', msds:'☢️', maintenance_schedule:'📅' };
  const typeColor = { engineering_drawing:'teal', maintenance_procedure:'teal', regulatory:'purple', inspection_report:'teal', work_order:'amber', incident_report:'red', safety_study:'amber', oem_manual:'teal', operating_procedure:'green', msds:'red', maintenance_schedule:'teal' };
  const color = typeColor[doc.type] || 'grey';
  const bg = { teal:'rgba(0,212,255,0.1)', amber:'rgba(255,183,0,0.1)', red:'rgba(255,77,106,0.1)', purple:'rgba(168,85,247,0.1)', green:'rgba(0,232,138,0.1)', grey:'rgba(255,255,255,0.05)' };
  return `
  <div class="doc-item" onclick="showDocDetail('${doc.id}')">
    <div class="doc-type-icon" style="background:${bg[color]}">${typeEmoji[doc.type]||'📄'}</div>
    <div class="doc-info">
      <div class="doc-title">${doc.title}</div>
      <div class="doc-meta">${doc.department} · ${doc.size} · ${doc.uploaded}</div>
      <div class="doc-tags">
        ${doc.tags.slice(0,3).map(t => `<span class="tag ${color}">${t}</span>`).join('')}
      </div>
    </div>
    <div class="doc-confidence">
      <span style="color:${doc.confidence>=95?'var(--green)':doc.confidence>=85?'var(--amber)':'var(--text-3)'}">${doc.confidence}%</span>
    </div>
  </div>`;
}

function initIngestion() {
  setTimeout(() => {
    if (window.KnowledgeGraph) KnowledgeGraph.render('kg-full', {});
  }, 200);
}

function filterDocs(query) {
  const q = query.toLowerCase();
  const lib = document.getElementById('doc-library');
  if (!lib) return;
  lib.innerHTML = DOCUMENT_CORPUS.documents
    .filter(d => !q || d.title.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)) || d.department.toLowerCase().includes(q) || d.entities.equipment.some(e => e.toLowerCase().includes(q)))
    .map(renderDocItem).join('');
}

function filterKG(btn) {
  document.querySelectorAll('.kg-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  if (window.KnowledgeGraph) KnowledgeGraph.render('kg-full', { filterType: f === 'all' ? null : f });
}

function showDocDetail(docId) {
  const doc = DOCUMENT_CORPUS.documents.find(d => d.id === docId);
  if (!doc) return;
  showToast(`📄 ${doc.title} — ${doc.pages} pages · ${doc.confidence}% confidence`, 'info');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('drag-over');
  handleFileUpload(e.dataTransfer.files);
}

function handleFileUpload(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  const card = document.getElementById('pipeline-card');
  const entityCard = document.getElementById('entity-card');
  if (!card) return;
  card.style.display = 'block';
  entityCard.style.display = 'none';
  simulateProcessing(file.name);
}

function simulateProcessing(filename) {
  const stages = [
    { icon: '📷', label: 'OCR & Parse', step: 'Extracting text from document…' },
    { icon: '🤖', label: 'Entity Extract', step: 'Identifying equipment tags, parameters, references…' },
    { icon: '🕸️', label: 'Graph Link', step: 'Building knowledge graph connections…' },
    { icon: '🔍', label: 'RAG Index', step: 'Creating vector embeddings for semantic search…' },
    { icon: '✅', label: 'Complete', step: 'Document successfully ingested!' }
  ];

  const stagesEl = document.getElementById('pipeline-stages');
  const statusEl = document.getElementById('pipeline-status-text');
  const progressEl = document.getElementById('pipeline-progress');

  let current = 0;
  const durations = [1200, 1800, 1500, 1200, 600];
  const totalTime = durations.reduce((a,b) => a + b, 0);

  function render() {
    stagesEl.innerHTML = stages.map((s, i) => `
      <div class="pipeline-stage ${i < current ? 'done' : i === current ? 'active' : ''}">
        <div class="pipeline-stage-inner">
          <div class="pipeline-stage-icon">${i < current ? '✅' : s.icon}</div>
          <div class="pipeline-stage-label">${s.label}</div>
          <div class="pipeline-stage-status">${i < current ? 'Done' : i === current ? '...' : 'Waiting'}</div>
        </div>
      </div>
      ${i < stages.length - 1 ? '<div class="pipeline-connector ' + (i < current ? '' : i === current ? 'active' : '') + '"></div>' : ''}
    `).join('');

    const elapsed = durations.slice(0, current).reduce((a,b) => a + b, 0);
    const pct = ((elapsed / totalTime) * 100).toFixed(0);
    if (progressEl) progressEl.style.width = pct + '%';
    if (statusEl) statusEl.textContent = current < stages.length ? `Processing "${filename}" — ${stages[current].step}` : '';
  }

  render();

  const advance = () => {
    if (current < stages.length) {
      setTimeout(() => {
        current++;
        if (progressEl) progressEl.style.width = ((durations.slice(0, current).reduce((a,b)=>a+b,0) / totalTime) * 100) + '%';
        render();
        if (current < stages.length) advance();
        else {
          if (statusEl) statusEl.textContent = `✅ "${filename}" indexed — 47 entities extracted · 23 knowledge graph nodes created`;
          if (progressEl) progressEl.style.width = '100%';
          showEntityExtraction();
          showToast(`✅ Document indexed successfully!`, 'success');
        }
      }, durations[current]);
    }
  };
  advance();
}

function showEntityExtraction() {
  const card = document.getElementById('entity-card');
  if (!card) return;
  card.style.display = 'block';
  const demoDoc = DOCUMENT_CORPUS.documents[0];
  const el = document.getElementById('entity-results');
  if (!el) return;

  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px">
      ${[
        { label: 'Equipment Tags', chips: demoDoc.entities.equipment, type: 'equipment', icon: '⚙️' },
        { label: 'Process Parameters', chips: demoDoc.entities.parameters, type: 'parameter', icon: '📊' },
        { label: 'Regulatory References', chips: demoDoc.entities.references, type: 'reference', icon: '🛡️' },
        { label: 'Personnel', chips: demoDoc.entities.personnel, type: 'personnel', icon: '👤' }
      ].map(group => `
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:7px">${group.icon} ${group.label} <span style="color:var(--text-4)">(${group.chips.length})</span></div>
          <div class="entity-grid">
            ${group.chips.map(c => `<span class="entity-chip ${group.type}">${c}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>`;
}

// ── EXPERT COPILOT MODULE ─────────────────────────────────────────────────────
function renderCopilot() {
  return `
  <div class="module-header" style="margin-bottom:12px">
    <div class="module-title">🤖 Expert Knowledge Copilot</div>
    <div class="module-sub">RAG-powered AI · Gemini 2.0 Flash · Live Document Corpus · Source Citations</div>
  </div>
  <div class="copilot-layout">
    <div class="chat-main">
      <div class="chat-header">
        <div class="chat-header-title">
          <div class="ai-indicator"><div class="ai-dot"></div>Operations Brain AI</div>
          <span class="tag teal" style="margin-left:8px">Gemini 2.0 Flash</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" onclick="clearChat()">🗑 Clear</button>
          <span class="tag green" id="corpus-status">1,723 docs indexed</span>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg ai">
          <div class="msg-avatar ai">🤖</div>
          <div class="msg-content">
            <div class="msg-bubble">
              <strong>Welcome to Operations Brain AI Copilot</strong><br><br>
              I have access to the complete document corpus of <strong>Bharat Petroleum Refinery, Jamnagar Unit II</strong> — including P&IDs, SOPs, maintenance records, inspection reports, HAZOP studies, RCA reports, and regulatory compliance documents.<br><br>
              Ask me anything about equipment, procedures, maintenance history, compliance status, or failure patterns. I'll provide answers with source citations and confidence levels.
            </div>
            <div class="msg-meta">
              <span class="msg-time">System</span>
              <span class="confidence-badge confidence-high">HIGH CONFIDENCE</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-input-area">
        <div class="chat-input-row">
          <textarea class="chat-input" id="chat-input" placeholder="Ask about equipment, maintenance, procedures, compliance…" rows="1" onkeydown="handleChatKey(event)" oninput="autoResize(this)"></textarea>
          <button class="chat-send-btn" id="send-btn" onclick="sendMessage()">➤</button>
        </div>
        <div style="margin-top:8px;font-size:10px;color:var(--text-3)">⌨️ Enter to send · Shift+Enter for new line · Powered by Gemini 2.0 Flash</div>
      </div>
    </div>
    <div class="chat-sidebar-panel">
      <div style="padding:14px 14px 8px;border-bottom:1px solid var(--border)">
        <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:1px;text-transform:uppercase">💡 Suggested Queries</div>
      </div>
      <div class="suggested-queries" style="flex:1;overflow-y:auto">
        ${DOCUMENT_CORPUS.suggestedQueries.map(q => `<div class="sq-item" onclick="askSuggested(this)">${q}</div>`).join('')}
      </div>
      <div style="padding:14px;border-top:1px solid var(--border)">
        <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px">📚 Corpus Coverage</div>
        ${[
          { label: 'Engineering Drawings', count: 284 },
          { label: 'Maintenance Records', count: 891 },
          { label: 'Regulatory Docs', count: 156 },
          { label: 'Incident Reports', count: 203 },
          { label: 'SOPs & Procedures', count: 189 }
        ].map(c => `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">
            <span style="font-size:11px;color:var(--text-2)">${c.label}</span>
            <span class="tag teal" style="font-family:var(--mono)">${c.count}</span>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function initCopilot() {
  State.chatHistory = [];
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function askSuggested(el) {
  const input = document.getElementById('chat-input');
  if (input) { input.value = el.textContent; autoResize(input); sendMessage(); }
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  if (!input || !input.value.trim()) return;

  const userMsg = input.value.trim();
  input.value = '';
  input.style.height = 'auto';
  if (sendBtn) sendBtn.disabled = true;

  appendMessage('user', userMsg);
  State.chatHistory.push({ role: 'user', parts: [{ text: userMsg }] });

  const typingId = appendTyping();

  try {
    const response = await callGemini(State.chatHistory, DOCUMENT_CORPUS.systemPrompt);
    removeTyping(typingId);
    const aiText = response;
    State.chatHistory.push({ role: 'model', parts: [{ text: aiText }] });
    appendMessage('ai', aiText, true);
  } catch (err) {
    removeTyping(typingId);
    const fallback = generateFallbackResponse(userMsg);
    State.chatHistory.push({ role: 'model', parts: [{ text: fallback }] });
    appendMessage('ai', fallback, true, true);
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    if (input) input.focus();
  }
}

async function callGemini(history, systemPrompt) {
  const response = await fetch(CONFIG.GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: history,
      generationConfig: { temperature: 0.25, maxOutputTokens: 1500, topP: 0.92 }
    })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || `API Error ${response.status}`);
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

function generateFallbackResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('p-205a') || q.includes('seal') || q.includes('pump')) {
    return `**P-205A Mechanical Seal — Maintenance Intelligence** [DOC-005, DOC-006, DOC-008]\n\n**Confidence: High** (Multiple corroborating documents)\n\n**Current Seal Specification:**\n- Type: John Crane Type 8B1 (Pusher seal)\n- API Flush Plan: Plan 11\n- Installed: February 2024 [WO-2024-0892]\n- MTBF Target: 18 months\n\n**Recent History:**\nP-205A has experienced **3 seal failures in 18 months** — a statistically significant pattern:\n1. Jan 2023 — High vibration (root cause unresolved at time)\n2. Jul 2023 — Bearing failure (insufficient lubrication interval)\n3. **Feb 2024** — Bearing misalignment (0.12mm axial) → Seal failure → 14hr shutdown [RCA-2024-031]\n\n⚠️ **SAFETY CRITICAL:** Current vibration reading is 3.8 mm/s (approaching the 4.5 mm/s alarm limit). Based on failure pattern analysis, **alignment check is strongly recommended before next scheduled inspection (Aug 2024)**.\n\n**Recommended Actions:**\n1. Schedule precision alignment check (WO-2024-0992 already raised)\n2. Increase vibration monitoring frequency to daily\n3. Verify P-205B standby readiness\n\n📅 NOTE: Verify current vibration data with live condition monitoring system.`;
  }
  if (q.includes('oisd') || q.includes('compliance') || q.includes('audit')) {
    return `**OISD-105 Compliance Status** [DOC-003, WO-2024-1041]\n\n**Confidence: High** (Official audit document indexed)\n\n**Overall Score: 94%** (82/87 requirements met)\n\n**Active Gaps:**\n\n🔴 **CRITICAL — Clause 6.1.2:** PSV-203 semi-annual inspection overdue by 10 days. This is the highest-priority gap. WO-2024-1041 has been raised — targeted closure: Jul 25, 2024.\n\n🟡 **MAJOR — Clause 8.1.4:** TIC-201 and FIC-305 instrument calibration certificates expired Jun 15, 2024. Engineering to schedule calibration by Jul 30.\n\n🟡 **MINOR — Clause 9.3.2:** CDU-VDU interconnect piping CML inspection overdue. Schedule before Aug 15.\n\n**Evidence Package:** The 2024 audit documentation [DOC-003] can be used as primary evidence for compliant items. Auto-generated evidence package available for OISD inspector submission.\n\n📅 NOTE: OISD typically follows up on overdue items within 30 days of detection. Immediate action on PSV-203 is recommended.`;
  }
  return `**Response based on Document Corpus** [Simulation Mode — API key connecting]\n\nI'm currently operating in simulation mode while the Gemini API connection is established. The complete corpus of 1,723 documents is indexed and ready. Please try your query again in a moment, or I can provide pre-indexed intelligence for:\n\n- **Equipment queries**: P-205A, E-101, HE-402, V-301, PSV-203, FV-102\n- **Compliance**: OISD-105, OISD-116, PESO, Factory Act\n- **Incidents**: RCA-2024-031, INC-2023-019\n- **Procedures**: CDU Startup, Heat Exchanger Cleaning, Hot Work Permit\n\nWhat would you like to know?`;
}

function appendMessage(role, text, withSources = false, isFallback = false) {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const initials = role === 'user' ? 'RN' : '🤖';
  const html = role === 'ai' ? marked.parse(text) : escapeHtml(text);

  let sourcesHtml = '';
  if (role === 'ai' && withSources) {
    const mentionedDocs = DOCUMENT_CORPUS.documents.filter(d =>
      text.includes(d.title) || text.includes(d.id) || d.tags.some(t => text.includes(t))
    ).slice(0, 3);
    if (mentionedDocs.length > 0) {
      sourcesHtml = `<div class="source-cards">${mentionedDocs.map(d => `
        <div class="source-card" onclick="showToast('Opening: ${d.title}', 'info')">
          <span class="sc-icon">📄</span>
          <span class="sc-title">${d.title} · ${d.department}</span>
          <span class="sc-link">↗</span>
        </div>`).join('')}</div>`;
    }
  }

  const confidence = isFallback ? 'medium' : 'high';
  const confidenceLabel = isFallback ? 'SIMULATION MODE' : 'LIVE AI';

  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${role}`;
  msgEl.innerHTML = `
    <div class="msg-avatar ${role}">${initials}</div>
    <div class="msg-content">
      <div class="msg-bubble">${html}</div>
      ${role === 'ai' ? `<div class="msg-meta">
        <span class="msg-time">${time}</span>
        <span class="confidence-badge confidence-${confidence}">${confidenceLabel}</span>
      </div>${sourcesHtml}` : `<div class="msg-meta"><span class="msg-time">${time}</span></div>`}
    </div>`;
  messages.appendChild(msgEl);
  messages.scrollTop = messages.scrollHeight;
}

function appendTyping() {
  const messages = document.getElementById('chat-messages');
  if (!messages) return null;
  const id = 'typing-' + Date.now();
  const el = document.createElement('div');
  el.className = 'chat-msg ai'; el.id = id;
  el.innerHTML = `<div class="msg-avatar ai">🤖</div><div class="msg-content"><div class="msg-bubble" style="padding:14px 16px"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div></div>`;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  return id;
}

function removeTyping(id) {
  if (id) { const el = document.getElementById(id); if (el) el.remove(); }
}

function clearChat() {
  State.chatHistory = [];
  const messages = document.getElementById('chat-messages');
  if (messages) messages.innerHTML = '';
  showToast('Chat cleared', 'info');
}

// ── MAINTENANCE MODULE ────────────────────────────────────────────────────────
function renderMaintenance() {
  const eq = EQUIPMENT_DATA.registry;
  return `
  <div class="module-header">
    <div class="module-title">🔧 Maintenance Intelligence & RCA Agent</div>
    <div class="module-sub">Predictive maintenance · Root Cause Analysis · Work order intelligence</div>
  </div>

  <div class="metrics-grid" style="grid-template-columns:repeat(4,1fr)">
    <div class="metric-card teal"><div class="metric-icon">⏱️</div><div class="metric-value">${EQUIPMENT_DATA.kpiSummary.mtbf.value.toLocaleString()}</div><div class="metric-label">MTBF (Hours)</div><div class="metric-trend up">${EQUIPMENT_DATA.kpiSummary.mtbf.trend} vs prev period</div></div>
    <div class="metric-card green"><div class="metric-icon">⚡</div><div class="metric-value">${EQUIPMENT_DATA.kpiSummary.mttr.value}</div><div class="metric-label">MTTR (Hours)</div><div class="metric-trend up">${EQUIPMENT_DATA.kpiSummary.mttr.trend} improvement</div></div>
    <div class="metric-card amber"><div class="metric-icon">📋</div><div class="metric-value">${EQUIPMENT_DATA.workOrders.filter(w=>w.status==='open').length}</div><div class="metric-label">Open Work Orders</div><div class="metric-trend warn">2 overdue</div></div>
    <div class="metric-card red"><div class="metric-icon">🔮</div><div class="metric-value">${EQUIPMENT_DATA.kpiSummary.predictedFailures30d}</div><div class="metric-label">Predicted Failures (30d)</div><div class="metric-trend down">AI prediction</div></div>
  </div>

  <div class="grid-2-1 mb-16">
    <div>
      <div class="card mb-16">
        <div class="card-header">
          <div class="card-title">⚙️ Equipment Health Dashboard</div>
          <div class="flex gap-8">
            <span class="tag green">● Healthy</span><span class="tag amber">● Watch</span><span class="tag red">● At Risk</span>
          </div>
        </div>
        <div class="equipment-grid">
          ${eq.map(e => {
            const hClass = e.health >= 85 ? 'health-good' : e.health >= 70 ? 'health-warn' : 'health-danger';
            const barColor = e.health >= 85 ? 'var(--green)' : e.health >= 70 ? 'var(--amber)' : 'var(--red)';
            return `
            <div class="eq-card" onclick="showRCA('${e.tag}')">
              <div class="eq-card-header">
                <div><div class="eq-tag">${e.tag}</div><div class="eq-name">${e.name}</div></div>
                <div class="health-score">
                  <div class="health-value ${hClass}">${e.health}</div>
                  <div class="health-label">HEALTH %</div>
                </div>
              </div>
              <div class="health-bar"><div class="health-bar-fill" style="width:${e.health}%;background:${barColor}"></div></div>
              <div class="eq-params">
                ${Object.entries(e.operatingParams).slice(0,4).map(([k,v]) => `<div class="eq-param"><div class="eq-param-label">${k}</div><div class="eq-param-value">${v}</div></div>`).join('')}
              </div>
              ${e.alarms.length > 0 ? `<div class="eq-alarms">${e.alarms.map(a => `<div class="eq-alarm ${a.severity}">⚠ ${a.message.substring(0,60)}…</div>`).join('')}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-header">
          <div class="card-title">🔬 AI RCA Agent — P-205A</div>
          <span class="tag amber">Active Analysis</span>
        </div>
        <div class="rca-stepper" id="rca-stepper">
          ${renderRCASteps(3)}
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-primary btn-sm" onclick="advanceRCA()">▶ Next Step</button>
          <button class="btn btn-ghost btn-sm" onclick="resetRCA()">↺ Reset</button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">📅 Upcoming Maintenance</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${EQUIPMENT_DATA.workOrders.filter(w => w.status !== 'completed').slice(0,5).map(wo => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;background:var(--bg-2)">
              <span class="tag ${wo.priority==='critical'?'red':wo.priority==='high'?'amber':wo.priority==='medium'?'teal':'grey'}">${wo.priority.toUpperCase()}</span>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600;color:var(--text-1)">${wo.equipment} — ${wo.type}</div>
                <div style="font-size:10px;color:var(--text-3)">Due: ${wo.due} · ${wo.assignee}</div>
              </div>
              <span class="tag ${wo.status==='open'?'red':wo.status==='in-progress'?'amber':'grey'}">${wo.status}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">📈 Failure Pattern Analysis — P-205A Seal History</div>
      <span class="tag amber">⚠ Recurring Pattern Detected</span>
    </div>
    <canvas id="failure-chart" height="80"></canvas>
  </div>`;
}

const RCA_STEPS = [
  { title: 'Trigger Detection', icon: '🔔', body: 'Vibration alarm A-P205A-01 triggered: 3.8 mm/s RMS. AI cross-referenced with historical alarm patterns.', evidence: ['Vibration Data','Alarm History','WO-2024-0992'] },
  { title: 'Evidence Collection', icon: '📂', body: 'AI pulled 3 relevant work orders, 2 inspection reports, OEM manual specs, and 18-month failure history for P-205A [DOC-005, DOC-006, DOC-008].', evidence: ['RCA-2024-031','WO-2024-0892','OEM-Flowserve-2310','Inspection Records'] },
  { title: 'Pattern Matching', icon: '🧠', body: 'Similarity match to INC-2024-007: Pre-failure vibration pattern matches current trend. Root cause of last failure: 0.12mm axial bearing misalignment. Same precursor pattern detected.', evidence: ['INC-2024-007 pattern','FMEA-PM-003','API-610 spec'] },
  { title: 'Root Cause Hypothesis', icon: '🔍', body: 'Primary hypothesis: Progressive bearing misalignment due to thermal growth differential between pump and driver. Contributing: Lack of precision alignment check post Feb 2024 seal replacement.', evidence: ['ISO-10816','API-610','OEM torque specs'] },
  { title: 'Recommendation', icon: '✅', body: '1) Schedule precision laser alignment check within 7 days. 2) Check bearing housing clearances against OEM spec (0.05-0.08mm). 3) Verify coupling balance (ISO 1940 G6.3). 4) Increase monitoring to 2x daily. 5) Confirm P-205B standby readiness.', evidence: ['WO-2024-0992','SOP-MAINT-2024-047','ISO-1940'] }
];

function renderRCASteps(activeIdx) {
  return RCA_STEPS.map((s, i) => `
    <div class="rca-step ${i < activeIdx ? 'done' : i === activeIdx ? 'active' : ''}">
      <div class="rca-step-dot">${i < activeIdx ? '✅' : s.icon}</div>
      <div class="rca-step-content">
        <div class="rca-step-title">${s.title}</div>
        ${i <= activeIdx ? `<div class="rca-step-body">${s.body}</div>
        <div class="rca-evidence">${s.evidence.map(e => `<span class="tag ${i === activeIdx ? 'teal' : 'grey'}">${e}</span>`).join('')}</div>` : ''}
      </div>
    </div>`).join('');
}

function advanceRCA() {
  State.rcaStep = Math.min(State.rcaStep + 1, RCA_STEPS.length - 1);
  const el = document.getElementById('rca-stepper');
  if (el) { el.innerHTML = renderRCASteps(State.rcaStep); if (State.rcaStep === RCA_STEPS.length - 1) showToast('RCA Complete! Recommendation generated.', 'success'); }
}

function resetRCA() {
  State.rcaStep = 0;
  const el = document.getElementById('rca-stepper');
  if (el) el.innerHTML = renderRCASteps(0);
}

function showRCA(tag) { showToast(`🔬 Loading RCA analysis for ${tag}…`, 'info'); }

function initMaintenance() {
  State.rcaStep = 3;
  // Animate health bars
  setTimeout(() => {
    document.querySelectorAll('.health-bar-fill').forEach(b => {
      const w = b.style.width; b.style.width = '0'; setTimeout(() => b.style.width = w, 50);
    });
  }, 100);

  // Failure pattern chart
  const fCtx = document.getElementById('failure-chart');
  if (fCtx && window.Chart) {
    State.chartInstances['failure'] = new Chart(fCtx, {
      type: 'bar',
      data: {
        labels: ['Jan 23','Feb 23','Mar 23','Apr 23','May 23','Jun 23','Jul 23','Aug 23','Sep 23','Oct 23','Nov 23','Dec 23','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24','Jul 24'],
        datasets: [
          { label: 'Vibration (mm/s)', data: [2.1,2.3,2.0,2.4,2.8,3.1,3.4,2.2,2.0,2.1,2.5,2.8,3.2,4.8,2.1,2.2,2.4,3.1,3.8], type: 'line', borderColor: '#00D4FF', fill: false, tension: 0.4, pointRadius: 3, yAxisID: 'y' },
          { label: 'Failure Events', data: [0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], backgroundColor: 'rgba(255,77,106,0.7)', yAxisID: 'y1', borderRadius: 4 }
        ]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: '#7B93B0', font: { size: 11 } } } }, scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7B93B0', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#00D4FF', font: { size: 10 } }, title: { display: true, text: 'Vibration (mm/s)', color: '#7B93B0', font: { size: 10 } } },
        y1: { position: 'right', grid: { display: false }, ticks: { color: '#FF4D6A', font: { size: 10 } }, title: { display: true, text: 'Failures', color: '#7B93B0', font: { size: 10 } } }
      }}
    });
  }
}

// ── COMPLIANCE MODULE ─────────────────────────────────────────────────────────
function renderCompliance() {
  const frameworks = COMPLIANCE_DATA.frameworks;
  const allGaps = frameworks.flatMap(f => f.requirements.filter(r => r.status === 'gap').map(r => ({ ...r, framework: f.id, frameworkName: f.name })));

  return `
  <div class="module-header">
    <div class="module-title">🛡️ Compliance & Quality Intelligence</div>
    <div class="module-sub">Regulatory gap mapping · Audit evidence generation · Real-time compliance scoring</div>
  </div>

  <div class="metrics-grid">
    <div class="metric-card green"><div class="metric-icon">🏆</div><div class="metric-value">${COMPLIANCE_DATA.overallScore}%</div><div class="metric-label">Overall Compliance Score</div><div class="metric-trend up">↑ 2.1% from last audit</div></div>
    <div class="metric-card teal"><div class="metric-icon">📋</div><div class="metric-value">${COMPLIANCE_DATA.totalRequirements}</div><div class="metric-label">Total Requirements Tracked</div><div class="metric-trend up">${COMPLIANCE_DATA.compliantItems} compliant</div></div>
    <div class="metric-card amber"><div class="metric-icon">⚠️</div><div class="metric-value">${COMPLIANCE_DATA.gapItems}</div><div class="metric-label">Open Compliance Gaps</div><div class="metric-trend warn">${COMPLIANCE_DATA.criticalGaps} critical</div></div>
    <div class="metric-card teal"><div class="metric-icon">📅</div><div class="metric-value">253</div><div class="metric-label">Days to Next Audit</div><div class="metric-trend up">Auto-prep in progress</div></div>
  </div>

  <div class="grid-3 mb-16">
    ${frameworks.map(f => `
    <div class="compliance-framework-card">
      <div class="cf-header">
        <div>
          <div class="cf-name" style="color:${f.color}">${f.id}</div>
          <div style="font-size:10px;color:var(--text-3);margin-top:2px">${f.authority}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:22px;font-weight:800;font-family:var(--mono);color:${f.score>=95?'var(--green)':f.score>=85?'var(--amber)':'var(--red)'}">${f.score}%</div>
        </div>
      </div>
      <div class="cf-progress-bar"><div class="cf-progress-fill" style="width:${f.score}%;background:${f.color}"></div></div>
      <div class="cf-stats">
        <div class="cf-stat-item"><div class="cf-dot" style="background:var(--green)"></div><span style="color:var(--text-2)">${f.compliant} compliant</span></div>
        <div class="cf-stat-item"><div class="cf-dot" style="background:var(--red)"></div><span style="color:var(--text-2)">${f.gaps} gaps</span></div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        ${f.criticalGaps > 0 ? `<span class="tag red">⚠ ${f.criticalGaps} Critical</span>` : '<span class="tag green">✅ No Critical Gaps</span>'}
        <span class="tag grey">${f.totalReqs} requirements</span>
      </div>
    </div>`).join('')}
  </div>

  <div class="card mb-16">
    <div class="card-header">
      <div class="card-title">🚨 Active Compliance Gaps</div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary btn-sm" onclick="generateAuditPackage()">📦 Generate Audit Package</button>
        <button class="btn btn-ghost btn-sm" onclick="exportGaps()">⬇ Export</button>
      </div>
    </div>
    <table class="gap-table">
      <thead>
        <tr>
          <th>Framework</th><th>Clause</th><th>Requirement</th><th>Gap Description</th><th>Severity</th><th>Status</th><th>Est. Closure</th>
        </tr>
      </thead>
      <tbody>
        ${allGaps.map(g => `
        <tr>
          <td><span class="tag ${g.framework.includes('OISD')?'teal':g.framework==='PESO'?'green':g.framework==='FACTORY-ACT'?'purple':'grey'}">${g.framework}</span></td>
          <td><code style="font-family:var(--mono);font-size:11px;color:var(--teal)">${g.clause}</code></td>
          <td style="max-width:200px;color:var(--text-1)">${g.desc}</td>
          <td style="max-width:220px;color:var(--text-2);font-size:11px">${g.gap}</td>
          <td><span class="traffic-light tl-${g.severity==='critical'?'red':g.severity==='major'?'amber':'green'}">${g.severity.toUpperCase()}</span></td>
          <td><span class="traffic-light tl-${g.severity==='critical'?'red':g.severity==='major'?'amber':'green'}">OPEN</span></td>
          <td style="color:var(--text-2);font-size:11px">${g.estimatedClosure}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">📊 Compliance Radar</div>
    </div>
    <canvas id="compliance-radar" height="100"></canvas>
  </div>`;
}

function generateAuditPackage() {
  showToast('📦 Generating compliance evidence package… (12 documents auto-selected)', 'success');
  setTimeout(() => showToast('✅ Audit package ready: OISD-105_Evidence_Package_Jul2024.zip (14.2 MB)', 'success'), 2000);
}

function exportGaps() { showToast('⬇ Exporting gap analysis to Compliance_Gaps_Jul2024.xlsx…', 'info'); }

function initCompliance() {
  setTimeout(() => {
    document.querySelectorAll('.cf-progress-fill').forEach(el => {
      const w = el.style.width; el.style.width = '0'; setTimeout(() => el.style.width = w, 100);
    });
  }, 100);

  const rCtx = document.getElementById('compliance-radar');
  if (rCtx && window.Chart) {
    State.chartInstances['radar'] = new Chart(rCtx, {
      type: 'radar',
      data: {
        labels: COMPLIANCE_DATA.frameworks.map(f => f.id),
        datasets: [
          { label: 'Current Score', data: COMPLIANCE_DATA.frameworks.map(f => f.score), backgroundColor: 'rgba(0,212,255,0.15)', borderColor: '#00D4FF', borderWidth: 2, pointBackgroundColor: '#00D4FF', pointRadius: 4 },
          { label: 'Target (100%)', data: COMPLIANCE_DATA.frameworks.map(() => 100), backgroundColor: 'rgba(0,232,138,0.05)', borderColor: 'rgba(0,232,138,0.3)', borderWidth: 1, borderDash: [5,5], pointRadius: 0 }
        ]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: '#7B93B0', font: { size: 11 } } } }, scales: { r: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7B93B0', font: { size: 10 }, backdropColor: 'transparent' }, pointLabels: { color: '#7B93B0', font: { size: 11 } }, min: 70, max: 100 } } }
    });
  }
}

// ── LESSONS LEARNED MODULE ────────────────────────────────────────────────────
function renderLessons() {
  const incidents = [
    { date: 'Feb 14, 2024', type: 'critical', icon: '🔴', title: 'P-205A Unplanned Shutdown — Seal Failure', meta: 'CDU · 14-hour downtime · ₹18.5L production loss', desc: 'Mechanical seal failure due to bearing misalignment (0.12mm axial). Root cause: insufficient precision alignment verification after previous bearing replacement. Failure pattern matches INC-2023-014.', tags: ['P-205A', 'Seal Failure', 'Alignment', 'CDU'] },
    { date: 'Nov 12, 2023', type: 'near-miss', icon: '⚠️', title: 'PSV-203 False Lift — Water Hammer Event', meta: 'CDU · Near-miss · Process upset for 8 seconds', desc: 'PSV-203 false lifted at 12.8 bar (set point 13.0 bar) due to water hammer from rapid FV-102 closure. Potential consequence: uncontrolled hydrocarbon release. Corrective action: FV-102 closure rate limiter installed.', tags: ['PSV-203', 'Water Hammer', 'Safety', 'Near-Miss'] },
    { date: 'Apr 02, 2023', type: 'near-miss', icon: '⚠️', title: 'PSV-203 Set Pressure Drift — False Lift', meta: 'CDU · Near-miss · Second PSV event in 12 months', desc: 'Spring relaxation in PSV-203 caused set pressure to drift below design. Identified during routine check. Recalibrated. Pattern: 2 false lift events in 12 months indicates systemic reliability issue with this PSV.', tags: ['PSV-203', 'Spring', 'Calibration', 'Pattern'] },
    { date: 'Jun 18, 2023', type: 'major', icon: '🟡', title: 'FV-102 Actuator Failure — Monsoon Season', meta: 'CDU · 6-hour downtime · Actuator replacement', desc: 'Rotork IQT actuator failed due to moisture ingress during monsoon. Seasonal pattern identified — 3 similar events in 5 years, all during June-August. Recommended: annual pre-monsoon actuator inspection and moisture seal check.', tags: ['FV-102', 'Actuator', 'Monsoon', 'Seasonal'] }
  ];

  return `
  <div class="module-header">
    <div class="module-title">💡 Lessons Learned & Failure Intelligence Engine</div>
    <div class="module-sub">Cross-functional pattern recognition · Proactive alerts · Systemic failure identification</div>
  </div>

  <div class="metrics-grid">
    <div class="metric-card teal"><div class="metric-icon">📊</div><div class="metric-value">247</div><div class="metric-label">Incidents Analysed</div><div class="metric-trend up">Cross-referenced with industry DB</div></div>
    <div class="metric-card amber"><div class="metric-icon">🔮</div><div class="metric-value">18</div><div class="metric-label">Active Pattern Alerts</div><div class="metric-trend warn">3 critical patterns</div></div>
    <div class="metric-card green"><div class="metric-icon">✅</div><div class="metric-value">94%</div><div class="metric-label">Lessons Applied Rate</div><div class="metric-trend up">Industry avg: 67%</div></div>
    <div class="metric-card red"><div class="metric-icon">⚡</div><div class="metric-value">₹4.2Cr</div><div class="metric-label">Downtime Cost (YTD)</div><div class="metric-trend down">-28% vs FY23</div></div>
  </div>

  <div class="grid-2-1 mb-16">
    <div class="card">
      <div class="card-header">
        <div class="card-title">📋 Incident Timeline</div>
        <div style="display:flex;gap:8px">
          <span class="tag red">● Incident</span>
          <span class="tag amber">● Near-Miss</span>
          <span class="tag teal">● Major</span>
        </div>
      </div>
      <div class="incident-timeline">
        ${incidents.map(inc => `
        <div class="incident-item">
          <div class="incident-marker ${inc.type}">${inc.icon}</div>
          <div class="incident-content">
            <div class="incident-title">${inc.title}</div>
            <div class="incident-meta">${inc.date} · ${inc.meta}</div>
            <div class="incident-desc">${inc.desc}</div>
            <div class="incident-tags">${inc.tags.map(t => `<span class="tag grey">${t}</span>`).join('')}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header">
          <div class="card-title">🤖 AI Pattern Alerts</div>
          <span class="tag amber">Live</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="pattern-alert critical">
            <div class="pattern-alert-icon">🔴</div>
            <div class="pattern-alert-body">
              <div class="pattern-alert-title">Recurring Seal Failure Pattern — P-205A</div>
              <div class="pattern-alert-desc">AI detected: 3 seal/bearing failures in 18 months. Pattern suggests systemic alignment or foundation issue. Industry benchmark: MTBF for this pump class is 26 months.</div>
              <div class="pattern-alert-action" onclick="navigate('maintenance')">→ Launch RCA Agent</div>
            </div>
          </div>
          <div class="pattern-alert">
            <div class="pattern-alert-icon">⚠️</div>
            <div class="pattern-alert-body">
              <div class="pattern-alert-title">Monsoon Risk — Actuator Fleet</div>
              <div class="pattern-alert-desc">Seasonal pattern: FV-102 actuator failures correlate with monsoon (Jun-Aug). 3 events in 5 years. Pre-monsoon inspection recommended for all 14 actuators in CDU.</div>
              <div class="pattern-alert-action" onclick="showToast('Raising preventive work orders for all CDU actuators…', 'info')">→ Raise Preventive Work Orders</div>
            </div>
          </div>
          <div class="pattern-alert">
            <div class="pattern-alert-icon">⚡</div>
            <div class="pattern-alert-body">
              <div class="pattern-alert-title">PSV Reliability — Systemic Issue</div>
              <div class="pattern-alert-desc">PSV-203 has experienced 2 false lifts in 12 months (industry norm: 1 per 5 years). Recommend fleet-wide PSV spring inspection and replacement schedule review.</div>
              <div class="pattern-alert-action" onclick="navigate('compliance')">→ View Compliance Impact</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">📊 Failure Category Analysis</div>
        </div>
        <canvas id="failure-pie" height="180"></canvas>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">🔥 Equipment Risk Heatmap</div>
      <span class="tag grey">Last 18 months · Failure frequency × consequence severity</span>
    </div>
    <canvas id="heatmap-chart" height="80"></canvas>
  </div>`;
}

function initLessons() {
  // Failure pie chart
  const pCtx = document.getElementById('failure-pie');
  if (pCtx && window.Chart) {
    State.chartInstances['pie'] = new Chart(pCtx, {
      type: 'doughnut',
      data: {
        labels: ['Mechanical Seal', 'Instrument/Valve', 'Rotating Equipment', 'Static Equipment', 'Process Upset', 'Human Factor'],
        datasets: [{ data: [28, 22, 18, 14, 12, 6], backgroundColor: ['rgba(255,77,106,0.7)', 'rgba(255,183,0,0.7)', 'rgba(0,212,255,0.7)', 'rgba(168,85,247,0.7)', 'rgba(0,232,138,0.7)', 'rgba(123,147,176,0.5)'], borderColor: 'transparent', borderWidth: 0 }]
      },
      options: { responsive: true, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { color: '#7B93B0', font: { size: 10 }, padding: 8 } } } }
    });
  }

  // Heatmap
  const hCtx = document.getElementById('heatmap-chart');
  if (hCtx && window.Chart) {
    const eqTags = EQUIPMENT_DATA.registry.map(e => e.tag);
    State.chartInstances['heatmap'] = new Chart(hCtx, {
      type: 'bar',
      data: {
        labels: eqTags,
        datasets: [
          { label: 'Failure Events (18m)', data: [2, 3, 1, 1, 1, 1, 2, 0], backgroundColor: EQUIPMENT_DATA.registry.map(e => e.failureHistory.length >= 3 ? 'rgba(255,77,106,0.7)' : e.failureHistory.length >= 2 ? 'rgba(255,183,0,0.7)' : 'rgba(0,212,255,0.5)'), borderRadius: 4 },
          { label: 'Downtime Hours (18m)', data: [36, 34, 4, 2, 0, 6, 0, 0], backgroundColor: 'rgba(168,85,247,0.3)', borderRadius: 4, type: 'line', borderColor: '#A855F7', fill: false }
        ]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: '#7B93B0', font: { size: 11 } } } }, scales: {
        x: { grid: { display: false }, ticks: { color: '#7B93B0', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7B93B0', font: { size: 10 } } }
      }}
    });
  }
}

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span style="flex:1">${message}</span><span style="cursor:pointer;color:var(--text-3)" onclick="this.parentElement.remove()">✕</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.transition = 'opacity 0.3s ease'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 4000);
}

function animateCounter(id, from, to, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  const step = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(from + (to - from) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/\n/g,'<br>');
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar navigation
  document.querySelectorAll('.nav-link[data-module]').forEach(link => {
    link.addEventListener('click', () => navigate(link.dataset.module));
  });

  // Logo click → dashboard
  const logo = document.querySelector('.sidebar-logo');
  if (logo) logo.addEventListener('click', () => navigate('dashboard'));

  // Initial render
  navigate('dashboard');

  // Live clock
  setInterval(() => {
    const el = document.getElementById('live-time');
    if (el) el.textContent = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  }, 1000);

  // Welcome toast
  setTimeout(() => showToast('✅ Operations Brain online — 1,723 documents indexed · Gemini AI ready', 'success'), 500);
});

// Marked.js config for safe parsing
if (window.marked) {
  marked.setOptions({ breaks: true, gfm: true });
}
