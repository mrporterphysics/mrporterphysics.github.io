---
layout: default
title: Home
---

<style>
/* Inline styles to ensure they load */
.quick-access {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  border: 2px solid var(--accent-primary);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 12px var(--shadow);
}

.quick-access h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.quick-btn {
  background: var(--accent-primary);
  color: var(--bg-primary) !important;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none !important;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  display: block;
  border: 2px solid var(--accent-primary);
}

.quick-btn:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  color: var(--bg-primary) !important;
  transform: scale(1.05);
  box-shadow: 0 4px 12px var(--shadow-hover);
  text-decoration: none !important;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.content-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.content-card:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 8px 16px var(--shadow-hover);
  transform: translateY(-4px);
}

.card-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.card-description {
  color: var(--text-secondary);
  margin: 0;
  flex-grow: 1;
  line-height: 1.5;
}

.card-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.card-link {
  color: var(--accent-primary) !important;
  text-decoration: none !important;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-block;
  font-weight: 500;
}

.card-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent-hover) !important;
  text-decoration: none !important;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .quick-access-grid {
    grid-template-columns: 1fr;
  }
}
</style>

# Physics with Mr. Porter

Welcome to your central hub for physics resources, daily agendas, interactive simulations, and study tools.

---

<div class="quick-access">
  <h2>⚡ Quick Access</h2>
  <p>Most frequently used resources for today's classes</p>
  <div class="quick-access-grid">
    <a href="/Daily Plan/20252026/Daily Slides/APAgendas202526.html" class="quick-btn">📅 AP Agenda Today</a>
    <a href="/Daily Plan/20252026/Daily Slides/RPAgendas202526.html" class="quick-btn">📅 Regents Agenda</a>
    <a href="/Daily Plan/20252026/Daily Slides/EarthSci202526.html" class="quick-btn">🌍 Earth Science</a>
    <a href="/ap-physics-quiz/index.html" class="quick-btn">🎯 Fact Sheet Quiz</a>
    <a href="/ap-physics-quiz/factsheet-complete.html" class="quick-btn">📚 AP Fact Sheet</a>
    <a href="/SimulationResources.html" class="quick-btn">🔬 Simulations</a>
  </div>
</div>

---

## 📚 By Course

<div class="card-grid">
  <div class="content-card">
    <div class="card-icon">🚀</div>
    <h3 class="card-title">AP Physics 1</h3>
    <p class="card-description">College-level physics focusing on mechanics, energy, and waves. Access daily agendas, content presentations, and practice tools.</p>
    <div class="card-links">
      <a href="/Daily Plan/20252026/Daily Slides/APAgendas202526.html" class="card-link">→ Daily Agenda 2025-26</a>
      <a href="/apphysics.html" class="card-link">→ AP Resource Warehouse</a>
      <a href="/presindex.html#ap-physics-content-slides" class="card-link">→ All AP Presentations</a>
    </div>
  </div>
  <div class="content-card">
    <div class="card-icon">⚛️</div>
    <h3 class="card-title">Regents Physics</h3>
    <p class="card-description">NYS Regents Physics curriculum covering mechanics, electricity, waves, and modern physics.</p>
    <div class="card-links">
      <a href="/Daily Plan/20252026/Daily Slides/RPAgendas202526.html" class="card-link">→ Daily Agenda 2025-26</a>
      <a href="/presindex.html#regents-physics" class="card-link">→ All Regents Presentations</a>
      <a href="/regentsTestPrep/unitstestprepquiz.html" class="card-link">→ Units & Equations Quiz</a>
    </div>
  </div>
  <div class="content-card">
    <div class="card-icon">🌍</div>
    <h3 class="card-title">Earth Science</h3>
    <p class="card-description">Study of Earth's systems including geology, meteorology, astronomy, and environmental science.</p>
    <div class="card-links">
      <a href="/Daily Plan/20252026/Daily Slides/EarthSci202526.html" class="card-link">→ Daily Agenda 2025-26</a>
      <a href="/earthscienceref.html" class="card-link">→ Earth Science Reference</a>
      <a href="/presindex.html#earth-science" class="card-link">→ All ES Presentations</a>
    </div>
  </div>
</div>

---

## 🎯 Interactive Tools & Test Prep

<div class="card-grid">
  <div class="content-card">
    <div class="card-icon">🎮</div>
    <h3 class="card-title">Fact Sheet Practice</h3>
    <p class="card-description">Interactive quiz tool for mastering equations and concepts from the AP Physics 1 fact sheet.</p>
    <div class="card-links">
      <a href="/ap-physics-quiz/index.html" class="card-link">→ Launch Quiz Tool</a>
      <a href="/ap-physics-quiz/factsheet-complete.html" class="card-link">→ View Fact Sheet</a>
    </div>
  </div>
  <div class="content-card">
    <div class="card-icon">🔬</div>
    <h3 class="card-title">Physics Simulations</h3>
    <p class="card-description">Interactive HTML simulations for visualizing physics concepts and solving ranking tasks.</p>
    <div class="card-links">
      <a href="/SimulationResources.html" class="card-link">→ Browse All Simulations</a>
      <a href="/AP Resource Pages/linearizationInteractive.html" class="card-link">→ Linearization Tool</a>
      <a href="/AP Resource Pages/kinGraphs.html" class="card-link">→ Kinematic Graphs</a>
    </div>
  </div>
  <div class="content-card">
    <div class="card-icon">📖</div>
    <h3 class="card-title">Study Resources</h3>
    <p class="card-description">Extra practice problems, data collection guides, and reassessment materials.</p>
    <div class="card-links">
      <a href="/AP Resource Pages/apSBGPractice" class="card-link">→ AP Extra Practice</a>
      <a href="/AP Resource Pages/datacollection.html" class="card-link">→ Data Collection Guide</a>
      <a href="/regentsTestPrep/unitstestprepquiz.html" class="card-link">→ Regents Test Prep</a>
    </div>
  </div>
</div>

---

## 📋 All Presentations

Browse presentations organized by course and topic: **[View All Presentations →](/presindex.html)**

---

<p style="text-align: center; color: var(--text-muted); margin-top: 3rem; font-size: 0.9rem;">
  Need help? Email me at <a href="mailto:nporter@schodack.k12.ny.us">nporter@schodack.k12.ny.us</a>
</p>
