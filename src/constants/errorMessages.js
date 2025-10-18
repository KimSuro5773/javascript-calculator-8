export const ERROR_MESSAGES = {
  // 커스텀 구분자 에러
  EMPTY_CUSTOM_DELIMITER: '[ERROR] 커스텀 구분자가 비어 있습니다.',
  CUSTOM_DELIMITER_LENGTH_EXCEEDED: '[ERROR] 커스텀 구분자는 한 문자만 입력할 수 있습니다.',
  CUSTOM_DELIMITER_CONTAINS_NUMBER: '[ERROR] 커스텀 구분자에는 숫자를 사용할 수 없습니다.',

  // 사용자 입력 에러
  NEGATIVE_NUMBER_NOT_ALLOWED: '[ERROR] 음수는 입력할 수 없습니다.',
  INVALID_CHARACTER: '[ERROR] 구분자와 양수외에 잘못된 문자가 입력되었습니다.',

  // 연산 에러
  NUMBER_TOO_LARGE: '[ERROR] 연산 결과가 최대 정수 범위를 초과했습니다.',
};
