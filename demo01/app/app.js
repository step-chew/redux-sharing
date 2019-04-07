const { createStore } = Redux;

let initialState = JSON.parse(document.getElementById('initialState').innerText);

const counter = (state = initialState, action) => {
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
  const action = compute(document.querySelector('input[name="figure"]').value);

  if (action) {
    store.dispatch(action);
  }
});

function compute(input) {
  let val;

  if (!isNaN(val = parseInt(input, 10))) {
    return {
      type: 'COMPUTE',
      value: val
    };
  }

  return undefined;
}

render();





















// Easter egg
(function easterEgg() {
  let storage;
  if (!isNaN(storage = parseInt(localStorage.getItem('result')), 10)) {
    store.dispatch({
      type: 'LOAD',
      value: storage
    })
  }
})()