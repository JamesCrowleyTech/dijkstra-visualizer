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
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="app">
            <AppContext.Provider value={{ state, dispatch }}>
                <SelectionBar />
                <Grid />
            </AppContext.Provider>
        </div>
    );
}

export { AppContext };

export default App;
