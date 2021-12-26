import { ShipStates, ShipTransitions } from "../actors/ship";

export type StateMachineDefinition<S> = {
  initialState: State<S>;
  states: {
    [key: string]: {
      transitions: Transition<S>;
    };
  };
};

export type State<S> = {
  type: S;
  at: Date;
};

type Transition<S> = {
  [key: string]: {
    nextState: State<S>;
    effect: () => void;
  };
};

export type Machine<S> = {
  value: State<S>;
  transition(
    currentState: State<ShipStates>,
    transitionName: ShipTransitions
  ): State<S> | State<ShipStates>;
};

export function createMachine<S>(
  stateMachineDefinition: StateMachineDefinition<S>
): Machine<S> {
  const { initialState } = stateMachineDefinition;

  const machine = {
    value: initialState,
    transition(
      currentState: State<ShipStates>,
      transitionName: ShipTransitions
    ) {
      const { states } = stateMachineDefinition;
      const currentStateDefinition = states[currentState.type];

      const transition = currentStateDefinition.transitions[transitionName];
      transition.effect();
      transition.nextState.at = new Date();

      machine.value = transition.nextState;
      return transition.nextState;
    }
  };
  return machine;
}
