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

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch, LoginUser, SignupUser, SignupCompany } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [errorr, setError] = useState("");
  const [activeTabId, setActiveTabId] = useState(0);
  
  const [emailValue, setEmailValue] = useState("parmarparth597@gmail.com");
  const [passwordValue, setPasswordValue] = useState("parthu");

  const clickHandler = (userDispatch,emailValue,passwordValue) => {
      LoginUser(userDispatch,emailValue,passwordValue).then((data) => {
        if(data.error){
           console.log("Error : " +data.error);
           setError("User Not Found ! Please Fill Correct Details Only :( ");
           console.log("errrrrrrror : " +errorr);
           setIsLoading(false);
        }else{
          console.log("no eerrorr")
           setIsLoading(false);
           props.history.push('/app/dashboard')
        }
      })
   }

  return (
    <React.Fragment>
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>  USERS  </Typography>
      </div>

      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
          </Tabs>

         {/* //////////////////////LOGIN///////////////////////   */}
          {activeTabId === 0 && (
            <React.Fragment>
              {new Date().getHours() <= 12 ? 
              <Typography variant="h1" className={classes.greeting}>
                Good Morning User 
              </Typography>     : 
              (
                new Date().getHours() > 12 && new Date().getHours() <= 17 ?
                <Typography variant="h1" className={classes.greeting}>
                  Good Afternoon User 
                </Typography>       :
                <Typography variant="h1" className={classes.greeting}>
                 Good Evening User 
            </Typography>
              ) }
              
            {errorr && errorr.length > 1 ? (
              console.log("showing error"),
              <Fade in={errorr}>
                <Typography color="secondary" className={classes.errorMessage}>
                   {errorr}
                </Typography> 
              </Fade>) : console.log("null error")} 

<br/><br/><br/>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                      disabled={
                        emailValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() =>
                        clickHandler(
                          userDispatch,
                          emailValue,
                          passwordValue,
                          props.history,
                        )
                      }
                      variant="contained"
                      color="primary"
                      size="large" >
                      Login
                    </Button>
                )}
                {/* <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick = { () => setActiveTabId(2)}
                >
                  Forget Password
                </Button> */}
              </div>

            </React.Fragment>
          )}

      {/* ////////////////////////// FORGET PASSWORD ///////////////////////////
      {activeTabId === 3 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                Forgot your account ? 
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  User Does not Exist  :(
                </Typography>
              </Fade>
              
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={forgotEmailValue}
                onChange={e => setForgotEmailValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />

              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={forgotEmailValue}
                onChange={e => setForgotPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
            
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      LoginUser(
                        userDispatch,
                        forgotEmailValue,
                        forgotPasswordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      forgotEmailValue.length === 0 ||
                      forgotPasswordValue.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Password Reset
                  </Button>
                )}
              </div>
              
            </React.Fragment>
          )} */}

        </div> <br></br>
        {/* <Typography color="primary" className={classes.copyright}>
        © 2020-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://www.vistaura.com/" rel="noopener noreferrer" target="_blank"> Vistaura </a>, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
    </React.Fragment>
  );
}

export default withRouter(Login);
