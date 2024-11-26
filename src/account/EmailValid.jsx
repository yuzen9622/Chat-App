import React, { useState, useRef } from "react";
import "./acc.css";

import { url } from "../servirce";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
export default function EmailValid() {
  window.history.go(1);
  const [inputs, setInputs] = useState(Array(4).fill(""));
  const inputRefs = useRef(inputs.map(() => React.createRef()));
  const { signInfo } = useContext(AuthContext);
  const [error, setError] = useState("");
  console.log(signInfo);
  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    console.log(inputs.toString());
    // Move focus to next input
    if (event.target.value && index < inputs.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && inputs[index] === "") {
      // Move focus to previous input
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleOTPBtn = async () => {
    let numINput = "";
    inputs.forEach((element) => {
      numINput += element;
    });
    console.log(numINput);
    const res = await fetch(`${url}/users/OTP`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: signInfo.id,
        OTP: numINput,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.setItem("User", JSON.stringify(signInfo));
      window.location.reload();
    } else {
      setError("錯誤驗證碼!");
    }
  };
  console.log(error);
  return (
    <div className="otp-container">
      <h1>查看你的郵箱</h1>
      <br />
      <h2>輸入驗證碼</h2>
      <form
        onSubmit={handleOTPBtn}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          {inputs.map((input, index) => (
            <input
              className="otp-input"
              key={index}
              ref={inputRefs.current[index]}
              type="text"
              maxLength={1}
              value={input}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleBackspace(index, event)}
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                marginRight: "10px",
              }}
            />
          ))}
        </div>
        <button>驗證</button>
      </form>
      {error ? <h2>{error}</h2> : ""}
    </div>
  );
}
