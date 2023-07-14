import React from "react";
import speak from "../util/speak";
import { useState, useEffect } from "react";
import listen from "../util/listen";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [value, setValue] = useState("")
  
  const navigate = useNavigate()
  const [showOptions, setOptions] = useState(false)

  window.addEventListener('keypress', async ()=>{
    if(!showOptions){
      speak("You want to navigate to login or signup?")
      setOptions(true)
      setTimeout(()=>{
        listen(setValue)
      },1500)
    }
  })

  useEffect(()=>{
    speak("Hello. Type space bar to start filling form...")
  },[])

  useEffect(()=>{
    if(value == "login") navigate("/login")
    if(value == "sign up") navigate("/signup")
  },[value])

  return (
    <div>
      {value}
    </div>
  );
}

export default Welcome;
