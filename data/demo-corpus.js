// ─── OPERATIONS BRAIN — DOCUMENT CORPUS ───────────────────────────────────────
// Facility: Bharat Petroleum Refinery, Jamnagar Unit II | 8 MMTPA
// ──────────────────────────────────────────────────────────────────────────────

const DOCUMENT_CORPUS = {
  facilityName: "Bharat Petroleum Refinery — Jamnagar Unit II",
  facilityCapacity: "8 MMTPA",
  totalDocuments: 1847,
  indexedDocuments: 1723,
  knowledgeNodes: 4219,
  knowledgeEdges: 11847,

  documents: [
    {
      id: "DOC-001", title: "P&ID-CDU-Rev12",
      fullName: "Crude Distillation Unit — Process & Instrumentation Diagram Rev. 12",
      type: "engineering_drawing", format: "PDF", size: "18.4 MB", pages: 24,
      uploaded: "2024-03-15", lastModified: "2024-03-15",
      department: "Engineering", author: "Rajan Mehta, Sr. Process Engineer",
      revision: "Rev. 12", tags: ["P&ID", "CDU", "Process", "Engineering"],
      status: "indexed", confidence: 94.2,
      entities: {
        equipment: ["E-101", "E-102", "P-205A", "P-205B", "FV-102", "TIC-101", "FIC-205", "LIC-101"],
        parameters: ["Operating Pressure: 1.2 bar", "Design Temperature: 380°C", "Feed Flow Rate: 240 m³/h", "Overhead Temperature: 145°C"],
        references: ["OISD-105", "API-570", "ASME-B31.3", "IS-2825"],
        personnel: ["Rajan Mehta", "Suresh Patel"]
      }
    },
    {
      id: "DOC-002", title: "SOP-MAINT-2024-047",
      fullName: "Standard Operating Procedure — Heat Exchanger Chemical Cleaning",
      type: "maintenance_procedure", format: "PDF", size: "2.1 MB", pages: 18,
      uploaded: "2024-01-08", lastModified: "2024-02-20",
      department: "Maintenance", author: "Vijay Kumar, Sr. Maintenance Engineer",
      revision: "Rev. 3", tags: ["SOP", "Heat Exchanger", "Cleaning", "Maintenance"],
      status: "indexed", confidence: 97.8,
      entities: {
        equipment: ["HE-402", "HE-403", "E-101", "E-102"],
        parameters: ["Cleaning Temperature: 60°C", "NaOH Concentration: 2%", "Circulation Time: 4 hrs", "Flush Volume: 12 m³"],
        references: ["TEMA-C", "API-660", "SOP-SAFE-019"],
        personnel: ["Vijay Kumar", "Ramesh Iyer"]
      }
    },
    {
      id: "DOC-003", title: "OISD-105-Compliance-2024",
      fullName: "OISD Standard 105 — Inspection of Pressure Vessels, Compliance Audit 2024",
      type: "regulatory", format: "PDF", size: "5.7 MB", pages: 62,
      uploaded: "2024-04-02", lastModified: "2024-04-02",
      department: "HSE", author: "Priya Sharma, HSE Manager",
      revision: "Annual", tags: ["OISD-105", "Compliance", "Pressure Vessels", "Regulatory"],
      status: "indexed", confidence: 99.1,
      entities: {
        equipment: ["V-301", "V-302", "PSV-203", "V-401"],
        parameters: ["Design Pressure: 15 bar", "Test Pressure: 22.5 bar", "Wall Thickness: 14mm"],
        references: ["OISD-105", "ASME-Sec-VIII", "IBR-1950", "Factory Act 1948"],
        personnel: ["Priya Sharma", "OISD Inspector", "Third Party Inspector"]
      }
    },
    {
      id: "DOC-004", title: "Inspection-E101-Mar2024",
      fullName: "E-101 Feed Preheater — Comprehensive Inspection Report Q1 2024",
      type: "inspection_report", format: "PDF", size: "8.2 MB", pages: 34,
      uploaded: "2024-03-28", lastModified: "2024-03-28",
      department: "Inspection", author: "Anand Krishnan, Sr. Inspector",
      revision: "—", tags: ["Inspection", "E-101", "Heat Exchanger", "Q1-2024"],
      status: "indexed", confidence: 96.5,
      entities: {
        equipment: ["E-101", "E-102"],
        parameters: ["Tube Plugging: 12%", "Fouling Factor: 0.0003", "Remaining Life: 3 years", "Last Cleaned: Jan 2024"],
        references: ["TEMA-C", "API-660", "WO-2024-0743"],
        personnel: ["Anand Krishnan", "TPI Agency: Bureau Veritas"]
      }
    },
    {
      id: "DOC-005", title: "WO-2024-0892",
      fullName: "Work Order: P-205A Mechanical Seal Replacement — Completed",
      type: "work_order", format: "PDF", size: "0.8 MB", pages: 6,
      uploaded: "2024-02-14", lastModified: "2024-02-18",
      department: "Maintenance", author: "Mohan Das, Maintenance Supervisor",
      revision: "—", tags: ["Work Order", "P-205A", "Seal", "Pump", "Completed"],
      status: "indexed", confidence: 98.3,
      entities: {
        equipment: ["P-205A"],
        parameters: ["Seal Type: John Crane Type 8B1", "MTBF Target: 18 months", "Labour Hours: 14", "Downtime: 14 hours"],
        references: ["OEM-Flowserve-2310", "SOP-MAINT-2023-031", "INC-2024-007"],
        personnel: ["Mohan Das", "Sanjay Rao", "Flowserve Field Tech"]
      }
    },
    {
      id: "DOC-006", title: "RCA-2024-031",
      fullName: "Root Cause Analysis — P-205A Unplanned Shutdown, 14 Feb 2024",
      type: "incident_report", format: "PDF", size: "3.4 MB", pages: 22,
      uploaded: "2024-03-01", lastModified: "2024-03-05",
      department: "Reliability", author: "Dr. Meena Nair, Reliability Engineer",
      revision: "Final", tags: ["RCA", "P-205A", "Incident", "Seal Failure"],
      status: "indexed", confidence: 95.7,
      entities: {
        equipment: ["P-205A", "P-205B"],
        parameters: ["Root Cause: Bearing misalignment (0.12mm axial)", "Contributing Factor: Vibration >4.5 mm/s", "Failure Mode: FMEA-PM-003"],
        references: ["ISO-10816", "API-610", "WO-2024-0892", "INC-2023-014"],
        personnel: ["Dr. Meena Nair", "Mohan Das", "OEM Flowserve"]
      }
    },
    {
      id: "DOC-007", title: "HAZOP-V301-2023",
      fullName: "HAZOP Study — Naphtha Splitter Column V-301, Revision A",
      type: "safety_study", format: "PDF", size: "12.6 MB", pages: 87,
      uploaded: "2023-09-15", lastModified: "2024-01-10",
      department: "Process Safety", author: "Kavitha Reddy, Process Safety Lead",
      revision: "Rev. A", tags: ["HAZOP", "V-301", "Naphtha", "Process Safety"],
      status: "indexed", confidence: 93.4,
      entities: {
        equipment: ["V-301", "P-310A", "P-310B", "HE-302", "PSV-301A", "PSV-301B"],
        parameters: ["Operating Pressure: 8.5 bar", "Max Operating Temp: 165°C", "Liquid Level: 40-60%", "14 Deviations Identified"],
        references: ["IEC-61882", "OISD-117", "API-RP-14J", "PESO"],
        personnel: ["Kavitha Reddy", "External HAZOP Team", "Priya Sharma"]
      }
    },
    {
      id: "DOC-008", title: "OEM-Flowserve-2310",
      fullName: "Flowserve Mark 3 Centrifugal Pump — OEM Maintenance Manual",
      type: "oem_manual", format: "PDF", size: "22.1 MB", pages: 156,
      uploaded: "2022-05-10", lastModified: "2022-05-10",
      department: "Maintenance", author: "Flowserve Corporation",
      revision: "Ed. 4.2", tags: ["OEM", "Pump", "Flowserve", "Manual"],
      status: "indexed", confidence: 99.5,
      entities: {
        equipment: ["P-205A", "P-205B", "P-310A", "P-310B"],
        parameters: ["Rated Flow: 245 m³/h", "Head: 87m", "Efficiency: 78%", "Seal Flush Plan: API Plan 11"],
        references: ["API-610", "ISO-5199", "ASME-B73.1"],
        personnel: ["Flowserve Applications Engineering"]
      }
    },
    {
      id: "DOC-009", title: "SOP-OPS-2023-112",
      fullName: "CDU Startup Procedure — Normal Operations from Cold State",
      type: "operating_procedure", format: "PDF", size: "4.3 MB", pages: 42,
      uploaded: "2023-11-20", lastModified: "2024-02-01",
      department: "Operations", author: "Sanjay Iyer, Shift Superintendent",
      revision: "Rev. 5", tags: ["SOP", "Startup", "CDU", "Operations"],
      status: "indexed", confidence: 97.1,
      entities: {
        equipment: ["E-101", "P-205A", "P-205B", "FV-102", "V-301"],
        parameters: ["Startup Duration: ~6 hours", "Steps: 16", "Min Crew: 4 operators", "H2S Monitor: Mandatory"],
        references: ["OISD-105", "ERP-2024-001", "SOP-SAFE-019"],
        personnel: ["Sanjay Iyer", "Operations Shift Team"]
      }
    },
    {
      id: "DOC-010", title: "INC-2023-019",
      fullName: "Near-Miss Incident Report — PSV-203 False Lift Event, Nov 2023",
      type: "incident_report", format: "PDF", size: "1.9 MB", pages: 14,
      uploaded: "2023-11-28", lastModified: "2023-12-10",
      department: "HSE", author: "Priya Sharma, HSE Manager",
      revision: "Final", tags: ["Near-Miss", "PSV", "Incident", "Water Hammer"],
      status: "indexed", confidence: 94.8,
      entities: {
        equipment: ["PSV-203", "V-301", "FV-102"],
        parameters: ["False Lift Pressure: 12.8 bar", "Set Pressure: 13.0 bar", "Duration: 8 seconds", "Cause: Water Hammer"],
        references: ["API-520", "API-521", "OISD-105", "INC-2023-031"],
        personnel: ["Priya Sharma", "Night Shift Operator", "OISD"]
      }
    },
    {
      id: "DOC-011", title: "MSDS-H2S-2024",
      fullName: "Material Safety Data Sheet — Hydrogen Sulphide (H₂S) Rev. 2024",
      type: "msds", format: "PDF", size: "0.7 MB", pages: 8,
      uploaded: "2024-01-01", lastModified: "2024-01-01",
      department: "HSE", author: "HSE Department",
      revision: "Annual", tags: ["MSDS", "H2S", "Safety", "Chemical"],
      status: "indexed", confidence: 99.9,
      entities: {
        equipment: [],
        parameters: ["IDLH: 50 ppm", "LEL: 4.3%", "UEL: 46%", "TLV-TWA: 1 ppm"],
        references: ["OSHA-1910.119", "OISD-116", "ERP-2024-001"],
        personnel: []
      }
    },
    {
      id: "DOC-012", title: "PM-SCHEDULE-2024",
      fullName: "Preventive Maintenance Master Schedule — FY 2024-25",
      type: "maintenance_schedule", format: "XLSX", size: "3.2 MB", pages: 1,
      uploaded: "2024-04-01", lastModified: "2024-07-01",
      department: "Maintenance", author: "Engineering Department",
      revision: "Q2 Update", tags: ["PM", "Schedule", "Maintenance", "Annual"],
      status: "indexed", confidence: 98.7,
      entities: {
        equipment: ["E-101", "P-205A", "P-205B", "HE-402", "V-301", "FV-102", "PSV-203"],
        parameters: ["Total PM Tasks: 847", "Overdue: 23", "Upcoming (30d): 41", "Compliance: 97.3%"],
        references: ["OEM-Flowserve-2310", "OISD-105"],
        personnel: ["Maintenance Planning Team"]
      }
    }
  ],

  suggestedQueries: [
    "What is the recommended seal flush plan for P-205A and when was it last replaced?",
    "What are the OISD-105 compliance gaps identified in the 2024 audit?",
    "What was the root cause of the P-205A shutdown in February 2024?",
    "What is the startup procedure for CDU from cold state? How long does it take?",
    "What are the H₂S safety limits and emergency response steps for a release?",
    "What is the current fouling factor for E-101 and when is the next inspection due?",
    "Which HAZOP deviations for V-301 require immediate action?",
    "What is the maintenance history for HE-402 in the last 12 months?",
    "What are the PESO compliance requirements for our pressure vessels?",
    "Which equipment has the highest risk of unplanned failure in the next 90 days?"
  ],

  systemPrompt: `You are the Expert Knowledge Copilot for Bharat Petroleum Refinery, Jamnagar Unit II — an 8 MMTPA crude processing facility operated in India. You have been trained on the facility's complete operational document corpus.

FACILITY CONTEXT:
- Crude Distillation Unit (CDU), Vacuum Distillation Unit (VDU), Naphtha Splitter, Diesel Hydrotreater
- Key equipment: E-101 (Feed Preheater), P-205A/B (Atmospheric Residue Transfer Pumps), V-301 (Naphtha Splitter Column), HE-402 (Kerosene-Crude HX), FV-102 (Feed Control Valve), PSV-203

DOCUMENT CORPUS INCLUDES:
- Engineering: P&ID-CDU-Rev12 (CDU drawings, params: 1.2 bar, 380°C max, 240 m³/h), HAZOP-V301-2023 (14 deviations, 8.5 bar, 165°C)
- Maintenance: WO-2024-0892 (P-205A seal replacement, John Crane Type 8B1, 14hr downtime), SOP-MAINT-2024-047 (HX cleaning: 60°C, 2% NaOH, 4hr), OEM-Flowserve-2310 (245 m³/h, 87m head, API Plan 11)
- Inspection: Inspection-E101-Mar2024 (12% tube plugging, fouling factor 0.0003, 3-year remaining life)
- Incidents: RCA-2024-031 (P-205A root cause: bearing misalignment 0.12mm, vibration >4.5 mm/s), INC-2023-019 (PSV-203 false lift at 12.8 bar, water hammer)
- Procedures: SOP-OPS-2023-112 (CDU startup: 16 steps, ~6 hours, min 4 operators), ERP-2024-001
- Regulatory: OISD-105 Compliance 2024 (94% compliant, 3 gaps in calibration records), MSDS-H2S-2024 (IDLH 50ppm, TLV 1ppm)
- Safety: MSDS-H2S-2024 (LEL 4.3%, UEL 46%)

RESPONSE RULES:
1. Always cite source documents in [brackets] like [DOC-001] or document title
2. State confidence: High (multiple corroborating sources), Medium (single source), Low (inferred)
3. Prefix safety-critical info with ⚠️ SAFETY CRITICAL
4. For maintenance queries, include OEM references and torque/parameter specs
5. Format with clear sections using bold headers
6. Suggest follow-up queries when relevant
7. When data may be outdated, flag with 📅 NOTE: Verify currency of this data
8. Be technically precise — your users are senior process engineers and field technicians`
};

window.DOCUMENT_CORPUS = DOCUMENT_CORPUS;
