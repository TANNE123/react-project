import { useSelector } from "react-redux";

const FavoritesComponent = () => {
  const { cards } = useSelector((state) => state.favoritesData);

  return (
    <>
      <div className="favorites-card">
        {cards && cards.length >0 ? (
          cards.map((each, i) => (
            each?<video key={i} controls src={each} />:''
            
          ))
        ) : (
          <p>No favorite videos found.</p>
        )}
      </div>
    </>
  );
};

export default FavoritesComponent;

