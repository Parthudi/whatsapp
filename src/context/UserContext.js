import React, {useState} from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
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
  const error = "Fill the correct details only!";
  var [state, dispatch] = React.useReducer(userReducer, {
      isAuthenticated: !!localStorage.getItem("TOKEN"),
      error: !!error
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

async function SignupUser(dispatch, name, email ,password, role, company, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if ( !!name && !!email && !!password && !!role ) {
       await fetch(`http://localhost:4000/user/signup`,{
              method: "POST",
              headers: {
                        Accept:  "application/json",
                      "Content-Type": "application/json"
              },
              body: JSON.stringify({name,email,password,role, company})
            }).then(response => response.json());

          setIsLoading(false);
          history.push("/login");
  }else{
          dispatch({ type: 'REGISTER_FAILURE' });
          setError(true)
          setIsLoading(false) 
  }
}

async function LoginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  try{
      const data = await fetch(`http://localhost:4000/user/login`,{
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
            setError(false)
            setIsLoading(false)
          // setVisitsUser(VisitsUser +1);
          // console.log("set users : " +VisitsUser);
            dispatch({ type: 'LOGIN_SUCCESS' })
              
            history.push('/app/dashboard')
        return(
          setError(true),
          setIsLoading(false) 
        )
      }     
  }catch(error) {
    console.log("catch");
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false) 
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("TOKEN");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
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

async function messageUser(contact, message, token) {
  try{
    const response = await fetch("http://localhost:4000/user/message", {
            method: "POST",
            headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
              },
            body: JSON.stringify({contact: contact, message: message})
          }).then(response => response.json()) ;

          return response;
    }catch(error){
        console.log(error);
  } 
}


export { UserProvider, useUserState, useUserDispatch,SignupUser, LoginUser, signOut, messageUser };
