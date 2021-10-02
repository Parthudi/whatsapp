import React, { useState, useEffect} from "react";
import API from "../../config";
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
import SubtractIcon from "@material-ui/icons/Remove"
import { GroupRegistration } from "../../context/UserContext";

// styles
import useStyles from "./styles";
// context

function CreateGroups(props) {
  var classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState("");
  const [name, setName] = useState("");
  const [dataa, setDataa] = useState([]);
  const [mobilenumbers, setMobileNumbers] = useState([]);
  const [disablebutton , setDisablebutton] = useState([]);
  const [userid, setUserId] = useState([]);

  const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const usersData = () => {
    const userCompanyID = isAuth.user.role === "user" ? isAuth.user.company :"admin" ;;
    fetch(`${API}/contacts`,{
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

        let idOfSelectedUsers = [ ...userid];
        idOfSelectedUsers.push(dataa[i]._id);
        setUserId(idOfSelectedUsers)

        let disabledButton = [ ...disablebutton];
        disabledButton.push(dataa[i].name);
        setDisablebutton(disabledButton); //disable add button;
        console.log("disabledButton while adding : " +disabledButton);

        let mobileNumbersArr = [...mobilenumbers];
        mobileNumbersArr.push(dataa[i].name);
        setMobileNumbers(mobileNumbersArr)
        console.log("mobileNumbersArr : " +mobileNumbersArr.length);
    }

    const removeUserFromGroup = async(i) => {
      console.log("remove index : " +i);
      console.log("disablebutton length : + " +disablebutton.length);

      const findingElement = dataa[i].name;
      console.log("findingElement : " +findingElement);

    const newArr = mobilenumbers.filter((mobile) => {
              console.log("filter mobile : " +mobile);
              return findingElement !== mobile
          })
        console.log("newArr : " +newArr);
        setMobileNumbers(newArr);
        setDisablebutton(newArr);
    }
  
    const createGroupHandler = async(name) => {
          setIsLoading(true);
    
          await GroupRegistration(userid, name, isAuth.user._id, isAuth.token).then(response => {
                 if(response.error) {
                     setIsLoading(false);
                     setError(true);
                     setMessage(response.error);
                 }else{
                     setIsLoading(false);
                     setError(false);
                     setName("");
                     setMobileNumbers("");
                     setDisablebutton("");
                     setMessage(response.message);
                 }
                 setTimeout(() => { 
                    setMessage("");
                  }, 3000);
          })
    }

     dataa.forEach((element,i)=> {
       console.log("i : "+ i);
       datatableData.push(
         [                                                      
          <Fab size="small" onClick={() => addUserToGroup(i)} key={i} disabled={disablebutton.includes(element.name)} color="primary"  aria-label="add">
              <AddIcon />
          </Fab> ,
          <Fab size="small" onClick={() => removeUserFromGroup(i)} key={i} disabled={!mobilenumbers.includes(element.name)}  color="secondary"  aria-label="remove">
            <SubtractIcon />
          </Fab>, `${element.name}` , `${element.email}`,  `${element.mobile_number}` , `${element.country_code}`,] 
         )
       }) 
     const columns = ["Add" , "Remove", "Name", "Email" , "Mobile Number" ,"Country Code" ]; 

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

              {message && message.includes("Created") ?
                   <Fade in={message}>
                    <Typography color="primary" className={classes.errorMessage}>
                        {message}
                    </Typography>
                 </Fade> : (<Fade in={message}>
                    <Typography color="secondary" className={classes.errorMessage}>
                        {message}
                    </Typography>
                 </Fade>)  }
             
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
                autoComplete="off"
                fullWidth
              />

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
                autoComplete="off"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
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
              </div>

              { isLoading ? (<Fade in={isLoading} style={{marginLeft:"50px"}} >
                            <CircularProgress color="secondary" />
                        </Fade>) : null }
            
            </React.Fragment>

        </div> <br></br>
      
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
