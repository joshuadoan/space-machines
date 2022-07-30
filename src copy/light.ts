let definition = {
  initialState: "green",
  green: {
    transitions: {
      switch: {
        nextState: "yellow"
      }
    }
  },
  yellow: {
    transitions: {
      switch: {
        nextState: "red"
      }
    }
  },
  red: {
    transitions: {
      switch: {
        nextState: "green"
      }
    }
  }
};
