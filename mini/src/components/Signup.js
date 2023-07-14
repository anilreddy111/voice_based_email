import React, { useState, useEffect } from "react";
import speak from "../util/speak";
import listen from "../util/listen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    speak("Type username");
    listen(setUsername);
  }, []);

  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      speak("Space pressed!")
      if(username && password) signup()
    }
  })

  useEffect(() => {
    if (username) {
      var username1 = username.split(" ").join("").toLowerCase();
      setUsername(username1);
      setTimeout(() => {
        speak("Type password");
        listen(setPassword);
        setTimeout(() => {
          speak("Type spacebar to submit the details")
        }, 5000);
      }, 1000);
    }
  }, [username]);

  async function signup() {
    if (username && password) {
      const data = await axios.post("http://127.0.0.1:5000/create_user", {
        email: username + "@mini.com",
        password: password,
      });
      if (data.data == "YES") {
        navigate(`/success/${username}`)
      }
    }
  }

  return (
    <div>
      <div>
        {/* Email
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            // onChange={handleChange}
            // value={emailForRegistration}
            name="email_for_registration"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,14}$"
            required
          />
        </div> */}
        Username
        <div className="form-group">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            type=""
            placeholder="Username"
            // onChange={handleChange}
            // value={username}
            name="username"
            required
          />
        </div>
        Password
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            type="text"
            placeholder="Password"
            // onInput={handleChange}
            // value={passwordForRegistration}
            name="password_for_registration"
            required
          />
        </div>
        <br />
        <div className="form-group">
          <div className="btn-group btn-group-block">
            <button
              onClick={signup}
              className="btn btn-primary btn-block"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
