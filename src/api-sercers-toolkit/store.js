import { configureStore } from "@reduxjs/toolkit";
import singleRedux from "./single-slice"
import favoritesRedux from "./favoritesslice"
import loadingRedux from "./modalslice"
import signUpRedux from "./singupslice"
import profileRedux from "./profileslice"
import userDetailsRedux from "./apiSlice"



export const reduxStore=configureStore({
    reducer:{
        singleData:singleRedux,
        favoritesData:favoritesRedux,
        loadingData:loadingRedux,
        signUpData:signUpRedux,
        profileData:profileRedux,
        userDetailsData:userDetailsRedux
    }
})