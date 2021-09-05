const generateEmptyMatrix = function (height, width) {
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

const generateEdges = function (matrix, i, j) {
    const visited = generateEmptyMatrix(matrix.length, matrix[0].length);
    let required = 10;
    const potentialNodes = [];
    const queue = [[i, j]];
    while (required) {
        const [i, j] = queue.shift();
        if (visited[i][j]) continue;
        visited[i][j] = true;
        if (matrix[i][j]) {
            potentialNodes.push([i, j]);
            required -= 1;
        }
        const neighbours = getUnvisitedNeighbours(matrix, visited, i, j);
        neighbours.forEach(([q, w]) => queue.push([q, w]));
    }
    return potentialNodes.filter(() => Math.random() > 0.4);
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
                };
            } else {
                potentialRow = Math.floor(Math.random() * height);
                potentialColumn = Math.floor(Math.random() * width);
            }
        }
    }

    matrix.flat().filter((x) => x)[
        Math.floor(Math.random() * numberOfNodes)
    ].source = true;

    matrix.flat().filter((x) => x && !x.source)[
        Math.floor(Math.random() * (numberOfNodes - 1))
    ].destination = true;

    console.log(...matrix.flat().filter((_) => _));

    // Generate edges
    // console.log(generateEdges(matrix, 0, 0));

    return matrix;
};
