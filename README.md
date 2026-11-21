# Setting Up — Recherche du plus grand carré (BSQ)

**Setting Up** est un projet d'algorithmique développé en **TypeScript** dans le cadre de ma formation à **Epitech**. Son objectif est de trouver **le plus grand carré sans obstacle** dans une grille, puis de l'afficher dans le terminal.

`TypeScript` · `Node.js` · `CLI` · `Algorithmique` · `BSQ`

---

## Sommaire

- [Présentation](#présentation)
- [Aperçu du résultat](#aperçu-du-résultat)
- [Prérequis et dépendances](#prérequis-et-dépendances)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Fonctionnement de l'algorithme](#fonctionnement-de-lalgorithme)
- [Structure du projet](#structure-du-projet)
- [Gestion des erreurs](#gestion-des-erreurs)
- [Limites et pistes d'amélioration](#limites-et-pistes-damélioration)

## Présentation

Le programme analyse une grille composée de deux caractères :

| Caractère | Signification |
| :---: | --- |
| `.` | Case libre |
| `o` | Obstacle |
| `x` | Case appartenant au plus grand carré trouvé (affichage final) |

Le programme peut :

1. **Lire une grille depuis un fichier texte** et rechercher le plus grand carré libre.
2. **Générer une grille carrée** à partir d'une taille et d'un motif, puis lancer la même recherche.

Le résultat est affiché **directement dans le terminal**. Le fichier d'entrée n'est pas modifié.

## Aperçu du résultat

Prenons un fichier `map.txt` contenant exactement :

```text
5
.....
..o..
.....
.....
.....
```

> La première ligne (`5`) indique le **nombre de lignes de la grille**. Elle ne fait pas partie de la grille elle-même.

Après exécution :

```bash
node dist/index.js map.txt
```

Le programme affiche :

```text
.....
..o..
xxx..
xxx..
xxx..
```

Ici, le plus grand carré disponible mesure **3 × 3** : ses neuf cases sont remplacées par des `x`.

## Prérequis et dépendances

Installe les outils suivants sur ton ordinateur :

- **Node.js** (version LTS récente recommandée), incluant **npm**.
- **Git** *(facultatif : seulement pour cloner le dépôt)*.

Tu peux vérifier leur installation :

```bash
node --version
npm --version
```

Les dépendances déclarées dans `package.json` sont des dépendances de développement :

| Dépendance | Rôle |
| --- | --- |
| `typescript` (`^6.0.3`) | Compile le TypeScript en JavaScript. |
| `@types/node` (`^26.6.6`) | Fournit les types TypeScript pour Node.js. |
| `ts-node` (`^10.9.2`) | Permet l'exécution de TypeScript via un outil dédié ; **il n'est pas nécessaire** pour la méthode de lancement décrite ici. |

Aucune base de données, interface web ou bibliothèque applicative supplémentaire n'est nécessaire.

## Installation

**1.** Récupère le projet depuis GitHub (bouton **Code → Download ZIP** ou commande `git clone`) puis ouvre un terminal **à la racine**, là où se trouve `package.json`.

Si tu utilises Git :

```bash
git clone <URL_DE_TON_DEPOT>
cd <NOM_DU_DOSSIER>
```

**2.** Installe les dépendances depuis le fichier `package-lock.json` :

```bash
npm ci
```

> Tu peux également utiliser `npm install`, mais `npm ci` est recommandé pour retrouver les dépendances définies par le fichier de verrouillage.

**3.** Compile le projet :

```bash
npm run build
```

Cette commande exécute `tsc` et génère le JavaScript compilé dans le dossier **`dist/`**.

**4.** Exécute le programme avec l'un des deux modes ci-dessous.

## Utilisation

### Mode 1 — Lire une grille depuis un fichier

Crée un fichier `map.txt` à la racine du projet :

```text
5
.....
..o..
.....
.....
.....
```

Lance ensuite :

```bash
node dist/index.js map.txt
```

Tu peux aussi indiquer un chemin vers un fichier situé ailleurs :

```bash
node dist/index.js ./maps/map.txt
```

**Règles du fichier d'entrée :**

- La **première ligne** est un entier strictement positif indiquant le nombre de lignes.
- Toutes les lignes de la grille doivent avoir la **même largeur** et être non vides.
- Les seuls caractères autorisés dans la grille sont `.` et `o` (**o minuscule**, pas le chiffre `0`).
- Le nombre de lignes réel doit correspondre au nombre déclaré.
- Le fichier doit se terminer par un **retour à la ligne** après la dernière ligne de la grille.
- La grille peut être **rectangulaire** : le nombre de lignes et de colonnes n'a pas besoin d'être identique.

### Mode 2 — Générer automatiquement une grille

Syntaxe :

```bash
node dist/index.js <taille> "<motif>"
```

Exemple :

```bash
node dist/index.js 4 "...."
```

Résultat :

```text
xxxx
xxxx
xxxx
xxxx
```

Dans ce mode :

- `taille` est un entier strictement positif : il définit **le nombre de lignes ET de colonnes**.
- `motif` est une chaîne **non vide** constituée uniquement de `.` et de `o`.
- Le motif est répété **de case en case, sans repartir de zéro à chaque ligne**. Le programme utilise `position % pattern.length` pour reprendre au début du motif après son dernier caractère.
- La recherche du plus grand carré est lancée automatiquement après la génération.

Autre commande possible :

```bash
node dist/index.js 8 "...o.."
```

> Astuce : mets le motif entre guillemets pour éviter les interprétations propres à certains terminaux.

## Fonctionnement de l'algorithme

Le projet utilise une approche **exhaustive, avec optimisation des vérifications**, pour résoudre le problème du *Biggest Square* (BSQ). **Ce n'est pas un algorithme de programmation dynamique**.

### 1. Lecture et préparation

Dans `index.ts`, le programme vérifie les arguments et le contenu du fichier (ou les paramètres de génération).

- **Mode fichier :** `createArray()` retire la première ligne (le nombre de lignes), supprime les retours à la ligne et construit un tableau de caractères à deux dimensions (`string[][]`).
- **Mode génération :** `generateArray()` construit directement ce tableau en répétant le motif fourni.

### 2. Parcours de la grille

La fonction `finalVerify()` parcourt chaque position possible avec deux boucles : **ligne par ligne**, puis **colonne par colonne**.

Pour chaque position, elle tente un carré **plus grand que le meilleur trouvé jusqu'ici**, grâce à la variable `sauvegarde`.

### 3. Vérification d'un carré

La fonction `verifySquare()` contrôle que le carré :

- ne dépasse pas les limites du tableau ;
- ne contient aucun obstacle (`o`).

Lorsque le carré de taille précédente a déjà été validé **à la même position**, le programme optimise la vérification du carré agrandi : **seules la nouvelle ligne du bas et la nouvelle colonne de droite sont vérifiées**, au lieu de parcourir à nouveau toutes les cases.

```text
Carré déjà validé      Agrandissement

. . .                  . . . +
. . .                  . . . +
. . .                  . . . +
                       + + + +

+ = nouvelles cases à vérifier
```

### 4. Mémorisation du meilleur carré

Si un carré plus grand est valide, le programme mémorise :

- sa **taille** (`sauvegarde`) ;
- sa **ligne** de départ ;
- sa **colonne** de départ.

Si plusieurs carrés ont la même taille maximale, le programme conserve **le premier trouvé** dans l'ordre du parcours.

### 5. Dessin du résultat

Une fois toutes les positions examinées :

1. `finalDraw()` remplace les cases du carré retenu par `x`.
2. `drawArray()` affiche la grille finale dans le terminal.

Si aucune case libre n'existe, aucun `x` n'est ajouté.

### Performance

Le programme ne teste pas toutes les tailles à partir de `1` pour chaque case : il commence à **`meilleureTaille + 1`**. Il réutilise également le résultat de la vérification précédente pour limiter le travail lors d'un agrandissement.

Il reste cependant fondé sur un parcours de positions et des tests de carrés : les **très grandes grilles** peuvent demander beaucoup plus de temps et de mémoire. Une amélioration possible serait une solution par **programmation dynamique**, avec une complexité temporelle linéaire par rapport au nombre de cases.

## Structure du projet

```text
Setting-UP-main/
├── functions/
│   ├── createArray.ts     # Transforme le contenu d'un fichier en grille 2D
│   ├── drawArray.ts       # Affiche la grille dans le terminal
│   ├── finalDraw.ts       # Dessine le meilleur carré avec des « x »
│   ├── finalVerify.ts     # Parcourt les positions et retient le meilleur carré
│   ├── generateArray.ts   # Génère une grille depuis une taille et un motif
│   └── verifySquare.ts    # Vérifie les limites et la présence d'obstacles
├── index.ts               # Point d'entrée, arguments, validation et erreurs
├── package.json           # Scripts npm et dépendances
├── package-lock.json      # Versions verrouillées des dépendances
├── tsconfig.json          # Configuration du compilateur TypeScript
└── .gitignore             # Ignore node_modules/ et dist/
```

Le dossier `dist/` est créé lors de la compilation et n'a pas besoin d'être ajouté au dépôt Git.

## Gestion des erreurs

Le programme affiche **`Error`** sur la sortie d'erreur et définit le **code de sortie `84`** lorsqu'il détecte notamment :

- un nombre d'arguments incorrect ;
- un fichier manquant, inaccessible ou vide ;
- une grille mal formatée ou une ligne de largeur différente ;
- un caractère interdit ;
- une taille de génération ou un motif invalide ;
- l'absence de retour à la ligne final dans un fichier.

Exemple :

```bash
node dist/index.js 0 ".o"
```

```text
Error
```

### Dépannage rapide

| Problème | Vérification |
| --- | --- |
| `node` ou `npm` n'est pas reconnu | Installe Node.js puis rouvre ton terminal. |
| `Cannot find module .../dist/index.js` | Lance `npm ci` puis `npm run build` depuis la racine. |
| Le programme affiche `Error` avec un fichier | Vérifie l'en-tête numérique, les caractères, la largeur, le nombre de lignes et le dernier retour à la ligne. |
| Le programme affiche `Error` en mode génération | Utilise une taille entière positive et un motif non vide contenant uniquement `.` et `o`. |
| Le programme met du temps sur une grande grille | Réduis la taille : la recherche et la génération consomment du temps et de la mémoire. |

## Limites et pistes d'amélioration

Ce dépôt correspond à une **implémentation pédagogique** du problème BSQ.

Parmi les améliorations envisageables :

- Ajouter des **tests automatisés** (le script `npm test` actuel est un placeholder et ne lance aucun test).
- Afficher des **messages d'erreur plus détaillés** au lieu du seul message `Error`.
- Comparer les performances avec une solution par **programmation dynamique**.
- Ajouter des tests de performance sur de grandes grilles.

---

*Projet d'algorithmique en TypeScript — Epitech.*
