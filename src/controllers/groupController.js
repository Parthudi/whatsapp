const Group= require('../models/groupModel')
const {Client} = require("whatsapp-web.js");
const client = new Client();
const whatsappClient = {};

exports.signupGroup = async (req, res) => {
    try{     
        console.log("inside signup group");
        console.log(req.body)
        const group = new Group(req.body)
    
        await group.save()
        res.status(201).json({'group ' : group})

      }catch(error){     
            console.log(error);    
            res.status(401).json({error: "Fill the details Correctly"})
      }
}

exports.readGroup = async(req, res) => {
      try{
              console.log("inside read groups");
              const group = await Group.find().select("-__v");
  
              console.log("group : " +group);
              res.status(201).send(group)
      } catch(error) {
          res.status(401).send(error)
      }
  }

  exports.autnenticationMessage = async(req, res) => {
    try {
        console.log("Checking Auth");

    if (whatsappClient.newClient) {
            console.log("whatsappClient.newClient line 134 : " +JSON.stringify(whatsappClient.newClient));
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
        
    client.on("ready", async() => {
        console.log("client is ready");
        const start = (client)  => {
                };
        start(client);
        });
        client.initialize();
    }
  } catch(error) {
        res.status(400).send("error:" +error.message);
    }
}


exports.message = async(req, res) => {
    try {
        console.log("entering sendMessage");
        const response = [];

        const body = req.body || {};
        const ID = body.group;
        const text = body.message;

        console.log("ID : " +ID);
        console.log("messageToSend : " +text);
        const contact = await Group.find({_id : `${ID}`}) ;
        const contacts = contact[0].contacts;
        const arr = contacts.split(",");

    if (whatsappClient.newClient) {
            console.log("whatsappClient.newClient line 134 : " +JSON.stringify(whatsappClient.newClient));

                const start = (client)  => {
                    console.log("start client");
                    const accurateData = contacts.indexOf(",");
                    console.log("accurate : " +accurateData);
                        if(accurateData == -1){
                            // const chatId = contacts.substring(1) + "@c.us";      
                        contacts.length > response.length ? client.sendMessage(`91${contacts}@c.us`, text) : null;
                        }else{
                            arr.forEach(elem => {
                            console.log("array : " +elem);
                                elem.length > response.length ? client.sendMessage(`91${elem}@c.us`, text) : null;
                                });
                            }
                        };
                start(client);
                // client.initialize();
                await res.status(200).send({message : "Message Sent"});
      }else {
          console.log("entering else part ");

        await res.status(200).send({message : "Please Scan the QR Code & then send any message"});
    }
  } catch(error) {
        res.status(400).send("error:" +error.message);
    }
}
