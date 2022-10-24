# 병원 예약 시스템

![JavaScript Badge](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;

## 🏥 개요

병원을 예약하는 어플리케이션입니다.

- 환자가 예약을 하려 할때 예약 가능일자, 병원, 진료목적을 선택하여 예약을 합니다.

- 개발기간: 2022.10.14 - 2022.10.16 (2일)
- 개발인원: 김민지, 박정용, 육지(PM), 조예슬

<br>

## 🏥 프로젝트 실행 방법

- 사전에 Git, node, MySQL이 설치되어있어야 합니다.

```shell
# 레포지토리 클론
$ git clone https://github.com/pre-onboarding-backend-team4/hospital-reservation-app-server.git

# 접속
$ cd hospital-reservation-app-server

# 패키지 설치
$ npm install

# 데이터베이스 생성
mysql> create database 데이터베이스명 character set utf8mb4 collate utf8mb4_general_ci;

# .env파일 만들기
DATABASE_URL = mysql://계정:비밀번호@호스트주소:포트번호/데이터베이스명
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 호스트주소
TYPEORM_PORT = 포트번호
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 데이터베이스명
TYPEORM_LOGGING = TRUE

# 데이터베이스 테이블 생성
$ npx dbmate up

# 프로젝트 실행
$ node server.js

# server start : http://localhost:8000
```

<br>

## 🏥 DB Modeling

**[🔗 dbdiagram](https://dbdiagram.io/d/634a4b1af0018a1c5f0ba2fe)**
![DB Modeling](https://i.imgur.com/Hvvlhgk.png)

<br>

## 🏥 구현 기능에 대한 소개

### 1. 병원 예약 가능 목록 (조예슬)

- 예약 가능한 모든 병원 목록을 확인할 수 있습니다. 
limit, offset을 쿼리 파라미터로 넣을 수 있습니다.(디폴트 limit 20, offset 0)

- 패스 파라미터로 병원 아이디를 넣으면 해당 병원의 예약 가능 일시를 확인할 수 있습니다.

---

### 2. 예약 등록 (육지)

- 예약 등록 : body 값으로 예약 정보를 입력받아 예약을 등록합니다.
이미 예약된 시간에 대하여 요청이 들어왔을 경우, 이전에 노쇼한 환자의 경우 예약하지 못하도록 구현했습니다.
- 예약 상태 변경 : 예약 상태 종류는 1.예약완료(default) / 2.예약취소 / 3.진료완료 / 4.노쇼 입니다.

---

### 3. 전체 예약목록 (박정용)

- 쿼리스트링으로 예약자 이름 또는 예약번호를 가져옵니다.
- 입력받은 쿼리스트링 두가지를 DB에서 있는지 확인한 후 있으면 결과, 없으면 에러를 반환합니다.

---

### 4. 예약내역 정보 수정 (김민지)

- 신청한 예약 번호를 통해 예약을 변경할 수 있습니다. (환자 이름, 예약 시간, 예약 종류 변경 가능)

<br>

## 🏥 API docs

- 조예슬 : (병원 예약 가능 목록) 👉 [Postman API doc](https://documenter.getpostman.com/view/22215172/2s847BUbt7)
- 육지 : (예약 등록) 👉 [Postman API doc](https://documenter.getpostman.com/view/21288917/2s847BUvgL)
- 박정용 : (전체 예약조회) 👉 [Postman API doc](https://documenter.getpostman.com/view/22204904/2s847BUbRi)
- 김민지 : (예약내역 정보 수정) 👉 [Postman API doc](https://documenter.getpostman.com/view/22580140/2s847CvEiW)
