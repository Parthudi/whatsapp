import React, { useState} from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { GroupRegistration } from "../../context/UserContext";

// styles
import useStyles from "./styles";
// context

function CreateGroups(props) {
  var classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [contacts, setContacts] = useState("");
  const [name, setName] = useState("");
 
  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const createGroupHandler = async(contacts, name, isAuth) => {
     setIsLoading(true);
     await GroupRegistration(contacts, name, isAuth.user._id, isAuth.token).then(response => {
            if(response.error) {
                setIsLoading(false);
                setError(true);
            }else{
                setIsLoading(false);
                setError(false);
                setName("");
            }
     })
  }

  return (
    <React.Fragment>
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>     

        {/* ///////////////////Signup Group///////////////////// */}
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                <u> Group </u>
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              
              <TextField
                id="contact"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={contacts}
                onChange={e => setContacts(e.target.value)}
                margin="normal"
                placeholder="Contacts"
                type="text"
                fullWidth
              />

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
                placeholder="Group Name"
                type="text"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      createGroupHandler(
                            contacts,
                            name,
                            isAuth
                           )
                        }
                    disabled={
                      contacts.length === 0 ||
                      name.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}  >
                    Create Group
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

export default withRouter(CreateGroups);
