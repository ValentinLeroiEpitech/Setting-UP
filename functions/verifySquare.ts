export function verifySquare(tblx: string[][], taillesquare: number, ligne: number, colonne: number): boolean {
    let bool = false;

    for (let i = 0; i < taillesquare; i++) {
        for (let j = 0; j < taillesquare; j++) {

            if (ligne + i >= tblx.length || colonne + j >= tblx[ligne + i].length) {
                bool = false;
                return bool;
            }

            if (tblx[ligne + i][colonne + j] === "o") {
                bool = false;
                return bool;
            }
        }
    }

    bool = true;
    return bool;
}