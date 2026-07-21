// ─── OPERATIONS BRAIN — EQUIPMENT DATA ────────────────────────────────────────
// Facility: Bharat Petroleum Refinery, Jamnagar Unit II
// ──────────────────────────────────────────────────────────────────────────────

const EQUIPMENT_DATA = {
  registry: [
    {
      tag: "E-101", name: "CDU Feed Preheater",
      type: "Shell & Tube Heat Exchanger", unit: "Crude Distillation Unit",
      manufacturer: "Godrej Industries", model: "BEM-750",
      installDate: "2018-03-12", designLife: 20,
      health: 68, healthTrend: "degrading", riskLevel: "medium",
      location: "CDU Area — Grid C-14",
      operatingParams: { temp: "320°C / 145°C", pressure: "12.1 / 1.8 bar", flow: "240 m³/h", efficiency: "71.2%" },
      alarms: [
        { code: "A-E101-01", message: "Fouling factor approaching limit (0.0003 of 0.0002 design)", severity: "warning", time: "2h ago" },
        { code: "A-E101-02", message: "Outlet temperature deviation >5°C from setpoint", severity: "info", time: "6h ago" }
      ],
      failureHistory: [
        { date: "2022-08-15", type: "Tube Leak", downtime: 36, cost: 420000, rca: "Corrosion from high chloride content" },
        { date: "2021-03-20", type: "Fouling-Related Efficiency Loss", downtime: 0, cost: 280000, rca: "Inadequate upstream desalting" }
      ],
      lastInspection: "2024-03-15", nextInspection: "2025-03-15",
      maintenanceDue: "2024-09-15", pmStatus: "upcoming",
      vibration: null, temperature: 318.4, pressure: 12.1
    },
    {
      tag: "P-205A", name: "Atmospheric Residue Transfer Pump A",
      type: "Centrifugal Pump", unit: "Crude Distillation Unit",
      manufacturer: "Flowserve", model: "DVMX Mark 3",
      installDate: "2019-06-01", designLife: 25,
      health: 82, healthTrend: "stable", riskLevel: "medium",
      location: "CDU Pump House — Bay 2",
      operatingParams: { flow: "220 m³/h", head: "84m", speed: "1485 rpm", temp: "340°C" },
      alarms: [
        { code: "A-P205A-01", message: "Vibration elevated: 3.8 mm/s RMS (limit: 4.5)", severity: "info", time: "45m ago" }
      ],
      failureHistory: [
        { date: "2024-02-14", type: "Mechanical Seal Failure", downtime: 14, cost: 185000, rca: "Bearing misalignment (0.12mm axial)" },
        { date: "2023-07-08", type: "Bearing Failure", downtime: 8, cost: 95000, rca: "Insufficient lubrication interval" },
        { date: "2023-01-22", type: "Mechanical Seal Failure", downtime: 12, cost: 175000, rca: "High vibration — root cause unresolved at time" }
      ],
      lastInspection: "2024-02-18", nextInspection: "2024-08-18",
      maintenanceDue: "2024-08-18", pmStatus: "upcoming",
      vibration: 3.8, temperature: 342.1, pressure: 12.8
    },
    {
      tag: "P-205B", name: "Atmospheric Residue Transfer Pump B",
      type: "Centrifugal Pump", unit: "Crude Distillation Unit",
      manufacturer: "Flowserve", model: "DVMX Mark 3",
      installDate: "2019-06-01", designLife: 25,
      health: 91, healthTrend: "stable", riskLevel: "low",
      location: "CDU Pump House — Bay 3",
      operatingParams: { flow: "0 m³/h (Standby)", head: "—", speed: "0 rpm", temp: "Ambient" },
      alarms: [],
      failureHistory: [
        { date: "2022-11-30", type: "Gland Packing Leak", downtime: 4, cost: 45000, rca: "Packing wear — scheduled replacement" }
      ],
      lastInspection: "2024-02-18", nextInspection: "2024-08-18",
      maintenanceDue: "2025-02-18", pmStatus: "ok",
      vibration: 0.1, temperature: 38.2, pressure: 0.1
    },
    {
      tag: "V-301", name: "Naphtha Splitter Column",
      type: "Distillation Column", unit: "Naphtha Processing",
      manufacturer: "Larsen & Toubro", model: "Custom — 28 Trays",
      installDate: "2018-03-12", designLife: 25,
      health: 88, healthTrend: "stable", riskLevel: "low",
      location: "Naphtha Unit — Grid F-08",
      operatingParams: { pressure: "8.5 bar", temp: "155°C top / 185°C base", feed: "95 m³/h", trays: "28 (valve)" },
      alarms: [],
      failureHistory: [
        { date: "2023-11-12", type: "PSV False Lift (Water Hammer)", downtime: 2, cost: 30000, rca: "Water hammer from rapid valve closure — see INC-2023-019" }
      ],
      lastInspection: "2023-09-20", nextInspection: "2025-09-20",
      maintenanceDue: "2025-09-20", pmStatus: "ok",
      vibration: null, temperature: 162.3, pressure: 8.5
    },
    {
      tag: "HE-402", name: "Kerosene–Crude Pre-Flash Heat Exchanger",
      type: "Shell & Tube Heat Exchanger", unit: "Kerosene Section",
      manufacturer: "HRS Process Systems", model: "AEU-580",
      installDate: "2020-09-15", designLife: 20,
      health: 74, healthTrend: "degrading", riskLevel: "medium",
      location: "CDU Area — Grid D-11",
      operatingParams: { temp: "220°C / 140°C", pressure: "9.8 / 1.6 bar", flow: "110 m³/h", efficiency: "68.5%" },
      alarms: [
        { code: "A-HE402-01", message: "Heat duty below design by 14% — schedule cleaning", severity: "warning", time: "1d ago" }
      ],
      failureHistory: [
        { date: "2024-01-10", type: "Progressive Fouling Efficiency Loss", downtime: 0, cost: 95000, rca: "Crude incompatibility — asphaltene deposition" }
      ],
      lastInspection: "2024-01-18", nextInspection: "2024-07-18",
      maintenanceDue: "2024-08-01", pmStatus: "overdue",
      vibration: null, temperature: 218.7, pressure: 9.8
    },
    {
      tag: "FV-102", name: "CDU Feed Control Valve",
      type: "Control Valve", unit: "Crude Distillation Unit",
      manufacturer: "Fisher Controls", model: "CV-Series EHT",
      installDate: "2019-01-20", designLife: 15,
      health: 94, healthTrend: "stable", riskLevel: "low",
      location: "CDU — Feed Line, Grid C-12",
      operatingParams: { position: "67%", flow: "240 m³/h", dropPressure: "1.4 bar", actuator: "Rotork IQT" },
      alarms: [],
      failureHistory: [
        { date: "2023-06-18", type: "Actuator Failure", downtime: 6, cost: 75000, rca: "Moisture ingress — monsoon season" }
      ],
      lastInspection: "2024-01-15", nextInspection: "2025-01-15",
      maintenanceDue: "2025-01-15", pmStatus: "ok",
      vibration: null, temperature: 112.4, pressure: 13.5
    },
    {
      tag: "PSV-203", name: "High-Pressure Separator Safety Valve",
      type: "Pressure Safety Valve", unit: "Crude Distillation Unit",
      manufacturer: "Leser GmbH", model: "526-SAL",
      installDate: "2018-03-12", designLife: 20,
      health: 79, healthTrend: "watchlist", riskLevel: "high",
      location: "CDU — HP Separator, Grid C-16",
      operatingParams: { setPoint: "13.0 bar", relievingPressure: "14.3 bar", orifice: "Type D", lastLift: "2023-11-12 (False)" },
      alarms: [
        { code: "A-PSV203-01", message: "⚠️ 2 false lift events in last 12 months — review required", severity: "critical", time: "Ongoing" }
      ],
      failureHistory: [
        { date: "2023-11-12", type: "False Lift — Water Hammer", downtime: 0, cost: 45000, rca: "Water hammer from rapid FV-102 closure — see INC-2023-019" },
        { date: "2023-04-02", type: "False Lift — Set Pressure Drift", downtime: 0, cost: 30000, rca: "Spring relaxation — recalibrated" }
      ],
      lastInspection: "2024-01-10", nextInspection: "2024-07-10",
      maintenanceDue: "2024-07-10", pmStatus: "overdue",
      vibration: null, temperature: 145.2, pressure: 13.1
    },
    {
      tag: "C-501", name: "Debutanizer Column",
      type: "Distillation Column", unit: "LPG Recovery",
      manufacturer: "ISGEC Heavy Engineering", model: "Custom — 32 Trays",
      installDate: "2021-03-08", designLife: 25,
      health: 95, healthTrend: "stable", riskLevel: "low",
      location: "LPG Unit — Grid H-04",
      operatingParams: { pressure: "14.2 bar", temp: "68°C top / 185°C base", feed: "42 m³/h", trays: "32" },
      alarms: [],
      failureHistory: [],
      lastInspection: "2023-11-20", nextInspection: "2025-11-20",
      maintenanceDue: "2025-11-20", pmStatus: "ok",
      vibration: null, temperature: 71.4, pressure: 14.2
    }
  ],

  workOrders: [
    { id: "WO-2024-1047", equipment: "HE-402", type: "Corrective", status: "open", priority: "high", description: "Chemical cleaning required — heat duty 14% below design", assignee: "Vijay Kumar", created: "2024-07-15", due: "2024-08-01" },
    { id: "WO-2024-1041", equipment: "PSV-203", type: "Inspection", status: "open", priority: "critical", description: "Overdue semi-annual inspection + false lift investigation", assignee: "Anand Krishnan", created: "2024-07-10", due: "2024-07-25" },
    { id: "WO-2024-0992", equipment: "P-205A", type: "Preventive", status: "scheduled", priority: "medium", description: "Alignment check + vibration analysis (elevated: 3.8 mm/s)", assignee: "Sanjay Rao", created: "2024-07-12", due: "2024-08-18" },
    { id: "WO-2024-0971", equipment: "E-101", type: "Preventive", status: "scheduled", priority: "medium", description: "Tube inspection + fouling factor measurement Q3 2024", assignee: "Anand Krishnan", created: "2024-07-08", due: "2024-09-15" },
    { id: "WO-2024-0943", equipment: "FV-102", type: "Preventive", status: "in-progress", priority: "low", description: "Actuator lubrication + positioner calibration", assignee: "Mohan Das", created: "2024-07-01", due: "2024-07-31" },
    { id: "WO-2024-0892", equipment: "P-205A", type: "Corrective", status: "completed", priority: "critical", description: "Mechanical seal replacement — emergency", assignee: "Mohan Das", created: "2024-02-14", due: "2024-02-18", completed: "2024-02-18" }
  ],

  kpiSummary: {
    mtbf: { value: 4847, unit: "hours", trend: "+8.2%", label: "MTBF (Fleet Avg)" },
    mttr: { value: 8.4, unit: "hours", trend: "-12.5%", label: "MTTR (Avg)" },
    plannedVsUnplanned: { planned: 73, unplanned: 27, trend: "+5% planned" },
    overdueWorkOrders: 2,
    criticalAlarms: 1,
    predictedFailures30d: 2
  },

  healthTrend: [
    { month: "Jan", avgHealth: 84 }, { month: "Feb", avgHealth: 79 }, { month: "Mar", avgHealth: 81 },
    { month: "Apr", avgHealth: 83 }, { month: "May", avgHealth: 82 }, { month: "Jun", avgHealth: 80 },
    { month: "Jul", avgHealth: 81 }
  ]
};

window.EQUIPMENT_DATA = EQUIPMENT_DATA;
