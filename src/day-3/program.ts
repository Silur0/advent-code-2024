const dataPath = "./src/day-3/data.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<string[]> {
    let data: string[] = [];

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const l = line.trim();
            data.push(l);
        }
    }

    return data;
}

async function part1() {
    var data = await readFile();

    const mulls: string[] = [];
    let total = 0;

    data.forEach((line) => {
        const patternMull = /mul\(\d+,\d+\)/g;
        const matches = line.match(patternMull);

        if (matches) mulls.push(...matches);
    });

    mulls.forEach((mull) => {
        const patternNums = /\((\d+),(\d+)\)/;
        const match = mull.match(patternNums);

        if (match) {
            total += Number(match[1]) * Number(match[2]);
        }
    });

    console.log(total);
    return total;
}

async function part2() {
    var data = await readFile();

    const tokens: string[] = [];
    let isEnabled = true;
    let total = 0;

    data.forEach((line) => {
        const pattern = /do\(\)|don't\(\)|mul\(\d+,\d+\)/g;
        const matches = line.match(pattern);

        if (matches) tokens.push(...matches);
    });

    tokens.forEach((token) => {
        const doPattern = /do\(\)/g;
        const dontPattern = /don't\(\)/g;
        const numPattern = /\((\d+),(\d+)\)/;

        if (doPattern.test(token)) {
            isEnabled = true;
        } else if (dontPattern.test(token)) {
            isEnabled = false;
        } else if (isEnabled) {
            const match = token.match(numPattern);
            if (match) {
                total += Number(match[1]) * Number(match[2]);
            }
        }
    });

    console.log(total);
    return total;
}

part1();
part2();
