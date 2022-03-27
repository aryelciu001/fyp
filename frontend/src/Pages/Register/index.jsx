import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApiRequestType } from "utils/constant";
import "./index.scss";
import useAxios from "hooks/useAxios";

export default function Login() {
  const navigate = useNavigate();
  const request = useAxios();

  const [email, setEmail] = useState("");
  const [studentMatricNumber, setStudentMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [openInputVerificationCode, setOpenInputVerificationCode] =
    useState(false);

  const register = () => {
    const error = checkInput(email, studentMatricNumber, password);
    if (error) {
      alert(error);
      return;
    }
    if (!code) {
      alert("code is empty");
      return;
    }
    if (code.length !== 6) {
      alert("code length should only be 6 characters. Please check again.");
      return;
    }
    request(ApiRequestType.REGISTER, {
      email,
      password,
      studentMatricNumber,
      verificationCode: code,
    })
      .then(() => {
        alert("Registration successful. Please login.");
        navigate("/login");
      })
      .catch((e) => {
        switch (e.response.data.statusCode) {
          case 401:
            alert("Wrong verification code!");
            break;
          case 409:
            alert("Duplicate record with the same email");
            break;
          default:
            alert("Something is wrong");
        }
      });
  };

  const getVerificationCode = () => {
    const error = checkInput(email, studentMatricNumber, password);
    if (error) {
      alert(error);
      return;
    }
    request(ApiRequestType.GET_VERIFICATION_CODE, { email })
      .then(() => {
        alert(
          "Verification code has been sent to your email. Please insert it to verify your email."
        );
        setOpenInputVerificationCode(true);
      })
      .catch((e) => {
        switch (e.response.data.statusCode) {
          case 409:
            alert("Duplicate record with the same email");
            break;
          default:
            alert("Something is wrong");
        }
        alert("Something is wrong");
      });
  };

  return (
    <div className="login">
      <div className="form">
        <div className="row">
          <Typography>Register</Typography>
        </div>
        <div className="row">
          <TextField
            value={email}
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <TextField
            value={studentMatricNumber}
            label="Matriculation Number"
            variant="outlined"
            onChange={(e) => setStudentMatricNumber(e.target.value)}
          />
        </div>
        <div className="row">
          <TextField
            value={password}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {openInputVerificationCode && (
          <div className="row">
            <TextField
              value={code}
              label="Verification Code"
              variant="outlined"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        )}
        <div className="row">
          <Button
            variant="contained"
            onClick={openInputVerificationCode ? register : getVerificationCode}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

function checkInput(email, studentMatricNumber, password) {
  if (!email) {
    return "email is empty";
  }
  if (!email.toLowerCase().includes("ntu.edu.sg")) {
    return "email is not a valid NTU email";
  }
  if (!studentMatricNumber) {
    return "Matriculation number is empty";
  }
  if (!(studentMatricNumber.length === 9)) {
    return "NTU Matriculation number should be 9 characters!";
  }
  if (!password) {
    return "password is empty";
  }
  if (password.length < 8) {
    return "password should be at least 8 characters";
  }
  return "";
}
