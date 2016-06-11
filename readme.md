Run a shell inside the running container to run tests, migrations, etc.
`docker exec -it vagrant_web_1 bash`

Start with production settings
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

