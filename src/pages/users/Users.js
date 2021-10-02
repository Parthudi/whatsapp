import React,{useEffect, useState} from "react";
import API from "../../config";
import { Grid, Button, Fab} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {Route} from "react-router-dom";
// import {
//   Edit as EditIcon,
// } from "@material-ui/icons";

import { withRouter } from "react-router-dom";

import  Edit  from "@material-ui/icons/Edit";
import useStyles from "./styles";


// components
import PageTitle from "../../components/PageTitle/PageTitle";
import EditUser from "./EditUser"
import { Fragment } from "react";

const Tables = (props) => {

const [dataa, setDataa] = useState([]);
const [companyDataa, setCompanyDataa] = useState("");
const [edituser , setEditUser] = useState([]);
const [showedit, setShowEdit] = useState(false);

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

const classes = useStyles();

  const usersData = async() => {
    let userCompanyID = "";
    if(isAuth.user.role === "user"){
       userCompanyID = isAuth.user.company;
    }else{
      userCompanyID = "admin";
    }
     fetch(`${API}/users`,{
        method: "POST",
        headers: {
        "Authorization" : `Bearer ${isAuth.token}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({userCompanyID})
      }).then(res => res.json()).then(resp => (setDataa(resp.onlyUsers) ))
      console.log("companyDataa + " +JSON.stringify(companyDataa));
  }

useEffect(() => { 
    usersData();
      }, []);

    const editUsers = (i) => {
        console.log(i);

        console.log(dataa[i]);
        setEditUser(dataa[i]);
        setShowEdit(true);
    }

      console.log(dataa);

      let datatableData = [];
      let columns = [];
      if(isAuth.user.role === "user") {
        dataa.forEach((element,i) => {
          datatableData.push([                 
           [`${element.name}`], [`${element.email}`], [`${element.role}`] ,   [`${moment(element.createdAt).format('DD-MM-YYYY, h:mm:ss')}`], [`${moment(element.modifiedAt).format('DD-MM-YYYY, h:mm:ss')}`], 
              [ <Fab size="small"  key={i}  aria-label="edit">
                  <Edit /> 
                </Fab>   ]
            ]) }) 
        columns = ["Name", "Email", "Role", "Created At", "Modified At", "Edit"]; 
      }else{
        dataa.forEach((element,i) => {
          datatableData.push([
           [`${element.company.name}`], [`${element.name}`], [`${element.email}`], [`${element.role}`] ,  [`${moment(element.createdAt).format('DD-MM-YYYY, h:mm:ss')}`], [`${moment(element.modifiedAt).format('DD-MM-YYYY, h:mm:ss')}`], 
           [ <Fab size="small" onClick={() => editUsers(i)} key={i}    aria-label="edit">
              <Edit /> 
            </Fab>   ]
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
    {!showedit ? 
      <React.Fragment>
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
                selectableRows:false,
              }}
            />
          </Grid>
        </Grid>
        
        </React.Fragment> 
              :

          <EditUser userToEdit={edituser} />  }

        {/* <Grid item xs={12}>
          <Widget title="Users List Sent By Email" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
    </>
  );
}


export default withRouter(Tables);