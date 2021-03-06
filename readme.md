Express/Angular2 Starter
========================
This is a starter template for an Angular2 application with an express JSON API backend. Includes basic authentication.

Prerequisites
============
Docker

Install Dev Environment
=======================
1. Clone this repo
2. Install Docker
3. Copy the sample.env file to a file named .env.  Change the database passwords and session key if you would like.
4. In the directory where you cloned this repo, run the following to start the server

`docker-compose up -d`

5. On your local machine make sure you have node and npm installed.

6. Install angular-cli

`npm install angular-cli`

7. Start the client.

`ng serve`

A few other useful commands
---------------------------
Start with production settings

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

Run tests

`docker-compose run --rm test gulp test:server`