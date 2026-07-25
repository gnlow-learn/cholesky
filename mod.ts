import { arr } from "https://gnlow.dev/util@0.1.0"

export const cholesky =
(m: number[][]) => {
    let L: number[][] = []
    
    return L = arr(m.length).map(i => 
        arr(i+1).map(j => {
            const sum = arr(j).reduce(
                (acc, k) =>
                    acc + L[i][k] * L[j][k],
                0,
            )
            
            return i == j 
                ? Math.sqrt(m[i][i]-sum) 
                : (m[i][j]-sum)/L[j][j]
        })
    )
}

export const invertLowerTriangular =
(L: number[][]) => {
    const n = L.length
    let Linv: number[][] = []

    return Linv = arr(n).map(i => 
        arr(n).map(j => {
            if (i < j) return 0
            if (i == j) return 1 / L[i][i]
            
            return -arr(i - j).reduce((sum, k) => {
                const actualK = j + k
                return sum + L[i][actualK] * Linv[actualK][j]
            }, 0) / L[i][i]
        })
    )
}

export const choleskyInverse =
(matrix: number[][]) => {
    const L = cholesky(matrix)
    const Linv = invertLowerTriangular(L)
    const n = matrix.length

    return arr(n).map(i => 
        arr(n).map(j => 
            arr(n).reduce((sum, k) => sum + Linv[k][i] * Linv[k][j], 0)
        )
    )
}


