---
title: Estatística — MOC
tipo: moc
disciplina: Estatística
tags: [moc, disciplina/estatistica]
---
## 1. Estatística Descritiva e Análise Exploratória de Dados

- **1.1.** Tipos de variáveis (qualitativas nominais/ordinais e quantitativas discretas/contínuas)
- **1.2.** Representação tabular e gráfica (histogramas, diagrama de dispersão, boxplot, ogiva)
- **1.3.** Medidas de tendência central (média aritmética, geométrica, harmônica, mediana, moda e quantis)
- **1.4.** Medidas de dispersão (amplitude, variância, desvio padrão e coeficiente de variação)
- **1.5.** Medidas de assimetria e curtose

## 2. Probabilidade

- **2.1.** Experimento aleatório, espaço amostral e eventos
- **2.2.** Axiomas e teoremas básicos de probabilidade
- **2.3.** Probabilidade condicional e independência de eventos
- **2.4.** Teorema da Probabilidade Total e Teorema de Bayes

## 3. Variáveis Aleatórias

- **3.1.** Variáveis aleatórias unidimensionais (discretas e contínuas)
- **3.2.** Função de probabilidade e Função de densidade de probabilidade
- **3.3.** Função de distribuição acumulada
- **3.4.** Esperança matemática (valor esperado), variância e propriedades
- **3.5.** Variáveis aleatórias bidimensionais: covariância e coeficiente de correlação

## 4. Distribuições de Probabilidade

- **4.1.** Distribuições discretas: Uniforme discreta, Bernoulli, Binomial, Poisson e Hipergeométrica
- **4.2.** Distribuições contínuas: Uniforme contínua, Normal (curva de Gauss) e Exponencial
- **4.3.** Distribuições derivadas da Normal: t de Student, Qui-quadrado ($\chi^2$) e F de Snedecor
- **4.4.** Uso da tabela Normal Padrão (Z)

## 5. Amostragem

- **5.1.** População e amostra
- **5.2.** Técnicas de amostragem probabilística (aleatória simples, estratificada, sistemática e por conglomerados)
- **5.3.** Amostragem não probabilística
- **5.4.** Distribuições amostrais da média e da proporção
- **5.5.** Lei dos Grandes Números e Teorema Central do Limite

## 6. Inferência Estatística: Estimação

- **6.1.** Propriedades dos estimadores (não viés, consistência e eficiência)
- **6.2.** Estimação pontual (Método dos Momentos e Método da Máxima Verossimilhança)
- **6.3.** Estimação intervalar: Intervalos de Confiança para a média, proporção e variância
- **6.4.** Dimensionamento e determinação do tamanho da amostra

## 7. Inferência Estatística: Testes de Hipóteses

- **7.1.** Hipótese nula e hipótese alternativa
- **7.2.** Erros de Tipo I e Tipo II
- **7.3.** Nível de significância e Poder do teste
- **7.4.** Valor-p (p-value)
- **7.5.** Testes paramétricos para uma e duas médias, proporções e variâncias
- **7.6.** Testes não paramétricos básicos (Teste de aderência e independência Qui-quadrado)

## 8. Análise de Regressão e Correlação

- **8.1.** Correlação linear simples (Coeficiente de Pearson)
- **8.2.** Regressão linear simples: pressupostos, método dos mínimos quadrados ordinários (MQO)
- **8.3.** Avaliação do modelo: Coeficiente de determinação ($R^2$) e análise de resíduos
- **8.4.** Noções de Regressão linear múltipla
- **8.5.** Tabela de Análise de Variância (ANOVA) na regressão

## 9. Séries Temporais e Números Índices

- **9.1.** Conceitos básicos e componentes de uma série temporal (tendência, sazonalidade, ciclo e ruído)
- **9.2.** Suavização exponencial e médias móveis
- **9.3.** Números índices simples e compostos (Índices de Laspeyres, Paasche e Fisher)

## Notas da disciplina

```dataview
TABLE aliases[0] AS "Assunto", topico AS "Tópico"
FROM #disciplina/estatistica
WHERE tipo = "estudo-concurso"
SORT topico ASC
```
