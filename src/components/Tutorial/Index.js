import React, { useState } from "react";
import "./Index.css";
import picture1 from "../../images/picture1.jpeg";
import imageGenerate from "../../images/generate.png";
import imageRunDijkstra from "../../images/runDijkstra.png";
import videoSpeedSlider from "../../videos/speedSlider.mp4";

const pagesData = [
    {
        title: "Welcome To Dijkstra Visualizer",
        text: "This tutorial will walk you through dijkstra's algorithm, and how to use this visualizer.",
        // image: picture1,
    },
    {
        title: "How To Use This Visualizer: Step 1",
        text: 'First, click the "Generate" button at the top bar. This will generate a graph that Dijkstra\'s algorithm will be applied to.',
        image: imageGenerate,
    },
    {
        title: "Step 2",
        text: 'You can use the "speed" slider at the top bar to adjust the speed of the algorithm.',
        video: videoSpeedSlider,
    },
    {
        title: "Step 3",
        text: 'Next, click the "Run" button at the top bar. This will demonstrate the algorithm.',
        image: imageRunDijkstra,
    },
];

export default function Tutorial() {
    const [page, setPage] = useState(0);

    const data = pagesData[page];

    return (
        <div className="tutorial">
            <div className="tutorial__content">
                <h1 className="tutorial__title">{data.title}</h1>
                <h2 className="tutorial__page-number">
                    {page}/{pagesData.length - 1}
                </h2>

                {data.image && (
                    <div className="tutorial__image-container">
                        <img className="tutorial__image" src={data.image}></img>
                    </div>
                )}
                {data.video && (
                    <div className="tutorial__video-container">
                        <video className="tutorial__video" autoPlay loop>
                            <source src={data.video} type="video/mp4"></source>
                        </video>
                    </div>
                )}
                <p className="tutorial__text">{data.text}</p>
            </div>
            <div className="tutorial__buttons">
                <button
                    className="tutorial__button"
                    type="button"
                    onClick={function () {
                        document.querySelector(".tutorial").style.display = "none";
                    }}
                >
                    {page === pagesData.length - 1 ? "Finish Tutorial!" : "Skip Tutorial"}
                </button>
                <button
                    className="tutorial__button"
                    type="button"
                    onClick={function () {
                        if (page === pagesData.length - 1) return;
                        setPage(page + 1);
                    }}
                    style={{
                        visibility: page === pagesData.length - 1 ? "none" : "",
                        opacity: page === pagesData.length - 1 ? "0" : "",
                    }}
                >
                    Next Page
                </button>
                <button
                    className="tutorial__button"
                    type="button"
                    onClick={function () {
                        if (page === 0) return;
                        setPage(page - 1);
                    }}
                    style={{
                        visibility: page === 0 ? "hidden" : "",
                        opacity: page === 0 ? "0" : "",
                    }}
                >
                    Previous Page
                </button>
            </div>
        </div>
    );
}
