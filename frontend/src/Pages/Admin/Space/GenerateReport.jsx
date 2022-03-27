import React from "react";
import { Button } from "@mui/material";
import useAxios from "hooks/useAxios";
import { ApiRequestType } from "utils/constant";
import "./index.scss";

export default function GenerateReport() {
  const request = useAxios();

  const generateReservationReport = () => {
    request(ApiRequestType.GET_ALL_RESERVATION)
      .then((res) => generateReport(res.data, "reservation"))
      .catch((e) => alert("something is wrong"));
  };

  const generateSelectionReport = () => {
    request(ApiRequestType.GET_ALL_SELECTION)
      .then((res) => generateReport(res.data, "selection"))
      .catch((e) => alert("something is wrong"));
  };

  const generateReport = (data, filename) => {
    if (!data.length) return alert("No data available");
    const cleanData = prepareData(data);
    popupFile(cleanData, filename);
  };

  const prepareData = (data) => {
    let headers = data[0];
    headers = Object.keys(headers);
    let csvContent = "";
    csvContent += headers + "\r\n";
    let row;
    data.forEach((record) => {
      row = [];
      headers.forEach((h) => {
        row.push(record[h]);
      });
      row = row.join(",");
      csvContent += row + "\r\n";
    });
    return csvContent;
  };

  const popupFile = (data, filename) => {
    const file = document.createElement("a");
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    file.href = url;
    file.setAttribute("download", `${filename}.csv`);
    file.click();
  };

  return (
    <div className="space-content">
      <div className="generate-report-buttons">
        <Button
          className="btn-primary"
          variant="contained"
          onClick={generateReservationReport}
        >
          Generate Reservation Report
        </Button>
        <Button
          className="btn-primary"
          variant="contained"
          onClick={generateSelectionReport}
        >
          Generate Selection Report
        </Button>
      </div>
    </div>
  );
}
