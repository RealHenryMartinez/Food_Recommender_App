
export const updateStateObject = (previousState: any, updateProperties: any) => ({
  // takes previous state and deconsturecte it -> then assign the "copied" updated state with its properties by deconstructing it and assign it to the previous state
  ...previousState,
  ...updateProperties,
})
