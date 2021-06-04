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
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, LoginUser, SignupUser, SignupCompany } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  
  // const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("parmarparth597@gmail.com");
  const [passwordValue, setPasswordValue] = useState("parthu");
  // const [signupEmailValue, setSignupEmailValue] = useState("");
  // const [signuppasswordValue, setSignupPasswordValue] = useState("");
  // const [roleValue , setRoleValue] = useState("")
  // const [companyValue, setCompanyValue] = useState("")

  const [forgotEmailValue, setForgotEmailValue] = useState("")
  const [forgotPasswordValue, setForgotPasswordValue] = useState("")

  // const [companyName, setCompanyName] = useState("Vistaura")
  // const [address1, setAddress1] = useState("202-A avadh residency")
  // const [address2, setAddress2] = useState(" in yoginagar township")
  // const [state, setState] = useState("gujarat")
  // const [city, setCity] = useState("vadodara")
  // const [pincode, setPincode] = useState("390002")
  // const [gstin, setGstin] = useState("7865452")

  // const onClickHandler = (userDispatch,emailValue,passwordValue) => {
  //     LoginUser(userDispatch,emailValue,passwordValue).then((err, data) => {
  //       if(err){
  //          console.log("Error : " +data.error);
  //          setError(true);
  //          setIsLoading(false);
  //       }else{
  //          setError(true);
  //          setIsLoading(false);
  //          setVisitUsers(visitUsers + 1);
  //          console.log(visitUsers);
  //         <Dashboard visitedUsers={visitUsers} />;
  //          localStorage.setItem('TOKEN', JSON.stringify(data));
  //          props.history.push('/app/dashboard')
  //       }
  //     })
  //  }

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
                Good Morning, User 
              </Typography>     : 
              (
                new Date().getHours() > 12 && new Date().getHours() <= 17 ?
                <Typography variant="h1" className={classes.greeting}>
                  Good Afternoon, User 
                </Typography>       :
                <Typography variant="h1" className={classes.greeting}>
                 Good Evening, User 
            </Typography>
              ) }
              
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
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
                        LoginUser(
                          userDispatch,
                          emailValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError,
                        )
                      }
                      variant="contained"
                      color="primary"
                      size="large" >
                      Login
                    </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick = { () => setActiveTabId(2)}
                >
                  Forget Password
                </Button>
              </div>

              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
            </div>
            <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
            </Button>
            </React.Fragment>
          )}

      {/* ////////////////////////// FORGET PASSWORD /////////////////////////// */}
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

export default withRouter(Login);
