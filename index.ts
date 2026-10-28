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