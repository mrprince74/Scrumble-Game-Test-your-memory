const ALL_ITEMS = [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🐧",
    "🐦",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🐛",
    "🦋",
    "🐌",
    "🐞",
    "🐜",
    "🦟",
    "🦗",
    "🕷",
    "🦂",
    "🐢",
    "🐍",
    "🦎",
    "🦖",
    "🦕",
    "🐙",
    "🦑",
    "🦐",
    "🦞",
    "🦀",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
];
const MAX_GRID_SIZE = ALL_ITEMS.length * 2;
let clickedItems = [];
let remainingItems = null;
let rainInterval = null;
let timeLimitInterval = null;
let remainingSeconds = null;
let hasWon = false;

const shuffle = (array) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
};

const buildGrid = (n_rows, n_cols) => {
    // shuffle first to ensure complete randomness
    shuffle(ALL_ITEMS);
    let grid_size = n_rows * n_cols;
    // take only half the grid size, and duplicate them
    let grid = ALL_ITEMS.slice(0, Math.floor(grid_size / 2));
    grid = grid.concat(grid);
    shuffle(grid);

    return grid;
};
const resetGame = () => {
    clearInterval(rainInterval);
    clearInterval(timeLimitInterval);
    rainInterval = null;
    timeLimitInterval = null;
    document.getElementById("rain").innerHTML = "";
    document.getElementById("remaining_time").style.display = "none";
    remainingItems = null;
    remainingSeconds = null;
    hasWon = false;
};

const handleWin = () => {
    const container = document.getElementById("rain");
    const audio = new Audio("audio/victory_sound_effect.mp3");
    audio.play();

    function spawnDrop() {
        const drop = document.createElement("div");
        drop.className = "drop";
        drop.style.left = Math.random() * 110 - 5 + "vw";
        const dur = Math.random() * 1.2 + 0.7;
        const h = Math.random() * 22 + 12;
        drop.style.animationDuration = dur + "s";
        drop.style.height = h + "px";
        drop.style.opacity = String(Math.random() * 0.5 + 0.5);
        drop.style.filter = "blur(" + Math.random().toFixed(1) + "px)";
        container.appendChild(drop);
        setTimeout(() => drop.remove(), (dur + 0.2) * 1000);
    }
    rainInterval = setInterval(spawnDrop, 20);

    // Show modal after a short delay so the rain is enjoyed first
    setTimeout(() => {
        document.getElementById("win-modal").style.display = "flex";
    }, 2000);
};

const handleClickItem = (item, grid) => {
    // Flip down
    if (!item.classList.contains("facedown")) {
        item.classList.add("facedown");
        item.textContent = "";
        clickedItems.pop();
        return;
    }
    // Flip up
    item.classList.remove("facedown");
    item.textContent = grid[Number(item.id)];
    clickedItems.push(item);
    if (clickedItems.length != 2) return;
    let elem1 = clickedItems.pop();
    let elem2 = clickedItems.pop();
    if (elem1.textContent != elem2.textContent) {
        setTimeout(() => {
            elem1.classList.add("facedown");
            elem1.textContent = "";
            elem2.classList.add("facedown");
            elem2.textContent = "";
        }, 750);
        return;
    }
    elem1.style.pointerEvents = "none";
    elem2.style.pointerEvents = "none";
    elem1.classList.add("matched");
    elem2.classList.add("matched");
    remainingItems -= 2;

    if (remainingItems == 0) {
        hasWon = true;
        handleWin();
    }
};

const drawGrid = (grid, n_rows, n_cols) => {
    const gridElem = document.getElementById("grid");
    gridElem.innerHTML = "";
    gridElem.style.gridTemplateRows = `repeat(${n_rows}, 1fr)`;
    gridElem.style.gridTemplateColumns = `repeat(${n_cols}, 1fr)`;

    grid.map((val, idx) => {
        let item = document.createElement("div");
        item.className = "grid-item facedown";
        item.id = `${idx}`;
        item.textContent = "";
        item.style.fontSize = `min(${30 / n_cols}vw, ${30 / n_rows}vh)`;
        item.addEventListener("click", () => {
            handleClickItem(item, grid);
        });
        gridElem.appendChild(item);
    });
};
const handleLose = () => {
    const audio = new Audio("audio/lose_sound_effect.mp3");
    audio.play();
    const modal = document.getElementById("game-over-modal");
    modal.style.display = "flex";
};

const handleTimeLimit = () => {
    const remainingTimeElem = document.getElementById("remaining_time");
    remainingTimeElem.style.display = "flex";
    remainingTimeElem.innerText = `Time Remaining: ${remainingSeconds}s`;

    timeLimitInterval = setInterval(() => {
        remainingSeconds--;
        remainingTimeElem.innerText = `Time Remaining: ${remainingSeconds}s`;
        if (hasWon) {
            clearInterval(timeLimitInterval);
            return;
        }
        if (remainingSeconds <= 0) {
            handleLose();
            clearInterval(timeLimitInterval);
            return;
        }
    }, 1000);
};

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    resetGame();
    let n_rows = Number(document.getElementById("n_rows").value);
    let n_cols = Number(document.getElementById("n_cols").value);
    let gridSize = n_cols * n_rows;
    if (gridSize & 1) {
        alert("Grid Size must be even");
        return;
    }
    if (gridSize > MAX_GRID_SIZE) {
        alert(`Grid Size cannot be larger than ${MAX_GRID_SIZE}`);
        return;
    }
    remainingItems = gridSize;
    let grid = buildGrid(n_rows, n_cols);
    drawGrid(grid, n_rows, n_cols);
    remainingSeconds = document.getElementById("time_limit").value;
    handleTimeLimit();
});