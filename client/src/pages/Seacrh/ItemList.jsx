import React from 'react';

const ItemList = ({ items }) => {
    return (
        <ul>
            {items.map((item) => {
                <li key={item._id}>{item.name}</li>
            })}
        </ul>

    )
}

export default ItemList;