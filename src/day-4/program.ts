const dataPath = "./src/day-4/data.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<string[][]> {
    let data: string[][] = [];

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const l = line.trim();
            data.push(l.split(""));
        }
    }

    return data;
}

async function part1() {
    var data = await readFile();
    var total = 0;

    for (let i = 0; i < data.length; i++) {
        var line = data[i];

        for (let k = 0; k < line.length; k++) {
            const char = line[k];

            if (char != "X") continue;

            // RIGHT
            if (
                k + 3 < line.length &&
                line[k + 1] == "M" &&
                line[k + 2] == "A" &&
                line[k + 3] == "S"
            ) {
                total++;
            }

            // LEFT
            if (
                k - 3 >= 0 &&
                line[k - 1] == "M" &&
                line[k - 2] == "A" &&
                line[k - 3] == "S"
            ) {
                total++;
            }

            // UP
            if (
                i - 3 >= 0 &&
                data[i - 1][k] == "M" &&
                data[i - 2][k] == "A" &&
                data[i - 3][k] == "S"
            ) {
                total++;
            }

            // DOWN
            if (
                i + 3 < data.length &&
                data[i + 1][k] == "M" &&
                data[i + 2][k] == "A" &&
                data[i + 3][k] == "S"
            ) {
                total++;
            }

            // UP LEFT
            if (
                i - 3 >= 0 &&
                k - 3 >= 0 &&
                data[i - 1][k - 1] == "M" &&
                data[i - 2][k - 2] == "A" &&
                data[i - 3][k - 3] == "S"
            ) {
                total++;
            }

            // UP RIGHT
            if (
                i - 3 >= 0 &&
                k + 3 < line.length &&
                data[i - 1][k + 1] == "M" &&
                data[i - 2][k + 2] == "A" &&
                data[i - 3][k + 3] == "S"
            ) {
                total++;
            }

            // DOWN RIGHT
            if (
                i + 3 < data.length &&
                k + 3 < line.length &&
                data[i + 1][k + 1] == "M" &&
                data[i + 2][k + 2] == "A" &&
                data[i + 3][k + 3] == "S"
            ) {
                total++;
            }

            // DOWN LEFT
            if (
                i + 3 < data.length &&
                k - 3 >= 0 &&
                data[i + 1][k - 1] == "M" &&
                data[i + 2][k - 2] == "A" &&
                data[i + 3][k - 3] == "S"
            ) {
                total++;
            }
        }
    }

    console.log(total);
    return total;
}

async function part2() {
    var data = await readFile();
    var total = 0;

    for (let i = 0; i < data.length; i++) {
        var line = data[i];

        for (let k = 0; k < line.length; k++) {
            const char = line[k];

            if (char != "A") continue;

            if (
                i - 1 >= 0 &&
                k - 1 >= 0 &&
                i + 1 < data.length &&
                k + 1 < line.length &&
                ((data[i - 1][k + 1] == "M" && data[i + 1][k - 1] == "S") ||
                    (data[i - 1][k + 1] == "S" && data[i + 1][k - 1] == "M")) &&
                ((data[i - 1][k - 1] == "M" && data[i + 1][k + 1] == "S") ||
                    (data[i - 1][k - 1] == "S" && data[i + 1][k + 1] == "M"))
            ) {
                total++;
            }
        }
    }

    console.log(total);
    return total;
}

part1();
part2();
