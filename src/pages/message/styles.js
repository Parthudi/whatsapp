import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    // ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
      border: "1px dashed",
      borderColor: theme.palette.primary.main,
      // padding: theme.spacing(2),
      paddingTop: theme.spacing(2),
      // paddingRight: theme.spacing(2),
      // paddingLeft: theme.spacing(8),
      paddingBottom: theme.spacing(2),
    },
   
  // },
  text: {
    marginBottom: theme.spacing(5),
  },
  buttonBackground: {
    height: "100px"
  },
  groupDownButton:{
    // ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
      width : "50%",
    // },
    
  },
  shortDropDown:{
    width : "460px"
  },
  margin: {
    margin: theme.spacing(1),
  },
  backgroundSetting: {
    marginTop: theme.spacing(5),
    height: "50%",
    textAlign:"center",
  }, 
  select: {
    textAlign: "center",
    padding: "8px",
      width: '90%',
    '&:before': {
        borderColor: "red",
    },
    '&:after': {
        borderColor: "blue",
    }
},
borderStyle:{
  "border-top": "2px solid grey" ,
  "border-right": "1px solid grey" ,
  "border-left": "2px solid grey" ,
  "border-top": "2px solid grey" ,
  "border-radius": "10px"
},
icon: {
    fill: "grey",
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

