import React, { useEffect, useState, useCallback } from "react";
import Table from "Pages/Admin/Table";
import DialogForm from "Pages/Admin/DialogForm";
import { ApiRequestType } from "utils/constant";
import { FypSchema } from "utils/schema";
import useAxios from "hooks/useAxios";

const headers = [
  {
    text: "Edit",
    type: "edit",
  },
  {
    text: "Delete",
    type: "delete",
  },
  ...FypSchema,
];

export default function EditFyp() {
  const request = useAxios();
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    request(ApiRequestType.GET_PROJECT_LIST)
      .then((response) => setData(response.data))
      .catch((e) => alert("Something is wrong"));
  }, []);

  const deleteItem = (data) => {
    const dataHeader = "projno";

    request(ApiRequestType.DELETE_FYP, { id: data[dataHeader] })
      .then(() => {
        fetchData();
        alert("Deleted!");
      })
      .catch((e) => alert("Something is wrong."));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-content">
      <Table
        headers={headers}
        data={data}
        formType="editFyp"
        datumKey="projno"
        fetchData={fetchData}
        deleteItem={deleteItem}
      />
      <DialogForm fetchData={fetchData} />
    </div>
  );
}
