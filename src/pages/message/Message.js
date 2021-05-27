import React, {useState} from "react";
import { Grid ,TextField,  Button,
  CircularProgress,
  Fade} from "@material-ui/core";
import QRCode from "qrcode.react";

import { messageUser, isAuthenticated } from "../../context/UserContext";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function MessagePage() {
  var classes = useStyles();

   // local
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [response, setResponse] = useState("");
   const [contactValue, setContactValue] = useState("");
   const [messageValue, setMessageValue] = useState("");
 
  const  {token} = isAuthenticated();

  console.log("token : " +token);
  const messageUserHandler = (contact, message) => {
      messageUser(contact, message, token).then((response) => {
          if(response.error) {
            setError(true);
            setIsLoading(false);
           }else{
             console.log("response : " +response);
              setResponse(response);
              setError(false);
              setIsLoading(false);
           }
      })
  }

  return (
    <>
      <PageTitle title="Message" />
      <Grid container spacing={4}>
        
        <Grid item xs={12} md={8}>
          <Widget title="SEND MESSAGE" disableWidgetMenu>

          <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    Please fill the credentials properly  :(
                </Typography>
          </Fade>

          <form className={classes.root} noValidate autoComplete="off">
          <TextField 
                id="Contacts"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={contactValue}
                onChange={e => setContactValue(e.target.value)}
                margin="normal"
                placeholder="Contacts"
                type="string"
                fullWidth
              />
              <TextField
                id="message"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={messageValue}
                onChange={e => setMessageValue(e.target.value)}
                margin="normal"
                placeholder="Message"
                type="text"
                fullWidth
              />

            <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      contactValue.length <= 9  || messageValue.length === 0
                    }
                    onClick={() =>
                      messageUserHandler(
                        contactValue,
                        messageValue,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                     Send 
                  </Button>
                )}
              </div>
          </form>
  
          </Widget>
        </Grid>

        <Grid item xs={12} md={4}>
          <Widget title="QR CODE GENERATOR" disableWidgetMenu>
            <div className={classes.dashedBorder}>
               {response ? <QRCode value={response} size={256} /> : null} 
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
