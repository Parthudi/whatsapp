import React,{useEffect, useState} from "react";
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

const [dataa, setDataa] = useState([]);

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const usersData = () => {
     const userCompanyID = isAuth.user.company;
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

      console.log(dataa);

      let datatableData = [];
      dataa.forEach(element => {
        datatableData.push(
          [`${element.email}`,  `${element.mobile_number}` , `${element.country_code}`] 
          )
        }) 
      const columns = ["Email" , "Mobile_Number" ,"Country_Code"]; 
    
    const addContactHandler = () => {
          props.history.push("/app/contact/register");
      }

    const addGroupHandler = () => {
        props.history.push("/app/group/register")
      }

   
  return (
    <>
      <PageTitle title="Contacts" />
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
        <Button
          onClick={() => props.history.push("/app/contacts/addexcel")}
          variant="contained"
          color="inherit"
          size="large" >
            Upload Contacts
        </Button>
    
    </>
  );
}


export default withRouter(Contacts);