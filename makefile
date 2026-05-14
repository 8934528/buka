.PHONY: help install build dotnet-run flutter-run npm-run run-all dotnet-restore flutter-pub-get npm-install setup-all dotnet-clean flutter-clean npm-clean clean-all

# Variables
DOTNET_PROJECT = backend/Buka.Api/Buka.Api.csproj
FLUTTER_DIR = mobile/buka_app
WEB_DIR = web/buka-web

help:
	@echo "Buka - Development Commands"
	@echo "--------------------------------"
	@echo "=== Setup Commands ==="
	@echo "setup-all        - Install dependencies for .NET, Flutter, and React"
	@echo "dotnet-restore   - Restore .NET packages"
	@echo "flutter-pub-get  - Get Flutter packages"
	@echo "npm-install      - Install NPM packages for frontend"
	@echo ""
	@echo "=== Run Commands ==="
	@echo "run-all          - Run .NET, Flutter, and React simultaneously in this terminal"
	@echo "dotnet-run       - Run the .NET API"
	@echo "flutter-run      - Run the Flutter mobile app"
	@echo "npm-run          - Run the React web app"
	@echo ""
	@echo "=== Clean Commands ==="
	@echo "clean-all        - Clean all projects"
	@echo "dotnet-clean     - Clean the .NET backend"
	@echo "flutter-clean    - Clean the Flutter app"
	@echo "npm-clean        - Clean the React app node_modules"
	@echo "--------------------------------"

install: setup-all

build:
	dotnet build $(DOTNET_PROJECT)
	cd $(FLUTTER_DIR) && flutter build apk
	cd $(WEB_DIR) && npm run build

dotnet-run:
	dotnet run --project $(DOTNET_PROJECT)

flutter-run:
	cd $(FLUTTER_DIR) && flutter run

npm-run:
	cd $(WEB_DIR) && npm run dev

run-all:
	@echo "Starting all services in parallel..."
	(dotnet run --project $(DOTNET_PROJECT)) & \
	(cd $(FLUTTER_DIR) && flutter run) & \
	(cd $(WEB_DIR) && npm run dev) & \
	wait

dotnet-restore:
	dotnet restore $(DOTNET_PROJECT)

flutter-pub-get:
	cd $(FLUTTER_DIR) && flutter pub get

npm-install:
	cd $(WEB_DIR) && npm install

setup-all: dotnet-restore flutter-pub-get npm-install
	@echo "All dependencies installed and configured"

# --- Separate Clean Commands ---
dotnet-clean:
	dotnet clean $(DOTNET_PROJECT)

flutter-clean:
	cd $(FLUTTER_DIR) && flutter clean

npm-clean:
	rm -rf $(WEB_DIR)/dist
	rm -rf $(WEB_DIR)/node_modules
	rm -f $(WEB_DIR)/package-lock.json

clean-all: dotnet-clean flutter-clean npm-clean
	@echo "All build artifacts have been removed!"
