/// <reference types="vss-web-extension-sdk" />

import { IValueStream } from "../models/models";

export class VSTSServices {
    private valueStreams: IValueStream[];

    constructor() {
        this.valueStreams = new Array();
    }

    refreshvalueStreams(): Promise<IValueStream[]> {
        const promise = new Promise<IValueStream[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.valueStreams);
            }, 2000);
        });
        return promise;
    }

    addValueStream(valueStream: IValueStream): Promise<IValueStream[]> {
        const promise = new Promise<IValueStream[]>((resolve, reject) => {
            setTimeout(() => {
                valueStream.id = this.valueStreams.length + 1;
                this.valueStreams.push(valueStream);
                resolve(this.valueStreams);
            }, 1000);
        });
        return promise;
    }

    updateValueStream(valueStream: IValueStream): Promise<IValueStream[]> {
        const promise = new Promise<IValueStream[]>((resolve, reject) => {
            setTimeout(() => {
                let existingStreams = this.valueStreams.filter(vs => vs.id === valueStream.id);
                if (existingStreams.length > 0) {
                    let vs = existingStreams[0];
                    vs.title = valueStream.title;
                    vs.description = valueStream.description;
                }
                resolve(this.valueStreams);
            }, 1000);
        });
        return promise;
    }
}