import React, { useState, useContext, useEffect } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

export default function Grid() {
    const { state, dispatch } = useContext(AppContext);

    const { numberOfNodes, numberOfColumns, numberOfRows, gridMap } = state;

    let [gridWidth, setGridWidth] = useState(null);
    let [gridHeight, setGridHeight] = useState(null);
    let [isGridLoaded, setIsGridLoaded] = useState(false);

    useEffect(
        function () {
            const mainGrid = document.querySelector(".grid");

            setIsGridLoaded(true);
            setGridWidth(mainGrid.offsetWidth);
            setGridHeight(mainGrid.offsetHeight);

            const handleResize = function () {
                setGridWidth(mainGrid.offsetWidth);
                setGridHeight(mainGrid.offsetHeight);
            };

            window.addEventListener("resize", handleResize);

            return function () {
                window.removeEventListener("resize", handleResize);
            };
        },
        [gridWidth, gridHeight, isGridLoaded]
    );

    return (
        <div className="section-grid">
            <div className="grid-container">
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
                    {state.gridMap
                        .flat()
                        .filter((_) => _)
                        .map(function (node) {
                            return node.edges.map(function (edge) {
                                const [y1, x1, y2, x2] = [
                                    node.row,
                                    node.column,
                                    ...edge,
                                ];
                                const grid = document.querySelector(".grid");

                                if (!grid) return null;

                                // console.log([y1, x1, y2, x2]);
                                // console.log(gridHeight / state.numberOfRows);
                                // console.log(gridWidth / state.numberOfColumns);
                                // console.log(
                                //     (gridHeight / state.numberOfRows) *
                                //         Math.abs(y1 - y2)
                                // );
                                // console.log(
                                //     (gridWidth / state.numberOfColumns) *
                                //         Math.abs(x1 - x2)
                                // );

                                console.log(
                                    Math.sqrt(
                                        ((gridHeight / state.numberOfRows) *
                                            Math.abs(y1 - y2)) **
                                            2 +
                                            ((gridWidth /
                                                state.numberOfColumns) *
                                                Math.abs(x1 - x2)) **
                                                2
                                    )
                                );

                                return (
                                    <div
                                        className="edge"
                                        style={{
                                            // prettier-ignore
                                            width: `${Math.sqrt(((gridHeight / state.numberOfRows) * Math.abs(y1 - y2)) ** 2 + ((gridWidth / state.numberOfColumns) * Math.abs(x1 - x2) ** 2))}px`,
                                            // width: `${gridWidth*gridHeight}px`,
                                            // width: `${
                                            //     (gridWidth + gridHeight) * 0.2
                                            // }px`,
                                            // prettier-ignore
                                            top: `${`${(y1 + .5)* (gridHeight / state.numberOfRows)}px`}`,
                                        }}
                                        key={`${y1}${y2}${x1}${x2}`}
                                    ></div>
                                );
                            });
                        })}
                </div>
            </div>
        </div>
    );
}
