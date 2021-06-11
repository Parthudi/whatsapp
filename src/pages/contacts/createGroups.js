import React, { useState, useEffect} from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,Fab 
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";

import { GroupRegistration } from "../../context/UserContext";

// styles
import useStyles from "./styles";
// context

function CreateGroups(props) {
  var classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [contacts, setContacts] = useState("");
  const [name, setName] = useState("");
  const [dataa, setDataa] = useState([]);
  const [mobilenumbers, setMobileNumbers] = useState([]);
  const [disablebutton , setDisablebutton] = useState([]);

  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const usersData = () => {
    const userCompanyID = isAuth.user.role === "user" ? isAuth.user.company :"admin" ;;
    fetch("http://localhost:4000/contacts",{
       method: "POST",
       headers: {
       "Authorization" : `Bearer ${isAuth.token}`,
       "Content-Type": "application/json"
         },
       body: JSON.stringify({userCompanyID})
     }).then(res => res.json()).then(resp => (setDataa(resp.contact)))
 }

  useEffect(() => { 
    usersData();
      }, []);

    let datatableData = [];

    const addUserToGroup = async(i) => {
        datatableData.splice(i,1);
        console.log(datatableData);

        let disabledButton = [ ...disablebutton];
        disabledButton.push(i);
        setDisablebutton(disabledButton)
        console.log("disabledButton : " +disabledButton);

        let mobileNumbersArr = [...mobilenumbers];
        mobileNumbersArr.push(dataa[i].country_code+dataa[i].mobile_number);
        setMobileNumbers(mobileNumbersArr)
        console.log("mobileNumbersArr : " +mobileNumbersArr);
    }
  
    const createGroupHandler = async(name) => {
          setIsLoading(true);
          console.log("mobilenumbers + " +mobilenumbers);
    
          await GroupRegistration(mobilenumbers, name, isAuth.user._id, isAuth.token).then(response => {
                 if(response.error) {
                     setIsLoading(false);
                     setError(true);
                 }else{
                     setIsLoading(false);
                     setError(false);
                     setName("");
                 }
          })
    }

     dataa.forEach((element,i)=> {
       console.log("i : "+ i);
       datatableData.push(
         [                                                      
          <Fab size="small" onClick={() => addUserToGroup(i)} key={i} disabled={disablebutton.includes(i)} color="primary"  aria-label="add">
              <AddIcon />
          </Fab> ,  `${element.email}`,  `${element.mobile_number}` , `${element.country_code}`,] 
         )
       }) 
     const columns = ["Add" , "Email" , "Mobile_Number" ,"Country_Code" ]; 

     const contactChangedHandler = () => {
       console.log("contacts changed : ");
     }
     
  return (
    <React.Fragment>
          
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>     

        {/* ///////////////////Signup Group///////////////////// */}
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                 Group
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
 
              <TextField
                id="contact"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={mobilenumbers}
                // onChange={e => contactChangedHandler}
                margin="normal"
                placeholder="Contacts"
                type="text"
                fullWidth
              />

              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={name}
                onChange={e => setName(e.target.value)}
                margin="normal"
                placeholder="Group Name"
                type="text"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      createGroupHandler(
                            name
                           )
                        }
                    disabled={
                      mobilenumbers.length === 0 ||
                      name.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}  >
                    Create
                  </Button>
                )}
              </div>
            
            </React.Fragment>

        </div> <br></br>
        {/* <Typography color="primary" className={classes.copyright}>
        © 2020-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://www.vistaura.com/" rel="noopener noreferrer" target="_blank"> Vistaura </a>, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>

    <Grid item xs={12} md={12} className={classes.dataTable}>
                  <MUIDataTable
                      title="All Contacts"
                      data={datatableData}
                      columns={columns}
                      options={{
                          filter: true,
                          print: false,
                          viewColumns: false,
                          selectableRows: 'none',
                        }}
                      />
                    </Grid>
    </React.Fragment>
  );
}

export default withRouter(CreateGroups);
