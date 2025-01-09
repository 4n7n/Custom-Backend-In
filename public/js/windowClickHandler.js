window.onclick = function(event) {
    if (!event.target.matches('.action-btn')) {
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    }
}
