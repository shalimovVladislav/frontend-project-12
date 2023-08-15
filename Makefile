lint-frontend:
	make -C frontend lint

install:
	npm ci

start-backend:
	npx start-server

start-frontend:
	make -C frontend start

build-frontend:
	npm -C frontend run build

develop:
	make start-backend & make start-frontend

build:
	make start-backend & make build-frontend: