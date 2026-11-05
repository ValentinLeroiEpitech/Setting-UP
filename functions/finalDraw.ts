export function finalDraw(taille: number, ligne: number, colonne: number, tblxfinal: string[][]) {
    for (let g = 0; g < taille; g++) {
        for (let n = 0; n < taille; n++) {
            tblxfinal[ligne + g][colonne + n] = "x";
        }
    }
    return tblxfinal;
}