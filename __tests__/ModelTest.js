import { ERROR_MESSAGES } from '../src/constants/errorMessages.js';
import Model from '../src/Model.js';

describe('Model 클래스 테스트', () => {
  const model = new Model();

  describe('delimiterParse - 구분자 파싱 테스트', () => {
    test('커스텀 구분자가 없을 때 기본 구분자만 반환', () => {
      const userInput = model.delimiterParse('1,2:3');

      expect(userInput.calculationString).toBe('1,2:3');
      expect(userInput.delimiterArray).toEqual([',', ':']);
    });

    test('커스텀 구분자가 있을 때 파싱', () => {
      const userInput = model.delimiterParse('//&\\n1&2');

      expect(userInput.calculationString).toBe('1&2');
      expect(userInput.delimiterArray).toEqual([',', ':', '&']);
    });

    test('커스텀 구분자가 비어있으면 에러', () => {
      expect(() => model.delimiterParse('//\\n1,2')).toThrow(ERROR_MESSAGES.EMPTY_CUSTOM_DELIMITER);
    });

    test('커스텀 구분자의 길이가 1을 초과하면 에러', () => {
      expect(() => model.delimiterParse('//&&\\n1&&2')).toThrow(
        ERROR_MESSAGES.CUSTOM_DELIMITER_LENGTH_EXCEEDED,
      );
    });

    test('커스텀 구분자에 숫자가 포함되면 에러', () => {
      expect(() => model.delimiterParse('//1\\n112')).toThrow(
        ERROR_MESSAGES.CUSTOM_DELIMITER_CONTAINS_NUMBER,
      );
    });
  });

  describe('delimiterSplit - 문자열 분리 테스트', () => {
    test('기본 구분자로 문자열을 분리 후 배열로 반환', () => {
      const result = model.delimiterSplit('1,2:3', [',', ':']);

      expect(result).toEqual(['1', '2', '3']);
    });

    test('커스텀 구분자로 문자열을 분리 후 배열로 반환', () => {
      const result = model.delimiterSplit('1&2&3', [',', ':', '&']);

      expect(result).toEqual(['1', '2', '3']);
    });

    test('기본 구분자와 커스텀 구분자를 혼용', () => {
      const result = model.delimiterSplit('1,2:3&4', [',', ':', '&']);

      expect(result).toEqual(['1', '2', '3', '4']);
    });

    test('구분자 연속 사용 시 빈 문자열', () => {
      const result = model.delimiterSplit('1,,2', [',', ':']);

      expect(result).toEqual(['1', '', '2']);
    });

    test('대괄호 ] 구분자 사용', () => {
      const result = model.delimiterSplit('1]2]3', [',', ':', ']']);

      expect(result).toEqual(['1', '2', '3']);
    });

    test('백슬래시 구분자 사용', () => {
      const result = model.delimiterSplit('1\\2\\3', [',', ':', '\\']);

      expect(result).toEqual(['1', '2', '3']);
    });

    test('백틱 사용', () => {
      const result = model.delimiterSplit('1-2-3', [',', ':', '-']);

      expect(result).toEqual(['1', '2', '3']);
    });
  });

  describe('calculate - 계산 테스트', () => {
    test('숫자 배열의 합 계산', () => {
      const numbers = model.calculate(['1', '2', '3']);

      expect(numbers).toBe(6);
    });

    test('빈 문자열은 0으로 계산', () => {
      const numbers = model.calculate(['1', '0', '2']);

      expect(numbers).toBe(3);
    });

    test('빈 문자열만 있으면 0', () => {
      const numbers = model.calculate(['']);

      expect(numbers).toBe(0);
    });

    test('연산 결과가 Safe Integer 범위를 초과하면 에러', () => {
      expect(() => model.calculate(['9007199254740991', '1'])).toThrow(
        ERROR_MESSAGES.NUMBER_TOO_LARGE,
      );
    });

    test('음수 입력 시 에러', () => {
      expect(() => model.calculate(['-1', '2'])).toThrow(
        ERROR_MESSAGES.NEGATIVE_NUMBER_NOT_ALLOWED,
      );
    });

    test('숫자가 아닌 문자 입력 시 에러', () => {
      expect(() => model.calculate(['1', 'a', '2'])).toThrow(ERROR_MESSAGES.INVALID_CHARACTER);
    });
  });
});
