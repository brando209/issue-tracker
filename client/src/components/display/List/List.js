import React from 'react';

import ListItem from './ListItem'
import ListItemGroup from './ListItemGroup';
import './List.css';
import { useFilteredItems } from '../../../hooks/useFilteredItems';
import { useGroupedItems } from '../../../hooks/useGroupedItems';


function List({ listItems, groupKey = null, groupValues = null, orderBy = 'asc', filter = null, searchText = "", searchKeys = [], render }) {

    const filteredItems = useFilteredItems(listItems, filter, searchText, searchKeys);
    const groupedItems = useGroupedItems(filteredItems, groupKey);

    const listComponents = () => {
        let listComponentArray;
        if(groupKey && groupValues) {
            const groupComponents = [];
            groupValues.forEach(value => {
                const values = groupedItems[value];
                groupComponents.push(<ListItemGroup key={`${groupKey}=${value}`} name={groupKey} value={value} items={values} render={render}/>);
            })
            listComponentArray = orderBy === 'desc' ? groupComponents.reverse() : groupComponents;
        } else {
            listComponentArray = filteredItems && filteredItems.map((item, idx) => <ListItem item={item} key={idx} keyValue={idx} render={render} />);
        }

        return listComponentArray;
    }

    return (
        <div className="list-container">
            { listComponents() }
        </div>
    )
}

export default List;