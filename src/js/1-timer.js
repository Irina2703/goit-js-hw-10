import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputField = document.querySelector('#datetime-picker');
const button = document.querySelector('button');

button.setAttribute('disabled', '');
let userSelectedDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const dateNow = new Date();
        let dateVerify = selectedDates[0];
        if (dateVerify > dateNow) {
            userSelectedDate = dateVerify;
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', '');
            iziToast.show({
                title: 'Error',
                titleColor: 'red',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
        }
    },
};

flatpickr('#datetime-picker', options);

button.addEventListener('click', timer);

function timer() {
    button.setAttribute('disabled', '');
    inputField.setAttribute('disabled', '');
    const intervalId = setInterval(() => {
        const now = new Date();
        const difference = userSelectedDate - now;

        if (difference <= 0) {
            clearInterval(intervalId);
            inputField.removeAttribute('disabled');
        } else {
            const time = convertMs(difference);
            document.querySelector('[data-days]').textContent = String(
                time.days
            ).padStart(2, '0');
            document.querySelector('[data-hours]').textContent = String(
                time.hours
            ).padStart(2, '0');
            document.querySelector('[data-minutes]').textContent = String(
                time.minutes
            ).padStart(2, '0');
            document.querySelector('[data-seconds]').textContent = String(
                time.seconds
            ).padStart(2, '0');
        }
    }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}