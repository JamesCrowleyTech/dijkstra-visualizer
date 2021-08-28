import React from "react";
import "./Index.css";

export default function SelectionBar() {
    return (
        <div className="selection">
            <h1>Dijkstra Visualizer</h1>
            <div className="slider-frame">
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    min="0"
                    max="1000"
                    className="slider"
                ></input>
            </div>
            <div className="slider-frame">
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    min="0"
                    max="1000"
                    className="slider"
                ></input>
            </div>
        </div>
    );
}
