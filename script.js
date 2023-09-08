const n = 10;
const array = [];
const container = document.getElementById("container"); // Get the container element by its ID

init();
let audioctx=null;
function playnote(freq)
{
if(audioctx==null)
{
    audioctx=new(
        AudioContext|| webkitAudioContext|| window.webkitAudioContext
        )();
}
const dur=0.1;
const osc=audioctx.createOscillator();
osc.frequency.value=freq;
osc.start();
osc.stop(audioctx.currentTime+dur);

const node=audioctx.createGain();
node.gain.value=0.1;
node.gain.linearRampToValueAtTime(0,audioctx.currentTime+dur);
osc.connect(node);
node.connect(audioctx.destination);
}
function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function play() {
    const copy = [...array];
    const moves = bubblesort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length == 0) {
        showBars(); // Reset all bars to their default color
        return;
    }
    const move = moves.shift();
  const[i,j] =move.indices;
  if(move.type=="swap"){
    [array[i], array[j]] = [array[j], array[i]];
  }
  playnote(200*array[i]*500);
  playnote(200*array[j]*500);
    showBars(move); // Pass indices as an array
    setTimeout(function () {
        animate(moves);
    }, 200);
}

function bubblesort(copy) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < copy.length; i++) {
            moves.push({indices:[i - 1, i],type:"comp"});
            if (copy[i - 1] > copy[i]) {
                swapped = true;
                moves.push({indices:[i - 1, i],type:"swap"});
                [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
            }
        }
    } while (swapped);
    return moves;
}

function showBars(move) {
    container.innerHTML = " ";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices && move.indices.includes(i)) {
            bar.style.backgroundColor =
            move.type=="swap"? "red":"blue";
        }
        container.appendChild(bar);
    }
}

