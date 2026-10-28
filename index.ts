import * as fs from "fs";

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