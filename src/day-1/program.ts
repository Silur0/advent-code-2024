const dataPath = "./src/day-1/data.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<{
    leftList: number[];
    rightList: number[];
}> {
    const leftList: number[] = [];
    const rightList: number[] = [];

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const [first, second] = line.trim().split(/\s+/).map(Number);
            leftList.push(first);
            rightList.push(second);
        }
    }

    return { leftList, rightList };
}

async function part1() {
    const { leftList, rightList } = await readFile();

    leftList.sort();
    rightList.sort();

    let total = 0;

    for (let i = 0; i < leftList.length; i++) {
        const element1 = leftList[i];
        const element2 = rightList[i];

        total +=
            element1 > element2 ? element1 - element2 : element2 - element1;
    }

    console.log(total);
    return total;
}

async function part2() {
    const { leftList, rightList } = await readFile();

    let counts = new Map<number, number>();
    let total = 0;

    leftList.forEach((num) => {
        const savedCount = counts.get(num);

        if (savedCount) {
            total += num * savedCount;
            return;
        }

        let count = 0;

        rightList.forEach((k) => {
            if (k == num) count++;
        });

        total += num * count;
        counts.set(num, count);
    });

    console.log(total);
    return total;
}

part1();
part2();
