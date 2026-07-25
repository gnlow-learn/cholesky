import { getCondiDist } from "./mod.ts"

const sigma = [
    [1.0,  0.49, 0.5 ],
    [0.49, 1.0,  0.3 ],
    [0.5,  0.3,  1.0 ],
]

const result = getCondiDist(sigma, [1, 2])

console.log(`C | (A=1, B=2) 의 조건부 분포:`)
console.log(`평균 (Mean): ${result.mean.toFixed(4)}`)
console.log(`분산 (Variance): ${result.variance.toFixed(4)}`)
