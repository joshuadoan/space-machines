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
    effect?: () => void;
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

      /**
       * Was a valid state passed in?
       */
      const currentStateDefinition = states[currentState.type];
      if (!currentStateDefinition) {
        console.warn(`Unknown state ✨${currentState}✨`);
        return currentState;
      }

      /**
       * Does this state allow this transition
       */
      const transition = currentStateDefinition.transitions[transitionName];
      if (!transition) {
        console.warn(
          `You can not 🚙 ${transitionName} 🚙 from the ✨ ${currentState.type} ✨ state`
        );
        return currentState;
      }

      /**
       * Effects on transitions run before we move to the next state
       */
      transition.effect && transition.effect();

      /**
       * Log a time stamp of the transition so the next state has a start time
       */
      transition.nextState.at = new Date();

      /**
       * Transition to the next state
       */
      machine.value = transition.nextState;
      return transition.nextState;
    }
  };
  return machine;
}
