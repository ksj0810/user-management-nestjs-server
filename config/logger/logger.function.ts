import { LoggerService } from './logger.service';

// Controller Response 리턴하기전 로그 저장
export function infoLogger(req: any, res: any) {
  const url = req.url;
  const apiMethod = req.method;
  const requestQueryJson = JSON.stringify(req.query);
  const requestBodyJson = JSON.stringify(req.body);
  const requestPathJson = JSON.stringify(req.params);
  const responseJson = JSON.stringify(res);
  const loggerService = new LoggerService();

  loggerService.log(
    `${url} ${apiMethod} ${requestQueryJson} ${requestBodyJson} ${requestPathJson}\n ${responseJson}`,
  );
}

export function infoLoggerWithoutReq(message: string) {
  const loggerService = new LoggerService();

  loggerService.log(
    `${message} \n
    NODE_ENV : ${process.env.NODE_ENV}
    PORT : ${process.env.PORT_NUMBER}`,
  );
}

// Service 로직 내 에러 발생시 로그 저장
export function errorLogger(error: any, location?: string, currentFunction?: string, request?: any) {
  const loggerService = new LoggerService();
  let url, apiMethod, requestQueryJson, requestBodyJson, requestPathJson;

  if (request) {
    url = request.url;
    apiMethod = request.method;
    requestQueryJson = JSON.stringify(request.query);
    requestBodyJson = JSON.stringify(request.body);
    requestPathJson = JSON.stringify(request.params);
    loggerService.error(
      `location: ${location}\n currentFunction: ${currentFunction}\nurl: ${url}\napiMethod: ${apiMethod}\nrequestQueryJson: ${requestQueryJson}\nrequestBodyJson: ${requestBodyJson}\nrequestPathJson: ${requestPathJson}\n`,
      error,
    );
  } else {
    loggerService.error(
      `location: ${location}\ncurrentFunction: ${currentFunction}\nerror: ${error}\n`, error,
    );
  }
}
