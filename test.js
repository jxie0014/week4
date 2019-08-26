let obj = {
    name: 'Tom',
    age: 20,
    address: 'Melbourne',
    university: 'Monash'
}
const { address} = obj;
if (address === 'melbourne' && obj.name === 'Tom') {
console.log("Tom lives in Melbourne");
} else {
console.log('Something wrong with the name or address');
}console.log('Mission Accomplished');