/// <reference types="vss-web-extension-sdk" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ValueStreams } from "./containers/valueStreams";

import "./styles/main.scss";

export function init(containerId: string) {
    ReactDOM.render((
        <div className="hub-view">
            <ValueStreams />
        </div>
    ), document.getElementById(containerId));
}