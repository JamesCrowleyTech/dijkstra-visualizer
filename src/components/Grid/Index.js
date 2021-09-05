import React, { useContext, useEffect } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

export default function Grid() {
    const { state, dispatch } = useContext(AppContext);

    const { numberOfNodes, numberOfColumns, numberOfRows, gridMap } = state;

    console.log(state.gridMap);

    const occupiedIndices = [];

    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            if (gridMap[i][j]) occupiedIndices.push([i, j]);
        }
    }
    console.log(occupiedIndices);

    return (
        <div className="section-grid">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
                    gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
                }}
            >
                {occupiedIndices.map(function ([y, x], i) {
                    return (
                        <div
                            className="grid-item"
                            id={`grid-item--${i}`}
                            key={i}
                            style={{
                                gridRow: `${y + 1} / ${y + 2}`,
                                gridColumn: `${x + 1} / ${x + 2}`,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
