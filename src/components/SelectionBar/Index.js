import React, { useState, useEffect, useContext } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

const findSliderValue = function (valuesToSpeed, num) {
    if (num >= valuesToSpeed[valuesToSpeed.length - 1]) {
        return valuesToSpeed[valuesToSpeed.length - 1];
    }

    return valuesToSpeed.findIndex(function (_, i) {
        return valuesToSpeed[i] <= num && num < valuesToSpeed[i + 1];
    });
};

const speedSliderIntervals = [
    { 1: "4" },
    { 2: "10" },
    { 5: "40" },
    { 10: "100" },
    { 20: "200" },
    { 50: "500" },
    { 100: "1000" },
    { 250: "3000" },
    { 1000: "10000" },
];

let speedSliderPoints = 0;
const sliderValueToSpeed = [];

speedSliderIntervals.forEach(function (pair, i) {
    const [[n, v]] = Object.entries(pair);
    if (i === 0) {
        speedSliderPoints += Math.round(parseInt(v) / n);
        for (let j = 1; j <= parseInt(v); j += parseInt(n)) {
            sliderValueToSpeed.push(j);
        }
    } else {
        // prettier-ignore
        const prev = Object.entries(speedSliderIntervals[i - 1])
        speedSliderPoints += (parseInt(v) - parseInt(prev[0][1])) / n;
        for (let j = parseInt(prev[0][1]) + parseInt(n); j <= parseInt(v); j += parseInt(n)) {
            sliderValueToSpeed.push(j);
        }
    }
});

export default function SelectionBar() {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        const speedSlider = document.getElementById("speed_slider");
        const generateButton = document.getElementById("button-generate");
        speedSlider.value = findSliderValue(sliderValueToSpeed, 100);
        const speedSliderListener = function () {
            dispatch({
                type: "SET_SPEED",
                payload: sliderValueToSpeed[this.value],
            });
        };

        const generateListener = function () {
            dispatch({ type: "SET_SHOULDCREATENODES_TRUE", payload: null });
            dispatch({ type: "NEW_GRID", payload: null });
        };

        generateButton.addEventListener("click", generateListener);

        speedSlider.addEventListener("input", speedSliderListener.bind(speedSlider));

        return function () {
            speedSlider.removeEventListener("input", speedSliderListener);
            generateListener.removeEventListener("click", generateListener);
        };
    }, []);

    return (
        <div className="selection">
            <h1 className="selection-title">Dijkstra Visualizer</h1>
            <button type="button" className="button-generate" id="button-generate">
                GENERATE!
            </button>

            <button type="button" className="button-run" id="button-run">
                RUN DIJKSTRA!
            </button>
            <div className="slider-container">
                <h2 className="slider-title">Speed:</h2>
                <div className="slider-frame">
                    <input
                        type="range"
                        id="speed_slider"
                        name="speed_slider"
                        min={0}
                        max={sliderValueToSpeed.length - 1}
                        className="slider"
                    ></input>
                </div>

                <h2 className="slider-display">{state.speed}%</h2>
            </div>
            <div className="key-container">
                <h2 className="key-title">KEY</h2>
                <div className="key-item-container">
                    <h3 className="key-item-title">Node:</h3>
                    <div className="key-node"></div>
                </div>
                <div className="key-item-container">
                    <h3 className="key-item-title">Start Node:</h3>
                    <div className="key-node key-source"></div>
                </div>
                <div className="key-item-container">
                    <h3 className="key-item-title">End Node:</h3>
                    <div className="key-node key-destination"></div>
                </div>
                <div className="key-item-container">
                    <h3 className="key-item-title">Edge:</h3>
                    <div className="key-edge "></div>
                </div>
                <div className="key-item-container">
                    <h3 className="key-item-title">Searching Edge:</h3>
                    <div className="key-edge key-edge-searching"></div>
                </div>
                <div className="key-item-container">
                    <h3 className="key-item-title">Best Path Edge:</h3>
                    <div className="key-edge key-edge-best"></div>
                </div>
            </div>
        </div>
    );
}
