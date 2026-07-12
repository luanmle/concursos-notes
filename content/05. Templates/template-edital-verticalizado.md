<%*
const id = tp.date.now("YYYYMMDDHHmmss");

const concurso = (await tp.system.prompt("Nome do concurso:", "", true)).trim();
if (!concurso) throw new Error("O nome do concurso não pode ficar vazio.");

const orgao = (await tp.system.prompt("Órgão (opcional):", "", false))?.trim() ?? "";
const cargo = (await tp.system.prompt("Cargo (opcional):", "", false))?.trim() ?? "";
const banca = (await tp.system.prompt("Banca organizadora (opcional):", "", false))?.trim() ?? "";
const numeroEdital = (await tp.system.prompt("Número ou identificação do edital (opcional):", "", false))?.trim() ?? "";

const status = await tp.system.suggester(
  ["Rascunho", "Em análise", "Em andamento", "Concluído", "Arquivado"],
  ["rascunho", "em-analise", "em-andamento", "concluido", "arquivado"],
  true,
  "Status do edital verticalizado"
);

const dataPublicacao = (await tp.system.prompt(
  "Data de publicação do edital (AAAA-MM-DD, opcional):",
  "",
  false
))?.trim() ?? "";
const dataProva = (await tp.system.prompt(
  "Data da prova (AAAA-MM-DD, opcional):",
  "",
  false
))?.trim() ?? "";

for (const [rotulo, data] of [["publicação", dataPublicacao], ["prova", dataProva]]) {
  if (data && !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    throw new Error(`Use o formato AAAA-MM-DD para a data de ${rotulo}.`);
  }
}

const titulo = cargo ? `${concurso} — ${cargo}` : concurso;
await tp.file.rename(`${id} - Edital verticalizado - ${titulo}`);
-%>
---
title: "Edital verticalizado — <% titulo %>"
aliases:
  - "<% concurso %>"
ID: "<% id %>"
tipo: central-de-estudos
categoria: edital-verticalizado
concurso: "<% concurso %>"
orgao: "<% orgao %>"
cargo: "<% cargo %>"
banca: "<% banca %>"
edital: "<% numeroEdital %>"
status: "<% status %>"
data_publicacao: "<% dataPublicacao %>"
data_prova: "<% dataProva %>"
data_criacao: <% tp.file.creation_date("YYYY-MM-DD HH:mm") %>
ultima_revisao: <% tp.file.creation_date("YYYY-MM-DD") %>
tags:
  - central/edital-verticalizado
---

## Visão geral

| Informação | Detalhe |
|---|---|
| Concurso | <% concurso %> |
| Órgão | <% orgao || "—" %> |
| Cargo | <% cargo || "—" %> |
| Banca | <% banca || "—" %> |
| Edital | <% numeroEdital || "—" %> |
| Publicação | <% dataPublicacao || "—" %> |
| Prova | <% dataProva || "—" %> |
| Status | <% status %> |

## Conteúdo programático

> [!tip] Como preencher
> Use uma linha para cada tópico ou subtópico, mantendo a numeração original do edital. Adicione links para as notas relacionadas na segunda coluna.

| Conteúdo | Notas relacionadas |
|---|---|
|  |  |

## Pontos de atenção do edital

- 

## Alterações e retificações

| Data | Documento | Alteração |
|---|---|---|
|  |  |  |

## Links e arquivos oficiais

- Edital: 
- Página da banca: 
- Retificações: 

## Referências

- [[01. Central de Estudos/index|← Voltar à Central de Estudos]]
- [[moc-editais-verticalizados|Ver todos os editais verticalizados]]
