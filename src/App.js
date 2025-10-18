import { Console } from '@woowacourse/mission-utils';
import { CUSTOM_DELIMITER_REGEX, DELIMITERS } from './constants/delimiter.js';
import { ERROR_MESSAGES } from './constants/errorMessages.js';

class App {
  async run() {
    try {
      const userInput = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

      let calculationString = userInput;
      let delimiterArray = [...DELIMITERS];

      const customDelimiterMatch = userInput.match(CUSTOM_DELIMITER_REGEX);

      if (customDelimiterMatch) {
        const customDelimite = customDelimiterMatch[1];

        // 커스텀 구분자 빈 값 체크
        if (customDelimite === '') {
          throw new Error(ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER);
        }

        // 커스텀 구분자 길이 체크
        if (customDelimite.length > 1) {
          throw new Error(ERROR_MESSAGES.CUSTOM_DELIMITER_LENGTH_EXCEEDED);
        }

        // 커스텀 구분자 숫자 체크
        if (/\d/.test(customDelimite)) {
          throw new Error(ERROR_MESSAGES.CUSTOM_DELIMITER_CONTAINS_NUMBER);
        }

        delimiterArray = [...DELIMITERS, customDelimite];

        calculationString = userInput.replace(CUSTOM_DELIMITER_REGEX, '');
      }

      const delimiterRegex = new RegExp(`[${delimiterArray.join('')}]`);

      const numbers = calculationString.split(delimiterRegex);

      const validatedNumbers = numbers.map((str) => {
        const trimmed = str.trim();

        if (trimmed === '') {
          return 0;
        }

        if (/^-/.test(trimmed)) {
          throw new Error(ERROR_MESSAGES.NEGATIVE_NUMBER_NOT_ALLOWED);
        }

        if (!/^\d+$/.test(trimmed)) {
          throw new Error(ERROR_MESSAGES.INVALID_CHARACTER);
        }

        return Number(trimmed);
      });

      const result = validatedNumbers.reduce((sum, num) => sum + num, 0);

      Console.print(`결과 : ${result}`);
    } catch (error) {
      throw error;
    }
  }
}

export default App;
