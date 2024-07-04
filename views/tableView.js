export default class TableView {
    constructor() {
        this.tableBody = document.getElementById('table-body');
        this.pageNumber = document.getElementById('page-number');
        this.searchBar = document.getElementById('searchBar');
    }

    renderTable(data) {
        this.tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td><td>${row.city}</td>`;
            this.tableBody.appendChild(tr);
        });
    }

    renderPageNumber(page) {
        this.pageNumber.innerText = `Page ${page}`;
    }

    bindSortTable(handler) {
        document.querySelectorAll('th').forEach((th, index) => {
            th.addEventListener('click', () => {
                const isAscending = th.classList.toggle('asc');
                handler(index, isAscending);
            });
        });
    }

    bindPagination(handler) {
        document.getElementById('prevPage').addEventListener('click', () => handler('prev'));
        document.getElementById('nextPage').addEventListener('click', () => handler('next'));
    }

    bindSearchTable(handler) {
        this.searchBar.addEventListener('input', handler);
    }
}
