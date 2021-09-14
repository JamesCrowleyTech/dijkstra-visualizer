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
    if (i > 0 && !visited[i - 1][j]) unvisitedNeighbours.push([i - 1, j]);
    if (i < matrix.length - 1 && !visited[i + 1][j])
        unvisitedNeighbours.push([i + 1, j]);
    if (j > 0 && !visited[i][j - 1]) unvisitedNeighbours.push([i, j - 1]);
    if (j < matrix[0].length - 1 && !visited[i][j + 1])
        unvisitedNeighbours.push([i, j + 1]);
    return unvisitedNeighbours;
};

const generateEdges = function (matrix) {
    const occupied = matrix.flat().filter((node) => node);
    const [source] = occupied.filter((node) => node.source);
    const occupiedNodesVisited = new Set();
    occupiedNodesVisited.add(`${source.row},${source.column}`);
    let nodesRemaining = occupied.length;
    const edges = [];
    const nodesQueue = new Denque();
    nodesQueue.push([source.row, source.column]);

    // const [nodeY, nodeX] = nodesQueue.shift();
    // console.log(nodeY, nodeX);

    console.log(matrix);

    let visited;

    while (nodesQueue) {
        if (nodesRemaining <= 1) break;
        console.log(nodesQueue);
        const [nodeY, nodeX] = nodesQueue.shift();
        occupiedNodesVisited.add(`${nodeY},${nodeX}`);

        visited = generateEmptyMatrix(matrix.length, matrix[0].length);

        const queue = new Denque();
        queue.push([nodeY, nodeX]);

        console.log(nodeY, nodeX);

        while (queue) {
            const [i, j] = queue.shift();
            // console.log(i, j);
            if (visited[i][j]) continue;
            if (matrix[i][j] && !occupiedNodesVisited.has(`${i},${j}`)) {
                edges.push([nodeY, nodeX, i, j]);
                nodesRemaining--;
                nodesQueue.push([i, j]);
                break;
            } else {
                const neighbours = getUnvisitedNeighbours(
                    matrix,
                    visited,
                    i,
                    j
                );
                neighbours.forEach(([f, g]) => queue.push([f, g]));
            }
        }
    }
    console.log(edges);
};

// const nodesVisited = new Set();

// const occupied = matrix.flat().filter((_) => _);

// occupied.forEach((node) => (nodesVisited[node.gridId] = false));

// console.log(nodesVisited);

// const adjacencyMatrix = generateEmptyMatrix(occupied.length);

// for (let current = 0; current < occupied.length - 7; current++) {
//     const node = occupied[current];
//     // nodesVisited.add(`${node.row}/${node.column}`);
//     console.log(node);

//     const visited = new Set();

//     const queue = new Denque();
//     queue.push([node.row, node.column]);

//     let edge = null;

//     mainQ: while (queue) {
//         const [i, j] = queue.shift();
//         visited.add([i, j]);
//         const neighbours = getUnvisitedNeighbours(matrix, visited, i, j);
//         neighbours.forEach(function ([y, x]) {
//             // console.log([y, x]);
//             if (matrix[y][x] && !nodesVisited.has(`${y}/${x}`)) {
//                 console.log([y, x], matrix[y][x]);
//                 edge = [
//                     [i, j],
//                     [y, x],
//                 ];
//                 nodesVisited.add(`${y}/${x}`);
//             } else queue.push([y, x]);
//         });
//         if (edge) {
//             console.log(edge);
//             break mainQ;
//         }
//     }

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
// };

export const generateGrid = function (height, width, numberOfNodes) {
    const matrix = generateEmptyMatrix(height, width);
    // console.log(...matrix);

    // prettier-ignore
    // const matrix = [
    //     [false,false,false,false,false,true,false,false,false,false,true,false,false,false],
    //     [true,false,false,false,false,false,false,false,false,false,false,false,false,false],
    //     [false,true,false,false,false,false,false,false,false,false,false,false,false,false],
    //     [false,false,false,false,false,false,false,false,false,false,false,false,false,true],
    //     [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    //     [false,false,true,false,true,false,false,false,false,false,false,false,false,false],
    //     [false,false,true,false,false,true,false,false,false,false,false,false,false,false],
    //     [false,false,false,false,false,false,false,true,false,false,false,false,false,false]
    // ];

    if (height * width < numberOfNodes)
        throw new Error("numberOfNodes overflowed grid dimensions");

    // Generate nodes

    const allCells = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            allCells.push([i, j]);
        }
    }
    allCells.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numberOfNodes; i++) {
        const [y, x] = allCells.pop();
        matrix[y][x] = {
            row: y,
            column: x,
            edges: [],
            source: false,
            destination: false,
            gridId: i,
            generationVisited: false,
        };
    }

    const source = matrix.flat().filter((x) => x)[
        Math.floor(Math.random() * numberOfNodes)
    ];

    source.source = true;

    const destination = matrix.flat().filter((x) => x && !x.source)[
        Math.floor(Math.random() * (numberOfNodes - 1))
    ];

    destination.destination = true;

    // const edges = generateEdges(matrix);

    return matrix;
};
