import Github from './github';
import moment from 'moment';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box-input');
const searchBoxContainer = document.getElementById('search-box-container');
const github = new Github();

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!searchBox.value) {
        showError('Please provide repo name');
        return;
    }
    
    github.search(searchBox.value).then(result => {
        if (!result || result.length === 0) {
            showError('Repo of provided name does not exist');
        }
        populateResult(result);
    });
    searchBox.value = '';
});

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(message));
    const searchTitle = document.getElementById('search');
    searchBoxContainer.insertBefore(errorDiv, searchTitle);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1500);
}

function populateResult(dtos) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
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


