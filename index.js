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

Telegram.WebApp.onEvent("mainButtonClicked", ()=>{
    console.log('started');
    const tgInstance = Telegram.WebApp;
    let answer;
    console.log('answer');
    if (REASONS.includes(selectedOption)) {
        console.log('if', selectedOption);

        answer = selectedOption;
    } else {
        console.log('else', otherReason);
        answer = otherReason;
    }
    console.log('tgInst', tgInstance?.initDataUnsafe?.user?.id);
    console.log('tg', tg?.initDataUnsafe?.user?.id);
    
    const transmittingString = `${tgInstance.initDataUnsafe.user.id}::${answer}`;
    console.log('sent back to bot', transmittingString);
    tgInstance.sendData(transmittingString);
});
