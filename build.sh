#!/bin/bash

echo "🚀 Building JSON Beautifier Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing React dependencies..."
cd frontend
npm install

echo "🔨 Building React application..."
npm run build

echo "📁 Copying built React files to Spring Boot static resources..."
cd ..
rm -rf src/main/resources/static/*
cp -r frontend/build/static src/main/resources/static/
cp frontend/build/index.html src/main/resources/static/

echo "🍃 Building Spring Boot application..."
mvn clean package spring-boot:repackage -DskipTests

echo "✅ Build completed successfully!"
echo "📦 JAR file created: target/json-beautifier-1.0.0.jar"
echo ""
echo "🚀 To run the application:"
echo "   java -jar target/json-beautifier-1.0.0.jar"
echo ""
echo "🌐 The application will automatically open in your browser at http://localhost:2025" 