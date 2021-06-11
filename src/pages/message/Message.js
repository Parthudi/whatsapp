import React from "react";
import { Grid , Button, Fab} from "@material-ui/core";
import { Send as SendIcon, Navigation as NavigationIcon } from "@material-ui/icons";
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";


export default function MessagePage(props) {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="Message" />

        <Grid item xs={12} md={12} className={classes.backgroundSetting}>
          <Widget  disableWidgetMenu>
            <div className={classes.buttonBackground}>
            <Fab
              onClick={() => props.history.push("/app/message/personalmessage")}
              variant="extended"
              size="large"
              color="primary"
              aria-label="add"
              className={classes.button}
            >
              <NavigationIcon className={classes.extendedIcon} />
              Send Personal Message 
            </Fab>
           
              <Fab
                onClick={() => props.history.push("/app/message/groupmessage")}
                variant="extended"
                size="large"
                color="primary"
                aria-label="add"
                className={classes.button}
              >
                <NavigationIcon className={classes.extendedIcon} />
                  Send Group Message 
              </Fab>
           
              <Fab
                onClick={() => props.history.push("/app/message/allcontacts")}
                variant="extended"
                size="large"
                color="primary"
                aria-label="add"
                className={classes.button}
               >
                <NavigationIcon className={classes.extendedIcon} />
                  Send Message To All 
              </Fab>
              
            </div>   
          </Widget>
      </Grid>
    </>
  );
}
