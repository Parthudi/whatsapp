import React from "react";
import { Grid , Button} from "@material-ui/core";

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
                    Send Message To All 
              </Button>   
          </Widget>
      </Grid>
    </>
  );
}
