import Github, { IGithubResponseDTO } from './github';
import moment from 'moment';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box-input') as HTMLInputElement;
const searchBoxContainer = document.getElementById('search-box-container');
const sortbyInput = document.getElementById('sortby-input');
const github = new Github();

enum SortValue {
    latest = 'latest',
    name = 'repoName'
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    if (!searchBox.value) {
        showError('Please provide repo name');
        return;
    }
    
    const sortBy = (document.querySelector('input[name="sortby"]:checked') as HTMLInputElement).value === 'repoName'
        ? SortValue.name
        : SortValue.latest;

    github.search(searchBox.value).then(result => {
        if (!result || result.length === 0) {
            showError('Repo of provided name does not exist');
        }
        populateResult(result, sortBy);
    });
    searchBox.value = '';
});

function showError(message: string): void {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(message));
    const searchTitle = document.getElementById('search');
    searchBoxContainer.insertBefore(errorDiv, searchTitle);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1500);
}

function populateResult(dtos: IGithubResponseDTO[], sortBy: SortValue): void {
    const tableBody = document.getElementById('table-body') as HTMLTableElement;
    tableBody.innerHTML = '';

    if (sortBy === SortValue.latest) {
        dtos.sort((a, b) =>  (a.lastUpdated < b.lastUpdated) ? 1 : -1);
    } else {
        dtos.sort((a, b) =>  (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    }
    
    dtos.forEach(dto => {
        const newRow = tableBody.insertRow();
        
        const nameCell = newRow.insertCell(0);
        const descrCell = newRow.insertCell(1);
        const lastUpdatedCell = newRow.insertCell(2);
        const linkCell = newRow.insertCell(3);
        
        nameCell.innerHTML = dto.name;
        descrCell.innerHTML = dto.description;
        lastUpdatedCell.innerHTML = moment(dto.lastUpdated).format('DD-MM-YYYY');
        linkCell.innerHTML = dto.link;
    });
}


