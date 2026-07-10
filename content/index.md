---
title: Dashboard
---

## 📚 Disciplinas

<div class="discipline-grid">
  <a class="discipline-card" href="./02.-disciplinas/moc-direito-constitucional"><span class="discipline-icon">🏛️</span> Direito Constitucional</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-direito-administrativo"><span class="discipline-icon">⚖️</span> Direito Administrativo</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-portugues"><span class="discipline-icon">🗣️</span> Português</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-direito-penal"><span class="discipline-icon">🚔</span> Direito Penal</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-raciocinio-logico-matematico"><span class="discipline-icon">🧮</span> Raciocínio Lógico Matemático</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-ciencia-de-dados-e-ti"><span class="discipline-icon">💾</span> Ciência de Dados e TI</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-contabilidade-geral"><span class="discipline-icon">📊</span> Contabilidade Geral</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-informatica"><span class="discipline-icon">🖥️</span> Informática</a>
  <a class="discipline-card" href="./02.-disciplinas/moc-legislacoes"><span class="discipline-icon">📜</span> Legislações</a>
</div>

<div class="quick-links">
  <a href="./01.-projetos/">🗺️ Projetos & Roadmap</a>
  <a href="./03.-recursos/">🧰 Recursos</a>
  <a href="./04.-arquivo/">🗄️ Arquivo</a>
</div>

## 📊 Notas por disciplina

```dataview
TABLE length(rows.file.name) AS "Quantidade de Notas"
FROM #concurso/materia
GROUP BY disciplina AS "Disciplina"
SORT length(rows.file.name) DESC
```

## 🕘 Como navegar

- Use a **busca** na barra superior (`Ctrl+K`) para encontrar qualquer nota.
- Cada disciplina tem um **MOC** que lista suas notas por tópico automaticamente.
- Os botões no topo de cada nota permitem **baixar em .md/PDF**, abrir em **tela cheia** ou **editar no GitHub**.
