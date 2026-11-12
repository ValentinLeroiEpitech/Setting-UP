export function verifySquare(tblx: string[][], taillesquare: number, ligne: number, colonne: number, precedentValide: boolean = false): boolean {
    let bool = false;
    
    if (ligne + taillesquare > tblx.length || colonne + taillesquare > tblx[ligne].length) {
        return false;
    }

    if (precedentValide && taillesquare > 1) {
        for (let i = 0; i < taillesquare; i++) {
            if (tblx[ligne + taillesquare - 1][colonne + i] === "o" ||
                tblx[ligne + i][colonne + taillesquare - 1] === "o") {
                return false;
            }
        }
        return true;
    }

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