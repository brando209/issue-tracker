import { mapValues, pickBy, includes } from 'lodash';

export const useFilteredItems = (items, filter = null, searchText = "", searchKeys = []) => {
    if(!filter) return items;
    
    // Maps property keys of 'filter' prop to an array containing the values that are not being filtered out
    const allowedValues = mapValues(filter, (obj) => {
        const selectedFilters = pickBy(obj, (value) => value === true);
        return Object.keys(selectedFilters);
    });
    
    const filteredItems = items && items.length > 0 && items.filter(item => {
        const allowedKeys = Object.keys(allowedValues);
        let isAllowed = true;
        // Filter out items based on the current filter
        for(let key of allowedKeys) {
            if(includes(allowedValues[key], item[key]) === false) {
                isAllowed = false;
            }
        }
        // Also, filter out items not matching the current search (item['searchKeys'] !== 'searchText')
        if(isAllowed && searchText !== "") {
            for(let key of searchKeys) {
                if(includes(item[key].toLowerCase(), searchText.toLowerCase()) === true) {
                    isAllowed = true;
                    break;
                } else isAllowed = false;
            }
        }
        return isAllowed;
    });

    return filteredItems ? filteredItems : items;
}