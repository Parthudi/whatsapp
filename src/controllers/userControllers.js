const User = require('../models/userModel')
const {Client} = require("whatsapp-web.js");
const client = new Client();

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
        const user = new User(req.body)
    
        await user.save()
        res.status(201).json({'user ' : user})

      }catch(error){         
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

        const token = await user.generateToken()

        return res.status(200).send({user, token})

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

    // let session_file;
    // if (fs.existsSync(`./${contacts}.json`)) {
    //     session_file = require(`./${contacts}.json`);
    //     console.log("session_file", session_file);
    //     }
    client.on("qr", async(qr) => {
        console.log("QR RECEIVED : " +qr);
        await res.status(200).send(JSON.stringify(qr));
    });

    client.on("ready", () => {
        console.log("client is ready");

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
        });
        client.initialize();

    } catch(error) {
        res.status(400).send("error:" +error.message);
    }
}
