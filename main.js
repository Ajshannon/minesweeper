const board = {



    element: document.getElementById("board"),
    width: 400,
    height: 400,
    cellSize: 20,
    cellArray: [],
    //calcCells = totalCells 
    calcCells: function () {
        return (Math.floor(this.width / this.cellSize) * Math.floor(this.width / this.cellSize));
    },
    //calcBombChance = bombChance
    calcBombChance: function () {
        return (Math.floor(Math.floor(this.width / this.cellSize) / 3))
    },
    calcBombsCounted: function () {
        return Math.floor(this.calcCells() / this.calcBombChance())
    },
    calcRowCount: function () {
        return Math.floor(this.height / this.cellSize);
    },
    calcCellCount: function () {
        return Math.floor(this.width / this.cellSize);
    },
    bombsPlaced: 0,
    // bombCount: Math.floor(Math.floor(this.width / this.cellSize) / 3),

    makeScaffold: function () {

        let arr = new Array(board.calcRowCount());
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(board.calcCellCount());
        }
        return arr;
    },

    setBombs: function (grid) {
        let limit = board.calcCellCount();
        let mineField = board.makeScaffold();
        // Pick total Bomb spots
        let options = [];
        for (let i = 0; i < mineField.length; i++) {
            for (let j = 0; j < mineField[i].length; j++) {
                options.push([i, j]);
            }
        };
        //creates an array of grid locations
        //second for loop randomly selects which spots in the array are bombs.
        //it does this by selecting the the two numbers in one index of the options array,
        // and then it 
        for (let n = 0; n < board.calcBombsCounted(); n++) {
            let optLength = options.length;
            let randomOptions = (Math.random() * optLength);
            //this selects a number of spots determined by how many bombs there should be,
            let index = Math.floor(randomOptions);
            //the randomly generated number the options array index identifier
            let choice = options[index];
            let i = choice[0];
            let j = choice[1];
            // Deletes that spot so it's no longer an option for the random generator to choose.
            options.splice(index, 1);
            board.bombsPlaced += 1;
            mineField[i][j] = "bomb";

        };

        console.log("bomb: " + board.bombsPlaced);

        return mineField;
    },

    neighborCount: function () {
        let mineFieldPhase2 = board.setBombs();
        let limit = board.calcCellCount();
        console.log("limit: " + limit)
        console.table([...mineFieldPhase2]);
        for (let i = 0; i < mineFieldPhase2.length; i++) {
            //goes thru rows 
            for (let j = 0; j < mineFieldPhase2[i].length; j++) {
                let total = 0;
                if (mineFieldPhase2[i][j] !== "bomb") {
                    for (let xoff = -1; xoff <= 1; xoff++) {
                        let i2 = i + xoff;
                        if (i2 >= 0 || i2 <= limit) {
                            for (let yoff = -1; yoff <= 1; yoff++) {
                                let j2 = j + yoff;
                                if (j2 >= 0 || j2 <= limit) {
                                    //if both are in limits then execute
                                    if (mineFieldPhase2[i2] && mineFieldPhase2[i2][j2]) {
                                        let neighbor = mineFieldPhase2[i2][j2];
                                        if (neighbor === "bomb") {
                                            total++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // console.log(total);
                    mineFieldPhase2[i][j] = total;
                }
            }
        };
        return mineFieldPhase2;
    },
    makeRows: function () {
        //Width = 400, w = 20 : 400 / 20 = 20 rounded down = 20 rows
        let grid = board.neighborCount();
        console.log(board.calcRowCount() + "rows");
        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            rowElement.id = 'row-' + rowIndex;
            this.cellArray.push([]);
            this.element.appendChild(rowElement);
            this.makeCells(rowElement, rowIndex, grid);
        }
    },

    makeCells: function (rowElement, rowIndex, grid) {

        for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
            const cell = new Cell(rowIndex, cellIndex, grid, this.cellArray);
            this.cellArray[rowIndex].push(cell);
            rowElement.appendChild(cell.element);

        }
    },
    failed: function () {
        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
            for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
                console.log("fail")
            }
        }

    }
}
board.makeRows();
const rowElements = board.element.childNodes
const cellElements = rowElements[1].childNodes
cellElement = cellElements[1]