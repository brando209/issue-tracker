// Accepts an object and returns an array of strings needed for SET clause of SQL UPDATE statement
const makeUpdateArray = (updateObject) => {
    const keys = Object.keys(updateObject);
    const values = Object.values(updateObject);
    const result = [];
    for(let i = 0; i < keys.length; i++) result.push(`${keys[i]}='${values[i]}'`);
    return result;
}

module.exports = { makeUpdateArray }