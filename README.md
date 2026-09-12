# Gokul S — Full Stack Developer Portfolio

A modern, responsive, and visually impressive personal developer portfolio built for **Gokul S**. Designed with a dark-first aesthetic, glassmorphism card styling, responsive navigation, dynamic IDE code window preview, interactive project modal views, skill badges, and contact utilities.

---

## 🌟 Key Features

* **Modern Glassmorphism UI**: Built with custom CSS variables, dark default theme, glowing accents, ambient lighting, and sleek glass backdrop blurs.
* **Dark / Light Mode Toggle**: Smooth theme switching with persistent user preference using `localStorage`.
* **Responsive Hamburger Navigation**: Mobile-first drawer navigation with sticky header and active-section highlighting.
* **Interactive Hero Developer Visual**: Code window terminal tab switcher (`gokul_profile.py` vs `stack.json`) with syntax highlighting and typing animation.
* **Skills Categorization**: Clear technology cards for Programming, Frontend, Backend, Database, and Full Stack integration (using skill badges instead of misleading percentage bars).
* **Project Showcase with Modal Dialogs**:
  1. **FixAI** (AI Hardware Damage Assistant)
  2. **Farmer AI** (Smart Agricultural Assistant)
  3. **Genku** (AI Voice Assistant)
  * Each project includes tech tags, bulleted key features, GitHub/Live Demo buttons, and full detail popups.
* **Education Section**: Timeline structure for **Rathinam College** with modular comment placeholders for degree name and graduation year.
* **Contact & Utilities**:
  * Quick copy-to-clipboard for Phone (`9677753288`) and Email (`gokul3844c@gmail.com`) with instant toast alerts.
  * Interactive contact form validation.
  * Social link placeholders for GitHub, LinkedIn, and Email.
  * Back to top button & scroll progress indicator.

---

## 📁 File Structure

```text
portfolio/
│
├── index.html          # Core semantic HTML layout & accessible markup
├── style.css           # Modern CSS3 styling, design system, theme variables & media queries
├── script.js           # Scroll triggers, theme toggle, project modals, typing & toast logic
├── assets/
│   ├── images/         # Hero graphic and project thumbnails
│   │   ├── hero_developer_visual.png
│   │   ├── fixai_thumbnail.png
│   │   ├── farmerai_thumbnail.png
│   │   └── genku_thumbnail.png
│   └── Gokul_S_Resume.pdf  # Replace with actual PDF resume
└── README.md           # Documentation & editing guide
```

---

## 🛠️ How to Customize & Update Details

### 1. Updating Education Details (Degree & Year)
In `index.html`, locate the `#education` section:
```html
<p class="degree-title">
  <i class="fa-solid fa-graduation-cap"></i> <strong>Degree / Course Name:</strong> <span>[Degree / Course Name]</span>
</p>
```
Replace `[Degree / Course Name]` and `[Year / Expected Graduation]` with your official degree (e.g., *B.Sc Computer Science*, *2023 - 2026*).

### 2. Updating Project URLs (GitHub & Live Demos)
In `index.html` and `script.js` (inside `projectsData`), replace the placeholder URLs:
* `https://github.com/gokul3844c/Fixio` -> FixAI GitHub repo URL
* `https://github.com/gokul3844c/farmer-ai` -> Your actual Farmer AI GitHub repo URL
* `https://github.com/gokul3844c/genku` -> Your actual Genku GitHub repo URL

### 3. Adding Your PDF Resume
Place your updated resume file named `Gokul_S_Resume.pdf` inside `assets/`.

---

## 🚀 Running Locally

Simply open `index.html` in any web browser, or launch a local dev server:

### Using Python HTTP Server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📄 License & Copyright

© 2026 Gokul S. All Rights Reserved.
