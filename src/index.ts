import fastify from "fastify";
import AppConfig from "./config/appConfig";
import messagePlugin from "./whatsapp-services/index";

// const server: FastifyInstance = Fastify({
//     bodyLimit: 10485760
// });

const server = fastify();

server.register(require("fastify-cors"), { 
   prefix: "/"
});

server.register(messagePlugin, {prefix: "/user"});

const port = AppConfig.get("port");
console.log("port : " +port);
try {
    server.listen(port, "0.0.0.0", (error,address) => {
        error ? console.log(error) : console.log(`server started on ${address}`);
    });
  } catch(error) {
    console.log(error);
}