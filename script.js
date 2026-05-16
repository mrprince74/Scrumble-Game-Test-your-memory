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
const clickItem = (item, grid) => {
    // TODO
};

const drawGrid = (grid, n_rows, n_cols) => {
    console.log(grid);
    const gridElem = document.getElementById("grid");
    gridElem.innerHTML = "";
    gridElem.style.gridTemplateRows = `repeat(${n_rows}, 1fr)`;
    gridElem.style.gridTemplateColumns = `repeat(${n_cols}, 1fr)`;

    grid.map((val, idx) => {
        let item = document.createElement("div");
        item.className = "grid-item";
        item.id = `${idx + 1}`;
        item.textContent = "#";
        item.style.fontSize = `min(${30 / n_cols}vw, ${30 / n_rows}vh)`;
        item.addEventListener("click", () => {
            alert("TODO!");
            handleClickItem(item, grid);
        });
        gridElem.appendChild(item);
    });
};

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let n_rows = document.getElementById("n_rows").value;
    let n_cols = document.getElementById("n_cols").value;
    if ((n_cols * n_rows) & 1) {
        alert("Grid Size must be even");
        return;
    }
    if (n_cols * n_rows > MAX_GRID_SIZE) {
        alert(`Grid Size cannot be larger than ${MAX_ITEMS}`);
        return;
    }
    let grid = buildGrid(n_rows, n_cols);
    drawGrid(grid, n_rows, n_cols);
});