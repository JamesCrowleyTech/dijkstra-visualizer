import React from "react";

export default function reducer(state, action) {
    if (action.type === "SET_SPEED") return { ...state, speed: action.payload };
}
