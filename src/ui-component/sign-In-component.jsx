import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingInComponent = () => {
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://streamora-userdata.onrender.com/userDetails"
      );

      const user = response.data.find((user) => user.email === userData.email);

      if (user) {
        if (user.password === userData.password) {
          const newEmail = {
            email: userData.email,
          };
          navigation("/");
          localStorage.setItem("userDetails", JSON.stringify(newEmail || ""));
        } else {
          toast.error("Password is incorrect!");
        }
      } else {
        toast.error("Email not found!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onchangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...userData, [name]: value });
  };

  return (
    <>
      <form onSubmit={submitHandler} className="Sign-In-page">
        <h1>Sign-In</h1>
        <div>
          <MdEmail />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={onchangeHandler}
            placeholder="Enter Email"
            autoComplete="email"
          />
        </div>
        <div>
          <RiLockPasswordFill />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={onchangeHandler}
            placeholder="Enter the password"
            autoComplete="password"
          />
        </div>
        <input type="submit" />
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default SingInComponent;
