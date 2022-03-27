import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import useAxios from "hooks/useAxios";
import "./index.scss";

export default function FileInput(props) {
  const { apiRequestType } = props;
  const request = useAxios();
  const fileInput = useRef(null);

  const handleUpload = () => {
    // check if there is a file
    if (!fileInput.current.files.length) {
      alert("No file chosen!");
      return;
    }

    const csvFile = fileInput.current.files[0];

    // check name
    if (!csvFile.name.includes(".csv")) {
      alert("Upload file only allows .csv file!");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", csvFile, csvFile.name);

    request(apiRequestType, { formData }).then(() => alert("File Added!"));
  };

  return (
    <div className="file-input">
      <Button variant="contained" onClick={handleUpload}>
        Upload CSV
      </Button>
      <input ref={fileInput} type="file" />
    </div>
  );
}

FileInput.propTypes = {
  apiRequestType: PropTypes.string,
};
