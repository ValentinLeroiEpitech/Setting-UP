let tableauprincipale: string[][] = [];
let j = 0;
tableauprincipale[0] = [];

import {verifySquare} from "./verifySquare"
import {drawArray} from "./drawArray"
import {finalDraw} from "./finalDraw"

export function finalVerify(tablx: string[][]): number {
    let test = true;
    let h: number = 1;
    let sauvegarde = 0;
    let ligne = 0;
    let colonne = 0;
    for (let y = 0; y < tablx.length; y++) {
        for (let g = 0; g < tablx[y].length; g++) {
            h = 1;
            test = true;

            while (test === true) {
                test = verifySquare(tablx, h, y, g);
                if (test === true && h > sauvegarde) {
                    sauvegarde = h;
                    ligne = y;
                    colonne = g;
                }
                h++;
            }
        }
    }
    console.log(drawArray(finalDraw(sauvegarde, ligne, colonne, tableauprincipale)));
    return sauvegarde;
}