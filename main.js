const timer_display = document.getElementById("timer")
const type_button = document.getElementById("type")
const start_button = document.getElementById("start-button")
const brain_fill = document.getElementById("brain-fill")

start_button.addEventListener("click", startStop);
type_button.addEventListener("click", changeType);

const STATES = {
    "Work": {
        duration: 10,
        color: "var(--red)"
    },
    "Break": {
        duration: 300,
        color: "var(--blue)"
    },
    "Long Break": {
        duration: 1800,
        color: "var(--purple)"
    }
}
const STATE_KEYS = ["Work", "Break","Long Break"]
let current_key_index = 0
let current_state = STATE_KEYS[0]

let cycleTimes = 0;
let total_time = STATES[current_state].duration
let time_left = STATES[current_state].duration
let is_running = false
let timer_id = null

function buttonChange(){
    if (is_running){
        start_button.innerText = "STOP"
        start_button.style.backgroundColor = "var(--blue)"
    }
    else{
        start_button.innerText = "START"
        start_button.style.backgroundColor = STATES[current_state].color;
    }
}
function updateDisplay(){
    let minutes = Math.floor(time_left / 60)
    let seconds = time_left % 60
    
    // Calcula a porcentagem de 0 a 100
    let percent = Math.floor(100 * (total_time - time_left) / total_time)
    timer_display.innerHTML = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`
        let new_position_y = "0%";
    if (current_state === "Work") {
        new_position_y = percent + "%";
    }
    brain_fill.style.backgroundPositionY = new_position_y;
    let new_color = "var(--pink)";
    brain_fill.style.backgroundImage = `linear-gradient(to top, ${new_color} 50%, transparent 50%)`;
}

function updateState(state_key){
    current_state = state_key
    let stateData = STATES[state_key]

    type_button.innerHTML = current_state;
    type_button.style.backgroundColor = stateData.color

    total_time = stateData.duration
    time_left = total_time;

    updateDisplay()
}

function changeType(){
    current_key_index = (current_key_index + 1) % STATE_KEYS.length;
    current_state = STATE_KEYS[current_key_index];
    updateState(current_state)
    cycleTimes = 0
}

function cicle(){
    clearInterval(timer_id)
    if (current_state == "Work") {
        cycleTimes++
        if(cycleTimes<4){
            current_state = STATE_KEYS[1]
        }
        else{
            current_state = STATE_KEYS[2]
            cycleTimes = 0
        }
    }
    else{
        current_state = STATE_KEYS[0]
    }
    updateState(current_state)
    timer_id = setInterval(loop, 1000)
}
function loop(){
    time_left --
    updateDisplay()
    if (time_left < 0) {
        cicle()
    }
}

function startStop(){
    // se já está rodando o botão irá parar
    if(is_running){
        is_running = false
        clearInterval(timer_id)
        timer_id = null
    }
    else{
        is_running = true
        timer_id = setInterval(loop, 1000)
    }
    buttonChange()
}