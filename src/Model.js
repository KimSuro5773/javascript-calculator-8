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
    const delimiterRegex = new RegExp(`[${delimiterArray.join('')}]`);

    return calculationString.split(delimiterRegex);
  }

  calculate(numbers) {
    const validateNumbers = numbers.map((str) => {
      this.#validateUserInput(str);
      return Number(str);
    });

    return validateNumbers.reduce((sum, num) => sum + num, 0);
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
    if (/^-/.test(str)) {
      throw new Error(ERROR_MESSAGES.NEGATIVE_NUMBER_NOT_ALLOWED);
    }

    if (!/^\d+$/.test(str)) {
      throw new Error(ERROR_MESSAGES.INVALID_CHARACTER);
    }
  }
}

export default Model;
