// ─── OPERATIONS BRAIN — COMPLIANCE DATA ───────────────────────────────────────
// Regulatory frameworks: OISD, PESO, Factory Act, PCB, BIS
// ──────────────────────────────────────────────────────────────────────────────

const COMPLIANCE_DATA = {
  overallScore: 92.4,
  lastAuditDate: "2024-04-02",
  nextAuditDate: "2025-04-01",
  totalRequirements: 342,
  compliantItems: 316,
  gapItems: 26,
  criticalGaps: 3,

  frameworks: [
    {
      id: "OISD-105",
      name: "OISD Standard 105",
      fullName: "Inspection of Pressure Vessels, Heat Exchangers & Piping Systems",
      authority: "Oil Industry Safety Directorate (OISD)",
      score: 94,
      totalReqs: 87,
      compliant: 82,
      gaps: 5,
      criticalGaps: 1,
      color: "#00D4FF",
      requirements: [
        { id: "OISD-105-R01", clause: "5.2.1", desc: "Pressure vessel inspection frequency — every 4 years maximum", status: "compliant", evidence: "Inspection-E101-Mar2024, OISD-105-Compliance-2024" },
        { id: "OISD-105-R02", clause: "5.3.4", desc: "Corrosion monitoring programme with UT thickness measurement", status: "compliant", evidence: "WO-2024-0971, Inspection-E101-Mar2024" },
        { id: "OISD-105-R03", clause: "6.1.2", desc: "Pressure safety valve testing and calibration records — semi-annual", status: "gap", gap: "PSV-203 semi-annual inspection overdue since Jul-10, 2024", severity: "critical", estimatedClosure: "2024-07-25" },
        { id: "OISD-105-R04", clause: "7.2.1", desc: "Corrosion inhibitor injection system — documented programme", status: "compliant", evidence: "PM-SCHEDULE-2024, Operations Log" },
        { id: "OISD-105-R05", clause: "8.1.4", desc: "Instrument calibration records maintained within validity period", status: "gap", gap: "TIC-201 and FIC-305 calibration records expired Jun-15, 2024", severity: "major", estimatedClosure: "2024-07-30" },
        { id: "OISD-105-R06", clause: "9.3.2", desc: "Piping inspection programme — API-570 compliant", status: "gap", gap: "Section 7 piping (CDU-VDU interconnect) CML inspection overdue", severity: "minor", estimatedClosure: "2024-08-15" }
      ]
    },
    {
      id: "OISD-116",
      name: "OISD Standard 116",
      fullName: "Fire Protection Facilities for Petroleum Refineries and Oil/Gas Processing Plants",
      authority: "Oil Industry Safety Directorate (OISD)",
      score: 87,
      totalReqs: 124,
      compliant: 108,
      gaps: 16,
      criticalGaps: 2,
      color: "#FFB700",
      requirements: [
        { id: "OISD-116-R01", clause: "4.1.3", desc: "Fire water system capacity — 3,000 m³/hr minimum for Category II refinery", status: "compliant", evidence: "FW-System-Audit-2024" },
        { id: "OISD-116-R02", clause: "5.2.1", desc: "Foam system coverage for crude tankage — 20 minutes capacity", status: "compliant", evidence: "Tank-Farm-Inspection-2024" },
        { id: "OISD-116-R03", clause: "6.3.4", desc: "Fired heater burner inspection records — annual minimum", status: "gap", gap: "F-101 and F-102 burner inspection records missing for 2023-24", severity: "critical", estimatedClosure: "2024-08-31" },
        { id: "OISD-116-R04", clause: "7.1.2", desc: "Fixed gas detection system — tested quarterly", status: "gap", gap: "H2S detectors in CDU Bay 4 — Q2 2024 test not documented", severity: "major", estimatedClosure: "2024-07-20" },
        { id: "OISD-116-R05", clause: "8.4.1", desc: "Emergency shutdown system — annual functional test", status: "compliant", evidence: "ESD-Test-Report-2024" },
        { id: "OISD-116-R06", clause: "9.2.3", desc: "Passive fire protection inspection — every 3 years", status: "gap", gap: "PFP on V-301 structural supports not inspected since 2021", severity: "minor", estimatedClosure: "2024-09-30" }
      ]
    },
    {
      id: "PESO",
      name: "PESO Regulations",
      fullName: "Petroleum & Explosives Safety Organisation — Petroleum Storage Rules",
      authority: "PESO, Ministry of Commerce & Industry",
      score: 98,
      totalReqs: 56,
      compliant: 55,
      gaps: 1,
      criticalGaps: 0,
      color: "#00E88A",
      requirements: [
        { id: "PESO-R01", clause: "Rule 41", desc: "Storage tank earthing and bonding — inspected annually", status: "compliant", evidence: "Electrical-Inspection-2024" },
        { id: "PESO-R02", clause: "Rule 53", desc: "Flame arrestors on storage tank vents — certified and tested", status: "compliant", evidence: "Flame-Arrestor-Cert-2024" },
        { id: "PESO-R03", clause: "Rule 67", desc: "Licensed premises — PESO licence valid and displayed", status: "compliant", evidence: "PESO-Licence-2023-26" },
        { id: "PESO-R04", clause: "Rule 112", desc: "Petroleum product quality — BIS certification maintained", status: "gap", gap: "BIS certificate for RoHS-compliant fuel additives renewal pending", severity: "minor", estimatedClosure: "2024-08-01" }
      ]
    },
    {
      id: "FACTORY-ACT",
      name: "Factories Act 1948",
      fullName: "The Factories Act, 1948 — Occupational Health, Safety & Welfare",
      authority: "Chief Inspector of Factories, Gujarat",
      score: 91,
      totalReqs: 68,
      compliant: 62,
      gaps: 6,
      criticalGaps: 0,
      color: "#A855F7",
      requirements: [
        { id: "FA-R01", clause: "Sec 13", desc: "Ventilation and temperature control in work areas", status: "compliant", evidence: "Work-Environment-Survey-2024" },
        { id: "FA-R02", clause: "Sec 21", desc: "Machinery fencing and guarding — rotating equipment", status: "compliant", evidence: "Safety-Inspection-2024" },
        { id: "FA-R03", clause: "Sec 42", desc: "Washing facilities — one unit per 25 workers for hazardous processes", status: "gap", gap: "CDU Area Block C — insufficient washing stations (8 for 28 workers)", severity: "minor", estimatedClosure: "2024-08-31" },
        { id: "FA-R04", clause: "Sec 44", desc: "First-aid boxes — one per 150 workers, inspected monthly", status: "gap", gap: "3 of 12 first-aid boxes not restocked in Q2 2024", severity: "minor", estimatedClosure: "2024-07-25" },
        { id: "FA-R05", clause: "Sec 46", desc: "Canteen facility — mandatory for >250 workers", status: "compliant", evidence: "Welfare-Inspection-2024" },
        { id: "FA-R06", clause: "Sec 59", desc: "Overtime register maintained for excess-hours workers", status: "gap", gap: "Overtime register not updated for maintenance crew June 2024", severity: "minor", estimatedClosure: "2024-07-20" }
      ]
    },
    {
      id: "PCB-NORMS",
      name: "PCB Environmental Norms",
      fullName: "Pollution Control Board — Environmental Compliance, Air & Water Standards",
      authority: "Gujarat Pollution Control Board (GPCB)",
      score: 100,
      totalReqs: 7,
      compliant: 7,
      gaps: 0,
      criticalGaps: 0,
      color: "#00E88A",
      requirements: [
        { id: "PCB-R01", clause: "EMP-4.1", desc: "Stack emissions — SOx/NOx within GPCB limits", status: "compliant", evidence: "CEMS-Monthly-Report-Jul2024" },
        { id: "PCB-R02", clause: "EMP-4.2", desc: "Effluent treatment — API separator efficiency >95%", status: "compliant", evidence: "ETP-Performance-Jul2024" },
        { id: "PCB-R03", clause: "EMP-5.1", desc: "Hazardous waste manifest system — Schedule I & II waste", status: "compliant", evidence: "HW-Manifest-Q1Q2-2024" }
      ]
    }
  ],

  recentAlerts: [
    { id: "CA-001", severity: "critical", framework: "OISD-105", title: "PSV-203 Inspection Overdue", desc: "Semi-annual PSV inspection 10 days overdue — regulatory non-compliance risk", date: "2024-07-10", daysOverdue: 10 },
    { id: "CA-002", severity: "major", framework: "OISD-116", title: "Burner Inspection Records Missing", desc: "F-101 and F-102 burner inspection records for FY2023-24 not found in DMS", date: "2024-06-01", daysOverdue: 49 },
    { id: "CA-003", severity: "major", framework: "OISD-105", title: "Instrument Calibration Expired", desc: "TIC-201 and FIC-305 calibration certificates expired Jun-15, 2024", date: "2024-06-15", daysOverdue: 35 }
  ],

  auditEvidence: {
    autoGenerated: [
      { docId: "DOC-003", title: "OISD-105 Compliance Audit 2024", covers: ["OISD-105"] },
      { docId: "DOC-004", title: "E-101 Inspection Report Mar 2024", covers: ["OISD-105"] },
      { docId: "DOC-007", title: "HAZOP Study V-301 2023", covers: ["OISD-116", "PESO"] },
      { docId: "DOC-009", title: "CDU Startup SOP", covers: ["FACTORY-ACT"] }
    ]
  }
};

window.COMPLIANCE_DATA = COMPLIANCE_DATA;
