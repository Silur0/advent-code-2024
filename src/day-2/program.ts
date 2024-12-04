const dataPath = "./src/day-2/data.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<number[][]> {
    let map: number[][] = [];

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const numbers = line.trim().split(/\s+/).map(Number);
            map.push(numbers);
        }
    }

    return map;
}

const isValidSequence = (
    numbers: number[],
    isDescending: boolean,
    isFirstTime = true
): boolean => {
    for (let i = 0; i < numbers.length - 1; i++) {
        const diff = isDescending
            ? numbers[i] - numbers[i + 1] // For descending
            : numbers[i + 1] - numbers[i]; // For ascending

        if (diff < 1 || diff > 3) {
            if (isFirstTime) {
                const opt1 = [...numbers];
                const opt2 = [...numbers];

                opt1.splice(i, 1);
                opt2.splice(i + 1, 1);

                return (
                    isValidSequence(opt1, isDescending, false) ||
                    isValidSequence(opt2, isDescending, false)
                );
            }
            return false;
        }
    }
    return true;
};

async function part1() {
    const map = await readFile();
    let total = 0;

    map.forEach((numbers) => {
        const initialDiff = numbers[0] - numbers[1];

        // DESC
        if (initialDiff > 0) {
            if (isValidSequence(numbers, true, false)) total++;
        } // ASC
        else if (initialDiff < 0) {
            if (isValidSequence(numbers, false, false)) total++;
        }
    });

    console.log(total);
    return total;
}

async function part2() {
    const map = await readFile();
    let total = 0;

    map.forEach((numbers) => {
        const opt1 = [...numbers];
        opt1.splice(0, 1);

        const validator =
            isValidSequence(numbers, true) ||
            isValidSequence(numbers, false) ||
            isValidSequence(opt1, true, false) ||
            isValidSequence(opt1, false, false);

        if (validator) total++;
    });

    console.log(total);
    return total;
}

part1();
part2();
