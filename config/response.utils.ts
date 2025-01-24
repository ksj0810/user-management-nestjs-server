export const RESPONSE = {
  SUCCESS: {
    isSuccess: true,
    code: 1000,
    message: '성공',
  },
  CHECK_JWT_TOKEN: {
    isSuccess: false,
    code: 2000,
    message: 'JWT 토큰을 확인해주세요.',
  },
  USER_ID_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: '아이디가 없습니다.',
  },
  NON_EXIST_EMAIL: {
    isSuccess: false,
    code: 2002,
    message: '이메일을 확인해주세요.',
  },
  NON_MATCH_PASSWORD: {
    isSuccess: false,
    code: 2003,
    message: '비밀번호가 일치하지 않습니다.',
  },
  EMPTY_EMAIL: {
    isSuccess: false,
    code: 2004,
    message: '이메일을 입력해주세요.',
  },
  INVALID_EMAIL: {
    isSuccess: false,
    code: 2005,
    message: '유효하지 않은 이메일 입니다.',
  },
  EMPTY_PASSWORD: {
    isSuccess: false,
    code: 2006,
    message: '비밀번호를 입력해주세요.',
  },
  INVALID_PASSWORD: {
    isSuccess: false,
    code: 2007,
    message: '유효하지 않은 비밀번호 입니다.',
  },
  EMPTY_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2008,
    message: '확인 비밀번호를 입력해주세요.',
  },
  INVALID_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2009,
    message: '유효하지 않은 확인 비밀번호 입니다.',
  },
  NOT_MATCH_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2010,
    message: '확인 비밀번호와 일치하지 않습니다.',
  },
  EMPTY_NICKNAME: {
    isSuccess: false,
    code: 2011,
    message: '닉네임을 입력해주세요.',
  },
  EXIST_EMAIL: {
    isSuccess: false,
    code: 2012,
    message: '이미 사용중인 이메일입니다.',
  },
  NON_EXIST_USER: {
    isSuccess: false,
    code: 2013,
    message: '존재하지 않는 유저입니다.',
  },
  INVALID_NICKNAME: {
    isSuccess: false,
    code: 2014,
    message: '닉네임이 20자를 초과합니다.',
  },
  EMPTY_PHONE_NUMBER: {
    isSuccess: false,
    code: 2015,
    message: '핸드폰 번호를 입력해주세요.',
  },
  INVALID_PHONE_NUMBER: {
    isSuccess: false,
    code: 2016,
    message: '유효하지 않은 핸드폰 번호입니다.',
  },
  EXIST_PHONE_NUMBER: {
    isSuccess: false,
    code: 2017,
    message: '이미 사용중인 핸드폰 번호입니다.',
  },
  EXIST_NICKNAME: {
    isSuccess: false,
    code: 2018,
    message: '이미 사용중인 닉네임입니다.',
  },
  PAGE_EMPTY: {
    isSuccess: false,
    code: 2100,
    message: '페이지 번호를 입력해주세요.',
  },
  INVALID_PAGE: {
    isSuccess: false,
    code: 2101,
    message: '유효하지 않은 페이지 값 입니다.',
  },
  PAGE_SIZE_EMPTY: {
    isSuccess: false,
    code: 2102,
    message: '페이징 사이즈를 입력해주세요.',
  },
  INVALID_PAGE_SIZE: {
    isSuccess: false,
    code: 2103,
    message: '유효하지 않은 페이징 사이즈 입니다.',
  },
  SORT_TYPE_EMPTY: {
    isSuccess: false,
    code: 2104,
    message: '정렬 기준을 입력해주세요.',
  },
  INVALID_SORT_TYPE: {
    isSuccess: false,
    code: 2105,
    message: '정렬 기준은 desc와 asc만 입력 가능합니다.',
  },
  EMPTY_USER_ID: {
    isSuccess: false,
    code: 2106,
    message: '유저 아이디가 없습니다.',
  },
  INVALID_USER_ID: {
    isSuccess: false,
    code: 2107,
    message: '유효하지 않은 유저 아이디 입니다.',
  },
  ERROR: {
    isSuccess: false,
    code: 4000,
    message: '서버 에러',
  },
};
