import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../../server';
import Search from './search';


const searchRoute = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {

            const fetchData = (async () => {
                const response = await axios.get(`${server}movie/get-all-movie`);
                setItems(response.data)
            })
        } catch (error) {
            console.error('Error getting movies list', error)

        }
    }, []);

    const handleSearch = async (query) => {
        /* `searchQuery(query);` is calling the `searchQuery` function and passing the `query` parameter to it. However, there seems to be a typo in the code. It should be `setSearchQuery(query);` instead of `searchQuery(query);`. */
        setSearchQuery(query);
        try {
            const response = await axios.get(`${server}movie/seacrh?search=${query}`);
            setItems(response.data)
        } catch (error) {
            console.error('Error searching', error);

        }
    }
    return (
        <div>searchRoute

            <h1>Search Example</h1>
            <Search handleSearch={handleSearch} />
            <ItemList items={items} />
        </div>
    )
}

export default searchRoute;