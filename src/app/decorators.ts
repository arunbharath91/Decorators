export const Freeze = (constructor: Function) => {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}
