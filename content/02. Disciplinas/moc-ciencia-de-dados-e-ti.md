---
title: Ciência de Dados e TI — MOC
tipo: moc
disciplina: Ciência de Dados e TI
tags:
  - moc
  - disciplina/ciencia-de-dados-e-ti
---

## 📝 Notas da disciplina

As notas com a tag `#disciplina/ciencia-de-dados-e-ti` aparecem aqui automaticamente:

```dataview
TABLE assunto AS "Assunto", topico AS "Tópico"
FROM #disciplina/ciencia-de-dados-e-ti
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/ciencia-de-dados-e-ti
WHERE tipo = "estudo-concurso"
GROUP BY topico
```

---

## 🗂️ Ementa

> [!note] Em construção
> Adicione aqui os tópicos e subtópicos da disciplina conforme montar o edital.
