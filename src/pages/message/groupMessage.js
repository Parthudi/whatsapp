import React, {useState, useEffect} from "react";
import { Grid ,TextField,  Button,
  CircularProgress,
  Fade,
  InputLabel,
  Select,
  MenuItem} from "@material-ui/core";
import QRCode from "qrcode.react";
import { Send as SendIcon } from "@material-ui/icons";

// import QRReader from "react-qr-scanner";
import { messageGroup} from "../../context/UserContext";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";

export default function GroupMessage() {
  var classes = useStyles();

   // local
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [response, setResponse] = useState("");
   const [messageValue, setMessageValue] = useState("");
   const [showQr , setShowQr] = useState(true);
   const [showMessage , setShowMessage] = useState("");
   const [allgroups , setAllGroups] = useState([]);
   const [group , setGroup] = useState("");

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));
  
  const allGroups = async() => {
    try{
    const userID = isAuth.user.role === "user" ? isAuth.user._id : "admin" ;;

        setIsLoading(true);
        const allGroups = await fetch("http://localhost:4000/groups", {
                method: "POST",
                headers: {
                "Authorization" : `Bearer ${isAuth.token}`,
                "Content-Type": "application/json"
                  },
                body: JSON.stringify({userID})
              }).then(res => res.json()) 
  
              console.log("allGroups : " +JSON.stringify(allGroups));
              setIsLoading(false);
              setAllGroups(allGroups);
        }catch(error){
            console.log(error);
      } 
  }
  useEffect(() => {
    allGroups();
  }, []);

  const QrCodeHandler = async() => {
        try{
          setIsLoading(true);
          const response = await fetch("http://localhost:4000/group/auth", {
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

  const messageGroupHandler = (group, message) => {
    try{
      setIsLoading(true);
      messageGroup(group, message, isAuth.token).then((response) => {
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
        
        <Grid item xs={12} md={showQr == true ? 12 : 8}>
          <Widget title="SEND MESSAGE" disableWidgetMenu>
          { isLoading ? (<Fade in={isLoading} style={{marginLeft:"50px"}} >
                            <CircularProgress color="secondary" />
                        </Fade>) : null }
          <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                    Please fill the credentials properly  :(
                </Typography>
          </Fade>

          {allgroups && allgroups.length <1 ? 
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                      Please Create Group First !!
                  </Typography>
                </Fade> : null}

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
                <div>
                        <InputLabel id="group"> Groups </InputLabel>
                        <Select labelId="group" id="group"  onChange={e => setGroup(e.target.value)}  className={classes.groupDownButton}>
                          {allgroups && allgroups.map((comp, i) => {
                            return <MenuItem value={comp._id} key={i}> {comp.name} </MenuItem>
                          })}
                        </Select> 
                </div>
        
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
                        group.length === 0  || messageValue.length === 0 
                    }
                    onClick={() =>
                      messageGroupHandler(
                        group,
                        messageValue,
                        isAuth
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
