const fs = require('fs')

const fakeData = () => {
    let s = '\
[ Some text... ]\
';
    
    const json = JSON.stringify(s); console.log(json);
    // fs.writeFile(
    //     'data/samples/result.json',
    //     json,
    //     (err, data) => {
    //         if (err) throw err;
    //         console.log('write file successfully: ', json);
    //     }
    // );
};

module.exports = fakeData;