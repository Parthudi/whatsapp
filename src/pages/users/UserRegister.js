import React, { useState, useEffect } from "react";
import API from "../../config";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// context
import {SignupUser } from "../../context/UserContext";

const UserRegister = (props) => {
  var classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role , setRole] = useState("")
  const [allcompany, setAllCompany] = useState([])
  const [company, setCompany] = useState([])

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

useEffect(() => {
    companies();
    if(isAuth.user.role==="user"){
        setRole("user");
        setCompany(`${isAuth.user.company}`);
    }
  }, [])

  const userSignup = async(name, email, password, role, company) => {
    setIsLoading(true);
    console.log("name : " +name);
    console.log("email : " +email);
    console.log("password : " +password);
    console.log("role : " +role);
    console.log("company : " +company);

        await SignupUser(name, email, password, role, company, isAuth.user._id).then(response => {
              if(response.error) {
                  setError(response.error);
                  setIsLoading(false);
              }else{
                setCompany("");
                setRole("");
                setPassword("");
                setEmail("");
                setName("");
                setError(false);
                setIsLoading(false);
              }
          })
        }

  return (
    <>
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
      
        {/* ///////////////////Signup User///////////////////// */}
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                Create User
              </Typography>

              <br/><br/>
              {error && error.length > 6 ? (
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                      {error}
                  </Typography>
                </Fade>    
              )  : null }

              <br/><br/>
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
                autoComplete='off'
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
                autoComplete='off'
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
                autoComplete='off'
                fullWidth
              />
<br/>
            {isAuth.user.role === "user" ? 
              null
               :
              <div>
                <InputLabel id="role"> Role </InputLabel>
                <Select labelId="role" id="role"  onChange={e => setRole(e.target.value)}  className={classes.dropContainer}>
                  <MenuItem value="user" > User  </MenuItem>
                  <MenuItem value="admin" > Admin  </MenuItem>
                </Select> 
              </div>
            } 
<br/>
            {isAuth.user.role === "user" ?
              null
                :  
                  (  <div>
                        <InputLabel id="company"> Company </InputLabel>
                        <Select labelId="company" id="company"  onChange={e => setCompany(e.target.value)} disabled={role.length === 0 || role === "admin"} className={classes.dropContainer}>
                          {allcompany && allcompany.map((comp, i) => {
                            return <MenuItem value={comp._id} key={i}> {comp.name} </MenuItem>
                          })}
                        </Select> 
                      </div> )
                  }
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      userSignup(
                        name,
                        email,
                        password,
                        role,
                        company,
                      )
                    }
                    disabled={
                      email.length === 0 ||
                      password.length === 0 ||
                      name.length === 0 ||
                      role.length === 0 ||
                      role === "user" ? company.length === 0  : null 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create 
                  </Button>
                )}
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

        </div> 
      </div>
    </Grid>
    </>
  );
}

export default withRouter(UserRegister);
