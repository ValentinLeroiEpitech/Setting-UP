import * as fs from "fs";
let tableauprincipale: string[][] = [];
let tableaulisto: string[][] = [];
tableauprincipale[0] = [];
let j = 0;

function ReadFile(filename: string) {
    if (filename === ""){
        return "File not found";
    }
    const datafile = fs.readFileSync(filename, "utf8");
    if (datafile === ""){
        return "Error";
    }
    return datafile;
}

function CreationTableau(S: string | undefined, N: number) {
    if (S === undefined || N === 0){
        return [];
    }
    S = S.substring(S.indexOf("\n") + 1);
    S = S.replace(/\r?\n/g, "");
    j = 0;
    tableauprincipale = [[]];
    for (let i = 0; i < S.length; i++){
        if (i % N === 0 && i !== 0){
            j++;
            tableauprincipale[j] = [];
        }
        tableauprincipale[j][i % N] = S[i];
    }
    return tableauprincipale;
}

function DessinerTableau(tblxprincip: string[][]){
    let counttblx = "";
    for (let i = 0; i < tblxprincip.length; i++){
        for (let j = 0; j < tblxprincip[i].length; j++){
            counttblx = counttblx + tblxprincip[i][j];
        }
        console.log(counttblx);
        counttblx = "";
    }
}

function VerifCarreAllPLaces(tblx: string[][], taillesquare: number, ligne: number, colonne: number): boolean {
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

function Dessinfinal(taille: number, ligne: number, colonne: number, tblxfinal: string[][]) {
    for (let g = 0; g < taille; g++) {
        for (let n = 0; n < taille; n++) {
            tblxfinal[ligne + g][colonne + n] = "x";
        }
    }
    return tblxfinal;
}

function VerifFinal(tablx: string[][]): number {
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
                test = VerifCarreAllPLaces(tablx, h, y, g);
                if (test === true && h > sauvegarde) {
                    sauvegarde = h;
                    ligne = y;
                    colonne = g;
                }
                h++;
            }
        }
    }
    console.log(Dessinfinal(sauvegarde, ligne, colonne, tableauprincipale));
    return sauvegarde;
}

tableaulisto = CreationTableau(ReadFile("src/file.txt"), 5);
DessinerTableau(tableaulisto);
console.log(VerifFinal(tableaulisto));

// quand sa a trouvé le carré le plus grand du coté gauche en haut qui est le plus grand.
// je dois deplacer directement mon carré dans toute la zone jusqu'a trouvé un endroit
// sans obstacle et a ce moment la, on repart dans la boucle pour agrandir le carré directement