
import * as fs from "fs";
import {createArray} from "./functions/createArray";
import {finalVerify} from "./functions/finalVerify";
import { generateArray } from "./functions/generateArray";

let tableauprincipale: string[][] = [];
let tableaulisto: string[][] = [];
let j = 0;
const filesname = process.argv[2];
tableauprincipale[0] = [];

function ReadFile(filename: string) {
    if (filename === undefined || filename === ""){
        throw new Error("Fichier manquant");
    }
    const datafile = fs.readFileSync(filename, "utf8");
    if (datafile === ""){
        throw new Error("Fichier vide");
    }
    return datafile;
}

try {
    if (process.argv.length === 3) {
        const contenu = ReadFile(filesname);
        const lignes = contenu.split(/\r?\n/);
        const nombreLignes = Number(lignes[0]);
        const largeur = lignes[1]?.length ?? 0;

        if (!contenu.endsWith("\n") ||
            !/^[0-9]+$/.test(lignes[0]) ||
            !Number.isSafeInteger(nombreLignes) ||
            nombreLignes <= 0 ||
            nombreLignes !== lignes.length - 2 ||
            largeur === 0) {
            throw new Error("Fichier invalide");
        }

        for (let i = 1; i < lignes.length - 1; i++) {
            if (lignes[i].length !== largeur ||
                !/^[.o]+$/.test(lignes[i])) {
                throw new Error("Fichier invalide");
            }
        }

        tableaulisto = createArray(contenu, largeur);
        finalVerify(tableaulisto);

    } else if (process.argv.length === 4) {

        const valeur = process.argv[2];
        const taille = Number(valeur);
        const pattern = process.argv[3];

        if (!/^[0-9]+$/.test(valeur) ||
            !Number.isSafeInteger(taille) ||
            taille <= 0 ||
            !/^[.o]+$/.test(pattern)) {
            throw new Error("Arguments invalides");
        }

        tableaulisto = generateArray(taille, pattern);
        finalVerify(tableaulisto);

    } else {
        throw new Error("Nombre d'arguments incorrect");
    }

} catch (erreur) {
    console.error("Error");
    process.exitCode = 84;
}
