import React from "react";
import { useParams } from "react-router-dom";
import speak from "../util/speak";

function Success() {
  const username = useParams().username;
  speak(`Created an Email account : ${username}@mini.com`);
  return (
    <center>
      <div>Created an Email account : {username}@mini.com</div>
    </center>
  );
}

export default Success;
