let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.setText('Отправить')

let notificationId = window.Telegram.WebApp.initDataUnsafe.start_param

console.log('tg', tg);
console.log('tg.initData ', tg.initData);
console.log('tg.initDataUnsafe ', tg.initDataUnsafe);

const REASONS = ['device_error', 'incorrect_value_in_khd', 'incorrect_route']

const $incidentNumber = document.getElementById('$incident-number');
$incidentNumber.innerText = notificationId || ''

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
    } else{
        tg.MainButton.hide();
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

Telegram.WebApp.onEvent("mainButtonClicked", ()=>{alert('123')});

document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram.WebApp;

    // Ensure tg is defined and ready
    if (tg) {
        tg.onEvent('mainButtonClicked', function() {
            let answer;
            if (REASONS.includes(selectedOption)) {
                answer = selectedOption;
            } else {
                answer = otherReason;
            }
            const transmittingString = `${tg.initDataUnsafe.user.id}::${answer}`;
            console.log('sent back to bot', transmittingString);
            tg.sendData(transmittingString);
        });
    } else {
        console.error('Telegram WebApp SDK not ready');
    }
});