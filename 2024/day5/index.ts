import { example as input } from "./input.ts";

const [rules_str, upds_str] = input.split("\n\n");

const graph = rules_str.split("\n")
    .map(line => line.split("|").map(Number))
    .reduce((graph, [to, from]) => {
        if (!graph.has(from)) graph.set(from, new Set());
        if (!graph.has(to)) graph.set(to, new Set());
        graph.get(from)?.add(to);
        return graph;
    }, new Map<number, Set<number>>());

const sequences = upds_str.split("\n")
    .map(line => line.split(",").map(Number));

console.log("Part 1:",
    sequences.map((sequence) => {
        let valid = true;
        const pairs = sequence.flatMap((x, i) =>
            sequence.slice(i + 1).map(y => [x, y] as [number, number]));;
        pairs.forEach((comb) => {
            if (graph.get(comb[0])?.has(comb[1])) {
                valid = false;
            }
        })

        if (valid) {
            const mid = Math.floor(sequence.length / 2);
            return sequence[mid];
        }
        return 0
    }).reduce((a, b) => a + b, 0)
)

console.log("Part 2:", sequences
    .filter(sequence => {
        const pairs = sequence.flatMap((x, i) =>
            sequence.slice(i + 1).map(y => [x, y] as [number, number]));
        return pairs.some(([a, b]) => graph.get(a)?.has(b));
    })
    .map(sequence => {
        const subgraph = sequence.reduce((g, n) => {
            g.set(n, new Set());
            return g;
        }, new Map<number, Set<number>>());

        sequence.forEach(from => {
            graph.get(from)?.forEach(to => {
                if (sequence.includes(to)) {
                    subgraph.get(from)?.add(to);
                }
            });
        });

        const visited = new Set<number>();
        const temp = new Set<number>();
        const order: number[] = [];

        const visit = (n: number) => {
            if (temp.has(n) || visited.has(n)) return;
            temp.add(n);
            subgraph.get(n)?.forEach(visit);
            temp.delete(n);
            visited.add(n);
            order.unshift(n);
        };

        [...subgraph.keys()].forEach(visit);

        return order[Math.floor(order.length / 2)];
    })
    .reduce((sum, n) => sum + n));