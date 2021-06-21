const Group= require('../models/groupModel')
const Contact = require("../models/contactModel")
const Message = require("../models/messageModel")
// const {Client} = require("whatsapp-web.js");
// const client = new Client();
// const whatsappClient = {};

exports.signupGroup = async (req, res) => {
    try{     
        console.log("inside signup group");
        console.log("body of group : " + JSON.stringify(req.body));

            const contactsId = req.body.contacts;
      
            let signUpData = {};
            signUpData["user"] = req.body.user,
            signUpData["name"] = req.body.name,
            signUpData["contacts"] =  contactsId,
            signUpData["createdBy"] = req.body.user

            console.log(JSON.stringify(signUpData));

            const group = new Group(signUpData)
        
            await group.save()
            res.status(201).json({message : "Group Created"})
        // })

        // const contacts = req.body.contacts;

        // let ids = "" ;
        //     contacts.forEach((reqId, index) => {
        //         if(index === 0) {
        //             ids += `${reqId}`;
        //         }else{
        //             ids += `,${reqId}`;
        //         }        
        //     });
        //     ids += "" ;
        // console.log(" id : " +ids);
        // console.log(" type of id : " +typeof ids);
        // const ContactNumbers = ids.toString(); 

       

      }catch(error){     
            console.log(error);    
            res.status(401).json({error: "Fill the details Correctly"})
      }
}

exports.readGroup = async(req, res) => {
      try{
              console.log("inside read groups");
              console.log("req.body.userID : " +req.body.userID);
              if(req.body.userID === "admin"){
                const group = await Group.find().select("-__v");
  
                console.log("group : " +group);
                res.status(201).send(group)
              }else{
                const group = await Group.find({ user : req.body.userID }).select("-__v");
  
                console.log("group : " +group);
                res.status(201).send(group)
              }
      } catch(error) {
          res.status(401).send(error)
      }
  }

//   exports.autnenticationMessage = async(req, res) => {
//     try {
//         console.log("Checking Auth");

//     if (whatsappClient.newClient) {
//             console.log("whatsappClient.newClient line 134 : " +JSON.stringify(global.whatsappClient.newClient));
//             await res.status(200).send({user :"User Is Authenticated"});
//       }else {
//         client.on('authenticated', (session) => {
//             global.whatsappClient.newClient = session;
//          });
        
//        if(global.whatsappClient.newClient == null || undefined) {
//         client.on("qr", async(qr) => {
//             console.log("QR RECEIVED : " +qr);
//             await res.status(200).send(JSON.stringify(qr));
//         });
//        }
        
//         client.initialize();
//     }
//   } catch(error) {
//         res.status(400).send("error:" +error.message);
//     }
// }

exports.message = async(req, res) => {
    try {
        console.log("entering sendMessage");
        const response = [];

        const body = req.body || {};
        console.log("body : " +JSON.stringify(body));

        const ID = body.group;
        const text = body.message;

        const findinGroup = await Group.find({_id:ID}).populate("contacts");
        // console.log("findinGroup : " +findinGroup);

        const contactID = await Group.find({_id:ID});
        console.log("contactID : " +contactID[0].contacts);
        console.log("contactID specific ID : " +contactID.contacts);

        let messageRegistrationData = {};
        messageRegistrationData["company"] = req.body.companyID;
        messageRegistrationData["user"] = req.body.userID;
        messageRegistrationData["group"] = ID;
        messageRegistrationData["contacts"] = contactID[0].contacts;
        messageRegistrationData["message"] = text;
        messageRegistrationData["createdBy"] = req.body.userID;

        console.log("messageRegistrationData : " + JSON.stringify(messageRegistrationData));

        const allContacts = [];
        findinGroup[0].contacts.map((contact) => {
          console.log("comming : " + contact.country_code+contact.mobile_number);
           return allContacts.push(contact.country_code+contact.mobile_number);
        })

        if(allContacts.length === 0){
            console.log("empty contacts");
            res.status(400).send({message : "You Have No Contacts To Send Message"});
        }else{
          
        if(global.whatsappClient.newClient) {
           console.log("whatsappClient.newClient line 134 : " +JSON.stringify(global.whatsappClient.newClient));

            const start = async(client)  => {
                allContacts.forEach(async(elem) => {
                    console.log("array : " +elem);
                    if(elem.includes("+")){
                        console.log("includes + ");
                        const newElement = elem.replace("+", "");
                      try{
                            newElement.length > response.length ? client.sendMessage(`${newElement}@c.us`, text) : null;
                        } catch(error){
                            console.log("error error");
                            delete global.whatsappClient.newClient;
                            res.status(400).send({message : "Session Is Closed Please Try After Reloading The Page"});
                            }
                        };
                    })
                    res.status(200).send({message : "Message Sent"});
                }
            start(global.client);
            const messageRegister = new Message(messageRegistrationData);
            await messageRegister.save()
      }else {
          console.log("entering else part ");

        await res.status(200).send({message : "Please Scan the QR Code & then send any message"});
    }
   }
  } catch(error) {
        res.status(400).send("error:" +error.message);
    }
}
