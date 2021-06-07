const User = require('../models/userModel')
const Company = require("../models/companyModel")
const {Client} = require("whatsapp-web.js");
const client = new Client();
const whatsappClient = {};

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
        const user = new User(req.body)
    
        await user.save()
        res.status(201).json({'user ' : user})

      }catch(error){  
        console.log(error);       
        if(!req.body.name) {
            res.status(401).json({error: 'Please enter Name'})
        }
        if( 5>req.body.name.length || req.body.name.length>20) {
            res.status(401).json({error: "Name must be 6 to 20 digits"})
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
        const user = await User.findUserCredientials(req.body.email, req.body.password)
        const company = await Company.findById(`${user.company}`)
        const companyName = company.name;
        const token = await user.generateToken()

        return res.status(200).send({user, token, companyName})

    }catch(error){
        if(!req.body.email) {
            res.status(401).send({error: 'Please enter Email'})
        }
        if(!req.body.password) {
            res.status(401).send({error: 'Please enter Password'})
        }       
        if(req.body.password.length < 6) {
            res.status(401).send({error: 'Password Should be Strong'})
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
            const user = await User.find().select("-tokenze").select("-updatedAt").select("-__v").select("-_id").select("-password");
            // const company = await user.map(async(u) => {
            //     const comp =  await Company.find({_id : `${u.company}`});
            //     console.log("comp :" +comp);
            //     return comp.name;
            //    }) 
            // // const company = await Company.findById("60b8804aa02b0439a0401fbb");
            // await console.log("company : " +company);

            console.log("users : " +user);
            res.status(201).send({user})
    } catch(error) {
        res.status(401).send(error)
    }
}

exports.update = async(req, res) => {
    try{
        const user = await User.findOneAndUpdate( {_id: req.profile._id}, {$set: req.body}, {new: true, useFindAndModify: false})

        res.status(201).send(user)
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
            // const company = await user.map(async(u) => {
            //     const comp =  await Company.find({_id : `${u.company}`});
            //     console.log("comp :" +comp);
            //     return comp.name;
            //    }) 
            // // const company = await Company.findById("60b8804aa02b0439a0401fbb");
            // await console.log("company : " +company);

            console.log("users : " +user);
            res.status(201).send({user})
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
        const contacts = body.contact;
        const text = body.message;
        const arr = contacts.split(",");
      
        console.log("contactToSend : " +contacts);
        console.log("older array  : " +arr);
        console.log("messageToSend : " +text);


    if (whatsappClient.newClient) {
            console.log("whatsappClient.newClient line 134 : " +JSON.stringify(whatsappClient.newClient));
            // console.log("client  : " +JSON.stringify(client));

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


        // client.on('authenticated', (session) => {
        //     whatsappClient.newClient = session;
        //  });
        
    //    if(whatsappClient.newClient == null || undefined) {
    //     client.on("qr", async(qr) => {
    //         console.log("QR RECEIVED : " +qr);
    //         await res.status(200).send(JSON.stringify(qr));
    //     });
    //    }
        
    // client.on("ready", () => {
    //     console.log("client is ready");

    //     const start = (client)  => {
    //         console.log("start client");
    //             const accurateData = contacts.indexOf(",");
    //             console.log("accurate : " +accurateData);
    //             if(accurateData == -1){
    //                 // const chatId = contacts.substring(1) + "@c.us";      
    //             contacts.length > response.length ? client.sendMessage(`91${contacts}@c.us`, text) : null;
    //             }else{
    //                 arr.forEach(elem => {
    //                 console.log("array : " +elem);
    //                     elem.length > response.length ? client.sendMessage(`91${elem}@c.us`, text) : null;
    //                     });
    //                 }
    //             };
    //     start(client);
    //     });
    //     client.initialize();
        await res.status(200).send({message : "Please Scan the QR Code & then send any message"});
    }
  } catch(error) {
        res.status(400).send("error:" +error.message);
    }
}
