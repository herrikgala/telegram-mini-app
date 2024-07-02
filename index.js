let tg = window.Telegram.WebApp;

tg.expand();
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

Telegram.WebApp.onEvent('mainButtonClicked', function(){
	tg.sendData("123123::user_id::полный вариант ответа в виде текста или комментарий"); 
	//при клике на основную кнопку отправляем данные в строковом виде
});

// for debugging purposes can be removed
const $debugging1 = document.querySelector('#debugging1')
$debugging1.innerText = JSON.stringify(tg.initData);

const $debugging2 = document.querySelector('#debugging2')
$debugging2.innerText = JSON.stringify(tg.initDataUnsafe);
let startParam = window.Telegram.WebApp.initDataUnsafe.start_param
console.log('startParam',startParam);
console.log(Telegram.WebApp);
console.log($debugging1);
console.log($debugging2);
