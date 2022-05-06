// import { JsonWebTokenError } from 'jsonwebtoken';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");

  // console.log(jwt_decode(user).exp < Date.now() / 1000);

  if(user === null){
    return false;
  }else{
    // if true use refresh token to get new access token
    if(jwt_decode(user).exp < Date.now() / 1000){
      let refreshed = refreshTokens();
      return refreshed;
    }

    // not expired
    return true;
  } 
}

function refreshTokens(){
  const refreshToken = "Bearer " + localStorage.getItem("userRefreshToken");

  fetch('https://172.31.25.8:8080/api/token/refresh', {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Cache': 'no-cache',
      'Authorization' : refreshToken
    }
  })
    .then((response) => response.json())
    .then((data) => {
      setLocalStorage("user", data.access_token);
      setLocalStorage("userRefreshToken", data.refreshToken);
      return false;
    })
    .catch((error) => {console.log(error); return false;});
  }

function setLocalStorage(name, data){
  localStorage.setItem(name, data);
}

function getUserToken(){
  return localStorage.getItem("user");
}

const login = async (_email, _password) => { 
  // let navigate = useNavigate();
  // const requestOptions ={
  //   method: 'POST',
  //   headers: {'Content-Type': "application/x-www-form-urlencoded"},
  //   body: JSON.stringify({username : _email, password : _password})
  // };

  return await fetch('https://172.31.25.8:8080/api/login', {
  method: 'POST',
  // credentials: "include",
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Cache': 'no-cache'
  },
  body: new URLSearchParams({
      'username': _email,
      'password': _password,
  })})
  .then((response) => response.json())
  .then((data) => {
    // localStorage.setItem("user", data);
    setLocalStorage("user", data.access_token);
    setLocalStorage("userRefreshToken", data.refresh_token);
    console.log(data)
    return true;
    // navigate("/dashboard")
  })
  .catch((error) => {console.log(error); return false;});
}

function logout(){
  localStorage.clear();
}

const register = async (_firstName, _lastName, _email, _password) =>{
  const requestOptions ={
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName : _firstName, lastName : _lastName, email : _email, password : _password})
    };

    return await fetch('', requestOptions)
    .then(response => response.json())
    .then(data => {
      return true;
    })
    .catch(error => {console.log(error); return false;})
}




export {isUserLoggedIn, login, register, logout, getUserToken};