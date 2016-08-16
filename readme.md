Express/Angular2 Starter
========================
This is a starter template for an Angular2 application with an express JSON API backend. Includes basic authentication.

Install Dev Environment
=======================
1. Clone this repo
2. Install Vagrant and Virtualbox
3. In the directory where you cloned this repo, run the following to start the server

`vagrant up`

4. On your local machine make sure you have node and npm installed.

5. Install angular-cli

`npm install angular-cli`

5. Start the client.

`ng serve`

A few other useful commands
---------------------------
Start with production settings

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

Run tests

`docker-compose run --rm test gulp test:server`