import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";
import { ApiRequestType } from "utils/constant";
import "./index.scss";
import useAxios from "hooks/useAxios";

export default function FypForm(props) {
  const request = useAxios();
  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [projno, setProjno] = useState(props.data ? props.data.projno : "");
  const [summary, setSummary] = useState(props.data ? props.data.summary : "");
  const [supervisor, setSupervisor] = useState(
    props.data ? props.data.supervisor : ""
  );
  const [email, setEmail] = useState(props.data ? props.data.email : "");
  const [apiRequestType, setApiRequestType] = useState("");
  const [apiResponseString, setApiResponseString] = useState("");
  const [buttonString, setButtonString] = useState("");
  const { formType } = props;

  useEffect(() => {
    switch (formType) {
      case "addFyp":
        setApiRequestType(ApiRequestType.POST_FYP);
        setApiResponseString("FYP Created!");
        setButtonString("Add Fyp");
        break;
      case "editFyp":
        setApiRequestType(ApiRequestType.PUT_FYP);
        setApiResponseString("FYP Edited!");
        setButtonString("Edit Fyp");
        break;
      default:
        return;
    }
  }, [formType]);

  const submit = () => {
    if (!title) {
      alert("Project title is empty!");
      return;
    }
    if (!projno) {
      alert("Project ID is empty!");
      return;
    }
    if (!summary) {
      alert("Project info is empty!");
      return;
    }
    if (!supervisor) {
      alert("Supervisor name is empty!");
      return;
    }
    if (!email) {
      alert("Supervisor ID is empty!");
      return;
    }

    const payload = {
      title,
      projno,
      summary,
      supervisor,
      email,
    };

    request(apiRequestType, payload)
      .then(() => {
        alert(apiResponseString);
        setTitle("");
        setProjno("");
        setSummary("");
        setSupervisor("");
        setEmail("");
      })
      .catch((e) => {
        switch (e.response.data.code) {
          case "ER_DUP_ENTRY":
            alert("Duplicate entry with the same ID");
            break;
          default:
            alert("Something is wrong");
        }
      });
  };

  return (
    <div className="form-content">
      <div className="form-content-row">
        <TextField
          label="Project Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="form-content-row">
        <TextField
          label="Project Number"
          variant="outlined"
          onChange={(e) => setProjno(e.target.value)}
          value={projno}
        />
      </div>
      <div className="form-content-row">
        <TextField
          label="Project Summary"
          multiline
          rows={4}
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
        />
      </div>
      <div className="form-content-row">
        <TextField
          label="Supervisor Name"
          variant="outlined"
          onChange={(e) => setSupervisor(e.target.value)}
          value={supervisor}
        />
      </div>
      <div className="form-content-row">
        <TextField
          label="Supervisor Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="form-content-row">
        <Button onClick={submit}>{buttonString}</Button>
      </div>
    </div>
  );
}

FypForm.propTypes = {
  data: PropTypes.object,
  formType: PropTypes.string,
};
