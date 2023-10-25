import React from 'react';

import { RequestRow } from '../store/RequestStore';

const RequestRowItem = (props: { requestRow: RequestRow, index: number }) => {

    const { requestRow, index } = props;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{requestRow.article}</td>
            <td>{requestRow.description}</td>
            <td>{requestRow.count}</td>
            <td>{requestRow.cost}</td>
            <td>{requestRow.discount}</td>
            <td>{requestRow.total}</td>
            <td>{requestRow.file}</td>
        </tr>
    );
};

export default RequestRowItem;