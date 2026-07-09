---
title: Dashboard
---

<div class="dashboard-cards">
  <a class="dashboard-card" href="./02.-disciplinas/">
    <span class="dashboard-card-icon">📚</span>
    <span class="dashboard-card-title">Disciplinas</span>
    <span class="dashboard-card-desc">Resumos e anotações organizados por matéria, tópico e subtópico.</span>
  </a>
  <a class="dashboard-card" href="./01.-projetos/">
    <span class="dashboard-card-icon">🗺️</span>
    <span class="dashboard-card-title">Projetos & Roadmap</span>
    <span class="dashboard-card-desc">Ciclos de estudo, planejamento e metas para as provas.</span>
  </a>
  <a class="dashboard-card" href="./03.-recursos/">
    <span class="dashboard-card-icon">🧰</span>
    <span class="dashboard-card-title">Recursos</span>
    <span class="dashboard-card-desc">Materiais de apoio, legislação, questões e links úteis.</span>
  </a>
  <a class="dashboard-card" href="./04.-arquivo/">
    <span class="dashboard-card-icon">🗄️</span>
    <span class="dashboard-card-title">Arquivo</span>
    <span class="dashboard-card-desc">Notas concluídas ou fora do ciclo atual de estudos.</span>
  </a>
</div>

## 📊 Notas por disciplina

```dataview
TABLE length(rows.file.name) AS "Quantidade de Notas"
FROM #concurso/materia
GROUP BY disciplina AS "Disciplina"
SORT length(rows.file.name) DESC
```

## 🕘 Como navegar

- Use a **busca** (`Ctrl+K`) para encontrar qualquer nota.
- Cada disciplina tem um **MOC** (mapa de conteúdo) que lista as notas por tópico automaticamente.
- Os botões no topo de cada nota permitem **baixar em .md/PDF**, abrir em **tela cheia** ou **editar no GitHub**.
