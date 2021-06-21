const {Client} = require("whatsapp-web.js");
client = new Client();
whatsappClient = {};

exports.autnenticationMessage = async(req, res) => {
    try {
        console.log("Checking Auth");

    if (whatsappClient.newClient) {
            console.log("whatsappClient inside qrAuthentication  : " +JSON.stringify(whatsappClient.newClient));
            await res.status(200).send({user :"User Is Authenticated"});
      }else {
        client.on('authenticated', (session) => {
            whatsappClient.newClient = session;
         });
        
       if(whatsappClient.newClient == null || undefined) {
        client.on("qr", async(qr) => {
            console.log("QR RECEIVED : " +qr);
            await res.status(200).send(JSON.stringify(qr));
        });
       }
        client.initialize();
    }
  } catch(error) {
        res.status(400).send("error:" +error.message);
    }
}
