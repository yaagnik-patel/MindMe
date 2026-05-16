# 🧠 MINDME — Mental Clarity Tools

Understand your stress, mood, sleep, and anxiety in a focused, distraction-free space. **MINDME** is a privacy-first web application that provides research-backed mental health assessments directly on your device. 

No accounts. No trackers. 100% Private.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

---

## ✨ Features

* **Research-Backed Assessments:** Utilizes established clinical questionnaires:
  * **Stress:** PSS-10
  * **Anxiety:** GAD-7
  * **Mood:** WHO-5 & PHQ-9
  * **Sleep:** ISI
* **Private by Design:** Everything runs locally in your browser. No data is ever sent to a server or stored in a database.
* **Frictionless Experience:** Zero onboarding, no login required. Just open the app and start your check.
* **Distraction-Free UI:** A brutalist, dark-mode interface built for focus, powered by smooth `framer-motion` animations.

## 🛠️ Tech Stack

* **Framework:** [React 18](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/) (Fast HMR and optimized builds)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

This project is bootstrapped with React and Vite. Follow these steps to run it locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/mindme.git](https://github.com/yourusername/mindme.git)
   cd mindme
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
The app will be running at http://localhost:5173.

Building for Production
To create an optimized production build:

Bash
npm run build
To preview the production build locally:

Bash
npm run preview
⚠️ Disclaimer
MINDME is not a diagnostic tool and does not provide medical advice. This tool is built upon established web resources and validated assessments used by experts for baseline mental health checks. It is intended for self-reflection and educational purposes only. If you are in crisis or need professional help, please reach out to a certified healthcare provider or a local emergency hotline.

💡 About the Vite Template
This project uses the @vitejs/plugin-react template for a minimal, lightning-fast setup with Hot Module Replacement (HMR).

Note: The React Compiler is not enabled by default in this template due to its impact on dev & build performances. If you are scaling this into a larger production app, consider migrating to TypeScript for type-aware lint rules.
