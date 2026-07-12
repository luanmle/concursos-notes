---
title: Ciência de Dados — MOC
tipo: moc
disciplina: Ciência de Dados
tags: [moc, disciplina/ciencia-de-dados]
---
## 1. Fundamentos de Ciência de Dados e Big Data

- **1.1.** Conceitos básicos e evolução da Ciência de Dados
- **1.2.** Ciclo de vida de projetos de dados (metodologias CRISP-DM, KDD e SEMMA)
- **1.3.** Big Data: conceitos, características (Os V's do Big Data) e arquitetura
- **1.4.** Ecossistema Big Data (Hadoop, HDFS, MapReduce, Spark e Kafka)

## 2. Engenharia de Dados e Armazenamento

- **2.1.** Arquiteturas de dados: Data Warehouse, Data Mart, Data Lake e Data Lakehouse
- **2.2.** Modelagem Dimensional (Star Schema e Snowflake)
- **2.3.** Processos de integração de dados: ETL (Extract, Transform, Load) e ELT
- **2.4.** Bancos de dados relacionais e NoSQL (Chave-valor, Documento, Grafo, Colunar)

## 3. Pré-processamento e Tratamento de Dados

- **3.1.** Coleta, integração e formatação de dados estruturados e não estruturados
- **3.2.** Limpeza de dados (Data Cleansing): tratamento de dados ausentes (missing values), ruídos e outliers
- **3.3.** Transformação de dados: normalização, padronização e discretização
- **3.4.** Engenharia de Atributos (Feature Engineering) e seleção de variáveis (Feature Selection)

## 4. Aprendizado de Máquina (Machine Learning)

- **4.1.** Conceitos e paradigmas de aprendizado de máquina
- **4.2.** Aprendizado Supervisionado (Classificação e Regressão)
- **4.3.** Aprendizado Não Supervisionado (Clusterização/Agrupamento e Redução de Dimensionalidade)
- **4.4.** Noções de Aprendizado por Reforço e Aprendizado Semissupervisionado

## 5. Algoritmos e Modelos Preditivos

- **5.1.** Regressão Linear e Regressão Logística
- **5.2.** Árvores de Decisão e Random Forest (Florestas Aleatórias)
- **5.3.** Máquinas de Vetores de Suporte (SVM)
- **5.4.** K-Nearest Neighbors (k-NN) e Naive Bayes
- **5.5.** Algoritmos de Clusterização: K-Means e agrupamento hierárquico
- **5.6.** Redução de dimensionalidade: Análise de Componentes Principais (PCA)
- **5.7.** Métodos Ensemble (Bagging, Boosting e Gradient Boosting: XGBoost, LightGBM)

## 6. Avaliação e Validação de Modelos

- **6.1.** Divisão de dados: conjuntos de treino, validação e teste
- **6.2.** Validação cruzada (Cross-Validation e K-Fold)
- **6.3.** O dilema Viés-Variância (Bias-Variance Tradeoff), Overfitting e Underfitting
- **6.4.** Métricas para Classificação: Matriz de Confusão, Acurácia, Precisão, Recall (Sensibilidade), F1-Score e Curva ROC/AUC
- **6.5.** Métricas para Regressão: MAE, MSE, RMSE e R²
- **6.6.** Otimização de hiperparâmetros (Grid Search e Random Search)

## 7. Mineração de Texto e Processamento de Linguagem Natural (PLN)

- **7.1.** Conceitos básicos de mineração de texto (Text Mining)
- **7.2.** Pré-processamento de texto: Tokenização, Stop Words, Stemming e Lemmatization
- **7.3.** Representação de texto: Bag of Words (BoW) e TF-IDF
- **7.4.** Word Embeddings (Word2Vec, GloVe)
- **7.5.** Análise de Sentimentos e Extração de Entidades Nomeadas (NER)

## 8. Noções de Deep Learning (Aprendizado Profundo)

- **8.1.** Fundamentos de Redes Neurais Artificiais (Perceptron e Multilayer Perceptron - MLP)
- **8.2.** Funções de ativação (Sigmoid, ReLU, Tanh)
- **8.3.** Redes Neurais Convolucionais (CNN) para visão computacional
- **8.4.** Redes Neurais Recorrentes (RNN) para dados sequenciais

## 9. Linguagens e Ferramentas Aplicadas

- **9.1.** Linguagem Python: sintaxe básica e bibliotecas fundamentais (NumPy e Pandas)
- **9.2.** Python para Machine Learning (Scikit-learn, TensorFlow e Keras)
- **9.3.** Linguagem R: estruturas de dados, pacotes estatísticos e manipulação (dplyr)
- **9.4.** Ambientes de desenvolvimento (Jupyter Notebooks e Google Colab)

## 10. Visualização de Dados e Comunicação

- **10.1.** Princípios de design da informação e visualização de dados
- **10.2.** Bibliotecas de visualização em Python (Matplotlib, Seaborn, Plotly) e R (ggplot2)
- **10.3.** Ferramentas de Business Intelligence corporativo (Microsoft Power BI e Tableau)
## Notas da disciplina

```dataview
TABLE aliases[0] AS "Assunto", topico AS "Tópico"
FROM #disciplina/ciencia-de-dados
WHERE tipo = "estudo-concurso"
SORT topico ASC
```
