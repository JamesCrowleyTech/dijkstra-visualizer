import Denque from "denque";

const generateEmptyMatrix = function (height, width = height) {
    const matrix = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(false);
        }
        matrix.push(row);
    }
    return matrix;
};

const getUnvisitedNeighbours = function (matrix, visited, i, j) {
    const unvisitedNeighbours = [];
    if (i > 0 && !visited.has([i - 1, j])) unvisitedNeighbours.push([i - 1, j]);
    if (i < matrix.length - 1 && !visited.has([i + 1, j]))
        unvisitedNeighbours.push([i + 1, j]);
    if (j > 0 && !visited.has([i, j - 1])) unvisitedNeighbours.push([i, j - 1]);
    if (j < matrix[0].length - 1 && !visited.has([i, j + 1]))
        unvisitedNeighbours.push([i, j + 1]);
    return unvisitedNeighbours;
};

const generateEdges = function (matrix) {
    const nodesVisited = new Set();

    const occupied = matrix.flat().filter((_) => _);

    occupied.forEach((node) => (nodesVisited[node.gridId] = false));

    console.log(nodesVisited);

    const source = occupied.filter((n) => n.source);

    const adjacencyMatrix = generateEmptyMatrix(occupied.length);

    for (let current = 0; current < occupied.length - 1; current++) {
        const node = occupied[current];
        nodesVisited.add(`${node.row}/${node.column}`);

        const visited = new Set();

        const queue = new Denque();
        queue.push([node.row, node.column]);

        let edge = null;

        while (queue) {
            console.log(queue);
            const [i, j] = queue.shift();
            visited.add([i, j]);
            const neighbours = getUnvisitedNeighbours(matrix, visited, i, j);
            neighbours.forEach(function ([y, x]) {
                if (matrix[y][x] && !nodesVisited.has(`${y}/${x}`)) {
                    edge = [
                        [i, j],
                        [y, x],
                    ];
                    // nodesVisited.add(`${y}/${x}`);
                }
                queue.push([y, x]);
            });
            if (edge) break;
        }

        console.log(edge);
    }

    // let availableRows = [];
    // let availableColumns = [];

    // for (let i = 0; i < occupied.length; i++) {
    //     availableRows.push(i);
    //     availableColumns.push(i);
    // }

    // availableRows = availableRows.sort(() => Math.random() - 0.5);
    // availableColumns = availableColumns.sort(() => Math.random() - 0.5);

    // console.log(adjacencyMatrix);
    // availableRows.forEach(function (row, rIdx) {
    //     // row.forEach(function () {});
    // });
};

export const generateGrid = function (height, width, numberOfNodes) {
    const matrix = generateEmptyMatrix(height, width);

    if (height * width < numberOfNodes)
        throw new Error("numberOfNodes overflowed grid dimensions");

    // Generate nodes

    for (let i = 0; i < numberOfNodes; i++) {
        let isPositionDetermined = false;
        let potentialRow = Math.floor(Math.random() * height);
        let potentialColumn = Math.floor(Math.random() * width);

        while (!isPositionDetermined) {
            if (!matrix[potentialRow][potentialColumn]) {
                isPositionDetermined = true;
                matrix[potentialRow][potentialColumn] = {
                    row: potentialRow,
                    column: potentialColumn,
                    edges: [],
                    source: false,
                    destination: false,
                    gridId: i,
                    generationVisited: false,
                };
            } else {
                potentialRow = Math.floor(Math.random() * height);
                potentialColumn = Math.floor(Math.random() * width);
            }
        }
    }

    const source = matrix.flat().filter((x) => x)[
        Math.floor(Math.random() * numberOfNodes)
    ];

    source.source = true;

    const destination = matrix.flat().filter((x) => x && !x.source)[
        Math.floor(Math.random() * (numberOfNodes - 1))
    ];

    destination.destination = true;

    const edges = generateEdges(matrix);

    return matrix;
};
