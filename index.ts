import * as fs from "fs";
import {createArray} from "./functions/createArray";
import {finalVerify} from "./functions/finalVerify";

let tableauprincipale: string[][] = [];
let tableaulisto: string[][] = [];
let j = 0;
const filesname = process.argv[2];
tableauprincipale[0] = [];

function ReadFile(filename: string) {
    if (filename === undefined){
        process.exit(84);
    }
    const datafile = fs.readFileSync(filename, "utf8");
    if (datafile === ""){
        return "Error";
    }
    return datafile;
}

tableaulisto = createArray(ReadFile(filesname), 50);
console.log(finalVerify(tableaulisto));

// quand sa a trouvé le carré le plus grand du coté gauche en haut qui est le plus grand.
// je dois deplacer directement mon carré dans toute la zone jusqu'a trouvé un endroit
// sans obstacle et a ce moment la, on repart dans la boucle pour agrandir le carré directement