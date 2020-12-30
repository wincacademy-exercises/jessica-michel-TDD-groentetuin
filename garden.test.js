const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require("./garden");

// 1. Calulate cost for crop
describe("getCostsForCrop", () => {
    test("Get costs for a single crop", () => {
        const corn = {
            name: "corn",
            cost: 1,
            numCrops: 10,
        };
        const input = {
            crop: corn
        };
        expect(getCostsForCrop(input)).toBe(10);
    });
    test("Get costs for a 0 crops", () => {
        const corn = {
            name: "corn",
            cost: 1,
            numCrops: 0,
        };
        const input = {
            crop: corn,
        };
        expect(getCostsForCrop(input)).toBe(0);
    });
});

// 2. Calulate revenue for crop
describe("getRevenueForCrop", () => {
    test("Get revenue for a single crop", () => {
        const apples = {
            name: "apples",
            salePrice: 2,
            numCrops: 5,
        };
        const input = {
            crop: apples,
        };
        expect(getRevenueForCrop(input)).toBe(10);
    });
    test("Get revenue for a single crop with amount 0", () => {
        const bananas = {
            name: "bananas",
            salePrice: 2,
            numCrops: 0,
        };
        const input = {
            crop: bananas,
        };
        expect(getRevenueForCrop(input)).toBe(0);
    });
});

// 3. Calulate profit for crop
describe("getProfitForCrop", () => {
    test("Get profit for crop, simple", () => {
        const bananas = {
            name: "bananas",
            salePrice: 2,
            cost: 1,
            numCrops: 4,
        };
        const input = {
            crop: bananas,
        };

        expect(getProfitForCrop(input)).toBe(4);
    });
    test("Get profit for crop with amount 0", () => {
        const bananas = {
            name: "bananas",
            salePrice: 2,
            cost: 1,
            numCrops: 0,
        };
        const input = {
            crop: bananas,
        };
        expect(getProfitForCrop(input)).toBe(0);
    });
});

// 4. Calulate total profit for multiple crops
describe("getTotalProfit", () => {
    test("Get profit for multiple crops", () => {
        const bananas = {
            name: "bananas",
            yield: 3,
            cost: 2,
            salePrice: 4,
            numCrops: 5
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            salePrice: 4,
            cost: 2,
            numCrops: 2
        };
        const crops = [
            { crop: bananas }, // 10
            { crop: pumpkin }, // 4
        ];
        expect(getTotalProfit({ crops })).toBe(14);
    });
});

// 6. add given environment factors
describe("getYieldForPlant", () => {
    test("Get yield for plant with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        expect(getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for plant with environment factor sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });
    test("Get yield for plant with environment factor sun", () => {
        const corn = {
            name: "corn",
            yield: 8,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(4);
    });
});

// 7. make test with multiple environment factors
describe("getYieldForPlant with multiple environments", () => {
    test("Get yield for plant with multiple environment factors sun and wind", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(6);
    });
});

// 8 -----

// 9. Get yield for crop with environment factors
describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
            numCrops: 10,
        };
        expect(getYieldForCrop(corn)).toBe(30);
    });
    test("Get yield for crop, with environment factors that contains 0", () => {
        const corn = {
            name: "corn",
            yield: 3,
            numCrops: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const environmentFactors = {
            sun: "medium",
            wind: "low",
        };

        expect(getYieldForCrop(corn, environmentFactors)).toBe(30);
    });
    test("Get yield for crop, with environment factors of sun 150% and wind 0", () => {
        const corn = {
            name: "corn",
            yield: 3,
            numCrops: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const environmentFactors = {
            sun: "high",
            wind: "low",
        };

        expect(getYieldForCrop(corn, environmentFactors)).toBe(45);
    });
    test("Get yield for crop, with environment factors of sun 150% and wind -60%", () => {
        const corn = {
            name: "corn",
            yield: 3,
            numCrops: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const environmentFactors = {
            sun: "high",
            wind: "high",
        };

        expect(getYieldForCrop(corn, environmentFactors)).toBe(18);
    });
});

describe("getTotalYield", () => {
    test("Get total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Get total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// 10. Calculate profit for crop with environments
describe("getProfitForCrop with environments", () => {
    test("Get profit for crop with environments", () => {
        const corn = {
            name: "bananas",
            salePrice: 2,
            cost: 1,
            yield: 3,
            numCrops: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(110);
    });
});