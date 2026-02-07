# Todo App (Full Stack)

Node.js (Backend) ve React (Frontend) kullanılarak geliştirilmiş, REST API mimarisine sahip modern bir Todo uygulamasıdır. Veritabanı olarak SQLite kullanır.

## 📂 Dosya Yapısı

Todo-mobile eklenecektir.

```bash
todo-project/
├── todo-backend/        # API Servisi (Node.js + Express + SQLite)
│   ├── src/
│   │   ├── config/      # Veritabanı bağlantı ayarları
│   │   ├── controllers/ # İstek ve yanıt yönetimi
│   │   ├── models/      # Veri tabanı şemaları
│   │   ├── routes/      # API yönlendirmeleri
│   │   └── services/    # İş mantığı (Business Logic)
│   └── database.sqlite  # Veri tabanı dosyası
│
└── todo-frontend/       # Kullanıcı Arayüzü (React + TypeScript + Tailwind)
    ├── src/
    │   ├── components/  # Arayüz bileşenleri
    │   ├── interfaces/  # Veri tipi tanımları
    │   └── pages/       # Sayfa tasarımları
    └── tailwind.config.js
```

## 🚀 Kurulum ve Çalıştırma
Projeyi ayağa kaldırmak için iki ayrı terminal açın ve aşağıdaki adımları uygulayın.

1. Backend (API)
Sunucuyu 3000 portunda başlatır.
```bash
cd todo-backend
npm install
npm run dev
```

2. Frontend (UI)
Arayüzü geliştirme modunda başlatır.
```Bash
cd todo-frontend
npm install
npm run dev
```
Tarayıcıda verilen localhost adresine (örn: http://localhost:5173) giderek uygulamayı kullanabilirsiniz.

## 🔌 API Dokümantasyonu
Backend servisi aşağıdaki RESTful endpoint'leri sunar (Base URL: http://localhost:3000):

```bash
# 1. Tüm Görevleri Listele (GET)
curl -X GET http://localhost:3000/api/todos

# 2. Yeni Görev Ekle (POST)
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "React projesini tamamla"}'

# 3. Görevi Güncelle (PUT) - Örn: ID 1
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "React ve Node.js öğrenildi", "isCompleted": true}'

# 4. Görevi Sil (DELETE) - Örn: ID 1
curl -X DELETE http://localhost:3000/api/todos/1
```

---

bu benim ilk fullstack projemdir.