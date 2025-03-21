# 1-SEVEN-4

## 4조

4조 노션 URL: https://marmalade-sneezeweed-5ce.notion.site/4-1a77cf17c64f808492ccd150ce3c9d11?pvs=4

---

### 팀원구성

박지은: https://github.com/jini2025

송유택: https://github.com/songyoutaeck

신민수: https://github.com/minso0317

정오현: https://github.com/ohhyeon2

조연정: https://github.com/hapyvirus

---

### 프로젝트 소개

- 운동 인증 커뮤니티 서비스 백엔드 시스템 구축
- 프로젝트 기간: 2025.02.25 ~ 2025.03.18

---

### 기술 스택

- Backend: Node.js, Express.js, PrismaORM
- Database: PostgreSQL
- 배포: Render
- 공통 Tool: Git & Github, Discord, Notion

---

### 팀원별 구현 기능 상세

박지은

![](https://velog.velcdn.com/images/shinminsoo317/post/aa03f20e-aad0-47b8-82e3-4e6cff83c1f9/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/7545fa2d-ad9b-4e73-bf12-969c6412ac35/image.png)

송유택

![](https://velog.velcdn.com/images/shinminsoo317/post/aaed23fa-bc22-442f-b50b-a2efa233c7fa/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/d025cf7b-f350-473c-84c2-a07885636a8b/image.png)

신민수

![](https://velog.velcdn.com/images/shinminsoo317/post/27092d40-9350-4280-961e-f9f19e68634a/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/d1f944d9-53b7-49cd-8520-7d67521a9aa1/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/9e7599d9-85e0-4f46-915d-271145f51baf/image.png)

- ERD 관리
  - 팀원과 회의하여 모델링 테이블 작성
  - 작성된 테이블과 Column을 확인하여 ERD 작성, 개발 내용 중 수정사항 반영하여 유지보수
  - 테이블간 관계 설정
- API 명세서 요청, 응답 데이터 수정
  - 초기 작성된 API 명세서와, 실제 해당 내용을 구현 하면서 나타나는 간극 최소화
  - API명세서와 작성된 API을 요청, 응답시 나타나는 데이터가 일치하도록 수정
  - 각자 작업 하면서 다르게 작성했던 오류메세지 일치하도록 수정
- 참여자 등록, 삭제
  - 그룹 참여자 생성 및 삭제하기 위한 닉네임, 비밀번호 시스템 개발
  - API요청시 발생할 수 있는 오류를 관리하기 위한 유효성 검사 미드웨어 구현
  - 기록 라우터에 유효성 검사를 위한 미드웨어 적용하여 오류 관리 및 서버 안정화 시행
  - 그룹이 삭제될 경우 연관된 참여자도 함께 삭제 되도록 구현
- 기록 조회
  - 참여자가 운동 인증한 기록을 조회하는 API 개발
  - 등록시간, 운동기록, 닉네임 등으로 검색하여 조회할 수 있고, 지정한 값으로 페이지네이션 가능하도록 개발
  - 그룹삭제, 멤버삭제 시 연관된 기록도 함께 삭제 되도록 구현
- REST Client Extension을 이용하여 구현된 API 요청, 응답 확인
  - VS Code의 REST Client Extension을 활용하여 각 API를 요청하고 응답받은 후, API 명세서와 대조하여 데이터 일치여부 확인
  - 일치하지 않은 명칭 수정, 오류 발생시 서버가 내려가지 않도록 오류 관리하여 서버 안정화 작업

정오현

![](https://velog.velcdn.com/images/shinminsoo317/post/0782b748-1b27-42f0-af85-30a41e5a7731/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/cb9468d6-f494-4428-804a-3ec14442faf4/image.png)

조연정

![](https://velog.velcdn.com/images/shinminsoo317/post/a7144e46-516c-4be9-8bce-ddbf26186d17/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/a9bc4893-ffa2-471c-9fd2-5cb23d479a54/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/c159e0ea-d2ed-4d95-b270-7ba4e792a48b/image.png)

![](https://velog.velcdn.com/images/shinminsoo317/post/a74cfbf3-4b90-45b2-ac2b-56ced23478a2/image.png)

---

### 파일구조

src ┣ config

┃ ┣ index.js

┃ ┣ prisma.js

┣ controllers

┃ ┣ ErrorController.js

┃ ┣ groupController.js

┃ ┣ groupLikeController.js

┃ ┣ groupTagController.js

┃ ┣ groupbadgeController.js

┃ ┣ imageController.js

┃ ┣ memberController.js

┃ ┣ noticeController.js

┃ ┣ rankingController.js

┃ ┣ recordController.js

┃ ┣ recordListController.js

┃ ┣ timeController.js

┣ lib

┃ ┣ validator

┃ ┃ ┣ validateGroupId.js

┃ ┃ ┣ validateLoginCondition.js

┃ ┃ ┣ validateLoginInfo.js

┃ ┣ BadRequestError.js

┃ ┣ catchHandler.js

┣ routes

┃ ┣ groupBadgeRoutes.js

┃ ┣ groupLikeRoutes.js

┃ ┣ groupRoutes.js

┃ ┣ groupTagRoutes.js

┃ ┣ imageRoutes.js

┃ ┣ memberRoutes.js

┃ ┣ rankingRoute.js

┃ ┣ recordListRoutes.js

┃ ┣ recordRoutes.js

┣ util

┃ ┣ superstruct.js

┣ app.js

prisma

┃ ┣ migrations

┃ ┣ mock.js

┃ ┣ schema.prisma

┃ ┣ seed.js

request

┃ ┣ groups.http

┃ ┣ records.http

.eslintrc.json

.gitignore

.prettierignore

.prettierrc.cjs

README.md

package-lock.json

package.json

### 배포 링크

https://one-seven-4.onrender.com

---

### 프로젝트 회고록(발표자료)

프로젝트 발표 자료링크: https://www.miricanvas.com/ko/v/14atnv0
