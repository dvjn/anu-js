import Anu, { Component } from "anu-js";
import { jsx } from "snabbdom";

const enum ActionTypes {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
}

type Action =
  | { type: ActionTypes.INCREMENT | ActionTypes.DECREMENT }
  | { type: ActionTypes.ADD | ActionTypes.SUBTRACT; payload: number };

const Counter: Component<number, { initial: number }, Action> = {
  initialState: ({ initial }) => initial,
  reducer: ({ state }, action: Action) => {
    switch (action.type) {
      case ActionTypes.INCREMENT:
        return state + 1;
      case ActionTypes.DECREMENT:
        return state - 1;
      case ActionTypes.ADD:
        return state + action.payload;
      case ActionTypes.SUBTRACT:
        return state - action.payload;
      default:
        return state;
    }
  },
  render: ({ state }, dispatch) => (
    <main>
      <h1>Counter</h1>
      <div props={{ id: "value" }}>{state}</div>
      <div props={{ id: "controls" }}>
        <button
          on={{
            click: () => dispatch({ type: ActionTypes.SUBTRACT, payload: 10 }),
          }}
        >
          -10
        </button>
        <button on={{ click: () => dispatch({ type: ActionTypes.DECREMENT }) }}>
          -1
        </button>
        <button on={{ click: () => dispatch({ type: ActionTypes.INCREMENT }) }}>
          +1
        </button>
        <button
          on={{
            click: () => dispatch({ type: ActionTypes.ADD, payload: 10 }),
          }}
        >
          +10
        </button>
      </div>
    </main>
  ),
};

Anu.run("main", Counter, { initial: 0 });
