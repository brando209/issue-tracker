import { groupBy } from 'lodash';

export const useGroupedItems = (items, groupKey = null) => {
    if(!groupKey) return items;
    const groupedItems = groupBy(items, (value) => value[groupKey]);
    return groupedItems;
}
