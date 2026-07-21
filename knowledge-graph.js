// ─── OPERATIONS BRAIN — KNOWLEDGE GRAPH ENGINE (D3.js) ────────────────────────
// Interactive force-directed knowledge graph
// ──────────────────────────────────────────────────────────────────────────────

const KnowledgeGraph = (() => {
  const NODE_TYPES = {
    equipment:  { color: '#00D4FF', glow: 'rgba(0,212,255,0.4)',  shape: 'circle',   r: 14, label: 'Equipment'  },
    document:   { color: '#FFB700', glow: 'rgba(255,183,0,0.4)',  shape: 'rect',     r: 11, label: 'Document'   },
    procedure:  { color: '#00E88A', glow: 'rgba(0,232,138,0.4)',  shape: 'circle',   r: 10, label: 'Procedure'  },
    regulation: { color: '#A855F7', glow: 'rgba(168,85,247,0.4)', shape: 'diamond',  r: 12, label: 'Regulation' },
    incident:   { color: '#FF4D6A', glow: 'rgba(255,77,106,0.4)', shape: 'circle',   r: 10, label: 'Incident'   },
    parameter:  { color: '#60EFFF', glow: 'rgba(96,239,255,0.3)', shape: 'circle',   r:  7, label: 'Parameter'  },
    personnel:  { color: '#F4C95D', glow: 'rgba(244,201,93,0.4)', shape: 'circle',   r:  9, label: 'Personnel'  }
  };

  const GRAPH_DATA = {
    nodes: [
      // Equipment
      { id: 'E-101',   label: 'E-101',   type: 'equipment',  group: 'CDU',       desc: 'CDU Feed Preheater' },
      { id: 'P-205A',  label: 'P-205A',  type: 'equipment',  group: 'CDU',       desc: 'AT Residue Pump A' },
      { id: 'P-205B',  label: 'P-205B',  type: 'equipment',  group: 'CDU',       desc: 'AT Residue Pump B' },
      { id: 'V-301',   label: 'V-301',   type: 'equipment',  group: 'Naphtha',   desc: 'Naphtha Splitter' },
      { id: 'HE-402',  label: 'HE-402',  type: 'equipment',  group: 'Kerosene',  desc: 'Kerosene HX' },
      { id: 'FV-102',  label: 'FV-102',  type: 'equipment',  group: 'CDU',       desc: 'Feed Control Valve' },
      { id: 'PSV-203', label: 'PSV-203', type: 'equipment',  group: 'CDU',       desc: 'Safety Valve (⚠️ Overdue)' },
      { id: 'C-501',   label: 'C-501',   type: 'equipment',  group: 'LPG',       desc: 'Debutanizer Column' },
      // Documents
      { id: 'DOC-001', label: 'P&ID-CDU\nRev12', type: 'document', desc: 'CDU P&ID Drawing' },
      { id: 'DOC-002', label: 'SOP-MAINT\n047',  type: 'document', desc: 'HX Cleaning Procedure' },
      { id: 'DOC-003', label: 'OISD-105\nAudit', type: 'document', desc: 'Compliance Audit 2024' },
      { id: 'DOC-005', label: 'WO-2024\n0892',   type: 'document', desc: 'P-205A Work Order' },
      { id: 'DOC-006', label: 'RCA-2024\n031',   type: 'document', desc: 'Root Cause Analysis' },
      { id: 'DOC-007', label: 'HAZOP\nV-301',    type: 'document', desc: 'HAZOP Study 2023' },
      { id: 'DOC-008', label: 'OEM\nFlowserve',  type: 'document', desc: 'Pump Manual' },
      { id: 'DOC-010', label: 'INC-2023\n019',   type: 'document', desc: 'Near-Miss Report' },
      // Procedures
      { id: 'SOP-STARTUP', label: 'CDU\nStartup', type: 'procedure', desc: 'SOP-OPS-2023-112' },
      { id: 'SOP-HOT',     label: 'Hot Work\nPermit', type: 'procedure', desc: 'SOP-SAFE-019' },
      { id: 'ERP',         label: 'Emergency\nResponse', type: 'procedure', desc: 'ERP-2024-001' },
      // Regulations
      { id: 'OISD-105',    label: 'OISD-105',    type: 'regulation', desc: 'Pressure Vessels' },
      { id: 'OISD-116',    label: 'OISD-116',    type: 'regulation', desc: 'Fire Protection' },
      { id: 'PESO',        label: 'PESO',         type: 'regulation', desc: 'Explosives Safety' },
      { id: 'FACTORY-ACT', label: 'Factory\nAct', type: 'regulation', desc: 'Factories Act 1948' },
      // Incidents
      { id: 'INC-001', label: 'P-205A\nSeal Fail', type: 'incident', desc: 'Feb 2024 — 14hr downtime' },
      { id: 'INC-002', label: 'PSV-203\nFalse Lift', type: 'incident', desc: 'Nov 2023 — Water Hammer' },
      // Personnel
      { id: 'RAJAN',   label: 'Rajan\nMehta',  type: 'personnel', desc: 'Sr. Process Engineer' },
      { id: 'VIJAY',   label: 'Vijay\nKumar',  type: 'personnel', desc: 'Sr. Maint. Engineer' },
      { id: 'PRIYA',   label: 'Priya\nSharma', type: 'personnel', desc: 'HSE Manager' },
      { id: 'MEENA',   label: 'Dr. Meena\nNair', type: 'personnel', desc: 'Reliability Engineer' }
    ],
    links: [
      // Equipment → Documents
      { source: 'E-101',   target: 'DOC-001', label: 'shown_in',     weight: 2 },
      { source: 'P-205A',  target: 'DOC-001', label: 'shown_in',     weight: 2 },
      { source: 'P-205A',  target: 'DOC-005', label: 'subject_of',   weight: 3 },
      { source: 'P-205A',  target: 'DOC-006', label: 'analysed_in',  weight: 3 },
      { source: 'P-205A',  target: 'DOC-008', label: 'governed_by',  weight: 2 },
      { source: 'V-301',   target: 'DOC-007', label: 'studied_in',   weight: 2 },
      { source: 'HE-402',  target: 'DOC-002', label: 'maintained_by',weight: 2 },
      { source: 'E-101',   target: 'DOC-002', label: 'maintained_by',weight: 2 },
      { source: 'PSV-203', target: 'DOC-003', label: 'inspected_in', weight: 2 },
      { source: 'FV-102',  target: 'DOC-010', label: 'implicated_in',weight: 2 },
      { source: 'PSV-203', target: 'DOC-010', label: 'implicated_in',weight: 2 },
      // Incidents → Equipment
      { source: 'INC-001', target: 'P-205A',  label: 'affected',     weight: 3 },
      { source: 'INC-002', target: 'PSV-203', label: 'affected',     weight: 3 },
      { source: 'INC-002', target: 'FV-102',  label: 'triggered_by', weight: 2 },
      // Incidents → Documents
      { source: 'INC-001', target: 'DOC-006', label: 'analysed_in',  weight: 2 },
      { source: 'INC-002', target: 'DOC-010', label: 'reported_in',  weight: 2 },
      // Regulations → Documents
      { source: 'OISD-105', target: 'DOC-003', label: 'audited_by',  weight: 2 },
      { source: 'OISD-105', target: 'DOC-001', label: 'governs',     weight: 1 },
      { source: 'OISD-116', target: 'ERP',     label: 'governs',     weight: 1 },
      { source: 'PESO',     target: 'DOC-007', label: 'referenced',  weight: 1 },
      // Procedures
      { source: 'SOP-STARTUP', target: 'E-101',   label: 'involves',  weight: 2 },
      { source: 'SOP-STARTUP', target: 'P-205A',  label: 'involves',  weight: 2 },
      { source: 'SOP-HOT',     target: 'HE-402',  label: 'applies_to',weight: 1 },
      { source: 'ERP',         target: 'INC-001', label: 'activated_by', weight: 1 },
      // Personnel → Documents
      { source: 'RAJAN',  target: 'DOC-001', label: 'authored',    weight: 1 },
      { source: 'VIJAY',  target: 'DOC-002', label: 'authored',    weight: 1 },
      { source: 'PRIYA',  target: 'DOC-003', label: 'authored',    weight: 1 },
      { source: 'MEENA',  target: 'DOC-006', label: 'authored',    weight: 1 },
      // Pump A/B relationship
      { source: 'P-205A', target: 'P-205B', label: 'standby_pair', weight: 1 }
    ]
  };

  function render(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const width  = container.clientWidth  || 800;
    const height = container.clientHeight || 500;
    const isMini = options.mini || false;

    // Legend
    if (!isMini) {
      const legend = document.createElement('div');
      legend.className = 'kg-legend';
      legend.innerHTML = Object.entries(NODE_TYPES).map(([k, v]) =>
        `<span class="kg-legend-item"><span class="kg-legend-dot" style="background:${v.color};box-shadow:0 0 6px ${v.glow}"></span>${v.label}</span>`
      ).join('');
      container.appendChild(legend);
    }

    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('width', '100%');
    svgEl.setAttribute('height', isMini ? '100%' : (height - 40) + 'px');
    svgEl.style.display = 'block';
    container.appendChild(svgEl);

    const svg = d3.select(svgEl);

    // Defs (filters, markers)
    const defs = svg.append('defs');
    Object.entries(NODE_TYPES).forEach(([type, cfg]) => {
      const filter = defs.append('filter').attr('id', `glow-${type}`).attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
      filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
      const merge = filter.append('feMerge');
      merge.append('feMergeNode').attr('in', 'coloredBlur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');
    });
    defs.append('marker').attr('id', 'arrowhead').attr('viewBox', '-0 -5 10 10').attr('refX', 20).attr('refY', 0)
      .attr('orient', 'auto').attr('markerWidth', 6).attr('markerHeight', 6)
      .append('path').attr('d', 'M 0,-5 L 10,0 L 0,5').attr('fill', 'rgba(255,255,255,0.2)').attr('stroke', 'none');

    const g = svg.append('g');

    // Zoom
    if (!isMini) {
      svg.call(d3.zoom().scaleExtent([0.3, 3]).on('zoom', (event) => { g.attr('transform', event.transform); }));
    }

    const filterType = options.filterType || null;
    let nodes = GRAPH_DATA.nodes.map(d => ({ ...d }));
    let links = GRAPH_DATA.links.map(d => ({ ...d }));

    if (filterType) {
      const relatedIds = new Set();
      relatedIds.add(filterType);
      links.forEach(l => { if (l.source === filterType || l.target === filterType) { relatedIds.add(l.source); relatedIds.add(l.target); } });
      nodes = nodes.filter(n => relatedIds.has(n.id));
      links = links.filter(l => relatedIds.has(l.source) && relatedIds.has(l.target));
    }

    if (isMini) {
      nodes = nodes.slice(0, 20);
      const nodeIds = new Set(nodes.map(n => n.id));
      links = links.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target));
    }

    const svgWidth  = svgEl.clientWidth  || width;
    const svgHeight = svgEl.clientHeight || (isMini ? height : height - 40);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(d => isMini ? 60 : 90).strength(0.5))
      .force('charge', d3.forceManyBody().strength(isMini ? -80 : -200))
      .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
      .force('collision', d3.forceCollide().radius(isMini ? 20 : 30));

    const link = g.append('g').selectAll('line').data(links).enter().append('line')
      .attr('stroke', 'rgba(255,255,255,0.12)')
      .attr('stroke-width', d => d.weight * 0.8)
      .attr('marker-end', 'url(#arrowhead)');

    const node = g.append('g').selectAll('g').data(nodes).enter().append('g')
      .attr('class', 'kg-node')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag',  (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end',   (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    // Draw node shapes
    node.each(function(d) {
      const cfg = NODE_TYPES[d.type];
      const el = d3.select(this);
      const r = isMini ? cfg.r * 0.7 : cfg.r;

      if (d.type === 'regulation') {
        // Diamond
        const s = r * 1.4;
        el.append('polygon').attr('points', `0,${-s} ${s},0 0,${s} ${-s},0`)
          .attr('fill', cfg.color).attr('fill-opacity', 0.15)
          .attr('stroke', cfg.color).attr('stroke-width', 1.5)
          .attr('filter', `url(#glow-${d.type})`);
      } else {
        el.append('circle').attr('r', r)
          .attr('fill', cfg.color).attr('fill-opacity', 0.15)
          .attr('stroke', cfg.color).attr('stroke-width', 1.5)
          .attr('filter', `url(#glow-${d.type})`);
      }

      if (!isMini) {
        const lines = d.label.split('\n');
        lines.forEach((line, i) => {
          el.append('text').text(line)
            .attr('dy', r + 14 + i * 13)
            .attr('text-anchor', 'middle')
            .attr('fill', '#A8C4E0')
            .attr('font-size', '10px')
            .attr('font-family', 'Inter, sans-serif');
        });
      }

      el.on('mouseover', function(event, d) {
        const tooltip = document.getElementById('kg-tooltip');
        if (tooltip) {
          tooltip.innerHTML = `<strong style="color:${cfg.color}">${d.label.replace('\n', ' ')}</strong><br><span style="color:#7B93B0">${d.type.toUpperCase()}</span><br>${d.desc}`;
          tooltip.style.display = 'block';
          tooltip.style.left = (event.pageX + 12) + 'px';
          tooltip.style.top  = (event.pageY - 28) + 'px';
        }
        d3.select(this).select('circle, polygon').attr('fill-opacity', 0.4).attr('stroke-width', 2.5);
      }).on('mousemove', function(event) {
        const tooltip = document.getElementById('kg-tooltip');
        if (tooltip) { tooltip.style.left = (event.pageX + 12) + 'px'; tooltip.style.top = (event.pageY - 28) + 'px'; }
      }).on('mouseout', function() {
        const tooltip = document.getElementById('kg-tooltip');
        if (tooltip) tooltip.style.display = 'none';
        d3.select(this).select('circle, polygon').attr('fill-opacity', 0.15).attr('stroke-width', 1.5);
      });
    });

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Animate nodes on load
    node.attr('opacity', 0).transition().duration(600).delay((d, i) => i * 30).attr('opacity', 1);
  }

  return { render, GRAPH_DATA, NODE_TYPES };
})();

window.KnowledgeGraph = KnowledgeGraph;
