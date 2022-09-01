import Anu, { Component } from "anu-js";
import { jsx } from "snabbdom";

const enum ActionTypes {
  INCREMENT = "INCREMENT",
}

type Action = { type: ActionTypes.INCREMENT }

const Counter: Component<number, { initial: number }, Action> = {
  initialState: ({ initial }) => initial,

  reducer: ({ state }, action: Action) => {
    switch (action.type) {
      case ActionTypes.INCREMENT:
        return state + 1;
      default:
        return state;
    }
  },

  render: ({ state }, dispatch) => (
    <div props={{id: "counter"}}>
      <button on={{ click: () => dispatch({ type: ActionTypes.INCREMENT }) }}>
        Count is: {state}
      </button>
    </div>
  ),
};

Anu.run("#counter", Counter, { initial: 0 });
