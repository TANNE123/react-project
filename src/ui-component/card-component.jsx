import { Button } from "antd";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromises } from "../api-sercers-toolkit/apiSlice";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import {
  addFavorite,
  removeFavorite,
} from "../api-sercers-toolkit/favoritesslice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SendOutlined } from "@ant-design/icons";

const CardComponent = () => {
  const [isLike, setIsLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(null);
  const [isShareVisible, setIsShareVisible] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [userProfileUrl, setUserProfileUrl] = useState({});
  const [comment, setComment] = useState("");

  const { userData, loading } = useSelector((state) => state.userDetailsData);
  const { email } = JSON.parse(localStorage.getItem("userDetails")) || {};
  const { ProfileChange } = useSelector((state) => state.profileData);
  const { cards } = useSelector((state) => state.favoritesData);

  const [sendComments, setSendComments] = useState(() => {
    const savedComments = localStorage.getItem("commentsData");
    return savedComments ? JSON.parse(savedComments) : {};
  });


  const { currentTheme, colors } = useSelector(
    (state) => state.ThemesSlicesData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("commentsData", JSON.stringify(sendComments));
  }, [sendComments]);

  const getDataLocal = JSON.parse(localStorage.getItem("commentsData"));

  useEffect(() => {
    dispatch(fetchPromises());
  }, [ProfileChange, dispatch]);

  useEffect(() => {
    const urlData = userData?.find((user) => user.email === email);
    if (urlData) {
      setUserProfileUrl(urlData);
    }
  }, [userData, email]);

  const toggleLike = (index) => {
    if (isLike === index) {
      setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      setIsLike(null);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLike(index);
    }
  };

  const handleFavorite = (videoUrl) => {
    if (cards.includes(videoUrl)) {
      dispatch(removeFavorite(videoUrl));
    } else {
      dispatch(addFavorite(videoUrl));
    }
  };

  const toggleMessageVisibility = (index) => {
    setIsMessageVisible((prevIndex) => (prevIndex === index ? null : index));
    setIsShareVisible(null);
  };

  const commentHandler = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const sendCommentHandler = (targetId) => {
    if (comment.trim() === "") return;
    setSendComments((prevComments) => {
      const newComments = { ...prevComments };
      if (!newComments[targetId]) {
        newComments[targetId] = [];
      }
      if (!newComments[targetId].includes(comment)) {
        newComments[targetId].push(comment);
      }
      return newComments;
    });
    setComment("");
  };

  const toggleShareVisibility = (index) => {
    setIsShareVisible((prevIndex) => (prevIndex === index ? null : index));
    setIsMessageVisible(null);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const radioHandler = (targetId) => {
    console.log(targetId);
  };

  return (
    <div className="message-page-open" style={{ ...colors[currentTheme] }}>
      {loading ? (
        <div className="skeleton-loader">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} count={3} height={20} />
          ))}
        </div>
      ) : userData && userData.length > 0 ? (
        userData
          .slice()
          .reverse()
          .map((each, index) => (
            <div key={index} className="Parent-card">
              <div className="Child-Card">
                <img src={each.profile_url || ""} alt="" />
                <div>{each.name}</div>
              </div>

              {each.videos?.length > 0 &&
                each.videos[each.videos.length - 1].video_url && (
                  <>
                    <div className="Child-Card video-container">
                      <video
                        muted={isMuted}
                        onMouseOver={(e) => {
                          if (e.target.paused) {
                            e.target.play();
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!e.target.paused) {
                            e.target.pause();
                          }
                        }}
                        className="video-player"
                      >
                        <source
                          src={each.videos[each.videos.length - 1].video_url}
                          type="video/mp4"
                        />
                      </video>

                      <Button
                        className="mute-icon"
                        onClick={toggleMute}
                        icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                      />
                    </div>

                    <div className="Child-Card-bottom">
                      <Button onClick={() => toggleLike(index)}>
                        {isLike == index && isLike ? (
                          <FcLike />
                        ) : (
                          <FcLikePlaceholder />
                        )}
                      </Button>
                      <span>Likes: {likeCount}</span>

                      <Button onClick={() => toggleMessageVisibility(index)}>
                        comment
                      </Button>
                      <Button onClick={() => toggleShareVisibility(index)}>
                        Share
                      </Button>
                      {each.videos?.length > 0 && (
                        <Button
                          onClick={() =>
                            handleFavorite(
                              each.videos[each.videos.length - 1].video_url
                            )
                          }
                        >
                          {cards?.includes(
                            each.videos[each.videos.length - 1]?.video_url
                          )
                            ? "Favorited"
                            : "Favorite"}
                        </Button>
                      )}
                    </div>

                    {isMessageVisible === index && (
                      <div className="message-section">
                        <div>
                          {getDataLocal[index] &&
                            getDataLocal[index].map(
                              (eachComment, commentIndex) => (
                                <p key={commentIndex}>{eachComment}</p>
                              )
                            )}
                        </div>
                        <div className="comment-box">
                          <input
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={commentHandler}
                          />
                          <button onClick={() => sendCommentHandler(index)}>
                            send
                          </button>
                        </div>
                      </div>
                    )}

                    {isShareVisible == index && (
                      <div className="share-section">
                        {userData
                          .slice()
                          .reverse()
                          .map((each, index) => (
                            <div key={index} className="share-card">
                              <div className="Child-Card1">
                                <img src={each.profile_url || ""} alt="." />
                                <div>{each.name}</div>
                              </div>
                              <div className="radio-div">
                                <input
                                  type="radio"
                                  onClick={() => radioHandler(each._id)}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                )}
              {isShareVisible == index && <SendOutlined className="sendIcon" />}
            </div>
          ))
      ) : (
        <div>No user data available.</div>
      )}
    </div>
  );
};

export default CardComponent;
