import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileHandler } from "../../api-sercers-toolkit/profileslice";
import { fetchData, notifyError } from "../js-handlers/reguler-expression";
import { Button } from "antd";
import { fetchPromises } from "../../api-sercers-toolkit/apiSlice";
import { useNavigate } from "react-router-dom";

const MainProfileComponent = () => {
  const { email } = JSON.parse(localStorage.getItem("userDetails")) || {};
  const [userData, setUserData] = useState(null);
  const [videos, setVideos] = useState([]); 
  const [images, setImages] = useState([]); 
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();
const navigation=useNavigate()

  const {userDetails}=useSelector((state)=>state.userDetailsData)
 

  useEffect(() => {
    userFetch();
    const fetchUserData = async () => {
      const responseData = await fetchData();
      if (responseData) {
        const checkingData = responseData.find((each) => each.email === email);
        setVideos(checkingData?.videos); 
        setImages(checkingData?.images); 
      } else {
        console.log("Failed to fetch data.");
      }
    };
    fetchUserData();
    if(dispatch){
        dispatch(fetchPromises())
    }
  }, [dispatch]);

  const userFetch = async () => {
    try {
      const response = await axios.get("https://streamora-userdata.onrender.com/userDetails");
      const userDetails = response.data;
      const user = userDetails.find((each) => each.email === email);
      setUserData(user);
      if (user) {
        setProfileImage(user.profile_url);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    if (profileImage) {
      postProfile();
    }
    if (profileImage) {
      dispatch(profileHandler(profileImage));
    }
  }, [profileImage]);

  const postProfile = async () => {
    try {
      const response = await axios.get("https://streamora-userdata.onrender.com/userDetails");
      const userDetails = response.data;
      const userIndex = userDetails.findIndex((each) => each.email === email);
      if (userIndex !== -1) {
        const updatedUser = {
          ...userDetails[userIndex],
          profile_url: profileImage,
        };

        await axios.put(
          `https://streamora-userdata.onrender.com/userDetails/${userDetails[userIndex].id}`,
          updatedUser
        );
      }
    } catch (err) {
      console.error("Error updating user profile:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  const delateHandler = async () => {
    try {
      const delateIndex = userDetails.findIndex((each) => each.email === email);
      
      if (delateIndex !== -1) {
        await axios.delete(`https://streamora-userdata.onrender.com/userDetails/${userDetails[delateIndex].id}`);
        localStorage.clear()
        window.location.reload()
      } else {
        notifyError("account not found")
      }
    } catch (err) {
      console.log("Error deleting user account:", err);
    }
  };
  

  const logOutHandler=()=>{
    window.localStorage.clear()
    navigation("/LogIn")
  }
  return (
    <>
      <div className="profile-data">
        <div className="profile-div">
          <div>
            <img
              src={profileImage || userData?.profile_url || ""}
              alt=""
              onClick={handleImageClick}
              style={{ cursor: "pointer", width: "100px", height: "100px" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            
          </div>
          <div>{userData ? userData.name : "Loading..."}</div>
         <Button onClick={delateHandler}>Delate account</Button>
         <Button onClick={logOutHandler}>Log out</Button>
        </div>
        <hr />
        
        <div className="post-div">
          <div>Videos: {userData ? userData.videos.length : 0}</div>
          <div>Images: {userData ? userData.images.length : 0}</div>
        </div>

        <div className="post-div-video-image">
          <div className="video-div">
            {videos?.length > 0 ? (
              videos.map((eachVideo, i) => (
                <div key={i}>
                  {eachVideo.videoUrl ? (
                    <video controls>
                      <source src={eachVideo.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div>No video URL</div>
                  )}
                </div>
              ))
            ) : (
              <div>No videos available</div>      
              
            )}
          </div>

          <div className="image-div">
            {images?.length > 0 ? (
              images.map((eachImage, i) => (
                <div key={i}>
                  {eachImage.imageUrl ? (
                    <img src={eachImage.imageUrl} alt={`Uploaded ${i}`} />
                  ) : (
                    <div>No image URL</div>
                  )}
                </div>
              ))
            ) : (
              <div>No images available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainProfileComponent;
