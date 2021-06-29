import React,{useEffect, useState} from "react";
import { Grid , Button, Fab, Select,MenuItem, CircularProgress, Fade} from "@material-ui/core";
import PersonalMessage from "./personalMessage";
import GroupMessage from "./groupMessage";
import AllContacts from "./allContactMessage";
// import { Send as SendIcon, Navigation as NavigationIcon } from "@material-ui/icons";
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";


export default function MessagePage(props) {

  const [isLoading, setIsLoading] = useState("");
  const [changePage, setChangePage] = useState("");

  var classes = useStyles();

  return (
    <>
      <PageTitle title="Message" />

        <Grid item xs={12} md={4} style={{textAlign:"center", margin:"auto"}}>
            {/* <div className={classes.buttonBackground}> */}
            <div className={classes.borderStyle}>
              <Select
                  value={changePage}
                  className={classes.select}
                  placeholder="Choose Option"
                  onChange={(e) => setChangePage(e.target.value)} 
                  inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                  }} >
                  <MenuItem value="personal">  Send Personal Message  </MenuItem>
                  <MenuItem value="group">  Send Group Message  </MenuItem>
                  <MenuItem value="allcontact">  Send Message To All  </MenuItem>
              </Select>   
            </div>

            { isLoading ? (<Fade in={isLoading}>
                        <CircularProgress color="secondary" />
                    </Fade>) : null }
{/*               
            <Fab
              onClick={() => props.history.push("/app/message/personalmessage")}
              variant="extended"
              size="large"
              color="primary"
              aria-label="add"
              className={classes.button}
            >
              <NavigationIcon className={classes.extendedIcon} />
               
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
              </Fab> */}
              
            {/* </div>    */}
      </Grid>
      <Grid item xs={12} md={12} className={classes.backgroundSetting}>
        <Widget disableWidgetMenu> 
              {changePage === "personal" ? <PersonalMessage /> : null }
              {changePage === "group" ? <GroupMessage /> : null }
              {changePage === "allcontact" ? <AllContacts /> : null }
        </Widget>
      </Grid>
    </>
  );
}
