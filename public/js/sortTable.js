function sortTable(columnIndex) {
    const table = document.querySelector('.order-history tbody');
    const rows = Array.from(table.rows);
    const isAscending = table.getAttribute('data-sort-order') === 'asc';

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();

        return isAscending 
            ? aText.localeCompare(bText, undefined, {numeric: true})
            : bText.localeCompare(aText, undefined, {numeric: true});
    });

    table.innerHTML = '';
    rows.forEach(row => table.appendChild(row));

    table.setAttribute('data-sort-order', isAscending ? 'desc' : 'asc');
}
