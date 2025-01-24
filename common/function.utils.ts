import { DateComponent } from './variable.utils';

/**
 * description : response를 만들어 주는 함수, result에 들어갈 것이 없다면 undefined 입력해야함
 * @param response
 * @param data
 * @returns object
 */
export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}

/**
 * description : 닐짜 객체를 만들어 주는 함수
 * @returns DateComponent
 */
export function generateDateFormatComponent(): DateComponent {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
  const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
  const hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
  const min = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
  const sec = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
  const milSec = date.getMilliseconds() < 10 ? '00' + date.getMilliseconds().toString() : date.getMilliseconds() < 100 ? '0' + date.getMilliseconds().toString() : date.getMilliseconds().toString();

  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    min: min,
    sec: sec,
    milSec: milSec,
  };
}

/**
 * description : TimeStamp 형식으로 만들어주는 함수. createdAt, updatedAt에 많이 사용됨
 * @returns string
 */
export function defaultCurrentDateTime(): string {
  const object: DateComponent = generateDateFormatComponent();

  return (
    object.year +
    '-' +
    object.month +
    '-' +
    object.day +
    ' ' +
    object.hour +
    ':' +
    object.min +
    ':' +
    object.sec
  );
}

/**
 * description : KST to dateFormat 형식으로 변경해주는 함수
 * @param utc
 * @returns DateComponent
 */
export function makeKSTToDateComponent(utc: string): DateComponent {
  const timestamp = new Date(utc.toString());
  const year = timestamp.getFullYear().toString();
  const month = timestamp.getMonth() + 1 < 10 ? '0' + (timestamp.getMonth() + 1).toString() : (timestamp.getMonth() + 1).toString();
  const day = timestamp.getDate() < 10 ? '0' + timestamp.getDate().toString() : timestamp.getDate().toString();
  const hour = timestamp.getHours() < 10 ? '0' + timestamp.getHours().toString() : timestamp.getHours().toString();
  const min = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes().toString() : timestamp.getMinutes().toString();
  const sec = timestamp.getSeconds() < 10 ? '0' + timestamp.getSeconds().toString() : timestamp.getSeconds().toString();
  const milSec = timestamp.getMilliseconds() < 10 ? '00' + timestamp.getMilliseconds().toString() : timestamp.getMilliseconds() < 100 ? '0' + timestamp.getMilliseconds().toString() : timestamp.getMilliseconds().toString();

  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    min: min,
    sec: sec,
    milSec: milSec,
  };
}
