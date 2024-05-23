# quiz-online

  Uma aplicação em full-stack que possui métodos para construir questionários de variados modos para usuários assim realizarem desde testes de conhecimento e formulários para fins de opiniões ou testes de conhecimento e podem ser enviada a seus amigos, nessa aplicação varia de 2 a multiplas escolhas em cada questão que deseja implementar

## Back-End

  Escolhi Java pela robustez e é onde possuo melhor habilidade para desenvolver aliado ao Springboot excelente para montar depedencias e construir para Web utilizando metodologias Rest usando o própio spring initializer selecionando Maven, banco de dados MySQL para armazenar dados de escolhas e construção de perguntas com o título do quiz feito pelo usuário comum. documentação com OpenApi Swagger para outros desenvolvedores conhecerem o que cada ação nas controllers faz nos métodos GET,DELETE,PUT e CREATE da aplicação. realizado a adição de um comando de Origins para comunicar o Back-End com o Front-End chamando o localhost do React.

## Front-End
  
  NodeJs para criar modelo pré pronto do ReactJs com Javascript utilizando Vite com o comando "npm vite@latest" para este propósito, no front fez necessário a construção de muitas rotas com React-Router-Dom afinal, para este quiz precisa de muitas telas como uma inicial, tela especial com duas rotas para criar um questionário e outra para gerenciar as já existentes no banco de dados, lógica para diversas situações de escolhas e selecionar qual quiz fazer e telas para definir a lista escolhida, suas questões e uma última de confirmação. Opções para o Admin editar ou deletar a questão criada e deletar todas feitas, para comunicar o back-end ao react, foi utilizado a depedencia Axios e criar a const URL assim chamando o localhost do MySQL e todos seus Mappings para cada um ter uma direção.

#### Languagens Back-End

- Java 17
- Springboot 3.2.6
- MySQL 8.0
- Swagger 2.5.0

## Front-end

- JavaScript
- ReactJS 18.2.0
- NodeJS 20.12.2
- Bootstrap 5.3.2
