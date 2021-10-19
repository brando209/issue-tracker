import { useState, useEffect } from 'react';
import axios from 'axios';

function useResource(path, authToken, forkedPaths = null) {
    const [resource, setResource] = useState({
        data: [],
        isLoading: false,
        isError: false
    });

    const [refresh, setRefresh] = useState(false);

    const getResource = () => setRefresh(prev => !prev);

    useEffect(() => {

        const fetchResource = async () => {
            setResource({ data: [], isLoading: true, isError: false });
            try {
                const headers = authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
                let response;
                if(forkedPaths) {
                    if(forkedPaths.length === 0) return setResource({ data: [], isLoading: false, isError: false });
                    
                    const promises = [];
                    forkedPaths.forEach(fork => {
                        promises.push(axios.get(path + "/" + fork, { headers }));
                    });

                    response = await Promise.all(promises);

                    const responseData = response.map(res => ({
                        filename: res.headers['content-filename'],
                        data: res.data
                    }));

                    setResource({ data: responseData, isLoading: false, isError: false });
                } else {
                    response = await axios.get(path, { headers });
                    setResource({ data: response.data, isLoading: false, isError: false });
                }

            } catch(err) {
                console.log(err);
                setResource({ data: err, isLoading: false, isError: true })
            }
        }

        fetchResource();

    }, [path, authToken, refresh]);

    return [resource, setResource, getResource];
}

export default useResource;