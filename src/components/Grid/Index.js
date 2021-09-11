import React, { useContext, useEffect } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

export default function Grid() {
    const { state, dispatch } = useContext(AppContext);

    const { numberOfNodes, numberOfColumns, numberOfRows, gridMap } = state;

    // console.log(state.gridMap);

    // const occupiedIndices = [];

    // for (let i = 0; i < numberOfRows; i++) {
    //     for (let j = 0; j < numberOfColumns; j++) {
    //         if (gridMap[i][j]) occupiedIndices.push([i, j]);
    //     }
    // }
    // console.log(occupiedIndices);

    console.log(state);

    return (
        <div className="section-grid">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
                    gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
                }}
            >
                {state.gridMap
                    .flat()
                    .filter((_) => _)
                    .map(function (node) {
                        return (
                            <div
                                className="grid-item"
                                id={`grid-item--${node.gridId}`}
                                key={node.gridId}
                                style={{
                                    gridRow: `${node.row + 1} / ${
                                        node.row + 2
                                    }`,
                                    gridColumn: `${node.column + 1} / ${
                                        node.column + 2
                                    }`,
                                    backgroundColor: [
                                        node.source
                                            ? "yellow"
                                            : node.destination
                                            ? "blue"
                                            : "",
                                    ],
                                }}
                            ></div>
                        );
                    })}
            </div>
        </div>
    );
}
