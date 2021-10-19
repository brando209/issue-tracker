import React from 'react';
import { useFilteredItems } from '../../../hooks/useFilteredItems';
import { useGroupedItems } from '../../../hooks/useGroupedItems';

import { Table } from 'react-bootstrap';

import './TableList.css';

const MyTable = (props) => (
    <Table bordered striped responsive className="table">
        <thead className="table-header">
            <tr className="table-header-group"><td colSpan="8">{props.groupName}</td></tr>
            <tr key="table-header">
                {
                    props.headerKeys.map(key => <th key={`table-header-${key}`}>{key}</th>)
                }
                <th></th>
            </tr>
        </thead>
        <tbody className="table-body">
            {
                props.data.map(item => (
                    <tr key={item.id}>
                        {
                            props.headerKeys.map(key => (
                                <td key={`${item.id}-${key}`}>{item[key]}</td>
                            ))
                        }
                        <td key={`${item.id}-options`}>
                            {props.children ? props.children(item) : null}
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
)

function TableList({ 
    listItems, 
    headerKeys, 
    groupKey = null, 
    groupValues = null, 
    orderBy = 'asc', 
    filter = null, 
    searchText = "", 
    searchKeys = [],
    renderButtons
}) {
    const filteredItems = useFilteredItems(listItems, filter, searchText, searchKeys);
    const groupedItems = useGroupedItems(filteredItems, groupKey);

    let groupNames = Object.keys(groupedItems);

    return groupedItems && (groupNames.length > 0) ? (
        groupNames.map(group => 
            <MyTable headerKeys={headerKeys} data={groupedItems[group]} groupName={group + 's'} >
                {renderButtons}
            </MyTable>
        )
    ) : (
        <MyTable headerKeys={headerKeys} data={groupedItems} groupName={"All"} >
            {renderButtons}
        </MyTable>
    )
}


export default TableList;