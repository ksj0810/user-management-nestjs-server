## 유저관리(User Management)

- NestJS를 사용하여 제작된 유저 관리 프로젝트입니다.
- 유저 조회, 상세 조회, 회원가입, 로그인, 정보 수정, 정보 삭제 기능을 지원합니다.

## 기능 사용법

Swagger [http://localhost:3000/api-docs](http://localhost:3000) 주소를 통해 API 사용법 확인 가능 합니다.

## 템플릿 구조

- 각 도메인별로 Module / Controller / Service 파일이 존재하며 파일명 규칙은 '도메인명 + module / controller / service' 입니다.
- Ex. Auth 도메인(폴더)안에는 auth.module.ts / auth.controller.ts / auth.service.ts 파일이 존재합니다.

1. Module

   - NestJS는 모듈로 구성이 되어 있고, 각 도메인마다 Module을 생성한 다음 app.module.ts에 각 도메인별 모듈을 작성 해줘야 합니다.

2. Controller

   - Route로부터 받은 요청속의 데이터(path-variable, query-string, body 등)를 각 도메인의 검증 Decorator 거친 뒤, Service에게 해당 데이터를 넘겨주고 비즈니스 로직을 수행하도록 합니다.

3. Service
   - 실제 어플리케이션의 핵심적인 비즈니스 로직이 수행되는 영역입니다. 그리고 여기서는 트랜잭션, 논리적 유효성 검사를 진행합니다.

## 실행 명령어

```
local 환경에서 서버 실행
start: npm run start

dev 환경에서 서버 실행 (pm2를 통해서 실행)
dev: npm run dev

도커 실행
이미지 생성: docker build -f Dockerfile -t user-management .
도커 컨테이너 실행: docker run -d -p 3000:3000 user-management

도커로 서버 실행 시 DATABASE_HOST=host.docker.internal 로 지정
```
