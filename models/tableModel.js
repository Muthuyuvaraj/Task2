export default class TableModel {
    constructor() {
        this.data = [];
        this.currentPage = 1;
        this.rowsPerPage = 5;
    }

    async fetchData() {
        const response = await fetch('assets/data.json');
        this.data = await response.json();
    }

    getPaginatedData(page) {
        this.currentPage = page;
        const start = (page - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        return this.data.slice(start, end);
    }

    sortData(columnIndex, isAscending) {
        this.data.sort((a, b) => {
            let valueA = Object.values(a)[columnIndex];
            let valueB = Object.values(b)[columnIndex];
            if (typeof valueA === 'number') {
                return isAscending ? valueA - valueB : valueB - valueA;
            } else {
                return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
        });
    }
}
