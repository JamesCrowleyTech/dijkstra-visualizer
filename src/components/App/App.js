import React, { useReducer, useEffect } from "react";
import "./App.css";
import "../SelectionBar/Index";
import SelectionBar from "../SelectionBar/Index";
import Grid from "../Grid/Index";
import Tutorial from "../Tutorial/Index";
import reducer from "../../reducer";
import { generateGrid } from "../../helpers";

const initialState = {
    speed: 100,
    numberOfRows: 30,
    numberOfColumns: 50,
    numberOfNodes: 20,
    shouldCreateNodes: false,
    isRunning: false,
};

initialState.gridMap = generateGrid(
    initialState.numberOfRows,
    initialState.numberOfColumns,
    initialState.numberOfNodes,
    initialState.shouldCreateNodes
);

const AppContext = React.createContext(initialState);

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="app">
            <AppContext.Provider value={{ state, dispatch }}>
                <Tutorial />
                <SelectionBar />
                <Grid />
            </AppContext.Provider>
        </div>
    );
}

export { AppContext };

export default App;
