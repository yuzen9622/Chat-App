import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { url } from "../servirce";
import chat from "../img/chat.png";
import { useNavigate } from "react-router-dom";
import avatar from "../img/user.png";

function Sign() {
  const navigate = useNavigate();
  const { signInfo, updateSignInfo } = useContext(AuthContext);
  const [signStatus, setSignStatus] = useState("");
  const [isSign, setIsSign] = useState(false);
  const [Avatar, setAvatar] = useState(null);
  const sign = (e) => {
    setIsSign(true);
    var formData = new FormData();
    formData.append("name", signInfo.name);
    formData.append("email", signInfo.email);
    formData.append("password", signInfo.password);
    formData.append("img", Avatar);

    e.preventDefault();
    fetch(`${url}/users/register`, {
      method: "POST",

      body: formData,
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
          navigate("/");
          window.location.reload();
        } else {
          setSignStatus(data);
        }

        setIsSign(false);
      });
  };

  function createAvatar() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.addEventListener("change", (e) => {
      setAvatar(e.target.files[0]);
      updateSignInfo({ ...signInfo, img: e.target.files[0] });
    });
    input.click();
  }
  return (
    <div className="sign">
      <h3>Register</h3>

      <div className="user" style={{ position: "relative" }}>
        <img
          src={Avatar ? URL.createObjectURL(Avatar) : avatar}
          alt=""
          style={{ width: "80px", borderRadius: "50%", height: "80px" }}
        />
        <button
          style={{
            width: "30px",
            height: "30px",
            minWidth: "0",
            position: "absolute",
            backgroundColor: "#aaa",

            top: "60%",
            left: "53%",
            margin: "0",
            borderRadius: "50%",
            color: "white",
          }}
          onClick={createAvatar}
        >
          <i class="fa-solid fa-camera"></i>
        </button>
      </div>
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
