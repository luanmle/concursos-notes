---
title: Pós-edital em andamento
tipo: moc-central
categoria: pos-edital
tags: [moc, central/pos-edital]
---

## Notas

```dataview
TABLE concurso AS "Concurso", data_prova AS "Data da prova", status AS "Status"
FROM #central/pos-edital
WHERE tipo = "central-de-estudos"
SORT data_prova ASC
```

[[01. Central de Estudos/index|← Voltar à Central de Estudos]]
