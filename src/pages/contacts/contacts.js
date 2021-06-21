import React,{useEffect, useState} from "react";
import API from "../../config";
import { Grid, Button, CircularProgress,
  Fade,Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}))

const Contacts = (props) => {

const classes = useStyles();

const [isLoading, setIsLoading] = useState(false);
const [dataa, setDataa] = useState([]);

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const usersData = () => {
    setIsLoading(true);
     const userCompanyID = isAuth.user.role === "user" ? isAuth.user.company :"admin" ;
     fetch(`${API}/contacts`,{
        method: "POST",
        headers: {
        "Authorization" : `Bearer ${isAuth.token}`,
        "Content-Type": "application/json"
          },
        body: JSON.stringify({userCompanyID})
      }).then(res => res.json()).then(resp => (setDataa(resp.contact)))
    setIsLoading(false);
  }

useEffect(() => { 
    usersData();
      }, []);

      console.log(dataa);

      let datatableData = [];
      dataa.forEach(element => {
        datatableData.push(
          [`${element.name}` ,`${element.email}`,  `${element.mobile_number}` , `${element.country_code}`] 
          )
        }) 
      const columns = ["Name" , "Email" , "Mobile Number" ,"Country Code"]; 
    
    const addContactHandler = () => {
          props.history.push("/app/contact/register");
      }

    const addGroupHandler = () => {
        props.history.push("/app/group/register")
      }

  return (
    <>
      <PageTitle title="Contacts" />
      { isLoading ? (<Fade in={isLoading}>
                        <CircularProgress color="secondary" />
                    </Fade>) : null }
      <Button
          onClick={addContactHandler}
          variant="contained"
          color="primary"
          size="large" >
          Add Contact 
      </Button>
      <Button
          onClick={addGroupHandler}
          variant="contained"
          color="Secondary"
          size="large" >
          Create Group 
      </Button>

      <Button
          onClick={() => props.history.push("/app/contacts/addexcel")}
          variant="contained"
          style={{float:"right"}}
          color="inherit"
          size="large" >
            Upload Contacts
        </Button>
     
     <br/><br/><br/>
        <Grid item xs={12}>
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
        <br/>
       
    
    </>
  );
}


export default withRouter(Contacts);