


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
        html += `<div class="notes" id="${index}" onclick="fullData(this.id)">
                    <div class="icon">
                        <i class="far fa-times-circle" id="${index}" onclick="deleteNote(this.id)"></i>
                    </div>
                    <h2>${element.tital}</h2>
                    <p>${element.notes}</p>
                </div>`;
    });
    notesarea.innerHTML = html;
    
}

function fullData(index) {
    let notesdiv = document.getElementById(index);
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
    let card = document.getElementsByClassName('notes');
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