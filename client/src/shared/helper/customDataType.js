const Convert = (obj, keyIncludeId) => {
    const newObj = {
        ...obj,
    }
    keyIncludeId.forEach(k => {
        const value = obj[k]
        return Object.assign(newObj, {[k]: { $oid: value }})
    });
    return newObj;
}

export const Custom = (data) => {
    const objSample = data[0];
    const keyObj = Object.keys(objSample);
    const keyIncludeId = keyObj.filter(k => k.includes('_id'));
    const convertedArr = data.map(obj => Convert(obj, keyIncludeId));
    return convertedArr;
};