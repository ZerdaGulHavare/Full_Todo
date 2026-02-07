// src/models/Todo.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Veri tiplerini tanımlayalım
interface TodoAttributes {
  id: number;
  title: string;
  isCompleted: boolean;
}

// Oluşturulurken ID girmek zorunda değiliz (Otomatik artacak)
interface TodoCreationAttributes extends Optional<TodoAttributes, 'id' | 'isCompleted'> {}

// Model sınıfımız
export class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public isCompleted!: boolean;
  
  // createdAt ve updatedAt otomatik gelir
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Tabloyu initialize edelim
Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
  }
);
