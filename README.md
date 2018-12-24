# Movies API
Trabalho da disciplina "Arquitetura e Desenvolvimento de APIs para Back-end"

Pós Graduação em Desenvolvimento de Aplicações para Dispositivos Móveis

PUC Minas - Contagem

## API
Para os testes e documentação dos metodos desta API foi utilizado o [Postman] e o arquivo para importação da coleção de testes pode ser encontrado [aqui](movies-api.postman_collection.json)

## Instalação e execução da aplicação

Este projeto foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js** - **10.14.2**
- **npm** - **6.4.1**
- **Docker** - **18.09**
- **MySql** - **5.7**

### Preparando banco de dados

Execute o comando:
``` sh
docker run --name mysql5.7 -e MYSQL_ROOT_PASSWORD=mysql -d  -p 3306:3306 mysql:5.7
```

Execute o script db.sql

### Preparando a aplicação

Execute o comando:
``` sh
npm install
```

### Execução

Execute o comando:
``` sh
npm start
```

## Configurações

- **PORT**: Porta na qual o servidor web ficará disponível (valor default: 3000);
- **LOG_LEVEL**: level de log, pode ser: [error, warning, info, debug]
- **DATABASE**: Dados de conexão com o mysql varia de acordo com o ambiente;

## Stack

Para a criação deste projeto foram utilizdas as seguintes tecnologias e frameworks:

- [Node.js] - Plataforma de desenvolvimento
- [Express] - Web framework minimalista desenvolvido em node.js
- [Winston] - Framework para padronização de logs
- [Morgan] - Framework para logs de requisiçẽos http
- [Postman] - Sistema para testes de APIs
- [Docker] - Plataforma de deploy
- [MySql] - Banco de dados Relacional

## Licença
[MIT](LICENSE)

## Autor
[Hugo Iuri](https://github.com/hugoiuri)


[Node.js]: <https://nodejs.org>
[Express]: <http://expressjs.com>
[Winston]: <https://www.npmjs.com/package/winston>
[Morgan]: <https://www.npmjs.com/package/morgan>
[Postman]: <https://www.getpostman.com/>
[Docker]: <https://www.docker.com/>
[MySql]: <https://www.mysql.com/>