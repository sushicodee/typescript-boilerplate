import express,{Application} from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middlewares/error.middleware';
import helmet from 'helmet';

class App {
    public express:Application
    public port:number;
    
    constructor(controllers:Controller[],port:number) {
            this.express = express();
            this.port = port

            this.initializeDatabaseConnection();
            this.initializeMiddleware();
            this.initializeControllers(controllers);
            this.initializeErrorHandling();
    }

    private initializeMiddleware():void {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(compression());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    private initializeControllers(controllers:Controller[]):void {
        controllers.forEach((controller:Controller) => {
            this.express.use('/api/v1',controller.router);
        })
    }

    private initializeErrorHandling():void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection():void{
        const {MONGO_PATH,MONGO_USER,MONGO_PASSWORD} = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
    }

    public listen():void {
        this.express.listen(this.port, () => {})
    }
}

export default App