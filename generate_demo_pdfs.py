"""Generate demo industrial PDFs for Operations Brain hackathon."""
import os
from fpdf import FPDF

OUTPUT_DIR = "demo-documents"
os.makedirs(OUTPUT_DIR, exist_ok=True)


class PDF(FPDF):
    def __init__(self, doc_type=""):
        super().__init__()
        self.doc_type = doc_type

    def header(self):
        self.set_fill_color(10, 18, 32)
        self.rect(0, 0, 210, 16, "F")
        self.set_text_color(100, 200, 240)
        self.set_font("Helvetica", "B", 9)
        self.set_xy(8, 4)
        self.cell(130, 8, "BHARAT PETROLEUM REFINERY | JAMNAGAR UNIT II", border=0)
        self.set_text_color(140, 160, 180)
        self.set_font("Helvetica", "", 8)
        self.set_xy(150, 4)
        self.cell(50, 8, self.doc_type, align="R", border=0)
        self.ln(18)

    def footer(self):
        self.set_y(-12)
        self.set_text_color(120, 140, 160)
        self.set_font("Helvetica", "", 7)
        self.cell(0, 6, f"CONFIDENTIAL - INTERNAL USE ONLY  |  Page {self.page_no()}", align="C")

    def title_block(self, main, sub, meta, bg=(245, 248, 255), tc=(10, 40, 80)):
        self.set_fill_color(*bg)
        y = self.get_y()
        self.rect(8, y, 194, 28, "F")
        self.set_xy(11, y + 3)
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(*tc)
        self.cell(0, 7, main, border=0)
        self.ln(7)
        self.set_x(11)
        self.set_font("Helvetica", "B", 9)
        self.cell(0, 6, sub, border=0)
        self.ln(6)
        self.set_x(11)
        self.set_font("Helvetica", "", 7.5)
        self.set_text_color(80, 80, 80)
        self.cell(0, 5, meta, border=0)
        self.ln(10)

    def sec(self, title, rgb=(0, 80, 160)):
        self.set_fill_color(*rgb)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 8.5)
        self.cell(0, 7, "  " + title, fill=True)
        self.ln(2)
        self.set_text_color(20, 20, 20)

    def kv(self, k, v, kw=55):
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(60, 80, 100)
        self.set_x(10)
        self.cell(kw, 6, k + ":")
        self.set_font("Helvetica", "", 8)
        self.set_text_color(20, 20, 20)
        self.multi_cell(0, 6, str(v))

    def body(self, txt):
        self.set_font("Helvetica", "", 8)
        self.set_text_color(40, 40, 40)
        self.set_x(10)
        self.multi_cell(0, 5.5, txt)
        self.ln(1)

    def hr(self):
        self.set_draw_color(200, 210, 220)
        self.line(8, self.get_y(), 202, self.get_y())
        self.ln(3)

    def thead(self, cols_widths, fill=(220, 235, 255)):
        self.set_fill_color(*fill)
        self.set_font("Helvetica", "B", 7)
        self.set_text_color(10, 40, 80)
        for col, w in cols_widths:
            self.cell(w, 6, col, border=1, fill=True, align="C")
        self.ln()

    def trow(self, vals_widths, even=True):
        self.set_font("Helvetica", "", 7)
        self.set_text_color(20, 20, 20)
        if even:
            self.set_fill_color(248, 250, 255)
        else:
            self.set_fill_color(255, 255, 255)
        for val, w in vals_widths:
            self.cell(w, 5.5, str(val), border=1, fill=True)
        self.ln()

    def bullet(self, txt, indent=12):
        self.set_x(indent)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(40, 40, 40)
        self.cell(5, 5.5, "-", border=0)
        self.multi_cell(0, 5.5, txt)


# ── DOC 1: Equipment Inspection Report ───────────────────────────────────────
def create_inspection():
    p = PDF("INSPECTION REPORT")
    p.add_page()
    p.title_block(
        "EQUIPMENT INSPECTION REPORT",
        "E-101: CDU Feed Preheater | Comprehensive Inspection Q1-2024",
        "Doc: INS-E101-2024-Q1 | Rev: 0 | Date: 15-Mar-2024 | Dept: Inspection",
        bg=(240, 248, 255), tc=(10, 50, 100),
    )

    p.sec("1. EQUIPMENT IDENTIFICATION", (10, 60, 130))
    items = [
        ("Equipment Tag", "E-101"),
        ("Equipment Name", "CDU Feed Preheater"),
        ("Equipment Type", "Shell and Tube Heat Exchanger (BEM Type)"),
        ("Unit / Area", "Crude Distillation Unit (CDU) - Grid C-14"),
        ("Manufacturer", "Godrej Industries Ltd., Mumbai"),
        ("Model", "BEM-750 / DWG-E101-2018-Rev4"),
        ("Date Installed", "March 12, 2018"),
        ("Design Life", "20 years (until 2038)"),
        ("Last Major Overhaul", "January 2024 - Chemical Cleaning (WO-2024-0743)"),
        ("Applicable Standards", "TEMA-C, API-660, ASME Sec VIII Div 1, IS-2825"),
    ]
    for k, v in items:
        p.kv(k, v)
    p.ln(3)

    p.sec("2. DESIGN vs OPERATING PARAMETERS", (20, 80, 140))
    p.thead([("Parameter", 50), ("Shell Side (Crude)", 46), ("Tube Side (Kerosene)", 46), ("Design Limit", 46)])
    rows = [
        ["Operating Pressure", "12.1 bar g", "9.8 bar g", "15.0 / 12.5 bar g"],
        ["Operating Temperature", "318 degC (inlet)", "220 degC (inlet)", "380 degC / 260 degC"],
        ["Flow Rate", "240 m3/h", "110 m3/h", "280 m3/h maximum"],
        ["Fluid", "Atmospheric Crude", "Kerosene (Kero-1)", "Refer MSDS on file"],
        ["MAWP", "15.5 bar g", "13.0 bar g", "Last hydro-tested 2021"],
    ]
    for i, row in enumerate(rows):
        p.trow(list(zip(row, [50, 46, 46, 46])), even=(i % 2 == 0))
    p.ln(4)

    p.sec("3. INSPECTION FINDINGS", (160, 40, 0))
    findings = [
        (
            "3.1 Tube Bundle Condition",
            "12% tube plugging (37 of 312 tubes have active plugs). Plug locations concentrated near inlet zone "
            "(rows 1-4) indicating preferential fouling. Tube wall UT average: 3.1mm vs design 3.5mm. "
            "Corrosion rate: 0.12 mm/year. Estimated remaining life: 3.0 years (replacement by Q1-2027).",
        ),
        (
            "3.2 Shell Side Condition",
            "No visible pitting or corrosion anomalies. Baffle spacing intact. 2 baffle tie rods showing minor "
            "corrosion - monitored, no action required this cycle. UT spot checks at 14 locations: all within "
            "acceptable range (min 8.9mm vs 8.0mm minimum allowed).",
        ),
        (
            "3.3 Fouling Assessment",
            "Current efficiency: 71.2% vs design 85%. Calculated fouling factor: 0.0003 m2.K/W vs design "
            "0.0002 m2.K/W. Chemical cleaning in Jan-2024 (WO-2024-0743) partially restored performance. "
            "Recommend next cleaning within 9 months or when efficiency drops below 65%.",
        ),
        (
            "3.4 NDT Summary",
            "Radiographic Testing (RT): 4 weld samples - all acceptable per ASME-B31.3. "
            "Hydrostatic test: Shell at 22.5 bar for 30 minutes - no leaks. "
            "Magnetic Particle Testing: Shell-to-nozzle welds - no indications found.",
        ),
    ]
    for title, body in findings:
        p.set_font("Helvetica", "B", 8)
        p.set_text_color(100, 30, 0)
        p.set_x(10)
        p.cell(0, 6, title, border=0)
        p.ln()
        p.body(body)
        p.hr()

    p.sec("4. RECOMMENDATIONS", (0, 100, 40))
    recs = [
        "Monitor tube-side outlet temperature monthly - alert if drops below 215 degC",
        "Schedule chemical cleaning by Sep-2024 if efficiency falls below 68% of design",
        "Include N1 nozzle weld overlay repair in next turnaround T/A-2026",
        "Evaluate full tube bundle replacement at next major inspection Q1-2027",
        "Review crude desalting performance to reduce chloride loading on tube bundle",
    ]
    for r in recs:
        p.bullet(r)
    p.ln(3)

    p.sec("5. SIGN-OFF", (60, 60, 60))
    for role, name, date in [
        ("Inspection Engineer", "Anand Krishnan - Sr. Inspector", "15-Mar-2024"),
        ("TPI (Bureau Veritas)", "Third Party Inspector", "15-Mar-2024"),
        ("HSE Review", "Priya Sharma - HSE Manager", "18-Mar-2024"),
        ("Engineering Approval", "Rajan Mehta - Sr. Process Engr", "20-Mar-2024"),
    ]:
        p.set_x(10)
        p.set_font("Helvetica", "", 8)
        p.set_text_color(40, 40, 40)
        p.cell(60, 6, role)
        p.cell(65, 6, name)
        p.cell(40, 6, date)
        p.cell(30, 6, "_____________")
        p.ln()

    path = os.path.join(OUTPUT_DIR, "INS-E101-2024-Inspection-Report.pdf")
    p.output(path)
    print(f"Created: INS-E101-2024-Inspection-Report.pdf  ({os.path.getsize(path)//1024} KB)")


# ── DOC 2: Root Cause Analysis ───────────────────────────────────────────────
def create_rca():
    p = PDF("ROOT CAUSE ANALYSIS")
    p.add_page()
    p.title_block(
        "ROOT CAUSE ANALYSIS REPORT",
        "P-205A Unplanned Shutdown - Mechanical Seal Failure | 14 February 2024",
        "Doc: RCA-2024-031 | Status: FINAL | Downtime: 14 hrs | Production Loss: ~Rs 18.5 Lakhs",
        bg=(255, 240, 240), tc=(140, 20, 20),
    )

    p.sec("1. INCIDENT SUMMARY", (140, 30, 30))
    p.body(
        "At 02:47 hrs on 14-Feb-2024, Atmospheric Residue Transfer Pump P-205A tripped on high vibration "
        "alarm (A-P205A-HH: 6.2 mm/s RMS, trip setpoint 6.0 mm/s). The mechanical seal subsequently failed, "
        "resulting in atmospheric residue leakage to the drain system. P-205B brought online in 22 minutes. "
        "Total repair downtime: 14 hours. This is the THIRD seal/bearing failure for P-205A in 18 months - "
        "a significant reliability concern requiring systemic investigation."
    )

    p.sec("2. EVENT TIMELINE", (30, 80, 150))
    events = [
        ("13-Feb 18:00", "Shift handover - P-205A vibration noted at 3.2 mm/s (normal range: below 3.0)"),
        ("13-Feb 23:15", "Vibration increased to 3.8 mm/s - operator notified shift supervisor"),
        ("14-Feb 01:30", "Vibration at 4.5 mm/s - WARNING alarm. Supervisor decided to continue monitoring."),
        ("14-Feb 02:47", "Vibration 6.2 mm/s - AUTO TRIP on HH alarm. Mechanical seal failure initiated."),
        ("14-Feb 02:51", "Hydrocarbon leak detected at seal area. Unit isolated. P-205B started."),
        ("14-Feb 05:30", "P-205A opened. Confirmed seal face damage and bearing failure."),
        ("14-Feb 07:00", "OEM Flowserve field tech on site. Shaft run-out: 0.08mm (limit: 0.05mm) - straightened."),
        ("14-Feb 08:00", "New John Crane Type 8B1 seal installed per OEM torque specifications."),
        ("14-Feb 11:00", "LASER ALIGNMENT: Angular 0.02mm (PASS), Offset 0.03mm (PASS). Tolerance +/-0.05mm."),
        ("14-Feb 16:45", "P-205A online. Final vibration: 2.1 mm/s. Seal flush confirmed. WO closed."),
    ]
    for time, event in events:
        p.set_x(10)
        p.set_font("Helvetica", "B", 8)
        p.set_text_color(30, 80, 150)
        p.cell(35, 5.5, time)
        p.set_font("Helvetica", "", 8)
        p.set_text_color(30, 30, 30)
        p.multi_cell(0, 5.5, event)
    p.ln(2)

    p.sec("3. ROOT CAUSE ANALYSIS - 5 WHY METHOD", (80, 40, 120))
    whys = [
        ("WHY 1", "Why did the seal fail?",
         "High vibration (6.2 mm/s) exceeded seal design limit. API-682 limit for Type 1 seal: 5.0 mm/s. "
         "Dynamic overload caused seal face spalling and failure."),
        ("WHY 2", "Why was vibration high?",
         "Bearing housing showed 0.12mm axial misalignment (tolerance: +/-0.05mm per OEM Flowserve manual "
         "Table 4.2). Misalignment caused forced vibration at 1x running speed (24.75 Hz at 1485 rpm)."),
        ("WHY 3", "Why was bearing misaligned?",
         "Post-repair alignment in Jul-2023 (WO-2023-1124) used dial gauge method. Residual error of "
         "0.12mm not detected - outside capability of dial gauge (typical accuracy: +/-0.08mm)."),
        ("WHY 4", "Why was laser alignment not used?",
         "Maintenance procedure SOP-MAINT-2023-031 specified dial gauge as the required method. "
         "Laser alignment tool (Pruftechnik ROTALIGN) was in store but not called out in the work order."),
        ("ROOT CAUSE - WHY 5", "Why did procedure not require laser alignment?",
         "CRITICAL: SOP-MAINT-2023-031 was written in 2019 and was NOT updated after Flowserve Technical "
         "Bulletin TB-2021-14 was issued, which mandated laser alignment for all Mark 3 pumps in high-temp "
         "service above 300 degC. OEM bulletin was received but not actioned in procedure update system."),
    ]
    for num, q, a in whys:
        p.set_x(10)
        p.set_font("Helvetica", "B", 8)
        if "ROOT" in num:
            p.set_text_color(160, 20, 20)
        else:
            p.set_text_color(80, 40, 120)
        p.cell(38, 6, num + ":")
        p.set_font("Helvetica", "B", 8)
        p.set_text_color(30, 30, 80)
        p.multi_cell(0, 6, q)
        p.set_x(48)
        p.set_font("Helvetica", "", 8)
        p.set_text_color(40, 40, 40)
        p.multi_cell(0, 5.5, a)
        p.ln(1)

    p.sec("4. CORRECTIVE ACTIONS (CAPA)", (0, 100, 40))
    p.thead([("CAPA", 18), ("Priority", 22), ("Action Required", 80), ("Owner", 32), ("Due", 22), ("Status", 20)])
    capas = [
        ("CA-01", "IMMEDIATE", "Update SOP: mandate laser alignment for Mark 3 pumps above 300 degC", "V. Kumar", "28-Feb-24", "CLOSED"),
        ("CA-02", "IMMEDIATE", "Install continuous vibration monitoring on P-205A and P-205B", "Engineering", "31-Mar-24", "IN PROG"),
        ("CA-03", "SHORT", "Review all procedures vs Flowserve TBs issued 2020-2024", "Reliability", "30-Apr-24", "IN PROG"),
        ("CA-04", "SHORT", "Define vibration escalation matrix in shift handover SOP", "S. Iyer", "31-Mar-24", "OPEN"),
        ("CA-05", "LONG", "API-610 pump reliability audit - address recurring failure pattern", "Dr. M. Nair", "30-Jun-24", "OPEN"),
    ]
    for i, row in enumerate(capas):
        p.trow(list(zip(row, [18, 22, 80, 32, 22, 20])), even=(i % 2 == 0))

    path = os.path.join(OUTPUT_DIR, "RCA-2024-031-P205A-Seal-Failure.pdf")
    p.output(path)
    print(f"Created: RCA-2024-031-P205A-Seal-Failure.pdf  ({os.path.getsize(path)//1024} KB)")


# ── DOC 3: Compliance Audit ──────────────────────────────────────────────────
def create_compliance():
    p = PDF("COMPLIANCE AUDIT")
    p.add_page()
    p.title_block(
        "REGULATORY COMPLIANCE AUDIT REPORT",
        "OISD Standard 105 - Pressure Vessels, Heat Exchangers and Piping | 2024",
        "Audit Ref: OISD-105-2024 | Date: 02-Apr-2024 | Score: 94% | Status: COMPLIANT WITH GAPS",
        bg=(245, 240, 255), tc=(60, 0, 120),
    )

    p.sec("1. AUDIT OVERVIEW", (60, 0, 120))
    for k, v in [
        ("Standard", "OISD-105 (4th Edition, 2022) - Inspection of Pressure Vessels and Piping"),
        ("Authority", "Oil Industry Safety Directorate (OISD), Ministry of Petroleum and Natural Gas"),
        ("Auditors", "Internal HSE Team + Third Party: Bureau Veritas India Pvt. Ltd."),
        ("Total Requirements", "87"),
        ("Compliant Items", "82 (94.3%)"),
        ("Gaps Identified", "5 (1 Critical, 2 Major, 2 Minor)"),
        ("Prior Audit Score", "91% in 2023 - improvement of +3% year-on-year"),
        ("Next Audit", "Scheduled Q1-2025"),
    ]:
        p.kv(k, v)
    p.ln(3)

    p.sec("2. EQUIPMENT COMPLIANCE STATUS", (20, 80, 140))
    p.thead([("Tag", 22), ("Equipment Name", 58), ("Type", 38), ("Last Inspection", 40), ("Status", 36)])
    eq_rows = [
        ["E-101", "CDU Feed Preheater", "Shell and Tube HX", "15-Mar-2024", "COMPLIANT"],
        ["V-301", "Naphtha Splitter Column", "Distillation Column", "20-Sep-2023", "COMPLIANT"],
        ["PSV-203", "HP Separator Safety Valve", "Pressure Safety Valve", "10-Jan-2024 (OVERDUE)", "** CRITICAL GAP **"],
        ["HE-402", "Kerosene-Crude HX", "Shell and Tube HX", "18-Jan-2024", "COMPLIANT"],
        ["C-501", "Debutanizer Column", "Distillation Column", "20-Nov-2023", "COMPLIANT"],
    ]
    for i, row in enumerate(eq_rows):
        is_gap = "CRITICAL" in row[4]
        if is_gap:
            p.set_fill_color(255, 230, 230)
        else:
            p.set_fill_color(248, 252, 248)
        p.set_font("Helvetica", "", 7)
        for val, w in zip(row, [22, 58, 38, 40, 36]):
            if is_gap and "CRITICAL" in val:
                p.set_text_color(180, 0, 0)
            else:
                p.set_text_color(20, 20, 20)
            p.cell(w, 5.5, val, border=1, fill=True)
        p.ln()
    p.ln(4)

    p.sec("3. COMPLIANCE GAPS DETAIL", (160, 40, 0))
    gaps = [
        ("CRITICAL", "Clause 6.1.2",
         "PSVs in high-pressure / H2S service to be tested every 6 months maximum.",
         "PSV-203 (13.0 bar set pressure, H2S service) inspection is overdue by 10 days at time of this audit. "
         "Equipment had 2 false lift events in last 12 months (INC-2023-019, INC-2023-031). Elevated risk profile.",
         "Raise work order immediately. Target completion: 25-Jul-2024. Escalate to plant manager if not closed by 31-Jul-2024."),
        ("MAJOR", "Clause 8.1.4",
         "All pressure instruments to have valid calibration within CMMS tracking system.",
         "TIC-201 (CDU Overhead Temperature) and FIC-305 (Kerosene Draw-off Flow) calibration expired 15-Jun-2024. Both in active service.",
         "Schedule calibration by 30-Jul-2024. Interim operation per MOC-2024-047 with enhanced manual verification."),
        ("MINOR", "Clause 9.3.2",
         "Piping CML inspections per API-570 at risk-based intervals.",
         "CDU-VDU interconnect piping: 2 CML locations last inspected 2021, overdue for 3-year cycle.",
         "Include in Q3-2024 inspection schedule. Target: 15-Aug-2024."),
    ]
    for sev, clause, req, finding, action in gaps:
        c = (180, 0, 0) if sev == "CRITICAL" else (160, 90, 0) if sev == "MAJOR" else (0, 80, 140)
        p.set_x(10)
        p.set_font("Helvetica", "B", 8.5)
        p.set_text_color(*c)
        p.cell(0, 7, f"[{sev}]  {clause}", border=0)
        p.ln()
        for label, text in [("Requirement", req), ("Finding", finding), ("Action Required", action)]:
            p.set_x(12)
            p.set_font("Helvetica", "B", 7.5)
            p.set_text_color(60, 60, 60)
            p.cell(32, 5.5, label + ":")
            p.set_font("Helvetica", "", 7.5)
            p.set_text_color(30, 30, 30)
            p.multi_cell(0, 5.5, text)
        p.hr()

    p.sec("4. CONCLUSION", (0, 100, 40))
    p.body(
        "Bharat Petroleum Refinery Jamnagar Unit II scores 94% on OISD-105, above the industry average of 89% "
        "for refineries of this size and vintage. The Critical Gap (PSV-203 inspection overdue) requires IMMEDIATE "
        "attention. Facility must submit a Corrective Action Plan to the OISD Regional Office within 7 days. "
        "The next scheduled compliance review is Q1-2025."
    )

    path = os.path.join(OUTPUT_DIR, "OISD-105-Compliance-Audit-2024.pdf")
    p.output(path)
    print(f"Created: OISD-105-Compliance-Audit-2024.pdf  ({os.path.getsize(path)//1024} KB)")


# ── DOC 4: SOP ───────────────────────────────────────────────────────────────
def create_sop():
    p = PDF("OPERATING PROCEDURE")
    p.add_page()
    p.title_block(
        "STANDARD OPERATING PROCEDURE",
        "SOP-MAINT-2024-047: Heat Exchanger Chemical Cleaning",
        "Rev: 3 | Effective: 08-Jan-2024 | Owner: Vijay Kumar, Sr. Maintenance Engineer | Dept: Maintenance",
        bg=(240, 255, 245), tc=(0, 100, 50),
    )

    p.sec("1. PURPOSE AND SCOPE", (0, 100, 50))
    p.body(
        "This SOP covers chemical cleaning of shell and tube heat exchangers: E-101 (CDU Feed Preheater), "
        "E-102 (CDU Overhead Condenser) and HE-402 (Kerosene-Crude HX). Uses NaOH alkaline circulation method "
        "for organic fouling removal followed by HCl acid cleaning for inorganic scale. Apply when fouling factor "
        "exceeds 0.0002 m2.K/W or heat duty drops below 72% of design value."
    )

    p.sec("2. SAFETY REQUIREMENTS - READ BEFORE STARTING", (160, 30, 0))
    p.set_font("Helvetica", "B", 8)
    p.set_text_color(160, 30, 0)
    p.set_x(10)
    p.cell(0, 6, "WARNING: Hot surfaces (60 degC liquid), Caustic NaOH (skin and eye burns), HCl Acid (corrosive), H2S possible in crude service", border=0)
    p.ln()
    safety_items = [
        "Obtain Hot Work Permit (SOP-SAFE-019) BEFORE any work - required for HX isolation",
        "Complete LOTO (Lock-Out/Tag-Out) per LOTO-MAINT-001 - minimum 4 isolation points required",
        "Mandatory PPE: Face shield, chemical gloves (nitrile 0.45mm min), acid-resistant apron, safety boots",
        "H2S monitor mandatory for crude or vacuum service (IDLH: 50 ppm - evacuate if alarm sounds)",
        "Confirm eyewash station and safety shower within 10 seconds of work area - test before starting",
        "Neutralise all chemical waste to pH 6.0-9.0 before discharge to ETP - non-negotiable",
    ]
    for item in safety_items:
        p.bullet(item)
    p.ln(3)

    p.sec("3. CHEMICALS AND QUANTITIES (Per 12 m3 batch)", (20, 80, 140))
    p.thead([("Chemical", 40), ("Grade / Specification", 42), ("Conc.", 25), ("Quantity", 30), ("Purpose", 57)])
    chem_rows = [
        ["NaOH (Caustic Soda)", "98% purity, Industrial grade", "2% w/v", "~240 kg", "Alkaline degreasing - organic foulant removal"],
        ["HCl (Hydrochloric Acid)", "30-33% concentration", "5% v/v", "~180 L", "Inorganic scale removal (CaCO3, FeCO3)"],
        ["Corrosion Inhibitor", "Rodine 213 or equivalent", "0.5% v/v", "60 L", "Add to HCl BEFORE use - mandatory step"],
        ["Demineralised Water", "pH 6.5-7.5, below 50 uS/cm", "Dilution", "~36 m3 total", "Dilution, flushing and final rinse"],
    ]
    for i, row in enumerate(chem_rows):
        p.trow(list(zip(row, [40, 42, 25, 30, 57])), even=(i % 2 == 0))
    p.ln(3)

    p.sec("4. PROCEDURE STEPS", (0, 100, 50))
    phases = [
        ("PHASE 1: PREPARATION AND ISOLATION (Estimated 2 hours)", [
            ("Step 1.1", "Obtain Hot Work Permit from HSE. Permit number: ___________"),
            ("Step 1.2", "Depressurise HX to atmospheric. Verify pressure gauge reads zero before opening."),
            ("Step 1.3", "Drain process fluids from both shell and tube sides. Collect in drum - dispose per HSEP-007."),
            ("Step 1.4", "Complete LOTO - install blinds at all 4 nozzles (N1, N2, N3, N4). Record blind serial numbers."),
            ("Step 1.5", "Install temporary cleaning circuit: pump, mixing tank (12 m3), return line with flow meter."),
            ("Step 1.6", "Pressure test circuit with water at 3 bar. Check all connections before chemical addition."),
        ]),
        ("PHASE 2: ALKALINE CLEANING (Estimated 4 hours at 60 degC)", [
            ("Step 2.1", "Fill circuit with 12 m3 demineralised water. Verify pH 6.5-7.5 before chemical addition."),
            ("Step 2.2", "Slowly add NaOH to achieve 2% w/v solution. Mix for 15 minutes. Verify pH 12.5-13.5."),
            ("Step 2.3", "Circulate at 45-60 m3/h flow rate. Heat gradually to 60 degC using heat tracing."),
            ("Step 2.4", "Circulate at 60 degC for MINIMUM 4 HOURS. Sample every 30 minutes - record in log."),
            ("Step 2.5", "Drain caustic to neutralisation tank. Neutralise to pH 6.0-9.0 before ETP discharge."),
            ("Step 2.6", "Flush with fresh water (3 x 4 m3 batches) until pH below 8.5. Record volumes flushed."),
        ]),
        ("PHASE 3: ACID CLEANING (Estimated 3 hours at ambient temperature)", [
            ("Step 3.1", "CAUTION: Add corrosion inhibitor (Rodine 213, 0.5%) to water BEFORE adding acid."),
            ("Step 3.2", "Add HCl slowly to achieve 5% v/v. ADD ACID TO WATER - NEVER WATER TO ACID."),
            ("Step 3.3", "Circulate at ambient temperature (do NOT heat acid solution). Duration: 2-3 hours maximum."),
            ("Step 3.4", "Monitor pH continuously. If pH drops below 1.5, dilute by adding demineralised water."),
            ("Step 3.5", "Drain acid to neutralisation tank. Neutralise to pH 6.0-9.0 - mandatory before drain."),
            ("Step 3.6", "Flush (4 x 4 m3 batches) until pH 6.5-7.5 and conductivity below 100 uS/cm."),
        ]),
        ("PHASE 4: REINSTATEMENT AND PERFORMANCE VERIFICATION", [
            ("Step 4.1", "Remove temporary cleaning circuit. Remove all blinds - verify against blind register (4 of 4)."),
            ("Step 4.2", "Install new gaskets (do NOT reuse). Torque all bolts per flange schedule."),
            ("Step 4.3", "Pressure test: shell at 16.5 bar and tube at 13.75 bar for 30 minutes. No leaks permitted."),
            ("Step 4.4", "Commission HX gradually. Monitor outlet temperature during warm-up."),
            ("Step 4.5", "Calculate fouling factor after 2 hours at steady state. Target: below 0.0002 m2.K/W."),
            ("Step 4.6", "Complete cleaning report. Update CMMS. Notify process engineer of results."),
        ]),
    ]
    for phase_title, steps in phases:
        p.set_font("Helvetica", "B", 8)
        p.set_text_color(0, 100, 50)
        p.set_x(10)
        p.cell(0, 7, phase_title, border=0)
        p.ln()
        for num, desc in steps:
            p.set_x(12)
            p.set_font("Helvetica", "B", 8)
            p.set_text_color(0, 80, 40)
            p.cell(20, 5.5, num)
            p.set_font("Helvetica", "", 8)
            p.set_text_color(30, 30, 30)
            p.multi_cell(0, 5.5, desc)
        p.ln(2)

    path = os.path.join(OUTPUT_DIR, "SOP-MAINT-2024-047-HX-Cleaning.pdf")
    p.output(path)
    print(f"Created: SOP-MAINT-2024-047-HX-Cleaning.pdf  ({os.path.getsize(path)//1024} KB)")


# ── DOC 5: Work Order ────────────────────────────────────────────────────────
def create_work_order():
    p = PDF("MAINTENANCE WORK ORDER")
    p.add_page()
    p.title_block(
        "MAINTENANCE WORK ORDER",
        "WO-2024-0892: P-205A Mechanical Seal Replacement - EMERGENCY",
        "WO No: WO-2024-0892 | Priority: CRITICAL | Status: COMPLETED | Raised: 14-Feb-2024",
        bg=(255, 248, 230), tc=(120, 70, 0),
    )

    p.sec("WORK ORDER DETAILS", (120, 80, 0))
    for k, v in [
        ("Work Order No.", "WO-2024-0892"),
        ("Work Order Type", "Corrective Maintenance - Emergency"),
        ("Priority", "CRITICAL (P1) - Plant impacted, production at risk"),
        ("Equipment Tag", "P-205A"),
        ("Equipment Name", "Atmospheric Residue Transfer Pump A"),
        ("Location", "CDU Pump House, Bay 2, Grid C-12"),
        ("Failure Description", "Auto-trip at 02:47 hrs 14-Feb-2024 on vibration HH alarm (6.2 mm/s RMS)"),
        ("Work Scope", "Emergency seal replacement (John Crane Type 8B1). Inspect and replace bearings. Laser alignment before reinstatement."),
        ("Raised By", "Sanjay Iyer - Night Shift Supervisor"),
        ("Approved By", "Mohan Das - Maintenance Superintendent"),
        ("Date Raised", "14-Feb-2024 03:00 hrs"),
        ("Date Completed", "14-Feb-2024 16:45 hrs"),
        ("Total Downtime", "14 hours 0 minutes"),
        ("Labour Hours", "14 man-hours (2 fitters x 7 hours each)"),
        ("Estimated Total Cost", "Rs 1,85,000 (seal Rs 45k + labour Rs 28k + OEM tech Rs 62k + misc Rs 50k)"),
        ("Related Documents", "RCA-2024-031, INC-2024-007, OEM-Flowserve-2310, SOP-MAINT-2023-031"),
    ]:
        p.kv(k, v)
    p.ln(3)

    p.sec("MATERIALS USED", (20, 80, 140))
    p.thead([("Description", 65), ("Specification", 45), ("Qty", 15), ("Stock Ref", 35), ("Cost", 34)])
    mat_rows = [
        ["Mechanical Seal Kit", "John Crane Type 8B1 - API Plan 11", "1 set", "MK-8B1-P205", "Rs 45,000"],
        ["Bearing - Drive End", "SKF 6315-2RS/C3 Deep Groove Ball", "1 no.", "BRG-6315", "Rs 8,500"],
        ["Bearing - Non-Drive End", "SKF 6313-2RS/C3 Deep Groove Ball", "1 no.", "BRG-6313", "Rs 6,200"],
        ["Shaft Sleeve", "Stainless Steel 316L, Chrome plated", "1 no.", "SS-P205-SL", "Rs 12,000"],
        ["Gasket Set", "Spiral wound SS/graphite - 4 items", "1 set", "GSK-P205", "Rs 3,800"],
    ]
    for i, row in enumerate(mat_rows):
        p.trow(list(zip(row, [65, 45, 15, 35, 34])), even=(i % 2 == 0))
    p.ln(3)

    p.sec("WORK EXECUTION RECORD", (0, 100, 50))
    execution = [
        ("14-Feb 05:30", "P-205A isolated, de-energised and LOTO applied (4 isolation points). No rotation confirmed."),
        ("14-Feb 06:30", "Seal cartridge removed. Findings: severe thermal distress and face spalling. Bearing DE: roller damage and pitting."),
        ("14-Feb 07:00", "OEM Flowserve field tech on site. Shaft run-out measured: 0.08mm (limit 0.05mm) - shaft straightened with hydraulic press."),
        ("14-Feb 08:00", "New John Crane Type 8B1 seal installed to OEM torque specifications. API Plan 11 flush piping reconnected."),
        ("14-Feb 09:30", "New bearings (DE: SKF 6315, NDE: SKF 6313) pressed in with correct interference fit. Lubricated with Shell Gadus S2."),
        ("14-Feb 11:00", "LASER ALIGNMENT (Pruftechnik ROTALIGN Ultra): Angular 0.02mm (PASS), Offset 0.03mm (PASS). Tolerance: +/-0.05mm."),
        ("14-Feb 13:00", "LOTO removed. Cold trial run for 15 minutes. Vibration: 1.8 mm/s - ACCEPTABLE."),
        ("14-Feb 16:45", "P-205A at full speed. Final vibration: 2.1 mm/s. Seal flush flow: 4.2 L/min. Work order CLOSED."),
    ]
    for time, action in execution:
        p.set_x(10)
        p.set_font("Helvetica", "B", 8)
        p.set_text_color(30, 80, 150)
        p.cell(35, 5.5, time)
        p.set_font("Helvetica", "", 8)
        p.set_text_color(30, 30, 30)
        p.multi_cell(0, 5.5, action)
    p.ln(3)

    p.sec("SIGN-OFF", (60, 60, 60))
    for role, name, date in [
        ("Maintenance Technician", "Sanjay Rao and Team", "14-Feb-2024 16:45"),
        ("OEM Witness (Flowserve)", "Field Service Tech - ID FS-1847", "14-Feb-2024 16:45"),
        ("Shift Supervisor", "Mohan Das - Maint. Superintendent", "14-Feb-2024 17:00"),
        ("Reliability Review", "Dr. Meena Nair - Reliability Engr", "01-Mar-2024"),
    ]:
        p.set_x(10)
        p.set_font("Helvetica", "", 8)
        p.set_text_color(40, 40, 40)
        p.cell(60, 6, role)
        p.cell(65, 6, name)
        p.cell(45, 6, date)
        p.cell(30, 6, "_____________")
        p.ln()

    path = os.path.join(OUTPUT_DIR, "WO-2024-0892-P205A-Seal-Replacement.pdf")
    p.output(path)
    print(f"Created: WO-2024-0892-P205A-Seal-Replacement.pdf  ({os.path.getsize(path)//1024} KB)")


# ── MAIN ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Operations Brain - Generating Demo Industrial PDFs")
    print("=" * 60)
    create_inspection()
    create_rca()
    create_compliance()
    create_sop()
    create_work_order()
    print("=" * 60)
    print(f"All 5 PDFs created in ./{OUTPUT_DIR}/")
    print("Ready for demo upload to Document Ingestion module!")
