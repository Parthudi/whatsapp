import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.action.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    paddingBottom: theme.spacing(3),
  },
  sizeOfFont: {
     fontSize : "200px",
     padding: theme.spacing(2),
  },
  text: {
    marginBottom: theme.spacing(5),
  },
}));
