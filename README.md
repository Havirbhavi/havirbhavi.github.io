# Havirbhavi Pothugunta — Portfolio

🌐 **Live Site:** https://havirbhavi.github.io

📁 **GitHub Repo:** https://github.com/Havirbhavi/havirbhavi.github.io

---

## About

Personal portfolio website for Havirbhavi Pothugunta, a Machine Learning Engineer and MS Computer Science student at Portland State University. Built with a Galaxy + Computer Science dark theme featuring a canvas starfield, custom cursor, page loader, dark/light mode toggle, live GitHub API integration, Chart.js visualization, and smooth scroll interactions throughout.

---

## Project Structure

```text
portfolio/
├── index.html      # Single-page HTML — navbar plus all content sections
├── style.css       # All styles, CSS variables, animations, dark/light mode
├── script.js       # JavaScript interactivity and API integration
├── profile.jpg     # Profile photo
├── resume.pdf      # Downloadable resume
└── README.md       # Project documentation
```

---

## How to View the Website

You can view the deployed website here:

```text
https://havirbhavi.github.io
```

To run it locally, download or clone the repository and open `index.html` in a browser.

---

## Sections and Features

| Section             | Description                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Navbar**          | Fixed top navigation, smooth scroll, active section highlight, mobile hamburger menu, dark/light mode toggle, and resume download |
| **Hero**            | Typing name animation, canvas starfield, call-to-action buttons, and social links                                                 |
| **About**           | Professional bio, profile photo with orbiting rings, animated stat counters, and Bootstrap accordion                              |
| **Experience**      | Previous work timeline, education cards, and linked publications                                                                  |
| **Projects**        | JavaScript filter buttons and 4 project cards with GitHub links                                                                   |
| **Skills**          | Bootstrap carousel with 4 skill categories and animated skill progress bars                                                       |
| **Tech Breakdown**  | Chart.js donut chart with technology categories and a custom legend                                                               |
| **GitHub Activity** | Live GitHub API data with stat cards and repository cards                                                                         |
| **Contact**         | Validated contact form with Bootstrap Toast notification                                                                          |

---

## Technologies Used

| Technology                 | Purpose                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **HTML5**                  | Semantic structure and ARIA accessibility                                                      |
| **CSS3**                   | Custom properties, keyframe animations, flexbox/grid, responsive design, and dark/light themes |
| **JavaScript ES6+**        | Canvas API, IntersectionObserver, Fetch API, localStorage, and form validation                 |
| **Bootstrap 5.3.2**        | Grid, navbar, accordion, carousel, collapse, and toast                                         |
| **Bootstrap Icons 1.11.3** | Iconography                                                                                    |
| **Chart.js 4.4.0**         | Tech breakdown donut chart                                                                     |
| **Google Fonts**           | Orbitron, Rajdhani, and Fira Code                                                              |
| **GitHub REST API**        | Live user stats and repository data                                                            |

---

## JavaScript Features

| #  | Feature              | Description                                                                |
| -- | -------------------- | -------------------------------------------------------------------------- |
| 1  | **Canvas Starfield** | Procedural stars with twinkle, drift, shooting stars, and nebula gradients |
| 2  | **Custom Cursor**    | Dot and ring follower with hover effects                                   |
| 3  | **Typing Animation** | Character-by-character hero name animation                                 |
| 4  | **Navbar Behavior**  | Scroll state class and active section detection                            |
| 5  | **Scroll Reveal**    | IntersectionObserver fade-in animations                                    |
| 6  | **Stat Counters**    | Animated count-up numbers triggered on scroll                              |
| 7  | **Skill Bars**       | Progress bars animated when visible                                        |
| 8  | **Project Filter**   | Show/hide project cards by category                                        |
| 9  | **Form Validation**  | Real-time and submit validation for contact form                           |
| 10 | **Footer Year**      | Dynamic current year injection                                             |
| 11 | **Page Loader**      | Galaxy-themed loading screen with progress bar                             |
| 12 | **Back to Top**      | Smooth scroll button after page scroll                                     |
| 13 | **GitHub API**       | Fetch API call for live GitHub stats and repositories                      |
| 14 | **Particle Burst**   | Click-based star particle effect                                           |
| 15 | **Dark/Light Mode**  | CSS variable theme switch with localStorage persistence                    |
| 16 | **Chart.js Donut**   | Interactive tech breakdown chart with custom legend                        |

---

## Bootstrap Elements Beyond Class Examples

* **Accordion** — About section Quick Facts
* **Carousel** — Skills section category slider
* **Toast** — Contact form success/error notification

---

## Outside Libraries and Resources

| Resource                            | URL                                                                   | License / Notes   |
| ----------------------------------- | --------------------------------------------------------------------- | ----------------- |
| Bootstrap 5.3.2                     | https://getbootstrap.com                                              | MIT               |
| Bootstrap Icons 1.11.3              | https://icons.getbootstrap.com                                        | MIT               |
| Chart.js 4.4.0                      | https://www.chartjs.org                                               | MIT               |
| Google Fonts                        | https://fonts.google.com                                              | Open Font License |
| GitHub REST API v3                  | https://docs.github.com/en/rest                                       | Public API        |
| MDN Web Docs — Canvas API           | https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API           | Reference         |
| MDN Web Docs — IntersectionObserver | https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver | Reference         |
| MDN Web Docs — Fetch API            | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API            | Reference         |
| MDN Web Docs — localStorage         | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  | Reference         |
| Bootstrap Docs — Accordion          | https://getbootstrap.com/docs/5.3/components/accordion/               | Reference         |
| Bootstrap Docs — Carousel           | https://getbootstrap.com/docs/5.3/components/carousel/                | Reference         |
| Bootstrap Docs — Toast              | https://getbootstrap.com/docs/5.3/components/toasts/                  | Reference         |

---

## Accessibility

* Decorative icons use `aria-hidden="true"`
* Interactive elements include descriptive `aria-label` attributes where needed
* Contact form fields use `<label>` elements and `aria-describedby` for validation messages
* Semantic HTML5 elements are used, including `<nav>`, `<section>`, `<article>`, and `<footer>`
* ARIA roles are used for lists, progress bars, alerts, navigation, and content information
* Form validation messages and toast notifications use live regions
* Tested with WAVE and updated contrast, labels, ARIA attributes, and form accessibility
* Responsive design tested at mobile, tablet, and desktop screen widths

---

## Deployment — GitHub Pages

The website is deployed using GitHub Pages from the `main` branch of the repository.

Live site:

```text
https://havirbhavi.github.io
```

---

*CS 463/563 — Intro to Web Development | Portland State University | Spring 2026*
