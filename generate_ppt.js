const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';

  const SHAPES = {
    rect: pptx.shapes.RECTANGLE,
    roundRect: pptx.shapes.ROUNDED_RECTANGLE,
    line: pptx.shapes.LINE,
    oval: pptx.shapes.OVAL
  };

  // Color Palette Constants
  const THEME = {
    bgDark: '0F172A',      // Slate 900
    bgLight: 'F8FAFC',     // Slate 50
    bgCard: 'FFFFFF',      // Pure White
    primary: '2563EB',     // Royal Blue
    primaryDark: '1D4ED8', // Deep Blue
    primaryLight: 'EFF6FF',// Soft Blue Tint
    secondary: '0D9488',   // Healthcare Teal
    secondaryLight: 'F0FDFA',
    accent: '4F46E5',      // Indigo
    warning: 'D97706',     // Amber
    warningLight: 'FFFBEB',
    success: '16A34A',     // Green
    successLight: 'F0FDF4',
    textMain: '0F172A',
    textMuted: '475569',
    textLight: '94A3B8',
    textWhite: 'FFFFFF',
    border: 'E2E8F0',
    borderBlue: 'BFDBFE'
  };

  const FONT_TITLE = 'Arial';
  const FONT_BODY = 'Arial';

  // Helper for Slide Background & Header Banner
  function applyHeader(slide, category, title, subtitle) {
    // Top colored indicator bar
    slide.addShape(SHAPES.rect, {
      x: 0, y: 0, w: 13.33, h: 0.15,
      fill: { color: THEME.primary }
    });

    // Category / Breadcrumb
    slide.addText(category.toUpperCase(), {
      x: 0.8, y: 0.45, w: 10, h: 0.3,
      fontFace: FONT_TITLE, fontSize: 10, bold: true,
      color: THEME.primary, charSpacing: 2
    });

    // Slide Title
    slide.addText(title, {
      x: 0.8, y: 0.75, w: 11.5, h: 0.55,
      fontFace: FONT_TITLE, fontSize: 22, bold: true,
      color: THEME.textMain
    });

    // Subtitle / Narrative Anchor
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8, y: 1.3, w: 11.7, h: 0.35,
        fontFace: FONT_BODY, fontSize: 12,
        color: THEME.textMuted
      });
    }

    // Bottom subtle footer
    slide.addShape(SHAPES.line, {
      x: 0.8, y: 7.0, w: 11.73, h: 0,
      line: { color: THEME.border, width: 1 }
    });
    slide.addText('Veyora Healthcare · Intelligent Clinical Continuity Platform (IIITD MVP Deck)', {
      x: 0.8, y: 7.05, w: 9, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: THEME.textLight
    });
  }

  // ==========================================
  // SLIDE 1: Title Slide
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgDark };

    // Decorative gradient-like accent rectangles
    slide.addShape(SHAPES.rect, {
      x: 0, y: 0, w: 13.33, h: 0.25,
      fill: { color: THEME.primary }
    });
    slide.addShape(SHAPES.roundRect, {
      x: 0.8, y: 1.2, w: 3.2, h: 0.42, r: 0.2,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 }
    });
    slide.addText('HEALTHCARE CONTINUITY PLATFORM', {
      x: 0.9, y: 1.25, w: 3.0, h: 0.32,
      fontFace: FONT_TITLE, fontSize: 9.5, bold: true,
      color: '38BDF8', charSpacing: 1.5, align: 'center'
    });

    // Main Title
    slide.addText('VEYORA HEALTHCARE', {
      x: 0.8, y: 1.8, w: 11.5, h: 1.1,
      fontFace: FONT_TITLE, fontSize: 44, bold: true,
      color: THEME.textWhite, letterSpacing: 1
    });

    // Subtitle
    slide.addText('Bridging the Critical Gap Between Clinical Consultations and Daily Recovery', {
      x: 0.8, y: 2.95, w: 11.0, h: 0.6,
      fontFace: FONT_TITLE, fontSize: 18, bold: false,
      color: '94A3B8'
    });

    // Mission Statement Box
    slide.addShape(SHAPES.roundRect, {
      x: 0.8, y: 3.75, w: 11.73, h: 1.45, r: 0.15,
      fill: { color: '1E293B' },
      line: { color: '3B82F6', width: 1.5 }
    });
    slide.addText('Executive Summary & The "Care Gap" Thesis', {
      x: 1.1, y: 3.9, w: 11.0, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 12, bold: true, color: '60A5FA'
    });
    slide.addText(
      'Pre-existing national registries store static diagnostic records, yet patients are left unsupported once they leave the clinic.\n' +
      'Veyora pairs an ultra-efficient Doctor Workstation and multilingual Patient Experience with an Autonomous AI Care Coordinator that continuously oversees daily medication schedules, dietary precautions, red-flag triage, and 24-hour pre-consultation readiness.',
      {
        x: 1.1, y: 4.3, w: 11.1, h: 0.8,
        fontFace: FONT_BODY, fontSize: 11, color: 'E2E8F0', lineSpacing: 16
      }
    );

    // Metadata Footer
    slide.addText('Project: IIITD MVP Showcase  |  Team: CodeByte (5 Members)  |  Stage: Functional Production MVP', {
      x: 0.8, y: 5.65, w: 11.73, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11, bold: true, color: '38BDF8'
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 1):\n' +
      'Good morning evaluators. Today we are presenting Veyora Healthcare, an intelligent clinical continuity platform built by Team CodeByte for IIIT Delhi.\n' +
      'In today’s digital health landscape, existing tools focus solely on digitizing medical records. However, healthcare doesn’t end when the doctor consultation ends—in fact, that is precisely when recovery begins.\n' +
      'Over the next 12 slides, we will demonstrate how Veyora bridges this massive gap, explain our 5-member architecture, show the complete live workflow, and benchmark our solution against existing state-of-the-art platforms.'
    );
  }

  // ==========================================
  // SLIDE 2: The Core Problem Statement
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'The Clinical Void', 'The Post-Consultation "Care Gap" & The Reality of Modern OPDs', 'Why 50%+ of chronic care outcomes fail between clinical visits');

    // 3 Problem Pillar Cards
    const cards = [
      {
        num: '01',
        title: 'High Post-Visit Drop-Off',
        metric: '50%+ Non-Adherence',
        body: 'Patients leave OPD cabins with paper slips or complex instructions. Over 50% mismanage dose timings, skip vital antibiotic courses, or fail to follow dietary restrictions.',
        color: 'EF4444'
      },
      {
        num: '02',
        title: 'Severe OPD Overcrowding',
        metric: '< 3 Min / Consultation',
        body: 'Clinicians face 80+ patients daily. Doctors suffer severe clerical fatigue from clumsy EMR interfaces, paper searches, and repetitive manual documentation.',
        color: 'F59E0B'
      },
      {
        num: '03',
        title: 'Unprepared Follow-Ups',
        metric: '35% Wasted Revisits',
        body: 'Patients arrive at follow-up visits having taken morning sugar meds before fasting blood tests, missing past prescription slips, or arriving at wrong clinic hours.',
        color: '3B82F6'
      }
    ];

    cards.forEach((c, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(SHAPES.roundRect, {
        x, y: 1.85, w: 3.73, h: 4.8, r: 0.15,
        fill: { color: THEME.bgCard },
        line: { color: THEME.border, width: 1.5 }
      });
      // Header tag
      slide.addShape(SHAPES.roundRect, {
        x: x + 0.3, y: 2.1, w: 0.8, h: 0.35, r: 0.1,
        fill: { color: c.color }
      });
      slide.addText(c.num, {
        x: x + 0.3, y: 2.12, w: 0.8, h: 0.3,
        fontFace: FONT_TITLE, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center'
      });

      slide.addText(c.title, {
        x: x + 0.3, y: 2.65, w: 3.13, h: 0.5,
        fontFace: FONT_TITLE, fontSize: 16, bold: true, color: THEME.textMain
      });

      slide.addText(c.metric, {
        x: x + 0.3, y: 3.2, w: 3.13, h: 0.35,
        fontFace: FONT_TITLE, fontSize: 13, bold: true, color: c.color
      });

      slide.addShape(SHAPES.line, {
        x: x + 0.3, y: 3.65, w: 3.13, h: 0,
        line: { color: THEME.border, width: 1 }
      });

      slide.addText(c.body, {
        x: x + 0.3, y: 3.85, w: 3.13, h: 2.5,
        fontFace: FONT_BODY, fontSize: 11, color: THEME.textMuted, lineSpacing: 16
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 2):\n' +
      'Let us examine the problem from both the patient and clinician side.\n' +
      'First: The Post-Visit Drop-Off. Globally and across Indian public clinics, once a patient leaves the OPD cabin, there is zero guidance. 50% of patients fail to adhere to their medication regimens.\n' +
      'Second: Clinician Burnout. Government PHCs and busy OPDs see dozens of patients per hour. Doctors spend precious minutes navigating clunky software rather than looking the patient in the eye.\n' +
      'Third: The Unprepared Revisit Problem. Up to 35% of diagnostic re-visits are wasted because the patient ate breakfast before a fasting glucose test or forgot their past paper slips.\n' +
      'Veyora solves all three problems systematically.'
    );
  }

  // ==========================================
  // SLIDE 3: Existing Solutions vs. Veyora
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Competitive Advantage', 'Existing Solutions vs. Veyora Healthcare Matrix', 'Why current healthtech platforms fall short of closing the post-consultation loop');

    // Table Data
    const rows = [
      [
        { text: 'Capability / Metric', options: { bold: true, fill: { color: '1E293B' }, color: 'FFFFFF', fontSize: 10, align: 'left' } },
        { text: 'ABHA / ABDM\n(Govt. Registry)', options: { bold: true, fill: { color: '334155' }, color: 'E2E8F0', fontSize: 10, align: 'center' } },
        { text: 'Commercial Telehealth\n(Practo / 1mg)', options: { bold: true, fill: { color: '334155' }, color: 'E2E8F0', fontSize: 10, align: 'center' } },
        { text: 'Hospital EMRs\n(Epic / Cerner)', options: { bold: true, fill: { color: '334155' }, color: 'E2E8F0', fontSize: 10, align: 'center' } },
        { text: 'VEYORA HEALTHCARE\n(Our MVP Platform)', options: { bold: true, fill: { color: THEME.primary }, color: 'FFFFFF', fontSize: 10, align: 'center' } }
      ],
      [
        { text: 'Core Functional Objective', options: { bold: true, fontSize: 9.5 } },
        { text: 'Static EHR Record Locker', options: { fontSize: 9.5, align: 'center' } },
        { text: 'Doctor Discovery & Sales', options: { fontSize: 9.5, align: 'center' } },
        { text: 'Enterprise Billing & Admin', options: { fontSize: 9.5, align: 'center' } },
        { text: 'Active Clinical Continuity', options: { bold: true, color: THEME.primary, fontSize: 9.5, align: 'center', fill: { color: 'EFF6FF' } } }
      ],
      [
        { text: 'Post-Visit Care Coordination', options: { bold: true, fontSize: 9.5 } },
        { text: 'None (Purely Passive)', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Limited to Commercial Ads', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Cluttered Patient Portal', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'Autonomous AI Coordinator', options: { bold: true, color: '16A34A', fontSize: 9.5, align: 'center', fill: { color: 'EFF6FF' } } }
      ],
      [
        { text: 'Medication Dosing Telemetry', options: { bold: true, fontSize: 9.5 } },
        { text: 'No (Static PDF/XML)', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Manual alarms by user', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'No daily tracking', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Auto 3-Slot Telemetry (M/A/N)', options: { bold: true, color: '16A34A', fontSize: 9.5, align: 'center', fill: { color: 'EFF6FF' } } }
      ],
      [
        { text: 'Proactive T-1 Follow-up Prep', options: { bold: true, fontSize: 9.5 } },
        { text: 'No fasting/prep alerts', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Generic SMS reminder only', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'Automated email blast', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: '24h Fasting, Meds & Doc Prep', options: { bold: true, color: '16A34A', fontSize: 9.5, align: 'center', fill: { color: 'EFF6FF' } } }
      ],
      [
        { text: 'Clinic Triage & Hardware QR', options: { bold: true, fontSize: 9.5 } },
        { text: 'Manual 14-digit ABHA entry', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'No OPD station triage', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Complex desktop check-in', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'Live Camera QR Token Scan', options: { bold: true, color: '16A34A', fontSize: 9.5, align: 'center', fill: { color: 'EFF6FF' } } }
      ],
      [
        { text: 'Accessibility & Multilingual', options: { bold: true, fontSize: 9.5 } },
        { text: 'Static forms', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'App text primarily English', options: { color: 'D97706', fontSize: 9.5, align: 'center' } },
        { text: 'Complex English terminology', options: { color: 'DC2626', fontSize: 9.5, align: 'center' } },
        { text: 'Voice-Assisted Hindi & English', options: { bold: true, color: '16A34A', fontSize: 9.5, align: 'center', fill: { color: 'EFF6FF' } } }
      ]
    ];

    slide.addTable(rows, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.8,
      colW: [2.53, 2.3, 2.3, 2.3, 2.3],
      border: { pt: 1, color: THEME.border },
      fill: { color: THEME.bgCard }
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 3):\n' +
      'Here is our competitive landscape matrix.\n' +
      'Notice that existing solutions excel at either record storage (ABHA) or appointment booking (Practo), or billing (Epic). None of them provide Active Clinical Continuity.\n' +
      'Veyora bridges this directly:\n' +
      '1. Instead of a passive record locker, Veyora provides an Autonomous AI Care Coordinator.\n' +
      '2. Instead of requiring patients to manually type medication alarms into apps like Medisafe, the doctor’s prescription automatically seeds 3-slot daily dosing telemetry.\n' +
      '3. Instead of simple appointment reminders, Veyora issues actionable T-1 prep checklists (overnight fasting rules, documents to carry, morning dose timing rules).\n' +
      '4. We support voice-assisted Hindi and English intake, making it accessible for Indian public healthcare.'
    );
  }

  // ==========================================
  // SLIDE 4: Architecture & The 3 Pillars
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'System Architecture', 'Tri-Pillar Architecture: Doctor, Patient & Autonomous AI', 'A modular, event-driven design connecting real-time clinical workflows with daily recovery');

    const pillars = [
      {
        title: 'Pillar 1: Doctor Workstation',
        role: 'High-Density Clinical Cockpit',
        bg: 'EFF6FF',
        border: '93C5FD',
        titleColor: '1D4ED8',
        bullets: [
          'High-throughput OPD queue sequencing (Patient 1, Patient 2...)',
          'Live HTML5 camera QR barcode & token scanner',
          'Dynamic clinical briefing & past diagnostic history',
          'Prescription builder with multi-drug scheduling (1-0-1)',
          'Cryptographic sign-off locking for tamper-proof records'
        ]
      },
      {
        title: 'Pillar 2: Patient Portal',
        role: 'Accessible, Multilingual Experience',
        bg: 'F0FDF4',
        border: '86EFAC',
        titleColor: '15803D',
        bullets: [
          'Voice-assisted digital symptom intake in Hindi & English',
          'Contactless, cryptographically signed Consent QR Pass',
          'Real-time prescription & diagnosis result viewer',
          'Timeline-based visit history & diagnostic trends',
          'Zero raw PII exposure on physical tokens'
        ]
      },
      {
        title: 'Pillar 3: AI Care Coordinator',
        role: 'Autonomous Recovery Engine',
        bg: 'FAF5FF',
        border: 'D8B4FE',
        titleColor: '7E22CE',
        bullets: [
          'Automatic 3-slot daily dose telemetry tracking (M/A/N)',
          'Condition-specific precaution & lifestyle synthesis (Diabetes, HTN)',
          'Proactive T-1 24-hour pre-consultation fasting checklist',
          'Bilingual AI Q&A bot with clinical safety guardrails',
          'Hourly background cron daemon auto-escalating missed care'
        ]
      }
    ];

    pillars.forEach((p, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(SHAPES.roundRect, {
        x, y: 1.85, w: 3.73, h: 4.8, r: 0.15,
        fill: { color: p.bg },
        line: { color: p.border, width: 1.5 }
      });

      slide.addText(p.title, {
        x: x + 0.25, y: 2.1, w: 3.23, h: 0.4,
        fontFace: FONT_TITLE, fontSize: 15, bold: true, color: p.titleColor
      });
      slide.addText(p.role, {
        x: x + 0.25, y: 2.5, w: 3.23, h: 0.3,
        fontFace: FONT_BODY, fontSize: 10.5, bold: true, color: THEME.textMuted
      });

      slide.addShape(SHAPES.line, {
        x: x + 0.25, y: 2.9, w: 3.23, h: 0,
        line: { color: p.border, width: 1 }
      });

      p.bullets.forEach((b, bIdx) => {
        slide.addShape(SHAPES.oval, {
          x: x + 0.25, y: 3.15 + bIdx * 0.72, w: 0.1, h: 0.1,
          fill: { color: p.titleColor }
        });
        slide.addText(b, {
          x: x + 0.45, y: 3.05 + bIdx * 0.72, w: 3.0, h: 0.65,
          fontFace: FONT_BODY, fontSize: 10, color: THEME.textMain, lineSpacing: 13
        });
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 4):\n' +
      'Our architecture rests on 3 pillars.\n' +
      'Pillar 1 is the Doctor Workstation: built specifically for OPD environments where doctors have under 3 minutes per patient. Fast QR lookup, instant briefing, and 3-click prescription signing.\n' +
      'Pillar 2 is the Patient Experience: zero friction, speech-to-text intake in vernacular languages, and instant QR generation for contactless check-in.\n' +
      'Pillar 3 is our core innovation: The Autonomous AI Care Coordinator. It ingests the doctor’s sign-off and immediately orchestrates daily telemetry, condition precautions, and hourly background scans.'
    );
  }

  // ==========================================
  // SLIDE 5: End-to-End Workflow
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Product Workflow', 'The 5-Stage End-to-End Clinical & Recovery Workflow', 'How a single patient interaction moves seamlessly from intake to clinic to home recovery');

    const steps = [
      {
        num: 'STEP 01',
        title: 'Intake & QR Pass',
        who: 'Patient Portal',
        desc: 'Patient describes chief complaints via voice or text in Hindi/English. Generates an encrypted QR token pass.',
        color: '2563EB'
      },
      {
        num: 'STEP 02',
        title: 'OPD Queue & Scan',
        who: 'Doctor Workstation',
        desc: 'Clinician scans physical QR pass via live web camera. Anonymized patient briefing and vitals load in sub-second.',
        color: '0D9488'
      },
      {
        num: 'STEP 03',
        title: 'Consult & Sign-Off',
        who: 'Doctor Workstation',
        desc: 'Doctor enters diagnosis, builds structured multi-drug prescription, and signs off. Encounter cryptographically locked.',
        color: '4F46E5'
      },
      {
        num: 'STEP 04',
        title: 'Autonomous Synthesis',
        who: 'AI Coordinator',
        desc: 'AI parses prescription into 3-slot daily telemetry (M/A/N), condition precautions, and 24/7 bilingual query answering.',
        color: 'D97706'
      },
      {
        num: 'STEP 05',
        title: 'T-1 Follow-up Loop',
        who: 'Continuous Daemon',
        desc: 'At T-1 before follow-up, AI triggers fasting & prep checklist. Hourly daemon escalates missed visits to care workers.',
        color: '16A34A'
      }
    ];

    steps.forEach((s, idx) => {
      const x = 0.8 + idx * 2.38;
      slide.addShape(SHAPES.roundRect, {
        x, y: 1.85, w: 2.22, h: 4.8, r: 0.12,
        fill: { color: THEME.bgCard },
        line: { color: THEME.border, width: 1.5 }
      });

      // Step Tag
      slide.addShape(SHAPES.roundRect, {
        x: x + 0.15, y: 2.05, w: 1.92, h: 0.35, r: 0.08,
        fill: { color: s.color }
      });
      slide.addText(s.num, {
        x: x + 0.15, y: 2.08, w: 1.92, h: 0.3,
        fontFace: FONT_TITLE, fontSize: 10, bold: true, color: 'FFFFFF', align: 'center'
      });

      slide.addText(s.title, {
        x: x + 0.15, y: 2.55, w: 1.92, h: 0.5,
        fontFace: FONT_TITLE, fontSize: 13, bold: true, color: THEME.textMain, align: 'center'
      });

      slide.addText(s.who, {
        x: x + 0.15, y: 3.1, w: 1.92, h: 0.25,
        fontFace: FONT_BODY, fontSize: 9.5, bold: true, color: s.color, align: 'center'
      });

      slide.addShape(SHAPES.line, {
        x: x + 0.2, y: 3.45, w: 1.82, h: 0,
        line: { color: THEME.border, width: 1 }
      });

      slide.addText(s.desc, {
        x: x + 0.15, y: 3.65, w: 1.92, h: 2.8,
        fontFace: FONT_BODY, fontSize: 10, color: THEME.textMuted, lineSpacing: 14
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 5):\n' +
      'Here is the complete chronological journey of a patient through Veyora:\n' +
      'Step 1: Patient arrives or registers at home using voice intake. An encrypted token is produced.\n' +
      'Step 2: At the clinic, the doctor uses their laptop or tablet camera to scan the token. No paper charts needed.\n' +
      'Step 3: Doctor conducts the consult, adds medications with simple frequency pickers (1-0-1), and signs off.\n' +
      'Step 4: Once signed off, the AI Care Coordinator takes over instantly. The patient’s portal now reflects daily doses, dietary rules, and emergency red-flags.\n' +
      'Step 5: Exactly 24 hours prior to their follow-up date, the AI proactively sends a fasting checklist. If missed, our background daemon automatically notifies community health workers.'
    );
  }

  // ==========================================
  // SLIDE 6: Doctor Workstation Deep Dive
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Clinician Experience', 'Doctor Workstation: Built for OPD High-Density Speed', 'Ergonomically engineered to eliminate clerical fatigue and prioritize clinical attention');

    // Left Box: Key Features
    slide.addShape(SHAPES.roundRect, {
      x: 0.8, y: 1.85, w: 6.5, h: 4.8, r: 0.15,
      fill: { color: THEME.bgCard },
      line: { color: THEME.border, width: 1.5 }
    });
    slide.addText('Workstation Capabilities & Ergonomics', {
      x: 1.1, y: 2.1, w: 5.9, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 15, bold: true, color: THEME.primary
    });

    const docFeatures = [
      { title: 'Sub-Second Hardware Camera Scanner', desc: 'Integrated html5-qrcode library decodes opaque patient tokens instantly via standard webcam or mobile camera.' },
      { title: 'Anonymized Priority Queue Sequencing', desc: 'Patients sequenced as Patient 1, Patient 2 with visual urgency badges (Routine, Moderate, High) preserving patient confidentiality in open clinic areas.' },
      { title: 'Dynamic Clinical Briefing Engine', desc: 'Aggregates previous visit summaries, chief complaints, and historical vitals trends in a single glance.' },
      { title: 'Multi-Drug Prescription Builder', desc: 'Rapid drug selector with standard frequency chips (1-0-1, 1-0-0), meal-timing instructions, and automatic course duration calculation.' },
      { title: 'Cryptographic Sign-Off & Record Lock', desc: 'Finalized consultations are locked with doctor credentials preventing post-hoc alteration and providing an audit trail.' }
    ];

    docFeatures.forEach((f, idx) => {
      slide.addText(`•  ${f.title}:`, {
        x: 1.1, y: 2.55 + idx * 0.82, w: 5.9, h: 0.28,
        fontFace: FONT_TITLE, fontSize: 11, bold: true, color: THEME.textMain
      });
      slide.addText(f.desc, {
        x: 1.35, y: 2.83 + idx * 0.82, w: 5.65, h: 0.48,
        fontFace: FONT_BODY, fontSize: 10, color: THEME.textMuted, lineSpacing: 13
      });
    });

    // Right Box: Clinical Impact Metrics
    slide.addShape(SHAPES.roundRect, {
      x: 7.6, y: 1.85, w: 4.93, h: 4.8, r: 0.15,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1.5 }
    });
    slide.addText('Measurable Clinical Efficiency Gains', {
      x: 7.9, y: 2.1, w: 4.33, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 15, bold: true, color: THEME.primaryDark
    });

    const metrics = [
      { val: '< 45 Sec', label: 'Average Consultation Charting Time', sub: 'From patient scan to final prescription sign-off' },
      { val: '0 Cleartext PII', label: 'Privacy by Design', sub: 'Tokens use hashed IDs; no medical records exposed on slips' },
      { val: '100% Digital Sync', label: 'Instant Patient Handoff', sub: 'Prescription instantly populates Patient AI Coordinator' },
      { val: 'Zero Retyping', label: 'Eliminates Manual Data Re-Entry', sub: 'Vitals & notes populate directly from hardware & voice' }
    ];

    metrics.forEach((m, idx) => {
      const y = 2.6 + idx * 0.98;
      slide.addText(m.val, {
        x: 7.9, y: y, w: 4.33, h: 0.38,
        fontFace: FONT_TITLE, fontSize: 18, bold: true, color: THEME.primary
      });
      slide.addText(m.label, {
        x: 7.9, y: y + 0.35, w: 4.33, h: 0.25,
        fontFace: FONT_TITLE, fontSize: 11, bold: true, color: THEME.textMain
      });
      slide.addText(m.sub, {
        x: 7.9, y: y + 0.58, w: 4.33, h: 0.25,
        fontFace: FONT_BODY, fontSize: 9.5, color: THEME.textMuted
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 6):\n' +
      'Here is the Doctor Workstation deep dive.\n' +
      'In high-volume OPDs, doctors do not have time to navigate multiple sub-menus. We streamlined the workflow into 3 sequential panels: Queue -> Briefing & Vitals -> Prescription Builder.\n' +
      'Scanning a patient token takes less than 1 second using standard webcam hardware. Charting a full multi-drug encounter takes under 45 seconds.\n' +
      'Most importantly, when the doctor clicks "Sign & Handoff", the encounter is cryptographically locked and instantly synchronized to the patient’s portal and our AI engine.'
    );
  }

  // ==========================================
  // SLIDE 7: Patient Experience & Accessibility
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Patient Experience', 'Patient Portal: Inclusive, Multilingual & Privacy-First', 'Engineered for universal accessibility across diverse demographic literacy levels');

    const pCards = [
      {
        title: 'Voice-Assisted Vernacular Intake',
        sub: 'Web Speech API in Hindi & English',
        color: '0D9488',
        bg: 'F0FDFA',
        bullets: [
          'Patients can speak symptoms naturally in Hindi or English.',
          'Built-in speech recognition transcribes and structures chief complaints.',
          'Ideal for elderly patients or individuals with low digital literacy.'
        ]
      },
      {
        title: 'Cryptographic Consent QR Pass',
        sub: 'Privacy-Preserving Contactless Check-In',
        color: '2563EB',
        bg: 'EFF6FF',
        bullets: [
          'Generates high-contrast QR tokens containing encrypted digest references.',
          'No medical conditions or personal phone numbers visible in cleartext.',
          'Can be displayed on mobile screen or printed as a reusable clinical pass.'
        ]
      },
      {
        title: 'Transparent Digital Prescriptions',
        sub: 'Real-Time Visit Records & History',
        color: '4F46E5',
        bg: 'EEF2FF',
        bullets: [
          'Instant access to clinician sign-off notes, diagnosis, and vitals readings.',
          'Structured medication dosage cards with clear meal timing badges.',
          'Downloadable, shareable clinical visit summaries replacing lost paper slips.'
        ]
      }
    ];

    pCards.forEach((c, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(SHAPES.roundRect, {
        x, y: 1.85, w: 3.73, h: 4.8, r: 0.15,
        fill: { color: c.bg },
        line: { color: THEME.border, width: 1.5 }
      });

      slide.addText(c.title, {
        x: x + 0.3, y: 2.15, w: 3.13, h: 0.5,
        fontFace: FONT_TITLE, fontSize: 14.5, bold: true, color: c.color
      });
      slide.addText(c.sub, {
        x: x + 0.3, y: 2.65, w: 3.13, h: 0.3,
        fontFace: FONT_BODY, fontSize: 10, bold: true, color: THEME.textMuted
      });

      slide.addShape(SHAPES.line, {
        x: x + 0.3, y: 3.05, w: 3.13, h: 0,
        line: { color: THEME.border, width: 1 }
      });

      c.bullets.forEach((b, bIdx) => {
        slide.addShape(SHAPES.oval, {
          x: x + 0.3, y: 3.35 + bIdx * 0.95, w: 0.1, h: 0.1,
          fill: { color: c.color }
        });
        slide.addText(b, {
          x: x + 0.5, y: 3.25 + bIdx * 0.95, w: 2.9, h: 0.85,
          fontFace: FONT_BODY, fontSize: 10.5, color: THEME.textMain, lineSpacing: 14
        });
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 7):\n' +
      'Now let us look at the Patient Experience.\n' +
      'In India and emerging markets, text-heavy apps fail because of language barriers and varying literacy levels. We addressed this with three core design choices:\n' +
      '1. Voice-Assisted Intake: Patients speak into their phone in Hindi or English, and our system automatically captures their symptoms.\n' +
      '2. The Consent QR Pass: It uses cryptographic tokens. If a patient drops their paper slip in the clinic, nobody can see their medical history because the QR contains only an opaque reference.\n' +
      '3. Digital Prescription Access: The patient always has a clean, readable version of their medications on their phone.'
    );
  }

  // ==========================================
  // SLIDE 8: AI Care Coordinator Deep Dive
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Core Innovation', 'Autonomous AI Care Coordinator & Recovery Daemon', 'The engine that turns static prescriptions into dynamic recovery telemetry and proactive alerts');

    // 4 Key Capabilities Grid
    const aiGrid = [
      {
        title: '3-Slot Daily Dose Telemetry',
        badge: 'Automated Schedule',
        bullets: [
          'Deconstructs doctor prescriptions (e.g., 1-0-1) into Morning, Afternoon, and Night slots.',
          'Patients check off doses in one tap; calculates live compliance score (e.g. 94% adherence).',
          'Flags missed doses before patient health deteriorates.'
        ]
      },
      {
        title: 'Proactive T-1 Follow-up Checklist',
        badge: '24-Hour Pre-Appointment',
        bullets: [
          'Overnight Fasting Alert: 10-12h water-only reminder after 9 PM for blood panels.',
          'Packaging & Strips Rule: Reminds patient to carry used medicine foils for doctor audit.',
          'Morning Dose Timing: Warns not to take diabetes pills before fasting blood draws.'
        ]
      },
      {
        title: 'Condition-Specific Precautions',
        badge: 'Clinical Synthesis',
        bullets: [
          'Tailored dietary & lifestyle rules (Cardiovascular/Hypertension, Diabetes, Respiratory/Asthma).',
          'Provides plain-language nutritional guidance (low sodium, high fiber, hydration limits).',
          'Identifies disease-specific recovery red-flags.'
        ]
      },
      {
        title: 'Bilingual AI Assistant & Triage',
        badge: 'English & Hindi Q&A',
        bullets: [
          'Answers patient recovery questions 24/7 with clinical safety guardrails.',
          'Recognizes emergency symptoms (chest pain, dyspnea) and triggers immediate 108 emergency hotline.',
          'Hourly node-cron daemon dispatches missed-visit tasks to ASHA health workers.'
        ]
      }
    ];

    aiGrid.forEach((g, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.85 + row * 2.45;

      slide.addShape(SHAPES.roundRect, {
        x, y, w: 5.73, h: 2.3, r: 0.12,
        fill: { color: THEME.bgCard },
        line: { color: THEME.border, width: 1.5 }
      });

      slide.addText(g.title, {
        x: x + 0.3, y: y + 0.2, w: 3.6, h: 0.35,
        fontFace: FONT_TITLE, fontSize: 13, bold: true, color: THEME.primary
      });

      slide.addShape(SHAPES.roundRect, {
        x: x + 4.0, y: y + 0.2, w: 1.45, h: 0.28, r: 0.08,
        fill: { color: 'F1F5F9' }
      });
      slide.addText(g.badge, {
        x: x + 4.0, y: y + 0.22, w: 1.45, h: 0.24,
        fontFace: FONT_TITLE, fontSize: 8.5, bold: true, color: THEME.textMuted, align: 'center'
      });

      g.bullets.forEach((b, bIdx) => {
        slide.addShape(SHAPES.oval, {
          x: x + 0.3, y: y + 0.65 + bIdx * 0.48, w: 0.08, h: 0.08,
          fill: { color: THEME.primary }
        });
        slide.addText(b, {
          x: x + 0.45, y: y + 0.58 + bIdx * 0.48, w: 5.0, h: 0.45,
          fontFace: FONT_BODY, fontSize: 9.5, color: THEME.textMain, lineSpacing: 12
        });
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 8):\n' +
      'Slide 8 presents our primary architectural innovation: The Autonomous AI Care Coordinator.\n' +
      'Notice that this is not just a chatbot. It is an active care orchestration daemon.\n' +
      'It parses complex prescription strings into three clean daily checkboxes for the patient. It generates tailored dietary cautions for Diabetes, Hypertension, and Asthma.\n' +
      'Most importantly, it solves the "unprepared patient" problem: 24 hours before their follow-up appointment, it issues our T-1 Checklist—telling them exactly when to fast, which medicines to withhold until after lab draws, and reminding them to carry their medicine wrappers.\n' +
      'And if an appointment is missed, our background cron daemon automatically routes an outreach alert to community health workers.'
    );
  }

  // ==========================================
  // SLIDE 9: Team Roles & 5-Member Breakdown
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Team Distribution', 'Team Organization & 5-Member Engineering Ownership', 'Full-stack engineering distribution across Team CodeByte for IIITD');

    const members = [
      {
        name: 'Parth Mahajan',
        role: 'Backend Architecture & Security',
        focus: 'Database Modeling & Core Auth',
        bg: 'EFF6FF',
        border: '93C5FD',
        titleColor: '1D4ED8',
        deliverables: [
          'Formulated MongoDB schemas (User, Encounter, Prescription, FollowUp, Vitals, Task, Alert)',
          'Implemented secure authentication pipeline with bcrypt & JWT token handling',
          'Enforced Role-Based Access Control (RBAC) separating Doctor & Patient privileges',
          'Structured modular RESTful API micro-routes and server controllers'
        ]
      },
      {
        name: 'Pranjal Sharma',
        role: 'Patient Experience & Frontend',
        focus: 'Multilingual Intake & QR Pass',
        bg: 'F0FDF4',
        border: '86EFAC',
        titleColor: '15803D',
        deliverables: [
          'Architected responsive Patient Portal layouts, navigation & theme design tokens',
          'Engineered Voice-Assisted Vernacular Intake Flow in Hindi and English',
          'Built Contactless Consent QR Pass generator and verification components',
          'Developed digital prescription viewers, visit timelines & diagnostic history'
        ]
      },
      {
        name: 'Shreyas',
        role: 'Doctor Workstation & UI/UX',
        focus: 'OPD Cockpit & Scanner Hardware',
        bg: 'FAF5FF',
        border: 'D8B4FE',
        titleColor: '7E22CE',
        deliverables: [
          'Built high-density Doctor Consultation Cockpit optimized for fast OPD visits',
          'Integrated live camera-based HTML5 QR & barcode scanner for sub-second lookup',
          'Engineered dynamic clinical briefing engine & past encounter history viewer',
          'Created multi-drug prescription builder with cryptographic sign-off locking'
        ]
      },
      {
        name: 'Soubhik Sarkar',
        role: 'AI Coordinator & Operations',
        focus: 'Telemetry & T-1 Continuity',
        bg: 'FFFBEB',
        border: 'FDE68A',
        titleColor: 'B45309',
        deliverables: [
          'Built AI Care Coordinator portal interface and clinical guidance dashboards',
          'Engineered daily 3-slot dose telemetry and live adherence scoring algorithms',
          'Authored proactive T-1 pre-consultation fasting & preparation checklists',
          'Implemented bilingual AI Q&A assistant with clinical red-flag emergency triage'
        ]
      },
      {
        name: 'Vasu Chandra',
        role: 'Full-Stack Integration & DevOps',
        focus: 'Build Pipeline & WebSockets',
        bg: 'F1F5F9',
        border: 'CBD5E1',
        titleColor: '334155',
        deliverables: [
          'Architected root project orchestration, concurrently running server & client',
          'Integrated Socket.io WebSockets for real-time OPD queue updates across portals',
          'Managed cross-branch repository merges, dependency stabilization & git workflows',
          'Configured Vite production build pipeline, automated testing & server hardening'
        ]
      }
    ];

    members.forEach((m, idx) => {
      const x = 0.8 + idx * 2.38;
      slide.addShape(SHAPES.roundRect, {
        x, y: 1.85, w: 2.22, h: 4.8, r: 0.12,
        fill: { color: m.bg },
        line: { color: m.border, width: 1.5 }
      });

      slide.addText(m.name, {
        x: x + 0.12, y: 2.05, w: 1.98, h: 0.35,
        fontFace: FONT_TITLE, fontSize: 13, bold: true, color: m.titleColor, align: 'center'
      });
      slide.addText(m.role, {
        x: x + 0.12, y: 2.4, w: 1.98, h: 0.35,
        fontFace: FONT_BODY, fontSize: 9.5, bold: true, color: THEME.textMain, align: 'center'
      });
      slide.addText(m.focus, {
        x: x + 0.12, y: 2.75, w: 1.98, h: 0.25,
        fontFace: FONT_BODY, fontSize: 8.5, color: m.titleColor, align: 'center'
      });

      slide.addShape(SHAPES.line, {
        x: x + 0.15, y: 3.05, w: 1.92, h: 0,
        line: { color: m.border, width: 1 }
      });

      m.deliverables.forEach((d, dIdx) => {
        slide.addShape(SHAPES.oval, {
          x: x + 0.15, y: 3.25 + dIdx * 0.88, w: 0.08, h: 0.08,
          fill: { color: m.titleColor }
        });
        slide.addText(d, {
          x: x + 0.28, y: 3.18 + dIdx * 0.88, w: 1.82, h: 0.8,
          fontFace: FONT_BODY, fontSize: 8.8, color: THEME.textMuted, lineSpacing: 11
        });
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 9):\n' +
      'Here is our complete team task allocation across the 5 members of CodeByte:\n' +
      '1. Parth Mahajan spearheaded Backend Architecture & Security, building our MongoDB schemas, JWT authentication, and RBAC security layer.\n' +
      '2. Pranjal Sharma developed the Patient Experience, creating the voice intake in Hindi and English, the QR pass generator, and patient portal views.\n' +
      '3. Shreyas engineered the Doctor Workstation, building the camera QR scanner, clinical briefing engine, and dynamic multi-drug prescription builder.\n' +
      '4. Soubhik Sarkar built the AI Care Coordinator, designing the 3-slot dose telemetry, T-1 fasting checklist, and bilingual recovery engine.\n' +
      '5. Vasu Chandra owned Full-Stack Integration & DevOps, orchestrating the Vite/Express build pipeline, WebSockets via Socket.io, and cross-branch integration.\n' +
      'Every component you see in our demo today was built and integrated collaboratively by this 5-person team.'
    );
  }

  // ==========================================
  // SLIDE 10: Technical Stack & System Design
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Technology & Engineering', 'Full-Stack Technology Stack & System Architecture', 'A hardened, scalable MERN-plus architecture optimized for real-time clinical synchronization');

    const stackCards = [
      {
        layer: 'Frontend Client Layer',
        tech: 'React 18 · Vite · Tailwind/CSS Tokens',
        bg: 'EFF6FF',
        border: 'BFDBFE',
        bullets: [
          'Modular Single Page Application (SPA) with React Router v6',
          'HTML5 Web Speech API for voice-assisted multilingual symptom logging',
          'Live camera QR barcode scanner powered by html5-qrcode',
          'Responsive design tokens supporting mobile and desktop displays'
        ]
      },
      {
        layer: 'Backend Microservices Layer',
        tech: 'Node.js · Express.js · RESTful APIs',
        bg: 'F0FDF4',
        border: 'BBF7D0',
        bullets: [
          'Decoupled route controllers (/auth, /patient, /doctor, /ai-coordinator, /alerts)',
          'Role-Based Access Control (RBAC) middleware verifying JWT tokens',
          'Cryptographic hashing with bcrypt for secure clinician registration',
          'Opaque QR token digestion preventing plain-text PII transmission'
        ]
      },
      {
        layer: 'Real-Time & Automation Daemons',
        tech: 'Socket.io · Node-Cron Scheduled Daemons',
        bg: 'FFFBEB',
        border: 'FDE68A',
        bullets: [
          'Bidirectional WebSockets via Socket.io for instantaneous OPD queue broadcasts',
          'Doctor status updates instantly reflect on patient waitlist monitors',
          'Hourly care continuity daemon (node-cron) scanning for overdue follow-ups',
          'Automated escalation task generation dispatched to ASHA health workers'
        ]
      },
      {
        layer: 'Database & Data Integrity',
        tech: 'MongoDB · Mongoose ORM',
        bg: 'FAF5FF',
        border: 'E9D5FF',
        bullets: [
          'Normalized relational schemas: User, Encounter, Prescription, FollowUp, Vitals',
          'Fast indexed queries for token lookups and chronological patient briefings',
          'Seed automation populating standardized Doctor 1 and Patient 1 evaluator profiles',
          'Exportable JSON database telemetry for auditing and ABDM interoperability'
        ]
      }
    ];

    stackCards.forEach((c, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.85 + row * 2.45;

      slide.addShape(SHAPES.roundRect, {
        x, y, w: 5.73, h: 2.3, r: 0.12,
        fill: { color: c.bg },
        line: { color: c.border, width: 1.5 }
      });

      slide.addText(c.layer, {
        x: x + 0.3, y: y + 0.2, w: 5.13, h: 0.3,
        fontFace: FONT_TITLE, fontSize: 13, bold: true, color: THEME.textMain
      });
      slide.addText(c.tech, {
        x: x + 0.3, y: y + 0.5, w: 5.13, h: 0.25,
        fontFace: FONT_BODY, fontSize: 9.5, bold: true, color: THEME.primary
      });

      slide.addShape(SHAPES.line, {
        x: x + 0.3, y: y + 0.8, w: 5.13, h: 0,
        line: { color: c.border, width: 1 }
      });

      c.bullets.forEach((b, bIdx) => {
        slide.addShape(SHAPES.oval, {
          x: x + 0.3, y: y + 0.98 + bIdx * 0.38, w: 0.08, h: 0.08,
          fill: { color: THEME.primary }
        });
        slide.addText(b, {
          x: x + 0.45, y: y + 0.92 + bIdx * 0.38, w: 4.95, h: 0.35,
          fontFace: FONT_BODY, fontSize: 9, color: THEME.textMuted, lineSpacing: 11
        });
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 10):\n' +
      'Here is our technical architecture.\n' +
      'We chose a modernized MERN stack enriched with Socket.io and background cron daemons.\n' +
      'For the frontend: React 18 with Vite for sub-second build and HMR. We integrated the HTML5 Web Speech API for voice intake and html5-qrcode for barcode reading.\n' +
      'For the backend: Express with JWT auth and RBAC.\n' +
      'For real-time sync: Socket.io broadcasts token check-ins directly to the doctor’s screen without polling.\n' +
      'For automation: Node-cron runs hourly scans in the background, checking for missed appointments and auto-dispatching escalation tasks.'
    );
  }

  // ==========================================
  // SLIDE 11: Live MVP Demonstration Guide
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Live Verification', 'Live MVP Demonstration & Evaluator Walkthrough', 'Step-by-step verification pathways to test the live functional deployment right now');

    // Left Panel: 1-Click Fast-Track Credentials
    slide.addShape(SHAPES.roundRect, {
      x: 0.8, y: 1.85, w: 5.5, h: 4.8, r: 0.15,
      fill: { color: THEME.bgCard },
      line: { color: THEME.border, width: 1.5 }
    });
    slide.addText('Pre-Configured Evaluator Profiles', {
      x: 1.1, y: 2.1, w: 4.9, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 15, bold: true, color: THEME.primary
    });

    // Profile 1: Doctor
    slide.addShape(SHAPES.roundRect, {
      x: 1.1, y: 2.55, w: 4.9, h: 1.7, r: 0.1,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 }
    });
    slide.addText('Doctor Station Evaluator', {
      x: 1.3, y: 2.7, w: 4.5, h: 0.3,
      fontFace: FONT_TITLE, fontSize: 12, bold: true, color: '1D4ED8'
    });
    slide.addText('Email: doctor1@veyora.com  |  Password: password123\nRoute: /doctor  |  Role: General Physician (PHC North Main)\nFeatures: Live Queue (6 patients), Token Scanner, Prescription Builder', {
      x: 1.3, y: 3.05, w: 4.5, h: 1.0,
      fontFace: FONT_BODY, fontSize: 10, color: THEME.textMain, lineSpacing: 14
    });

    // Profile 2: Patient
    slide.addShape(SHAPES.roundRect, {
      x: 1.1, y: 4.4, w: 4.9, h: 1.9, r: 0.1,
      fill: { color: 'F0FDF4' },
      line: { color: 'BBF7D0', width: 1 }
    });
    slide.addText('Patient Portal Evaluator', {
      x: 1.3, y: 4.55, w: 4.5, h: 0.3,
      fontFace: FONT_TITLE, fontSize: 12, bold: true, color: '15803D'
    });
    slide.addText('Email: patient1@veyora.com  |  Password: password123\nRoute: /patient  |  ABHA ID: ABHA-9821-4402-9912\nFeatures: Voice Intake, Consent QR Pass, Active AI Care Coordinator\nContext: Prescribed Metformin & Lisinopril, Follow-up due tomorrow', {
      x: 1.3, y: 4.9, w: 4.5, h: 1.25,
      fontFace: FONT_BODY, fontSize: 10, color: THEME.textMain, lineSpacing: 14
    });

    // Right Panel: Live Test Script
    slide.addShape(SHAPES.roundRect, {
      x: 6.6, y: 1.85, w: 5.93, h: 4.8, r: 0.15,
      fill: { color: THEME.bgCard },
      line: { color: THEME.border, width: 1.5 }
    });
    slide.addText('4-Step Live Evaluator Verification Flow', {
      x: 6.9, y: 2.1, w: 5.33, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 15, bold: true, color: THEME.primary
    });

    const stepsDemo = [
      { step: '1. QR Pass Generation', desc: 'Log in as Patient 1 -> Open "Consent QR Pass". View cryptographic token and diagnosis summary without exposed cleartext PII.' },
      { step: '2. Doctor Scan & Queueing', desc: 'Log in as Doctor 1 -> Open "Token Lookup & Scan". Activate webcam to scan QR or enter token. Observe instant briefing load.' },
      { step: '3. Prescription Sign-Off', desc: 'Select medications (e.g. Paracetamol 500mg, 1-0-1), set duration, and click "Sign & Lock Encounter". Encounter becomes immutable.' },
      { step: '4. AI Telemetry & T-1 Alerts', desc: 'Return to Patient 1 -> Open "AI Care Coordinator". Observe auto-populated 3-slot dose schedule, T-1 fasting alert, and test Hindi Q&A.' }
    ];

    stepsDemo.forEach((s, idx) => {
      slide.addText(s.step, {
        x: 6.9, y: 2.6 + idx * 0.98, w: 5.33, h: 0.28,
        fontFace: FONT_TITLE, fontSize: 11, bold: true, color: THEME.textMain
      });
      slide.addText(s.desc, {
        x: 6.9, y: 2.88 + idx * 0.98, w: 5.33, h: 0.58,
        fontFace: FONT_BODY, fontSize: 9.8, color: THEME.textMuted, lineSpacing: 13
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 11):\n' +
      'Evaluators can verify the entire pipeline right now on our live build.\n' +
      'We have pre-seeded two evaluator accounts: Doctor 1 and Patient 1.\n' +
      'You can test the entire loop in under 2 minutes:\n' +
      'First, open Patient 1’s QR pass.\n' +
      'Second, open Doctor 1’s station and scan that pass using your laptop camera.\n' +
      'Third, prescribe a medication and sign off.\n' +
      'Fourth, switch back to Patient 1 and watch the AI Care Coordinator immediately ingest the prescription, show the dose checkboxes, and trigger the T-1 fasting checklist.'
    );
  }

  // ==========================================
  // SLIDE 12: Impact, Scalability & Roadmap
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgLight };
    applyHeader(slide, 'Future Vision', 'Public Health Impact, Scalability & Strategic Roadmap', 'Extending Veyora from primary health centres to nationwide public healthcare infrastructure');

    // Left Box: Public Health Impact
    slide.addShape(SHAPES.roundRect, {
      x: 0.8, y: 1.85, w: 5.73, h: 4.8, r: 0.15,
      fill: { color: THEME.bgCard },
      line: { color: THEME.border, width: 1.5 }
    });
    slide.addText('Projected Healthcare Outcomes', {
      x: 1.1, y: 2.1, w: 5.13, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 15, bold: true, color: THEME.primary
    });

    const impacts = [
      { num: '40% Reduction', title: 'In Missed Clinical Follow-Ups', desc: 'Proactive T-1 preparation reminders prevent forgotten visits and ensure patients arrive test-ready.' },
      { num: '3x Improvement', title: 'In Chronic Medication Adherence', desc: 'Daily 3-slot telemetry (M/A/N) turns overwhelming prescription slips into manageable daily habit loops.' },
      { num: '65% Time Saved', title: 'In Outpatient Registration & Triage', desc: 'Contactless camera QR token scanning eliminates physical paper searches and manual registration lines.' },
      { num: 'Zero Lost Records', title: 'Across Clinical Encounters', desc: 'Centralized digital history protects low-income patients from losing paper slips during monsoon or transit.' }
    ];

    impacts.forEach((imp, idx) => {
      const y = 2.55 + idx * 1.0;
      slide.addText(imp.num, {
        x: 1.1, y: y, w: 2.0, h: 0.3,
        fontFace: FONT_TITLE, fontSize: 12, bold: true, color: THEME.primary
      });
      slide.addText(imp.title, {
        x: 3.0, y: y, w: 3.2, h: 0.3,
        fontFace: FONT_TITLE, fontSize: 11, bold: true, color: THEME.textMain
      });
      slide.addText(imp.desc, {
        x: 1.1, y: y + 0.3, w: 5.13, h: 0.6,
        fontFace: FONT_BODY, fontSize: 9.5, color: THEME.textMuted, lineSpacing: 12
      });
    });

    // Right Box: Phased Roadmap
    slide.addShape(SHAPES.roundRect, {
      x: 6.8, y: 1.85, w: 5.73, h: 4.8, r: 0.15,
      fill: { color: 'F8FAFC' },
      line: { color: THEME.border, width: 1.5 }
    });
    slide.addText('Strategic Scalability Roadmap', {
      x: 7.1, y: 2.1, w: 5.13, h: 0.35,
      fontFace: FONT_TITLE, fontSize: 15, bold: true, color: THEME.textMain
    });

    const phases = [
      { phase: 'PHASE 1 (Completed MVP)', title: 'Core Tri-Pillar Architecture', desc: 'Functional Doctor Workstation, Patient Experience, QR hardware scanner, 3-slot AI telemetry, and hourly cron daemons.' },
      { phase: 'PHASE 2 (Next 60 Days)', title: 'WhatsApp & SMS Multi-Channel Gateway', desc: 'Integrate twilio/GupShup for automated WhatsApp bot reminders so non-smartphone users receive daily dose SMS alerts.' },
      { phase: 'PHASE 3 (Q1 2027)', title: 'Official ABDM/FHIR Interoperability', desc: 'Integrate Ayushman Bharat Digital Mission (ABDM) M1/M2/M3 milestones for official national health record federation.' },
      { phase: 'PHASE 4 (Long-Term)', title: 'Edge AI Offline-First Rural Deployments', desc: 'Deploy quantized on-device LLMs enabling rural primary health sub-centres to operate continuity triage without active internet.' }
    ];

    phases.forEach((p, idx) => {
      const y = 2.55 + idx * 1.0;
      slide.addShape(SHAPES.roundRect, {
        x: 7.1, y: y, w: 5.13, h: 0.88, r: 0.08,
        fill: { color: THEME.bgCard },
        line: { color: THEME.border, width: 1 }
      });
      slide.addText(p.phase, {
        x: 7.25, y: y + 0.08, w: 4.8, h: 0.22,
        fontFace: FONT_TITLE, fontSize: 8.5, bold: true, color: THEME.primary
      });
      slide.addText(p.title, {
        x: 7.25, y: y + 0.28, w: 4.8, h: 0.24,
        fontFace: FONT_TITLE, fontSize: 10.5, bold: true, color: THEME.textMain
      });
      slide.addText(p.desc, {
        x: 7.25, y: y + 0.5, w: 4.8, h: 0.35,
        fontFace: FONT_BODY, fontSize: 8.8, color: THEME.textMuted
      });
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 12):\n' +
      'Looking at the broader horizon:\n' +
      'Our platform addresses four measurable public health metrics:\n' +
      '1. 40% reduction in missed follow-ups.\n' +
      '2. 3x improvement in medication adherence.\n' +
      '3. 65% reduction in OPD registration waiting times.\n' +
      '4. Total elimination of lost paper prescriptions.\n' +
      'Our roadmap is realistic: In Phase 2 we are adding automated WhatsApp and SMS gateways for non-smartphone users. In Phase 3, we will certify for ABDM/FHIR national compliance. And in Phase 4, we will bring edge-AI offline capabilities to remote sub-centres.'
    );
  }

  // ==========================================
  // SLIDE 13: Summary & Conclusion
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: THEME.bgDark };

    slide.addShape(SHAPES.rect, {
      x: 0, y: 0, w: 13.33, h: 0.25,
      fill: { color: THEME.primary }
    });

    slide.addShape(SHAPES.roundRect, {
      x: 0.8, y: 1.2, w: 2.8, h: 0.42, r: 0.2,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 }
    });
    slide.addText('CONCLUSION & RECAP', {
      x: 0.9, y: 1.25, w: 2.6, h: 0.32,
      fontFace: FONT_TITLE, fontSize: 9.5, bold: true,
      color: '38BDF8', charSpacing: 1.5, align: 'center'
    });

    slide.addText('Veyora Healthcare: Transforming Healthcare from Static Records to Continuous Care', {
      x: 0.8, y: 1.8, w: 11.5, h: 1.1,
      fontFace: FONT_TITLE, fontSize: 32, bold: true,
      color: THEME.textWhite
    });

    // 3 Key Takeaways
    const takeaways = [
      { title: 'The Post-Care Void is Solved', text: 'Healthcare no longer stops at the clinic door. The Autonomous AI Care Coordinator oversees daily recovery and dose adherence.' },
      { title: 'Clinician Speed & Zero Clutter', text: 'Sub-second camera QR lookups and rapid 3-click prescription building reduce doctor fatigue in overcrowded OPDs.' },
      { title: 'Inclusive & Bharat-Ready', text: 'Voice-enabled vernacular intake in Hindi & English, combined with community ASHA worker escalation daemons.' }
    ];

    takeaways.forEach((t, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(SHAPES.roundRect, {
        x, y: 3.1, w: 3.73, h: 2.4, r: 0.15,
        fill: { color: '1E293B' },
        line: { color: '334155', width: 1.5 }
      });
      slide.addText(t.title, {
        x: x + 0.3, y: 3.35, w: 3.13, h: 0.5,
        fontFace: FONT_TITLE, fontSize: 14, bold: true, color: '60A5FA'
      });
      slide.addText(t.text, {
        x: x + 0.3, y: 3.9, w: 3.13, h: 1.4,
        fontFace: FONT_BODY, fontSize: 10.5, color: 'E2E8F0', lineSpacing: 15
      });
    });

    slide.addText('Thank You! Open for Questions & Live Demonstration Evaluation.', {
      x: 0.8, y: 5.9, w: 11.73, h: 0.5,
      fontFace: FONT_TITLE, fontSize: 16, bold: true, color: '38BDF8', align: 'center'
    });

    slide.addNotes(
      'SPEAKER NOTES (Slide 13):\n' +
      'In conclusion, Veyora Healthcare turns static health data into continuous, active care.\n' +
      'We empower clinicians with lightning-fast OPD workflows, empower patients with accessible multilingual guidance, and use autonomous AI to close the critical care gap between appointments.\n' +
      'We now invite the evaluators to test our live build and ask any architectural or technical questions. Thank you!'
    );
  }

  // Write PPTX File
  const outputPath = path.join(__dirname, 'Veyora_Healthcare_MVP_Presentation.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Presentation successfully created at: ${outputPath}`);
}

createPresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
