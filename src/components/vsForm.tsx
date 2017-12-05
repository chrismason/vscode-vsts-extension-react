import * as React from "react";

import { Label } from "office-ui-fabric-react/lib-amd/Label";
import { Button, ButtonType } from "office-ui-fabric-react/lib-amd/Button";
import { TextField } from "office-ui-fabric-react/lib-amd/TextField";

import { IValueStream, FormMode } from "../models/models";

export interface IVSFormProps {
    currentStream: IValueStream;
    submitValueStream: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    mode: FormMode
}

export interface IVSFormState {
    formValid: boolean;
}

export class VSForm extends React.Component<IVSFormProps, IVSFormState> {
    constructor(props?: IVSFormProps) {
        super(props);
        this.state = this._getInitialState();
    }

    render(): JSX.Element {
        let title = "";
        let buttonText = "";
        if (this.props.mode === FormMode.CreateNew) {
            title = "New Value Stream";
            buttonText = "Create";
        } else if (this.props.mode === FormMode.Edit) {
            title = "Modify Value Stream";
            buttonText = "Update";
        }
        return (
            <div className="form-container">
                <div className="vsform">
                    <div className="form-header ms-font-xxl">
                        {title}
                    </div>
                    <div className="form-line">
                        <TextField label="Title" value={this.props.currentStream.title} onChanged={this._onTitleChanged.bind(this)} placeholder="Enter a value stream title" required />
                    </div>
                    <div className="form-line">
                        <TextField label="Description" value={this.props.currentStream.description} onChanged={this._onDescriptionChanged.bind(this)} placeholder="Describe the value stream" multiline resizable={false} />
                    </div>
                    <div className="form-create">
                        <Button buttonType={ButtonType.primary} disabled={!this.state.formValid} onClick={this.props.submitValueStream}>{buttonText}</Button>
                    </div>
                </div>
            </div>
        );
    }

    private _onTitleChanged(text: string) {
        if (this.props.currentStream) {
            this.props.currentStream.title = text;
            let valid = false;
            if (this.props.currentStream.title.length > 0) {
                valid = true;
            } else {
                valid = false;
            }
            this.setState({ formValid: valid });
        }
    }

    private _onDescriptionChanged(text: string) {
        if (this.props.currentStream) {
            this.props.currentStream.description = text;
        }
    }

    private _getRequiredFieldErrorMessage(value: string): string {
        return value.length > 0 ? "" : "This field is required."
    }

    private _getInitialState(): IVSFormState {
        return {
            formValid: false
        };
    }
}