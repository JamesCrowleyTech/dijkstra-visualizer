import React, { useState, useContext, useEffect } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";
import { runDijkstra } from "../../helpers";

export default function Grid() {
    const { state, dispatch } = useContext(AppContext);

    const { numberOfNodes, numberOfColumns, numberOfRows, gridMap } = state;

    let [gridWidth, setGridWidth] = useState(null);
    let [gridHeight, setGridHeight] = useState(null);
    let [isGridLoaded, setIsGridLoaded] = useState(false);

    useEffect(
        function () {
            console.log("useeffect called");
            const mainGrid = document.querySelector(".grid");

            setIsGridLoaded(true);
            setGridWidth(mainGrid.offsetWidth);
            setGridHeight(mainGrid.offsetHeight);

            const handleResize = function () {
                setGridWidth(mainGrid.offsetWidth);
                setGridHeight(mainGrid.offsetHeight);
            };

            window.addEventListener("resize", handleResize);

            const btnRun = document.getElementById("button-run");

            const bindedRunDijkstra = runDijkstra.bind({ gridMap });

            btnRun.addEventListener("click", bindedRunDijkstra);

            return function () {
                window.removeEventListener("resize", handleResize);
                btnRun.removeEventListener("click", bindedRunDijkstra);
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
                    {gridMap
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
                    {gridMap
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
                                const heightDiff =
                                    (gridHeight / numberOfRows) *
                                    Math.abs(y1 - y2);
                                const widthDiff =
                                    (gridWidth / numberOfColumns) *
                                    Math.abs(x1 - x2);
                                const hypotenuse = Math.sqrt(
                                    widthDiff ** 2 + heightDiff ** 2
                                );

                                const radiansToDeg = 180 / Math.PI;

                                let rotation = 0;

                                if (x1 === x2 && y1 < y2) rotation = 90;
                                if (x1 === x2 && y1 > y2) rotation = 270;
                                if (y1 === y2 && x1 < x2) rotation = 0;
                                if (y1 === y2 && x1 > x2) rotation = 180;

                                if (x1 < x2 && y1 < y2)
                                    rotation =
                                        radiansToDeg *
                                        Math.asin(heightDiff / hypotenuse);

                                if (x1 < x2 && y1 > y2)
                                    rotation =
                                        radiansToDeg *
                                            Math.asin(widthDiff / hypotenuse) -
                                        90;

                                if (x1 > x2 && y1 < y2) {
                                    rotation =
                                        radiansToDeg *
                                            Math.asin(widthDiff / hypotenuse) +
                                        90;
                                }

                                if (x1 > x2 && y1 > y2) {
                                    rotation =
                                        radiansToDeg *
                                            Math.asin(heightDiff / hypotenuse) +
                                        180;
                                }

                                if (!grid) return null;

                                return (
                                    <div
                                        className="edge"
                                        style={{
                                            // prettier-ignore
                                            width: `${hypotenuse}px`,

                                            // prettier-ignore
                                            left: `${`${((x1 + x2) / 2 + 0.5) * (gridWidth / numberOfColumns)}px`}`,

                                            // prettier-ignore
                                            top: `${`${((y1 + y2) / 2 + .5) * (gridHeight / numberOfRows)}px`}`,

                                            transform: `translateX(-50%) rotate(${rotation}deg)`,
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
