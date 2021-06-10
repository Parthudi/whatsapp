import React,{useEffect, useState} from "react";
import { Grid, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {
  Edit as EditIcon,
} from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle/PageTitle";


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const Tables = (props) => {

const [dataa, setDataa] = useState([]);
const [companyDataa, setCompanyDataa] = useState("");

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  const usersData = () => {
    let userCompanyID = "";
    if(isAuth.user.role === "user"){
       userCompanyID = isAuth.user.company;
    }else{
      userCompanyID = "admin";
    }
    
     fetch("http://localhost:4000/users",{
        method: "POST",
        headers: {
        "Authorization" : `Bearer ${isAuth.token}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({userCompanyID})
      }).then(res => res.json()).then(resp => (setDataa(resp.user), setCompanyDataa(resp.companyName) ))
  }

useEffect(() => { 
    usersData();
      }, []);

      console.log(dataa);

      let datatableData = [];
      let columns = [];
      if(isAuth.user.role === "user") {
        dataa.forEach(element => {
          datatableData.push([
           [`${element.name}`], [`${element.email}`], [`${element.role}`] ,   [`${element.createdAt}`], [`${element.modifiedAt}`], [ <EditIcon/> ]
            ]) }) 
        columns = ["Name", "Email", "Role", "Created At", "Modified At", "Edit"]; 
      }else{
        dataa.forEach(element => {
          datatableData.push([
           [`${companyDataa}`], [`${element.name}`], [`${element.email}`], [`${element.role}`] ,   [`${element.createdAt}`], [`${element.modifiedAt}`], [ <EditIcon/> ]
            ]) }) 
        columns = ["Company", "Name", "Email", "Role", "Created At", "Modified At", "Edit"]; 
      }
  
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

      <br/><br/>
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