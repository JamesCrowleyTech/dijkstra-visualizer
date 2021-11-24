import Denque from "denque";
import { AppContext } from "./components/App/App";
import cloneDeep from "lodash.clonedeep";

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
    if (i < matrix.length - 1 && !visited[i + 1][j]) unvisitedNeighbours.push([i + 1, j]);
    if (j > 0 && !visited[i][j - 1]) unvisitedNeighbours.push([i, j - 1]);
    if (j < matrix[0].length - 1 && !visited[i][j + 1]) unvisitedNeighbours.push([i, j + 1]);
    return unvisitedNeighbours;
};

export const generateGrid = function (height, width, numberOfNodes, shouldCreateNodes) {
    const matrix = generateEmptyMatrix(height, width);

    if (!shouldCreateNodes) return matrix;
    const outerVisited = generateEmptyMatrix(height, width);

    const sourceX = Math.floor(Math.random() * Math.floor(width / 2) + Math.floor(width / 4));
    const sourceY = Math.floor(Math.random() * Math.floor(height / 2) + Math.floor(height / 4));

    const edgesPerNode = 3;
    const range = [7, 12];

    const availableGridIds = [];

    for (let i = 0; i < numberOfNodes; i++) availableGridIds.push(i);

    matrix[sourceY][sourceX] = {
        row: sourceY,
        column: sourceX,
        edges: [],
        source: true,
        destination: false,
        gridId: `node--${sourceY},${sourceX}`,
    };

    const source = matrix[sourceY][sourceX];

    let nodesToCreate = numberOfNodes - 1;

    const outerQueue = new Denque();
    outerQueue.push(source);

    while (nodesToCreate) {
        const node = outerQueue.shift();

        const { row: nodeY, column: nodeX } = node;

        let potentialConnectedNodes = [];

        const innerQueue = new Denque();
        innerQueue.push([nodeY, nodeX]);

        const innerVisited = generateEmptyMatrix(height, width);

        let isSearchComplete = false;

        while (!isSearchComplete) {
            const [currY, currX] = innerQueue.shift();

            if (innerVisited[currY][currX]) continue;

            innerVisited[currY][currX] = true;

            if (Math.abs(currY - nodeY) + Math.abs(currX - nodeX) > range[1]) {
                isSearchComplete = true;
                break;
            }

            potentialConnectedNodes.push([currY, currX]);

            const neighbours = getUnvisitedNeighbours(matrix, innerVisited, currY, currX);

            neighbours.forEach(([i, j]) => innerQueue.push([i, j]));
        }

        potentialConnectedNodes = potentialConnectedNodes
            .filter(function ([currY, currX]) {
                const distanceFromParent = Math.abs(currY - nodeY) + Math.abs(currX - nodeX);
                if (distanceFromParent < range[0] || distanceFromParent > range[1]) return false;

                if (outerVisited[currY][currX]) return false;

                return true;
            })
            .sort(() => Math.random() - 0.5);

        for (let i = 0; i < edgesPerNode; i++) {
            let newNeighbour;
            let isNeighbourDetermined = false;

            while (!isNeighbourDetermined) {
                newNeighbour = potentialConnectedNodes.pop();
                const [newNeighbourY, newNeighbourX] = newNeighbour;

                const DiffY = newNeighbourY - nodeY;
                const DiffX = newNeighbourX - nodeX;

                const absDiffY = Math.abs(nodeY - newNeighbourY);
                const absDiffX = Math.abs(nodeX - newNeighbourX);

                const greaterDiff = Math.max(absDiffY, absDiffX);

                let testY = nodeY;
                let testX = nodeX;

                const addToY = DiffY / greaterDiff;
                const addToX = DiffX / greaterDiff;

                let setNeighbourDeterminedTrue = true;

                for (let i = 0; i < greaterDiff; i++) {
                    testY += addToY;
                    testX += addToX;

                    const roundedY = Number(testY.toFixed(9));
                    const roundedX = Number(testX.toFixed(9));

                    const integerY = Math.trunc(testY);
                    const integerX = Math.trunc(testX);

                    if (roundedY === integerY && roundedX === integerX) {
                        if (outerVisited[integerY][integerX]) {
                            setNeighbourDeterminedTrue = false;
                            break;
                        }
                    }
                }

                if (setNeighbourDeterminedTrue) isNeighbourDetermined = true;
            }

            const [newNeighbourY, newNeighbourX] = newNeighbour;

            matrix[newNeighbourY][newNeighbourX] = {
                row: newNeighbourY,
                column: newNeighbourX,
                edges: [],
                source: false,
                destination: false,
                gridId: `node--${newNeighbourY},${newNeighbourX}`,
            };

            matrix[nodeY][nodeX].edges.push([newNeighbourY, newNeighbourX]);

            nodesToCreate--;
            if (!nodesToCreate) break;

            if (nodesToCreate === 1) matrix[newNeighbourY][newNeighbourX].destination = true;

            outerVisited[newNeighbourY][newNeighbourX] = true;

            outerQueue.push(matrix[newNeighbourY][newNeighbourX]);
        }
    }

    return matrix;
};
