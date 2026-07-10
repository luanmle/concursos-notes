---
title: Português — MOC
tipo: moc
disciplina: Português
tags:
  - moc
  - disciplina/portugues
---

## 📝 Notas da disciplina

As notas com a tag `#disciplina/portugues` aparecem aqui automaticamente:

```dataview
TABLE assunto AS "Assunto", topico AS "Tópico"
FROM #disciplina/portugues
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/portugues
WHERE tipo = "estudo-concurso"
GROUP BY topico
```

---

## 🗂️ Ementa

> [!note] Em construção
> Adicione aqui os tópicos e subtópicos da disciplina conforme montar o edital.
