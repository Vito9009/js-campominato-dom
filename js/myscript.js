/*

PRIMA PARTE

L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

SECONDA PARTE (ESERCIZIO DELGIORNO)

Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
Consigli del giorno: :party_wizard:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.

*/

let play = document.getElementById("play"); // Variabile tasto play

play.addEventListener ("click", function(){ // evento al click del tasto play
    let selectLevel = document.getElementById("difficulty-level").value; // variabile per il select
    let gridCreator = document.getElementById("grid"); // variabile per selezionare il contenitote per la creazione della griglia di gioco
    gridCreator.innerHTML = ""; // Elimina griglia precedente prima di creare la nuova griglia dopo il click del pulsante play
    lose.innerHTML = "";
    let bombsArray = []; // Array bombe

    if (selectLevel == "easy"){ // Se seleziono il livello easy
        for(let i=1; i<=100; i++){
            gridCreator.innerHTML += `
            <div class="box-ten clickedBox bomb">
            ${i}
            </div>
            `;
        }
    }else if (selectLevel == "medium"){ // Se seleziono il livello medium
        for(let i=1; i<=81; i++){
            gridCreator.innerHTML += `
            <div class="box-nine clickedBox bomb">
            ${i}
            </div>
            `;
        }
    }else if (selectLevel == "hard"){ // Se seleziono il livello hard
        for(let i=1; i<=49; i++){
            gridCreator.innerHTML += `
            <div class="box-seven clickedBox bomb">
                ${i}
                </div>
                `;
        }
    }

 let clickedBox = document.getElementsByClassName("clickedBox"); // Variabile per il box che cambia colore al click

    for (let i=0; i < clickedBox.length; i++){

        clickedBox[i].addEventListener("click", function(){ // Aggiunta classe per colorare il box che viene cliccato
            this.classList.add("click-colored-box"); // this in questo caso è: clickedBox[i]
            // console.log(clickedBox[i]); Mostra in console quale numero/casella è stato cliccato
        }
        )
    }

let bomb = document.querySelectorAll(".bomb");

creatorBombs();

function creatorBombs() {   // Funzione per la creazione delle bombe
    for (let i=0; i<16; i++) {
        let bombsRandom = Math.floor(Math.random() * bomb.length +1);   // Variabile con numeri random necessaria per la creazione delle bombe
        if (bombsArray.includes(bombsRandom)==true){    // Tramite if ed else chiedo di inserire il numero random nella bombArray se non è presente o di ripetere il giro per trovare un nuovo numero da inserire nel caso in cui quello "estratto" sia già presente
            i--;
        }else{
            bombsArray.push(bombsRandom);
        }
    }
} //console.log(bombsArray);

    for (let i=0; i < bomb.length; i++){
        bomb[i].addEventListener("click", function() {
            let clickedNumber = parseInt(this.innerHTML);   // Variabile con il numero cliccato

            if (bombsArray.includes(clickedNumber)==true) { // Se il numero cliccato è presente nella bombsArray la casella diventa rossa, altrimenti diventa blu
                this.classList.add("red-box");
                boxBomb();
            }else {
                this.classList.add("click-colored-box");
            }
        });

        function boxBomb(){
            for (let i=0; i < bomb.length; i++){
                let globalClickedNumber = parseInt(bomb[i].innerHTML);
                
                if (bombsArray.includes(globalClickedNumber)==true) {   // Se clicco un numero presente nell'array tutti i box contenenti i numeri in esso presenti diventano rossi e gli altri diventano verdi
                    bomb[i].classList.add("red-box");
                    lose.innerHTML=("💣 BOOOOM!!!💣<br>Hai PERSO!")
                }else {
                    bomb[i].classList.add("green-box");
                }
            }
        }
    }
})

/*
AGGIUNGERE MESSAGGIO IN CASO DI VITTORIA
*/