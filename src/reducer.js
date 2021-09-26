import React from "react";
import { generateGrid } from "./helpers.js";

export default function reducer(state, action) {
    if (action.type === "SET_SPEED") {
        console.log("reduce this!, huh?");
        return { ...state, speed: action.payload };
    }
    if (action.type === "NEW_GRID") {
        return {
            ...state,
            gridMap: generateGrid(
                state.numberOfRows,
                state.numberOfColumns,
                state.numberOfNodes,
                state.shouldCreateNodes
            ),
        };
    }
    if (action.type === "SET_SHOULDCREATENODES_TRUE") {
        return {
            ...state,
            shouldCreateNodes: true,
        };
    }
    if (action.type === "TOGGLE_ISRUNNING") {
        return {
            ...state,
            isRunning: !state.isRunning,
        };
    }
}
