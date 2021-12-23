import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  VNode,
  toVNode,
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// tslint:disable-next-line: ban-types
export type Initializer<State, Props> = State extends Function
  ? never
  : ((props: Props) => State) | State;
export type Reducer<State, Props, Action> = (
  model: {
    state: State;
    props: Props;
  },
  action: Action
) => State;
export type RenderFunc<State, Props, Action> = (
  model: { state: State; props: Props },
  dispatch: (action: Action) => void
) => VNode;

export type Component<State, Props, Action> = {
  initialState: Initializer<State, Props>;
  reducer: Reducer<State, Props, Action>;
  render: RenderFunc<State, Props, Action>;
};

const run = <State, Props, Action>(
  selector: string,
  { initialState, reducer, render }: Component<State, Props, Action>,
  props: Props
) => {
  if (!selector) return;

  let node = toVNode(document.querySelector(selector) as HTMLElement);
  if (!node) return;

  let state =
    typeof initialState === "function" ? initialState(props) : initialState;

  const dispatch = (action: Action) => {
    const oldState = state;
    state = reducer({ state, props }, action);
    if (state !== oldState)
      node = patch(node, render({ state, props }, dispatch));
  };

  node = patch(node, render({ state, props }, dispatch));
};

export default { run };
