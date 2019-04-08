const { createStore, applyMiddleware } = Redux;
const { createEpicMiddleware } = ReduxObservable;

const { from } = rxjs;
const { map, mapTo, mergeMap, switchMap, tap } = rxjs.operators;

let initialState = {
  loading: false,
  value: 'Try me'
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH': 
      return {
        ...state,
        loading: true
      }
    case 'FETCH_FULFILED':
      return {
        ...state,
        loading: false,
        value: action.payload
      };
  }
  return state;
};

const epics = createEpicMiddleware();

const store = createStore(counter, applyMiddleware(reduxLogger.logger, epics));

store.subscribe(render);

function render() {
  document.getElementById('result').innerText = store.getState().value;
  document.querySelector('progress').style.display = store.getState().loading ? '' : 'none';

}

document.getElementById('btnOne').addEventListener('click', () => {
  store.dispatch({
    type: 'FETCH',
    id: 1
  });
});

document.getElementById('btnTwo').addEventListener('click', () => {
  store.dispatch({
    type: 'FETCH',
    id: 2
  });
});

document.getElementById('btnThree').addEventListener('click', () => {
  store.dispatch({
    type: 'FETCH',
    id: 3
  });
});

document.getElementById('btnFour').addEventListener('click', () => {
  store.dispatch({
    type: 'FETCH',
    id: 4
  });
});

document.getElementById('btnFive').addEventListener('click', () => {
  store.dispatch({
    type: 'FETCH',
    id: 5
  });
});

const fetchNameEpic = action$ => action$.ofType('FETCH').pipe(
  switchMap(action => from(fetchEnglishName(action.id))), // switchMap() takes the last item
  // mergeMap(action => from(fetchEnglishName(action.id))), // mergeMap() takes everything concurrently
  map(payload => ({
    type: 'FETCH_FULFILED',
    payload
  }))
)

epics.run(fetchNameEpic);

render();

function fetchEnglishName(id) {
  const secondsDelay = Math.floor(Math.random() * 5000) + 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (id) {
        case 1:
          resolve('One');
        case 2:
          resolve('Two');
        case 3:
          resolve('Three');
        case 4:
          resolve('Four');
        case 5:
          resolve('Five');
        default:
          resolve('Unknown');
      }
    }, secondsDelay);
  });
}
