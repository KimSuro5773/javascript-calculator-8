import {
  CUSTOM_DELIMITER_REGEX,
  CUSTOM_SPECIAL_DELIMITER_REGEX,
  DELIMITERS,
} from './constants/delimiter.js';
import Validator from './utils/Validator.js';

class Model {
  delimiterParse(userInput) {
    const customDelimiterMatch = userInput.match(CUSTOM_DELIMITER_REGEX);

    if (customDelimiterMatch) {
      const customDelimiter = customDelimiterMatch[1];

      Validator.validateCustomDelimiter(customDelimiter);

      const calculationString = userInput.replace(CUSTOM_DELIMITER_REGEX, '');

      const delimiterArray = [...DELIMITERS, customDelimiter];

      return { calculationString, delimiterArray };
    }

    return { calculationString: userInput, delimiterArray: [...DELIMITERS] };
  }

  delimiterSplit(calculationString, delimiterArray) {
    // 정규식 특수문자 처리를 위한 이스케이프( "]", "[", "\" 등)
    const escapedDelimiters = delimiterArray
      .map((delimiter) => delimiter.replace(CUSTOM_SPECIAL_DELIMITER_REGEX, '\\$&'))
      .join('');

    const delimiterRegex = new RegExp(`[${escapedDelimiters}]`);
    return calculationString.split(delimiterRegex);
  }

  calculate(numbers) {
    const validateNumbers = numbers.map((str) => Validator.validateUserInput(str));

    const result = validateNumbers.reduce((sum, num) => sum + num, 0);

    Validator.validateCalculateResult(result);

    return result;
  }
}

export default Model;
