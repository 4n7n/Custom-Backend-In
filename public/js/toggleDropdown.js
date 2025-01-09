function toggleDropdown(element) {
    const dropdown = element.querySelector('.dropdown');
    const isVisible = dropdown.style.display === 'block';
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    dropdown.style.display = isVisible ? 'none' : 'block';
}
