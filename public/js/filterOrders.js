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
