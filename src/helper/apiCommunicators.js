import axios from "axios";
import ExpressError from "./ExpressError";

export async function loginUser(email, password){
    let res = await axios.post("/user/login",{
        email, password
    }).catch((err)=>{
        if(err.response.status == 403){
            throw new ExpressError(403,"Incorrect Password");
        }else if(err.response.status == 401){
            throw new ExpressError(401,"Email Not Registered");
    }});

    if(res.status != 200){
        throw new Error("Unable to Login");
    }

    let data = await res.data;
    return data;
}


export async function checkAuthStatus(){
    let res = await axios.get("/user/auth-status").catch((err)=>{
        throw new Error("Authentication Failed");
    });
    if(res.status !== 200){
        throw new Error("Authentication Failed");
    }
    let data = await res.data;
    return data;
}

export async function signupUser(name, email, password){
    let res = await axios.post("/user/signup",{
        name, email, password
    }).catch((err)=>{
        if(err.response.status == 401){
            throw new ExpressError(401, "User Already Registered")
        }else if(err.response.status == 403){
            throw new ExpressError(403, "Unable to Register User")
        }
    })

    if(res.status != 200){
        throw new Error("Something is Wrong")
    }

    let data = await res.data;
    return data;
}


export async function getChats(){
    let res = await axios.get("/chat");
    let data = await res.data;
    return data.chats;
}

export async function askBot(message){
    let res = await axios.post("/chat/new", {
        message,
      });
      let data = await res.data;
      return data.chats;
}

export async function clearChat(){
    let res = await axios.delete("/chat");
    if(res.status != 200){
        throw new Error("Couldn't clear conversation");
    }
    return res.status;
}

export async function logoutUser(){
    let res = await axios.get("/user/logout").catch((err)=>{
        throw new ExpressError(500, "Couldn't Logout");
    })

    return res.status;
}