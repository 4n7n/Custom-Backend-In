
function filterOrders(status) {
    const rows = document.querySelectorAll('.order-history tbody tr');
    rows.forEach(row => {
        if (status === 'all') {
            row.classList.remove('hidden');
        } else {
            row.dataset.status === status ? row.classList.remove('hidden') : row.classList.add('hidden');
        }
    });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="filterOrders('${status}')"]`).classList.add('active');
}

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

function toggleDropdown(element) {
    const dropdown = element.querySelector('.dropdown');
    const isVisible = dropdown.style.display === 'block';
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    dropdown.style.display = isVisible ? 'none' : 'block';
}

function filterByDate() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const rows = document.querySelectorAll('.order-history tbody tr');
    
    rows.forEach(row => {
        const orderDate = new Date(row.dataset.date);
        if (orderDate >= startDate && orderDate <= endDate) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.action-btn')) {
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    }
}