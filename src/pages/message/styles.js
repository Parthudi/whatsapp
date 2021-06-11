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
  buttonBackground: {
    height: "100px"
  },
  groupDownButton:{
    width : "880px"
  },
  margin: {
    margin: theme.spacing(1),
  },
  backgroundSetting: {
    height:"50%", 
    textAlign:"center",
  },
  button: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  }  ,
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: "none",
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
