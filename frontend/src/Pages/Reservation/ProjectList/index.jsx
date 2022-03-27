import ProjectListItem from "../ProjectListItem";
import PropTypes from "prop-types";
import React from "react";
import "./index.scss";
import { useSelector } from "react-redux";

export default function ProjectList(props) {
  const userEmail = useSelector((s) => s.user.email);
  return (
    <div className="project-list">
      {props.list.map((project) => (
        <ProjectListItem
          key={project.projno}
          project={project}
          userEmail={userEmail}
          update={props.update}
          type={props.type}
        />
      ))}
    </div>
  );
}

ProjectList.propTypes = {
  update: PropTypes.func,
  list: PropTypes.array,
  type: PropTypes.string,
};
