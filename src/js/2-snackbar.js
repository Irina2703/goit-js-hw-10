import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const {
        delay: { value: delayValue },
        state: { value: stateValue },
    } = e.target.elements;

    const delay = Number(delayValue);

    form.reset();

    const base = {
        position: 'topRight',
        timeout: 5000,
        progressBar: false,
        close: true,
    };

    new Promise((resolve, reject) => {
        setTimeout(() => {
            stateValue === 'fulfilled' ? resolve(delay) : reject(delay);
        }, delay);
    })
        .then(ms =>
            iziToast.success({
                ...base,
                message: `✅ Fulfilled promise in ${ms}ms`,
            })
        )
        .catch(ms =>
            iziToast.error({
                ...base,
                message: `❌ Rejected promise in ${ms}ms`,
            })
        );
});