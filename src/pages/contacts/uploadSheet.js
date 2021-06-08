import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress,
    Fade, Typography, TextField} from "@material-ui/core";

import Widget from "../../components/Widget/Widget";

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

export default function UploadExcelSheet(props) {

    const [error, setError] = useState(false);
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
      const response = await fetch("http://localhost:4000/Sheet",{
            method: "POST",
            headers: {
                    "Authorization" : `Bearer ${isAuth.token}`,
                    "Content-Type": "application/json"
            },
            body: formData
        }).then(res => res.json());

        if(response.message.includes("Failed")) {
              throw new Error(response.message)
           }
          console.log("response :" +response.message);
          setIsLoading(false);
          setExcelMessage(response.message);

          setTimeout(() => { 
              setExcelMessage("");
            }, 4000);  
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

    // const s2ab = async(s) => {
    //       const buf = new ArrayBuffer(s.length);
    //       const view = new Uint8Array(buf);
    //       for (var i=0; i!=s.length; ++i)
    //           view[i] = s.charCodeAt(i) & 0xFF;
    //           return buf;
    //   }

      // document.getElementById('file-object').addEventListener("change",
      //   function(e) {
      //     var files = e.target.files,file;
      //     if (!files || files.length == 0) return;
      //     file = files[0];
      //     var fileReader = new FileReader();
      //     fileReader.onload = function (e) {
      //       var filename = file.name;
      //       var binary = "";
      //       var bytes = new Uint8Array(e.target.result);
      //       var length = bytes.byteLength;
      //       for (var i = 0; i < length; i++) {
      //         binary += String.fromCharCode(bytes[i]);
      //       }
      //     var workbook = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
      //     var wopts = { bookType:'xlsx', bookSST:false, type:'base64' };
      //     var wbout = XLSX.write(workbook,wopts);
      //     var blob = new Blob([s2ab(atob(wbout))],{type: 'application/octet-stream'});
      //     var formData = new FormData();
      //     formData.append('filetoupload', blob, 'test.xlsx');
      //     $.ajax({
      //         url: '/upload',
      //         type: 'POST',
      //         data: formData,
      //         success:function(data){
      //           console.log(data);
      //         },
      //         cache: false,
      //         contentType: false,
      //         processData: false
      //       });
      //     };
      //     fileReader.readAsArrayBuffer(file);
      // });

  return (
   <div>
       <Widget title="Add ExcelSheet" disableWidgetMenu>
        { isLoading ? (<Fade in={isLoading}>
                        <CircularProgress color="secondary" />
                    </Fade>) : null }
            {excelMessage && excelMessage.includes("Ready") ?     
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
                        onClick={() =>
                          getExcelSheet(getExcelSheet)
                            }
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

    // <p>Please select an Excel file from your computer:</p>
    // <input type="file" id="file-object">
    // <div id="result"></div>

//     <TextField
//         id="file"
//         InputProps={{
//           classes: {
//             underline: classes.textFieldUnderline,
//             input: classes.textField,
//           },
//         }}
//         onChange={handleonchange('excelsheet')}
//         // disabled = {response.length > 1}
//         margin="normal"
//         placeholder="ExcelSheet"
//         type="file"
//       />

// </Widget>
