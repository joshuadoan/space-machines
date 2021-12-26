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

export type Machine<S, T> = {
  value: State<S>;
  transition(currentState: State<S>, transitionName: T): State<S>;
};

export function createMachine<S, T>(
  stateMachineDefinition: StateMachineDefinition<S>
): Machine<S, T> {
  const { initialState } = stateMachineDefinition;

  const machine = {
    value: initialState,
    transition(currentState: State<S>, transitionName: T) {
      const { states } = stateMachineDefinition;
      const { transitions } = states[`${currentState.type}`];
      const transition = transitions[`${transitionName}`];

      transition.effect();
      transition.nextState.at = new Date();

      machine.value = transition.nextState;
      return transition.nextState;
    }
  };
  return machine;
}
