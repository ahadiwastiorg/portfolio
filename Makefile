dev:
	docker compose up

prod: build
	docker compose -f docker-compose.prod.yaml up

build:
	docker build -f Dockerfile.prod -t web .

dist: build
	docker create --name web web
	docker cp web:/app ./dist
	docker rm web
