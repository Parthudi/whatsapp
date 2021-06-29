const User = require('../models/userModel')
const Company = require("../models/companyModel")
const Contact = require("../models/contactModel")
const Message = require("../models/messageModel")
const {Client} = require("whatsapp-web.js");
// const client = new Client();
// const whatsappClient = {};
// import {whatsappClient} from "../qrAuthentication"

exports.findUserId= async (req, res, next, id) => {
    const user = await User.findById(id)

    if(!user) {
        throw new Error('user not found')
    }
    req.profile = user
    next()
    }

exports.signupUser = async (req, res) => {
    try{     
        console.log("user signup : " +JSON.stringify(req.body));

        if(req.body && req.body.company && req.body.company.length === 0) {
            const createUser = {};

            createUser["name"] =  req.body.name;
            createUser["email"] = req.body.email;
            createUser["password"] = req.body.password;
            createUser["role"] = req.body.role;
            createUser["createdBy"] = req.body.userID,

            console.log(JSON.stringify(createUser));
            const user = new User(createUser);
            await user.save()
            res.status(201).json({'user ' : user})
        }else{
            const user = new User(req.body);
            await user.save()
            res.status(201).json({'user ' : user})
        }
        
      }catch(error){  
        console.log(error);       
        if(!req.body.name) {
            res.status(401).json({error: 'Please enter Name'})
        }
        if( req.body.name.length < 4 || req.body.name.length > 20 ) {
            res.status(401).json({error: "Name must be 4 to 20 digits"})
        }
        if(!req.body.email) {
            res.status(401).json({error: 'Please enter Email'})
        }
        if(!req.body.password) {
            res.status(401).json({error: 'Please enter Password'})
        }       
        if(req.body.password.length < 6) {
            res.status(401).json({error: 'Password Should be Strong'})
        }
        else{
            res.status(401).json({error: "Fill the details Correctly"})
        }
        
      }
} 

exports.loginUser = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const user = await User.findUserCredientials(req.body.email, req.body.password)
        console.log("user : " +JSON.stringify(user));

        if(user.role === "admin") {
            const token = await user.generateToken();
            return res.status(200).send({user, token});
        }else{
            const company = await Company.findById(`${user.company}`)
            const companyName = company.name;
            const token = await user.generateToken()
    
            return res.status(200).send({user, token, companyName})
        }
    }catch(error){
        console.log(error);
        if(!req.body.email) {
            res.status(401).send({error: 'Please enter Email'})
        }
        if(!req.body.password) {
            res.status(401).send({error: 'Please enter Password'})
        }       
        else{
            res.status(401).send({error: "Fill the correct details only! "})
        }
    }
}

exports.logoutUser = async (req, res) => {
    try{       console.log(req.user.tokenze)
            req.user.tokenze = req.user.tokenze.filter((token) => {
    
                return console.log(token.token !==  req.token)
            })
          await req.user.save() 
        res.clearCookie("t")
        
        res.status(200).json({message: 'SignOut Sucessfull' })
        
    }catch(error){
        res.status(401).send(error.message)
    }
}

exports.read = async(req, res) => {
    try{
            console.log("inside users");
            const CompanyID = req.body.userCompanyID;

            if(CompanyID === "admin") {
                console.log("user is admin");
                const user = await User.find().populate("company").select("-tokenze").select("-updatedAt").select("-__v").select("-password");

                const onlyUsers = [];
                const removeAdmins = user.map((u) => {
                    if(u.role === "user"){
                         return onlyUsers.push(u);
                    }
                });

                console.log("onlyUsers : " + onlyUsers);

                await res.status(201).send({onlyUsers});
            }else{
                const onlyUsers = await User.find({company : CompanyID}).select("-tokenze").select("-updatedAt").select("-__v").select("-password");
                const company = await Company.find({_id : CompanyID});
                const companyName = company.name;
                console.log("onlyUsers : " +onlyUsers);
                res.status(201).send({onlyUsers, companyName});

            }
            
    } catch(error) {
        res.status(401).send(error)
    }
}

exports.update = async(req, res) => {
    try{
        console.log(JSON.stringify(req.body));
        const validDetails = {};
        req.body.name.length > 1  ? validDetails["name"]  = req.body.name : null;
        req.body.role.length > 1  ? validDetails["role"]  = req.body.role : null;
        req.body.email.length > 1 ? validDetails["email"] = req.body.email : null;
        validDetails["modifiedBy"] = req.body.modifiedBy;
        
        const user = await User.findOneAndUpdate( {_id: req.body.userid}, {$set: validDetails}, {new: true, useFindAndModify: false})
        
        res.status(201).send({message: "User Info Updated !!"});
    } catch(error) {
        res.status(401).send(error)
    }
}

exports.remove = async(req, res) => {
    try{
            const user = await req.user.remove()

            await user.save()

            res.status(201).send(user)
    } catch(error) {
        res.status(401).send(error)
    }
}

exports.userContacts = async(req, res) => {
    try{
            console.log("inside userContacts");

            const user = await User.find().select("-tokenze").select("-updatedAt").select("-__v").select("-_id").select("-password");

            console.log("users : " +user);
            res.status(201).send({user})
    } catch(error) {
        res.status(401).send(error)
    }
}

// exports.autnenticationMessage = async(req, res) => {
//     try {
//         console.log("Checking Auth");

//     if (global.whatsappClient.newClient) {
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
        const countryCode = body.countrycode;
        const newContact = body.contact;

        const contacts = countryCode+newContact;
        const text = body.message;
        const arr = contacts.split(",");
      
        const findContact = await Contact.find({mobile_number : newContact});

        if(findContact.length <1){
            throw Error("You Can not Send Message To Unknown Users !!!")
        }
        const  contactID = findContact[0]._id ;

        console.log("contactToSend : " +contacts);
        console.log("older array  : " +arr);
        console.log("messageToSend : " +text);

        let messageRegistrationData = {};
        messageRegistrationData["company"] = req.body.companyID;
        messageRegistrationData["user"] = req.body.userID;
        messageRegistrationData["contacts"] = contactID;
        messageRegistrationData["message"] = text;
        messageRegistrationData["createdBy"] = req.body.userID;

        console.log("messageRegistrationData : " + JSON.stringify(messageRegistrationData));

    console.log("whatsappClient.newClient  : " +JSON.stringify(global.whatsappClient.newClient));
    if (global.whatsappClient.newClient) {
        console.log("whatsappClient.newClient in userController : " +JSON.stringify(global.whatsappClient.newClient));
       
        const start = async(client) => {
            console.log("start client");
            const accurateData = contacts.indexOf(",");
            console.log("accurate : " +accurateData);
            
            if(accurateData == -1){

                console.log("single message "); 

                if(contacts && contacts.includes("+")){
                    console.log("includes + ");
                        const newElement = await contacts.replace("+", "");
                        try{
                            console.log("newElement : " +newElement);
                            console.log("text : " +text);
                            console.log("newElement.length : " +newElement.length);
                            console.log("response.length : " +response.length);

                            newElement.length > response.length ? client.sendMessage(`${newElement}@c.us`, text) : null;
                        } catch(error){
                            console.log("error error");
                            delete global.whatsappClient.newClient;
                            res.status(400).send({message : "Session Is Closed Please Try After Reloading The Page"});
                           }
                        }
                }else{
                    throw Error("You Can't Send Message to Multiple Users");
                    }
                };
            start(global.client);
            const messageRegister = new Message(messageRegistrationData);
            await messageRegister.save()
            res.status(200).send({message : "Message Sent"});
      }else {
          console.log("entering else part ");
          throw Error("Please Scan the QR Code & then send any message");
    }
  } catch(error) {
        console.log("error error error : " +error.message);
        res.status(400).send({message : error.message});
    }
}


// exports.message = async(req, res) => {
//     try {
//         console.log("entering sendMessage");
//         const response = [];

//         const body = req.body || {};
//         const contacts = body.contact;
//         const text = body.message;
//         const arr = contacts.split(",");
      
//         console.log("contactToSend : " +contacts);
//         console.log("older array  : " +arr);
//         console.log("messageToSend : " +text);

//     if (whatsappClient.newClient) {
//             console.log("whatsappClient.newClient line 134 : " +JSON.stringify(whatsappClient.newClient));

//                 const start = async(client)  => {
//                     console.log("start client");
//                         const accurateData = contacts.indexOf(",");
//                         console.log("accurate : " +accurateData);
//                         if(accurateData == -1){
//                             console.log("single message "); 
//                             if(contacts.includes("+")){
//                                 console.log("includes + ");
//                                 const newElement = await contacts.replace("+", "");
//                                 try{
//                                     newElement.length > response.length ? await client.sendMessage(`${newElement}@c.us`, text) : null;
//                                 } catch(error){
//                                     console.log("error error");
//                                     res.status(200).send({message : "Session Is Closed Please Try After Reloading The Page"});
//                                     throw Error(error.message);
//                                 }
//                                 }  
//                             res.status(200).send({message : "Message Sent"});
                   
//                         }else{
//                           res.status(200).send({message : "You Can't Send Message to Multiple Users"});

//                             // console.log("multiple message ");      
//                             // arr.forEach(elem => {
//                             // console.log("array : " +elem);
//                             // if(elem.includes("+")){
//                             //     console.log("includes + ");
//                             //     const newElement = elem.replace("+", "");
//                             //         newElement.length > response.length ? client.sendMessage(`${newElement}@c.us`, text) : null;
//                             //        }else{
//                             //         elem.length > response.length ? client.sendMessage(`${elem}@c.us`, text) : null;
//                             //        }
//                             //     });
//                             }
//                         };
//                 start(client);
//                 // client.initialize();
//       }else {
//           console.log("entering else part ");

//         // client.on('authenticated', (session) => {
//         //     whatsappClient.newClient = session;
//         //  });
        
//     //    if(whatsappClient.newClient == null || undefined) {
//     //     client.on("qr", async(qr) => {
//     //         console.log("QR RECEIVED : " +qr);
//     //         await res.status(200).send(JSON.stringify(qr));
//     //     });
//     //    }
        
//     // client.on("ready", () => {
//     //     console.log("client is ready");

//     //     const start = (client)  => {
//     //         console.log("start client");
//     //             const accurateData = contacts.indexOf(",");
//     //             console.log("accurate : " +accurateData);
//     //             if(accurateData == -1){
//     //                 // const chatId = contacts.substring(1) + "@c.us";      
//     //             contacts.length > response.length ? client.sendMessage(`91${contacts}@c.us`, text) : null;
//     //             }else{
//     //                 arr.forEach(elem => {
//     //                 console.log("array : " +elem);
//     //                     elem.length > response.length ? client.sendMessage(`91${elem}@c.us`, text) : null;
//     //                     });
//     //                 }
//     //             };
//     //     start(client);
//     //     });
//     //     client.initialize();
//         await res.status(200).send({message : "Please Scan the QR Code & then send any message"});
//     }
//   } catch(error) {
//         console.log("error error error" +error);
//         console.log("error error error" +error.message);
//         res.status(400).send({message : error.message});
//     }
// }
