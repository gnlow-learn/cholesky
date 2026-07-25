import { arr } from "https://gnlow.dev/util@0.1.0"

export const cholesky =
(m: number[][]) => {
    const n = m.length

    const L = arr(n).map(() => arr(n).fill(0))
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = 0
            for (let k = 0; k < j; k++) {
                sum += L[i][k] * L[j][k]
            }
            
            if (i == j) {
                const val = m[i][i] - sum
                L[i][j] = Math.sqrt(val > 0 ? val : 0)
            } else {
                L[i][j] = (m[i][j] - sum) / L[j][j]
            }
        }
    }
    return L
}

export const invertLowerTriangular =
(L: number[][]) => {
    const n = L.length
    const Linv = arr(n).map(() => arr(n).fill(0))

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (i == j) {
                Linv[i][j] = 1 / L[i][j]
            } else if (i > j) {
                let sum = 0
                for (let k = j; k < i; k++) {
                    sum += L[i][k] * Linv[k][j]
                }
                Linv[i][j] = -sum / L[i][i]
            }
        }
    }
    return Linv
}

export const choleskyInverse =
(matrix: number[][]) => {
    const L = cholesky(matrix)
    const Linv = invertLowerTriangular(L)
    const n = matrix.length

    const inv = arr(n).map(() => arr(n).fill(0))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0
            for (let k = 0; k < n; k++) {
                sum += Linv[k][i] * Linv[k][j]
            }
            inv[i][j] = sum
        }
    }
    return inv
}

export const getCondiDist =
(sigma: number[][], givenValues: number[]) => {
    const totalDim = sigma.length
    const n = givenValues.length

    if (totalDim != n + 1) {
        throw new Error("공분산 행렬의 차원이 주어진 변수 개수와 일치하지 않습니다.")
    }

    const sigma11 = arr(n).map(i => arr(n).map(j => sigma[i][j]))
    const sigma21 = arr(n).map(i => sigma[n][i])
    const sigma22 = sigma[n][n]

    const sigma11Inv = choleskyInverse(sigma11)

    let conditionalMean = 0
    for (let i = 0; i < n; i++) {
        let weight = 0
        for (let j = 0; j < n; j++) {
            weight += sigma21[j] * sigma11Inv[j][i]
        }
        conditionalMean += weight * givenValues[i]
    }

    let quadraticForm = 0
    for (let i = 0; i < n; i++) {
        let sumInner = 0
        for (let j = 0; j < n; j++) {
            sumInner += sigma11Inv[i][j] * sigma21[j]
        }
        quadraticForm += sigma21[i] * sumInner
    }

    const conditionalVariance = sigma22 - quadraticForm

    return {
        mean: conditionalMean,
        variance: conditionalVariance,
    }
}
