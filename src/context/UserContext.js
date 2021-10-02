import React, {useState} from "react";
import API from "../config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  console.log("action : " +action.type);
  switch (action.type) {
    case "REGISTER_FAILURE":
      return { ...state, error: true, isAuthenticated: false};
    case "SIGN_OUT_SUCCESS":
      return { ...state,  error: false, isAuthenticated: false };
    case "LOGIN_SUCCESS":
      return { ...state, error: false,  isAuthenticated: true };
    case "LOGIN_FAILURE":
      return { ...state, error: true ,  isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const err = "please fill the correct details only !!!";
  
  var [state, dispatch] = React.useReducer(userReducer, {
      error: !! `${err}`,
      isAuthenticated: !!localStorage.getItem("TOKEN")
    });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

// ###########################################################

async function SignupCompany(name, address1 ,address2, state, city, pincode, gstin, userID) {
  try {
      const response = await fetch(`${API}/company/signup`,{
              method: "POST",
              headers: {
                        Accept:  "application/json",
                      "Content-Type": "application/json"
              },
              body: JSON.stringify({name,address1,address2,state,city,pincode,gstin,createdBy:userID})
            }).then(response => response.json());

            return response;

  }catch(error){
          console.log(error.message)
          return {error : error.message};
  }
}

async function SignupUser(name, email, password, role, company, userID) {
    try{
      const response = await fetch(`${API}/user/signup`,{
              method: "POST",
              headers: {
                        Accept:  "application/json",
                      "Content-Type": "application/json"
              },
              body: JSON.stringify({name, email, password, role, company, userID})
            }).then(response => response.json());
            return response;
        } catch(error) {
          console.log(error.message);
          return {error : error.message};
        }
      }

async function LoginUser(dispatch, email, password, history, setIsLoading, setError) {
  try{
    // console.log("REACT_APP_API_URL + " +process.env.REACT_APP_API_URL);
    // // console.log("REACT_APP_API_URI  + " +process.env.REACT_APP_API_URL );
    // console.log("API + " +APII);
      const data = await fetch(`${API}/user/login`,{
                      method: "POST",
                      headers: {
                                Accept:  "application/json",
                              "Content-Type": "application/json"
                      },
                      body: JSON.stringify({email, password})
                    }).then(response => response.json()) ;

            if(data.error){
              console.log(":errorr");
              throw new Error();
            }else {
               localStorage.setItem('TOKEN', JSON.stringify(data));
              dispatch({ type: 'LOGIN_SUCCESS' })
              return data;
      }     
  }catch(error) {
    console.log("catch");
    dispatch({ type: "LOGIN_FAILURE" });
    return ({error: true }) ;
  }
}

const signOut = async(dispatch, history, token, userID) => {

  const response = await fetch(`${API}/user/logout/${userID}`,{
                    method: "POST",
                    headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                    },
                  }).then(response => response.json()) ;

  localStorage.removeItem("TOKEN");

  dispatch({ type: "SIGN_OUT_SUCCESS" });
  window.location.reload();
}

export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
      return false
    }
   if(localStorage.getItem("TOKEN")) {
       return JSON.parse(localStorage.getItem('TOKEN'))
       } else{
           return false
       }
} 

export const GroupRegistration = async(contacts, name, user, token) => {
  try{
    const response = await fetch(`${API}/group/signup`,{
          method: "POST",
          headers: {
                  "Authorization" : `${token}`,
                  "Content-Type": "application/json"
          },
          body: JSON.stringify({user, name, contacts})
        }).then(response => response.json());

        return response;
  }catch(error) {
    console.log(error.message);
    return {error : error.message}
  }
}

export const messageGroup = async(group, message, token, companyID, userID) => {
  try{
    const response = await fetch(`${API}/group/message`,{
          method: "POST",
          headers: {
                  "Authorization" : `Bearer ${token}`,
                  "Content-Type": "application/json"
          },
          body: JSON.stringify({group, message, companyID, userID})
        }).then(res => res.json());

        console.log("response : " +response.message);
        return response.message;
  }catch(error) {
    console.log(error.message);
    return {error : error.message}
  }
}

export const messageAllUsers = async(message, company_id, token, companyID, userID) => {
  try{
    const response = await fetch(`${API}/contact/message`,{
          method: "POST",
          headers: {
                  "Authorization" : `Bearer ${token}`,
                  "Content-Type": "application/json"
          },
          body: JSON.stringify({company_id, message, companyID, userID})
        }).then(res => res.json());

        console.log("response : " +response.message);
        return response.message;
  }catch(error) {
    console.log(error.message);
    return {error : error.message}
  }
}

async function messageUser(countrycode, contact, message, token, companyID, userID) {
  try{
    const response = await fetch(`${API}/user/message`, {
            method: "POST",
            headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
              },
            body: JSON.stringify({countrycode, contact, message: message, companyID, userID})
          }).then(res => res.json()) ;

          console.log("response at messageUser : " +response.message);

          return response.message;
    }catch(error){
        console.log(error);
  } 
}




export { UserProvider, useUserState, useUserDispatch,SignupUser,SignupCompany, LoginUser, signOut, messageUser };
