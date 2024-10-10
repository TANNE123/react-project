import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

const CustomVideoCall = () => {
  const { videoId } = useParams();
  const meetingRef = useRef(null);
  let ZC = useRef(null);

  useEffect(() => {
    meeting();

    return () => {
      if (ZC.current) {
        ZC.current.destroy();
      }
    };
  }, []);

  const meeting = async () => {
    const appID = 1757958631;
    const serverSecret = "474cae50897160fe21416980174fe248";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      videoId,
      Date.now().toString(),
      "Enter name"
    );
    ZC.current = ZegoUIKitPrebuilt.create(kitToken);
    ZC.current.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: false,
    });
  };

  return <div className="live-video" ref={meetingRef} />;
};

export default CustomVideoCall;
