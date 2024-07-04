import TableModel from '../models/tableModel.js';
import TableView from '../views/tableView.js';

export default class TableController {
    constructor() {
        this.model = new TableModel();
        this.view = new TableView();

        this.view.bindSortTable(this.handleSortTable.bind(this));
        this.view.bindPagination(this.handlePagination.bind(this));
        this.view.bindSearchTable(this.handleSearchTable.bind(this));
    }

    async init() {
        await this.model.fetchData();
        this.updateTable();
    }

    updateTable() {
        const data = this.model.getPaginatedData(this.model.currentPage);
        this.view.renderTable(data);
        this.view.renderPageNumber(this.model.currentPage);
    }

    handleSortTable(columnIndex, isAscending) {
        this.model.sortData(columnIndex, isAscending);
        this.updateTable();
    }

    handlePagination(direction) {
        if (direction === 'prev' && this.model.currentPage > 1) {
            this.model.currentPage--;
        } else if (direction === 'next' && (this.model.currentPage * this.model.rowsPerPage) < this.model.data.length) {
            this.model.currentPage++;
        }
        this.updateTable();
    }

    handleSearchTable() {
        const searchValue = this.view.searchBar.value.toLowerCase();
        const filteredData = this.model.data.filter(row => {
            return Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchValue)
            );
        });
        this.view.renderTable(filteredData.slice(0, this.model.rowsPerPage));
        this.view.renderPageNumber(1);
    }
}
