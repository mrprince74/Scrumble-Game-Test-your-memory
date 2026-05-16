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
    // take only the first, and duplicate it
    let curItems = ALL_ITEMS.slice(0, Math.floor(grid_size / 2));
    curItems = curItems.concat(curItems);
    shuffle(curItems);

    let grid = Array.from({ length: Number(n_rows) }, () =>
        Array(Number(n_cols)).fill("x"),
    );
    curItems.map((val, idx) => {
        let rowIdx = Math.floor(idx / n_cols);
        let colIdx = idx % n_cols;
        grid[rowIdx][colIdx] = val;
    });

    return grid;
};
const drawGrid = (grid) => {
    // TODO
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
    drawGrid();
});