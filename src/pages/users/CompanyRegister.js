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

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, SignupCompany } from "../../context/UserContext";

function CompanyRegister(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  
  const [companyName, setCompanyName] = useState("Vistaura")
  const [address1, setAddress1] = useState("202-A avadh residency")
  const [address2, setAddress2] = useState(" in yoginagar township")
  const [state, setState] = useState("gujarat")
  const [city, setCity] = useState("vadodara")
  const [pincode, setPincode] = useState("390002")
  const [gstin, setGstin] = useState("7865452")

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
            centered
          >
            <Tab label="New Company" classes={{ root: classes.tab }} />
          </Tabs>

           {/* ///////////////////Signup Company///////////////////// */}
           {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your Company
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="company name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                margin="normal"
                placeholder="Company Name"
                type="text"
                fullWidth
              />
              <TextField
                id="address1"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={address1}
                onChange={e => setAddress1(e.target.value)}
                margin="normal"
                placeholder="Address 1"
                type="text"
                fullWidth
              />

              <TextField
                id="address 2"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={address2}
                onChange={e => setAddress2(e.target.value)}
                margin="normal"
                placeholder="Address 2"
                type="text"
                fullWidth
              />

              <TextField
                id="state"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={state}
                onChange={e => setState(e.target.value)}
                margin="normal"
                placeholder="State"
                type="text"
                fullWidth
              />

              <TextField
                id="city"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={city}
                onChange={e => setCity(e.target.value)}
                margin="normal"
                placeholder="City"
                type="text"
                fullWidth
              />

              <TextField
                id="pincode"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                margin="normal"
                placeholder="Pincode"
                type="text"
                fullWidth
              />

              <TextField
                id="gstin"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={gstin}
                onChange={e => setGstin(e.target.value)}
                margin="normal"
                placeholder="Gstin"
                type="text"
                fullWidth
              />
        
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      SignupCompany(
                        userDispatch,
                        companyName,
                        address1,
                        address2,
                        state,
                        city,
                        pincode,
                        gstin,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      companyName.length === 0 ||
                      address1.length === 0 ||
                      state.length === 0 ||
                      city.length === 0 ||
                      pincode.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
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

export default withRouter(CompanyRegister);
