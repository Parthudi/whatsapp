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
                try{
                    console.log("try .......................... ")
                    console.log("QR RECEIVED : " +qr);
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
