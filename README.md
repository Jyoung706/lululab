# Project : 룰루랩 - 병원 예약 시스템 구축하기

<img src = "https://img.shields.io/badge/-Node.js-%23339933?style=for-the-badge&logo=Node.js&logoColor=white"/> <img src = "https://img.shields.io/badge/-Express-%23000000?style=for-the-badge&logo=Express&logoColor=white"/>
<img src = "https://img.shields.io/badge/-MySQL-%234479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>
<img src = "https://img.shields.io/badge/-typeorm-orange?style=for-the-badge&logo=typeorm&logoColor=white"/>
<img src = "https://img.shields.io/badge/-Postman-%23FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>
<img src = "https://img.shields.io/badge/-Git-%23F05032?style=for-the-badge&logo=Git&logoColor=white"/>





## 1. 프로젝트 소개

**원티드 프리온보딩 기업과제 룰루랩의 병원예약 시스템 구축하기**

병원에 갈때 대기하지 않고 바로 진료를 볼 수 있도록 병원 예약 시스템을 구축하기 위한 프로젝트 입니다.

## _구현한 기능_

  - 예약 가능 병원리스트
  - 예약 가능시간 조회
  - 예약 하기
  - 예약 목록
  - 예약 변경

- **개발 언어** : <img src = "https://img.shields.io/badge/-TypeScript-%233178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>

- **개발 프레임워크** : <img src = "https://img.shields.io/badge/-Express-%23000000?style=for-the-badge&logo=Express&logoColor=white"/> 

- **DB** : <img src = "https://img.shields.io/badge/-MySQL-%234479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>

## 2. 개발 기간 및 인원

- **개발 기간** : 2022.10.15 - 2022.10.17(3일)

- **인원** : 전준영

## 3. 프로젝트 실행 방법
```
# 깃허브에서 레포지토리 클론받기
$ git clone https://github.com/Jyoung706/lululab

# 해당 디렉토리로 이동
$ cd lululab

# 패키지 설치
$ npm install

# .env파일 만들기
DATABASE_URL = mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_PORT = 3306
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 데이터베이스 이름

# 프로젝트 실행
$ npm run build

$ npm run start

# server start : http://localhost:3000
```

## 4. 데이터 모델링
▶️ [dbdiagram Link](https://dbdiagram.io/d/634955f5f0018a1c5f055867)

![new db](https://user-images.githubusercontent.com/108918591/197339813-bbfa0c27-eac3-4e5e-94d7-9a7c22be5ca4.png)


## 5. 프로젝트 구조
```
.
├── 📁db
│   └── 📁migrations
│       ├── 20221015080129_create_users_table.sql
│       ├── 20221015080146_create_departments_table.sql
│       ├── 20221015080203_create_clinic_types_table.sql
│       ├── 20221015080215_create_hospitals_table.sql
│       ├── 20221015080231_create_statuses_table.sql
│       ├── 20221015080241_create_reservations_table.sql
│       ├── 20221015080254_create_options_table.sql
│       ├── 20221015080314_insert_clinic_types.sql
│       ├── 20221015080324_insert_departments.sql
│       ├── 20221015080332_insert_statuses.sql
│       ├── 20221015080341_insert_hospitals.sql
│       ├── 20221015080349_insert_options.sql
│       └── 20221015080355_insert_users.sql
├── package-lock.json
├── package.json
└── 📁src
    ├── 📁Dto
    │   └── reservationDto.ts
    ├── 📁common_function
    │   ├── checkDate.ts
    │   ├── nodeemailer.ts
    │   └── validate_user.ts
    ├── 📁controllers
    │   └── reservationController.ts
    ├── 📁middleware
    │   ├── errorHandler.ts
    │   └── error_creator.ts
    ├── 📁models
    │   └── reservationDao.ts
    ├── 📁routes
    │   └── reservation_router.ts
    ├── 📁services
    │   └── reservationService.ts
    └── 📁typeorm
    │   └── typeorm.ts
    ├── server.ts
    ├── app.ts
    └── tsconfig.json

```

## 6. 구현 기능 설명

**우선 기능 구현 설명을 하기 전 가정상황을 말씀 드리겠습니다.**

사전에 병원측에서 의사를 표시하여 반영되어야 하는 기능들이 몇몇 있습니다. (ex => 유저의 노쇼여부, 병원의 예약정보 등..)
<br/>
그렇기 때문에 유저의 예약 기능을 구현을 했지만 먼저 병원측에서 보내는 데이터에 대한 기능이 모두 구현이 되어있다고 가정하고 프로젝트를 진행했습니다.

### 1) 예약 가능 병원리스트
- 요청 값 없이 요청하면 현재 예약 가능한 병원의 리스트와 예약에 필요한 정보들을 담은 데이터를 반환합니다.

현재 예약이 가능한 병원의 id와 이름, 주소, 점심시간, 영업시작 및 종료시간, 진료시간 간격, 진료과목, 토요일 일요일 공휴일 영업여부와 영업시간의 정보를 프론트로 전달합니다.

※ 진료시간 간격의 경우 30m 또는 1h 로 설정해 두었습니다.

***

### 2) 특정 병원의 예약 가능시간 조회
-  병원의 아이디를 요청 값으로 요청보내면 병원의 예약 불가능 시간을 응답으로 반환합니다.

유저가 선택한 병원의 id를 요청값으로 보내면 현재 병원의 예약 불가능시간을 응답값으로 반환합니다.
<br/>
프론트에서는 예약 가능 병원리스트에서 전달받은 예약에 필요한 정보들을 참고하여 예약 불가능 시간을 브라우저상에 비활성화 처리한다고 가정하였습니다.

**※ 예약 가능 병원리스트에서 받은 정보들을 참고하여 이 API의 응답값으로 전달받은 예약 불가능 시간을 제외한 시간이 예약 가능시간 입니다.**

***

### 3) 예약하기 (email 전송 포함)
- 요청값에 예약에 필요한 요청 값들을 넣어 요청을 보내면 예약이 완료되며 user테이블의 등록된 e-mail로 성공 email이 발송됩니다.
- 병원의 요청에 의해 특정 유저가 노쇼 유저라고 전달 받았다면 해당 유저는 데이터베이스 user 테이블에 is_active 컬럼이 1에서 0으로 비활성화 처리되며
더이상 서비스를 이용할 수 없도록 구현했습니다.

토큰이 구현되어있지 않아 요청시 headers에 userid를 받으며 body에 예약할 환자의 이름, 예약할 날짜, 예약할 시간, 예약할 병원의 id, 예약할 진료유형이 있습니다.
예약 서비스를 이용할 시에 유저의 노쇼 여부, 해당 예약 시간이 예약 가능 시간인지 확인하여 예약을 진행합니다.

***

### 4) 예약 목록 조회하기
  - 요청 값에 조회할 예약번호 또는 조회할 예약자의 이름, 조회할 환자의 이름 중 하나로 요청을 보낸다면 해당하는 예약에 관한 정보를 응답값으로 반환합니다.
  
  ***
  
### 5) 예약 변경
  - 예약 변경에 필요한 요청값을 요청하면 예약 변경이 완료됩니다.
  
  예약 변경시에도 병원에 예약이 가능한지 여부부터 확인하는 로직을 먼저 수행 후 성공 여부에 맞추어 응답값을 반환합니다.
  
### 요청과 응답에 관한 자세한 내용은 API Docs를 참고해 주시길 바랍니다.

👉 [API Docs](https://documenter.getpostman.com/view/22723440/2s847BVGTt#4726f593-255c-4ede-85d3-2f419b7a2f91)

## 7. 프로젝트를 하며 느낀점 

**1. db모델링의 단계**

  모델링을 하던 중 개인병원에도 의사가 여럿인 경우가 있는데 모델링 자체가 병원보다는 의사를 기준으로 만들어 지는게 맞겠다고 생각하여
  의사를 기준으로 모델링을 시작했습니다. 사실적으로 생각하면 의사를 기준으로 모델링하는게 맞겠지만
  의사를 기준으로 할 경우엔 진료 시간이나 진료파트 또는 토요일, 일요일, 공휴일 등의 여러가지 경우의 수가 더욱 복잡해지기 때문에
  마감기간이 3일인 점을 생각하여 병원에는 오직 1인의 의사가 있다고 가정하여 모델링을 했습니다.

**2. 병원에 대한 기능의 부재**

  병원에서 모든 데이터가 등록되어있고 병원의 의사표현이 필요한 측면이 있었습니다.
  예를 들어 병원의 예약 가능 리스트를 조회하는 기능에서도 병원이 진료시간을 어떤 단위로 등록해놓을 것인지 토요일에 영업을 하는지, 어떤 유저가 우리 병원에 노쇼를 했다 등에 관한 정보들이 
  사전에 병원이 예약 시스템을 먼저 병원계정으로 가입하고 데이터를 등록, 요청 해놓지 않는 이상 사용할 수 없다고 판단되어 모든 기능은 병원측이 기능이 모두 구현되어있다고 가정한 상태에서 진행한다 라고 설정해두고 시작하였습니다.
  이 때문에 DB모델링과 로직 구현하는 데에 있어 병원이 만약 ~~했다면 이라는 가정상황이 필요했고 이를 생각하면서 해야했기에 어려움이 있었습니다.
   
**3. Typescript의 사용**
  
  요구사항에 가장 자신있는 언어를 사용하라고 되어있었지만 저는 취업을 위한 기업과제라고 생각하지 않고 더 발전해보고 싶은 마음에 아직 미숙한 Typescript를 사용했습니다.
  객체지향개발을 시작하려면 Javascript보단 Typescript와 더 친숙해져야겠다고 생각했고 그러기 위해선 어느 정도 공부를 한 뒤에 프로젝트에 바로 적용해보면서 익숙해져야한다고 생각했습니다.
  최종적으로는 Nest.js 프레임워크를 기반으로 개발을 해야겠다고 생각하여 요구사항에 벗어난 행동을 했지만 자기발전을 더 하고싶어했던 주니어의  너그럽게 봐주시면 감사하겠습니다.
