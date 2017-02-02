import * as React from "react";

import { DetailsList, CheckboxVisibility, IColumn, DetailsListLayoutMode } from "office-ui-fabric-react/lib-amd/DetailsList";
import { Link } from "office-ui-fabric-react/lib-amd/Link";
import { ContextualMenu } from "office-ui-fabric-react/lib-amd/ContextualMenu";
import { IValueStream } from "../models/models";

export interface IVSListProps {
    streams?: IValueStream[];
    editStream: (stream: IValueStream) => void;
}

export interface IVSListState {
}

export class VSList extends React.Component<IVSListProps, IVSListState> {
    constructor(props?: IVSListProps) {
        super(props);
        this.state = this._getInitialState();
    }

    render(): JSX.Element {
        return (
            <div>
                <DetailsList
                    checkboxVisibility={CheckboxVisibility.hidden}
                    items={this.props.streams}
                    onRenderItemColumn={this._onRenderItemColumn.bind(this)}
                    onItemInvoked={this._onItemSelected.bind(this)} />
            </div>
        );
    }

    private _onItemSelected(item: IValueStream) {
        this.props.editStream(item);
    }

    private _onRenderItemColumn(item: IValueStream, index: number, column: IColumn) {
        if (column.key === "title") {
            return <Link data-selection-invoke={true}>{item[column.key]}</Link>;
        }
        return item[column.key];
    }

    private _getInitialState(): IVSListState {
        return {};
    }
}