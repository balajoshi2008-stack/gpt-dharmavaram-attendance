// ═══════════════════════════════════════════════════════════════════
//  APP CONFIGURATION FILE — C26 SCHEME AWARE
//  Smart Attendance Management System — GPT Dharmavaram
//
//  SCHEME HISTORY:
//  C25 (≤ 2025): PIN=25170-CM-001  Subject=CM-101  Branch=Computer Engineering
//  C26 (≥ 2026): PIN=26170CM001    Subject=26CM101T Branch=Computer Science & Engineering
//
//  SUBJECT TYPE SUFFIXES (C26 only):
//  T = Theory    → Unit Marks tab ✅   Lab Assessment ❌
//  E = Elective  → Unit Marks tab ✅   Lab Assessment ❌
//  L = Lab       → Unit Marks tab ❌   Lab Assessment ✅
//  A = Audit     → Unit Marks tab ❌   Lab Assessment ❌  (attendance only)
//  P = Project   → Unit Marks tab ❌   Lab Assessment ❌  (already handled)
//
//  ATTENDANCE TAB: ALL subjects appear — no change for any type
// ═══════════════════════════════════════════════════════════════════

const APP_CONFIG = {

  // ── COLLEGE ─────────────────────────────────────────────────────
  college: {
    name:      "Government Polytechnic, Dharmavaram",
    shortName: "GPT Dharmavaram",
    code:      "170",
    type:      "Government Polytechnic",
    city:      "Dharmavaram",
    district:  "Sri Sathya Sai",
    state:     "Andhra Pradesh",
    phone:     "",
    email:     "",
    website:   ""
  },

  // ── BRANCH (C26 name) ────────────────────────────────────────────
  branch: {
    name:      "Computer Science & Engineering",
    shortName: "CSE",
    code:      "CM",   // same in both schemes
    department:"Computer Science & Engineering",
    hod:       ""
  },

  // ── SCHEME BOUNDARY ──────────────────────────────────────────────
  schemeChangeYear: 2026,

  // ── SCHEME DEFINITIONS ───────────────────────────────────────────
  schemes: {
    C25: {
      maxAdmissionYear: 2025,
      pinSeparator:     "-",
      pinFormat:        "YY+CC+SEP+BC+SEP+ROLL",
      subjectFormat:    "BC+SEP+NUM",
      hasTypeSuffix:    false,
      rollDigits:       3,
      branchName:       "Computer Engineering",
      branchShortName:  "CME",
      pinExample:       "25170-CM-001",
      subjectExample:   "CM-101"
    },
    C26: {
      minAdmissionYear: 2026,
      pinSeparator:     "",
      pinFormat:        "YY+CC+BC+ROLL",
      subjectFormat:    "YY+BC+NUM+TYPE",
      hasTypeSuffix:    true,
      rollDigits:       3,
      branchName:       "Computer Science & Engineering",
      branchShortName:  "CSE",
      pinExample:       "26170CM001",
      subjectExample:   "26CM101T"
    }
  },

  // ── SUBJECT TYPE DEFINITIONS (C26 only) ──────────────────────────
  // showInUnitMarks  → appears in Unit Marks tab
  // showInLabAssess  → appears in Lab Assessment tab
  // attendanceOnly   → appears in Attendance only (not in marks tabs)
  subjectTypes: {
    T: {
      label:           "Theory",
      showInUnitMarks: true,
      showInLabAssess: false,
      attendanceOnly:  false,
      isElective:      false,
      isAudit:         false,
      isProject:       false,
      color:           "#1F3864",
      bgColor:         "#EFF6FF",
      description:     "Theory subject. Has unit marks and external examination.",
      tabRoute:        "📊 Appears in Unit Marks tab"
    },
    E: {
      label:           "Elective",
      showInUnitMarks: true,
      showInLabAssess: false,
      attendanceOnly:  false,
      isElective:      true,
      isAudit:         false,
      isProject:       false,
      color:           "#6A1B9A",
      bgColor:         "#F3E5F5",
      description:     "Elective theory. Students choose ONE. Has unit marks and exam.",
      tabRoute:        "📊 Appears in Unit Marks tab (elective)"
    },
    L: {
      label:           "Lab",
      showInUnitMarks: false,
      showInLabAssess: true,
      attendanceOnly:  false,
      isElective:      false,
      isAudit:         false,
      isProject:       false,
      color:           "#2E7D32",
      bgColor:         "#E8F5E9",
      description:     "Lab/Practical. Has sessional marks and practical examination.",
      tabRoute:        "🔬 Appears in Lab Assessment tab"
    },
    A: {
      label:           "Audit",
      showInUnitMarks: false,
      showInLabAssess: false,
      attendanceOnly:  true,
      isElective:      false,
      isAudit:         true,
      isProject:       false,
      color:           "#E65100",
      bgColor:         "#FFF3E0",
      description:     "Audit subject. Attendance only. No unit marks. No external exam.",
      tabRoute:        "📅 Attendance only — not in Unit Marks or Lab Assessment"
    },
    P: {
      label:           "Project",
      showInUnitMarks: false,
      showInLabAssess: false,
      attendanceOnly:  false,
      isElective:      false,
      isAudit:         false,
      isProject:       true,
      color:           "#00838F",
      bgColor:         "#E0F7FA",
      description:     "Project work. Attendance for all branch faculty. Already handled.",
      tabRoute:        "📅 Attendance only (all branch faculty) — no changes needed"
    }
  },

  // ── SEMESTERS ────────────────────────────────────────────────────
  semesters: [
    { value: "1",   label: "Year 1",     year: 1, sem: null },
    { value: "2-3", label: "Semester 3", year: 2, sem: 3   },
    { value: "2-4", label: "Semester 4", year: 2, sem: 4   },
    { value: "3-5", label: "Semester 5", year: 3, sem: 5   }
  ],

  // ── ACADEMIC ─────────────────────────────────────────────────────
  academic: {
    periodsPerDay:      7,
    extraPeriodsMax:    2,
    minAttendancePct:   75,
    maxMarks:           25,
    labSmMax:           25,
    labPmMax:           50
  },

  // ── AUTH ─────────────────────────────────────────────────────────
  auth: {
    emailDomain:     "dharmavaram.com",
    defaultPassword: "123456"
  },

  // ── APP BRANDING ─────────────────────────────────────────────────
  app: {
    title:       "GPT Dharmavaram - Attendance",
    shortTitle:  "Attendance",
    description: "Attendance Management System - GPT Dharmavaram",
    themeColor:  "#667eea",
    bgColor:     "#ffffff"
  },

  // ── PDF REPORTS ───────────────────────────────────────────────────
  reports: {
    headerLine1:  "GOVERNMENT POLYTECHNIC, DHARMAVARAM",
    headerLine2:  "Computer Science & Engineering Department",
    footerText:   "GPT Dharmavaram",
    logbookTitle: "CLASS LOG BOOK"
  },

  // ── SUPPORT ──────────────────────────────────────────────────────
  support: {
    adminContact: "Contact the admin to reset your password",
    adminName:    "Admin",
    adminPhone:   ""
  }
};


// ═══════════════════════════════════════════════════════════════════
//  COMPUTED HELPERS — DO NOT EDIT BELOW THIS LINE
// ═══════════════════════════════════════════════════════════════════

// ── SCHEME DETECTION ─────────────────────────────────────────────

APP_CONFIG.getScheme = function(admissionYear) {
  return parseInt(admissionYear) >= this.schemeChangeYear ? 'C26' : 'C25';
};

APP_CONFIG.detectSchemeFromPIN = function(pin) {
  return String(pin || '').includes('-') ? 'C25' : 'C26';
};

APP_CONFIG.detectSchemeFromSubject = function(code) {
  // C26: starts with 2-digit year then branch letters: "26CM..."
  // C25: starts with branch letters: "CM-..."
  return /^\d{2}[A-Z]/.test(String(code || '')) ? 'C26' : 'C25';
};

APP_CONFIG.getBranchName = function(admissionYear) {
  return this.schemes[this.getScheme(admissionYear)].branchName;
};

APP_CONFIG.getBranchShortName = function(admissionYear) {
  return this.schemes[this.getScheme(admissionYear)].branchShortName;
};

// ── PIN GENERATION ────────────────────────────────────────────────

/**
 * Generate PIN — automatically uses correct scheme.
 * generatePIN(2025, 1)  → "25170-CM-001"  (C25)
 * generatePIN(2026, 1)  → "26170CM001"    (C26)
 * generatePIN(2027, 15) → "27170CM015"    (C26)
 */
APP_CONFIG.generatePIN = function(admissionYear, rollNo) {
  const yr     = String(admissionYear).slice(-2);
  const cc     = this.college.code;
  const bc     = this.branch.code;
  const scheme = this.getScheme(admissionYear);
  const roll   = String(rollNo).padStart(this.schemes[scheme].rollDigits, '0');

  return scheme === 'C26'
    ? `${yr}${cc}${bc}${roll}`      // "26170CM001"
    : `${yr}${cc}-${bc}-${roll}`;   // "25170-CM-001"
};

APP_CONFIG.validatePIN = function(pin) {
  const p = String(pin || '').trim();
  return /^\d{5}-[A-Z]{2}-\d{3}$/.test(p) ||    // C25: 25170-CM-001
         /^\d{2}\d{3}[A-Z]{2}\d{3}$/.test(p);   // C26: 26170CM001
};

APP_CONFIG.extractYearFromPIN = function(pin) {
  const yr = parseInt(String(pin || '').substring(0, 2));
  return Math.floor(new Date().getFullYear() / 100) * 100 + yr;
};

APP_CONFIG.extractRollFromPIN = function(pin) {
  return String(pin || '').includes('-')
    ? parseInt(String(pin).split('-').pop())
    : parseInt(String(pin).slice(-3));
};

// ── SUBJECT CODE GENERATION ───────────────────────────────────────

/**
 * Generate a C26 subject code.
 * generateSubjectCode(2026, 101, 'T') → "26CM101T"
 * generateSubjectCode(2026, 107, 'L') → "26CM107L"
 * generateSubjectCode(2026, 106, 'A') → "26CM106A"
 * generateSubjectCode(2026, 304, 'E') → "26CM304E"
 */
APP_CONFIG.generateSubjectCode = function(admissionYear, number, type) {
  const yr = String(admissionYear).slice(-2);   // "26"
  const bc = this.branch.code;                  // "CM"
  return `${yr}${bc}${number}${type}`;
  // "26" + "CM" + "101" + "T" = "26CM101T"
};

/**
 * Generate a C25 subject code (old format).
 * generateC25SubjectCode(101) → "CM-101"
 */
APP_CONFIG.generateC25SubjectCode = function(number) {
  return `${this.branch.code}-${number}`;
};

// ── SUBJECT CODE PARSING ──────────────────────────────────────────

/**
 * Parse a subject code — works for both C25 and C26.
 *
 * parseSubjectCode("26CM101T") → {
 *   scheme: 'C26', type: 'T', typeLabel: 'Theory',
 *   showInUnitMarks: true, showInLabAssess: false, ...
 * }
 * parseSubjectCode("CM-101") → {
 *   scheme: 'C25', type: null,
 *   showInUnitMarks: true, showInLabAssess: false, ...
 * }
 */
APP_CONFIG.parseSubjectCode = function(code) {
  const c = String(code || '').trim();

  if (/^\d{2}[A-Z]/.test(c)) {
    // ── C26 format: YY(2) + BC(2) + NUM(3) + TYPE(1+) ──────────
    const type = c.slice(7) || 'T';
    const td   = this.subjectTypes[type] || this.subjectTypes['T'];
    return {
      scheme:          'C26',
      year:            2000 + parseInt(c.slice(0, 2)),
      branch:          c.slice(2, 4),
      number:          parseInt(c.slice(4, 7)),
      type,
      typeLabel:       td.label,
      showInUnitMarks: td.showInUnitMarks,
      showInLabAssess: td.showInLabAssess,
      attendanceOnly:  td.attendanceOnly,
      isElective:      td.isElective,
      isAudit:         td.isAudit,
      isProject:       td.isProject,
      color:           td.color,
      bgColor:         td.bgColor,
      tabRoute:        td.tabRoute
    };
  } else {
    // ── C25 format: BC-NUM  e.g. "CM-101" ───────────────────────
    const parts = c.split('-');
    return {
      scheme:          'C25',
      branch:          parts[0] || '',
      number:          parseInt(parts[1]) || 0,
      type:            null,
      typeLabel:       null,
      showInUnitMarks: true,   // C25: all show in Unit Marks (existing behaviour)
      showInLabAssess: false,  // C25: Lab Assessment uses its own existing logic
      attendanceOnly:  false,
      isElective:      false,
      isAudit:         false,
      isProject:       false,
      color:           '#1F3864',
      bgColor:         '#EFF6FF',
      tabRoute:        'C25 — existing behaviour unchanged'
    };
  }
};

// ── TAB FILTERING HELPERS ─────────────────────────────────────────

/**
 * Should this subject appear in Unit Marks tab?
 *
 * SHOW:  C25 (all), C26 type T, C26 type E
 * HIDE:  C26 type L, C26 type A, C26 type P
 *
 * Usage:
 *   subjects.filter(s => APP_CONFIG.showInUnitMarks(s))
 */
APP_CONFIG.showInUnitMarks = function(subjectDoc) {
  if (!subjectDoc) return false;
  // C25 subjects (no type field) → show as before
  if (!subjectDoc.type) return true;
  // C26: use stored showInUnitMarks flag OR check type directly
  if (subjectDoc.showInUnitMarks !== undefined) {
    return subjectDoc.showInUnitMarks;
  }
  // Fallback: compute from type
  const td = this.subjectTypes[subjectDoc.type];
  return td ? td.showInUnitMarks : true;
};

/**
 * Should this subject appear in Lab Assessment tab?
 *
 * SHOW:  C26 type L only (assigned to that faculty)
 * HIDE:  C25 (old logic handles separately), C26 T, E, A, P
 *
 * Usage:
 *   subjects.filter(s => APP_CONFIG.showInLabAssessment(s))
 */
APP_CONFIG.showInLabAssessment = function(subjectDoc) {
  if (!subjectDoc) return false;
  // C25: Lab Assessment uses its own existing logic — return false here
  if (!subjectDoc.type) return false;
  // C26: use stored flag OR check type
  if (subjectDoc.showInLabAssess !== undefined) {
    return subjectDoc.showInLabAssess;
  }
  const td = this.subjectTypes[subjectDoc.type];
  return td ? td.showInLabAssess : false;
};

/**
 * Get type badge text for a subject (for dropdown display).
 * getTypeBadgeText("26CM101T") → "[T]"
 * getTypeBadgeText("26CM106A") → "[A]"
 * getTypeBadgeText("CM-101")   → ""   (C25 — no badge)
 */
APP_CONFIG.getTypeBadgeText = function(code) {
  const p = this.parseSubjectCode(code);
  return p.type ? ` [${p.type}]` : '';
};

/**
 * Build option text for a subject in a <select> dropdown.
 * "26CM101T: English Communication [T]"
 * "26CM106A: Coding Fundamentals [A] ★"  ← ★ marks attendance-only
 */
APP_CONFIG.getSubjectOptionText = function(code, name) {
  const p     = this.parseSubjectCode(code);
  const badge = p.type ? ` [${p.type}]` : '';
  const star  = p.attendanceOnly ? ' ★' : '';
  return `${code}: ${name}${badge}${star}`;
};

// ── AUTH HELPERS ──────────────────────────────────────────────────
APP_CONFIG.toEmail   = function(u) { return `${u}@${this.auth.emailDomain}`; };
APP_CONFIG.fromEmail = function(e) { return e.split('@')[0]; };

// ── SEMESTER HELPERS ──────────────────────────────────────────────
APP_CONFIG.getSemesterLabel = function(value) {
  const s = this.semesters.find(s => s.value === value);
  return s ? s.label : value;
};

// ── PDF HELPERS ───────────────────────────────────────────────────
APP_CONFIG.getPDFBranchLine = function(admissionYear) {
  const name = admissionYear
    ? this.getBranchName(admissionYear)
    : this.branch.name;
  return name + ' Department';
};

// ── BRANDING ──────────────────────────────────────────────────────
APP_CONFIG.applyBranding = function() {
  if (document.title) document.title = this.app.title;
  document.querySelectorAll('.js-college-name')
    .forEach(el => el.textContent = this.college.name);
  document.querySelectorAll('.js-branch-name')
    .forEach(el => el.textContent = this.branch.name);
  document.querySelectorAll('[data-config]').forEach(el => {
    const keys = el.getAttribute('data-config').split('.');
    let val = this;
    keys.forEach(k => { val = val ? val[k] : ''; });
    if (val && typeof val === 'string') {
      el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
        ? (el.value = val) : (el.textContent = val);
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => APP_CONFIG.applyBranding());
} else {
  APP_CONFIG.applyBranding();
}


// ═══════════════════════════════════════════════════════════════════
//  QUICK REFERENCE
//
//  ── PINs ──────────────────────────────────────────────────────────
//  generatePIN(2025, 1)   → "25170-CM-001"  (C25 with dashes)
//  generatePIN(2026, 1)   → "26170CM001"    (C26 no dashes)
//  generatePIN(2026, 15)  → "26170CM015"    (C26)
//
//  ── Subject Codes ─────────────────────────────────────────────────
//  generateSubjectCode(2026, 101, 'T') → "26CM101T"  Unit Marks ✅
//  generateSubjectCode(2026, 304, 'E') → "26CM304E"  Unit Marks ✅
//  generateSubjectCode(2026, 107, 'L') → "26CM107L"  Lab Assess ✅
//  generateSubjectCode(2026, 106, 'A') → "26CM106A"  Attend only
//  generateSubjectCode(2026, 509, 'P') → "26CM509P"  Already handled
//
//  ── Tab Routing ───────────────────────────────────────────────────
//  showInUnitMarks({type:'T'})   → true
//  showInUnitMarks({type:'E'})   → true
//  showInUnitMarks({type:'L'})   → false
//  showInUnitMarks({type:'A'})   → false
//  showInUnitMarks({type:null})  → true  (C25 backward compat)
//
//  showInLabAssessment({type:'L'}) → true
//  showInLabAssessment({type:'T'}) → false
//  showInLabAssessment({type:null})→ false (C25 uses own logic)
//
//  ── Branch Names ──────────────────────────────────────────────────
//  getBranchName(2025) → "Computer Engineering"
//  getBranchName(2026) → "Computer Science & Engineering"
// ═══════════════════════════════════════════════════════════════════
