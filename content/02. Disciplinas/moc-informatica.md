---
title: Informática — MOC
tipo: moc
disciplina: Informática
tags:
  - moc
  - disciplina/informatica
---

## 📝 Notas da disciplina

As notas com a tag `#disciplina/informatica` aparecem aqui automaticamente:

```dataview
TABLE assunto AS "Assunto", topico AS "Tópico"
FROM #disciplina/informatica
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/informatica
WHERE tipo = "estudo-concurso"
GROUP BY topico
```

---

## 🗂️ Ementa

> [!note] Em construção
> Adicione aqui os tópicos e subtópicos da disciplina conforme montar o edital.
