import View from './View.js';
import Model from './Model.js';

class Controller {
  #view;
  #model;

  constructor() {
    this.#view = new View();
    this.#model = new Model();
  }

  async run() {
    try {
      // 1. 사용자 입력 받기  ex) userInput : //&\n1&2
      const userInput = await this.#view.getUserInput();

      // 2. 구분자 파싱  ex) calculationString : 1&2 | delimiterArray : [",", ":", "&"]
      const { calculationString, delimiterArray } = this.#model.delimiterParse(userInput);

      // 3. 문자열을 구분자로 분리 후 배열로 변환  ex) numbers : ["1", "2"]
      const numbers = this.#model.delimiterSplit(calculationString, delimiterArray);

      // 4. 계산 ex) result : 3
      const result = this.#model.calculate(numbers);

      // 5. 결과 출력
      this.#view.printResult(result);
    } catch (error) {
      throw error;
    }
  }
}

export default Controller;
