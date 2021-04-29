import { FastifyInstance }  from "fastify";
import MessageController from "./controllers/messageController";
// import UserController from "./controllers/userController";

async function messagePlugin(app: FastifyInstance,opts) { 
    try {
        app.post("/signup" , MessageController.create);
        app.get("/login" , MessageController.read);
        app.patch("/update/:id" ,MessageController.update);

        // app.get("/contacts" , MessageController.Contacts);
        // app.get("/message" , MessageController.scanQrCode);
        app.post("/message" , MessageController.sendMessage);    
    }catch(error) {
        console.log(error);
    }   
}

export default messagePlugin;