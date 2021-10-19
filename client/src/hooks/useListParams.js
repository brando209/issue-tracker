import { useState, useEffect } from 'react';
import { setLocalParamStorage, getLocalParamStorage } from '../utility/local/paramStorage';

function useListParams(initialParams) {
    const [listParams, setListParams] = useState(initialParams);

    // Check local storage for list params, if none then set to initialParams prop
    useEffect(() => {
        const store = getLocalParamStorage();
        if(!store) {
            setLocalParamStorage(initialParams);
        } else {
            setListParams(store);
        }
    // eslint-disable-next-line
    }, []);

    // Save updated list params to local storage
    useEffect(() => {
        setLocalParamStorage(listParams);
    }, [listParams]);

    function handleChange(param, value) {
        setListParams(prev => ({ ...prev, [param]: value}));
    }

    return [listParams, handleChange];
}

export default useListParams;