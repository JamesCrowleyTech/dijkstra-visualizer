import React, { useState } from "react";
import "./Index.css";
import picture1 from "../../images/picture1.jpeg";
import picture2 from "../../images/picture2.jpeg";
import picture3 from "../../images/picture3.jpeg";

const pagesData = [
    {
        title: "Welcome To Dijkstra Visualizer",
        text: "This tutorial will walk you through dijkstra's algorithm, and how to use this visualizer",
        image: picture1,
    },
    {
        title: "Page 1",
        text: "This is page 1. Lorem ipsum dolor sit amet, sit ei audiam veritus, mei eu urbanitas consectetuer. Meliore vivendum deterruisset sed cu, ad eam graeci voluptatibus. Ad mei minimum fierent. Pri nobis verear ea, in aliquip conceptam pro. Cum diam solet philosophia cu, nec lorem dicunt et.",
        image: picture2,
    },
    {
        title: "Page 2",
        text: "This is page 2. Lorem ipsum dolor sit amet, modo veniam eu vix. Cum te dicat perfecto salutatus, at nostrud facilis imperdiet est. Est duis conceptam complectitur ex, sint minim eos id, ne sit tollit corpora. Sea fabulas suavitate at, vidit aliquam ne mel. Has an quot oratio, sed epicuri accusamus inciderint no. Ius repudiandae necessitatibus ea.",
        image: picture3,
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

                <p className="tutorial__text">{data.text}</p>
                <div className="tutorial__image-container">
                    <img className="tutorial__image" src={data.image}></img>
                </div>
            </div>
            <div className="tutorial__buttons">
                <button
                    className="tutorial__button"
                    type="button"
                    onClick={function () {}}
                >
                    {page === pagesData.length - 1
                        ? "Finish Tutorial!"
                        : "Skip Tutorial"}
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
