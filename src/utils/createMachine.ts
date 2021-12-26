import { ShipStates } from "../actors/ship";

export type StateMachineDefinition<T> = {
  initialState: State<T>;
  states: {
    [key: string]: {
      transitions: Transition<T>;
    };
  };
};

export type State<T> = {
  type: T;
  at: Date;
};

type Transition<T> = {
  [key: string]: {
    nextState: State<T>;
    effect?: () => void;
  };
};

export type Machine<T> = {
  value: State<T>;
  transition(
    currentState: State<ShipStates>,
    transitionName: ShipStates
  ): State<T> | State<ShipStates>;
};

export function createMachine<T>(
  stateMachineDefinition: StateMachineDefinition<T>
): Machine<T> {
  const { initialState } = stateMachineDefinition;

  const machine = {
    value: initialState,
    transition(currentState: State<ShipStates>, transitionName: string) {
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
