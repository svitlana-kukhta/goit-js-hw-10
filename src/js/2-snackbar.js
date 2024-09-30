'use strict'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const snackbarForm = document.querySelector("form");

snackbarForm.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const delay = Number(event.currentTarget.elements.delay.value);
    const state = event.currentTarget.elements.state.value;
    createPromise(delay, state)
        .then((delay) => { iziToast.success({ title: 'Success', message: `✅ Fulfilled promise in ${delay}ms`, position: 'topRight' }); })
        .catch((delay) => {iziToast.error({ title: 'Error', message: `❌ Rejected promise in ${delay}ms`, position: 'topRight' });})
}
function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { if (state === 'fulfilled') { resolve(delay); } else { reject(delay); } }, delay);
    });
    }
