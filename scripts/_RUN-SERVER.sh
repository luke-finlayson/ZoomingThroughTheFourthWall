#!/bin/bash

export POSTGRES_PASSWORD=admin
export POSTGRES_USER=postgres
export POSTGRES_DB=fourth_wall_cache
export POSTGRES_HOST=localhost

export GOOGLE_APPLICATION_CREDENTIALS="./gc-credentials.json"

node ./server.js
