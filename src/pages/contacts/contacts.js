import React,{useEffect, useState} from "react";
import { Grid, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { withRouter } from "react-router-dom";
import {
  Edit as EditIcon,
} from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
// import Widget from "../../components/Widget/Widget";
// import Table from "../dashboard/components/Table/Table";
import {isAuthenticated} from "../../context/UserContext"
// // data
// import mock from "../dashboard/mock";
// import { propTypes } from "qrcode.react";

const datatableData = [
  [ "Vistaura", "Joe James", "parth@gmail.com",  "User", "16:25", "19:35" ],
  [ "Vistaura", "John Walsh", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Bob Herm", "parth@gmail.com", "User", "16:25", "19:35"],
  [ "Vistaura", "James Houston", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Prabhakar Linwood", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Kaui Ignace", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Esperanza Susanne", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Christian Birgitte", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Meral Elias", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Deep Pau", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Sebastiana Hani", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Marciano Oihana", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Brigid Ankur", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Anna Siranush", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Avram Sylva", "parth@gmail.com", "User", "16:25", "19:35"],
  [ "Vistaura", "Serafima Babatunde", "parth@gmail.com", "User", "16:25", "19:35" ],
  [ "Vistaura", "Gaston Festus", "parth@gmail.com", "User", "16:25", "19:35" ],
];


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const Contacts = (props) => {

const [dataa, setDataa] = useState([]);
const [companyDataa, setCompanyDataa] = useState([]);
const {token} = isAuthenticated();

  const usersData = () => {
     fetch("http://localhost:4000/contacts",{
        method: "GET",
        headers: {
        "Authorization" : `Bearer ${token}`
          }
      }).then(res => res.json()).then(resp => (setDataa(resp.contact)))
  }

useEffect(() => { 
    usersData();
      }, []);

      const classes = useStyles();
      console.log(dataa);

      let datatableData = [];
      dataa.forEach(element => {
        datatableData.push(
          [`${element.company}` , `${element.email}`,  `${element.mobile_number}` , `${element.country_code}`] 
          )
        }) 
      const columns = ["Company_ID", "Email" , "Mobile_Number" ,"Country_Code"]; 
    
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
    </>
  );
}


export default withRouter(Contacts);