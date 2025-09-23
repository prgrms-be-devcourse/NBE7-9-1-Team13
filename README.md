# ☕  **'Grids & Circles'** - 카페 메뉴 관리 프로젝트

작은 로컬 카페 **'Grids & Circles'** 를 위한 주문 / 배송 서비스

---

## **📜 프로젝트 개요**

Spring Boot 기반의 **Grids & Circles** 온라인 주문·배송 시스템으로, 이메일을 통한 고객 관리, 제품 목록 조회, 주문·배송 처리, 관리자용 상품 CRUD 기능을 제공하며 매일 오후 2시 기준으로 주문을 집계해 다음날 일괄 배송합니다.

---

## **💁‍♂️ 팀원 소개 / 역할**

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

- 상품 등록, 조회, 수정, 삭제
- 주문 내역 조회, 수정 , 삭제

### **🕑 시스템 규칙**

- 배송 규칙
    - 오후 2시 이전 주문 → 당일 배송 시작
    - 오후 2시 이후 주문 → 다음날 배송 시작
- 인증 / 인가
    - 고객 API는 인증 없이 사용 가능(장바구니 / 주문 / 조회)
    - 관리자 API는 인증 필수

---

## 🔧기술 스택

### BACK-END

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

### FRONT-END

---

## **🔗 ERD (Entity Relationship Diagram)**

![cafe (1).png](attachment:2c193692-c95d-476c-8c20-1b1932a5e70f:cafe_(1).png)

---

## 📃코딩 컨벤션

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
    | remove | 파일, 폴더 삭제 |
    | rename | 파일, 폴더명 수정 |
    - `타입 : 작업내용 #이슈번호`
    - 예시: `feat : 로그인 기능 추가#1`
