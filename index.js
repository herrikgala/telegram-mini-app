let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.setText('Отправить')

const REASONS = ['Ошибка оборудования', 'Неверное отображение в КХД', 'Неверный маршрут']

let selectedOption = null;
let comment = null;

const $textarea = document.getElementById('$textarea');

function handleInput(e) {
    const value = e.target.value;
    comment = value;

    if (comment) {
        tg.MainButton.show();
    } else if(REASONS.includes(selectedOption)) {
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}


function handleSelect(e) {
    const value = e.target.value;
    selectedOption = value;

    if (REASONS.includes(value)) {
        tg.MainButton.show();
    } else if(comment) {
        tg.MainButton.show()
    } else{
        tg.MainButton.hide();
    }
}

Telegram.WebApp.onEvent("mainButtonClicked", () => {
    let answer;

    if (REASONS.includes(selectedOption)) {
        answer = `${selectedOption}::${comment || ''}`;
    } else {
        answer = `Другое::${comment}`;
    }

    console.log('sent back to bot', answer);
    tg.sendData(answer);
});
