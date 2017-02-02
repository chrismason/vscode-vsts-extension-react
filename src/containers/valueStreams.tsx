import * as React from "react";
import * as ReactDOM from "react-dom";

import { Spinner, SpinnerType } from "office-ui-fabric-react/lib-amd/Spinner";

import { Header } from "../components/header";
import { NoData } from "../components/nodata";
import { VSForm } from "../components/vsform";
import { VSList } from "../components/vsList";

import { IValueStream, FormMode } from "../models/models";
import { VSTSServices } from "../services/vstsServices";

export interface IValueStreamsState {
    streams?: IValueStream[];
    activeStream: IValueStream;
    isLoading: boolean;
    currentMode: FormMode;
}

export class ValueStreams extends React.Component<null, IValueStreamsState> {
    private service: VSTSServices;
    constructor(props?) {
        super(props);
        this.service = new VSTSServices();
        this.state = this._getInitialState();
    }

    componentDidMount() {
        this._refreshData();
    }

    public render(): JSX.Element {
        let content: JSX.Element = null;
        if (this.state.isLoading) {
            content =
                <div className="loader">
                    <Spinner type={SpinnerType.large} />
                </div>;
        } else if (this.state.currentMode === FormMode.CreateNew || this.state.currentMode === FormMode.Edit) {
            content = <VSForm currentStream={this.state.activeStream} submitValueStream={this._onSubmitValueStream.bind(this)} mode={this.state.currentMode} />;
        } else {
            if (this.state.streams && this.state.streams.length > 0) {
                content = <VSList streams={this.state.streams} editStream={this._onEditStream.bind(this)} />;
            } else {
                content = <NoData createNewStream={this._onCreateNewStream.bind(this)} />;
            }
        }
        return (
            <div>
                <Header title="Value Streams" createNewStream={this._onCreateNewStream.bind(this)} allowItemCreation={this.state.currentMode === FormMode.None && !this.state.isLoading} />
                <div className="hub-content">
                    {content}
                </div>
            </div>
        );
    }

    private _onEditStream(stream: IValueStream) {
        this.state.activeStream = stream;
        this.state.currentMode = FormMode.Edit;
        this.setState(this.state);
    }

    private _refreshData() {
        this.state.isLoading = true;
        this.service.refreshvalueStreams().then(streams => {
            this.state.streams = streams;
            this.state.isLoading = false;
            this.setState(this.state);
        });
        this.setState(this.state);
    }

    private _onSubmitValueStream(ev: React.MouseEvent<HTMLButtonElement>) {
        ev.preventDefault();
        this.state.isLoading = true;
        if (this.state.currentMode === FormMode.CreateNew) {
            this.service.addValueStream(this.state.activeStream).then(streams => {
                this.state.streams = streams;
                this.state.isLoading = false;
                this.setState(this.state);
            });
        } else if (this.state.currentMode === FormMode.Edit) {
            this.service.updateValueStream(this.state.activeStream).then(streams => {
                this.state.streams = streams;
                this.state.isLoading = false;
                this.setState(this.state);
            });
        }
        this.state.currentMode = FormMode.None;
        this.setState(this.state);
    }

    private _onCreateNewStream(ev: React.MouseEvent<HTMLButtonElement>) {
        this.state.currentMode = FormMode.CreateNew;
        ev.preventDefault();
        this.state.activeStream = {
            title: "",
            description: ""
        };
        this.setState(this.state);
    }

    private _getInitialState(): IValueStreamsState {
        return {
            currentMode: FormMode.None,
            activeStream: {
                title: "",
                description: ""
            },
            isLoading: false
        };
    }
}
