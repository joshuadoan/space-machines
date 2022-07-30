import { ShipStates, ShipTransitions } from "./game/actors/ship/state-definition";

export type StateDefinition = {
  type: ShipStates;
  at?: Date;
};

export type StateMachineDefinition = {
  initialState: StateDefinition;
  states: {
    [key in ShipStates]: {
      transitions: Transitions;
    };
  };
};

export type TransitionDefinition = {
  to: StateDefinition;
  effect: (payload?: any) => void;
};

export type Transitions = {
  [key in ShipTransitions]?: TransitionDefinition;
};

export type Machine = {
  value: StateDefinition;
  transition(
    currentState: StateDefinition,
    transitionName: ShipTransitions,
    payload?: any
  ): StateDefinition;
};

export function createMachine(stateMachineDefinition: StateMachineDefinition) {
  let { initialState } = stateMachineDefinition;

  let machine: Machine = {
    value: initialState,
    transition(currentState, transitionName, payload) {
      let { states } = stateMachineDefinition;
      let { transitions } = states[currentState.type];

      let transition = transitions[transitionName];
      if (transition) {
        transition.effect(payload);
      }

      let nextState = transition?.to || currentState;
      nextState.at = new Date();

      machine.value = nextState;
      return nextState;
    }
  };

  return machine;
}
