export type StateMachineDefinition = {
  initialState: State;
  states: {
    [key: string]: {
      transitions: Transition;
    };
  };
};

export type State = {
  type: string;
  at?: Date;
};

type Transition = {
  [key: string]: {
    target: State;
    effect?: () => void;
  };
};

export type Machine = {
  value: State;
  transition(currentState: State, transition: string): State;
};

export function createMachine(
  stateMachineDefinition: StateMachineDefinition
): Machine {
  const { initialState } = stateMachineDefinition;

  const machine = {
    value: initialState,
    transition(currentState: State, transitionName: string) {
      const { states } = stateMachineDefinition;

      const currentStateDefinition = states[currentState.type];
      if (!currentStateDefinition) {
        console.warn(`Unknown state ✨${currentState}✨`);
        return currentState;
      }

      const transition = currentStateDefinition.transitions[transitionName];
      if (!transition) {
        console.warn(
          `You can not 🚙 ${transitionName} 🚙 from the ✨ ${currentState.type} ✨ state`
        );
        return currentState;
      }

      /**
       * Run the effect for the transition
       */
      transition.effect && transition.effect();

      /**
       * Apply a time stamp to the action
       */
      transition.target.at = new Date();

      /**
       * Transition to the destination state
       */
      machine.value = transition.target;
      return transition.target;
    }
  };
  return machine;
}
