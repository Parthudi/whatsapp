const {Client} = require("whatsapp-web.js");
client = new Client();
whatsappClient = {};

exports.autnenticationMessage = async(req, res) => {
    try {
        if (whatsappClient && whatsappClient.newClient) {
            console.log("whatsappClient inside qrAuthentication  : " +JSON.stringify(whatsappClient.newClient));
            await res.status(200).send({user :"User Is Authenticated"});

        }else {
            client.on(`authenticated`, (session) => {
                console.log("session is : " +session);
                whatsappClient["newClient"] = session;
            });
        
            client.on(`auth_failure`, (msg) => {
                console.log(`auth_failure`, msg);
            });
        
        if(whatsappClient.newClient == null || undefined) {
            console.log("whatsappClient.newClient is null");
            client.on("qr", async(qr) => {
                try{
                    await res.status(200).send(JSON.stringify(qr));
                }catch(error){
                    console.log("catch qr code ===============");
                }
            });
        }
       client.initialize();
    }
  } catch(error) {
        console.log("erorrororororoor");
        res.status(400).send(error.message);
    }
}
