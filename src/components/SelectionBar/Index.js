import React, { useState, useEffect, useContext } from "react";
import "./Index.css";
import { AppContext } from "../App/App.js";

export default function SelectionBar() {
    const { state, dispatch } = useContext(AppContext);
    const speedSliderIntervals = [
        { 1: "4" },
        { 2: "10" },
        { 5: "60" },
        { 20: "200" },
        { 50: "500" },
        { 100: "1000" },
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
            for (
                let j = parseInt(prev[0][1]) + parseInt(n);
                j <= parseInt(v);
                j += parseInt(n)
            ) {
                sliderValueToSpeed.push(j);
            }
        }
    });

    useEffect(() => {
        console.log(speedSliderPoints);
        const speedSlider = document.getElementById("speed_slider");
        const speedSliderListener = function () {
            console.log(state.speed);
            dispatch({
                type: "SET_SPEED",
                payload: sliderValueToSpeed[this.value],
            });
        };

        speedSlider.addEventListener(
            "input",
            speedSliderListener.bind(speedSlider)
        );

        return function () {
            speedSlider.removeEventListener("input", speedSliderListener);
        };
    }, []);

    return (
        <div className="selection">
            <h1 className="selection-title">Dijkstra Visualizer</h1>
            <div className="speed-container">
                <h2 className="speed-title">Speed:</h2>
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

                <h2 className="speed-display">{state.speed}%</h2>
            </div>
        </div>
    );
}
