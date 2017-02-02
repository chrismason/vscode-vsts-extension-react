import * as React from "react";

import { Button, ButtonType } from "office-ui-fabric-react/lib-amd/Button";

export interface INoDataProps {
    createNewStream: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export class NoData extends React.Component<INoDataProps, null> {
    constructor(props?: INoDataProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div className="nodata">
                <div className="primary ms-font-xxl">
                    You have not added any value streams.
                </div>
                <div className="ms-font-m">
                    Once you create a value stream you will be able to add them to Work Items to track.
                </div>
                <div className="action">
                    <Button buttonType={ButtonType.primary} onClick={this.props.createNewStream}>Add a value stream</Button>
                </div>
            </div>
        );
    }
}