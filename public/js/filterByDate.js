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
