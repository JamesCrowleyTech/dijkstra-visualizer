import React, { useReducer, useEffect } from "react";
import "./App.css";
import "../SelectionBar/Index";
import SelectionBar from "../SelectionBar/Index";
import Grid from "../Grid/Index";
import reducer from "../../reducer";
import { generateGrid } from "../../helpers";

const initialState = {
    speed: 100,
    numberOfRows: 23,
    numberOfColumns: 30,
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

setTimeout(() => console.log(initialState.speed), 10000);

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const logState = () => console.log(state);

    // const interval = setInterval(logState, 1000);

    useEffect(function () {
        console.log("app did render");
        console.log(state);
        // console.log("sdlgkbh");
        // clearInterval(interval);
    });

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
