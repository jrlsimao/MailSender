import Express from 'express';
import * as bodyParser from 'body-parser';


export class Server{
    
    private localServer : Express.Application;

    constructor(){
        this.localServer = Express();
        this.localServer.use(bodyParser.json());
    }

    public getServer(): Express.Application{
        return this.localServer;
    }
}