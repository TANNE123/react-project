import axios from "axios";
import { toast } from "react-toastify";

export const NumberValidation = /^[6-9][0-9]{9}$/;

export const EmailValidation = /@gmail\.com$/;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const notify = (message) => {
  toast.success(message, {
    position: "top-right",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
  });
};

export const notifyWarning = (message) => {
  toast.warn(message, {
    position: "top-right",
  });
};








export const fetchData = async () => {
  try {
    const response = await axios.get("https://server-streamora.onrender.com/api/streamora/user/");
    if (response.status === 200) {
      return response.data.data.users; 
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null; 
    }
  } catch (err) {
    console.error("An error occurred while fetching data:", err);
    return null; 
  }
};
