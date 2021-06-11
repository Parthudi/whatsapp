import React, {useState, useEffect} from "react";
import { Grid ,TextField,  Button,
  CircularProgress,
  Fade,InputLabel, Select,MenuItem } from "@material-ui/core";
import QRCode from "qrcode.react";
import { Send as SendIcon } from "@material-ui/icons";

import { messageUser} from "../../context/UserContext";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function PersonalMessage() {
  var classes = useStyles();

   // local
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [response, setResponse] = useState("");
   const [contactValue, setContactValue] = useState("");
   const [messageValue, setMessageValue] = useState("");
   const [showQr , setShowQr] = useState(true);
   const [showMessage , setShowMessage] = useState("");
   const [allcountrycode , setAllCountryCode] = useState([]);
   const [countrycode ,setCountryCode] = useState("");
  

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

const fetchCountryCode = async() => {
  await fetch("https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json")
      .then(resp => resp.json()).then(data => setAllCountryCode(data));
}
  useEffect(async() => {
    fetchCountryCode();
  }, []);

  const QrCodeHandler = async() => {
        try{
          setIsLoading(true);
          const response = await fetch("http://localhost:4000/users/auth", {
                  method: "GET",
                  headers: {
                  "Authorization" : `Bearer ${isAuth.token}`,
                  "Content-Type": "application/json"
                    }
                }).then(res => res.json()) 
    
                response.length > 1 ?  console.log("response of qrcodeHandler : " +response) : console.log("user authenticated")
                response.length > 1 ? setResponse(response) : setResponse("User authenticated");
                setIsLoading(false);
                setShowQr(false);
          }catch(error){
              console.log(error);
              setError(true);
              setIsLoading(false);
        } 
  }

  const messageUserHandler = (countrycode,contact, message) => {
    try{
      setIsLoading(true);
      messageUser(countrycode,contact, message, isAuth.token).then((response) => {
        console.log("response : " +response);
        if(response.error){
          console.log(response.error);
          setError(true);
          setIsLoading(false);
       }
        if(response.includes("Sent")) {
          setResponse("");
          setMessageValue("");
          setError(false);
          setIsLoading(false);
          setShowMessage(response);

          setTimeout(() => { 
            setShowMessage("");
            }, 8000); 
         }else{
           console.log("inside else ");
              setMessageValue("");
              setError(false);
              setIsLoading(false);
              setShowMessage(response); 
              
              if(response && response.includes("Session")){
                console.log("session closed");
                setTimeout(() => { 
                    window.location.reload();
                  }, 8000); 
              }else{
                setTimeout(() => { 
                  setShowMessage("");
                  }, 5000); 
              } 
          }
    })
   
    }catch(error) {
        setError(true);
  }
}

  return (
    <>
      <PageTitle title="Message" />
      <Grid container spacing={4}>
        
        <Grid item xs={12} md={8}>
          <Widget title="SEND MESSAGE" disableWidgetMenu>
          { isLoading ? (<Fade in={isLoading} style={{marginLeft:"50px"}}>
                            <CircularProgress color="secondary" />
                         </Fade>) : null }
          <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    Please fill the credentials properly  :(
                </Typography>
          </Fade>

        { showQr ? 
               <Button
               onClick={QrCodeHandler}
               variant="contained"
               color="primary"
               size="large"
             >
                Show QR Code 
             </Button>  : 

          <form className={classes.root} noValidate autoComplete="off">

            <InputLabel id="group"> Country_Code </InputLabel>
            <Select labelId="group" id="group" value={countrycode} onChange={e => setCountryCode(e.target.value)}  className={classes.groupDownButton}>
              {allcountrycode && allcountrycode.map((comp, i) => {
                  return <MenuItem value={comp.dial_code} key={i}> {comp.name} </MenuItem>
                })}
            </Select> 
                
          <TextField 
                id="Contact"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={contactValue}
                onChange={e => setContactValue(e.target.value)}
                // disabled = {response.length > 1}
                margin="normal"
                placeholder="Contact"
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
                // disabled = {response.length > 1}
                margin="normal"
                placeholder="Message"
                type="text"
                fullWidth
              />

            <div className={classes.formButtons}>
                  <Button
                    disabled={
                      contactValue.length <= 9  || messageValue.length === 0 , countrycode.length === 0
                    }
                    onClick={() =>
                      messageUserHandler(
                        countrycode,
                        contactValue,
                        messageValue
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                     Send 
                     <SendIcon className={classes.sendButtonIcon} />
                  </Button>
                {showMessage.length > 15 ? 
                       <Typography color="secondary" noWrap>
                          {showMessage}
                       </Typography>   :

                        <Typography color="primary" noWrap>
                        {showMessage}
                    </Typography> }

              </div>
          </form>  } 
          </Widget>
        </Grid>
      
      {response.length >= 25 ? 
        (<Grid item xs={12} md={4}>
          <Widget title="QR CODE GENERATOR" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              {isLoading ? <CircularProgress color="secondary" /> : ( response.length >= 25 ? <QRCode value={response} size={256} />  : (<Typography color="secondary"> {response.user} </Typography> )  ) } 
            </div> 
          </Widget>
        </Grid>) : null }
      </Grid>
    </>
  );
}
