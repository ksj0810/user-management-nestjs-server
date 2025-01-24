# 1. Node.js LTS 기반 이미지 사용
FROM node:19

# 2. 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# 3. package.json 및 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. 애플리케이션 실행 명령
CMD ["npm", "run", "start"]
