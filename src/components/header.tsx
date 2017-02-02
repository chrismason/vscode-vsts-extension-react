import * as React from "react";

import { SearchBox } from "office-ui-fabric-react/lib-amd/SearchBox";
import { Button, ButtonType } from "office-ui-fabric-react/lib-amd/Button";

export interface IHeaderProps {
    title: string;
    createNewStream: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    allowItemCreation: boolean;
}

export class Header extends React.Component<IHeaderProps, null> {
    constructor(props?: IHeaderProps) {
        super(props);
    }

    public render(): JSX.Element {
        let rightHeader: JSX.Element = null;
        if (this.props.allowItemCreation) {
            rightHeader =
                <div className="title-right">
                    <Button buttonType={ButtonType.primary} onClick={this.props.createNewStream}>Create new stream</Button>
                </div>;
        }
        return (
            <div className="value-streams hub-title">
                <div className="title-left">
                    {this.props.title}
                </div>
                {rightHeader}
            </div>
        );
    }
}