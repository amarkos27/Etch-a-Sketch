function etch(){
    const grid = document.querySelector('.canvas');
    let array = createArray();
    array = fillArray(array);
    inputListener();
    addListeners(array);
    fillGrid(grid, array);
    buttons(array);
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
    for(let column of array){
        for(let row of column){
            row.addEventListener('mousedown', e => {
                draw(e, array);
            });
        }
    }
    window.addEventListener('mouseup', () => stopDrawing(array));
}

function draw(e, array){
    e.target.style.background = document.querySelector('.rainbow').classList.contains('clicked') ? random_hex() : getInput();
    if(e.type === 'mousedown'){
        for(let column of array){
            for(let row of column){
                row.addEventListener('mouseover', draw);
            }
        }
    }
}

function stopDrawing(array){
    for(let column of array){
        for(let row of column){
            row.removeEventListener('mouseover', draw);
        }
    }
}

function inputListener(){
    const input = document.querySelector('input');
    input.addEventListener('input', changeLabel);
}

function changeLabel(e){
    const label = document.querySelector('label');
    label.style.backgroundColor = e.target.value;
}

function getInput(){
    const input = document.querySelector('input');
    return input.value;
}

function buttons(array){
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', e => {
        handler(e, array);
    }));
}

function handler(e, array){
    switch(e.target.textContent){
        case 'Rainbow':
            e.target.classList.toggle('clicked');
            break;
        case 'Clear':
            clearCanvas(array);
            break;
    }
}

function random_hex(){
    let result = (Math.random() * 0xfffff * 1000000).toString(16);
    return `#${result.slice(0, 6)}`;
}

function clearCanvas(array){
    for(let col = 0; col < array.length; col++){
        for(let row = 0; row < array[col].length; row++){
            //Make sure corners stay rounded
            if((col === 0 && row === 0) || (col === 0 && row === array[0].length - 1)
            || (col === array.length - 1 && row === 0) || (col === array.length - 1 &&
                row === array[col].length - 1)){
                array[row][col].style.borderRadius = '.5rem';
            }
            array[col][row].style.backgroundColor = '#fffdf6';
        }
    }
}

etch();