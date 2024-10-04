import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { uploadFiles } from "../../api-sercers-toolkit/modalslice";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { notify } from "../js-handlers/reguler-expression";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadComponent = () => {
  const navigator = useNavigate();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { loading } = useSelector((state) => state.loadingData);
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

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit for files

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

  const handleOk = () => {
    navigator("/");
    dispatch(uploadFiles(false));
  };

  const showModalHandler = () => {
    dispatch(uploadFiles(!loading));
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
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds the limit of 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoUpload((prevState) => ({
          ...prevState,
          video_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const videoUrlPost = async () => {
    try {
      const response = await axios.get("https://server-streamora.onrender.com/api/streamora/user/");
      const userDetails = response.data.data.users;

      const findIndex = userDetails.findIndex((each) => each.email === email);

      if (findIndex !== -1) {
        const updatedVideos = [...userDetails[findIndex].videos, videoUpload];
        const updatedUser = {
          ...userDetails[findIndex],
          videos: updatedVideos,
        };

        await axios.patch(
          `https://server-streamora.onrender.com/api/streamora/user/${userDetails[findIndex].id}`,
          updatedUser
        );
      }
    } catch (err) {
      console.error("Error uploading video:", err);
    }
  };

  const imageHandler = () => {
    imageInputRef.current.click();
  };

  const onImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds the limit of 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload((prevState) => ({
          ...prevState,
          image_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const imageUrlPost = async () => {
    try {
      const response = await axios.get("https://server-streamora.onrender.com/api/streamora/user/");
      const userDetails = response.data;

      const findIndex = userDetails.findIndex((each) => each.email === email);

      if (findIndex !== -1) {
        const updatedImages = [...userDetails[findIndex].images, imageUpload];
        const updatedUser = {
          ...userDetails[findIndex],
          images: updatedImages,
        };

        await axios.patch(
          `https://server-streamora.onrender.com/api/streamora/user/${userDetails[findIndex].id}`,
          updatedUser
        );
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <>
      <Modal
        title="Upload"
        open={loading}
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
