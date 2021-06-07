import React, {useState, useEffect} from "react";
import { Grid ,TextField,  Button,
  CircularProgress,
  Fade,} from "@material-ui/core";
import QRCode from "qrcode.react";
// import QRReader from "react-qr-scanner";
import { messageUser, isAuthenticated } from "../../context/UserContext";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function MessagePage(props) {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="Message" />
      
        <Grid item xs={12} md={8}>
          <Widget title="SEND MESSAGE" disableWidgetMenu>
               <Button
                  onClick={() => props.history.push("/app/message/personalmessage")}
                  variant="contained"
                  color="inherit"
                  size="large" >
                    Send Personal Message 
                 </Button>  
           
                <Button
                  onClick={() => props.history.push("/app/message/groupmessage")}
                  variant="contained"
                  color="default"
                  size="large" >
                    Send Group Message 
              </Button>   
           
                <Button
                  onClick={() => props.history.push("/app/message/allcontacts")}
                  variant="contained"
                  color="inherit"
                  size="large"  >
                    Send Show QR Code 
              </Button>   
          </Widget>
      </Grid>
    </>
  );
}
