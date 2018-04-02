// Object - creates Object -
// can manipulate the object by 
//using obj.prototype.var = X
//EXAMPLE -

// function Cat (name, color) {
//     this.name = name
//     this.color = color
// }
// Cat.prototype.age = 3

//var fluffy = new Cat ('Fluffy', 'White')
//var muffin = new Cat ('Muffin', Brown)

//muffin.age = 5;

//console.log(fluffy.age); = 3 : but why?
// 1st java checks fluffy: but there is no age
// 2nd java checks the __proto__:cat 
// the Cat constructor has the age of 3 
//therefore fluffys age is inherited by its __proto__

//console.log(muffin.age); = 5 : but why?
// 1st java checks muffin: since there was an age assigned it takes that value.
// therefore muffins age is 5;

//objects are instances and can be overwritten in code so be sure to check scope. 
const number = ["", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"];
const state = ["mine.png", "closed.png", "flag.png"]
const bomb = ("images/" + state[0]);
const closed = ("images/" + state[1]);
const flag = ("images/" + state[2]);

function Cell(rowIndex, cellIndex, grid) {
    this.rowIndex = rowIndex;
    this.cellIndex = cellIndex;
    this.isBomb = false;
    this.grid = grid;
    this.limit = grid.length;
    this.count = 0;
    //add reveal on click
    this.revealed = true;
    this.element = document.createElement('div');
    this.element.classList.add('cell');
    this.element.id = `cell-${rowIndex}-${cellIndex}`;
    //dataset
    this.element.dataset.row = rowIndex;
    this.element.dataset.index = cellIndex;
    //dataset
    this.img = document.createElement("img");

    this.element.appendChild(this.img);
    // this.clicked = function () {
    //     console.log("clicked");
    // }
    this.handleEvent = function (event) {
        if (this.revealed === false) {
            this.revealed = true;
            console.log("clicked")

        }


    }
    this.img.addEventListener("click", this);

    if (this.revealed === false) {
        this.img.src = closed;
    };
    if (this.revealed) {
        let cell = grid[this.rowIndex][this.cellIndex];
        if (cell === ("bomb")) {
            
            this.element.dataset.state = "bomb";
            this.isBomb = true;
            this.img.src = bomb;
        } else if (cell > 0 && cell <= this.limit) {
            this.img.src = ("images/" + number[cell]);
        } else {
        }
    }
}

// this.element.eventListener
Cell.prototype.reveal = function () {
    if (this.revealed) {
        if (this.includes("bomb")) {
            console.log("bing")
            this.img.src = this.bomb;
            this.img.style.position = "absolute";

        } 
    }
}

Cell.prototype.makecell = function () {



}

// if (this.revealed) {
//     if (grid[this.rowIndex][this.cellIndex] === ("bomb")) {
//         this.element.dataset.state = "bomb";
//         this.isBomb = true;
//         this.img.src = bomb;
//     } else {
//         this.count = 0;
//         //left 1
//         if (grid[this.rowIndex][this.cellIndex - 1] > this.cellEdge && grid[this.rowIndex][this.cellIndex - 1] === ("bomb")) {
//             this.count++;
//         }
//         //right 1
//         if (grid[this.rowIndex][this.cellIndex + 1] < this.cellEdge && grid[this.rowIndex][this.cellIndex + 1] === ("bomb")) {
//             this.count++
//         }
//         //up 1
//         if (grid[this.rowIndex - 1] > this.rowEdge && grid[this.rowIndex - 1][this.cellIndex] === ("bomb")) {
//             this.count++
//         }
//         //down 1
//         if (grid[this.rowIndex + 1] < this.rowEdge && grid[this.rowIndex + 1][this.cellIndex] === ("bomb")) {
//             this.count++
//         }
//         // diagonal
//         // up 1 left 1
//         if (grid[this.rowIndex - 1] > this.rowEdge && grid[this.rowIndex][this.cellIndex - 1] > this.cellEdge && grid[this.rowIndex - 1][this.cellIndex - 1] === ("bomb")) {
//             this.count++
//         }
//         //up 1 right 1
//         if (grid[this.rowIndex - 1] > this.rowEdge && grid[this.rowIndex][this.cellIndex + 1] < this.cellEdge && grid[this.rowIndex - 1][this.cellIndex + 1] === ("bomb")) {
//             this.count++
//         }
//         //down 1 right 1
//         if (grid[this.rowIndex + 1] < this.rowEdge && grid[this.rowIndex][this.cellIndex + 1] < this.cellEdge && grid[this.rowIndex + 1][this.cellIndex + 1] === ("bomb")) {
//             this.count++
//         }
//         //down 1 left 1
//         if (grid[this.rowIndex + 1] < this.rowEdge && grid[this.rowIndex][this.cellIndex - 1] > this.cellEdge && grid[this.rowIndex + 1][this.cellIndex -1] === ("bomb")) {
//             this.count++
//         }
//         if (this.count > 0) {
//             this.img.src = ("images/" + number[this.count]);
//         }
//         else{

//         };

//         console.log(this.count);
//     }
// }