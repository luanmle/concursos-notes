---
title: Central de Estudos
description: Dicas, planejamentos, editais e acompanhamento pós-edital.
---

Organize aqui as notas que orientam o estudo, independentemente da disciplina.

<div class="discipline-grid central-grid">
  <a class="discipline-card central-card" data-central-tag="dica" href="./moc-dicas"><span class="discipline-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4M8.5 14.5A7 7 0 1 1 15.5 14.5C14.5 15.3 14 16 14 18h-4c0-2-.5-2.7-1.5-3.5Z"/></svg></span><span class="discipline-content"><span class="discipline-name">Dicas</span><span class="central-description">Métodos, atalhos e aprendizados sobre preparação.</span><span class="discipline-meta">0 notas · sem atualização</span></span></a>
  <a class="discipline-card central-card" data-central-tag="edital-verticalizado" href="./moc-editais-verticalizados"><span class="discipline-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span><span class="discipline-content"><span class="discipline-name">Editais verticalizados</span><span class="central-description">Conteúdos do edital convertidos em listas de acompanhamento.</span><span class="discipline-meta">0 notas · sem atualização</span></span></a>
  <a class="discipline-card central-card" data-central-tag="planejamento" href="./moc-planejamentos"><span class="discipline-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg></span><span class="discipline-content"><span class="discipline-name">Planejamentos</span><span class="central-description">Ciclos, cronogramas, metas e ajustes de rota.</span><span class="discipline-meta">0 notas · sem atualização</span></span></a>
  <a class="discipline-card central-card" data-central-tag="pos-edital" href="./moc-pos-edital-em-andamento"><span class="discipline-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19V5M4 5h12l-2 4 2 4H4M8 22h8"/></svg></span><span class="discipline-content"><span class="discipline-name">Pós-edital em andamento</span><span class="central-description">Acompanhamento intensivo até a data da prova.</span><span class="discipline-meta">0 notas · sem atualização</span></span></a>
</div>

## Visão geral

```dataview
TABLE length(rows.file.name) AS "Quantidade de notas"
FROM #central
WHERE tipo = "central-de-estudos"
GROUP BY categoria AS "Categoria"
SORT length(rows.file.name) DESC
```

## Como usar

- Crie a nota em `01. Central de Estudos/Notas`; o template da Central será aplicado automaticamente.
- Escolha a categoria correspondente.
- O MOC e os indicadores desta página serão atualizados automaticamente.
- Use a busca (`Ctrl+K`) para localizar qualquer conteúdo da Central.

[[index|← Voltar ao Dashboard]]
