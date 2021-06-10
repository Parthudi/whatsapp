import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress,
    Fade, Typography} from "@material-ui/core";

import Widget from "../../components/Widget/Widget";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

 function UploadExcelSheet(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [excelMessage, setExcelMessage] = useState("");
    const [values, setValues] = useState({formData : ""});
    const [available ,setAvailable] = useState(false);

    const { formData } = values;

  const classes = useStyles();

  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  useEffect(() => {
    return (setValues({ formData : new FormData() }) );
}, []);

  const getExcelSheet = async() => {
      try{
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/download/excel",{
              method: "POST",
              headers: {
                  "Authorization" : `Bearer ${isAuth.token}`,
              },
              body: formData
          }).then(res => res.json());

          if(response.message.includes("failed")) {
                throw new Error(response.message)
              }
              setIsLoading(false);
              setExcelMessage(response.message);

              setValues({... values, formData : "" })
              setTimeout(() => { 
                  setExcelMessage("");
                }, 4000);  
              props.history.push("/app/contacts/addexcel/mapping");
        }catch(error) {
            console.log("error : " +error.message);
            setExcelMessage(error.message);
            setIsLoading(false);

            setTimeout(() => { 
                setExcelMessage("");
              }, 4000);  
          }
    }

  const handleonchange = name => event => {
        setAvailable(true);
        const value = name === "excelsheet" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name] : value})  
    }

  return (
   <div>
       <Widget title="Add ExcelSheet" disableWidgetMenu>
        { isLoading ? (<Fade in={isLoading}>
                        <CircularProgress color="primary" />
                    </Fade>) : null }
            {excelMessage && excelMessage.includes("Uploaded") ?     
                (<Fade in={excelMessage}>
                    <Typography color="primary" className={classes.errorMessage}>
                        {excelMessage}
                    </Typography>
                </Fade>) : 
            (<Fade in={excelMessage}>
                <Typography color="secondary" className={classes.errorMessage}>
                    {excelMessage}
                </Typography>
            </Fade>)  }

                <p>Please select an Excel file from your computer:</p>
                <form className={classes.root} noValidate autoComplete="off">
                    <input type="file"  onChange={handleonchange('excelsheet')}  name="excelsheet" required/> 
                    <div className={classes.creatingButtonContainer}>
                        <Button
                            onClick={() =>  getExcelSheet() }
                            disabled={
                              available == false
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.createAccountButton}  >
                                Excel Upload
                        </Button>
                    </div>
              </form>
      
       </Widget>
   </div>
  )
}
export default withRouter(UploadExcelSheet);