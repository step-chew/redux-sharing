const { createStore } = Redux;

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'COMPUTE':
      return state + action.value;
    case 'LOAD':
      return action.value;
  }
  return state;
};

const store = createStore(counter);

store.subscribe(() => {
  document.getElementById('result').innerText = store.getState();
});

document.getElementById('btnIncrement').addEventListener('click', () => {
  store.dispatch({
    type: 'INCREMENT'
  });
});

document.getElementById('btnDecrement').addEventListener('click', () => {
  store.dispatch({
    type: 'DECREMENT'
  });
});

document.getElementById('btnCompute').addEventListener('click', () => {
  let val;

  if (!isNaN(val = parseInt(document.querySelector('input[name="figure"]').value, 10))) {
    store.dispatch({
      type: 'COMPUTE',
      value: val
    });
  }
});






















// Easter egg
let storage;
if (!isNaN(parseInt(storage = localStorage.getItem('result')), 10)) {
  store.dispatch({
    type: 'LOAD',
    value: storage
  })
}
