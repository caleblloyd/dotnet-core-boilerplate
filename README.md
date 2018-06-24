# .NET Core Boilerplate


master | develop
--- | ---
[![Build Status](https://travis-ci.org/caleblloyd/dotnet-core-boilerplate.svg?branch=master)](https://travis-ci.org/caleblloyd/dotnet-core-boilerplate) | [![Build Status](https://travis-ci.org/caleblloyd/dotnet-core-boilerplate.svg?branch=develop)](https://travis-ci.org/caleblloyd/dotnet-core-boilerplate)

A complete .NET Core development environment scaffolded using Docker Compose containing:

- .NET Core 2.1 MVC App with Entity Framework MySQL
- PostgreSQL Server
- pgadmin4
- extensible Javascript UI
- NGINX
- Travis CI
- Automated packaging and Docker Image deployment

## Getting Started

- Clone Repository
- Install [Docker Compose](https://docs.docker.com/compose/install/)
- Run `docker-compose up` in repository root
- UI: `http://<your docker host>:48000`
- pgadmin4: `http://<your docker host>:48011`
  - host: `db`
  - user: `postgres`
  - password: `postgres`
