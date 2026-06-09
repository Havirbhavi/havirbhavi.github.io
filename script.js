/**
 * script.js — Havirbhavi Pothugunta Portfolio
 * Galaxy + CS Theme
 *
 * Features:
 *  1.  Canvas starfield animation
 *  2.  Custom cursor
 *  3.  Typing animation (hero name)
 *  4.  Navbar scroll behavior + active link highlighting
 *  5.  Scroll-reveal (IntersectionObserver)
 *  6.  Animated stat counters
 *  7.  Animated skill bars
 *  8.  Project filter buttons
 *  9.  Contact form validation + Bootstrap Toast
 *  10. Footer year
 *  11. Page loader
 *  12. Back to top button
 *  13. GitHub API — live stats + repos
 *  14. Particle burst on click
 */

"use strict";

/* ────────────────────────────────────────────────────────────────
   1. CANVAS STARFIELD
   ──────────────────────────────────────────────────────────────── */
(function initStarfield() {
  const canvas = document.getElementById("starCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W,
    H,
    stars = [],
    nebulae = [];
  const STAR_COUNT = 220;
  const NEBULA_COUNT = 4;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.3, 1.8),
      alpha: rand(0.2, 1),
      speed: rand(0.05, 0.3),
      twinkleSpeed: rand(0.005, 0.025),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function createNebulae() {
    const colors = [
      "rgba(176,74,255,0.04)",
      "rgba(0,229,255,0.03)",
      "rgba(26,5,51,0.06)",
      "rgba(0,21,51,0.05)",
    ];
    nebulae = Array.from({ length: NEBULA_COUNT }, (_, i) => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(200, 400),
      color: colors[i % colors.length],
    }));
  }

  function drawNebulae() {
    nebulae.forEach((n) => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawNebulae();
    stars.forEach((s) => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1 || s.alpha <= 0.1) s.twinkleDir *= -1;
      s.y += s.speed;
      if (s.y > H) {
        s.y = 0;
        s.x = rand(0, W);
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(2)})`;
      ctx.fill();
    });
    frame++;
    if (frame % 400 === 0) drawShootingStar();
    requestAnimationFrame(animate);
  }

  function drawShootingStar() {
    const x = rand(0, W * 0.7),
      y = rand(0, H * 0.5),
      len = rand(80, 180);
    const g = ctx.createLinearGradient(x, y, x + len, y + len * 0.4);
    g.addColorStop(0, "rgba(0,229,255,0)");
    g.addColorStop(0.5, "rgba(0,229,255,0.8)");
    g.addColorStop(1, "rgba(0,229,255,0)");
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y + len * 0.4);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  resize();
  createStars();
  createNebulae();
  animate();
  window.addEventListener("resize", () => {
    resize();
    createStars();
    createNebulae();
  });
})();

/* ────────────────────────────────────────────────────────────────
   2. CUSTOM CURSOR
   ──────────────────────────────────────────────────────────────── */
(function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  (function followRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(followRing);
  })();

  document
    .querySelectorAll("a, button, .project-card, .filter-btn, .skill-chip")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "var(--purple)";
      });
      el.addEventListener("mouseleave", () => {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "var(--cyan)";
      });
    });
})();

/* ────────────────────────────────────────────────────────────────
   3. TYPING ANIMATION
   ──────────────────────────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById("typedName");
  if (!el) return;
  const text = "Havirbhavi Pothugunta";
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 600);
})();

/* ────────────────────────────────────────────────────────────────
   4. NAVBAR — scroll style + active section highlight
   ──────────────────────────────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll("#mainNav .nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current}`,
        );
      });
    },
    { passive: true },
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.getElementById("navbarNav");
      if (collapse?.classList.contains("show")) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });
})();

/* ────────────────────────────────────────────────────────────────
   5. SCROLL REVEAL
   ──────────────────────────────────────────────────────────────── */
(function initReveal() {
  const selectors = [
    ".timeline-card",
    ".edu-card",
    ".project-card",
    ".pub-item",
    ".stat-box",
    ".section-heading",
    ".about-card",
    ".contact-form-wrapper",
    ".contact-info",
    ".skill-bar-item",
    ".gh-stat-card",
    ".gh-repo-card",
  ];
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();

/* ────────────────────────────────────────────────────────────────
   6. ANIMATED STAT COUNTERS
   ──────────────────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + Math.ceil(target / 60), target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 25);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((el) => observer.observe(el));
})();

/* ────────────────────────────────────────────────────────────────
   7. ANIMATED SKILL BARS
   ──────────────────────────────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll(".skill-bar-fill[data-width]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.width + "%";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );
  fills.forEach((el) => observer.observe(el));
})();

/* ────────────────────────────────────────────────────────────────
   8. PROJECT FILTER
   ──────────────────────────────────────────────────────────────── */
(function initFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(
    "#projectsGrid [data-category]",
  );
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      projectItems.forEach((item) => {
        item.classList.toggle(
          "hidden",
          filter !== "all" && item.dataset.category !== filter,
        );
      });
    });
  });
})();

/* ────────────────────────────────────────────────────────────────
   9. CONTACT FORM VALIDATION + BOOTSTRAP TOAST
   ──────────────────────────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  if (!form) return;

  const fields = [
    {
      id: "contactName",
      errorId: "nameError",
      validate: (v) => v.trim().length >= 2,
      msg: "Please enter your name (at least 2 characters).",
    },
    {
      id: "contactEmail",
      errorId: "emailError",
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: "Please enter a valid email address.",
    },
    {
      id: "contactSubject",
      errorId: "subjectError",
      validate: (v) => v.trim().length >= 3,
      msg: "Subject must be at least 3 characters.",
    },
    {
      id: "contactMessage",
      errorId: "messageError",
      validate: (v) => v.trim().length >= 10,
      msg: "Message must be at least 10 characters.",
    },
  ];

  fields.forEach(({ id, errorId, validate, msg }) => {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(errorId);
    if (!input || !errorEl) return;
    input.addEventListener("blur", () => {
      const invalid = !validate(input.value);
      input.classList.toggle("is-invalid", invalid);
      errorEl.textContent = invalid ? msg : "";
    });
    input.addEventListener("input", () => {
      if (validate(input.value)) {
        input.classList.remove("is-invalid");
        errorEl.textContent = "";
      }
    });
  });

  function showToast(message, success = true) {
    const toastEl = document.getElementById("formToast");
    const toastBody = document.getElementById("toastBody");
    if (!toastEl || !toastBody) return;
    toastBody.textContent = message;
    toastEl.classList.toggle("toast-success", success);
    toastEl.classList.toggle("toast-error", !success);
    bootstrap.Toast.getOrCreateInstance(toastEl).show();
  }

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.querySelector(".submit-text").hidden = on;
    submitBtn.querySelector(".submit-loading").hidden = !on;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    fields.forEach(({ id, errorId, validate, msg }) => {
      const input = document.getElementById(id);
      const err = document.getElementById(errorId);
      if (!validate(input.value)) {
        input.classList.add("is-invalid");
        err.textContent = msg;
        isValid = false;
      }
    });
    if (!isValid) {
      showToast("Please fix the errors before submitting.", false);
      form.querySelector(".is-invalid")?.focus();
      return;
    }
    setLoading(true);
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    setTimeout(() => {
      setLoading(false);
      showToast(
        `✓ Message received, ${name}! I'll get back to you at ${email} soon.`,
        true,
      );
      form.reset();
      form
        .querySelectorAll(".galaxy-input")
        .forEach((el) => el.classList.remove("is-invalid"));
      form
        .querySelectorAll(".field-error")
        .forEach((el) => (el.textContent = ""));
    }, 1800);
  });
})();

/* ────────────────────────────────────────────────────────────────
   10. FOOTER YEAR
   ──────────────────────────────────────────────────────────────── */
(function setFooterYear() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ────────────────────────────────────────────────────────────────
   11. PAGE LOADER
   ──────────────────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById("pageLoader");
  const loaderBar = document.getElementById("loaderBar");
  const loaderText = document.getElementById("loaderText");
  if (!loader) return;

  const messages = [
    "Initializing systems...",
    "Loading star maps...",
    "Compiling experience...",
    "Deploying portfolio...",
  ];
  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 22 + 8;
    if (progress >= 100) progress = 100;
    if (loaderBar) loaderBar.style.width = progress + "%";
    msgIndex = Math.min(Math.floor(progress / 25), messages.length - 1);
    if (loaderText) loaderText.textContent = messages[msgIndex];
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("loader-hidden");
        setTimeout(() => loader.remove(), 600);
      }, 300);
    }
  }, 180);
})();

/* ────────────────────────────────────────────────────────────────
   12. BACK TO TOP BUTTON
   ──────────────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ────────────────────────────────────────────────────────────────
   13. GITHUB API — live stats + repos
   ──────────────────────────────────────────────────────────────── */
(function initGitHub() {
  const USERNAME = "Havirbhavi";
  const statsContainer = document.getElementById("githubStats");
  const reposContainer = document.getElementById("githubRepos");
  if (!reposContainer) return;

  async function fetchGitHub() {
    try {
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
      const userData = await userRes.json();

      // Fetch repos
      const reposRes = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`,
      );
      const reposData = await reposRes.json();

      // Update stat cards
      animateGHNumber("ghRepos", userData.public_repos || 0);
      animateGHNumber("ghFollowers", userData.followers || 0);
      animateGHNumber("ghFollowing", userData.following || 0);

      // Sum stars
      const totalStars = Array.isArray(reposData)
        ? reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
        : 0;
      animateGHNumber("ghStars", totalStars);

      // Render repo cards
      if (Array.isArray(reposData) && reposData.length > 0) {
        reposContainer.innerHTML = reposData
          .map(
            (repo) => `
          <div class="col-md-6 col-lg-4">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
               class="gh-repo-card reveal" aria-label="View ${repo.name} on GitHub">
              <div class="gh-repo-header">
                <i class="bi bi-folder2-open" aria-hidden="true"></i>
                <span class="gh-repo-name">${repo.name}</span>
              </div>
              <p class="gh-repo-desc">${repo.description || "No description provided."}</p>
              <div class="gh-repo-footer">
                ${repo.language ? `<span class="gh-lang"><span class="gh-lang-dot"></span>${repo.language}</span>` : ""}
                <span class="gh-meta"><i class="bi bi-star" aria-hidden="true"></i> ${repo.stargazers_count}</span>
                <span class="gh-meta"><i class="bi bi-diagram-2" aria-hidden="true"></i> ${repo.forks_count}</span>
              </div>
            </a>
          </div>
        `,
          )
          .join("");

        // Re-observe new cards for reveal
        document.querySelectorAll(".gh-repo-card.reveal").forEach((el) => {
          const obs = new IntersectionObserver(
            (entries) => {
              entries.forEach((en) => {
                if (en.isIntersecting) {
                  en.target.classList.add("visible");
                  obs.unobserve(en.target);
                }
              });
            },
            { threshold: 0.1 },
          );
          obs.observe(el);
        });
      } else {
        reposContainer.innerHTML =
          '<div class="col-12"><p class="fira text-center" style="color:var(--text-muted)">No public repositories found.</p></div>';
      }
    } catch (err) {
      console.warn("GitHub API fetch failed:", err);
      reposContainer.innerHTML =
        '<div class="col-12"><p class="fira text-center" style="color:var(--text-muted)">Could not load GitHub data. Check your connection.</p></div>';
      ["ghRepos", "ghFollowers", "ghFollowing", "ghStars"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "N/A";
      });
    }
  }

  function animateGHNumber(elId, target) {
    const el = document.getElementById(elId);
    if (!el) return;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + Math.ceil(target / 40 || 1), target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  fetchGitHub();
})();

/* ────────────────────────────────────────────────────────────────
   14. PARTICLE BURST ON CLICK
   ──────────────────────────────────────────────────────────────── */
(function initParticleBurst() {
  const colors = ["#00e5ff", "#b04aff", "#ffffff", "#7c3aed", "#06b6d4"];

  document.addEventListener("click", (e) => {
    // Skip clicks on interactive elements to not interfere
    if (e.target.closest("a, button, input, textarea, select")) return;

    const count = 14;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "particle-burst";
      particle.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${Math.random() * 6 + 3}px;
        height: ${Math.random() * 6 + 3}px;
        --tx: ${(Math.random() - 0.5) * 120}px;
        --ty: ${(Math.random() - 0.5) * 120}px;
      `;
      document.body.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove());
    }
  });
})();

/* ────────────────────────────────────────────────────────────────
   15. DARK / LIGHT MODE TOGGLE
   ──────────────────────────────────────────────────────────────── */
(function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  if (!btn) return;

  // Load saved preference or default to dark
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  if (saved === "light") applyLight();

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    if (isLight) {
      applyDark();
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      applyLight();
      localStorage.setItem("portfolio-theme", "light");
    }
  });

  function applyLight() {
    document.body.classList.add("light-mode");
    if (icon) {
      icon.classList.remove("bi-moon-stars-fill");
      icon.classList.add("bi-sun-fill");
    }
  }

  function applyDark() {
    document.body.classList.remove("light-mode");
    if (icon) {
      icon.classList.remove("bi-sun-fill");
      icon.classList.add("bi-moon-stars-fill");
    }
  }
})();

/* ────────────────────────────────────────────────────────────────
   16. CHART.JS — TECH BREAKDOWN DONUT
   ──────────────────────────────────────────────────────────────── */
(function initTechChart() {
  const canvas = document.getElementById("techDonut");
  const legend = document.getElementById("chartLegend");
  if (!canvas || typeof Chart === "undefined") return;

  const data = [
    { label: "Python", value: 30, color: "#00e5ff" },
    { label: "SQL / Postgres", value: 12, color: "#b04aff" },
    { label: "JavaScript", value: 10, color: "#06b6d4" },
    { label: "PyTorch / TF", value: 14, color: "#7c3aed" },
    { label: "FastAPI", value: 10, color: "#00bcd4" },
    { label: "AWS / GCP", value: 12, color: "#8b5cf6" },
    { label: "Docker / K8s", value: 7, color: "#4f46e5" },
    { label: "Java / C++", value: 5, color: "#0ea5e9" },
  ];

  const chart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: data.map((d) => d.label),
      datasets: [
        {
          data: data.map((d) => d.value),
          backgroundColor: data.map((d) => d.color),
          borderColor: "rgba(3,4,10,0.8)",
          borderWidth: 3,
          hoverOffset: 12,
        },
      ],
    },
    options: {
      cutout: "68%",
      responsive: true,
      animation: {
        animateRotate: true,
        duration: 1400,
        easing: "easeInOutQuart",
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(6,8,18,0.95)",
          borderColor: "rgba(0,229,255,0.3)",
          borderWidth: 1,
          titleColor: "#00e5ff",
          bodyColor: "#7986a3",
          titleFont: { family: "'Fira Code', monospace", size: 13 },
          bodyFont: { family: "'Rajdhani', sans-serif", size: 13 },
          callbacks: {
            label: (ctx) => ` ${ctx.parsed}% of stack`,
          },
        },
      },
    },
  });

  // Build custom legend
  if (legend) {
    legend.innerHTML = data
      .map(
        (d) => `
      <div class="chart-legend-item" role="listitem">
        <span class="legend-dot" style="background:${d.color};box-shadow:0 0 8px ${d.color}88"></span>
        <span class="legend-label">${d.label}</span>
        <span class="legend-value fira" style="color:${d.color}">${d.value}%</span>
      </div>
    `,
      )
      .join("");
  }

  // Only animate chart when it scrolls into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chart.update();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  observer.observe(canvas);
})();
