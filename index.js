let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.setText('Отправить')

// let notificationId = window.Telegram.WebApp.initDataUnsafe.start_param

const REASONS = ['Ошибка оборудования', 'Неверное отображение в КХД', 'Неверный маршрут']

// const $incidentNumber = document.getElementById('$incident-number');
// $incidentNumber.innerText = notificationId || ''

let selectedOption = null;
let otherReason = null;

function handleSubmit(e) {
    e.preventDefault();
}

function handleInput(e) {
    const value = e.target.value;
    otherReason = value;

    if (otherReason) {
        tg.MainButton.show();
    } else {
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

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    let answer;

    if (REASONS.includes(selectedOption)) {
        answer = selectedOption;
    } else {
        answer = `другое::${otherReason}`;
    }

    console.log('sent back to bot', answer);
    tg.sendData(answer);
});
