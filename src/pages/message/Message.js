import React, {useState} from "react";
import { Grid ,TextField,  Button,
  CircularProgress,
  Fade} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function MessagePage() {
  var classes = useStyles();

   // local
   var [isLoading, setIsLoading] = useState(false);
   var [error, setError] = useState(null);
   var [contactValue, setContactValue] = useState("")
   var [messageValue, setMessageValue] = useState("")
 

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
                    // onClick={() =>
                    //   loginUser(
                    //     setIsLoading,
                    //     setError,
                    //   )
                    // }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
              </div>
          </form>
  
          </Widget>
        </Grid>

        <Grid item xs={12} md={4}>
          <Widget title="QR CODE GENERATOR" disableWidgetMenu>
            <div className={classes.dashedBorder}>
             

            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
