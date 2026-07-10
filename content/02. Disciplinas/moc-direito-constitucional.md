---
title: Direito Constitucional — MOC
tipo: moc
disciplina: Direito Constitucional
tags:
  - moc
  - disciplina/direito-constitucional
---

## Notas da disciplina

As notas criadas com a tag `#disciplina/direito-constitucional` aparecem aqui automaticamente, organizadas por tópico:

```dataview
TABLE assunto AS "Assunto", topico AS "Tópico"
FROM #disciplina/direito-constitucional
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/direito-constitucional
WHERE tipo = "estudo-concurso"
GROUP BY topico
```
