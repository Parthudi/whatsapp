import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress,
    Fade, Typography, Table,TableRow, TableHead, TableCell, InputLabel, Select, setCompany,MenuItem } from "@material-ui/core";

import Widget from "../../components/Widget/Widget";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";

function ColumnMapping(props) {

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [excelMessage, setExcelMessage] = useState("");
    const [column, setColumn] = useState([]);
    const [correctcolumns , setCorrectColumns] = useState([]);
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [country, setCountry] = useState("");

    const classes = useStyles();

  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));
  
  const mappingColumns = async() => {
    const response = await fetch("http://localhost:4000/mappingsheet",{
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${isAuth.token}`,
            }
        }).then(res => res.json());

        console.log("response : " +response.header);
        setColumn(response.header);
  }

  useEffect(() => {
      mappingColumns();
  }, []);

  const handleonChange = (e,i) => {
      if(i === 0) {
        setEmail(e.target.value);
      }
      if(i === 1) {
        setMobile(e.target.value);
      }
      if(i === 2) {
        setCountry(e.target.value);
      }
      setCorrectColumns(e.target.value);
  }

  const uploadData = async() => {
    try{
      setIsLoading(true);
      let newColumn0 = column["0"] ;
      let newColumn1 = column["1"] ;
      let newColumn2 = column["2"] ;
      
      const response = await fetch("http://localhost:4000/upload/data",{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${isAuth.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({newColumn0 : email, newColumn1 : mobile , newColumn2 : country, originalCompanyID : isAuth.user.company})
        }).then(res => res.json());

        console.log("uploading response : " +JSON.stringify(response));
        if(response && response.message.includes("invalid")) {
              throw new Error(response.message)
            }
            setIsLoading(false);
            setExcelMessage(response.message);

            setMobile("");
            setEmail("");
            setCountry("")
            setTimeout(() => { 
                setExcelMessage("");
              }, 4000);  
            
            props.history.push("/app/contacts");
      }catch(error) {
         console.log(error);
          setIsLoading(false);
          setExcelMessage(error.message)
          setTimeout(() => { 
              setExcelMessage("");
            }, 4000);  
        }
  }

  return (
   <div>
       <Widget title="Column Mapping" disableWidgetMenu>
        { isLoading ? (<Fade in={isLoading}>
                        <CircularProgress color="secondary" />
                    </Fade>) : null }
            {excelMessage && excelMessage.includes("Saved") ?     
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

            <br/><br/><br/>

          
            <Table>
                <TableRow>
                      <TableCell>
                          <b>Rows</b>
                      </TableCell>
                      <TableCell>
                        <b>Column Mapping</b>
                      </TableCell>
                </TableRow>
                
              { column && column.map((col, i) => { 
                  return ( 
                    <TableRow> 
                      <TableCell key={i}>
                      { col }  :  
                      </TableCell>
                   
                      <TableCell key={i}>
                        <Select labelId="columns" id="columns" value={correctcolumns[i]}  onChange={ e => handleonChange(e, i) } className={classes.mappingdropdown}>
                          <MenuItem value="email" > Email </MenuItem>
                          <MenuItem value="mobile_number" > Mobile_Number </MenuItem>
                          <MenuItem value="country_code" > Country_Code </MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    )})}
                
             </Table> 

             <div className={classes.creatingButtonContainer}>
                        <Button
                            onClick={() => uploadData() }
                            disabled={
                              email.length === 0 ||
                              mobile.length === 0 ||
                              country.length === 0 
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.createAccountButton}  >
                               Map
                        </Button>
                    </div>
       </Widget>
   </div>
  )
}

export default withRouter(ColumnMapping);


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
