import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const messageInput = feedbackForm.querySelector('textarea');
const emailInput = feedbackForm.querySelector('input[name="email"]');

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

function loadFormState() {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
}

emailInput.addEventListener('input', throttle(saveFormState, 500));
messageInput.addEventListener('input', throttle(saveFormState, 500));

loadFormState();

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.removeItem('feedback-form-state');
  console.log(formState);
  emailInput.value = '';
  messageInput.value = '';
});
