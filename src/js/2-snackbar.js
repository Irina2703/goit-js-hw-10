import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const submitData = {};
const createSubmitData = e => {
    e.preventDefault();
    const form = e.target.elements;
    const delay = form.delay.value;
    const state = form.state.value;
    submitData.delay = +delay;
    submitData.state = state;

    e.target.reset();

    const messageData = {
        position: 'topRight',
    };

    const snackbar = new Promise((resolve, reject) => {
        const { state, delay } = submitData;
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
                messageData.title = 'Succsess';
                messageData.titleColor = 'green';
                messageData.message = `✅ Fulfilled promise in ${delay}ms`;
            } else {
                reject(delay);
                messageData.title = 'Error';
                messageData.titleColor = 'red';
                messageData.message = `❌ Rejected promise in ${delay}ms`;
            }
        }, delay);
    });

    snackbar
        .then(result => {
            iziToast.show(messageData);
        })
        .catch(error => {
            iziToast.show(messageData);
        });
};
form.addEventListener('submit', createSubmitData);