# Desafio FullStack

## Descrição do Projeto Este projeto consiste em uma aplicação para cadastro de desenvolvedores associados a diferentes níveis. A aplicação é composta por um backend que oferece uma API RESTful e um frontend que é uma SPA (Single Page Application) interligada à API.

Instruções para executar o projeto localmente

1. Crie um arquivo .env no projeto backend com as seguintes variaveis:

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:OMcbOGvbMopt71zvG/Xa2VbHaaMIF7Fw7qN7HJJx+VI=
APP_DEBUG=false
APP_URL=http://localhost


DB_CONNECTION=pgsql
DB_HOST=ep-nameless-voice-a2hrxfpm.eu-central-1.pg.koyeb.app
DB_PORT=5432
DB_DATABASE=koyebdb
DB_USERNAME=koyeb-adm
DB_PASSWORD=npg_Y7Ifbv3BuzKJ
DB_SSLMODE=require
```

2. Subir os containers No diretório do projeto, execute o comando:

```
docker-compose up --build -d
```

3. Links Importantes

Backend local:http://localhost:8000/

Frontend local: http://localhost:5173

Documentação da API: http://localhost:8000/api/documentation#/

Deploy de Produção Frontend em produção: https://desafio-fullstack-lemon.vercel.app/

# AVISO 
```
O deploy do backend foi feito na Koyeb (plano gratuito), portanto, as primeiras requisições podem demorar de 30 segundos a 1 minuto para serem processadas.
```
