function addBookmark() {
    var name = document.getElementById('bookmarkName').value;
    var url = document.getElementById('bookmarkURL').value;

    if (!validateURL(url) || !validateName(name)) {
        showValidationMessage();
        return;
    }

    var table = document.getElementById('tableContent');
    var rowCount = table.rows.length;
    var newRow = table.insertRow();

    var indexCell = newRow.insertCell(0);
    var nameCell = newRow.insertCell(1);
    var visitCell = newRow.insertCell(2);
    var deleteCell = newRow.insertCell(3);

    indexCell.textContent = rowCount + 1;
    nameCell.textContent = name;
    visitCell.innerHTML = `<button class="btn btn-visit" onclick="visitBookmark('${url}')"><i class="fas fa-eye pe-2"></i>Visit</button>`;
    deleteCell.innerHTML = `<button class="btn btn-delete" onclick="deleteBookmark(this)"><i class="fas fa-trash-alt"></i>Delete</button>`;

    clearInputs();
}

function validateURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i'); 
    return !!pattern.test(url);
}

function validateName(name) {
    return name.length >= 3;
}

function showValidationMessage() {
    var boxInfo = document.querySelector('.box-info');
    boxInfo.classList.remove('d-none');
    document.getElementById('closeBtn').addEventListener('click', () => {
        boxInfo.classList.add('d-none');
    });
}

function clearInputs() {
    document.getElementById('bookmarkName').value = '';
    document.getElementById('bookmarkURL').value = '';
}

function visitBookmark(url) {
    window.open(url, '_blank');
}

function deleteBookmark(button) {
    button.closest('tr').remove();
    updateIndices();
}

function updateIndices() {
    var table = document.getElementById('tableContent');
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].textContent = i + 1;
    }
}