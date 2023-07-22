/**
 * forEach、map的promise处理
 * 1. 使用Promise.all
 * 2. 使用for/for...of
 * @param {*} array 
 */
async function processArray(array) {
    await Promise.all(array.map(async (item) => {
        await asyncFunction(item);
    }));
};

async function asyncFunction() {

}