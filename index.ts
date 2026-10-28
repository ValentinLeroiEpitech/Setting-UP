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

function VerifCarreAllPLaces(tblx: string[][], taillesquare: number, ligne: number, colonne: number){
    let bool = false;
    for (let i = 0; i < taillesquare; i++){
        for (let j = 0; j < taillesquare; j++){
            console.log(tblx[i][j])
            if (ligne + i >= tblx.length || j + colonne >= tblx[i + ligne].length){
                bool = false 
                return bool;
            }

            if (tblx[ligne + i][colonne + j] === "o"){
                bool = false
                return bool;
            }
        }
    }

    bool = true;
    return bool;
}

// faire en sorte que quand sa finis de compter la taille du carré sa dois decaler i + 1; jusqu'a qu'on atteigne le lenght de i et ensuite on redescend (j+1 et i = 0)

console.log(DessinerTableau(tableauprincipale));
console.log(VerifCarreAllPLaces(CreationTableau(ReadFile("src/file.txt"), 5), 2, 0, 0))

// quand sa a trouvé le carré le plus grand du coté gauche en haut qui est le plus grand.
// je dois deplacer directement mon carré dans toute la zone jusqu'a trouvé un endroit
// sans obstacle et a ce moment la, on repart dans la boucle pour agrandir le carré directement