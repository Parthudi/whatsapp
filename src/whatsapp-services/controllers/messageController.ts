import { FastifyReply, FastifyRequest } from "fastify";
const fs = require("fs");
const {Client} = require("whatsapp-web.js");
const response = [];
import _ from "lodash";
import UserOperator from "../schema/user";
// import config from "../../config/appConfig";

export default class MessageController {

    static async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body || {};
            const user = await new UserOperator(body);
            const result = _.isEmpty(body) ? function () { throw { error: { message: "Invalid Request", code: 400 } }; }() : await user.save();
            reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    }

    static async read(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body || {};
            const user = await MessageController.findingUser(body);
          
            const result = _.isEmpty(body) ? function () { throw { error: { message: "Invalid Request", code: 400 } }; }() : user;
            reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    }

    static async update(req: FastifyRequest, reply: FastifyReply){
            try {
                const params = req.params || {};
                const id = params["id"] || "";
                const updateQuery = req.body || {};
                const user = await UserOperator.findById({ _id: id });
                const updateResult = await UserOperator.findOneAndUpdate({ _id: id }, { $set: updateQuery }, { upsert: false, new: true }).lean().exec();
                if( updateResult ) {
                    user.modified_at = new Date();
                    await user.save();
                }
                reply.send({updateResult});
            } catch (error) {
                reply.send({ error: { message: error.toString(), code: 500 } });
            }
        }

    static async findingUser(req:any): Promise<any> {
        return new Promise(async(resolve,reject) => {
        try {
            const email = req.email;
            const password = req.password;
            const user = await UserOperator.findOne({email});
                if(!user) {
                    throw new Error ("Username Invalid");
                  }
                if(user.password !== password) {
                    throw new Error ("Password Invalid");
                  }
                resolve({user});
              } catch(error){
                  reject({
                      error:error
                  });
              }
            });
    }

    static async sendMessage(req: FastifyRequest, reply: FastifyReply) {
        try {
            console.log("entering sendMessage");
            const latestResponse = {};
            const body:any = req.body || {};
            const contacts = body.contact;
            const text = body.message;
            const arr = contacts.split(",");
          
            console.log("contactToSend : " +contacts);
            console.log("older array  : " +arr);
            console.log("messageToSend : " +text);

        let session_file;
        if (fs.existsSync(`./${contacts}.json`)) {
            session_file = require(`./${contacts}.json`);
            console.log("session_file", session_file);
        }
        const client = new Client({
            session: session_file
        });

        client.on("qr", async(qr) => {
            console.log("QR RECEIVED : " +qr);
            await reply.code(200).send(JSON.stringify(qr));
        });

        client.on("ready", () => {
            console.log("client is ready");
        
            // const sendingMessage = (client, contact)  => {
            //     try {
            //         console.log("sending message");
            //         console.log(`91${contact}@c.us`);
                
            //         client.sendText(`91${contact}@c.us`, text).then(result => {
            //             console.log("result : "  + result);
            //             const res = {number: contact, success: true};
            //             response.push(res);
            //           });
            //           latestResponse["response"] = true;

            //     }catch(error) {
            //         console.log("hellow error occured inside catch block 2");
            //         console.log(error.toString());
            //         const res = {number: contact,success: false,error: error.toString()};
            //         response.push(res);
            //         latestResponse["response"] = false;
            //     }
            // };
        
        // const saveReponse = () => {
        //         jsonexport(response, (err, csv) => {
        //             const dirPath = path.join(
        //                 __dirname + `/response.csv`
        //             );
        
        //         fs.writeFile(dirPath, csv, "utf8", async function (err) {
        //             err ? console.log(err) : console.log("response saved!!!!");
        //         });
        //     });
        //   };

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

            // client.on("message", msg => {
            //     if(msg.body == "!png") {
            //         msg.reply("pong");
            //     }
            // });

            // reply.code(200).send("sent");
        } catch(error) {
            console.log("main catch error");
            reply.code(400).send("error:" +error.message);
        }
    }
}



        // 8000666878
        // const text = `🔔 આત્મિયજનોને નમસ્કાર 🙏
        //     શ્રી પાર્થ પરમાર ખુશી સાથે જણાવે છે કે, આપની બહુમૂલ્ય દવાઓ હવે પરદેશ ઓછા ખર્ચમાં, ભરોસા પાત્ર રીતે ઝડપથી પહોંચાડી દઈશુ. સંપર્ક : અતુલ પંડિત 📱 8320416824 `;

    // static async sendingMessage(req:any, num:Number): Promise<any> {
    //     return new Promise(async(resolve,reject) => {
    //     try {
          
    //           resolve(CLIENT);
    //         }catch(error) {
    //             reject({
    //                 success:false,
    //                 error: "message didnt sent",
    //                 code: 400
    //                 });
    //             }
    //         }
    //     );
    // }


    // async function connectToWhatsApp () {
            //     const conn = new WAConnection() ;
            //     // called when WA sends chats
            //     // this can take up to a few minutes if you have thousands of chats!
            //     conn.on("chats-received", async ({ hasNewChats }) => {
            //         console.log(`you have ${conn.chats.length} chats, new chats available: ${hasNewChats}`);
            
            //         const unread = await conn.loadAllUnreadMessages ();
            //         console.log ("you have " + unread.length + " unread messages");
            //     });
            //     // called when WA sends chats
            //     // this can take up to a few minutes if you have thousands of contacts!
            //     conn.on("contacts-received", () => {
            //         console.log("you have " + Object.keys(conn.contacts).length + " contacts");
            //     });
            
            //     await conn.connect ();
            //     conn.on("chat-update", chatUpdate => {
            //         // `chatUpdate` is a partial object, containing the updated properties of the chat
            //         // received a new message
            //         if (chatUpdate.messages && chatUpdate.count) {
            //             const message = chatUpdate.messages.all()[0];
            //             console.log (message);
            //         } else console.log (chatUpdate) ; // see updates (can be archived, pinned etc.)
            //     });
            // }
            // // run in main file
            // connectToWhatsApp ()
            // .catch (err => console.log("unexpected error: " + err) ) ; // catch any errors
            

            // wbm.start({showBrowser: true, qrCodeData: true, session: false})
            //     .then(async qrCodeData => {
            //         console.log(qrCodeData); // show data used to generate QR Code
            //         await wbm.waitQRCode();
            //         // waitQRCode() is necessary when qrCodeData is true
            //         // ...
            //         await wbm.end();
            //     } ).catch(err => { console.log(err); });

            // await wbm.start().then(async () => {
            //     const phones = [body.contact];
            //     const message = body.message;
            //     const data = wbm.send(phones, message);
            //     console.log("data : " +data);
            //     await wbm.end();
            // }).catch(err => console.log(err));
            
            // wa.create({
            //         sessionId: "PARTH_PARMAR",
            //         authTimeout: 60, // wait only 60 seconds to get a connection with the host account device
            //         blockCrashLogs: true,
            //         disableSpins: true,
            //         headless: true,
            //         hostNotificationLang: "PT_BR",
            //         logConsole: false,
            //         popup: true,
            //         qrTimeout: 0, // 0 means it will wait forever for you to scan the qr code
            //     }).then(client => start(client));

        //    wa.create({ sessionId: "PARTH_PARMAR" }).then(client => start(client));






                  // const text = `🔔 આત્મિયજનોને નમસ્કાર 🙏
                    // શ્રી પાર્થ પરમાર ખુશી સાથે જણાવે છે કે, આપની બહુમૂલ્ય દવાઓ હવે પરદેશ ઓછા ખર્ચમાં, ભરોસા પાત્ર રીતે ઝડપથી પહોંચાડી દઈશુ. સંપર્ક : અતુલ પંડિત 📱 8320416824 `;
                    // const text = `📬 Shipment Made Easy and Affordable 📮 Slashed Prices for Min 100grm document ✉️
                    // ૯૮૨૫૧૫૫૪૦૩
                    // Guj - INR 30
                    // Mumbai - INR 40
                    // Rest of India - INR 50
                    
                    // Shree Narayan Enterprise Domestic and International Courier Service is a 
                    // customer friendly 👬
                    // fast delivering ✈️🚆 🚂 🚈
                    // affordable, cost ensuring 💰 & reliable courier service since 2008 📦
                    
                    // Real Time tracking facility and quick complaint redressal is our benchmark.
                    
                    // 📱 for more details 0265-2387095||9825155403 
                    
                    // Address : SB 6 Sai Kruti Complex Hari Nagar Gotri Vadodara.`;
            //         const text = `Dear Customer, 
                    
            // Thank you for your support and cooperation. We are located at the same familiar place - SB 6 Sai Kruti Complex Gotri Vadodara.
                    
            // Drop by or Call for any Courier / International Shipping Enquiries- 9825155403 &. 0265-2387095`;