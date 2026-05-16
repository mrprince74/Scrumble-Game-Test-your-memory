const buildGrid = (n_rows, n_cols) => {
    // TODO
};

document.querySelector("form").addEventListener("submit", function(event) {
    let n_rows_elem = document.getElementById("n_rows");
    let n_cols_elem = document.getElementById("n_cols");
    event.preventDefault();
    let n_rows = n_rows_elem.value;
    let n_cols = n_cols_elem.value;
    if ((n_cols * n_rows) & 1) {
        n_rows_elem.setCustomValidity("Grid Size must be even");
        n_cols_elem.setCustomValidity("Grid Size must be even");
        n_rows_elem.reportValidity();
        n_cols_elem.reportValidity();
    } else {
        n_rows_elem.setCustomValidity("");
        n_cols_elem.setCustomValidity("");
        buildGrid(n_rows, n_cols);
    }
});