let text = [
    "WUBBA LUBBA DUB DUB", 
    "Científicamente hablando, las tradiciones son estúpidas", 
    "¡Son robots, Morty! ¡Está bien dispararles! ¡Son robots!",
    "Ni lo entiendo, ni necesito entenderlo"]

let dom = document.getElementById("nav__text")

let text2 = "WUBBA LUBBA DUB DUB";

const getLetter = (letter) =>{
    return new Promise((resolve, reject)=>{
        if (letter) {
            setTimeout(() => {
                resolve(letter);
            }, 200);
        }else{
            reject("No se ha encontrado letra");
        }
    })
}

const dropSentence = (sentence) =>{
    return new Promise((resolve, reject)=>{
        if (sentence) {
            setTimeout(() => {
                resolve(sentence.slice(0, sentence.length-1))
            }, 100);
        }else{
            reject("No se ha encontrado sentencia");
        }
    })
}

const waitTime = (time) => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {resolve("")}, time);
    })
}


const printSentence = async () => {
    while (true) {   
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < text[i].length; j++) {
                let sentence = await getLetter(text[i][j]).then((result) => result);
                dom.innerHTML+=sentence;
            }
            await waitTime(5000);
            for (let j = 0; j < text[i].length; j++) {
                dom.innerHTML = await dropSentence(dom.innerHTML);  
            }
            
        }
    }
}

printSentence();

document.getElementById("arrow").addEventListener("click", ()=>{
    document.getElementById("gun").style.display="block";
});