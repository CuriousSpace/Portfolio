# 경 력 기 술 서

**성명**: 윤기수 (YUN KISOO)  
**연락처**: +82 10-8215-5781 | **이메일**: silverromance@hanmail.net  
**GitHub**: [github.com/CuriousSpace](https://github.com/CuriousSpace) | **Portfolio**: [curiousspace.github.io/Portfolio/index_ko.html](https://curiousspace.github.io/Portfolio/index_ko.html)

---

## 1. 핵심 역량 요약 (Executive Summary)
- **백엔드 & 분산 시스템 7년 6개월**: 국내 3년 5개월 및 일본 오사카 4년 1개월 간 엔터프라이즈 미션 크리티컬 시스템과 B2B SaaS 백엔드 코어 전담.
- **Java 21 / Spring Boot 3.4 & AWS**: 클라우드 아키텍처(AWS SAA 보유) 기반 고가용성 API 설계 및 모니터링 체계 구축.
- **대용량 쿼리 최적화**: 복합 인덱스 및 시간대별 버킷팅을 통한 대시보드 지연시간 **95% 단축 (2,000ms+ → 80ms)**.
- **캐싱 및 장애 격리**: Caffeine 로컬 캐시 적용으로 외부 API 호출 **80% 절감**, Transactional Outbox 알림 분리로 장애 전파 원천 차단.
- **멀티 테넌시 권한 엔진**: 3계층(발주처-시공사-협력사) 조직 데이터 분리 리졸버 개발 및 페이징 정합성 **100% 보장**.
- **인프라 가용성 방어**: CloudWatch 스토리지 I/O 분석 및 2GB Linux Swap 파티션 증설로 **OOM 서버 다운 0건** 달성.
- **레거시 현대화 및 무결성 검증**: COBOL 및 Delphi 기간계 시스템의 C# Web 전환 및 계산 오차 0건 검증.
- **개발자 생산성 도구 내재화**: 독립형 WebSocket/STOMP 디버거 콘솔 및 Python 자동화 파이프라인 자체 제작.
- **글로벌 협업 역량**: 일본 현지 4년 근무 및 비즈니스 일본어(JLPT N1), 텍스트/문서 기반 영어 비동기 협업 가능.

---

## 2. 보유 기술 스택 (Technical Toolkit)
- **Backend Core**: Java 21, Spring Boot 3.4, Spring Security, C# (.NET Core, WinForms), PHP (Laravel)
- **Data & ORM**: MariaDB, MySQL, PostgreSQL, Google BigQuery, Spring Data JPA, QueryDSL, MyBatis
- **Real-Time & Cache**: Caffeine Cache, Spring WebSocket (STOMP), SockJS, FCM, Naver Cloud SENS
- **Cloud & DevOps**: AWS (EC2, RDS, S3, CloudFront, Athena, CloudWatch, EB), Docker, Nginx, GitHub Actions
- **Automation & Tools**: Python (Pandas, Openpyxl, Virtualenv), Linux Shell Script, WebSocket Debug Console, Local MCP Server

---

## 3. 상세 경력 기술서 (Work Experience & Projects)

### 1. (주)강남앤인코누스 (2025.09 ~ 현재 재직 중)
- **소속/직급**: 기업부설연구소 / 전임연구원 (백엔드 리드)
- **근무지**: 부산

#### [프로젝트] LH 스마트 안전관제 B2B SaaS 플랫폼 v2 백엔드 및 인프라 구축
- **기간**: 2025.09 ~ 현재
- **기술스택**: Java 21, Spring Boot 3.4, MariaDB, JPA, QueryDSL, MyBatis, Caffeine, AWS (SAA)
- **주요 업무 및 성과**:
  - **데이터 레이어 트리플 하이브리드 영속성 설계**: Spring Data JPA(단순 CRUD 및 도메인 엔티티), QueryDSL(다중 조건 동적 필터링), MyBatis(대용량 집계 통계)로 역할을 분리하여 생산성과 성능을 동시 확보.
  - **대시보드 대용량 로그 집계 쿼리 최적화**: 수천 건의 당일 생체 측정 원시 로그 풀스캔 병목을 DB 복합 인덱스(`workplace_id`, `measure_date`, `status`) 및 시간대별 버킷팅 MyBatis 쿼리로 재설계하여 로딩 지연을 **2,000ms+에서 80ms로 95% 단축**.
  - **기상청 공공 API 전환 및 Caffeine 인메모리 캐싱**: 기존 유료 해외 날씨 API를 대한민국 기상청 공공 API로 100% 자체 전환하고, 격자 좌표 기반 10~30분 TTL Caffeine Local Cache를 적용하여 **외부 호출 80% 이상 절감 및 지연시간 5ms 이내 달성**.
  - **3계층 멀티 테넌시 권한 격리 엔진(ReadScopeResolver) 개발**: 발주처(LH) > 원도급 시공사 > 하도급 협력사 간 엄격한 데이터 격리 리졸버를 설계하고, 목록과 카운트(`totalCount`) 쿼리에 인가된 조직 코드를 강제 주입하여 **페이징 정합성 100% 보장**.
  - **Transactional Outbox Pattern 기반 비동기 알림 장애 격리**: 위험 알림(FCM, 알림톡, STOMP)을 Outbox 테이블에 먼저 영속화한 후 비동기 워커가 전송하도록 분리하여, 외부 통신 장애 시 메인 트랜잭션 롤백 결함 원천 차단.
  - **AWS 인프라 비용 절감 및 무중단 가용성 방어**: 프론트엔드 EC2 인스턴스 다운 원인을 CloudWatch 스토리지 I/O 지연으로 인한 OOM으로 규명하고, 2GB Linux Swap 파티션 증설로 **서버 다운 0건 달성**. 미사용 EB 환경 7개 및 Route53 레코드를 영구 삭제하여 고정 클라우드 비용 절감.
  - **위치기반서비스(LBS) 사업자 인허가 보안 요건 충족**: 개인위치정보(GPS 위경도) DB 저장 시 **AES-256 암호화 파이프라인** 구축 및 관리자 접근사실 자동 감사 로깅 구현.
  - **개발 생산성 도구 자체 구축**: 프론트엔드 개발 일정에 종속되지 않고 백엔드 실시간 소켓 채널, 헤더, 페이로드를 즉시 검증할 수 있는 독립형 **'WebSocket/STOMP 디버그 콘솔'** 웹 툴 자체 개발 및 다중 저장소 탐색용 **로컬 MCP 서버** 구축.

---

### 2. (주)스마트소셜 (2023.05 ~ 2025.08, 2년 4개월)
- **소속/직급**: 서비스기획개발팀 / 선임 (대리)
- **근무지**: 부산

#### [프로젝트 1] 다문화 학생 진학·진로 지원 플랫폼 구축 (da2um.kr)
- **기술스택**: PHP (Laravel), AWS, MySQL, I18n Pipeline
- 하드코딩된 언어별 블레이드 템플릿 구조를 단일 템플릿 동적 렌더링 엔진으로 개편.
- 엑셀 번역 데이터 기반 자동 바인딩 파이프라인을 구축하여 다국어 페이지 유지보수 및 확장 공수를 **약 90% 절감**.

#### [프로젝트 2] 대학 AIDX / LINC 3.0 공유협업 플랫폼 운영 및 보안 패치
- **기술스택**: PHP (Laravel), Spring Boot, Python, Pandas, Openpyxl, MySQL, AWS
- 상위 대학 보안 점검으로 차단된 한양여대 SSO Spring Boot 중계서버 포트를 신속히 파악하여 대체 포트 할당 및 HTTPS/TLS 보안 통신 긴급 복구.
- Bastion SSH 포트포워딩 환경에서 Python(venv, Pandas, Openpyxl) 기반 운영 DB 스키마 자동 추출 스크립트 제작.
- 수작업 등록으로 인한 데이터 오류를 방지하기 위해 대량 엑셀 데이터 DB 자동 적재 스크립트(`readExcel`) 자체 구축 운영.
- Canva, Slack Enterprise API 등 서드파티 도구 도입 사전 기술 타당성 및 라이선스 비용 분석, 일일 프로덕션 헬스체크 프로세스 운용.

---

### 3. AXAS 주식회사 (일본 오사카, 2019.04 ~ 2023.04, 4년 1개월)
- **소속/직급**: 제2엔지니어링부 / 사원 (SE)
- **근무지**: 일본 오사카

#### [프로젝트 1] 철도 역무원 내부 시스템 및 금속공업 공정관리 레거시 현대화
- **기술스택**: C# (.NET Core, WinForms), Delphi, COBOL, Oracle
- **철도 역무원 시스템**: COBOL 기반 레거시 비즈니스 로직을 리버스 엔지니어링하여 C# WinForms 아키텍처로 리뉴얼 개발.
- **금속공업 공정관리 시스템**: Delphi 기반 온프레미스 프로그램을 사내 인트라넷 C# 웹 시스템으로 마이그레이션하여 업무 접근성 대폭 개선.
- 기존 프로시저 기반 DAT 파일 배치 입출력 루틴을 모던 C# 함수 기반 구조로 안전 전환.
- 단계별 테스트 사양서 수립 및 회귀 테스트 체계를 확립하여 전환 전후 비즈니스 로직 계산 오차 **0건(무결성 100%)** 달성.

#### [프로젝트 2] 전국 대형 가전양판점 유통 데이터 파이프라인 쿼리 튜닝
- **기술스택**: PostgreSQL, Google BigQuery, C++, PHP
- 트랜잭션 DB(PostgreSQL)와 분석 플랫폼(Google BigQuery) 쿼리 실행계획(Execution Plan) 분석.
- 비효율적인 조인 및 풀스캔 구간을 제거하여 대용량 배치 데이터 처리 및 조회 성능 최적화.

---

## 4. 자격증 및 학력 (Certifications & Education)
- **AWS Certified Solutions Architect – Associate (SAA)** | AWS (2025.05)
- **AWS Certified Cloud Practitioner (CLF)** | AWS (2025.04)
- **일본어능력시험 JLPT N1급 합격** | 일본국제교류기금 (2025.08)
- **동의대학교 경영정보학과 학사 졸업** (2012.03 – 2019.02)
