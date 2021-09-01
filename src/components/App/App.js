import React, { useReducer } from "react";
import "./App.css";
import "../SelectionBar/Index";
import SelectionBar from "../SelectionBar/Index";
import Grid from "../Grid/Index";
import reducer from "../../reducer";

const occupied = [];

const initialState = {
    speed: 100,
    numberOfRows: 10,
    numberOfColumns: 16,
    numberOfNodes: 20,
    occupied: [],
};

for (let i = 0; i < initialState.numberOfRows; i++) {
    const row = [];
    for (let j = 0; j < initialState.numberOfColumns; j++) {
        row.push(false);
    }
    initialState.occupied.push(row);
}

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
