import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    paddingBottom: theme.spacing(3),
  },
  text: {
    marginBottom: theme.spacing(5),
  },
}));
