const GRAVITY = 3;
const JUMP_HEIGHT = 5;
const MAX_JUMPS = 20;

const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");

let jumping = false;
let counter = 0;

hole.addEventListener("animationiteration", () => {
    console.log("ANIMATION COMMENCE!");
    const random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
    counter++; // Score
});

const getCharacterTop = () => {
    const retVal = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    return retVal;
}

setInterval(() => {
    console.log("Gravité");

    const characterTop = getCharacterTop();
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    const cTop = -(500-characterTop);

    if(jumping === false) {
        character.style.top = (characterTop + GRAVITY)+"px";
    }

    if((characterTop > (500 - character.style.height)) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        alert("Game over. Score: "+counter);
        character.style.top = 100+"px";
        counter = 0;
    }

}, 10);

const jump = () => {
    console.log("SAUT");
    jumping = true;

    let jumpCount = 0;

    const jumpInterval = setInterval(() => {
        jumpCount++;

        const characterTop = getCharacterTop();

        if(characterTop > 6 && jumpCount < 15) {
            character.style.top = (characterTop -5)+"px";
        }

        character.style.top = (characterTop - JUMP_HEIGHT)+"px";

        if(jumpCount > MAX_JUMPS) {
            clearInterval(jumpInterval);
            jumping = false;
            jumpCount = 0;
        }

    }, 10);
}
