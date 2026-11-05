let tableauprincipale: string[][] = [];
let j = 0;
tableauprincipale[0] = [];

function createArray(S: string | undefined, N: number) {
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