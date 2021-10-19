const getNthIndexOf = (string, searchTerm, n) => {
    let i = 0, index = 0;

    while(i < n && index >= 0) {
        index = string.indexOf(searchTerm, index + 1);
        i++;
    }

    return index;
}

export const removeTimezoneFromDateString = (dateString) => {
    const index = getNthIndexOf(dateString, " ", 5);
    const res = dateString.slice(0, index);
    return res;
} 
