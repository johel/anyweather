# anyweather
React Weather app, with complete webpack features and architecture following best practices. It can be used for future projects as a boilerplate.


### Considerações

O projeto entregue até 23:59 do dia 2 não está completo.
Com a finalidade de entregar o projeto de maneira funcional no tempo estipulado, o projeto está pendente de várias refatorações
e da utilização do redux. A utilização do redux para gerenciamento do estado da aplicação, entretanto, é uma prática que me 
considero bem habituado, conhecendo boas práticas como a utilização de selectors para já entregar o estado de forma semântica
para cada componente.

Pretendo dar continuidade ao projeto em outro branch para suprir as pendências e, caso seja conveniente, por favor verificar atualizações no dia da avaliação.

A criação do esqueleto do projeto foi extensa e demandou bastante tempo para ser customizada, embora tenha sido baseada
em um curso de webpack2 oferecido pelo udemy. Por essa razão, fez-se um commit acumulado inicial,
visando a separar um pouco as habilidades em webpack, das habilidades em react.

Um dos problemas de customização enfrentados com webpack foi a inclusão de ícones na aplicação
mais especificamente os weather-icons que tiveram que ter um arquivo de mapeamento para terem correspondência com os ícones
indicados pelo open weather map api.

No mais, procurou-se utilizar uma arquitetura de aplicações robustas no projeto, visando à demonstração das melhores práticas
de desenvolmento em react.

### Setup

Development - porta 8080
1.npm install
2.npm run serve

Build
1.npm install
2.npm run build

### Milestones

1. Refatorar
2. Passar pra redux e componentizar adequadamente, separando containers e presentational components.
3. Implementar busca reativa no evento on change, utilizando RxJS e seu método switchMapLatest
4. Utilizar flow e linters
5. Implementar testes unitários, utilizando jest e enzyme
6. Adicionar previsões do tempo dos 5 próximos dias e melhorar design/layout da aplicação

