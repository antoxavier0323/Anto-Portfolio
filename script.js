/* ============================================================
   ANTO XAVIER K — PORTFOLIO JAVASCRIPT
   Complete, self-contained
   ============================================================ */

/* ── PARTICLES ─────────────────────────────────────────── */
(function () {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, pts = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < 70; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    var baseCol = isDark ? 'rgba(108,99,255,' : 'rgba(108,99,255,';

    pts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = baseCol + '0.6)';
      ctx.fill();
    });

    for (var a = 0; a < pts.length; a++) {
      for (var b = a + 1; b < pts.length; b++) {
        var dx = pts[a].x - pts[b].x;
        var dy = pts[a].y - pts[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[a].x, pts[a].y);
          ctx.lineTo(pts[b].x, pts[b].y);
          ctx.strokeStyle = baseCol + (1 - dist / 130) * 0.18 + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── LOADER ─────────────────────────────────────────────── */
window.addEventListener('load', function () {
  setTimeout(function () {
    var loader = document.getElementById('loader');
    if (loader) loader.classList.add('gone');

    // Animate hero elements in sequence
    var heroEls = document.querySelectorAll('.hero .rv, .hero .rvr');
    heroEls.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('v'); }, i * 130 + 100);
    });

    // Start hero counters after animations settle
    setTimeout(function () {
      document.querySelectorAll('.hs-num').forEach(function (el) {
        animateCounter(el, parseInt(el.getAttribute('data-t') || 0));
      });
    }, 1800);
  }, 1700);
});

/* ── CUSTOM CURSOR ─────────────────────────────────────── */
var cur = document.getElementById('cur');
var cur2 = document.getElementById('cur2');
var mx = 0, my = 0, cx = 0, cy = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
  });
  (function trailLoop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    if (cur2) { cur2.style.left = cx + 'px'; cur2.style.top = cy + 'px'; }
    requestAnimationFrame(trailLoop);
  })();
}

/* ── THEME TOGGLE ──────────────────────────────────────── */
var currentTheme = localStorage.getItem('ax-theme') || 'dark';
applyTheme(currentTheme);

var themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', function () {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('ax-theme', currentTheme);
  });
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  var ico = document.getElementById('themeIco');
  if (ico) ico.textContent = t === 'dark' ? '☀️' : '🌙';
}

/* ── NAVBAR SCROLL ─────────────────────────────────────── */
var navbar = document.getElementById('navbar');
var navProg = document.getElementById('navProg');

window.addEventListener('scroll', function () {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);

  if (navProg) {
    var doc = document.documentElement;
    var pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
    navProg.style.width = pct + '%';
  }

  updateActiveLink();
});

/* ── MOBILE BURGER MENU ────────────────────────────────── */
var burger = document.getElementById('burger');
var mmenu = document.getElementById('mmenu');

if (burger && mmenu) {
  var bs = burger.querySelectorAll('span');
  burger.addEventListener('click', function () {
    var isOpen = mmenu.classList.toggle('open');
    if (bs[0]) bs[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    if (bs[1]) bs[1].style.opacity = isOpen ? '0' : '1';
    if (bs[2]) bs[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
}

document.querySelectorAll('.ml').forEach(function (a) {
  a.addEventListener('click', function () {
    if (mmenu) mmenu.classList.remove('open');
    var spans = burger ? burger.querySelectorAll('span') : [];
    spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── ACTIVE NAV LINK ───────────────────────────────────── */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  var current = '';
  sections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── SMOOTH SCROLL ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = navbar ? navbar.offsetHeight + 12 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── TYPEWRITER ────────────────────────────────────────── */
var titles = [
  'Business Analyst',
  'Management Consultant',
  'Project Coordinator',
  'Process Improvement Expert',
  'ERP Implementation Specialist'
];
var tIdx = 0, cIdx = 0, isDeleting = false;
var typedEl = document.getElementById('typed');

function typeWriter() {
  if (!typedEl) return;
  var word = titles[tIdx];
  typedEl.textContent = isDeleting ? word.slice(0, cIdx - 1) : word.slice(0, cIdx + 1);
  isDeleting ? cIdx-- : cIdx++;

  if (!isDeleting && cIdx === word.length) {
    setTimeout(function () { isDeleting = true; typeWriter(); }, 2200);
    return;
  }
  if (isDeleting && cIdx === 0) {
    isDeleting = false;
    tIdx = (tIdx + 1) % titles.length;
  }
  setTimeout(typeWriter, isDeleting ? 42 : 72);
}
typeWriter();

/* ── SCROLL REVEAL ─────────────────────────────────────── */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('v');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Observe everything outside the hero (hero is handled by loader)
document.querySelectorAll('.rv, .rvl, .rvr').forEach(function (el) {
  if (!el.closest('.hero')) revealObserver.observe(el);
});

/* ── SKILL BARS ────────────────────────────────────────── */
var skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      var fill = e.target.querySelector('.sbar-fill');
      var level = e.target.getAttribute('data-lv');
      if (fill && level) {
        setTimeout(function () { fill.style.width = level + '%'; }, 180);
      }
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.sbar').forEach(function (b) {
  skillObserver.observe(b);
});

/* ── COUNTER ANIMATION ─────────────────────────────────── */
function animateCounter(el, target, duration) {
  duration = duration || 1700;
  var start = performance.now();
  function run(now) {
    var t = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target);
    if (t < 1) requestAnimationFrame(run);
  }
  requestAnimationFrame(run);
}

var counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      var t = parseInt(e.target.getAttribute('data-t') || 0);
      animateCounter(e.target, t);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.cnt').forEach(function (el) {
  counterObserver.observe(el);
});

/* ── 3D CARD TILT ──────────────────────────────────────── */
document.querySelectorAll('.pc, .ach, .tc, .edu-card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var r = card.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    var y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    card.style.transform = 'translateY(-7px) rotateX(' + y + 'deg) rotateY(' + x + 'deg)';
    card.style.transition = 'transform 0.07s ease';
  });
  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
    card.style.transition = 'all 0.32s cubic-bezier(0.4,0,0.2,1)';
  });
});

/* ── DOWNLOAD RESUME ───────────────────────────────────── */
var dlBtn = document.getElementById('dlResume');
if (dlBtn) {
  dlBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var text = [
      'ANTO XAVIER K',
      'Business Analyst | Management Consultant | Project Coordinator',
      'Chennai, India',
      'xavixavierca1@gmail.com | +91 9003566510',
      'https://www.linkedin.com/in/anto-xavier-4617192b4/',
      '',
      '══════════════════════════════════════════',
      'PROFESSIONAL SUMMARY',
      '══════════════════════════════════════════',
      'Management Consultant with experience in Finance, Accounts, Operations,',
      'Process Improvement, and Project Management. Skilled in ERP implementation,',
      'SOP development, inventory management, and business process redesign for MSMEs.',
      '',
      '══════════════════════════════════════════',
      'PROFESSIONAL EXPERIENCE',
      '══════════════════════════════════════════',
      'Project Coordinator | Edgepro Axis India Pvt. Ltd. | Jan 2026 – Present',
      '• Coordinated structural steel detailing and engineering projects end-to-end',
      '• Managed project schedules and tracked progress against key milestones',
      '• Facilitated communication between clients, engineers, and detailing teams',
      '• Prepared project documentation, reports, and stakeholder status updates',
      '',
      'Management Consultant & Business Analyst | Namma Kanakkupillai | Jul 2024 – Dec 2025',
      '• Led consulting engagements redesigning workflows across Accounts, Payroll,',
      '  Inventory, Procurement, and Sales for MSME clients',
      '• Implemented ERP and accounting systems; developed SOPs and KPI frameworks',
      '• Managed end-to-end ERP implementation with training and change management',
      '',
      '══════════════════════════════════════════',
      'EDUCATION',
      '══════════════════════════════════════════',
      'MBA – Data Analytics (In Progress, 2025–2027)',
      'University of Madras — Distance Education',
      '',
      'B.Com – Corporate Secretaryship (2020–2024)',
      "St. Xavier's College (Autonomous), Palayamkottai",
    ].join('\n');

    var blob = new Blob([text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Anto_Xavier_K_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);

    var orig = dlBtn.innerHTML;
    dlBtn.innerHTML = '✅ Downloaded!';
    dlBtn.style.background = '#00D4AA';
    setTimeout(function () {
      dlBtn.innerHTML = orig;
      dlBtn.style.background = '';
    }, 2500);
  });
}

/* ── CONTACT FORM ──────────────────────────────────────── */
function sendForm(e) {
  e.preventDefault();
  var btn = e.target.querySelector('button[type="submit"]');
  var successEl = document.getElementById('fSuccess');
  if (!btn) return;

  btn.innerHTML = 'Sending... ⏳';
  btn.disabled = true;

  setTimeout(function () {
    btn.innerHTML = '✅ Sent!';
    btn.style.background = '#00D4AA';
    if (successEl) successEl.style.display = 'block';
    e.target.reset();

    setTimeout(function () {
      btn.innerHTML = 'Send Message <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
      if (successEl) successEl.style.display = 'none';
    }, 3500);
  }, 1500);
}

/* ── MODAL ─────────────────────────────────────────────── */
var modalData = {
  erp: {
    title: 'Finance & ERP System Implementation',
    body: 'Led end-to-end ERP and accounting system implementation for a manufacturing MSME. Starting from requirements gathering and gap analysis, configured the ERP to match business workflows, oversaw data migration, conducted user training sessions, and provided post-go-live hypercare support.',
    outcome: 'Eliminated manual double-entry errors across Finance and Inventory. Full user adoption achieved within 4 weeks of go-live.',
    tools: ['Tally Prime', 'Custom ERP', 'Change Management', 'User Training', 'Gap Analysis']
  },
  process: {
    title: 'End-to-End Business Process Redesign',
    body: 'Conducted full operational audit for a trading MSME. Mapped as-is processes, identified inefficiencies, designed to-be workflows, and developed SOPs for Accounts, Payroll, Procurement, and Sales. Established accountability matrices and KPI dashboards for management review.',
    outcome: 'Ad-hoc operations converted to structured, audit-ready system. Approval turnaround times reduced through clearly defined workflow stages.',
    tools: ['Process Mapping', 'SOP Development', 'KPI Frameworks', 'Internal Controls', 'RACI Matrix']
  },
  inventory: {
    title: 'Inventory Control System Design',
    body: 'Designed a comprehensive inventory management and stock control system for a retail client. Defined reorder levels, min-max thresholds, stock movement tracking protocols, supplier lead time buffers, and monthly reconciliation procedures.',
    outcome: 'Stockout incidents eliminated through proactive reorder level controls. Monthly physical-vs-system reconciliation enabled with variance below 2%.',
    tools: ['Inventory Systems', 'Stock Control', 'SOP Development', 'Reorder Logic', 'Reporting Frameworks']
  },
  steel: {
    title: 'Structural Steel Engineering Coordination',
    body: 'Coordinating multiple concurrent structural steel detailing and engineering projects at Edgepro Axis India. Maintaining Gantt-based schedules, facilitating weekly status meetings, managing client-engineer communication loops, tracking deliverable submission and review cycles.',
    outcome: 'Timely delivery maintained across all active engineering projects. Stakeholder confidence improved significantly through structured reporting.',
    tools: ['Schedule Management', 'Risk Monitoring', 'Stakeholder Communication', 'Quality Control', 'Action Trackers']
  },
  kpi: {
    title: 'KPI Monitoring & Performance Framework',
    body: 'Built KPI-driven performance monitoring frameworks for multiple MSME clients. Worked with business owners to define the right metrics, established data collection mechanisms, created monthly review templates, and built regular business review cadences.',
    outcome: 'Business owners gained first-time structured visibility into operational KPIs. Decision-making shifted from intuition-based to data-driven across Finance, Ops, and Sales.',
    tools: ['KPI Design', 'Performance Tracking', 'Business Reporting', 'Data Analysis', 'Management Reviews']
  },
  audit: {
    title: 'Internal Controls & Audit-Readiness',
    body: 'Conducted internal control assessments for multiple MSME clients. Identified control gaps across Finance and Procurement, developed remediation action plans, implemented segregation of duties, and built documentation trails required for audit compliance.',
    outcome: 'Clients passed statutory and internal audits with no significant findings post-engagement. Segregation of duties enforced across Finance and Procurement functions.',
    tools: ['Internal Controls', 'Audit Support', 'Compliance', 'Risk Assessment', 'Segregation of Duties']
  }
};

function openModal(key) {
  var d = modalData[key];
  if (!d) return;
  var body = document.getElementById('modalBody');
  if (!body) return;

  var toolsHTML = d.tools.map(function (t) {
    return '<span class="tag">' + t + '</span>';
  }).join('');

  body.innerHTML = '<h2>' + d.title + '</h2>' +
    '<p>' + d.body + '</p>' +
    '<p><strong style="color:var(--teal)">Outcome:</strong> ' + d.outcome + '</p>' +
    '<div class="modal-tools">' + toolsHTML + '</div>';

  var ov = document.getElementById('modalOv');
  if (ov) ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var ov = document.getElementById('modalOv');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

/* ── SCROLL TO TOP ─────────────────────────────────────── */
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
