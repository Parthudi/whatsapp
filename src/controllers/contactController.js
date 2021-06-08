const Contact = require('../models/contactModel')
const xl = require('excel4node');
const formidable = require('formidable');
const mv = require('mv');
const xlsxFile = require('read-excel-file');
const XLSX = require("xlsx");
const fs = require("fs");
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

exports.newExcelSheet = async(req, res) => {
    try{
        var workbook = XLSX.readFile(__dirname + '/uploads/books.xlsx');
                var sheet_name_list = workbook.SheetNames;
                var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                console.log(xlData);
                res.json({error_code:0,err_desc:null, data: xlData});

    }catch(error){
        res.status(401).send({error : error.message});
    }
}
  
exports.excelSheet = async(req, res) => {
    try {
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Worksheet Name');
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            // let avatar = req.files.avatar;
        
            // console.log(file.files.data);
            // console.log(file[0].data);
            // console.log("jsData : " +jsData);

            // wb.xlsx.load(jsData).then(workbook => {
            //     console.log(workbook, 'workbook instance')
            //     workbook.eachSheet((sheet, id) => {
            //       sheet.eachRow((row, rowIndex) => {
            //         console.log(row.values, rowIndex)
            //       })
            //     })
            //   })

            const file = await req.files;
            console.log(file);
            console.log(file.files.name);
            const jsData = file.files.data.toString('base64');
            console.log(jsData);

            // xlsxFile(`./${file.files.name}`).then((rows) => {
            //     console.log(rows);
            //     console.table(rows);
            //    })
    
            // // console.log(JSON.stringify(jsData));
            // // console.log(jsData.toString());
            // // console.log(jsData.toJSON());
            // // const basdata = await jsData.toString('base64');
            // // console.log("data bss : " +basdata);

            // // await fs.writeFileSync("programming.xlsx", basdata);
            // // // throw Error("not working");
          
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

            fs.readFile(file, "utf8", (err, jsonString) => {
                if (err) {
                  console.log("File read failed:", err);
                  return;
                }
            // Use the mv() method to place the file in upload directory (i.e. "uploads")
            // avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.files.name,
                    mimetype: file.files.mimetype,
                    size: file.files.size
                }
            });
        })
     }
    }catch(err) {
        res.status(401).send({err : err.message});
    }
}

exports.getExcelSheet = async(req, res) => {
    try{
        console.log("inside excelSheet");
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const oldpath = files.filetoupload.path;
            const newpath = __dirname + "/" + files.filetoupload.name;
            mv(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
                });
            });

            console.log("data passed ;");
    
            console.log("req .body : " +req.body);
            const contact = await Contact.find();
             
            const wb = new xl.Workbook();
            const ws = wb.addWorksheet('Worksheet Name');
            let data = [];
            contact.forEach(dat => {
                console.log("dat dat : " +dat);
                const companyStr =  dat.company.toString();
                const mobileStr = dat.mobile_number.toString();
                data.push({
                    company : companyStr,
                    email : dat.email,
                    mobile : mobileStr,
                    country : dat.country_code
                 })
                console.log("data "+ data);
             })
                const headingColumnNames = [
                        "Company_ID",
                        "Email",
                        "Mobile_Number",
                        "Country_Code"
                    ]
    
                    //Write Column Title in Excel file
                    let headingColumnIndex = 1;
                    headingColumnNames.forEach(heading => {
                        ws.cell(1, headingColumnIndex++)
                            .string(heading)
                    });
    
                    //Write Data in Excel file
                    let rowIndex = 2;
                    data.forEach( record => {
                        let columnIndex = 1;
                        Object.keys(record ).forEach(columnName =>{
                            ws.cell(rowIndex,columnIndex++)
                                .string(record [columnName])
                        });
                        rowIndex++;
                    }); 
                    wb.write('ContactData.xlsx');
            
                res.status(201).send({message : "Excel File Is Ready"})
            } catch(error) {
                res.status(401).send({message : "Excel File Failed"})
            }
        }