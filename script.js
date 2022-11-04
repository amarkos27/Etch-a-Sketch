function etch(){
    const grid = document.querySelector('.canvas');
    const slider = document.querySelector('input[type="range"]');
    const buttons = document.querySelectorAll('button');
    let oldArray = newGrid(+slider.value, grid);

    inputListener();
    slider.addEventListener('change', e => {
        oldArray = newGrid(+e.target.value, grid, oldArray);
    });
    for(let button of buttons){
        button.addEventListener('click', () => handler(button, oldArray));
    }
}

function createArray(value){
    let array = new Array(value);
    for(let i = 0; i < array.length; i++){
        array[i] = new Array(value);
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
    grid.style.gridTemplateColumns = `repeat(${array.length}, 1fr)`;
    for(let column of array){
        for(let row of column){
            grid.appendChild(row);
        }
    }
}

function destroyGrid(grid, array){
    for(let column of array){
        for(let row of column){
            row.parentNode.removeChild(row);
        }
    }
    window.removeEventListener('mouseup', () => stopDrawing(array));
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
    const input = document.querySelector('.color');
    input.addEventListener('input', changeLabel);
}

function changeLabel(e){
    const label = document.querySelector('label');
    label.style.backgroundColor = e.target.value;
}

function getInput(){
    const input = document.querySelector('.color');
    return input.value;
}

function handler(button, array){
    switch(button.textContent){
        case 'Rainbow':
            button.classList.toggle('clicked');
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

function clearCanvas(array, buttons){
    for(let col = 0; col < array.length; col++){
        for(let row = 0; row < array[col].length; row++){
            array[col][row].style.backgroundColor = '#fffdf6';
        }
    }
}

function newGrid(value, grid, oldArray = null){
    const gridSize = document.querySelector('p');
    if(grid.children.length > 0){
        destroyGrid(grid, oldArray);
    }
    let array = createArray(value);
    array = fillArray(array);
    gridSize.textContent = `${array.length} X ${array.length}`;
    addListeners(array);
    fillGrid(grid, array);

    return array;
}

etch();