import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { url } from "../servirce";
import chat from "../img/chat.png";
function Sign() {
  const { signInfo, updateSignInfo } = useContext(AuthContext);
  const [signStatus, setSignStatus] = useState("");
  const [isSign, setIsSign] = useState(false);

  const sign = (e) => {
    setIsSign(true);
    e.preventDefault();
    fetch(`${url}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        var datas = {};
        if (data._id) {
          setSignStatus("註冊成功");
          datas = {
            id: data._id,
            name: data.name,
            Avatar: data.Avatar,
            email: data.email,
            bio: data.bio,
          };
          localStorage.setItem("User", JSON.stringify(datas));
          window.location.reload();
        } else {
          setSignStatus(data);
        }
        setIsSign(false);
      });
  };

  return (
    <div className="sign">
      <img src={chat} alt="" width={"50px"} />
      <h3>Register</h3>
      <form onSubmit={sign}>
        <div className="user">
          <input
            type="text"
            id="name"
            placeholder=""
            onChange={(e) => {
              updateSignInfo({ ...signInfo, name: e.target.value });
            }}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="user">
          <input
            type="email"
            id="email"
            placeholder=""
            onChange={(e) => {
              updateSignInfo({ ...signInfo, email: e.target.value });
            }}
          />
          <label htmlFor="email">Email</label>
          <pre>#名稱請超過三個字元</pre>
        </div>
        <div className="user">
          <input
            type="password"
            id="password"
            placeholder=""
            onChange={(e) => {
              updateSignInfo({ ...signInfo, password: e.target.value });
            }}
          />
          <label htmlFor="password">Password</label>
        </div>
        <h3 className="sign-status">{signStatus}</h3>
        {isSign ? (
          <button disabled>註冊中</button>
        ) : (
          <button type="submit">註冊</button>
        )}
      </form>
    </div>
  );
}

export default Sign;
