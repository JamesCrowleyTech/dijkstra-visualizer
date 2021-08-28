import React from "react";
import "./Index.css";

export default function Grid() {
    const numberOfRows = 10;
    const numberOfColumns = 16;
    const numberOfNodes = 20;

    const occupied = [];
    for (let i = 0; i <= numberOfRows; i++) {
        const row = [];
        for (let j = 0; j <= numberOfColumns; j++) {
            row.push(false);
        }
        occupied.push(row);
    }

    return (
        <div className="section-grid">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns}, 1fr) 0px`,
                    gridTemplateRows: `repeat(${numberOfRows}, 1fr) 0px`,
                }}
            >
                {Array.apply(null, Array(numberOfNodes)).map(function (_, i) {
                    let isPositionDetermined = false;
                    let potentialRow = Math.floor(
                        Math.random() * (numberOfRows + 1)
                    );
                    let potentialColumn = Math.floor(
                        Math.random() * (numberOfColumns + 1)
                    );

                    while (!isPositionDetermined) {
                        if (occupied[potentialRow][potentialColumn]) {
                            potentialRow = Math.floor(
                                Math.random() * (numberOfRows + 1)
                            );
                            potentialColumn = Math.floor(
                                Math.random() * (numberOfColumns + 1)
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
