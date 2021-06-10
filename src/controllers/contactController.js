const Contact = require('../models/contactModel')
// const xl = require('excel4node');
const formidable = require('formidable');
const mv = require('mv');
// const xlsxFile = require('read-excel-file');
const XLSX = require("xlsx");
const excelToJson = require('convert-excel-to-json');

const {Client} = require("whatsapp-web.js");
const client = new Client();
const whatsappClient = {};

const fs = require('fs');
// const NodeXls = require('node-xls');
var xls = require('excel');

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
              const companyById = req.body.userCompanyID;

              const contact = await Contact.find({company : companyById}).select("-__v").select("-_id");
  
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

          const sameCompanyArray = [];
          sameCompanyContacts.map((comp, i) => {
            return sameCompanyArray.push(comp.mobile_number);
          })

          console.log("sameCompanyArray : " +sameCompanyArray);
          console.log(typeof(sameCompanyArray));

          const contacts = sameCompanyArray.toString();
          console.log("contacts : " +contacts);
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

exports.mappingExcelSheet = async(req, res) => {
    try{
        var workbook = XLSX.readFile(`data/ContactData.xlsx`);
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
                    res.status(200).send({message: "file Uploaded"});
                }
           });
          
            // let data = [jsData];

            // //   contact.forEach(dat => {
            // //       console.log("dat dat : " +dat);
            // //       const companyStr =  dat.company.toString();
            // //       const mobileStr = dat.mobile_number.toString();
            //     //   data.push(jsData);
            // //    })
            //       const headingColumnNames = [
            //               "Company_ID",
            //               "Email",
            //               "Mobile_Number",
            //               "Country_Code"
            //           ]
      
            //           //Write Column Title in Excel file
            //           let headingColumnIndex = 1;
            //           headingColumnNames.forEach(heading => {
            //               ws.cell(1, headingColumnIndex++)
            //                   .string(heading)
            //           });
      
            //           //Write Data in Excel file
            //           let rowIndex = 2;
            //           data.forEach( record => {
            //               let columnIndex = 1;
            //               Object.keys(record ).forEach(columnName =>{
            //                   ws.cell(rowIndex,columnIndex++)
            //                       .string(record [columnName])
            //               });
            //               rowIndex++;
            //           }); 

            //   wb.write('makingExcel.xlsx');
            // res.status(201).send({message : "Excel File Is Ready"})

        //    console.log("file file file: " +file);

     }
    }catch(err) {
        res.status(401).send({err : err.message});
    }
}

exports.dbUpload = async(req, res) => {
    try {
        console.log("inside upload data");

        console.log("req : " +req.body);

        var workbook = XLSX.readFile(`data/ContactData.xlsx`);
        var sheet_name_list = workbook.SheetNames;

        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(xlData);
        const headerData = [];

        await xlData.forEach((data) => {
            headerData.push(Object.keys(data));
        })
        console.log(headerData[0]);

        console.log("request : " +JSON.stringify(req.body));

        const allValues = Object.values(req.body)
        console.log(allValues);

        const extractCompanyID = allValues.pop();
        console.log("extracted company_id : " +extractCompanyID);
        console.log("new All Values : " +allValues);

        xlData.forEach(async(data) => {
            let allExcelValues = []
            // let newColumns = [];

            console.log("data : " +JSON.stringify(data));
            const valuesOfAll = Object.values(data);
            console.log("values of all : " +valuesOfAll);
            allExcelValues.push({valuesOfAll});
            // console.log("allExcel Values :" +allExcelValues);
            // console.log("iniiiiiiiiiii val : " + JSON.stringify(allExcelValues[0].valuesOfAll[0]));
            // console.log("seco val : " + JSON.stringify(allExcelValues[0].valuesOfAll[1]));
            // console.log("tho val : " + JSON.stringify(allExcelValues[0].valuesOfAll[2]));

            // newColumns.push({allValues}) ;
            // console.log("all values .... : " +allValues);
            // console.log("first all values : " +allValues[0]);
            // console.log("newColumns : " +JSON.stringify(newColumns));

            // let initialValues = allExcelValues[0].valuesOfAll[0];
            // console.log("initialValues : "+initialValues);

            // var secondDat = allValues[1];
            // console.log("secondData : " +secondData);
            // let secondValues = allExcelValues[0].valuesOfAll[1];
            // console.log("secondValues : " +secondValues);

            // var thirdDat = allValues["2"];
            // console.log("thirdData : " +thirdData);

            // let thirdValues = allExcelValues[0].valuesOfAll[2];
            // console.log("thirdValues : " +thirdValues);

            console.log("extractCompanyID :"+extractCompanyID);

            // let firstlatestColumns = newColumns[0].allValues[0];
            // console.log("firstlatestColumns : " +firstlatestColumns); 
            // console.log(typeof firstlatestColumns); 
            // let secondlatestColumns = newColumns[0].allValues[1];
            // console.log("secondlatestColumns : " +secondlatestColumns);
            // console.log(typeof secondlatestColumns); 

            // let thirdlatestColumns = newColumns[0].allValues[2];
            // console.log("thirdlatestColumns : " +thirdlatestColumns);
            // console.log(typeof thirdlatestColumns); 

           let first = allValues[0];
           let second = allValues[1];
           let third = allValues[2];

            const finalValues = {"company" : extractCompanyID, first : allExcelValues[0].valuesOfAll[0] , second : allExcelValues[0].valuesOfAll[1] , third : allExcelValues[0].valuesOfAll[2]  }
        
            const contactJSON = {};
            contactJSON["company"] = extractCompanyID
            contactJSON[`${first}`] = finalValues.first;
            contactJSON[`${second}`] = finalValues.second;
            contactJSON[`${third}`] = finalValues.third;

            console.log("contact json: - ",JSON.stringify(contactJSON));

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