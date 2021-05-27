import React from "react";
import { Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  Edit as EditIcon,
} from "@material-ui/icons";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/contactsTable/contactsTable";

// data
import mock from "../dashboard/mock";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Contacts" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="All Contacts" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.contacts} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
