import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { ApiRequestType } from "utils/constant";
import "./index.scss";
import useAxios from "hooks/useAxios";
import { ErrorCode } from "utils/constant";
import { useSelector } from "react-redux";

export default function ProjectItemList(props) {
  const request = useAxios();
  const [openDesc, setOpenDesc] = useState(false);
  const { update, project } = props;
  const { title, projno, summary, supervisorName, supervisorEmail } = project;
  const user = useSelector((s) => s.user);
  const userEligible = user.eligible;

  const toggleDesc = () => {
    setOpenDesc(!openDesc);
  };

  const unreserve = () => {
    const payload = {
      email: props.userEmail,
      projno,
    };
    request(ApiRequestType.DELETE_RESERVATION, payload)
      .then((res) => {
        alert("Project unreserved");
        update();
      })
      .catch((e) => {
        alert("something is wrong");
      });
  };

  const select = async () => {
    try {
      // confirm project number
      const confirmation = prompt(
        `Are you sure you want to select project '${title}'? \nType the project number '${projno}' to confirm.`
      );
      if (confirmation !== projno) {
        alert(
          "You have inserted the wrong project number. Selection cancelled"
        );
        return;
      }

      // confirm matric number (if different)
      const registeredMatric = user.registered_matriculation_number;
      const validMatric = user.matriculation_number;
      if (registeredMatric !== validMatric) {
        const input = prompt(
          "Your registered matriculation number is different from your real NTU matriculation number. Please insert your real NTU matriculation number to proceed"
        );
        if (input.toLowerCase() !== validMatric.toLowerCase()) {
          alert("Invalid matriculation number. Aborting.");
          return;
        }
      }

      const payload = {
        email: props.userEmail,
        projno,
      };

      await request(ApiRequestType.SELECT, payload);
      alert("Project selected");
      update();
    } catch (e) {
      console.log(e);
      switch (e.response.data.code) {
        case ErrorCode.SELECTION_CLOSED:
          alert("You cannot select your project yet");
          break;
        case ErrorCode.PROJECT_SELECTED:
          alert("Project has been selected by another user");
          break;
        case ErrorCode.USER_HAS_SELECTED:
          alert("You have selected a project");
          break;
        default:
          alert("something is wrong");
      }
    }
  };

  return (
    <div className="project-list-item" key={projno}>
      <div className="project-list-item-header">
        <h4>{title}</h4>
        <div className="buttons">
          {props.type === "reservation" ? (
            <>
              <Button onClick={unreserve} variant="contained" color="secondary">
                Unreserve
              </Button>
              {userEligible ? (
                <Button onClick={select} variant="contained">
                  Select
                </Button>
              ) : null}
            </>
          ) : null}
          <Button onClick={() => toggleDesc()} variant="contained">
            {openDesc ? "close" : "more"}
          </Button>
        </div>
      </div>
      <div className={`project-list-item-body ${openDesc ? "open" : "close"}`}>
        <p>Supervisor: {supervisorName}</p>
        <br />
        <p>Email: {supervisorEmail}</p>
        <br />
        <p>{summary}</p>
      </div>
    </div>
  );
}

ProjectItemList.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    projno: PropTypes.string,
    summary: PropTypes.string,
    supervisorName: PropTypes.string,
    supervisorEmail: PropTypes.string,
  }),
  userEmail: PropTypes.string,
  update: PropTypes.func,
  type: PropTypes.string,
};
