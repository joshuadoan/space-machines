type Transition<T extends string | number> = {
  [key: string]: {
    destinationState: T;
    effect?: () => void;
  };
};

export type StateMachineDefinition<T extends string | number> = {
  initialState: T;
  states: {
    [key in T]: {
      transitions: Transition<T>;
    };
  };
};

export type Machine<StatesEnum> = {
  value: StatesEnum;
  transition(
    currentState: StatesEnum,
    transition: string
  ): StatesEnum | undefined;
};

export function createMachine<StatesEnum extends string | number>(
  stateMachineDefinition: StateMachineDefinition<StatesEnum>
): Machine<StatesEnum> {
  const { initialState } = stateMachineDefinition;

  const machine = {
    value: initialState,
    transition(currentState: StatesEnum, transition: string) {
      const { states } = stateMachineDefinition;

      const currentStateDefinition = states[currentState];
      if (!currentStateDefinition) {
        console.warn(`Unknown state ✨${currentState}✨`);
        return currentState;
      }

      const destination = currentStateDefinition.transitions[transition];
      if (!destination) {
        console.warn(
          `You can not 🚙 ${transition} 🚙 from the ✨ ${currentState} ✨ state`
        );
        return;
      }

      /**
       * Run the effect for the transition
       */
      destination.effect && destination.effect();

      /**
       * Transition to the destination state
       */
      machine.value = destination.destinationState;
      return machine.value;
    }
  };
  return machine;
}
