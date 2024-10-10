import { NavLink } from "react-router-dom";
import CardComponent from "../../ui-component/card-component";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "../../api-sercers-toolkit/modalslice";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loadingData);

  const showModalHandler = () => {
    dispatch(uploadFiles(!loading));
  };

  return (
    <>
      <CardComponent />
      <div className="upload-nav">
        <NavLink onClick={showModalHandler} to="/upload">
          <UploadOutlined />
          Upload
        </NavLink>
      </div>
    </>
  );
};

export default HomeComponent;
