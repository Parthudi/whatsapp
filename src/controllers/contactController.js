const Contact = require('../models/contactModel')

exports.signupContact = async (req, res) => {
    try{     
        const contact = new Contact(req.body)
    
        await contact.save()
        res.status(201).json({'contact ' : contact})

      }catch(error){         
            res.status(401).json({error: "Fill the details Correctly"})
      }
}