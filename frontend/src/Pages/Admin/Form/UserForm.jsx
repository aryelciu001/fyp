import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./index.scss";
import { UserType } from "utils/constant";
import useAxios from "hooks/useAxios";

export default function UserForm(props) {
  const request = useAxios();
  const [email, setEmail] = useState(props.data ? props.data.email : "");
  const [studentMatricNumber, setStudentMatricNumber] = useState(
    props.data ? props.data.matriculation_number : ""
  );
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(
    props.data ? props.data.role : UserType.STUDENT
  );
  const [eligible, setEligible] = useState(
    props.data ? props.data.eligible : 0
  );
  const [apiRequestType, setApiRequestType] = useState("");
  const [apiResponseString, setApiResponseString] = useState("");
  const [buttonString, setButtonString] = useState("");
  const { formType } = props;
  const roles = Object.keys(UserType).map((key) => UserType[key]);

  useEffect(() => {
    switch (formType) {
      case "addUser":
        setApiRequestType("POST_USER");
        setApiResponseString("User Created!");
        setButtonString("Add User");
        break;
      case "editUser":
        setApiRequestType("PUT_USER");
        setApiResponseString("User Edited!");
        setButtonString("Edit User");
        break;
      default:
        return;
    }
  }, [formType]);

  const submit = () => {
    if (!email) {
      alert("email is empty");
      return;
    }
    if (!studentMatricNumber && role === UserType.STUDENT) {
      alert("Student matriculation number is empty!");
      return;
    }
    if (!password && formType === "addUser") {
      alert("Password is empty!");
      return;
    }
    if (!email.includes("@")) {
      alert("email does not look like email!");
      return;
    }

    const payload = {
      email,
      studentMatricNumber,
      password,
      role,
      eligible,
    };
    request(apiRequestType, payload)
      .then(() => {
        alert(apiResponseString);
        setEmail("");
        setStudentMatricNumber("");
        setPassword("");
      })
      .catch((e) => {
        switch (e.response.data.code) {
          case "ER_DUP_ENTRY":
            alert("Duplicate entry with the same email");
            break;
          default:
            alert("Something is wrong");
        }
      });
  };

  return (
    <div className="form-content">
      {role === "student" ? (
        <div className="form-content-row">
          <TextField
            label="Student Matriculation Number"
            variant="outlined"
            onChange={(e) => setStudentMatricNumber(e.target.value)}
            value={studentMatricNumber}
          />
        </div>
      ) : (
        ""
      )}
      <div className="form-content-row">
        <TextField
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </div>
      <div className="form-content-row">
        <TextField
          label={
            formType === "editUser"
              ? "Leave empty to leave password unchanged"
              : "Password"
          }
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </div>
      <div className="form-content-row">
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-content-row">
        <FormControl fullWidth>
          <InputLabel>Eligible to select</InputLabel>
          <Select
            value={eligible}
            label="Eligible to select"
            onChange={(e) => setEligible(e.target.value)}
          >
            <MenuItem value={1}>true</MenuItem>
            <MenuItem value={0}>false</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button onClick={submit}>{buttonString}</Button>
    </div>
  );
}

UserForm.propTypes = {
  data: PropTypes.object,
  formType: PropTypes.string,
};
