import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FavoritesComponent = () => {
  const { cards } = useSelector((state) => state.favoritesData);

  return (
    <div className="favorites-card">
      {cards && cards?.some(each => each) ? (
        cards?.map((each, i) => 
          each ? <video key={i} controls src={each} /> : null
        )
      ) : (
        <Skeleton count={28} height={20} />
      )}
    </div>
  );
};

export default FavoritesComponent;
