import { NavLink } from "react-router-dom";
import {
  UserAddOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { profileClose } from "../../api-sercers-toolkit/favoritesslice";


const ProfileComponent = () => {
  const { profileClose } = useSelector((state) => state.favoritesData);

  const dispatch=useDispatch()


const handleSignUpClick=()=>{
  dispatch(profileClose(!profileClose));
}
  return (
    <div className="profile-details">
      <div >
        <NavLink onClick={handleSignUpClick} to="/LogIn">
        <UserAddOutlined />
        <label>Sign-Up </label>
        </NavLink>
      </div>

      <div >
        <NavLink  onClick={handleSignUpClick} to="/SignIn">
        <LoginOutlined />
        <label>Sign-In</label>
        </NavLink>
      </div>

      <div>
        <NavLink onClick={handleSignUpClick} to="/Profile">
          <UserOutlined />
          <label>Profile </label>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileComponent;
