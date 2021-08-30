import React, { useState, useEffect } from "react";
import "./Index.css";

export default function SelectionBar() {
    const [speedSliderValue, setSpeedSliderValue] = useState(2);

    const speedSliderIntervals = [
        { 1: "10" },
        { 2: "50" },
        { 5: "100" },
        { 10: "300" },
        { 100: "1000" },
        { 1000: "10000" },
    ];

    let speedSliderPoints = 0;
    let speedSliderPosition = 1;
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
        const speedSlider = document.getElementById("speed_slider");
        console.log(speedSlider);
        const speedSliderListener = function () {
            console.log(speedSliderValue);
            setSpeedSliderValue(sliderValueToSpeed[this.value]);
        };

        speedSlider.addEventListener(
            "input",
            speedSliderListener.bind(speedSlider)
        );

        return function () {
            speedSlider.removeEventListener("input", speedSliderListener);
        };
    }, [speedSliderValue]);

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
                <h1>{sliderValueToSpeed[speedSliderPosition]}</h1>
            </div>
        </div>
    );
}
