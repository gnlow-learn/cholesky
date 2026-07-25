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
