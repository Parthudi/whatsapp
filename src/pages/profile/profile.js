import React, {useState} from "react";
import { Grid } from "@material-ui/core";
import {isAuthenticated } from "../../context/UserContext"
import {
    Person as AccountIcon,
  } from "@material-ui/icons";
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";


export default function MessagePage() {
  var classes = useStyles();

  const {user, token, companyName} = isAuthenticated();

   // local
   var [isLoading, setIsLoading] = useState(false);
   var [error, setError] = useState(null);
  //  var [contactValue, setContactValue] = useState("")
  //  var [messageValue, setMessageValue] = useState("")
 

  return (
    <>
      <PageTitle title="Profile" />
      <Grid container spacing={4} >
        
        <Grid item md={3/7} >
          <Widget title="USER PROFILE" disableWidgetMenu  >
                <AccountIcon  className={classes.sizeOfFont} />
          </Widget>
        </Grid>

        <Grid item xs={12} md={8}>
          <Widget title="USER DETAILS" disableWidgetMenu>
            <div className={classes.dashedBorder} >
              <Typography size="md"> Name  : {user.name}</Typography>
              <Typography size="md"> Company : {companyName}</Typography>
              <Typography size="md"> Role  : {user.role}</Typography>
              <Typography size="md"> Email : {user.email}</Typography>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
