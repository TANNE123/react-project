import { useDispatch, useSelector } from "react-redux";
import { darkTheme, greenTheme, radTheme, yellowTheme } from "../../api-sercers-toolkit/themesslices";

const ThemesComponent = () => {
  const {currentTheme, colors }= useSelector((state) => state.ThemesSlicesData);
  const dispatch = useDispatch();

 

  return (
    <div>

    <h1> select Themes color </h1>
  
      <div className="themes-cord">
        <button style={{backgroundColor:"#EBC8B3"}} onClick={() => dispatch(radTheme())}>Red</button>
        <button style={{backgroundColor:"#4A7766", color:"#fff"}} onClick={() => dispatch(greenTheme())}>Green</button>
        <button style={{backgroundColor:"#AFAFDA"}}  onClick={() => dispatch(yellowTheme())}>Yellow</button>
        <button style={{backgroundColor:"#2c3e50", color:"#fff"}}  onClick={()=>dispatch(darkTheme())}>dark</button>
      </div>
    </div>
  );
};

export default ThemesComponent;
