/**
 * generates a random list of availability objects
 * @param  {int} total [>=1]
 * @return {array object} [returns a list such that each key is a day in the current month
 *                         (ex. 02_16_2023) and each associated key values is one of the 
 *                         following: "morning", "afternoon", "night", or "".]
 */
export default function createAvabls(total) {
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
            const value = ["morning", "afternoon", "night", ""][Math.floor(Math.random() * 4)];
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

console.log(createAvabls(1))