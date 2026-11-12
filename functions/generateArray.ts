export function generateArray(taille: number, pattern: string) {
    let tableau: string[][] = [];
    let position = 0;

    for (let i = 0; i < taille; i++) {
        tableau[i] = [];

        for (let j = 0; j < taille; j++) {
            tableau[i][j] = pattern[position % pattern.length];
            position++;
        }
    }

    return tableau;
}