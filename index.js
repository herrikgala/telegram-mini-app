let tg = window.Telegram.WebApp;
tg.MainButton.hide()
tg.MainButton.enable()
tg.MainButton.setText('Отправить')

console.log('tg', tg);
console.log('tg.initData ', tg.initData);
console.log('tg.initDataUnsafe ', tg.initDataUnsafe);

const REASONS = ['device_error', 'incorrect_value_in_khd', 'incorrect_route']

const $incidentNumber = document.getElementById('$incident-number');
// incidentNumber.innerText = tg.initData.incidentNumber;
$incidentNumber.innerText = '123545';

let selectedOption = null;
let otherReason = null;

function handleSubmit(e) {
    e.preventDefault();
}

function handleInput(e) {
    const value = e.target.value;
    otherReason = value;
    if(otherReason){
        tg.MainButton.show();
    }
}

const clearAndDisableTextArea = () => {
    const $textarea = document.getElementById('$textarea');
    $textarea.value = '';
    otherReason = null;
    $textarea.setAttribute('disabled', 'disabled');
}

function handleSelect(e) {
    const value = e.target.value;
    selectedOption = value;

    if (REASONS.includes(value)) {
        tg.MainButton.show();
        clearAndDisableTextArea();
    } else {
        tg.MainButton.hide();
        $textarea.removeAttribute('disabled');
    }
}

// for debugging purposes can be removed
const $debugging = document.querySelector('#$debugging')
$debugging.innerText = JSON.stringify(tg.initData, null, 2);