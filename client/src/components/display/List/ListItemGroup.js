import React, { useState } from 'react';
import ListItem from './ListItem';

function ListItemGroup({ name, value, items, render }) {
    const [collapse, setCollapse] = useState(false);
    return (
        <div className={"list-item-group " + name }>
            <div className={"group-header " + (collapse ? "collapsed" : "")} onClick={() => setCollapse(prev => !prev)}>{value}</div>
            {
                collapse ? null :
                (items && items.length > 0) ? 
                    items.map((item, idx) => <ListItem key={`${value}-${idx}`} item={item} render={render} />)
                :
                    <div className="empty-group-message">There are no items to display for this group</div>
            }
        </div>
    )
}

export default ListItemGroup;