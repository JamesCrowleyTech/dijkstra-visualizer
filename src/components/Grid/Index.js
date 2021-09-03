import React, { useContext, useEffect } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

export default function Grid() {
    const { state, dispatch } = useContext(AppContext);

    console.log(state.occupied);

    const numberOfRows = state.numberOfRows;
    const numberOfColumns = state.numberOfColumns;
    const numberOfNodes = state.numberOfNodes;

    const occupied = [];
    for (let i = 0; i < numberOfRows; i++) {
        const row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(false);
        }
        occupied.push(row);
    }

    return (
        <div className="section-grid">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
                    gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
                }}
            >
                {Array.apply(null, Array(numberOfNodes)).map(function (_, i) {
                    let isPositionDetermined = false;
                    let potentialRow = Math.floor(Math.random() * numberOfRows);
                    let potentialColumn = Math.floor(
                        Math.random() * numberOfColumns
                    );

                    while (!isPositionDetermined) {
                        if (occupied[potentialRow][potentialColumn]) {
                            potentialRow = Math.floor(
                                Math.random() * numberOfRows
                            );
                            potentialColumn = Math.floor(
                                Math.random() * numberOfColumns
                            );
                        } else {
                            occupied[potentialRow][potentialColumn] = true;
                            isPositionDetermined = true;
                        }
                    }

                    return (
                        <div
                            className="grid-item"
                            key={i}
                            style={{
                                gridRow: `${potentialRow + 1} / ${
                                    potentialRow + 2
                                }`,
                                gridColumn: `${potentialColumn + 1} / ${
                                    potentialColumn + 2
                                }`,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
