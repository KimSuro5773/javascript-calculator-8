import { CUSTOM_DELIMITER_REGEX, DELIMITERS } from './constants/delimiter.js';
import { ERROR_MESSAGES } from './constants/errorMessages.js';

class Model {
  delimiterParse(userInput) {
    const customDelimiterMatch = userInput.match(CUSTOM_DELIMITER_REGEX);

    if (customDelimiterMatch) {
      const customDelimiter = customDelimiterMatch[1];

      this.#validateCustomDelimiter(customDelimiter);

      const calculationString = userInput.replace(CUSTOM_DELIMITER_REGEX, '');

      const delimiterArray = [...DELIMITERS, customDelimiter];

      return { calculationString, delimiterArray };
    }

    return { calculationString: userInput, delimiterArray: [...DELIMITERS] };
  }

  delimiterSplit(calculationString, delimiterArray) {
    // 정규식 특수문자 처리를 위한 이스케이프( "]", "[", "\" 등)
    const escapedDelimiters = delimiterArray
      .map((delimiter) => delimiter.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&'))
      .join('');

    const delimiterRegex = new RegExp(`[${escapedDelimiters}]`);
    return calculationString.split(delimiterRegex);
  }

  calculate(numbers) {
    const validateNumbers = numbers.map((str) => {
      this.#validateUserInput(str);
      return Number(str);
    });

    const result = validateNumbers.reduce((sum, num) => sum + num, 0);

    if (!Number.isSafeInteger(result)) {
      throw new Error(ERROR_MESSAGES.NUMBER_TOO_LARGE);
    }

    return result;
  }

  #validateCustomDelimiter(delimiter) {
    if (delimiter === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER);
    }

    if (delimiter.length > 1) {
      throw new Error(ERROR_MESSAGES.CUSTOM_DELIMITER_LENGTH_EXCEEDED);
    }

    if (/\d/.test(delimiter)) {
      throw new Error(ERROR_MESSAGES.CUSTOM_DELIMITER_CONTAINS_NUMBER);
    }
  }

  #validateUserInput(str) {
    if (str === '') return 0;

    if (/^-/.test(str)) {
      throw new Error(ERROR_MESSAGES.NEGATIVE_NUMBER_NOT_ALLOWED);
    }

    if (!/^\d+$/.test(str)) {
      throw new Error(ERROR_MESSAGES.INVALID_CHARACTER);
    }
  }
}

export default Model;
