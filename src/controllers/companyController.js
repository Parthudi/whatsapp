const Company = require('../models/companyModel')

exports.signupCompany = async (req, res) => {
    try{     
        const company = new Company(req.body)
    
        await company.save()
        res.status(201).json({'company ' : company})

      }catch(error){         
        if(!req.body.name) {
            res.status(401).json({error: 'Please enter Name'})
        }
        else{
            res.status(401).json({error: "Fill the details Correctly"})
        }
        
      }
}