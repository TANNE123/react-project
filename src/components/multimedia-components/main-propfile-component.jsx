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
  const [userData1, setUserData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cloudnaryApiImage =
    "https://api.cloudinary.com/v1_1/dwyjrls6r/image/upload";

  const { userData, loading } = useSelector((state) => state.userDetailsData);

  useEffect(() => {
    userFetch();
    const fetchUserData = async () => {
      const responseData = await fetchData();

      if (responseData) {
        const checkingData = responseData.find((each) => each.email === email);
        setVideos(checkingData?.videos || []);
        setImages(checkingData?.images || []);
      } else {
        console.error("Failed to fetch data.");
      }
    };
    fetchUserData();
    if (dispatch) {
      dispatch(fetchPromises());
    }
  }, [dispatch, email]);

  const userFetch = async () => {
    try {
      const response = await axios.get(
        "https://server-streamora-2.onrender.com/api/streamora/user/"
      );
      const userDetails = response.data.data.users;

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
      dispatch(profileHandler(profileImage));
    }
  }, [profileImage, dispatch]);

  const postProfile = async () => {
    try {
      const response = await axios.get(
        "https://server-streamora-2.onrender.com/api/streamora/user/"
      );

      const userDetails = response.data.data.users;
      const userIndex = userDetails.findIndex((each) => each.email === email);

      if (userIndex !== -1) {
        const userId = userDetails[userIndex]._id;
        const updatedUser = {
          ...userDetails[userIndex],
          profile_url: profileImage,
        };

        await axios.put(
          `https://server-streamora-2.onrender.com/api/streamora/user/${userId}`,
          updatedUser
        );
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error("Error updating user profile:", err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "images_preset");
      formData.append("resource_type", "image");

      try {
        const res = await axios.post(cloudnaryApiImage, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { secure_url } = res.data;
        setProfileImage(String(secure_url));
      } catch (error) {
        console.error(error);
        toast.error("Error uploading image");
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteHandler = async () => {
    try {
      if (userData) {
        const deleteIndex = userData.findIndex((each) => each.email === email);
        if (deleteIndex !== -1) {
          await axios.delete(
            `https://server-streamora-2.onrender.com/api/streamora/user/${userData[deleteIndex]._id}`
          );
          localStorage.clear();
          window.location.reload();
        } else {
          notifyError("Account not found");
        }
      } else {
        console.error("User data is not available for deletion.");
      }
    } catch (err) {
      console.error("Error deleting user account:", err);
    }
  };

  const logOutHandler = () => {
    localStorage.clear();
    navigate("/LogIn");
  };

  return (
    <>
      <div className="profile-data">
        <div className="profile-div">
          <div>
            <img
              src={profileImage || userData1?.profile_url || ""}
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
          <div className="button-div">{userData1 ? userData1.name : "Loading..."}</div>
          <Button onClick={deleteHandler}>Delete account</Button>
          <Button onClick={logOutHandler}>Log out</Button>
        </div>
        <hr />

        <div className="post-div">
          <div>Videos: {videos.length}</div>
          <div>Images: {images.length}</div>
        </div>

        <div className="post-div-video-image">
          <div className="video-div">
            {videos.length > 0 ? (
              videos.map((eachVideo, i) => {
                return (
                  <div key={i}>
                    {eachVideo.video_url ? (
                      <video controls width="320" height="240">
                        <source src={eachVideo.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div>No video URL available</div>
                    )}
                  </div>
                );
              })
            ) : (
              <div>No videos available</div>
            )}
          </div>

          <div className="image-div">
            {images.length > 0 ? (
              images.map((eachImage, i) => (
                <div key={i}>
                  {eachImage.image_url ? (
                    <img src={eachImage.image_url} alt={`Uploaded ${i}`} />
                  ) : (
                    <div>No image URL available</div>
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
