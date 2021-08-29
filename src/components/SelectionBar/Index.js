import React, { useContext } from "react";
import { AppContext } from "../App/App";
import "./Index.css";
import { sum } from "lodash";

export default function SelectionBar() {
    const { state, dispatch } = useContext(AppContext);

    const speedSliderIntervals = [
        { 1: "10" },
        { 2: "50" },
        { 5: "100" },
        { 10: "300" },
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

    console.log(sliderValueToSpeed);
    console.log(speedSliderPoints);

    return (
        <div className="selection">
            <h1 className="selection-title">Dijkstra Visualizer</h1>
            <div className="slider-frame">
                <input
                    type="range"
                    id="speed_slider"
                    name="speed_slider"
                    min={1}
                    max={sliderValueToSpeed.length}
                    className="slider"
                ></input>
            </div>
        </div>
    );
}
