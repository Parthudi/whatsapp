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

import useStyles from "./styles";

const EditUser = (props) => {
    const classes = useStyles();

    // local
    const [edituser, setEditUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [email , setEmail] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

const updateUserHandler = async(name, role ,email) => {
    try{
      setIsLoading(true);
      console.log(JSON.stringify(edituser));
       const userID = isAuth.user._id;

        const updateUser = await fetch(`${API}/user/update/${edituser._id}`,{
             method: "PATCH",
             headers: {
                      Authorization: `Bearer ${isAuth.token}`,
                     "Content-Type": "application/json"
             },
             body: JSON.stringify({name, role ,email, userid:edituser._id , modifiedBy:userID})
           }).then(response => response.json());
 
          console.log(JSON.stringify(updateUser));
          setMessage(updateUser.message);
          setRole("");
          setName("");
          setEmail("");
          window.location.reload();
          setIsLoading(false);
   }catch(error){
     console.log("JSON.setr : " +JSON.stringify(error));
      setError(error.message);
      setIsLoading(false);
   }
}
    
  useEffect(() => {
     setEditUser(props.userToEdit);
    
    }, [])

  return (
    <React.Fragment>
    <Grid container className={classes.container}>
      <div className={classes.formContainer} style={{marginTop:"5%"}}>
        <div className={classes.form}>     

            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                 Edit User 
              </Typography>
              <br/><br/>
                { isLoading ? (<Fade in={isLoading} style={{marginLeft:"50px"}} >
                                <CircularProgress color="secondary" />
                            </Fade>) : null }

              {message && message.includes("Updated") ? 
                    <Fade in={message}>
                        <Typography color="primary" className={classes.errorMessage}>
                            {message}
                        </Typography>
                    </Fade> 
              : (
                    <Fade in={error}>
                        <Typography color="secondary" className={classes.errorMessage}>
                            {error}
                        </Typography>
                    </Fade>    
                )  }

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
            placeholder={"Name : - " + edituser.name}
            type="text"
            autoComplete="off"
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
            placeholder={"Role : - " + edituser.role}
            type="text"
            autoComplete="off"
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
                placeholder={"Email : - " + edituser.email}
                type="text"
                autoComplete="off"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      updateUserHandler(
                            name,
                            role,
                            email
                           )
                        }
                    disabled={
                      name.length === 0 &&
                      role.length === 0 &&
                      email.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}  >
                        Edit
                  </Button>
                )}
              </div>
            
            </React.Fragment>

        </div> <br></br>
    
      </div>
    </Grid>
    </React.Fragment>
  );
}

export default withRouter(EditUser);
