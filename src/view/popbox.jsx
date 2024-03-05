import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

export default function Popbox() {
  const { getCall, UserProfile } = useContext(ChatContext);
  return (
    <div className="popbox">
      <h2>{UserProfile?.name}</h2>
    </div>
  );
}
