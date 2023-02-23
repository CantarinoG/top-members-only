<details open>
<summary>English</summary>
<br>

## Exclusive Club

Project from [The Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only).

An exclusive club where users can write anonymous post and only members can see the post's author.

This project depends heavily on authentication and the implementation was made with Passport.js. Other technologies used were Node.js, Express.js and mongoDB.

The authentication is local. The user's username and password are stored in a database and the password is secured with hashing and salting.

A non-authenticated user can see the messages but can not see the author or when was the message posted, and can not write their own messages.

Once the user is authenticated, they can see when messages were posted and send their own messages, but cannot see the author of the messages until they become a member.

To become a member, the authenticated user must submit a secret password in the Member Status page. For testing purposes the password is: "manonthemoon". The user will then be able to see authors of posts.

Deploy link: https://top-members-only.cantarinog.repl.co

<br>
</details>

<details>
<summary>Português</summary>
<br>

## Clube Exclusivo

Projeto do [The Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only).

Um clube exclusivo onde usuários podem escrever mensagens anônimas e apenas membros podem ver o autor da mensagem.

Esse projeto depende de autenticação e a implementação dela é feita com Passport.js. Outras tecnologias usadas foram Node.js, Express.js e mongoDB.

A autenticação é local. O nome de usuário e senha são armazenados num banco de dados e a senha é devidamente protegida com hashing e salting.

Um usuário não autenticado pode ver mensagens mas não pode ver o autor delas ou quando foram postadas, e não pode postar suas próprias mensagens.

Uma vez que o usuário é autenticado, ele pode ver quando as mensagens foram postadas e postar suas próprias mensagens, mas não pode ver os autores das mensagens até se tornar um membro.

Para se tornar um membro, o usuário autenticado precisa inserir uma senha secreta na página Member Status. Para propósitos de teste, a senha é: "manonthemoon". O usuário será então capaz de ver os autores das mensagens.

Deploy/demonstração: https://top-members-only.cantarinog.repl.co

<br>
</details>