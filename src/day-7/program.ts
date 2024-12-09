const dataPath = "./src/day-7/data.txt";
//const dataPath = "./src/day-7/data-sample.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<{ test: number; values: number[] }[]> {
    let data: { test: number; values: number[] }[] = [];

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const l = line.trim();
            const left = l.split(":");
            const right = left[1].trim().split(" ").map(Number);

            data.push({
                test: Number(left[0]),
                values: right,
            });
        }
    }

    return data;
}

async function Calculate(test: number, values: number[]): Promise<boolean> {
    if (values.length <= 1) {
        return test == values[0];
    }

    const v1 = values[0];
    const v2 = values[1];

    const mul = v1 * v2;
    const sum = v1 + v2;

    const rest = values.slice(2);

    const result =
        (await Calculate(test, [mul, ...rest])) ||
        (await Calculate(test, [sum, ...rest]));

    return result;
}

async function Calculate2(test: number, values: number[]): Promise<boolean> {
    if (values.length <= 1) {
        return test == values[0];
    }

    const v1 = values[0];
    const v2 = values[1];

    const mul = v1 * v2;
    const sum = v1 + v2;
    const append = v1.toString() + v2.toString();

    const rest = values.slice(2);

    const result =
        (await Calculate2(test, [mul, ...rest])) ||
        (await Calculate2(test, [sum, ...rest])) ||
        (await Calculate2(test, [Number(append), ...rest]));

    return result;
}

async function part1() {
    let data = await readFile();
    let total = 0;

    for (const e of data) {
        const result = await Calculate(e.test, e.values);
        if (result) {
            total += e.test;
        }
    }

    console.log(total);
    return total;
}

async function part2() {
    let data = await readFile();
    let total = 0;

    for (const e of data) {
        const result = await Calculate2(e.test, e.values);
        if (result) {
            total += e.test;
        }
    }

    console.log(total);
    return total;
}

part1();
part2();
