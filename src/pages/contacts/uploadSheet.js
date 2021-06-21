import React, {useState, useEffect} from 'react';
import API from "../../config";
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress,
    Fade, Typography, InputLabel,Select,MenuItem} from "@material-ui/core";
import ColumnMapping from "./columnMapping"
import Widget from "../../components/Widget/Widget";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";

const UploadExcelSheet = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [excelMessage, setExcelMessage] = useState("");
    const [values, setValues] = useState({formData : ""});
    const [available ,setAvailable] = useState(false);
    const [filename, setFileName] = useState("");
    const [allcompany, setAllCompany] = useState([])
    const [company, setCompany] = useState([])

    const { formData } = values;

  const classes = useStyles();

  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const companies = async() => {
    const company = await fetch(`${API}/companies`,{
                    method: "GET",
                    headers: {
                          "Authorization": `${isAuth.token}`,
                          "Content-Type": "application/json"
                  }
                }).then(response => response.json());
  
      setAllCompany(company);
      setIsLoading(false);
  }

  useEffect(() => {
    companies();
    return (setValues({ formData : new FormData() }) );
}, []);

  const getExcelSheet = async() => {
      try{
        setIsLoading(true);
        const response = await fetch(`${API}/download/excel`,{
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
              setFileName(response.fileName);
              setTimeout(() => { 
                  setExcelMessage("");
                }, 4000);  
                console.log("upload sheet : " +filename);
              // props.history.push("/app/contacts/addexcel/mapping");
              
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
  {filename.length === 0 ?  
    <div>
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

              <form className={classes.root} noValidate autoComplete="off">

<br/>
              {isAuth.user.role === "admin" ? 
                  <div >
                    <InputLabel id="company"> Company </InputLabel>
                    <Select labelId="company" id="company"  onChange={e => setCompany(e.target.value)} className={classes.dropContainer}>
                        {allcompany && allcompany.map((comp, i) => {
                          return <MenuItem value={comp._id} key={i}> {comp.name} </MenuItem>
                        })}
                    </Select> 
                </div>
                  :
                  null
                } 
<br/>

                  <p>Please select an Excel file from your computer:</p>

                    <input type="file"  onChange={handleonchange('excelsheet')}  name="excelsheet" required/> 
                    <div className={classes.creatingButtonContainer}>
                        <Button
                            onClick={() =>  getExcelSheet() }
                            disabled={
                              available == false ||
                              company === 0
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
          </div>
                  :
              <div className={classes.mapp}>
                  <br/>

                {filename.length > 1 ? <ColumnMapping filename={filename} company={company}/>  : null }
             </div> }

       </Widget>
   </div>
  )
}
export default withRouter(UploadExcelSheet);