import React, { useState } from "react";
import { Modal, Button } from "antd";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiPhoneFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { RiKey2Line } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  EmailValidation,
  notify,
  notifyError,
  NumberValidation,
  passwordRegex,
} from "../components/js-handlers/reguler-expression";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUPComponent = () => {
  const navigation = useNavigate();
  const { singUpLoading } = useSelector((state) => state.signUpData);

  const [userDetails, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    Otp: "",
  });

  const [errorForm, setErrorForm] = useState({});
  const [otp, SetOtp] = useState("");

  const handleOk = async () => {
    if (
      userDetails.name &&
      userDetails.number &&
      userDetails.password &&
      userDetails.email
    ) {
      try {
        const response = await axios.get(
          `http://localhost:5000/userDetails?email=${userDetails.email}`
        );

        if (response.data.length > 0) {
          notifyError("User already registered with this email.");
        } else {
          await axios.post("http://localhost:5000/userDetails", {
            id: Date.now().toString(),
            profile_url: "",
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            number: userDetails.number,
            videos: [],
            images: [],
          });

          const userData = {
            name: userDetails.name,
            email: userDetails.email,
            number: userDetails.number,
          };
          localStorage.setItem("userDetails", JSON.stringify(userData));

          notify("Your details have been submitted successfully.");
          navigation("/SignIn");
        }
      } catch (err) {
        console.error("Error checking user details", err);
        notifyError("Failed to submit details.");
      }
    } else {
      notifyError("Please fill in all the details.");
    }
  };

  const handleCancel = () => {
    navigation("/SignIn");
  };

  const onchangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails({ ...userDetails, [name]: value });

    const FormError = { ...errorForm };

    switch (name) {
      case "email":
        if (!EmailValidation.test(value)) {
          FormError.email = "Invalid email, please check!";
        } else {
          FormError.email = "";
        }
        break;
      case "password":
        if (!passwordRegex.test(value)) {
          FormError.password =
            "First letter capital, symbol, and at least 8 characters";
        } else {
          FormError.password = "";
        }
        break;
      case "number":
        if (!NumberValidation.test(value)) {
          FormError.number = "Invalid phone number, please check!";
        } else {
          FormError.number = "";
        }
        break;
      default:
        break;
    }
    setErrorForm(FormError);
  };

  const generateOtpHandler = () => {
    const generate = Math.floor(100000 + Math.random() * 900000);
    SetOtp(generate);
  };

  const verifyHandler = () => {
    if (otp === userDetails.Otp) {
      toast.success("OTP verified successfully.");
    } else {
      toast.error("OTP verification failed.");
    }
  };

  return (
    <Modal
      title="Sign-Up"
      open={singUpLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Sign-In"
      className="modal-signUp"
      style={{
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        margin: "0",
      }}
    >
      <form className="Sign-Up">
        <div className="input-container">
          <div>
            <FaUser />
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={userDetails.name}
              onChange={onchangeHandler}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="input-container">
          <div>
            <MdEmail />
            <input
              type="email"
              name="email"
              value={userDetails.email}
              placeholder="Enter Email"
              onChange={onchangeHandler}
              autoComplete="email"
            />
          </div>
          {errorForm.email && <div style={{ color: "red" }}>{errorForm.email}</div>}
        </div>

        <div className="input-container">
          <div>
            <RiLockPasswordFill />
            <input
              type="password"
              name="password"
              value={userDetails.password}
              placeholder="Enter Password"
              onChange={onchangeHandler}
              autoComplete="password"
            />
          </div>
          {errorForm.password && (
            <div style={{ color: "red" }}>{errorForm.password}</div>
          )}
        </div>

        <div className="input-container">
          <div>
            <RiPhoneFill />
            <input
              type="number"
              name="number"
              value={userDetails.number}
              placeholder="Enter Number"
              onChange={onchangeHandler}
              autoComplete="number"
            />
          </div>
          {errorForm.number && (
            <div style={{ color: "red" }}>{errorForm.number}</div>
          )}
        </div>

        <div className="input-container">
          <div>
            <RiKey2Line />
            <input type="text" value={otp} readOnly placeholder="Generate OTP" />
          </div>
        </div>

        <div className="input-container">
          <div>
            <AiOutlineSend />
            <input
              type="text"
              name="Otp"
              value={userDetails.Otp}
              placeholder="Enter the OTP"
              onChange={onchangeHandler}
            />
          </div>
        </div>

        <div>
          <Button onClick={otp ? verifyHandler : generateOtpHandler}>
            {otp ? "Verify OTP" : "Generate OTP"}
          </Button>
        </div>
      </form>

      <ToastContainer />
    </Modal>
  );
};

export default SignUPComponent;
