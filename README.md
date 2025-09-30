# ☕  **'Grids & Circles'** - 카페 메뉴 관리 프로젝트

작은 로컬 카페 **'Grids & Circles'** 를 위한 주문 / 배송 서비스

---

## **📜 프로젝트 개요**

Spring Boot 기반의 **Grids & Circles**는 온라인 주문·배송 시스템으로, 이메일을 통한 고객 관리, 제품 목록 조회, 주문·배송 처리, 관리자용 상품 CRUD 기능을 제공하며 매일 오후 2시 기준으로 주문을 집계해 다음날 일괄 배송합니다.

---

## **💁‍♂️ 팀원 소개 / 역할**
| 최지혁 | 구본황 | 김은경 | 김채현 | 김현수 |
| --- | --- | --- | --- | --- |
| <p align="center"><a href="https://github.com/hodakrer"><img src="https://github.com/hodakrer.png" width="100"></a></p> | <p align="center"><a href="https://github.com/BE9koo"><img src="https://github.com/BE9koo.png" width="100"></a></p> | <p align="center"><a href="https://github.com/kimeunkyoungg"><img src="https://github.com/kimeunkyoungg.png" width="100"></a></p> | <p align="center"><a href="https://github.com/Chehyeon-Kim23"><img src="https://github.com/Chehyeon-Kim23.png" width="100"></a></p> | <p align="center"><a href="https://github.com/lambsteak-dev"><img src="https://github.com/lambsteak-dev.png" width="100"></a></p> |
| <p align="center"><b>팀장</b></p> | <p align="center"><b>팀원</b></p> | <p align="center"><b>팀원</b></p> | <p align="center"><b>팀원</b></p> | <p align="center"><b>팀원</b></p> |
| <p align="center">주문 생성<br> 주문 다건 조회<br>프론트 연동</p> | <p align="center">주문 수정<br>주문 취소<br>Swagger<br>배송 스케줄링<br>프론트 연동</p> | <p align="center">관리자 SpringSecurity/JWT<br>관리자 로그인/로그아웃<br>백엔드/프론트 초기 세팅<br>프론트 연동</p> | <p align="center">상품 생성<br>상품 조회<br>프론트 연동</p> | <p align="center">상품 수정<br>상품 삭제<br>주문 단건 조회<br>프론트 연동</p> |


---

## 📝 유저 스토리
### 👤 고객(사용자)

- **C-1 [상품조회]**
    
    나는 고객으로서, **판매 중인 커피를 확인하기 위해**, 메뉴를 조회할 수 있다.
    
- **C-2 [주문작성]**
    
    나는 고객으로서, **원하는 커피를 원하는 주소로 받기 위해**, 주문서를 작성할 수 있다.
    
- **C-3 [주문조회]**
    
    나는 고객으로서, **내 주문 진행 상황을 확인하기 위해**, 이메일로 주문 내역을 조회할 수 있다.
    
- **C-4 [주문취소]**
    
    나는 고객으로서, **잘못하거나 필요 없어진 주문을 없애기 위해**, 주문을 취소할 수 있다.
    

### 👨‍💻 관리자(Admin)

- **A-1 [상품관리]**
    
    나는 관리자로서, **상품 메뉴를 최신화하기 위해**, 커피 메뉴를 등록·수정·삭제할 수 있다.
    
- **A-2 [주문관리]**
    
    나는 관리자로서, **주문을 원활히 처리하기 위해**, 주문 내역을 확인할 수 있다.

---

## **⭐** 주요 기능

### **👤 사용자 기능**

사용자는 별도의 회원가입 없이 이메일을 통해 주문할 수 있습니다.

- 장바구니 담기·조회·수정·삭제
- 주문 생성·조회·수정·취소
- 상품 조회
- 오후 2시 기준 당일/익일 배송

### 👨‍💻 관리자 기능

관리자는 인증을 거쳐 관리자 페이지에 접근할 수 있습니다.

- Spring Security + JWT
- 상품 등록, 조회, 수정, 삭제
- 주문 내역 조회, 수정 , 삭제

### **🕑 시스템 규칙**

- 🚚 배송 규칙
    - 오후 2시 이전 주문 → 당일 배송 시작
    - 오후 2시 이후 주문 → 다음날 배송 시작
- 🔐 인증 / 인가
    - 고객 API는 인증 없이 사용 가능(장바구니 / 주문 / 조회)
    - 관리자 API는 인증 필수

---

## 🔧기술 스택
<div align=left>
    <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white">
    <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
    <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
    <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/h2database-09476B?style=for-the-badge&logo=h2database&logoColor=white">
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/nextdotjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
</div>

---

## **🔗 ERD (Entity Relationship Diagram)**
<img width="1140" height="511" alt="Image" src="https://github.com/user-attachments/assets/a4c1b7e9-01b5-4d8d-84c1-98103eedc298" />

---

## ⚙️ 시스템 아키텍처
<img width="756" height="771" alt="Image" src="https://github.com/user-attachments/assets/f1d97f32-00b8-4147-8b78-05e6e90ea9b4" />

---

## 🎞️ 시연 영상
[고객-주문확인 영상](https://github.com/user-attachments/assets/a5406a26-4580-4944-a9f1-610f840659f3)

[고객-장바구니확인 영상](https://github.com/user-attachments/assets/8b2881eb-0a0b-4f5c-a4e4-dc703a725c17)

[관리자 시연 영상](https://github.com/user-attachments/assets/816e0d73-0856-478f-9c50-6318912f14ea)

---
## 📃 코딩 컨벤션

### 🚀 GitHub Flow

우리 팀은 기존 **main / feature** 브랜치 구조에 **develop** 브랜치를 추가해 안정성과 협업 효율을 높였습니다.

- **main**
    - 실제 서비스에 배포되는 안정화 브랜치
    - 브랜치 보호 규칙 적용 (PR + 리뷰 후 머지)
- **develop**
    - 새로운 기능 개발이 통합되는 기준 브랜치
    - 브랜치 보호 규칙 적용 (PR + 리뷰 후 머지)
- **feature/**
    - 개별 기능 개발용 브랜치
    - 이슈 단위로 생성하여 작업
    - 작업 완료 후 PR을 통해 develop에 머지

---

### **🔄 작업 순서**

1. **이슈 생성** → 작업 단위 정의
2. **브랜치 생성** → develop 브랜치에서 이슈별 작업 브랜치 생성
3. **Commit & Push**
4. **PR 생성 & 코드 리뷰** → 최소 2명 승인 필요
5. **Merge & 브랜치 정리**
    - 리뷰 완료 후 develop 브랜치로 Merge
    - Merge 후 이슈별 작업 브랜치 삭제

---

### ⚙️ 네이밍 & 작성 규칙

1. **이슈**
    - 제목 규칙 : `[타입] 작업내용`
    - 예시 : `[feat] 로그인 기능 추가`
    - 본문은 템플릿에 맞춰서 작성
2. **PR**
    - 제목 규칙 : `[타입] 작업내용`
    - 예시 : `[feat] 로그인 기능 추가`
    - 본문은 템플릿에 맞춰서 작성
3. **브랜치**
    - 생성 기준 : `develop` 브랜치에서 생성
    - 명명 규칙 : `타입/#이슈번호`
    - 예시: `feat/#1`
    - `main`과 `develop` 브랜치는 브랜치 보호 규칙이 적용되어, 반드시 PR을 통해 최소 2명의 팀원 리뷰 승인 후에만 머지할 수 있다.
4. **Commit Message 규칙**
    
    
    | 타입 | 의미 |
    | --- | --- |
    | **feat** | 새로운 기능 추가 |
    | **fix** | 버그 수정 |
    | **docs** | 문서 수정 (README, 주석 등) |
    | **style** | 코드 스타일 변경 (포맷팅, 세미콜론 등. 기능 변화 없음) |
    | **refactor** | 코드 리팩토링 (동작 변화 없음) |
    | **test** | 테스트 코드 추가/수정 |
    | **chore** | 빌드, 패키지 매니저, 설정 파일 등 유지보수 작업(환경 설정) |
    | **remove** | 파일, 폴더 삭제 |
    | **rename** | 파일, 폴더명 수정 |
    - `타입 : 작업내용 #이슈번호`
    - 예시: `feat : 로그인 기능 추가#1`
