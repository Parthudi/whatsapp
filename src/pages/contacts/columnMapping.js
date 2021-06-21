import React, {useState, useEffect} from 'react';
import API from "../../config";
// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress,
    Fade, Typography, Table,TableRow, TableHead, TableCell, InputLabel, Select, setCompany,MenuItem } from "@material-ui/core";

import Widget from "../../components/Widget/Widget";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";

function ColumnMapping(props) {

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [excelMessage, setExcelMessage] = useState("");
    const [column, setColumn] = useState([]);     //column names from backend
    const [name, setName] = useState("");
    const [nameColumn, setNameColumn] = useState("");

    const [mobile, setMobile] = useState("");
    const [mobileColumn, setMobileColumn] = useState("");

    const [email, setEmail] = useState("");
    const [emailColumn, setEmailColumn] = useState("");

    const [country, setCountry] = useState("");
    const [countryColumn, setCountryColumn] = useState("");

  
  const classes = useStyles();

  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));
  
  const mappingColumns = async(file) => {
    const response = await fetch(`${API}/mappingsheet`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${isAuth.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({file}) 
        }).then(res => res.json());

        console.log("response : " +response.header);
        setColumn(response.header);
  }

  useEffect(() => {
    console.log("props.filename +" + props.filename);
      mappingColumns(props.filename);
  }, []);

  const handleonChange = (e,i) => {

    console.log("iiiiiii : " +i);

      if(e.target.value === "name") {
        setNameColumn(i);
        setName(e.target.value);
      }
      if(e.target.value === "email") {
        setEmailColumn(i);
        setEmail(e.target.value);
      }
      if(e.target.value === "mobile_number") {
        setMobileColumn(i);
        setMobile(e.target.value);
      }
      if(e.target.value === "country_code") {
        setCountryColumn(i);
        setCountry(e.target.value);
      }
  }

  const uploadData = async() => {
    try{
      setIsLoading(true);

      const Obj = {};
      Obj[`${nameColumn}`] = name;
      Obj[`${emailColumn}`] = email;
      Obj[`${mobileColumn}`] = mobile;
      Obj[`${countryColumn}`] = country;
      Obj["filename"] = props.filename;
      Obj["originalCompanyID"] = isAuth.user.company;

      const response = await fetch(`${API}/upload/data`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${isAuth.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Obj)
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
                        <Select labelId="columns" id="columns"  onChange={ e => handleonChange(e, i) } className={classes.mappingContainer}>
                          <MenuItem value="name" disabled={name.length > 1} > Name </MenuItem>
                          <MenuItem value="mobile_number" disabled={mobile.length > 1} > Mobile Number </MenuItem>
                          <MenuItem value="country_code" disabled={country.length > 1} > Country Code </MenuItem>
                          <MenuItem value="email" disabled={email.length > 1} > Email </MenuItem>
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
