import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'
import { signOut, useUserDispatch } from "../../context/UserContext";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Message from "../../pages/message/message";
import Notifications from "../../pages/notifications";
import Contacts from "../../pages/contacts/contacts"
import Maps from "../../pages/maps";
import Users from "../../pages/users/Users";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Profile from "../../pages/profile/profile"
import UserRegister from "../../pages/users/UserRegister"
import CompanyRegister from "../../pages/users/CompanyRegister"
import AddContacts from "../../pages/contacts/addContact"
import CreateGroups from "../../pages/contacts/createGroups"
import PersonalMessage from "../../pages/message/personalMessage"
import AllContacts from "../../pages/message/allContactMessage"
import GroupMessage from "../../pages/message/groupMessage"

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var userDispatch = useUserDispatch();

const isAuth =  JSON.parse(localStorage.getItem('TOKEN'));

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/message" exact component={Message} />
              <Route path="/app/message/personalmessage" exact component={PersonalMessage} />
              <Route path="/app/message/groupmessage" exact component={GroupMessage} />
              <Route path="/app/message/allcontacts" exact component={AllContacts} />

              <Route path="/app/users" component={Users} />
              <Route path="/app/user/register" component={UserRegister} />
              {isAuth.user.role === "admin" ? <Route path="/app/company/register" component={CompanyRegister} /> : null }
              <Route path="/app/contact/register" component={AddContacts} />
              <Route path="/app/group/register" component={CreateGroups} />
              <Route path="/app/notifications" component={Notifications} />
              <Route path="/app/logout" render={() => signOut(userDispatch, props.history) } />
              <Route path="/app/user/delete" render={() => <h1> User Deleted </h1>} />
              <Route path="/app/contacts" component={Contacts} />
              <Route path="/app/profile" component={Profile} />

              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
