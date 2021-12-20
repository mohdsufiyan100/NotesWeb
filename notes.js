


const btnMain = document.getElementById('btn');

createElement();
btnMain.addEventListener('click', () => {
    let titalINP = document.getElementById('inp1');
    let notesINP = document.getElementById('inp2');
    let content = localStorage.getItem('Note');
    
    // for tital storing in localstorage
    
    if(notesINP.value == '') {
        window.alert('Please type some input');
    }
    else{
        if (content == null) {
            TitalObj = [];
        } else {
            TitalObj = JSON.parse(content);
        }
        let myobj = {
            tital: titalINP.value,
            notes: notesINP.value,
        }
        TitalObj.push(myobj);
        localStorage.setItem('Note', JSON.stringify(TitalObj));
        
    }
    createElement();
    notesINP.value = '';
    titalINP.value = '';
})


function createElement() {
    let notesarea = document.getElementById('notesarea');
    let content = localStorage.getItem('Note');
    // let notesINP = document.getElementById('inp2').value;

    let html = "";
    if (content == null) {
       TitalObj = [];
       let emptydata = document.getElementById('emptyarea');
        emptydata.style.display = 'flex'; 
    } else {
        TitalObj = JSON.parse(content);
        let emptydata = document.getElementById('emptyarea');
        emptydata.style.display = 'none';
    } 
    TitalObj.forEach(function(element, index){
        html += `<div class='fullElement'>
                    <div class="icon">
                        <i class="far fa-file-edit" id="${index}" onclick="NotesEdit(this.id)"></i>
                        <i class="far fa-times-circle" id="${index}" onclick="deleteNote(this.id)"></i>
                    </div>
    
                    <div class="notes" id="full${index}" onclick="fullData(this.id)">
                        <h2 id="ttl${index}">${element.tital}</h2>
                        <p id="ntt${index}">${element.notes}</p>
                    </div>
                </div>
                `;
    });
    notesarea.innerHTML = html;
    
}

function NotesEdit(edt1) {
    const forEdit = document.getElementById('editnote');
    let forcloseEdit = document.getElementById('editnoteClose');
    const titalforedit = document.getElementById(`ttl${edt1}`);
    const noteforedit = document.getElementById(`ntt${edt1}`);
    const titalfromeditform = document.getElementById('tital');
    const notesfromeditform = document.getElementById('txtarea');
    const html1 = titalforedit.innerText;
    const html2 = noteforedit.innerText;
    
    titalfromeditform.innerText = html1;
    notesfromeditform.innerText = html2;
    
    forEdit.style.display = 'block';
    forcloseEdit.addEventListener('click', () => {
        forEdit.style.display = 'none';
    })
    

    const dataBlur = document.getElementById('DT');
    dataBlur.addEventListener('click', () => {
        const blurdt1 = document.getElementById('tital');
        const blurdt2 = document.getElementById('txtarea');
    
        titalforedit.innerText = blurdt1.value;
        noteforedit.innerText= blurdt2.value;
        let myobj = {
            tital: blurdt1.value,
            notes: blurdt2.value,
        }
        TitalObj.push(myobj);
        localStorage.setItem('Note', JSON.stringify(TitalObj));
        forEdit.style.display = 'none';
        createElement();
    })
    
    
}

function fullData(ind) {
    // let fully = `full${index}`;
    
    let notesdiv = document.getElementById(ind);
    notesdiv.classList.toggle('showfullData');
    notesdiv.style.cursor = 'zoom-out';
}

function deleteNote(index) {
    let content = localStorage.getItem('Note');

    if (content == null) {
        TitalObj = [];
    } else {
        TitalObj = JSON.parse(content);
    } 

    TitalObj.splice(index, 1);
    localStorage.setItem('Note', JSON.stringify(TitalObj));
    createElement();
}


// search function-------

const searchINP = document.getElementById('inpSearch');

searchINP.addEventListener('input', () => {
    let searchValue = searchINP.value;
    let card = document.getElementsByClassName('fullElement');
    Array.from(card).forEach(function(element) {
        let cardelem = element.getElementsByTagName('h2')[0].innerText;
        let searchinnervalue = cardelem.includes(searchValue);
        if(searchinnervalue){
            element.style.display = 'inline-flex';
        }else{
            element.style.display = 'none';
        }
        
    }) 
})


let Alldelete = document.getElementById('deleteAll');

Alldelete.addEventListener('click', () => {
    DeleteAll();
    createElement();
})

function DeleteAll(){
    let content = localStorage.getItem('Note');

    let confirm = window.confirm('Would you delete all notes?');
    if(confirm == false){
        location.reload();
    }else{
        localStorage.clear(content);
    }
}
    
// search-----------------

let expandsearch = document.getElementById('plusExpand');

expandsearch.addEventListener('click', () => {
    let searchArea = document.getElementById('search');
    if(searchArea.style.display == 'inline-flex'){
        searchArea.style.display = 'none';
        let expandsearch = document.getElementById('plusExpand');
        expandsearch.style.transform = 'none';
    }
    else{
        searchArea.style.display = 'inline-flex';
        let expandsearch = document.getElementById('plusExpand');
        expandsearch.style.transform = 'rotate(25deg)';
    }
})