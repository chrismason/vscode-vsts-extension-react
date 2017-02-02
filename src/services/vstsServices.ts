/// <reference types="vss-web-extension-sdk" />

import Q = require("q");
import { IValueStream } from "../models/models";

export class VSTSServices {
    private valueStreams: IValueStream[];

    constructor() {
        this.valueStreams = new Array();
    }

    refreshvalueStreams(): IPromise<IValueStream[]> {
        let defer = Q.defer<IValueStream[]>();
        setTimeout(() => {
            defer.resolve(this.valueStreams);
        }, 2000);
        return defer.promise;
    }

    addValueStream(valueStream: IValueStream): IPromise<IValueStream[]> {
        let defer = Q.defer<IValueStream[]>();
        setTimeout(() => {
            valueStream.id = this.valueStreams.length + 1;
            this.valueStreams.push(valueStream);
            defer.resolve(this.valueStreams);
        }, 1000);
        return defer.promise;
    }

    updateValueStream(valueStream: IValueStream): IPromise<IValueStream[]> {
        let defer = Q.defer<IValueStream[]>();
        setTimeout(() => {
            let existingStreams = this.valueStreams.filter(vs => vs.id === valueStream.id);
            if (existingStreams.length > 0) {
                let vs = existingStreams[0];
                vs.title = valueStream.title;
                vs.description = valueStream.description;
            }
            defer.resolve(this.valueStreams);
        }, 1000);
        return defer.promise;
    }
}