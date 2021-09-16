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

    let visited;

    while (nodesQueue) {
        if (nodesRemaining <= 1) break;
        const [nodeY, nodeX] = nodesQueue.shift();
        occupiedNodesVisited.add(`${nodeY},${nodeX}`);

        visited = generateEmptyMatrix(matrix.length, matrix[0].length);

        const queue = new Denque();
        queue.push([nodeY, nodeX]);

        while (queue) {
            const [i, j] = queue.shift();
            if (visited[i][j]) continue;
            visited[i][j] = true;
            if (matrix[i][j] && !occupiedNodesVisited.has(`${i},${j}`)) {
                edges.push([nodeY, nodeX, i, j]);
                nodesRemaining--;
                nodesQueue.push([i, j]);
                matrix[nodeY][nodeX].edges.push([i, j]);
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

    return edges;
};

// const renderEdges = function (matrix, edges) {};

export const generateGrid = function (height, width, numberOfNodes) {
    const matrix = generateEmptyMatrix(height, width);

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
    const edges = generateEdges(matrix);

    // renderEdges(matrix, edges);

    return matrix;
};
