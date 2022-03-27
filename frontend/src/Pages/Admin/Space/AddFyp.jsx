import React from "react";
import FileInput from "Pages/Admin/FileInput";
import FypForm from "Pages/Admin/Form/FypForm";
import { ApiRequestType } from "utils/constant";

export default function AddFyp() {
  return (
    <div className="space-content">
      <FileInput apiRequestType={ApiRequestType.POST_FYP_MANY} />
      <FypForm formType="addFyp" />
    </div>
  );
}
