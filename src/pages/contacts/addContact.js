import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
// import isAuthenticated}
// styles
import useStyles from "./styles";

// context
import { useUserDispatch, SignupUser } from "../../context/UserContext";

function AddContacts(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);

  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [email , setEmail] = useState("")
 
  const addContactsHandler = (company,mobile,countryCode,email) => {
       setIsLoading(true);
       await fetch(`http://localhost:4000/contact/signup`,{
        method: "POST",
        headers: {
                  Accept:  "application/json",
                "Content-Type": "application/json"
        },
        body: JSON.stringify({company,mobile,countryCode,email})
      }).then(response => response.json());

    setIsLoading(false);
    history.push("/app/contacts");
  }

  return (
    <React.Fragment>
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered >

            <Tab label="Add Contact" classes={{ root: classes.tab }} />
          </Tabs>      

        {/* ///////////////////Signup User///////////////////// */}
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create Contacts
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="company"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={company}
                onChange={e => setCompany(e.target.value)}
                margin="normal"
                placeholder="Company"
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
                value={countryCode}
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
                            countryCode,
                            email,
                            props.history,
                            setIsLoading,
                            setError,
                           )
                        }
                    disabled={
                      company.length === 0 ||
                      email.length === 0 ||
                      mobile.length === 0 ||
                      countryCode.length === 0 
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
          )}

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
