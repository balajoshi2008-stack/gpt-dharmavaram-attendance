// ═══════════════════════════════════════════════════════════════════
//  APP CONFIGURATION — C26 SCHEME AWARE
//  Smart Attendance Management System — GPT Dharmavaram
//
//  SCHEME HISTORY:
//  C25 (≤ 2025): PIN = 25170-CM-001   Subject = CM-101   Branch = Computer Engineering
//  C26 (≥ 2026): PIN = 26170CM001     Subject = 26CM101T Branch = Computer Science & Engineering
//
//  SUBJECT TYPE SUFFIXES (C26 only):
//  T = Theory    → Unit Marks tab ✅   Lab Assessment ❌
//  E = Elective  → Unit Marks tab ✅   Lab Assessment ❌
//  L = Lab       → Unit Marks tab ❌   Lab Assessment ✅
//  A = Audit     → Unit Marks tab ❌   Lab Assessment ❌  (attendance only)
//  P = Project   → Unit Marks tab ❌   Lab Assessment ❌  (already handled)
//
//  C25 subjects (CM-xxx): existing logic UNCHANGED for all tabs
//  ATTENDANCE TAB: ALL subjects appear — no change for any type
// ═══════════════════════════════════════════════════════════════════

const APP_CONFIG = {

    college: {
        name:      "Government Polytechnic, Dharmavaram",
        shortName: "GPT Dharmavaram",
        code:      "170",
        city:      "Dharmavaram",
        state:     "Andhra Pradesh"
    },

    branch: {
        name:      "Computer Science & Engineering",  // C26 name
        shortName: "CSE",
        code:      "CM"   // same in both C25 and C26
    },

    schemeChangeYear: 2026,   // admission year 2026 = C26 scheme

    schemes: {
        C25: {
            maxAdmissionYear: 2025,
            pinSeparator:     "-",
            rollDigits:       3,
            branchName:       "Computer Engineering",
            branchShortName:  "CME",
            pinExample:       "25170-CM-001",
            subjectExample:   "CM-101"
        },
        C26: {
            minAdmissionYear: 2026,
            pinSeparator:     "",
            rollDigits:       3,
            branchName:       "Computer Science & Engineering",
            branchShortName:  "CSE",
            pinExample:       "26170CM001",
            subjectExample:   "26CM101T"
        }
    },

    // Subject type definitions — C26 only (C25 uses Theory/Practical as before)
    subjectTypes: {
        T: {
            label:           "Theory",
            showInUnitMarks: true,
            showInLabAssess: false,
            attendanceOnly:  false,
            color:           "#1F3864",
            bgColor:         "#EFF6FF",
            badgeStyle:      "background:#1F3864;color:#fff;",
            tabInfo:         "📊 Unit Marks tab — Theory subject. Has unit marks and external exam."
        },
        E: {
            label:           "Elective",
            showInUnitMarks: true,
            showInLabAssess: false,
            attendanceOnly:  false,
            color:           "#6A1B9A",
            bgColor:         "#F3E5F5",
            badgeStyle:      "background:#6A1B9A;color:#fff;",
            tabInfo:         "📊 Unit Marks tab — Elective theory. Students choose one. Has unit marks."
        },
        L: {
            label:           "Lab",
            showInUnitMarks: false,
            showInLabAssess: true,
            attendanceOnly:  false,
            color:           "#2E7D32",
            bgColor:         "#E8F5E9",
            badgeStyle:      "background:#2E7D32;color:#fff;",
            tabInfo:         "🔬 Lab Assessment tab — Practical subject. Has sessional and practical marks."
        },
        A: {
            label:           "Audit",
            showInUnitMarks: false,
            showInLabAssess: false,
            attendanceOnly:  true,
            color:           "#E65100",
            bgColor:         "#FFF3E0",
            badgeStyle:      "background:#E65100;color:#fff;",
            tabInfo:         "📅 Attendance only — No unit marks. No exam."
        },
        P: {
            label:           "Project",
            showInUnitMarks: false,
            showInLabAssess: false,
            attendanceOnly:  false,
            color:           "#00838F",
            bgColor:         "#E0F7FA",
            badgeStyle:      "background:#00838F;color:#fff;",
            tabInfo:         "📅 Attendance only — Project work. Already handled separately."
        }
    },

    auth: {
        emailDomain:     "dharmavaram.com",
        defaultPassword: "123456"
    }
};

// ─────────────────────────────────────────────────────────────────
//  SCHEME DETECTION
// ─────────────────────────────────────────────────────────────────

APP_CONFIG.getScheme = function(admissionYear) {
    return parseInt(admissionYear) >= this.schemeChangeYear ? 'C26' : 'C25';
};

// PIN with dashes = C25 ("25170-CM-001"), without dashes = C26 ("26170CM001")
APP_CONFIG.detectSchemeFromPIN = function(pin) {
    return String(pin || '').includes('-') ? 'C25' : 'C26';
};

// Subject code starting with 2 digits then letters = C26 ("26CM101T"); else C25 ("CM-101")
APP_CONFIG.detectSchemeFromSubject = function(code) {
    return /^\d{2}[A-Z]/.test(String(code || '')) ? 'C26' : 'C25';
};

APP_CONFIG.getBranchName = function(admissionYear) {
    return this.schemes[this.getScheme(admissionYear)].branchName;
};

// ─────────────────────────────────────────────────────────────────
//  PIN GENERATION (both schemes coexist)
// ─────────────────────────────────────────────────────────────────

/**
 * Generate PIN — correct scheme chosen automatically from admissionYear.
 *   generatePIN(2025, 1)   → "25170-CM-001"   (C25 — with dashes, unchanged)
 *   generatePIN(2024, 5)   → "24170-CM-005"   (C25 — with dashes, unchanged)
 *   generatePIN(2026, 1)   → "26170CM001"     (C26 — no dashes)
 *   generatePIN(2027, 15)  → "27170CM015"     (C26 — no dashes)
 */
APP_CONFIG.generatePIN = function(admissionYear, rollNo) {
    const yr     = String(admissionYear).slice(-2);
    const cc     = this.college.code;
    const bc     = this.branch.code;
    const scheme = this.getScheme(admissionYear);
    const roll   = String(rollNo).padStart(this.schemes[scheme].rollDigits, '0');
    return scheme === 'C26'
        ? `${yr}${cc}${bc}${roll}`       // "26170CM001"
        : `${yr}${cc}-${bc}-${roll}`;    // "25170-CM-001"
};

APP_CONFIG.validatePIN = function(pin) {
    const p = String(pin || '').trim();
    return /^\d{5}-[A-Z]{2}-\d{3}$/.test(p) ||    // C25: 25170-CM-001
           /^\d{2}\d{3}[A-Z]{2}\d{3}$/.test(p);   // C26: 26170CM001
};

APP_CONFIG.extractRollFromPIN = function(pin) {
    return String(pin || '').includes('-')
        ? parseInt(String(pin).split('-').pop())       // C25
        : parseInt(String(pin).slice(-3));             // C26
};

// ─────────────────────────────────────────────────────────────────
//  SUBJECT CODE GENERATION (both schemes coexist)
// ─────────────────────────────────────────────────────────────────

/**
 * Generate C26 subject code from year + number + type.
 *   generateSubjectCode(2026, 101, 'T') → "26CM101T"
 *   generateSubjectCode(2026, 107, 'L') → "26CM107L"
 *   generateSubjectCode(2026, 106, 'A') → "26CM106A"
 * C25 subjects keep their existing CM-xxx codes — no generation needed.
 */
APP_CONFIG.generateSubjectCode = function(admissionYear, number, type) {
    const yr = String(admissionYear).slice(-2);
    const bc = this.branch.code;
    return `${yr}${bc}${number}${type}`;
};

/**
 * Derive yearSem key from 3-digit C26 subject number.
 *   101–199 → "1"     (Year 1)
 *   301–399 → "2-3"   (Semester 3)
 *   401–499 → "2-4"   (Semester 4)
 *   501–599 → "3-5"   (Semester 5)
 */
APP_CONFIG.c26NumberToYearSem = function(num) {
    const prefix = Math.floor(parseInt(num) / 100);
    return { 1: '1', 3: '2-3', 4: '2-4', 5: '3-5' }[prefix] || '';
};

APP_CONFIG.c26NumberToYearSemLabel = function(num) {
    const prefix = Math.floor(parseInt(num) / 100);
    return { 1: 'Year 1', 3: 'Semester 3', 4: 'Semester 4', 5: 'Semester 5' }[prefix] || '—';
};

// ─────────────────────────────────────────────────────────────────
//  SUBJECT CODE PARSING (handles both C25 and C26)
// ─────────────────────────────────────────────────────────────────

/**
 * Parse a subject code — returns unified info for C25 and C26.
 *
 * parseSubjectCode("26CM101T") → { scheme:'C26', type:'T', showInUnitMarks:true, ... }
 * parseSubjectCode("26CM107L") → { scheme:'C26', type:'L', showInLabAssess:true, ... }
 * parseSubjectCode("CM-101")   → { scheme:'C25', type:null, showInUnitMarks:true, ... }
 */
APP_CONFIG.parseSubjectCode = function(code) {
    const c = String(code || '').trim();

    if (/^\d{2}[A-Z]/.test(c)) {
        // ── C26: YY(2) + BC(2) + NUM(3) + TYPE(1) ───────────────
        const type = c.slice(7) || 'T';
        const td   = this.subjectTypes[type] || this.subjectTypes['T'];
        const num  = parseInt(c.slice(4, 7)) || 0;
        return {
            scheme:          'C26',
            year:            2000 + parseInt(c.slice(0, 2)),
            branch:          c.slice(2, 4),
            number:          num,
            yearSem:         this.c26NumberToYearSem(num),
            type,
            typeLabel:       td.label,
            showInUnitMarks: td.showInUnitMarks,
            showInLabAssess: td.showInLabAssess,
            attendanceOnly:  td.attendanceOnly,
            isElective:      type === 'E',
            isAudit:         type === 'A',
            isProject:       type === 'P',
            color:           td.color,
            bgColor:         td.bgColor,
            badgeStyle:      td.badgeStyle,
            tabInfo:         td.tabInfo
        };
    } else {
        // ── C25: BC-NUM (e.g. "CM-101") — existing behaviour ─────
        return {
            scheme:          'C25',
            branch:          c.split('-')[0] || '',
            number:          parseInt(c.split('-')[1]) || 0,
            yearSem:         null,
            type:            null,
            typeLabel:       null,
            showInUnitMarks: true,   // C25: all show in Unit Marks (unchanged)
            showInLabAssess: false,  // C25: Lab Assessment uses existing logic (unchanged)
            attendanceOnly:  false,
            isElective:      false,
            isAudit:         false,
            isProject:       false,
            color:           '#1F3864',
            bgColor:         '#EFF6FF',
            badgeStyle:      'background:#1F3864;color:#fff;',
            tabInfo:         'C25 — existing behaviour unchanged'
        };
    }
};

// ─────────────────────────────────────────────────────────────────
//  TAB FILTERING HELPERS
// ─────────────────────────────────────────────────────────────────

/**
 * Should this subject appear in Unit Marks tab?
 *
 * TRUE  → C25 all (unchanged), C26 type T, C26 type E
 * FALSE → C26 type L, C26 type A, C26 type P
 *
 * @param {object|string} subjectDoc — value from SUBJECTS[code]
 */
APP_CONFIG.showInUnitMarks = function(subjectDoc) {
    if (!subjectDoc) return false;
    if (typeof subjectDoc === 'string') return true;       // legacy string — C25, show all
    if (subjectDoc.scheme !== 'C26') return true;          // C25 object — show all (unchanged)
    const td = this.subjectTypes[subjectDoc.type];
    return td ? td.showInUnitMarks : true;
};

/**
 * Should this subject appear in Lab Assessment tab?
 *
 * TRUE  → C26 type L only (assigned to that faculty)
 * FALSE → C25 (C25 Lab Assessment uses existing isLabSubject logic), C26 T/E/A/P
 *
 * @param {object|string} subjectDoc — value from SUBJECTS[code]
 */
APP_CONFIG.showInLabAssessment = function(subjectDoc) {
    if (!subjectDoc) return false;
    if (typeof subjectDoc === 'string') return false;      // C25 legacy string — use old logic
    if (subjectDoc.scheme !== 'C26') return false;         // C25 object — use old isLabSubject logic
    const td = this.subjectTypes[subjectDoc.type];
    return td ? td.showInLabAssess : false;
};

// ─────────────────────────────────────────────────────────────────
//  AUTH HELPERS
// ─────────────────────────────────────────────────────────────────
APP_CONFIG.toEmail   = function(u) { return `${u}@${this.auth.emailDomain}`; };
APP_CONFIG.fromEmail = function(e) { return String(e || '').split('@')[0]; };
