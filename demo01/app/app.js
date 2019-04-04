const { createStore } = Redux;

let initialState = 0;

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'COMPUTE':
      return state + action.value;
  }
  return state;
};

const store = createStore(counter);

store.subscribe(render);

function render() {
  document.getElementById('result').innerText = store.getState();
}

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

render();





















// Easter egg
function easterEgg() {
  let storage;
  return !isNaN(storage = parseInt(localStorage.getItem('result')), 10) ? storage : 0;
}
