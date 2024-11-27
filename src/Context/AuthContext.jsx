import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../servirce";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("User"))
      ? JSON.parse(sessionStorage.getItem("User"))
      : JSON.parse(localStorage.getItem("User"))
  );
  const navgate = useNavigate();
  const [loadingImg, setLoadingImg] = useState(false);
  const [signInfo, setSignInfo] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    img: null,
    bio: "",
    Avatar: null,
  });
  console.log(signInfo);
  const updateSignInfo = useCallback((info) => {
    setSignInfo(info);
  }, []);

  const logoutUser = useCallback(() => {
    navgate("/");
    sessionStorage.removeItem("User");
    localStorage.removeItem("User");
    window.location.reload();
  });
  const updateAvatar = useCallback(() => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.addEventListener("change", async function (event) {
      var selectedFile = event.target.files[0];
      var formData = new FormData();
      formData.append("userId", user?.id);
      formData.append("img", selectedFile);
      try {
        setLoadingImg(true);
        const response = await fetch(`${url}/users/pic/upload/${user?.id}`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        const datas = {
          id: data._id,
          name: data.name,
          email: data.email,
          bio: data.bio,
        };

        setLoadingImg(false);
      } catch (error) {}
    });
    input.click();
  }, []);
  const updateUser = useCallback(async (id, name, email, bio) => {
    try {
      if (!id || !name || !email) return;
      setLoadingImg(true);
      const response = await fetch(`${url}/users/update`, {
        method: "POST",
        body: JSON.stringify({
          userId: id,
          name: name,
          email: email,
          bio: bio,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const datas = {
        id: data._id,
        name: data.name,
        Avatar: data.Avatar,
        email: data.email,
        bio: data.bio,
      };
      console.log(datas);
      sessionStorage.setItem("User", JSON.stringify(datas));

      navgate("/Profile");

      setLoadingImg(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getAvatar = useCallback(async (userId) => {
    try {
      if (!userId) return;
      const res = await fetch(`${url}/users/avatar/${userId}`);
      if (!res.ok) {
        throw new Error("response error", res.status);
      }

      const imgBlob = await res.blob();
      return URL.createObjectURL(imgBlob);
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInfo,
        updateSignInfo,
        logoutUser,
        updateAvatar,
        updateUser,
        loadingImg,
        getAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
