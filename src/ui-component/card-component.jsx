import { Button } from "antd";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromises } from "../api-sercers-toolkit/apiSlice";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../api-sercers-toolkit/favoritesslice";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  

const CardComponent = () => {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userProfileUrl, setUserProfileUrl] = useState({});
  const {userData}=useSelector((state)=>state.userDetailsData)
  const { email } = JSON.parse(localStorage.getItem("userDetails"))|| {};
  const { ProfileChange } = useSelector((state) => state.profileData);
  const { cards } = useSelector((state) => state.favoritesData);
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(fetchPromises());

  }, [ProfileChange, dispatch]);


  const urlData = userData.find((user) => user.email === email);

  setUserProfileUrl(urlData);

  console.log(userProfileUrl);
  


  const toggleLike = () => {
    setIsLike((prev) => !prev);
    setLikeCount((prev) => (isLike ? prev - 1 : prev + 1));
  };

  const handleFavorite = (videoUrl) => {
    if (cards.includes(videoUrl)) {
      dispatch(removeFavorite(videoUrl));
    } else {
      dispatch(addFavorite(videoUrl));
    }
  };

  const toggleMessageVisibility = () => {
    setIsMessageVisible((prev) => !prev);
    setIsShareVisible(false);
  };

  const toggleShareVisibility = () => {
    setIsShareVisible((prev) => !prev);
    setIsMessageVisible(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="message-page-open">
      {
      userDetails ? (
        userDetails.map((each, index) => (
          <div key={index} className="Parent-card">
            <div className="Child-Card">
              <img src={each.profile_url || ""} alt="User Profile" />
              <div>{each.name}</div>
            </div>

            {each.videos?.length > 0 && (
              <div className="Child-Card video-container">
                <video
                  muted={isMuted}
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => e.target.pause()}
                  className="video-player"
                >
                  <source src={each.videos[each.videos.length - 1].videoUrl} />
                </video>

                <Button
                  className="mute-icon"
                  onClick={toggleMute}
                  icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                />
              </div>
            )}

            <div className="Child-Card-bottom">
              <Button onClick={toggleLike}>
                {isLike ? <FcLike /> : <FcLikePlaceholder />}
              </Button>
              <span>Likes: {likeCount}</span>
              <Button onClick={toggleMessageVisibility}>Message</Button>
              <Button onClick={toggleShareVisibility}>Share</Button>
              <Button onClick={() => handleFavorite(each.videos[each.videos.length - 1].videoUrl)}>
                {cards?.includes(each.videos[each.videos.length - 1]?.videoUrl) ? "Favorited" : "Favorite"}
              </Button>
            </div>

            {isMessageVisible && (
              <div className="message-section">
                <h1>Message content...</h1>
              </div>
            )}
            {isShareVisible && (
              <div className="share-section">
                <h1>Share content...</h1>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="skeleton-loader">
          hello
          <Skeleton count={3} height={100} style={{ marginBottom: '10px', border:"2px solid" }} />
          <Skeleton count={1} height={200} />
          <Skeleton count={2} height={30} />
        </div>
      )}
    </div>
  );
};

export default CardComponent;
