export const generateGrid = function (height, width, numberOfNodes) {
    const matrix = [];

    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(false);
        }
        matrix.push(row);
    }

    if (height * width < numberOfNodes)
        throw new Error("numberOfNodes overflowed grid dimensions");

    for (let i = 0; i < numberOfNodes; i++) {
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
