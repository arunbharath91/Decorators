import { Freeze, Debounce, Throttle } from "./decorators";

@Freeze
export class FreezedClass {

}

class Http {
  constructor() {

  }

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
(document.querySelector('#button') as HTMLElement).addEventListener('click', () => {
  http.fetchApi();
});

(document.querySelector('#button2') as HTMLElement).addEventListener('click', () => {
  http.fetchApi2();
});
