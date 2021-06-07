import React,{useEffect, useState} from "react";
import { Grid, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {
  Edit as EditIcon,
} from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import {isAuthenticated} from "../../context/UserContext"
// data
import mock from "../dashboard/mock";
import { propTypes } from "qrcode.react";

// const datatableData = [
//   [ "Vistaura", "Joe James", "parth@gmail.com",  "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "John Walsh", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Bob Herm", "parth@gmail.com", "User", "16:25", "19:35",  <EditIcon/>],
//   [ "Vistaura", "James Houston", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Prabhakar Linwood", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Kaui Ignace", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Esperanza Susanne", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Christian Birgitte", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Meral Elias", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Deep Pau", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Sebastiana Hani", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Marciano Oihana", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Brigid Ankur", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Anna Siranush", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Avram Sylva", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/>],
//   [ "Vistaura", "Serafima Babatunde", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
//   [ "Vistaura", "Gaston Festus", "parth@gmail.com", "User", "16:25", "19:35", <EditIcon/> ],
// ];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const Tables = (props) => {

const [dataa, setDataa] = useState([]);
const [companyDataa, setCompanyDataa] = useState([]);
const {token} = isAuthenticated();

  const usersData = () => {
     fetch("http://localhost:4000/users",{
        method: "GET",
        headers: {
        "Authorization" : `Bearer ${token}`
          }
      }).then(res => res.json()).then(resp => (setDataa(resp.user), setCompanyDataa(resp.company) ))
  }

useEffect(() => { 
    usersData();
      }, []);

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const classes = useStyles();
      console.log(dataa);

      let datatableData = [];
      dataa.forEach(element => {
        datatableData.push([
          [`${element.company}`], [`${element.name}`], [`${element.email}`], [`${element.role}`] ,   [`${element.createdAt}`], [`${element.modifiedAt}`], [ <EditIcon/> ]
          ]) }) 
      const columns = ["Company" , "Name", "Email", "Role", "Created At", "Modified At", "Edit"]; 
      
      const addUserHandler = () => {
          props.history.push("/app/user/register");
      }

      const addCompanyHandler = () => {
        props.history.push("/app/company/register");
    }
  return (
    <>
      <PageTitle title="Users" />
      <Button
          onClick={addUserHandler}
          variant="contained"
          color="primary"
          size="large" >
          Add User 
      </Button>
     {isAuth.user.role === "admin" ?  <Button
          onClick={addCompanyHandler}
          variant="contained"
          color="secondary"
          size="large" >
          Add Company 
      </Button> : null }
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Users List"
            data={datatableData}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Widget title="Users List Sent By Email" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}


export default Tables;