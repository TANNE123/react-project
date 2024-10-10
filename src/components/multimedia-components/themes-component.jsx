import { useDispatch, useSelector } from "react-redux";
import {
  darkTheme,
  greenTheme,
  radTheme,
  yellowTheme,
} from "../../api-sercers-toolkit/themesslices";

const ThemesComponent = () => {
  const { currentTheme, colors } = useSelector(
    (state) => state.ThemesSlicesData
  );
  const dispatch = useDispatch();

  return (
    <div>
      <h1> select Themes color </h1>

      <div className="themes-cord">
        <button
          style={{ backgroundColor: "#EBC8B3",cursor:"pointer" }}
          onClick={() => dispatch(radTheme())}
        >
          Light Peach
        </button>
        <button
          style={{ backgroundColor: "#4A7766", color: "#fff",cursor:"pointer" }}
          onClick={() => dispatch(greenTheme())}
        >
          Pine Green 
        </button>
        <button
          style={{ backgroundColor: "#AFAFDA",cursor:"pointer" }}
          onClick={() => dispatch(yellowTheme())}
        >
          Light Periwinkle
        </button>
        <button
          style={{ backgroundColor: "#2c3e50", color: "#fff", cursor:"pointer" }}
          onClick={() => dispatch(darkTheme())}
        >
          Midnight Blue
        </button>
      </div>
    </div>
  );
};

export default ThemesComponent;
