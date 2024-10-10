import { Route, Routes, useNavigate } from "react-router-dom";
import App from "../../App";
import VideoComponent from "../multimedia-components/video";
import HomeComponent from "../multimedia-components/homecomponent";
import UploadComponent from "../multimedia-components/upload-component";
import FavoritesComponent from "../multimedia-components/favoritescomponent";
import ThemesComponent from "../multimedia-components/themes-component";
import LiveComponent from "../multimedia-components/live-component";
import MainProfileComponent from "../multimedia-components/main-propfile-component";
import SingInComponent from "../../ui-component/sign-In-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingUPHandler } from "../../api-sercers-toolkit/singupslice";
import SignUPComponent from "../../ui-component/singup-component";
import axios from "axios";

const NavigationComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { email } = JSON.parse(localStorage.getItem("userDetails")) || {};

  const { singUpLoading } = useSelector((state) => state.signUpData);

  useEffect(() => {
    if (!email) {
      dispatch(SingUPHandler(true));
      navigation("/LogIn");
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomeComponent />} />
          <Route path="video" element={<VideoComponent />} />
          <Route path="live/:videoId" element={<LiveComponent />} />
          <Route path="upload" element={<UploadComponent />} />
          <Route path="Favorites" element={<FavoritesComponent />} />
          <Route path="Profile" element={<MainProfileComponent />} />
          <Route path="LogIn" element={<SignUPComponent />} />
          <Route path="SignIn" element={<SingInComponent />} />
          <Route path="Themes" element={<ThemesComponent />} />
        </Route>
      </Routes>
    </>
  );
};

export default NavigationComponent;
