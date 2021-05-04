import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["Joe James", "7787465435", "Yonkers"],
  ["John Walsh", "7787465435", "Hartford"],
  ["Bob Herm", "7787465435", "Tampa"],
  ["James Houston", "7787465435", "Dallas"],
  ["Prabhakar Linwood", "7787465435", "Hartford"],
  ["Kaui Ignace", "7787465435", "Yonkers"],
  ["Esperanza Susanne", "7787465435", "Hartford"],
  ["Christian Birgitte", "7787465435", "Tampa"],
  ["Meral Elias", "7787465435", "Hartford"],
  ["Deep Pau", "7787465435", "Yonkers"],
  ["Sebastiana Hani", "7787465435", "Dallas"],
  ["Marciano Oihana", "7787465435", "Yonkers"],
  ["Brigid Ankur", "7787465435", "Dallas"],
  ["Anna Siranush", "7787465435", "Yonkers"],
  ["Avram Sylva", "7787465435", "Hartford"],
  ["Serafima Babatunde", "7787465435", "Tampa"],
  ["Gaston Festus", "7787465435", "Tampa"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function Tables() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Users List Sent By Contact"
            data={datatableData}
            columns={["Name", "Contact/Email", "Status"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget title="Users List Sent By Email" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
