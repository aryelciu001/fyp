import React from "react";
import UserForm from "Pages/Admin/Form/UserForm";
import FileInput from "Pages/Admin/FileInput";
import { ApiRequestType } from "utils/constant";

export default function AddUser() {
  return (
    <div className="space-content">
      <FileInput apiRequestType={ApiRequestType.POST_USER_MANY} />
      <UserForm formType="addUser" />
    </div>
  );
}
