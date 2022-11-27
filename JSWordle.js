document.addEventListener("DOMContentLoaded",()=>{
    let word;
    let guessWordCounter=0;
    const words=["שיטור","פיקוח","טלפון","עיתון","חברות","תפיסה","זריקה","קפיצה","קריצה","שליטה","קליפה","בקבוק","קופסה","ילקוט","תרומה","תקומה","עוצמה","קטנוע","צמצום","קיטוב"];
    createSquares();
    newWord(words);
    const keys=document.querySelectorAll(".keyBoard-row button");
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick=({target})=>{
            const letter=target.getAttribute("data-key");
            if(letter==="enter"){
                handleSubmitWord();
                return;
            }
            if (letter==="del"){
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }
    function createSquares(){
        const gameBoard=document.getElementById("board");
        for (let i=0; i<30;i++){
            let square=document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id",i+1);
            gameBoard.appendChild(square);

        }
    }
    function newWord(words){
        word=words[Math.floor(Math.random()*words.length)];
        return word;
    }
    function getTileColor(letter,index){
        const rightLetter=word.includes(letter);
        if(!rightLetter){
            return "rgb(58,58,60)";
        }
        const rightPlace=word.charAt(index);
        if(rightPlace===letter){
            return "rgb(37,236,14)";
        }
        return "rgb(238,182,19)"
    }

    function handleDeleteLetter(){
        const currentWordArr=getCurrentWordArr();
        const removedLetter=currentWordArr.pop();
        guessedWords[guessedWords.length-1]=currentWordArr;
        const lastLetterEl=document.getElementById(String(availableSpace-1));
        lastLetterEl.textContent="";
        availableSpace-=1;
    }
    function playWinningSong(){
        let audio=new Audio("WinningSong.mp3");
        audio.play();
    }

    function handleSubmitWord(){
        const currentWordArr=getCurrentWordArr();
        if(currentWordArr.length!==5){
            window.alert("word must contain 5 letters!");
        }

        const currentWord=currentWordArr.join("");
        const interval=200;
        const firstLetterId=5*guessWordCounter+1;//just like square 6 11 and so on...
        currentWordArr.forEach((letter,index)=>{
            setTimeout(()=>{
                const tileColor=getTileColor(letter,index);
                const letterId=firstLetterId+index;
                const  letterEl=document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style.backgroundColor=tileColor;
                letterEl.style.borderColor=tileColor;
            },interval*index);
        });
        guessWordCounter+=1;
        if (!words.includes(currentWord)){
            window.alert("not a real word!");
            
        }
        if(currentWord===word){
            window.alert("you won!");
            playWinningSong();
        }

        if(guessedWords.length===6){
            window.alert("sorry, you have lost, the word is"+word);
        }

        guessedWords.push([]);
    }

    const guessedWords=[[]];
    let availableSpace=1;
    function getCurrentWordArr(){
        const numberOfGuessedWords=guessedWords.length;
        return guessedWords[numberOfGuessedWords-1];
    }
    function updateGuessedWords(letter){
        const currentWordArr=getCurrentWordArr();
        if(currentWordArr && currentWordArr.length<5){
            currentWordArr.push(letter);
            const availableSpaceEl=document.getElementById(String(availableSpace));
            availableSpace=availableSpace+1;
            availableSpaceEl.textContent=letter;
        }
    }


});
