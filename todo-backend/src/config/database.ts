// src/config/database.ts
import { Sequelize } from 'sequelize';

// SQLite veritabanı dosyasının nerede oluşacağını belirtiyoruz
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Proje ana dizininde oluşacak dosya
  logging: false // Konsolu kirletmesin diye logları kapattım
});

export default sequelize;
