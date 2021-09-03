import React, { useReducer } from "react";
import "./App.css";
import "../SelectionBar/Index";
import SelectionBar from "../SelectionBar/Index";
import Grid from "../Grid/Index";
import reducer from "../../reducer";
import { generateGrid } from "../../helpers";

const initialState = {
    speed: 100,
    numberOfRows: 10,
    numberOfColumns: 16,
    numberOfNodes: 20,
};

initialState.occupied = generateGrid(
    initialState.numberOfRows,
    initialState.numberOfColumns,
    initialState.numberOfNodes
);

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
