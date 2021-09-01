import React, { useReducer } from "react";
import "./App.css";
import "../SelectionBar/Index";
import SelectionBar from "../SelectionBar/Index";
import Grid from "../Grid/Index";
import reducer from "../../reducer";

const initialState = {
    speedSliderPosition: 0,
    speedSliderValue: 0,
};

const AppContext = React.createContext(initialState);

function App() {
    return (
        <div className="app">
            <SelectionBar />
            <Grid />
        </div>
    );
}

export { AppContext };

export default App;
