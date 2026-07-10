---
title: Editais verticalizados
tipo: moc-central
categoria: edital-verticalizado
tags: [moc, central/edital-verticalizado]
---

## Notas

```dataview
TABLE concurso AS "Concurso", status AS "Status"
FROM #central/edital-verticalizado
WHERE tipo = "central-de-estudos"
SORT file.mtime DESC
```

[[01. Central de Estudos/index|← Voltar à Central de Estudos]]
