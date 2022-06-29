# Back-End-Test - Productz Page

Esse é um teste que desenvolvi durante um processo seletivo para uma vaga no Back-End! Utilizei tecnologias como:
✔️ NodeJS
✔️ Prisma (ORM)
✔️ MySQL
✔️ Multer
✔️ Passport etc...

# O Site


## Acesso 🧭

Logo ao entrar, tem um botão chamativo para realizar o cadastro. Nessa etapa eu gostaria de ter implementado tratamentos de erro para deixar a aplicação mais completa.

![cadastrando](https://raw.githubusercontent.com/antoniovpires/EVA-Test-LAB/main/readme-gifs/cadastro.gif?token=GHSAT0AAAAAABUNJ5JGAOSMKDRP4WCWVQVEYV3UJ2A)

Caso não seja o primeiro acesso, tem um botão para realizar o Login logo abaixo do botão principal, ou então lá na barra de navegação! (Também estão faltando os tratamentos de erro aqui)

![realizando logout e login](https://github.com/antoniovpires/EVA-Test-LAB/blob/main/readme-gifs/logout%2Blogin.gif)

## CRUD dos Produtos! 

Para adicionar os produtos é fácil, basta clicar no botão na barra de navegação e preencher os campos necessários. Infelizmente não consegui estabelecer uma regra para liberar o botão de salvar apenas se pelo menos uma imagem estiver adicionada.

![criando o produto](https://github.com/antoniovpires/EVA-Test-LAB/blob/main/readme-gifs/criando.gif)

Também é possível listar todos os produtos que você adicionou. Além de editá-los a qualquer momento. Nessa etapa percebi que as imagens não são retornadas ao usuário da mesma forma que as outras características do produto.

![editando o produto](https://github.com/antoniovpires/EVA-Test-LAB/blob/main/readme-gifs/editando.gif)

Você pode clicar no produto para vê-lo numa página separada, e assim terá acesso ao carroussel com todas as imagens!

![carroussel e produto](https://github.com/antoniovpires/EVA-Test-LAB/blob/main/readme-gifs/carroussel.gif)

Por fim, você pode remover os produtos que desejar e realizar o Logout! Percebi que as imagens incluídas ao sistema não são removidas quando se deleta o produto 🤔

![removendo um produto](https://github.com/antoniovpires/EVA-Test-LAB/blob/main/readme-gifs/removendo.gif)

# Conclusão

Foi um projeto desafiador, e eu queria poder ter feito muito mais. Com o tempo que tive disponível, aprendi várias tecnologias que nunca sequer havia tido contato anteriormente. Não foi um teste fácil, mas foi recompensador. Me sinto mais confiante e continuarei trabalhando nele para melhorar ainda mais minhas habilidades e também o funcionamento da aplicação.

#### Próximas etapas:
- Tratar os erros
- Disponibilzar CRUD de categorias
- Adicionar opção de Idiomas


# Instalando e Usando a Aplicação

Não tenho muita vivência para dar tutoriais. Boa sorte :D
Siga as etapas! 

- 1ª Clone este Repositório
- 2ª Instale os módulos através de 
```
npm install
```
  ⚠️ Atenção Tive problemas com o "express-validator", consegui utilizá-lo corretamente apenas na versão 5.3.0 ⚠️
- 3ª Crie o Banco de Dados conforme os dados do arquivo db.sql
- 4ª Crie um modelo Prisma 
```
npx prisma db pull
```
  - Depois inicie o Prisma Client 
```
npx prisma generate
```
- 5ª Inicie o programa através de um terminal com o comando
```
npm run dev
```
  O programa irá iniciar em localhost:3000/ por padrão, mas você pode alterar.
- 6ª Divirta-se! O programa é bem simples e a dor de cabeça deve estar mais presente nesse tutorial que você acabou de ler. No mais, espero que tenha gostado do projeto. Qualquer feedback será muito bem vindo.


