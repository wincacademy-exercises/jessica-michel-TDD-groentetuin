// Given tests
const getYieldForPlant = plant => plant.yield * 1;

const getYieldForCrop = input => input.crop.yield * input.numCrops;

const getTotalYield = ({ crops }) => { // ({}) shorthand to create objects
    const getYieldOfEachCrop = crops.map(crop => getYieldForCrop(crop));
    return getYieldOfEachCrop.reduce((accumulator, currentValue) => accumulator + currentValue);
}

// 1. Calulate cost for crop
const getCostsForCrop = input => input.crop.cost * input.numCrops;

// 2. Calulate revenue for crop
const getRevenueForCrop = input => input.crop.salePrice * input.numCrops;

// 3. Calculate profit for crop
const getProfitForCrop = input => getRevenueForCrop(input) - getCostsForCrop(input);

// 4. Calculate total profit for multiple crops
const getTotalProfit = ({ crops }) => {
    const getProfitOfEachCrop = crops.map(crop => getProfitForCrop(crop));
    return getProfitOfEachCrop.reduce((accumulator, currentValue) => accumulator + currentValue);
}


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};