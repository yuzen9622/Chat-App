import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import "./acc.css";
import chat from "../img/chat.png";
import { url } from "../servirce";
function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [islogin, setlogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const login = (e) => {
    e.preventDefault();
    fetch(`${url}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        let datas = {};
        console.log(data);
        if (data.name) {
          datas = {
            id: data._id,
            name: data.name,
            Avatar: data.Avatar,
            email: data.email,
            bio: data.bio,
          };
          const check = document.getElementById("remember");
          check.checked
            ? localStorage.setItem("User", JSON.stringify(datas))
            : sessionStorage.setItem("User", JSON.stringify(datas));

          window.location.reload();
        } else {
          setlogin(false);
          setLoginError(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    setlogin(false);
    if (user !== null) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <div className="login">
      <img src={chat} alt="" width={"50px"} />
      <h3>Login</h3>
      <form
        onSubmit={(e) => {
          login(e);
          setlogin(true);
        }}
      >
        <div className="user">
          <input
            type="text"
            id="email"
            required
            placeholder="  "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="user">
          <input
            type="password"
            id="pass"
            required
            value={pass}
            placeholder=" "
            onChange={(e) => setPass(e.target.value)}
          />
          <label htmlFor="pass">Password</label>
        </div>
        <div
          className="remenber"
          style={{
            width: "100%",
            maxWidth: "200px",
            color: "rgb(0, 149, 246)",
            fontSize: "14px",
            padding: "5px",
          }}
        >
          <input
            style={{ color: "rgb(0, 149, 246)" }}
            type="checkbox"
            id="remember"
          />
          <label htmlFor="remember" style={{ padding: "5px" }}>
            記得我
          </label>
        </div>
        <h4>{loginError}</h4>
        {islogin ? (
          <button disabled>登入中...</button>
        ) : (
          <button type="submit">登入</button>
        )}
      </form>
    </div>
  );
}

export default Login;
