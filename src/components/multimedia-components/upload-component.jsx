import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { uploadFiles } from "../../api-sercers-toolkit/modalslice";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPromises } from "../../api-sercers-toolkit/apiSlice";

const UploadComponent = () => {
  const navigator = useNavigate();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { loading1 } = useSelector((state) => state.loadingData);
  const { userData, loading } = useSelector((state) => state.userDetailsData);

  const dispatch = useDispatch();

  const [videoUpload, setVideoUpload] = useState({
    video_url: "",
    like: 0,
    view: 0,
    message: [],
  });

  const [imageUpload, setImageUpload] = useState({
    image_url: "",
    like: 0,
    message: [],
  });

  const { email } = JSON.parse(localStorage.getItem("userDetails")) || {};

  useEffect(() => {
    if (videoUpload.video_url) {
      videoUrlPost();
    }
  }, [videoUpload]);

  useEffect(() => {
    if (imageUpload.image_url) {
      imageUrlPost();
    }
  }, [imageUpload]);

  useEffect(() => {
    dispatch(fetchPromises()); // Fetch data on mount
  }, [dispatch]);

  const handleOk = () => {
    navigator("/");
    dispatch(uploadFiles(false));
  };

  const showModalHandler = () => {
    dispatch(uploadFiles(!loading1));
  };

  const handleCancel = () => {
    navigator("/");
    dispatch(uploadFiles(false));
  };

  const videoHandler = () => {
    fileInputRef.current.click();
  };

  const onVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file); // Create a URL for the video file
      setVideoUpload((prevState) => ({
        ...prevState,
        video_url: videoUrl, // Use the generated URL
      }));
    }
  };

  const videoUrlPost = async () => {
    try {
      if (!userData || userData.length === 0) {
        console.error("No user data available for video upload.");
        return;
      }

      const findIndex = userData.findIndex((each) => each.email === email);

      if (findIndex !== -1) {
        const updatedVideos = [...userData[findIndex].videos, videoUpload]; // Append new video
        const updatedUser = {
          ...userData[findIndex],
          videos: updatedVideos,
        };

        const patchResponse = await axios.patch(
          `https://server-streamora.onrender.com/api/streamora/user/${userData[findIndex]._id}`,
          updatedUser
        );

        console.log("Patch response for video:", patchResponse.data);
        toast.success("Video uploaded successfully");
      }
    } catch (err) {
      console.error("Error uploading video:", err.response ? err.response.data : err.message);
      toast.error("Error uploading video");
    }
  };

  const imageHandler = () => {
    imageInputRef.current.click();
  };

  const onImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the image file
      setImageUpload((prevState) => ({
        ...prevState,
        image_url: imageUrl, // Use the generated URL
      }));
    }
  };

  const imageUrlPost = async () => {
    try {
      if (!userData || userData.length === 0) {
        console.error("No user data available for image upload.");
        return;
      }

      const findIndex = userData.findIndex((each) => each.email === email);

      if (findIndex !== -1) {
        const updatedImages = [...userData[findIndex].images, imageUpload]; // Append new image
        const updatedUser = {
          ...userData[findIndex],
          images: updatedImages,
        };

        const patchResponse = await axios.patch(
          `https://server-streamora.onrender.com/api/streamora/user/${userData[findIndex]._id}`,
          updatedUser
        );

        console.log("Patch response for image:", patchResponse.data);
        toast.success("Image uploaded successfully");
      }
    } catch (err) {
      console.error("Error uploading image:", err.response ? err.response.data : err.message);
      toast.error("Error uploading image");
    }
  };

  return (
    <>
      <Modal
        title="Upload"
        open={loading1}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Button onClick={videoHandler}>Upload Video</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="video/*"
          onChange={onVideoFileChange}
        />

        <Button onClick={imageHandler}>Upload Image</Button>
        <input
          type="file"
          ref={imageInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={onImageFileChange}
        />
      </Modal>

      <div className="upload-nav">
        <NavLink onClick={showModalHandler} to="/upload">
          <UploadOutlined />
          Upload
        </NavLink>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default UploadComponent;
