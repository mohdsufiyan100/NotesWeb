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
    let notesarea = document.querySelector('.notesarea');
    let content = localStorage.getItem('Note');
    // let notesINP = document.getElementById('inp2').value;

    let html = "";
    if (content == null) {
        TitalObj = [];
    } else {
        TitalObj = JSON.parse(content);
    } 
    TitalObj.forEach(function(element, index){
        html += `<div class="notes" id="${index}" onclick="fullData(this.id)">
                    <div class="icon">
                        <i class="far fa-times-circle" id="del${index}" onclick="deleteNote(this.id)"></i>
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