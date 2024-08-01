// LoginContext.js
import React, { createContext, useState, useContext } from 'react';



                        //                You can define here a default value
                      //                  |
                      //                  |
export const LoginContext = createContext();


                      //           This children will give components that is wrapped inside <LoginProvider/>
//  Creating a custom login provider  |
                        //            |
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    


      //                           REMEMBER TO  PASS BOTH DEFAULT AND SET STATE WHILE WORKING WITH CONTEXT API AND USESTATE
                                        //    |
  return (                               //   |    
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};



export const useLogin = () => {
  return useContext(LoginContext);  
};
