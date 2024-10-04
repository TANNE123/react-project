import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromises } from "../api-sercers-toolkit/apiSlice";

const VideoComponentCard = () => {
  const { userDetails } = useSelector((state) => state.userDetailsData);
  const dispatch = useDispatch();

  const videoRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchPromises());
  }, [dispatch]);

  let videoArr = [];
  let imageArr = [];

  userDetails.forEach(each => {
    if (each.videos) {
      each.videos.forEach(video => {
        videoArr.push(video.videoUrl);
      });
    }
    if (each.images) {
      each.images.forEach(image => {
        imageArr.push(image.imageUrl);
      });
    }
  });



  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();  
      }
    });
  };

  return (
    <div className="reals-card">
      <div>
        {videoArr.map((each, index) => (
          <video
            key={index}
            src={each}
            controls
            ref={el => videoRefs.current[index] = el}  
            onPlay={() => handlePlay(index)}  
          />
        ))}

        {imageArr.map((each, index) => (
          <img key={index} src={each} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default VideoComponentCard;
