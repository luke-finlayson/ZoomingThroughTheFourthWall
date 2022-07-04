@echo off

set POSTGRES_PASSWORD=admin
set POSTGRES_USER=postgres
set POSTGRES_DB=fourth_wall_cache
set POSTGRES_HOST=localhost

set GOOGLE_APPLICATION_CREDENTIALS=gc-credentials.json

node .\server.js
