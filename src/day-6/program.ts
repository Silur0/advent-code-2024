//const dataPath = "./src/day-6/data.txt";
const dataPath = "./src/day-6/data-sample.txt";

import { createInterface } from "readline";
import { createReadStream } from "fs";

async function readFile(): Promise<{
    map: string[][];
    x: number;
    y: number;
    direction: Direction;
}> {
    let map: string[][] = [];
    let x = 0;
    let y = 0;
    let direction = Direction.Up;

    const stream = createReadStream(dataPath, "utf8");
    const reader = createInterface({ input: stream });

    for await (const line of reader) {
        if (line.trim()) {
            const l = line.trim();
            const path = l.split("");

            Object.values(Direction).forEach((dir) => {
                if (path.includes(dir)) {
                    direction = dir;
                    x = path.indexOf(dir);
                    y = map.length;
                }
            });

            map.push(path);
        }
    }

    return { map, x, y, direction };
}

enum Direction {
    Up = "^",
    Down = "v",
    Left = "<",
    Right = ">",
}

async function part1() {
    let { map, x, y, direction } = await readFile();

    let total = 1;
    map[y][x] = "X";

    do {
        let position = map[y][x];

        if (position != "X") {
            total++;
            map[y][x] = "X";
        }

        let nextY = y;
        let nextX = x;

        switch (direction) {
            case Direction.Up:
                nextY--;
                break;

            case Direction.Down:
                nextY++;
                break;

            case Direction.Left:
                nextX--;
                break;

            case Direction.Right:
                nextX++;
                break;
        }

        if (
            nextX >= 0 &&
            nextX < map[0].length &&
            nextY >= 0 &&
            nextY < map.length
        ) {
            let nextPosition = map[nextY][nextX];

            if (nextPosition == "#") {
                switch (direction) {
                    case Direction.Up:
                        direction = Direction.Right;
                        x++;
                        break;

                    case Direction.Down:
                        direction = Direction.Left;
                        x--;
                        break;

                    case Direction.Left:
                        direction = Direction.Up;
                        y--;
                        break;

                    case Direction.Right:
                        direction = Direction.Down;
                        y++;
                        break;
                }
            } else {
                x = nextX;
                y = nextY;
            }
        } else {
            break;
        }
    } while (true);

    console.log(total);
    return total;
}

async function findPath(
    startMap: string[][],
    startX: number,
    startY: number,
    startDirection: Direction,
    hasObstruction = false
): Promise<number> {
    let map = startMap.map((row) => [...row]);
    let x = startX;
    let y = startY;
    let direction = startDirection;

    let total = 0;

    let isFirstTime = true;

    do {
        let position = map[y][x];

        if (position != "X") {
            map[y][x] = "X";
        }

        if (
            y == startY &&
            x == startX &&
            !isFirstTime &&
            direction == startDirection
        ) {
            total++;
            return total;
        }

        isFirstTime = false;
        let nextY = y;
        let nextX = x;

        switch (direction) {
            case Direction.Up:
                nextY--;
                break;

            case Direction.Down:
                nextY++;
                break;

            case Direction.Left:
                nextX--;
                break;

            case Direction.Right:
                nextX++;
                break;
        }

        if (
            nextX >= 0 &&
            nextX < map[0].length &&
            nextY >= 0 &&
            nextY < map.length
        ) {
            let nextPosition = map[nextY][nextX];

            if (nextPosition == "#") {
                switch (direction) {
                    case Direction.Up:
                        direction = Direction.Right;
                        x++;
                        break;

                    case Direction.Down:
                        direction = Direction.Left;
                        x--;
                        break;

                    case Direction.Left:
                        direction = Direction.Up;
                        y--;
                        break;

                    case Direction.Right:
                        direction = Direction.Down;
                        y++;
                        break;
                }
            } else {
                if (!hasObstruction) {
                    let obstructedMap = startMap.map((row) => [...row]);
                    obstructedMap[nextY][nextX] = "#";

                    total += await findPath(
                        obstructedMap,
                        x,
                        y,
                        direction,
                        true
                    );
                }

                x = nextX;
                y = nextY;
            }
        } else {
            break;
        }
    } while (true);

    return total;
}

async function part2() {
    let { map, x, y, direction } = await readFile();
    let total = 0;

    total = await findPath(map, x, y, direction);

    console.log(total);
    return total;
}

part1();
part2();
