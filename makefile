SHELL := /bin/bash

.PHONY: all backend mobile web checks help

all: ## Run backend + mobile + web 
	@(cd backend/Buka.Api && dotnet restore && dotnet run) & \
	 (cd mobile/buka_app && flutter pub get && flutter run) & \
	 (cd web/buka-web && npm install && npm run dev) & \
	 wait

backend: ## Run backend only
	@cd backend/Buka.Api && dotnet restore && dotnet run

mobile: ## Run backend + mobile
	@(cd backend/Buka.Api && dotnet restore && dotnet run) & \
	 (cd mobile/buka_app && flutter pub get && flutter run) & \
	 wait

web: ## Run backend + web
	@(cd backend/Buka.Api && dotnet restore && dotnet run) & \
	 (cd web/buka-web && npm install && npm run dev) & \
	 wait

checks: ## Show installed tool versions
	@dotnet --version
	@npm --version
	@flutter --version
	@dart --version

help: ## Show available make commands
	@powershell -NoProfile -ExecutionPolicy Bypass -Command 'Get-Content "$(lastword $(MAKEFILE_LIST))" | ForEach-Object { if ($$_ -match "^([a-zA-Z_-]+):.*##\s*(.+)$$") { "{0,-12} {1}" -f $$matches[1], $$matches[2] } }'
