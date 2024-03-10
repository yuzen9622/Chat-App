import React from "react";
import AdminMessage from "./adminMessage";
import AdminProfile from "./adminProfile";
export default function Amdin() {
  return (
    <div>
      <AdminProfile adminId={id} />
      <AdminMessage adminId={id} />
    </div>
  );
}
