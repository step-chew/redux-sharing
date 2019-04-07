const { createStore, applyMiddleware } = Redux;

let initialState = { value: 0 };

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        value: state.value + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        value: state.value - 1
      };
    case 'COMPUTE':
      return {
        ...state,
        loading: false,
        value: state.value + action.value,
      };
    case 'COMPUTING':
      return {
        ...state,
        loading: true,
      }
  }
  return state;
};

const store = createStore(counter, applyMiddleware(reduxLogger.logger, ReduxThunk.default));

store.subscribe(render);

function render() {
  document.getElementById('result').innerText = store.getState().value;
  document.getElementById('btnCompute').disabled = store.getState().loading;
  document.querySelector('progress').style.display = store.getState().loading ? '' : 'none';
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
  store.dispatch(compute(document.querySelector('input[name="figure"]').value));
});

function compute(input) {
  return function (dispatch) {
    dispatch({type: 'COMPUTING'});
    setTimeout(() => {
      let val;

      if (!isNaN(val = parseInt(input, 10))) {
        dispatch({
          type: 'COMPUTE',
          value: val
        });
      }
    }, 5000);
  }
}

render();
