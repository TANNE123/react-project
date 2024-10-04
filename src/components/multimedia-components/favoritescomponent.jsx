import { useSelector } from "react-redux";

const FavoritesComponent = () => {
  const { cards } = useSelector((state) => state.favoritesData);

  return (
    <>
      <div className="favorites-card">
        {cards.map((each, i) => (
          <video key={i} controls src={each} />
        ))}
      </div>
    </>
  );
};

export default FavoritesComponent;
