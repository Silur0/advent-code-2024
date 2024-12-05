const dataPath = "./src/day-5/data.txt";
//const dataPath = "./src/day-5/data-sample.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<{
    rules: Map<number, number[]>;
    updates: number[][];
}> {
    let rules = new Map<number, number[]>();
    let updates: number[][] = [];

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const l = line.trim();

            const rule = l.split("|").map(Number);
            const update = l.split(",").map(Number);

            if (rule.length > 1) {
                const fst = rule[0];
                const scd = rule[1];

                if (rules.has(fst)) {
                    rules.get(fst)!.push(scd);
                } else {
                    rules.set(fst, [scd]);
                }
            }

            if (update.length > 1) {
                updates.push(update);
            }
        }
    }

    return { rules, updates };
}

async function part1() {
    var data = await readFile();
    var total = 0;

    data.updates.forEach((update) => {
        let validator = true;
        update.forEach((page, index) => {
            if (!data.rules.has(page)) return;

            const rulePages = data.rules.get(page);
            const remainingUpdate = update.slice(0, index);

            rulePages?.forEach((rule) => {
                if (remainingUpdate.includes(rule)) validator = false;
            });
        });

        if (validator) {
            let middlePageIndex = Math.floor(update.length / 2);
            total += update[middlePageIndex];
        }
    });

    console.log(total);
    return total;
}

function ValidateRules(remainingUpdate: number[], rulePages: number[]) {
    let validator = true;

    rulePages?.forEach((rule) => {
        if (remainingUpdate.includes(rule)) {
            validator = false;
        }
    });

    return validator;
}

async function part2() {
    var data = await readFile();
    var total = 0;

    data.updates.forEach((update) => {
        let validator = true;
        let fixedUpdate: number[] = [];

        update.forEach((page, index) => {
            if (!data.rules.has(page)) {
                fixedUpdate.push(page);
                return;
            }

            const rulePages = data.rules.get(page);
            const remainingUpdate = update.slice(0, index);

            const isValid = ValidateRules(remainingUpdate, rulePages ?? []);

            if (isValid) {
                fixedUpdate.push(page);
            } else {
                validator = false;

                let rest: number[] = [];
                for (let i = index; i >= 0; i--) {
                    const remainingFixedUpdate = fixedUpdate.slice(0, i);

                    if (ValidateRules(remainingFixedUpdate, rulePages ?? [])) {
                        fixedUpdate = [...remainingFixedUpdate, page, ...rest];
                        return;
                    } else {
                        rest = [remainingFixedUpdate[i - 1], ...rest];
                    }
                }
            }
        });

        if (!validator) {
            let middlePageIndex = Math.floor(fixedUpdate.length / 2);
            total += fixedUpdate[middlePageIndex];
        }
    });

    console.log(total);
    return total;
}

part1();
part2();
