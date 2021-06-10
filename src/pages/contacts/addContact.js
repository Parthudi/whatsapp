import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);

  const [allcompany, setAllCompany] = useState([]);
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [email , setEmail] = useState("")
 
  const addContactsHandler = async(company,mobile,countrycode,email) => {
       setIsLoading(true);
     const contactRegister = await fetch(`http://localhost:4000/contact/signup`,{
            method: "POST",
            headers: {
                      Accept:  "application/json",
                    "Content-Type": "application/json"
            },
            body: JSON.stringify({company ,mobile_number : mobile, country_code : countrycode, email})
          }).then(response => response.json());

    console.log("contactRegister :" +contactRegister);
    setIsLoading(false);
    window.location.reload();
    // props.history.push("/app/contacts");
  }

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const companies = async() => {
    const company = await fetch("http://localhost:4000/companies",{
                    method: "GET",
                    headers: {
                          "Authorization": `${isAuth.token}`,
                          "Content-Type": "application/json"
                  }
                }).then(response => response.json());
  
      // console.log("company : " +JSON.stringify(company));
      setAllCompany(company);
      setIsLoading(false);
  }
  
  useEffect(() => {
      companies();
    }, [])

  return (
    <React.Fragment>
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>     

        {/* ///////////////////Signup User///////////////////// */}
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                 Contacts 
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              {isAuth.user.role === "user" ?
                  <div>
                  <InputLabel id="company"> Company </InputLabel>
                    <Select labelId="company" id="company" onChange={e => setCompany(e.target.value)} className={classes.dropContainer}>
                      <MenuItem  value={isAuth.user.company}> {isAuth.companyName}  </MenuItem>
                    </Select> 
                </div>    :
                        (  <div>
                            <InputLabel id="company"> Company </InputLabel>
                            <Select labelId="company" id="company" value={isAuth.user.company}  onChange={e => setCompany(e.target.value)}className={classes.dropContainer}>
                              {allcompany && allcompany.map((comp, i) => {
                                return <MenuItem value={comp._id} key={i}> {comp.name} </MenuItem>
                              })}
                            </Select> 
                          </div> )
              }
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
                placeholder="Mobile_Number"
                type="text"
                fullWidth
              />

              <TextField
                id="Countrycode"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={countrycode}
                onChange={e => setCountryCode(e.target.value)}
                margin="normal"
                placeholder="Country_code"
                type="text"
                fullWidth
              />

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
                placeholder="email"
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
                    Create Contact
                  </Button>
                )}
              </div>
            
            </React.Fragment>

        </div> <br></br>
        <Typography color="primary" className={classes.copyright}>
        © 2020-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://www.vistaura.com/" rel="noopener noreferrer" target="_blank"> Vistaura </a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
    </React.Fragment>
  );
}

export default withRouter(AddContacts);
