console.log('Client side js is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

// messageOne.textContent = 'From JS';

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading....';
  // clear previous search
  messageTwo.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          //   console.log(data);
          console.log(data.location);
          console.log(data.forecast);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
