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
import Message from "../../pages/message/Message";
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

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var userDispatch = useUserDispatch();

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
              <Route path="/app/message" component={Message} />
              <Route path="/app/users" component={Users} />
              <Route path="/app/user/register" component={UserRegister} />
              <Route path="/app/company/register" component={CompanyRegister} />
              <Route path="/app/contact/register" component={AddContacts} />
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
              <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
