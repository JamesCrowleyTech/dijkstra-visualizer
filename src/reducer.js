import React from "react";

export default function reducer(state, action) {
    if (action.type === "SET_SPEED_SLIDER_POSITION")
        return { ...state, speedSliderPosition: action.payload };
}
