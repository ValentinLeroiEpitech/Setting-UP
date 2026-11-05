export function drawArray(tblxprincip: string[][]){
    let counttblx = "";
    for (let i = 0; i < tblxprincip.length; i++){
        for (let j = 0; j < tblxprincip[i].length; j++){
            counttblx = counttblx + tblxprincip[i][j];
        }
        console.log(counttblx);
        counttblx = "";
    }
}