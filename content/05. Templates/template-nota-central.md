<%*
const id = tp.date.now("YYYYMMDDHHmm");
const categorias = [
  { nome: "Dica", valor: "dica", moc: "moc-dicas" },
  { nome: "Edital verticalizado", valor: "edital-verticalizado", moc: "moc-editais-verticalizados" },
  { nome: "Planejamento", valor: "planejamento", moc: "moc-planejamentos" },
  { nome: "Pós-edital em andamento", valor: "pos-edital", moc: "moc-pos-edital-em-andamento" },
];

const categoria = await tp.system.suggester(
  categorias.map((item) => item.nome),
  categorias,
  true,
  "Selecione a categoria"
);
const assunto = (await tp.system.prompt("Título da nota:", "", true)).trim();
if (!assunto) throw new Error("O título não pode ficar vazio.");

let concurso = "";
let status = "";
let dataProva = "";
if (categoria.valor !== "dica") {
  concurso = (await tp.system.prompt("Concurso relacionado (opcional):", "", false))?.trim() ?? "";
}
if (["planejamento", "pos-edital", "edital-verticalizado"].includes(categoria.valor)) {
  status = await tp.system.suggester(
    ["Rascunho", "Ativo", "Concluído", "Arquivado"],
    ["rascunho", "ativo", "concluido", "arquivado"],
    true,
    "Selecione o status"
  );
}
if (categoria.valor === "pos-edital") {
  dataProva = (await tp.system.prompt("Data da prova (AAAA-MM-DD, opcional):", "", false))?.trim() ?? "";
  if (dataProva && !/^\d{4}-\d{2}-\d{2}$/.test(dataProva)) {
    throw new Error("Use o formato AAAA-MM-DD para a data da prova.");
  }
}

await tp.file.rename(`${id} - ${assunto}`);
-%>
---
title: "<% assunto %>"
aliases:
  - "<% assunto %>"
ID: "<% id %>"
tipo: central-de-estudos
categoria: "<% categoria.valor %>"
assunto: "<% assunto %>"
contexto:
concurso: "<% concurso %>"
status: "<% status %>"
data_prova: "<% dataProva %>"
data_criacao: <% tp.file.creation_date("YYYY-MM-DD HH:mm") %>
ultima_revisao: <% tp.file.creation_date("YYYY-MM-DD") %>
tags:
  - central/<% categoria.valor %>
---

## Objetivo

- 

## Conteúdo

- 

## Próximas ações

- [ ] 

## Referências

- [[01. Central de Estudos/index|← Voltar à Central de Estudos]]
- MOC da categoria: [[<% categoria.moc %>]]
