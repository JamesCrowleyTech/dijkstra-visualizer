import Denque from "denque";
import cloneDeep from "lodash.clonedeep";
import { isEmpty } from "lodash";

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

export const generateGrid = function (
    height,
    width,
    numberOfNodes,
    shouldCreateNodes
) {
    const matrix = generateEmptyMatrix(height, width);

    if (!shouldCreateNodes) return matrix;

    const outerVisited = generateEmptyMatrix(height, width);

    const sourceX = Math.floor(
        Math.random() * Math.floor(width / 2) + Math.floor(width / 4)
    );
    const sourceY = Math.floor(
        Math.random() * Math.floor(height / 2) + Math.floor(height / 4)
    );

    const edgesPerNode = 2;
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

            const neighbours = getUnvisitedNeighbours(
                matrix,
                innerVisited,
                currY,
                currX
            );

            neighbours.forEach(([i, j]) => innerQueue.push([i, j]));
        }

        potentialConnectedNodes.forEach(function ([y, x]) {
            // console.log([y, x]);
            // if (Math.random() > 0.6) outerVisited[y][x] = true;
        });

        potentialConnectedNodes = potentialConnectedNodes
            .filter(function ([currY, currX]) {
                const distanceFromParent =
                    Math.abs(currY - nodeY) + Math.abs(currX - nodeX);
                if (
                    distanceFromParent < range[0] ||
                    distanceFromParent > range[1]
                )
                    return false;

                if (outerVisited[currY][currX]) return false;

                return true;
            })
            .sort(() => Math.random() - 0.5);

        for (let i = 0; i < edgesPerNode; i++) {
            const newNeighbour = potentialConnectedNodes.pop();
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

            if (nodesToCreate === 1)
                matrix[newNeighbourY][newNeighbourX].destination = true;

            outerVisited[nodeY][nodeX] = true;
            outerQueue.push(matrix[newNeighbourY][newNeighbourX]);
        }
    }

    return matrix;
};

export const runDijkstra = function () {
    const { gridMap: matrix } = this;
    const allNodes = matrix.flat().filter((node) => node);

    const sourceNode = allNodes.find((node) => node.source).gridId;

    const destinationNode = allNodes.find((node) => node.destination).gridId;

    const gridIdToNode = {};
    const gridEdgeIdToEdge = {};

    const predecessor = {};
    const shortestDistance = {};
    const graph = {};

    const edges = document.querySelectorAll(".edge");

    edges.forEach(function (edge) {
        const id = edge.id;
        gridEdgeIdToEdge[`edge--${id.match(/\d+/g).join(",")}`] = edge;
    });

    allNodes.forEach(function (node) {
        gridIdToNode[node.gridId] = node;
        predecessor[node.gridId] = null;
        shortestDistance[node.gridId] = Number.POSITIVE_INFINITY;

        graph[node.gridId] = {};

        node.renderedEdges = {};

        node.edges.forEach(function (edge) {
            const coords = [node.row, node.column, ...edge];
            const edgeId = `edge--${coords.join(",")}`;
            const renderedEdge = gridEdgeIdToEdge[edgeId];
            graph[node.gridId][`node--${edge.join(",")}`] = parseFloat(
                renderedEdge.style.width
            );
        });
    });

    const unVisitedNodes = cloneDeep(graph);

    shortestDistance[sourceNode] = 0;

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    console.log(gridEdgeIdToEdge);

    (async function () {
        while (!isEmpty(unVisitedNodes)) {
            let minNodeId = null;

            console.log(Object.keys(unVisitedNodes).length);
            console.log(unVisitedNodes);
            // console.log(unVisitedNodes);

            Object.entries(unVisitedNodes).forEach(function ([nodeId, edges]) {
                if (!minNodeId) minNodeId = nodeId;
                else if (shortestDistance[nodeId] < shortestDistance[minNodeId])
                    minNodeId = nodeId;
            });

            const minNode = graph[minNodeId];

            const matrixMinNode = gridIdToNode[minNodeId];

            Object.entries(minNode).forEach(function ([childNode, weight]) {
                const edgeId = `edge--${matrixMinNode.row},${matrixMinNode.column},${gridIdToNode[childNode].row},${gridIdToNode[childNode].column}`;

                const edge = gridEdgeIdToEdge[edgeId];
                edge.classList.add("edge-traversing");

                // await sleep(400);

                if (
                    weight + shortestDistance[minNodeId] <
                    shortestDistance[childNode]
                ) {
                    shortestDistance[childNode] =
                        weight + shortestDistance[minNodeId];
                    predecessor[childNode] = minNodeId;
                }
            });

            delete unVisitedNodes[minNodeId];

            await sleep(400);

            console.log(unVisitedNodes);
        }
    })();

    console.log(shortestDistance);
    console.log(predecessor);
};
