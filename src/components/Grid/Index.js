import React, { useState, useContext, useEffect } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

import cloneDeep from "lodash.clonedeep";
import { isEmpty } from "lodash";
// import { runDijkstra } from "../../helpers";

export default function Grid() {
    const { state, dispatch } = useContext(AppContext);

    const runDijkstra = function () {
        const state = this;
        console.log(state);
        const slider = document.getElementById("speed_slider");
        const func = () => {
            console.log("slider changed");
            // dispatch({ type: "SET_SPEED", payload: 10 ** (Math.random() * 4) });
            console.log(state.speed);
        };
        slider.addEventListener("input", func);

        const allEdges = document.querySelectorAll(".edge");
        allEdges.forEach(function (edge) {
            edge.style.transition = "background-position 0s linear";
            edge.classList.remove("edge-traversing");
            edge.classList.remove("edge-final");
            setTimeout(
                () =>
                    (edge.style.transition = `background-position ${
                        (1 / state.speed) * 30
                    }s linear`),
                1
            );
        });

        const gridMap = state.gridMap;
        const allNodes = gridMap.flat().filter((node) => node);

        const sourceNode = allNodes.find((node) => node.source).gridId;

        const destinationNode = allNodes.find(
            (node) => node.destination
        ).gridId;

        const gridIdToNode = {};
        const gridEdgeIdToEdge = {};

        const predecessor = {};
        const shortestDistance = {};
        const graph = {};
        const path = [];

        const edges = document.querySelectorAll(".edge");

        edges.forEach(function (edge) {
            const id = edge.id;
            gridEdgeIdToEdge[`edge--${id.match(/\d+/g).join(",")}`] = edge;
        });

        allNodes.forEach(function (node) {
            gridIdToNode[node.gridId] = node;
            predecessor[node.gridId] = null;
            shortestDistance[node.gridId] = Number.POSITIVE_INFINITY;

            graph[node.gridId] = {};

            node.renderedEdges = {};

            node.edges.forEach(function (edge) {
                const coords = [node.row, node.column, ...edge];
                const edgeId = `edge--${coords.join(",")}`;
                const renderedEdge = gridEdgeIdToEdge[edgeId];
                graph[node.gridId][`node--${edge.join(",")}`] = parseFloat(
                    renderedEdge.style.width
                );
            });
        });

        const unVisitedNodes = cloneDeep(graph);

        shortestDistance[sourceNode] = 0;

        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        (async function () {
            await sleep(3);

            while (!isEmpty(unVisitedNodes)) {
                let minNodeId = null;

                Object.entries(unVisitedNodes).forEach(function ([
                    nodeId,
                    edges,
                ]) {
                    if (!minNodeId) minNodeId = nodeId;
                    else if (
                        shortestDistance[nodeId] < shortestDistance[minNodeId]
                    )
                        minNodeId = nodeId;
                });

                const minNode = graph[minNodeId];

                const matrixMinNode = gridIdToNode[minNodeId];

                Object.entries(minNode).forEach(function ([childNode, weight]) {
                    const edgeId = `edge--${matrixMinNode.row},${matrixMinNode.column},${gridIdToNode[childNode].row},${gridIdToNode[childNode].column}`;

                    const edge = gridEdgeIdToEdge[edgeId];
                    edge.classList.add("edge-traversing");

                    if (
                        weight + shortestDistance[minNodeId] <
                        shortestDistance[childNode]
                    ) {
                        shortestDistance[childNode] =
                            weight + shortestDistance[minNodeId];
                        predecessor[childNode] = minNodeId;
                    }
                });

                delete unVisitedNodes[minNodeId];

                console.log(state.speed);

                await sleep((1 / state.speed) * 30000);
            }

            let currNode = gridIdToNode[destinationNode];
            while (currNode.gridId !== sourceNode) {
                try {
                    path.unshift(currNode.gridId);
                    currNode = gridIdToNode[predecessor[currNode.gridId]];
                } catch {
                    throw new Error("Path unreachable");
                }
            }
            path.unshift(gridIdToNode[sourceNode].gridId);

            for (let i = 0; i < path.length - 1; i++) {
                const nums1 = path[i].match(/\d+/g).join(",");
                const nums2 = path[i + 1].match(/\d+/g).join(",");
                const edge = gridEdgeIdToEdge[`edge--${nums1},${nums2}`];
                edge.classList.add("edge-final");
                await sleep((1 / state.speed) * 30000);
            }

            slider.removeEventListener("input", func);
        })();
    };

    const { numberOfNodes, numberOfColumns, numberOfRows, gridMap } = state;

    let [gridWidth, setGridWidth] = useState(null);
    let [gridHeight, setGridHeight] = useState(null);
    let [isGridLoaded, setIsGridLoaded] = useState(false);

    useEffect(
        function () {
            const mainGrid = document.querySelector(".grid");

            console.log("grid did render");

            console.log(state);

            setIsGridLoaded(true);
            setGridWidth(mainGrid.offsetWidth);
            setGridHeight(mainGrid.offsetHeight);

            const handleResize = function () {
                setGridWidth(mainGrid.offsetWidth);
                setGridHeight(mainGrid.offsetHeight);
            };

            window.addEventListener("resize", handleResize);

            const btnRun = document.getElementById("button-run");

            const bindedDijkstra = runDijkstra.bind(state);

            btnRun.addEventListener("click", bindedDijkstra);

            console.log(state);

            return function () {
                window.removeEventListener("resize", handleResize);
                btnRun.removeEventListener("click", bindedDijkstra);
            };
        },
        [gridWidth, gridHeight, gridMap, state]
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
                                        id={`edge--${y1},${x1},${y2},${x2}`}
                                        className="edge"
                                        style={{
                                            // prettier-ignore
                                            width: `${hypotenuse}px`,

                                            // prettier-ignore
                                            left: `${`${((x1 + x2) / 2 + 0.5) * (gridWidth / numberOfColumns)}px`}`,

                                            // prettier-ignore
                                            top: `${`${((y1 + y2) / 2 + .5) * (gridHeight / numberOfRows)}px`}`,

                                            transform: `translateX(-50%) rotate(${rotation}deg)`,

                                            // transition: `all ${
                                            //     (1 / state.speed) * 30
                                            // }s linear`,
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
