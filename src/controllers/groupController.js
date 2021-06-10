const Group= require('../models/groupModel')
const {Client} = require("whatsapp-web.js");
const client = new Client();
const whatsappClient = {};

exports.signupGroup = async (req, res) => {
    try{     
        console.log("inside signup group");
        console.log(req.body)

        const contacts = req.body.contacts;

        let ids = "" ;
            contacts.forEach((reqId, index) => {
                if(index === 0) {
                    ids += `${reqId}`;
                }else{
                    ids += `,${reqId}`;
                }        
            });
            ids += "" ;
        console.log(" id : " +ids);
        console.log(" type of id : " +typeof ids);
        const ContactNumbers = ids.toString(); 

        let signUpData = {};
        signUpData["user"] = req.body.user,
        signUpData["name"] = req.body.name,
        signUpData["contacts"] =  ContactNumbers,

        console.log(JSON.stringify(signUpData));

        const group = new Group(signUpData)
    
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
                            console.log("single massage "); 
                            if(elem.includes("+")){
                                console.log("includes + ");
                                const newElement = contacts.replace("+", "");
                                    newElement.length > response.length ? client.sendMessage(`${newElement}@c.us`, text) : null;
                                   }     
                        contacts.length > response.length ? client.sendMessage(`${contacts}@c.us`, text) : null;
                        }else{
                            console.log("multiple massage ");      
                            arr.forEach(elem => {
                            console.log("array : " +elem);
                            if(elem.includes("+")){
                                console.log("includes + ");
                                const newElement = elem.replace("+", "");
                                    newElement.length > response.length ? client.sendMessage(`${newElement}@c.us`, text) : null;
                                   }else{
                                    elem.length > response.length ? client.sendMessage(`${elem}@c.us`, text) : null;
                                   }
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
