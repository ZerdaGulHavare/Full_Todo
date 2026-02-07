// src/app.ts (İlgili kısımları güncelle)
import express, { Application } from 'express';
import cors from 'cors';
import sequelize from './config/database'; // Yeni import
import todoRoutes from './routes/TodoRoutes';

class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.connectToDatabase(); // Önce DB
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private async connectToDatabase() {
        try {
            // sync({ force: false }) -> Tablo yoksa oluşturur, varsa dokunmaz.
            await sequelize.sync(); 
            console.log("📂 SQLite Database Connected & Synced");
        } catch (error) {
            console.error("❌ Database Connection Error:", error);
        }
    }
    
    // ... (Geri kalan her şey, middlewares, routes, listen AYNI kalacak)
    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        this.app.use('/api/todos', todoRoutes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server is running at http://localhost:${this.port}`);
        });
    }
}

const PORT = 3000;
new App(PORT).listen();
