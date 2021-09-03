export const generateOccupiedMatrix = function (height, width) {
    const occupied = [];

    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(false);
        }
        occupied.push(row);
    }
    return occupied;
};

export const populateOccupiedMatrix = function (matrix, count) {
    if (!matrix) return;

    const height = matrix.length;
    const width = matrix[0].length;

    if (height * width < count)
        throw new Error("Count overflowed grid dimensions");

    for (let i = 0; i < count; i++) {
        let isPositionDetermined = false;
        let potentialRow = Math.floor(Math.random() * height);
        let potentialColumn = Math.floor(Math.random() * width);

        while (!isPositionDetermined) {
            if (!matrix[potentialRow][potentialColumn]) {
                isPositionDetermined = true;
                matrix[potentialRow][potentialColumn] = true;
            } else {
                potentialRow = Math.floor(Math.random() * height);
                potentialColumn = Math.floor(Math.random() * width);
            }
        }
    }

    return matrix;
};
