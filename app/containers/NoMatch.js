import React from "react";
import {Redirect} from "react-router-dom";
export const NoMatch = (props) => (
    <Redirect to={{state: {noMatch: true}}} />
)