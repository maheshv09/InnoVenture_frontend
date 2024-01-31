import React from 'react'
import auth from '../firebase_init.js'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'

import LoadingPage from './LoadingPage.js'

const Protected_route = ({children}) => {
const [user,isLoading]=useAuthState(auth);
    try{
        if(isLoading){
            return(
                <LoadingPage />
            )
        }
        if(!user){
            return(
            <Navigate to="/login" />)
        }
        else{
            return children;
        }
    }
    catch(error){
        console.log("ERROR :",error);
    }

}

export default Protected_route