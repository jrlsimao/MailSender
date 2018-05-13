import Mongoose from 'mongoose';

export class ConnectionDB{
    private connectionString = '';
    private port : Number;
    private databaseName: string;
    private connection : Promise<Mongoose.Mongoose>;

    constructor(){
        
        //Load connectionString
        //Load port 
        //Load DB Name
        this.port = 27017;
        this.databaseName = 'email';
        this.connectionString = `mongodb://localhost:${this.port}/${this.databaseName}`;
        this.connection = Mongoose.connect(this.connectionString);
    }

    public getConnection(): Promise<Mongoose.Mongoose>{
        return this.connection;
    }

}