'use strict'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
     
if (userSelectedDate <= new Date()) {
  iziToast.error({ message: 'Please choose a date in the future'});
  startBtn.disabled = true;
} else { startBtn.disabled = false; } 
  },
};
  

flatpickr("#datetime-picker", options);

let userSelectedDate = null;
let intervalId = null;
const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDisplay = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

startBtn.addEventListener('click', () => {
   if (!userSelectedDate) {console.error('No date selected!');
    return;
  }
 
  startBtn.disabled = true;
  dateTimePicker.disabled = true;
  dateTimePicker.classList.add('disabled');
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = userSelectedDate - currentTime;
    
    if (timeDiff <= 0) {
      clearInterval(intervalId);
      resetTimer();
      console.log('Timer finished!'); 
      return;
    }
    const timeComponents = convertMs(timeDiff);
    updateTimerDisplay(timeComponents);
  }, 1000);
})

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timerDisplay.days.textContent = addLeadingZero(days);
  timerDisplay.hours.textContent = addLeadingZero(hours);
  timerDisplay.minutes.textContent = addLeadingZero(minutes);
  timerDisplay.seconds.textContent = addLeadingZero(seconds);
  /*console.log('Updating display:', days, hours, minutes, seconds);*/
}
function addLeadingZero(value) {return String(value).padStart(2, '0'); }

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
  /*console.log('Days:', days, 'Hours:', hours, 'Minutes:', minutes, 'Seconds:', seconds);*/
  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function resetTimer() {
  startBtn.disabled = true;
  dateTimePicker.disabled = false;
  dateTimePicker.classList.remove('disabled');
  updateTimerDisplay({days: 0, hours: 0, minutes: 0, seconds: 0});
}