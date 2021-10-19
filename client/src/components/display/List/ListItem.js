import React from 'react';

function ListItem({ item, render }) {
    return (
        <div className="list-item" >{render(item)}</div>
    )
}

export default ListItem;