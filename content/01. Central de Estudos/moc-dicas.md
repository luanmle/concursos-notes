---
title: Dicas
tipo: moc-central
categoria: dica
tags: [moc, central/dica]
---

## Notas

```dataview
TABLE aliases[0] AS "Assunto", contexto AS "Contexto"
FROM #central/dica
WHERE tipo = "central-de-estudos"
SORT file.mtime DESC
```

[[01. Central de Estudos/index|← Voltar à Central de Estudos]]
