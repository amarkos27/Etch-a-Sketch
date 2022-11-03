function etch(){
    const grid = document.querySelector('.canvas');
    let array = createArray();
    array = fillArray(array);
    inputListener();
    addListeners(array);
    fillGrid(grid, array);
    buttons();
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
    e.target.style.background = getInput();
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

function buttons(){
    let buttons = document.querySelectorAll('button');
    let label = document.querySelector('label');

    buttons.forEach(button => button.addEventListener('click', handler));
}

function handler(e){
    switch(e.target.textContent){
        case 'Rainbow':
            console.log('b');
            break;
        case 'Clear':
            console.log('c');
            break;
    }
}

etch();