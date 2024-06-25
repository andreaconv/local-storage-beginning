if (typeof(Storage) !== "undefined") {
    // Il local storage è disponibile
    console.log("Local Storage disponibile");
} else {
    // Il local storage non è disponibile
    console.log("Local Storage NON disponibile");
}

// ----------------------------------------------------------

let $ = document.querySelector.bind(document); // simulatore di Jquery

let inputName = $('#name');
let inputAge = $('#age');

inputName.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        saveName();
    }
});
inputAge.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        saveName();
    }
});

let retrievedUser = JSON.parse(localStorage.getItem('user'));
console.log(retrievedUser);

// TODO: toglie il bordo rosso dall'input text nel caso in cui è stato compilato
inputAge.addEventListener('focus', handleFocus);
function handleFocus(event) {
    let inputId = event.target.id;

    if(inputId  === 'age'){
        let name = inputName.value;
        if(name !== ''){
            inputName.className = ''
        }
    }
}

function saveName() {

    let name = inputName.value;
    let age = inputAge.value;

    if(name.trim() === ''){

                
        $('#result').innerText = 'Inserire un nome valido, non vuoto!';
        $('#result').className = 'alert danger';

        // svuota i campi input
        $('input#name').value = '';

        inputName.className = 'error'

    }else if(age ==='' || age < 0){

        inputName.className = ''
        inputAge.className = 'error'

        $('#result').innerText = 'Inserire un età superiore a zero!';
        $('#result').className = 'alert danger';

        // svuota i campi input
        $('input#age').value = '';
    }else{

        inputName.className = ''
        inputAge.className = ''

        let user = { name: name, age: age };
        localStorage.setItem('user', JSON.stringify(user));
    
        retrievedUser = JSON.parse(localStorage.getItem('user'));
        console.log("Nome:", retrievedUser.name); 
        console.log("Età:", retrievedUser.age); 


        $('#result').innerText = 'Nome salvato!';
        $('#result').className = 'alert success';
    
        // svuota i campi input
        $('input#name').value = '';
        $('input#age').value = '';

    }
}

function loadName() {
    retrievedUser = JSON.parse(localStorage.getItem('user'));

    $('#result').innerHTML  = retrievedUser
    ? 'Utente scaricato: ' + `<ul>
                <li>Nome = <strong>${retrievedUser.name}</strong></li>
                <li>Età = <strong>${retrievedUser.age}</strong></li>
            </ul>` 
    : 'Nessun nome salvato.';

    $('#result').className = 'alert info';

    inputName.className = ''

}

function clearStorage() {

    localStorage.clear();
    $('#result').innerText = 'Local storage svuotato.';
    $('#result').className = 'alert danger';

    inputName.className = ''

}
