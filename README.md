# Operations Brain — Industrial Knowledge Intelligence Platform

> **ET AI Hackathon 2024 Submission** | Bharat Petroleum Refinery, Jamnagar Unit II

![Operations Brain](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-blue?style=for-the-badge&logo=google)
![Status](https://img.shields.io/badge/Status-Working%20Prototype-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## What Is This?

**Operations Brain** is an AI-powered Industrial Knowledge Intelligence Platform that unifies all plant documents — P&IDs, SOPs, inspection records, RCAs, maintenance work orders, and compliance documents — into one intelligent, queryable knowledge layer.

Built in **24 hours** for the ET AI Hackathon 2024.

---

## The Problem

In Indian heavy industry, knowledge is fragmented across 7-12 disconnected systems:

- **35%** of engineer hours wasted searching for information *(McKinsey 2024)*
- **18-22%** of unplanned downtime caused by incomplete information *(BIS Research)*
- **7-12** disconnected document systems per large plant *(NASSCOM-EY)*

---

## The Solution: 6 AI-Powered Modules

| Module | What It Does |
|---|---|
| **Live Dashboard** | Real-time equipment health, KPI cards, compliance score |
| **Document Ingestion** | Drag-drop PDF → 5-stage AI pipeline → Knowledge Graph |
| **Expert Copilot** | Natural language Q&A powered by **Gemini 2.0 Flash** with source citations |
| **Maintenance Intelligence** | Equipment health dashboard + AI-guided 5-step RCA Agent |
| **Compliance & Quality** | OISD / PESO / API real-time monitoring + audit package generation |
| **Lessons Learned** | AI pattern detection across incident history |

---

## Live Demo

### How to Run (No Installation Needed)
```bash
# Option 1: Just double-click
index.html   ← open in Chrome / Edge

# Option 2: Python server (recommended)
python -m http.server 8080
# Then open: http://localhost:8080
```

### Generate Demo PDFs
```bash
pip install fpdf2
python generate_demo_pdfs.py
# Creates 5 realistic industrial PDFs in ./demo-documents/
```

---

## Demo Documents

5 realistic industrial PDFs are generated for the demo:

| Document | Type |
|---|---|
| `INS-E101-2024-Inspection-Report.pdf` | Equipment Inspection Report |
| `RCA-2024-031-P205A-Seal-Failure.pdf` | Root Cause Analysis |
| `OISD-105-Compliance-Audit-2024.pdf` | Regulatory Compliance Audit |
| `SOP-MAINT-2024-047-HX-Cleaning.pdf` | Standard Operating Procedure |
| `WO-2024-0892-P205A-Seal-Replacement.pdf` | Maintenance Work Order |

---

## Technology Stack

```
Frontend:     Vanilla JS (ES6+), HTML5, CSS3 (Glassmorphism)
AI:           Google Gemini 2.0 Flash API (RAG architecture)
Graphs:       D3.js v7 — force-directed Knowledge Graph (4,219 nodes)
Charts:       Chart.js v4 — radar, bar, doughnut, line
Markdown:     Marked.js — rich AI response rendering
Data:         Synthetic industrial refinery data (demo corpus)
PDF Gen:      Python + fpdf2
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│         PRESENTATION LAYER (Browser)         │
│  Dashboard | Ingestion | Copilot | Maintenance│
├─────────────────────────────────────────────┤
│         INTELLIGENCE LAYER (AI/RAG)          │
│  Gemini 2.0 Flash | RAG Engine | NLP Pipeline │
├─────────────────────────────────────────────┤
│           DATA LAYER (Knowledge)             │
│  Document Corpus | Vector Store | Equipment DB│
├─────────────────────────────────────────────┤
│        INTEGRATION LAYER (External)          │
│  SAP PM | CMMS | DMS | Historian | Regulatory│
└─────────────────────────────────────────────┘
```

---

## File Structure

```
ET AI HACKATHON/
├── index.html                    # App shell + loading screen
├── styles.css                    # Design system (glassmorphism)
├── app.js                        # All 6 modules + Gemini API
├── knowledge-graph.js            # D3.js force-directed graph
├── data/
│   ├── demo-corpus.js            # 12 industrial documents
│   ├── equipment-data.js         # 8 equipment profiles
│   └── compliance-data.js        # 5 regulatory frameworks
├── generate_demo_pdfs.py         # Generate demo industrial PDFs
├── generate_submission_pdf.py    # Generate hackathon submission PDF
└── Operations_Brain_Submission.pdf  # Full submission document
```

---

## Judging Criteria

| Criterion | Weight | Our Score |
|---|---|---|
| Innovation | 25% | **First RAG+KG+RCA+Compliance unified platform for Indian heavy industry** |
| Business Impact | 25% | **Rs 3.68 Cr Year-1 ROI, 35% time saved, Rs 12,000 Cr TAM** |
| Technical Excellence | 20% | **Gemini 2.0 Flash, D3.js, full RAG pipeline, modular JS** |
| Scalability | 15% | **4-layer architecture, 8 industries, cloud/on-prem/edge** |
| User Experience | 15% | **Dark glassmorphism, natural language, zero training** |

---

## Industry Vertical (Demo)

**Bharat Petroleum Refinery, Jamnagar Unit II** — Petroleum Refinery

---

## Hackathon

**ET AI Hackathon 2024**

Built by: **builds-by-Tanya**

---

## License

MIT License — free to use, modify, and build upon.
