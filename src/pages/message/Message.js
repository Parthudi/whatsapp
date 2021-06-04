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

export default function MessagePage() {
  var classes = useStyles();

   // local
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [response, setResponse] = useState("");
   const [contactValue, setContactValue] = useState("");
   const [messageValue, setMessageValue] = useState("");
   const [showQr , setShowQr] = useState(true);
   const [showMessage , setShowMessage] = useState("");
  const  {token} = isAuthenticated();
  
  // useEffect(async() => {
  //   try{
  //     setIsLoading(true);
  //     const response = await fetch("http://localhost:4000/users/auth", {
  //             method: "GET",
  //             headers: {
  //             "Authorization" : `Bearer ${token}`,
  //             "Content-Type": "application/json"
  //               }
  //           }).then(res => res.json()) 

  //           setIsLoading(false);
  //           setResponse(response);
  //     }catch(error){
  //         console.log(error);
  //   } 
  // }, []);

  const QrCodeHandler = async() => {
        try{
          setIsLoading(true);
          const response = await fetch("http://localhost:4000/users/auth", {
                  method: "GET",
                  headers: {
                  "Authorization" : `Bearer ${token}`,
                  "Content-Type": "application/json"
                    }
                }).then(res => res.json()) 
    
                response.length > 1 ?  console.log("response of qrcodeHandler : " +response) : console.log("user authenticated")
                response.length > 1 ? setResponse(response) : setResponse("User authenticated");
                setIsLoading(false);
                setShowQr(false);
          }catch(error){
              console.log(error);
        } 
  }

  const messageUserHandler = (contact, message) => {
    try{
      messageUser(contact, message, token).then((response) => {
        console.log("response : " +response);
        if(response.includes("Sent")) {
          setResponse("");
          setMessageValue("");
          setError(false);
          setShowMessage(response);

          }else{
              setMessageValue("");
              setShowMessage(response);       
          }

        setTimeout(() => { 
          setShowMessage("");
          }, 4000);  
    })
        
    }catch(error) {
        setError(true);
  }
}

// const showAuthMessage = () => {
//   console.log("inside showAuthMessage");
//   setTimeout(() => { 
//        return response;
//     }, 5000);
//     setShowQr(false);
// }

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
                // disabled = {response.length > 1}
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
                // disabled = {response.length > 1}
                margin="normal"
                placeholder="Message"
                type="text"
                fullWidth
              />

            <div className={classes.formButtons}>
                  <Button
                    disabled={
                      contactValue.length <= 9  || messageValue.length === 0 
                    }
                    onClick={() =>
                      messageUserHandler(
                        contactValue,
                        messageValue
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                     Send 
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

        <Grid item xs={12} md={4}>
          <Widget title="QR CODE GENERATOR" disableWidgetMenu>
            <div className={classes.dashedBorder}>
              {isLoading ? <CircularProgress color="secondary" /> : ( response.length >= 25 ? <QRCode value={response} size={256} />  : (<Typography color="secondary"> {response.user} </Typography> )  ) } 
            </div>
            
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
