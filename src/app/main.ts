import '../style.scss';
import { Freeze, Debounce, Throttle, Singleton } from "./decorators";

@Freeze
export class FreezedClass {

}

class Http {
  constructor() {}

  @Debounce(2000)
  fetchApi() {
  console.log('hi')
  }

  @Throttle(2000)
  fetchApi2() {
  console.log('hi')
  }
}
const http = new Http();

@Singleton
class SingletonClass {
  private setting : any = {
    version:Math.random()
  }
  constructor() {

  }
}
const s = new SingletonClass();
const b = new SingletonClass();
console.log(s,b);

(document.querySelector('#button') as HTMLElement).addEventListener('click', () => {
  http.fetchApi();
});

(document.querySelector('#button2') as HTMLElement).addEventListener('click', () => {
  http.fetchApi2();
});
