import { ERROR_MESSAGES } from '../constants/errorMessages.js';

class Validator {
  static validateCustomDelimiter(delimiter) {
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

  static validateUserInput(str) {
    if (str === '') {
      return 0;
    }

    if (/^-/.test(str)) {
      throw new Error(ERROR_MESSAGES.NEGATIVE_NUMBER_NOT_ALLOWED);
    }

    if (!/^\d+$/.test(str)) {
      throw new Error(ERROR_MESSAGES.INVALID_CHARACTER);
    }

    return Number(str);
  }

  static validateCalculateResult(result) {
    if (!Number.isSafeInteger(result)) {
      throw new Error(ERROR_MESSAGES.NUMBER_TOO_LARGE);
    }
  }
}

export default Validator;
