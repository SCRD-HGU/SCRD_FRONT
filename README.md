# 🗝 방탈출 예약/리뷰/동행 플랫폼 백엔드 (SCRD Front-End)

> **웹 스크래핑을 활용한 방탈출 예약/리뷰/동행 통합 플랫폼 - 프론트엔드 레포지토리**


[![SCRD 앱 홍보영상](https://img.youtube.com/vi/Qu4Drg5c4mA/0.jpg)](https://www.youtube.com/watch?v=Qu4Drg5c4mA)

- **기간**: 2024.10.23 ~ 2025.05.20 (총 7개월)<br>
- [📱 Google Play에서 SCRD 앱 설치하기](https://play.google.com/store/apps/details?id=com.scrd.scrd)
- [📽 베타 버전 데모 영상 (Google Drive)](https://drive.google.com/drive/folders/1C0baog9rQ4LC-XmpKbN3uXVEPXcWIz9O)
- [🌐 SCRD 웹페이지 접속하기](https://scrd.netlify.app/)


—
## 📌 프로젝트 개요

기존 방탈출 카페 예약 시스템의 단편성과 정보 부족 문제를 해결하고자 전국 방탈출 카페의 예약 가능 시간과 테마 정보를 통합 제공하는 웹/모바일 기반 예약 플랫폼을 개발했습니다.

- 실시간 예약 가능 여부 제공
- 조건 기반 테마 검색 구현
- 카카오톡 로그인 및 JWT 토큰 인증

—

## 🧩 주요 기능

### ✅ 카카오 로그인 연동
- 카카오 OAuth2.0 로그인 연동
- 로그인 후 JWT 토큰 로컬스토리지 저장 및 전역 상태 관리 (Recoil)
- 로그인 시 사용자 정보(닉네임, 프로필 이미지 등) 전역 반영
- 로그인 후 리디렉션 처리 및 사용자 정보 호출

### ✅ 테마 탐색 페이지
- 전체 테마 조회 및 필터링 기능 (지역, 난이도, 공포도, 활동성)
- React Query 기반 API 데이터 캐싱 및 비동기 처리
- 추천순 정렬 (리뷰 수 + 평점 가중치 반영)
- 반응형 UI 디자인 적용 (styled-components 사용)

### ✅ 리뷰 API
- 공포도, 활동성, 난이도, 평점 등 UI 인터랙션 구현

### ✅ 프론트 배포 및 운영
- **React + Vite 프로젝트 구성**
- **Netlify 기반** 자동 배포 파이프라인 구축
- 환경변수에 따른 API URL 분리 (개발/운영)

—

## 💡 사용 기술 스택

### 🧱 Frontend
- **React18**, React Router, Recoil
- **React Query** (데이터 패싱 및 캐싱)
- styled-components, Swiper
- Axios (커스텀 인스턴스 구성)

### ⚙️ 상태 및 인증 관리
- **Recoil** (로그인 상태 및 사용자 정보 관리)
- LocalStorage / SessionStorage 기반 토큰 관리
- React Interceptor 기반 JWT 자동 갱신 처리

### 🛠 배포 및 인프라
- **Netlify** (CI/CD 및 배포 자동화)

—

## 👥 팀 구성 및 역할

오세훈: 기획, 백엔드, 인프라, 프론트엔드, 디자인(UI)

김은진: 디자인 협업

임성빈: 프론트엔드 협업

김경진: 데이터 마이닝

이민규: 모바일 앱 개발

> 프로젝트에서 프론트엔드 개발 주도, **프론트엔드 영역, 배포, React, 인증 시스템, 90% 기여**

—

## 📞 문의
> 프론트 엔드 개발자 임성빈 · E-mail: bins506@gmail.com

—

본 프로젝트는 기술적 도전과 실용성을 함께 고려하여 기획/개발된 풀스택 서비스입니다. 현업에서 바로 활용 가능한 구조를 설계하고, 실제 예약/리뷰/동행이라는 사용자 시나리오를 기반으로 제작되었습니다.
