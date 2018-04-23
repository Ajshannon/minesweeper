 const number = ["", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"];
 const state = ["mine.png", "closed.png", "flag.png"]
 const bomb = ("images/" + state[0]);
 const closed = ("images/" + state[1]);
 const flag = ("images/" + state[2]);
 let click1 = 0;
 let bombclicked = 0;
let failed = false;
 function Cell(rowIndex, cellIndex, grid, cellArray) {
     this.cellArray = cellArray;
     this.rowIndex = rowIndex;
     this.cellIndex = cellIndex;
     this.isBomb = false;
     this.grid = grid;
     this.limit = grid.length;
     this.count = 0;
     //add reveal on click
     this.revealed = false;
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

         let i = this.rowIndex;
         let j = this.cellIndex;
        
         if (this.revealed === false) {
             this.revealed = true;
             if (this.revealed) {
                 let cell = grid[this.rowIndex][this.cellIndex];
                 if (cell === ("bomb")) {
                     if (click1 != 0) {
                         this.element.dataset.state = "bomb";
                         this.isBomb = true;
                         this.img.src = bomb;

                         
                         
                          for (let xoff = -9; xoff <= 9; xoff++) {
                              let i2 = i + xoff;
                              if (i2 >= 0 || i2 <= this.limit) {
                                  for (let yoff = -9; yoff <= 9; yoff++) {
                                      let j2 = j + yoff;
                                      if (j2 >= 0 || j2 <= this.limit) {
                                          //if both are in limits then execute
                                          if (this.cellArray[i2] && this.cellArray[i2][j2]) {
                                              let neighbor = this.cellArray[i2][j2];
                                              let neighborValue = this.grid[i2][j2];
                                              
                                              if (neighborValue === "bomb") {
                                                  this.element.dataset.state = "bomb";
                                                  this.isBomb = true;
                                                  this.img.src = bomb;
                                                  neighbor.img.click();
                                              } else if (neighbor !== "bomb") {

                                                  if (!neighbor.revealed) {
                                                      neighbor.img.click();
                                                      
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }

                         return;
                     } else {
                         this.element.dataset.state = "";
                         this.isBomb = false;
                         this.img.src = "images/grey.png";
                         click1++
                     }
                 } else {
                     if (cell > 0 && cell <= this.limit || cell !== "bomb") {
                         click1++;
                         if (cell > 0 && cell <= this.limit) {
                             this.img.src = ("images/" + number[cell]);
                             this.img.id = ("img-" + i + "-" + j);

                         } else {
                             this.img.src = "images/grey.png";
                             for (let xoff = -1; xoff <= 1; xoff++) {
                                 let i2 = i + xoff;
                                 if (i2 >= 0 || i2 <= this.limit) {
                                     for (let yoff = -1; yoff <= 1; yoff++) {
                                         let j2 = j + yoff;
                                         if (j2 >= 0 || j2 <= this.limit) {
                                             //if both are in limits then execute
                                             if (this.cellArray[i2] && this.cellArray[i2][j2]) {
                                                 let neighbor = this.cellArray[i2][j2];
                                                 let neighborValue = this.grid[i2][j2];
                                                 
                                                 if (neighborValue === "bomb") {

                                                 } else if (neighbor !== "bomb") {

                                                     if (!neighbor.revealed) {
                                                         neighbor.img.click();
                                                         
                                                     }
                                                 }
                                             }
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
             }


         }
     }
     this.img.addEventListener("click", this);

     if (this.revealed === false) {
         this.img.src = closed;
     };
 }
 // this.element.eventListener
 Cell.prototype.reveal = function () {
     this.revealed = true;
 }
 Cell.prototype.makecell = function () {}
