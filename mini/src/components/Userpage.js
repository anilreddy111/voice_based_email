import React, { useEffect, useState } from "react";
// import React { useEffect, useState } from 'react';
function Userpage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_mails');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form>
      Email
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
      </div>
      Username
      <div className="form-group">
        <input
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
          className="form-input"
          type="password"
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
          <button className="btn btn-primary btn-block" type="submit">
            Sign Up
          </button>
        </div>
      </div>

      <div>
      {data.map((item) => (
        <div key={item._id}>
          {/* Print the desired data from each item */}
          <p>Email: {item.email}</p>
          <p>Subject: {item.subject}</p>
          {/* ... */}
        </div>
      ))}
    </div>
    </form>
    
  );
}

export default Userpage;
