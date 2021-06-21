import React, { useState, useEffect } from "react";
import API from "../../config";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
// import isAuthenticated}
// styles
import useStyles from "./styles";

function AddContacts(props) {
  var classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [allcompany, setAllCompany] = useState([]);
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [email , setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("");
  const [allcountrycode, setAllCountryCode] = useState([]);

  const addContactsHandler = async(name, company,mobile,countrycode,email) => {
    try{
      setIsLoading(true);
       const userID = isAuth.user._id;
      const contactRegister = await fetch(`${API}/contact/signup`,{
             method: "POST",
             headers: {
                       Accept:  "application/json",
                     "Content-Type": "application/json"
             },
             body: JSON.stringify({name, company ,mobile_number : mobile, country_code : countrycode, email, createdBy: userID})
           }).then(response => response.json());
 
           if(contactRegister.error) {
             throw Error("Fill the Valid Details Only");
           }
          console.log("contactRegister :" +JSON.stringify(contactRegister));
          setIsLoading(false);
          setAllCompany("")
          setCompany("")
          setMobile("")
          setCountryCode("")
          setEmail("")
          setMessage(contactRegister.message);
   }catch(error){
     console.log("JSON.setr : " +JSON.stringify(error));
      setError(error.message);
      setIsLoading(false);
   }
}
    
const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));


  const companies = async() => {
    const company = await fetch(`${API}/companies`,{
                    method: "GET",
                    headers: {
                          "Authorization": `${isAuth.token}`,
                          "Content-Type": "application/json"
                  }
                }).then(response => response.json());
  
      setAllCompany(company);
      setIsLoading(false);
  }

  const fetchCountryCode = async() => {
    await fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json")
        .then(resp => resp.json()).then(data => setAllCountryCode(data));
  }
  
  useEffect(() => {
      companies();
      fetchCountryCode();
      if(isAuth.user.role === "user") {
        setCompany(isAuth.user.company);
      }
    }, [])

  return (
    <React.Fragment>
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>     

        {/* ///////////////////Add Contacts///////////////////// */}
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                 Contacts 
              </Typography>
              <br/><br/>
              { isLoading ? (<Fade in={isLoading} style={{marginLeft:"50px"}} >
                            <CircularProgress color="secondary" />
                        </Fade>) : null }

              {error && error.length > 6 ? (
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                      {error}
                  </Typography>
                </Fade>    
              )  : null }

            {message && message.includes("Created") ?
                <Fade in={message}>
                <Typography color="primary" className={classes.errorMessage}>
                    {message}
                </Typography>
              </Fade> : null}

<br/><br/>
              {isAuth.user.role === "user" ?
                    null
                //   <div>
                //   <InputLabel id="company"> Company </InputLabel>
                //     <Select labelId="company" id="company" value={isAuth.user.company} disabled className={classes.dropContainer}>
                //       <MenuItem  value={isAuth.user.company}> {isAuth.companyName}  </MenuItem>
                //     </Select> 
                // </div>    
                      :
                        (  <div>
                            <InputLabel id="company"> Company </InputLabel>
                            <Select labelId="company" id="company" value={company}  onChange={e => setCompany(e.target.value)}className={classes.dropContainer}>
                              {allcompany && allcompany.map((comp, i) => {
                                return <MenuItem value={comp._id} key={i}> {comp.name} </MenuItem>
                              })}
                            </Select> 
                          </div> )
              }

          <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={name}
                onChange={e => setName(e.target.value)}
                margin="normal"
                placeholder="Name"
                type="text"
                fullWidth
              />

              <TextField
                id="mobile"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                margin="normal"
                placeholder="Mobile Number"
                type="text"
                fullWidth
              />
<br/>
            <InputLabel id="group"> Country Code </InputLabel>
            <Select labelId="group" id="group" value={countrycode} onChange={e => setCountryCode(e.target.value)}  className={classes.groupDownButton}>
              {allcountrycode && allcountrycode.map((comp, i) => {
                  return <MenuItem value={comp.dial_code} key={i}> {comp.dial_code + "  " + comp.name} </MenuItem>
                })}
            </Select> 

              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email"
                type="text"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      addContactsHandler(
                            name,
                            company,
                            mobile,
                            countrycode,
                            email
                           )
                        }
                    disabled={
                      company.length === 0 ||
                      email.length === 0 ||
                      mobile.length === 0 ||
                      countrycode.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}  >
                    Create
                  </Button>
                )}
              </div>
            
            </React.Fragment>

        </div> <br></br>
        {/* <Typography color="primary" className={classes.copyright}>
        © 2020-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://www.vistaura.com/" rel="noopener noreferrer" target="_blank"> Vistaura </a>, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
    </React.Fragment>
  );
}

export default withRouter(AddContacts);
