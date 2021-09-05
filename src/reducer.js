import React from "react";
import { generateGrid } from "./helpers.js";

export default function reducer(state, action) {
    if (action.type === "SET_SPEED") return { ...state, speed: action.payload };
    if (action.type === "NEW_GRID") {
        return {
            ...state,
            gridMap: generateGrid(
                state.numberOfRows,
                state.numberOfColumns,
                state.numberOfNodes
            ),
        };
    }
}
