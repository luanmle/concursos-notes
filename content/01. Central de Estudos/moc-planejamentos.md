---
title: Planejamentos
tipo: moc-central
categoria: planejamento
tags: [moc, central/planejamento]
---

## Notas

```dataview
TABLE concurso AS "Concurso", status AS "Status"
FROM #central/planejamento
WHERE tipo = "central-de-estudos"
SORT file.mtime DESC
```

[[01. Central de Estudos/index|← Voltar à Central de Estudos]]
