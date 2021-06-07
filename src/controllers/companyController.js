const Company = require('../models/companyModel')
const {Client} = require("whatsapp-web.js");
const client = new Client();
const whatsappClient = {};

exports.signupCompany = async (req, res) => {
    try{     
        const company = new Company(req.body)
    
        await company.save()
        res.status(201).json({'company ' : company})

      }catch(error){  
        console.log(error);       
        if(!req.body.name) {
            res.status(401).json({error: 'Please enter Name'})
        }
        else{
            res.status(401).json({error: "Fill the details Correctly"})
        }
        
      }
}

exports.readAllCompanies = async(req, res) => {
  try{
    console.log("read all comopanies ") ;
    const company = await Company.find();
    console.log("company : " +company);

    res.status(201).json(company)
  }catch(error){
      res.status(401).json({error: "Something went wrong"})
  }
}
