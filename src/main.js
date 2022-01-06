import Character from './Character.js';

let main = document.getElementById("main");//Where characters are introducced
let idAct = 0;//id from character
let grid = [["."]];//grid layout

document.getElementById("next").addEventListener("click", (e)=>{
    idAct++;
    createCharacterId(idAct);
    document.getElementById("prueba").href=`#c${idAct-1}`;
    e.stopImmediatePropagation();
}, true);

let getCharacter = async (id) => {
    return await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((cha) => cha.json())
        .then((cha) => cha);
}

//Create a character by id
let createCharacterId = async (id) => {
    let cha = await getCharacter(id);
    cha = new Character(cha);
    createCardCharacter(cha);
}

let layout = 0;
//Change the grid layout
let changeGrid = () => {
    //When the grid is small, add new row or col
    if (grid.length*grid[0].length == idAct-1) {
        layout++;
        //Add row
        if (layout%2==0) {
            for (let i = 0; i < grid.length; i++) {
                grid[i].push(".");
            }
        }else{//Add col
            grid.push([]);
            for (let i = 0; i < grid[0].length; i++) {
                grid[grid.length-1].push(".")
            }
        }
    }

    //Create a random position in grid layout
    let ramRow;
    let ramCol;
    do {
        ramRow = Math.floor(Math.random()*grid.length);
        ramCol = Math.floor(Math.random()*grid[0].length);
    } while (grid[ramRow][ramCol]!=".");
    
    //Assign the position
    grid[ramRow][ramCol]=`c${idAct}`
    
    //Transform the "grid" variable into a suitable string
    let template;
    for (let i = 0; i < grid.length; i++) {
        template+="'"+grid[i].toString()+"'";
    }
    template = template.replace(/,/g, " ");
    template = template.slice(9, template.length);//I dont know why in the beggin of the variable "grid" is undefined

    main.style.gridTemplateAreas = template;
    //main.style.gridTemplateColumns = `repeat(${grid[0].length}, 1fr)`;
}

//Insert the html structure from x character
let createCardCharacter = (cha) =>{
    main.innerHTML+=
    `
    <div class="super__card" id="c${idAct}">
        <div class="card">
            <img src="${cha.image}" class="card__img" alt="">
            <div class="card__data">
                <div class="card__data-name">${cha.name}</div>
                <div class="card__data-lot">
                    <div class="card__data-status">${cha.status}</div>
                    <span>&nbsp;-&nbsp;</span>
                    <div class="card__data-species">${cha.species}</div>
                </div>
                <div>
                    <span class="card__data-info">Last know location:</span>
                    <div class="card__data-origin">${cha.origin}</div>
                </div>
                <div>
                    <span class="card__data-info">Gender:</span>
                    <div class="card__data-gender">${cha.gender}</div>
                </div>
            </div>
        </div>
    </div>
    `;
    //Add to x character her grid area
    document.getElementById(`c${idAct}`).style.gridArea = `c${idAct}`;
    changeGrid();
}

idAct++;
createCharacterId(idAct);
document.getElementById("prueba").href=`#c${idAct-1}`;