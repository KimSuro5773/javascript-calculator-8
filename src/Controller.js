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
      // 1. 사용자 입력 받기 (View)
      const userInput = await this.#view.getUserInput();

      // 2. 구분자 파싱 (Model)
      const { calculationString, delimiterArray } = this.#model.delimiterParse(userInput);

      // 3. 문자열을 구분자로 분리 후 배열로 변환 (Model)
      const numbers = this.#model.delimiterSplit(calculationString, delimiterArray);

      // 계산 (Model)
      const result = this.#model.calculate(numbers);

      // 결과 출력 (View)
      this.#view.printResult(result);
    } catch (error) {
      throw error;
    }
  }
}

export default Controller;
