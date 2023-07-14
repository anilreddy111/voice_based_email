import React, { useEffect, useState } from "react";
import speak from "../util/speak";
import listen from "../util/listen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate()

   const login = async ()=>{
    const data = await axios.post("http://127.0.0.1:5000/login",{
      email: email,
      password: password
    })
    console.log(data.data)
    if(data.data == "Yes"){
      localStorage.setItem("email", email)
      navigate("/inbox")
    }
  }

  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      speak("Space pressed!")
      if(email && password) login()
    }
  })

  useEffect(()=>{
    speak("Type email")
    listen(setEmail)
  },[])

  useEffect(()=>{
    if(email){
      var email1 = email.split(" ").join("").toLowerCase()
      setEmail(email1)
      setTimeout(()=>{
        speak("Type password")
        
        setTimeout(()=>{
          listen(setPassword)
        }, 2000)
        
        setTimeout(() => {
          speak("Type spacebar to submit the details")
        }, 5000);
      },1000)
    }
  },[email])
  
  return (
    <div className="page">
      <div className="header">
        <h2>Welcome To The Voice Based Email System</h2>
      </div>
      <div className="content">
        <div className="col-sm-8 main-section">
          <div>
            Email
            <div className="form-group">
              <input
                className="form-input"
                type="email"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,14}$"
                name="email"
                onChange={handleChange}
                value={email}
                required
              />
            </div>
            Password
            <div className="form-group">
              <input
                className="form-input"
                type="text"
                placeholder="Password"
                onChange={handleChange}
                value={password}
                name="password"
                required
              />
            </div>
            <br />
            <div className="form-group">
              <div className="btn-group btn-group-block">
                <button
                  onClick={login}
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="Submit"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
