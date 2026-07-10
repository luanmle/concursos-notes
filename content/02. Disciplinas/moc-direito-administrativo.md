---
title: DIreito Administrativo — MOC
tipo: moc
disciplina: DIreito Administrativo
tags:
  - moc
  - disciplina/direito-administrativo
---

## 📝 Notas da disciplina

As notas criadas com a tag `#disciplina/direito-administrativo` aparecem aqui automaticamente:

```dataview
TABLE assunto AS "Assunto", topico AS "Tópico"
FROM #disciplina/direito-administrativo
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/direito-administrativo
WHERE tipo = "estudo-concurso"
GROUP BY topico
```

---

