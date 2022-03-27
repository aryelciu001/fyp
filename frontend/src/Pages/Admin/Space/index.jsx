import React from "react";
import PropTypes from "prop-types";
import AddFyp from "Pages/Admin/Space/AddFyp";
import AddUser from "Pages/Admin/Space/AddUser";
import EditFyp from "Pages/Admin/Space/EditFyp";
import EditUser from "Pages/Admin/Space/EditUser";
import FypSelection from "Pages/Admin/Space/FypSelection";
import GenerateReport from "Pages/Admin/Space/GenerateReport";
import { AdminOptions } from "utils/constant";
import "./index.scss";

export default function Space(props) {
  return (
    <div className="space">
      <h3>{props.selectedOption}</h3>
      {spaceGenerator(props.selectedOption)}
    </div>
  );
}

function spaceGenerator(option) {
  switch (option) {
    case AdminOptions.addFyp:
      return <AddFyp />;
    case AdminOptions.editFyp:
      return <EditFyp />;
    case AdminOptions.addUser:
      return <AddUser />;
    case AdminOptions.editUser:
      return <EditUser />;
    case AdminOptions.fypSelection:
      return <FypSelection />;
    case AdminOptions.generateReport:
      return <GenerateReport />;
    default:
      return "";
  }
}

Space.propTypes = {
  selectedOption: PropTypes.string,
};
