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
import { useUserDispatch, SignupUser } from "../../context/UserContext";

function UserRegister(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role , setRole] = useState("")
  const [company, setCompany] = useState("")

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

            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>      

        {/* ///////////////////Signup User///////////////////// */}
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
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
                placeholder="Full Name"
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <TextField
                id="role"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={role}
                onChange={e => setRole(e.target.value)}
                margin="normal"
                placeholder="Role"
                type="text"
                fullWidth
              />
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
        
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      SignupUser(
                        userDispatch,
                        name,
                        email,
                        password,
                        role,
                        company,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      email.length === 0 ||
                      password.length === 0 ||
                      name.length === 0 ||
                      role.length === 0 ||
                     company.length === 0 
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
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              {/* <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
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

export default withRouter(UserRegister);
