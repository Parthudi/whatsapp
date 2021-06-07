const Contact = require('../models/contactModel')
const {Client} = require("whatsapp-web.js");
const client = new Client();
const whatsappClient = {};

exports.signupContact = async (req, res) => {
    try{     
        console.log("inside contact");
        console.log(req.body)
        const contact = new Contact(req.body)
    
        await contact.save()
        res.status(201).json({'contact ' : contact})

      }catch(error){     
            console.log(error);    
            res.status(401).json({error: "Fill the details Correctly"})
      }
}

exports.readContacts = async(req, res) => {
      try{
              console.log("inside contacts");
              const contact = await Contact.find().select("-__v").select("-_id");
  
              console.log("contact : " +contact);
              res.status(201).send({contact})
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

          const sameCompanyContacts = await Contact.find({company: req.body.company_id})
          console.log("sameCompanyContacts : " +sameCompanyContacts);

          const contacts = sameCompanyContacts[0].company;
      //     sameCompanyContacts.map(comp => {
      //           console.log(comp.company);
      //             return contacts = comp.company;
      //       })

          console.log("contacts : " +JSON.stringify(contacts));
          const arr = contacts.split(",");
          const text = body.message;
          
          console.log("messageToSend : " +text);
  
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
  
