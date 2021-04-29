import mongoose from "mongoose";
import appConfig from "../config/AppConfig";

export default class DBConnection {

    static connect(dbName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const mongoUrl = `mongodb://${appConfig.get("database:mongodb:host")}:${appConfig.get("database:mongodb:port")}`;
            DBConnection.connectToPath(`${mongoUrl}/${dbName}`, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true
            }).then((db) => {
                return resolve(db);
            }).catch((err) => {
                // if connection to docker hosted mongodb fails
                console.log("failed connection to ", `${mongoUrl}/${dbName}`);
                DBConnection.connectToPath(`mongodb://localhost:27017/${dbName}`).then(resolve, reject);
            });
        });
    }

    static connectToPath(url: string, config?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoose.connect(url, config, (err) => {
                err ? reject(err) : resolve({});
            });
        });
    }

    static disconnect(): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoose.disconnect((error) => {
                error ? reject(error) : resolve({});
            });
        });
    }

    static dropDatabase(): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoose.connection.dropDatabase((err) => {
                err ? reject(err) : resolve({});
            });
        });
    }
}
