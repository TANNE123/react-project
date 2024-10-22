import { NavLink, useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {  ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { profileClose } from "../../api-sercers-toolkit/favoritesslice";
import { notifyWarning } from "../js-handlers/reguler-expression";

const ProfileComponent = () => {
  const { profile } = useSelector((state) => state.favoritesData);
  const dispatch = useDispatch();
  const navigation=useNavigate('')


  const handleSignUpClick = () => {
    notifyWarning("logout your current account after show your login form ")
    dispatch(profileClose(!profile)); 
  };
  return (
    <>
    <div className="profile-details">
      <div>
        <NavLink onClick={handleSignUpClick} to="/LogIn">
          <UserAddOutlined />
          <label>Sign-Up </label>
        </NavLink>
      </div>

      <div>
        <NavLink  to="/SignIn">
          <LoginOutlined />
          <label>Sign-In</label>
        </NavLink>
      </div>

      <div>
        <NavLink to="/Profile">
          <UserOutlined />
          <label>Profile </label>
        </NavLink>
      </div>
    
    </div>
    <ToastContainer />
    </>
  );
};

export default ProfileComponent;
