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
            h = sauvegarde + 1;
            test = true;
            let precedentValide = false;

            while (test === true) {
                test = verifySquare(tablx, h, y, g, precedentValide);
                precedentValide = test;
                if (test === true && h > sauvegarde) {
                    sauvegarde = h;
                    ligne = y;
                    colonne = g;
                }
                h++;
            }
        }
    }
    drawArray(finalDraw(sauvegarde, ligne, colonne, tablx));
    return sauvegarde;
}