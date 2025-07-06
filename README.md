# JSON Beautifier

A modern, production-ready JSON beautifier web application.

## Özellikler
- JSON verisini hızlı ve güzel şekilde formatlar
- Modern ve responsive web arayüzü (React)
- Spring Boot backend ile tek JAR dosyasında çalışır
- Dosya yükleme, indirme, kopyalama desteği
- Otomatik tarayıcı açma

## Kurulum ve Production Build

### 1. Gereksinimler
- Java 17+
- Node.js & npm (sadece ilk build için)
- Maven

### 2. Build
```bash
./build.sh
```
Bu komut React frontend'i derler, Spring Boot ile tek bir JAR dosyasında paketler.

### 3. Çalıştırma
```bash
java -jar target/json-beautifier-1.0.0.jar
```
Uygulama otomatik olarak tarayıcınızda `http://localhost:2025` adresinde açılır.

## Dağıtım
- Sadece `target/json-beautifier-1.0.0.jar` dosyasını dağıtmanız yeterli.
- Sunucuda Java 17+ kurulu olmalı.

## Klasör Yapısı
- `frontend/` : React kaynak kodu
- `src/main/java/` : Spring Boot backend
- `src/main/resources/static/` : Build sonrası frontend dosyaları

## Ekstra
- Geliştirme için: `npm start` ile frontend'i ayrı çalıştırabilirsiniz.
- Testler ve örnekler production build'e dahil değildir.

---

**Production için gereksiz tüm dosya ve scriptler kaldırılmıştır.**

Sorularınız için: [github.com/cprdev/json-beautifier](https://github.com/cprdev/json-beautifier) 