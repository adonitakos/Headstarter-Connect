// File: /src/config/utils.js

/**
 * find all equivalent key-value pairs from a list of objects
 * (NOTE: for the purposes of this function, " "==="any string")
 * @param  {array} list [list.length>=1]
 * @return {object} [key-value pairs that appeared in ALL objects]
 */
export function overlapAvabls(list) {
    if(list.length===1)
        return list[0]
    else 
    {
        // Combine all objects in the list
        let merged = Object.assign({}, ...list);
        // Filter key-value pairs that appear in all objects
        for(let i=0; i<list.length; i++) {
            let obj = list[i];
            for(let key in merged) {
                if(!(key in obj))
                    delete merged[key];
                else if(obj[key] === " ")
                    continue                    
                else if(obj[key] !== merged[key]) {
                    if(merged[key] === " ")
                        merged[key]=obj[key];
                    else
                        delete merged[key];
                }
            }
        }
        return merged;
    }
}

/**
 * generates a random list of availability objects
 * @param  {int} total [>=1]
 * @return {array object} [returns a list such that each key is a day in the current month
 *                         (ex. 02_16_2023) and each associated key values is one of the 
 *                         following: "morning", "afternoon", "night", or "".]
 */
export function createAvabls(total) {
    const month= (new Date().getMonth()+1).toString().padStart(2, "0")
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const availabilities = [];
    for (let i = 0; i < total; i++) {
        const availability = {};
        const numKeys = Math.floor(Math.random() * (daysInMonth + 1));
        const listofKeys = randomList(numKeys)
        for (let j = 0; j < listofKeys.length; j++) {
            const day = listofKeys[j].toString().padStart(2, "0");
            const key = `${month}_${day}_2023`;
            const value = ["morning", "afternoon", "night", " "][Math.floor(Math.random() * 4)];
            availability[key] = value;
        }
        availabilities.push(availability);
    }
    return availabilities;
}


/**
 * generates a random list of ints
 * @param  {int} num [>=1]
 * @return {array int} [returns a list such that 0<=list.length<=num and 
 *                      each element is 1<=element<=num.]
 */
function randomList(num) {
  const list = [];
  const usedNums = new Set();
  const len = Math.floor(Math.random() * (num + 1)); // Random list length
  while (list.length < len) {
    const randNum = Math.floor(Math.random() * num) + 1; // Random number between 1 and num
    if (!usedNums.has(randNum)) {
      list.push(randNum);
      usedNums.add(randNum);
    }
  }
  return list;
}

/*const each=createAvabls(3)
const overlap=overlapAvabls(each)
console.log(each)
console.log(overlap)*/