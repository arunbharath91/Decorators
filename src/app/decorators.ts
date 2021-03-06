export const Freeze = (constructor: any) => {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

export const Debounce = (wait: number, immediate: boolean = false) => {

  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {

    // store timeout value for cancel the timeout
    let timeoutID: any;
    // store original function for future use
    const original = descriptor.value;
    descriptor.value = function(args: any) {
      const lazyFn = () => {
        timeoutID = false;
        if (!immediate) original.apply(this, args);
      }
      const callNow = (immediate && !timeoutID)
      if (timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(lazyFn, wait);
      if (callNow) original.apply(this, args);
    }
    return descriptor;
  }
}

export const Throttle = (wait: number) => {

  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {

    // store timeout value for cancel the timeout
    let lastFn: any;
    let lastRun: any;
    // store original function for future use
    const original = descriptor.value;
    descriptor.value = function(args: any) {
      if (!lastRun) {
        original.apply(this, args)
        lastRun = Date.now()
      } else {
        clearTimeout(lastFn)
        lastFn = setTimeout(() => {
          if ((Date.now() - lastRun) >= wait) {
            original.apply(this, args)
            lastRun = Date.now()
          }
        }, wait - (Date.now() - lastRun))
      }

    }
    return descriptor;
  }
}

export const SINGLETON_KEY = Symbol();

export const Singleton = (classTarget: any) => {
  return new Proxy(classTarget, {
    construct(target, argumentsList: any[], newTarget) {
      // Skip proxy for children
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argumentsList, newTarget)
      }
      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget)
      }
      return target[SINGLETON_KEY]
    },
  })
}
