function etch(){
    let grid = document.querySelector('.container');
    let temp = document.createElement('div');
    let array = createArray();
    array = fillArray(array);
    addListeners(array);
    fillGrid(grid, array);

}

function createArray(){
    let array = new Array(16);
    for(let i = 0; i < array.length; i++){
        array[i] = new Array(16);
    }
    return array;
}

function fillArray(array){
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            array[i][j] = document.createElement('div');
        }
    }
    return array;
}

function fillGrid(grid, array){
    for(let column = 0; column < array.length; column++){
        for(let row = 0; row < array[column].length; row++){
            grid.appendChild(array[column][row]);
        }
    }
}

function addListeners(array){
    for(column of array){
        for(row of column){
            row.addEventListener('mouseover', draw);
        }
    }
}

function draw(e){
    e.target.style.background = 'black';
}

etch();