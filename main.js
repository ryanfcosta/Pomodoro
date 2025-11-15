let timer
let type = "work"
let percent
let start_button = document.getElementById("start_button")

function ButtonChange(){
    start_button.innerText = "STOP"
    start_button.style.backgroundColor("#4B7DBF")
}

function Cicle(break_time){
    while(timer < 1500){
        timer +=1 
        percent = timer/1500
        document.getElementById("percent_tomato").innerHTML(percent)
        document.getElementById("timer").innerHTML(Math.floor((1500 - timer)/60) + ":" + ((1500 - timer)%60 < 10 ? "0" : "") + (1500 - timer)%60)
    }
    timer = 0
        type = "break"
    while(timer < break_time){
        timer +=1
        percent = timer/break_time
    }
}

function Start(){
    ButtonChange()
    for (let i = 0; i < 4; i++){
        Cicle(300)
    }
    Cicle(1800)
}
