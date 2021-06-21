const Contact = require('../models/contactModel')
const XLSX = require("xlsx");
const Message = require("../models/messageModel")
const _ = require("underscore")
// const {Client} = require("whatsapp-web.js");
// const client = new Client();
// const whatsappClient = {};

const fs = require('fs');

exports.signupContact = async (req, res) => {
    try{     
        console.log("inside contact");
        console.log(req.body)

        const contact = new Contact(req.body)
    
        await contact.save()
        res.status(201).json({message : "Contact Created"})

      }catch(error){     
            console.log("error printing" +error);    
            res.status(401).json({error: " Contact Failed , Fill the details Correctly"})
      }
}

exports.readContacts = async(req, res) => {
      try{
              console.log("inside contacts");
              console.log("efhweifhewf : " +JSON.stringify(req.body));
              if(req.body.userCompanyID === "admin") {
                const contact = await Contact.find().select("-__v");
  
                console.log("contact : " +contact);
                res.status(201).send({contact})
              }else{
                const companyById = req.body.userCompanyID;
  
                const contact = await Contact.find({company : companyById}).select("-__v");
    
                console.log("contact : " +contact);
                res.status(201).send({contact})

              }

      } catch(error) {
          res.status(401).send(error)
      }
  }

// exports.autnenticationMessage = async(req, res) => {
//       try {
//           console.log("Checking Auth");
  
//       if (whatsappClient.newClient) {
//               console.log("whatsappClient.newClient line 134 : " +JSON.stringify(whatsappClient.newClient));
//               await res.status(200).send({user :"User Is Authenticated"});
//         }else {
//           client.on('authenticated', (session) => {
//               whatsappClient.newClient = session;
//            });
          
//          if(whatsappClient.newClient == null || undefined) {
//           client.on("qr", async(qr) => {
//               console.log("QR RECEIVED : " +qr);
//               await res.status(200).send(JSON.stringify(qr));
//           });
//          }
//           client.initialize();
//       }
//     } catch(error) {
//           res.status(400).send("error:" +error.message);
//       }
//   }
  
  exports.message = async(req, res) => {
      try {
          console.log("entering sendMessage");
          const response = [];
  
          console.log("req : " +JSON.stringify(req.body));
          const body = req.body || {};

          const text = req.body.message; 
/////// MAIN IF ////////
          if(req.body.company_id === "admin") {
            const allCompanyContacts = await Contact.find();

            if(allCompanyContacts.length === 0){
                res.status(400).send({message : "You Have No Contacts To Send Message"});
              }else{

              const allCompanyArray = [];
              allCompanyContacts.map((comp, i) => {
                return allCompanyArray.push(comp.country_code+comp.mobile_number);
              })

              const contactID = allCompanyContacts.map((contact) => {
                return contact._id;
            })

                let messageRegistrationData = {};
                // messageRegistrationData["company"] = req.body.companyID;
                messageRegistrationData["user"] = req.body.userID;
                messageRegistrationData["contacts"] = contactID;
                messageRegistrationData["message"] = text;
                messageRegistrationData["createdBy"] = req.body.userID;
      
              console.log("messageRegistrationData : " + JSON.stringify(messageRegistrationData));

            if(global.whatsappClient.newClient) {
                console.log("whatsappClient.newClient line 134 : " +JSON.stringify(global.whatsappClient.newClient));
                    
                const start = async(client)  => {
                    console.log("start client");
                    
                    allCompanyArray.forEach( async(elem) => {
                        console.log("array : " +elem);
                        if(elem.includes("+")){
                            console.log("includes + ");
                            const newElement = elem.replace("+", "");
                          try{
                              newElement.length > response.length ? client.sendMessage(`${newElement}@c.us`, text) : null;

                              const messageRegister = new Message(messageRegistrationData);
                              await messageRegister.save()

                            } catch(error){
                                console.log("error error");
                                delete global.whatsappClient.newClient;
                                res.status(400).send({message : "Session Is Closed Please Try After Reloading The Page"});
                            }
                        };
                    })
                };
            start(global.client);
                      // client.initialize();
            await res.status(200).send({message : "Message Sent"});
        }else {
            console.log("entering else part ");
            await res.status(200).send({message : "Please Scan the QR Code & then send any message"});
           }
        }
    }
  //////////// MAIN ELSE ///////                    
      else{
            const sameCompanyContacts = await Contact.find({company: req.body.company_id})
              console.log("sameCompanyContacts : " +sameCompanyContacts);
    
              if(sameCompanyContacts.length === 0){
              res.status(400).send({message : "You Have No Contacts To Send Message"});
              }else{
                const sameCompanyArr = [];
                sameCompanyContacts.map((comp, i) => {
                    return sameCompanyArr.push(comp.country_code+comp.mobile_number);
                })
    
            const contactID = sameCompanyContacts.map((contact) => {
                return contact._id;
            })

                let messageRegistrationData = {};
                messageRegistrationData["company"] = req.body.companyID;
                messageRegistrationData["user"] = req.body.userID;
                messageRegistrationData["contacts"] = contactID;
                messageRegistrationData["message"] = text;
                messageRegistrationData["createdBy"] = req.body.userID;

              console.log("messageRegistrationData : " + JSON.stringify(messageRegistrationData));

                if(global.whatsappClient.newClient) {
                    console.log("whatsappClient.newClient line 134 : " +JSON.stringify(global.whatsappClient.newClient));
                        
                    const start = (client)  => {
                            
                        sameCompanyArr.forEach( async(elem) => {
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
                    };
                start(global.client);
                          // client.initialize();
                    const messageRegister = new Message(messageRegistrationData);
                    await messageRegister.save()
                await res.status(200).send({message : "Message Sent"});
            }else {
                console.log("entering else part ");
                await res.status(200).send({message : "Please Scan the QR Code & then send any message"});
               }
          }
      }
    } catch(error) {
        res.status(400).send("error:" +error.message);
      }
  }


exports.excelSheet = async(req, res) => {
    try {
        console.log("inside excel sheet");
        if(!req.files) {
            console.log("no file found");
            throw Error("No file Uploaded");
        } else {
            const file = await req.files;
            console.log(file);
            console.log(file.excelsheet.name);
            const fileData = file.excelsheet.data;
            console.log(fileData);

           fs.writeFile(`data/${file.excelsheet.name}`,fileData, (err) =>{
                if(err){
                    res.status(401).send({message: "file failed please try again"})
                } else{
                    res.status(200).send({message: "file Uploaded", fileName: `${file.excelsheet.name}`});
                }
           });   
     }
    }catch(err) {
        res.status(401).send({err : err.message});
    }
}

exports.mappingExcelSheet = async(req, res) => {
    try{
        console.log("filename mapping : " +req.body.file);
        var workbook = XLSX.readFile(`data/${req.body.file}`);
                var sheet_name_list = workbook.SheetNames;

                var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                console.log(xlData);
                const headerData = [];
                await xlData.forEach((data) => {
                    headerData.push(Object.keys(data));
                })
                console.log(headerData[0]);
                res.status(200).send({header : headerData[0]});

    }catch(error){
        res.status(401).send({error : "Header Not Found"});
    }
}

exports.dbUpload = async(req, res) => {
    try {
        console.log("inside upload data");

        console.log("req : " +req.body);

        var workbook = XLSX.readFile(`data/${req.body.filename}`);
        var sheet_name_list = workbook.SheetNames;

        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(xlData);

        const headerData = [];

        await xlData.forEach((data) => {
            headerData.push(Object.keys(data));
        });

        console.log(headerData[0]);

        console.log("request : " +JSON.stringify(req.body));

        const nameIndex = (_.invert(req.body))["name"]; 
        const mobileIndex = (_.invert(req.body))["mobile_number"]; 
        const countryIndex = (_.invert(req.body))["country_code"];
        const emailIndex = (_.invert(req.body))["email"]; 

        console.log(" nameIndex : " + nameIndex);
        console.log(" mobileIndex : " + mobileIndex);
        console.log(" countryIndex : " + countryIndex);
        console.log(" emailIndex : " + emailIndex);

        // const dat = {};
        // const = headerData[0].[nameIndex]

        const allValues = Object.values(req.body)
        console.log(allValues);        

        const extractCompanyID = allValues.pop();
        const finalExcelRemoval = allValues.pop();

        xlData.forEach(async(data) => {
            let allExcelValues = []

            console.log("data : " +JSON.stringify(data));
            const valuesOfAll = Object.values(data);
            console.log("values of all : " +valuesOfAll);
            allExcelValues.push({valuesOfAll});

            const contactJSON = {};
            contactJSON["company"] = extractCompanyID
            contactJSON["name"] = valuesOfAll[nameIndex];
            contactJSON["mobile_number"] = valuesOfAll[mobileIndex];
            contactJSON["country_code"] = valuesOfAll[countryIndex];
            contactJSON["email"] = valuesOfAll[emailIndex];

            console.log("contact json: - ",JSON.stringify(contactJSON));

            

        //     console.log("extractCompanyID :"+extractCompanyID);

        //    let first = allValues[0];
        //    let second = allValues[1];
        //    let third = allValues[2];
        //    let fourth = allValues[3];

        //     const finalValues = {"company" : extractCompanyID, first : allExcelValues[0].valuesOfAll[0] , second : allExcelValues[0].valuesOfAll[1] , third : allExcelValues[0].valuesOfAll[2]  }
        
            const contact = new Contact(contactJSON);
            await contact.save();
            allExcelValues.length = 0;

        res.status(201).send({message : "contacts Saved"});

        });
               
    }catch(err) {
        res.status(401).send({message : "invalid Contacts Data"});
    }
}


  

// exports.getExcelSheet = async(req, res) => {
//     try{
//         console.log("inside excelSheet");
//         var form = new formidable.IncomingForm();
//         form.parse(req, function (err, fields, files) {
//             const oldpath = files.filetoupload.path;
//             const newpath = __dirname + "/" + files.filetoupload.name;
//             mv(oldpath, newpath, function (err) {
//                 if (err) throw err;
//                 res.write('File uploaded and moved!');
//                 res.end();
//                 });
//             });

//             console.log("data passed ;");
    
//             console.log("req .body : " +req.body);
//             const contact = await Contact.find();
             
//             const wb = new xl.Workbook();
//             const ws = wb.addWorksheet('Worksheet Name');
//             let data = [];
//             contact.forEach(dat => {
//                 console.log("dat dat : " +dat);
//                 const companyStr =  dat.company.toString();
//                 const mobileStr = dat.mobile_number.toString();
//                 data.push({
//                     company : companyStr,
//                     email : dat.email,
//                     mobile : mobileStr,
//                     country : dat.country_code
//                  })
//                 console.log("data "+ data);
//              })
//                 const headingColumnNames = [
//                         "Company_ID",
//                         "Email",
//                         "Mobile_Number",
//                         "Country_Code"
//                     ]
    
//                     //Write Column Title in Excel file
//                     let headingColumnIndex = 1;
//                     headingColumnNames.forEach(heading => {
//                         ws.cell(1, headingColumnIndex++)
//                             .string(heading)
//                     });
    
//                     //Write Data in Excel file
//                     let rowIndex = 2;
//                     data.forEach( record => {
//                         let columnIndex = 1;
//                         Object.keys(record ).forEach(columnName =>{
//                             ws.cell(rowIndex,columnIndex++)
//                                 .string(record [columnName])
//                         });
//                         rowIndex++;
//                     }); 
//                     wb.write('ContactData.xlsx');
            
//                 res.status(201).send({message : "Excel File Is Ready"})
//             } catch(error) {
//                 res.status(401).send({message : "Excel File Failed"})
//             }
//         }