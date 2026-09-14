# WebSocket/STOMP Debug Console

## 1. 목적 / Purpose
### KO
- 브라우저에서 WebSocket/STOMP 연결, 구독, 전송, 로그 확인을 빠르게 검증하는 내부 QA/운영 도구입니다.
- 특정 서비스 전용이 아니라 여러 실시간 채널을 재사용 가능한 방식으로 점검하는 데 목적이 있습니다.

### EN
- This is an internal QA/operations tool for quickly testing WebSocket/STOMP connection, subscription, sending, and log output in a browser.
- It is designed as a reusable debugging console for multiple real-time channels, not just one service.

## 2. 어떤 환경에서 쓰는가 / Target Environment
### KO
- 정적 HTML을 브라우저에서 열 수 있는 환경
- 로컬 개발 환경 또는 사내 테스트 환경
- WebSocket endpoint 또는 STOMP endpoint 접근이 가능한 네트워크
- Python 3 또는 간단한 정적 파일 서버를 실행할 수 있는 환경

### EN
- Any environment where a static HTML page can be served in a browser
- Local development or internal QA environment
- A network that can reach the target WebSocket or STOMP endpoint
- An environment that can run Python 3 or another simple static file server

## 3. 무엇을 지원하는가 / Supported Features
### KO
- broker URL 입력
- protocol mode 선택(STOMP / Raw WebSocket)
- WebSocket / SockJS transport 선택
- reconnect delay 설정
- connect headers JSON 입력
- topic subscribe / unsubscribe
- destination + headers + body send
- debug / message / websocket error / stomp error 로그 출력
- preset localStorage 저장 / 불러오기 / 삭제

### EN
- Broker URL input
- Protocol mode selection (STOMP / Raw WebSocket)
- WebSocket / SockJS transport selection
- Reconnect delay
- Connect headers JSON input
- Topic subscribe / unsubscribe
- Destination + headers + body send
- Debug / message / websocket error / stomp error logs
- Preset save / load / delete using localStorage

## 4. 어떻게 실행하는가 / How To Run
### KO
1. 이 폴더로 이동합니다.
```bash
cd tmp/_local/tools/websocket-tester
```

2. 정적 서버를 실행합니다.
```bash
python3 -m http.server 3000
```

3. 브라우저에서 아래 주소 중 하나로 접속합니다.
- `http://localhost:3000/index.html` : 언어 선택 페이지
- `http://localhost:3000/index-ko.html` : 한글 버전
- `http://localhost:3000/index-en.html` : 영어 버전

### EN
1. Move to this directory.
```bash
cd tmp/_local/tools/websocket-tester
```

2. Start a static file server.
```bash
python3 -m http.server 3000
```

3. Open one of the following pages in your browser.
- `http://localhost:3000/index.html` : language selector
- `http://localhost:3000/index-ko.html` : Korean version
- `http://localhost:3000/index-en.html` : English version

## 5. 왜 `file://`가 아니라 정적 서버가 필요한가 / Why Not `file://`
### KO
- 많은 WebSocket 서버는 허용 origin을 제한합니다.
- HTML 파일을 직접 열면 브라우저 origin이 `file://` 또는 `null`이 되어 연결이 거절될 수 있습니다.
- `http://localhost:3000` 같은 정적 서버로 열면, origin이 정상적인 HTTP 주소가 되어 테스트하기 쉬워집니다.

### EN
- Many WebSocket servers restrict allowed origins.
- If you open the HTML file directly, the browser origin becomes `file://` or `null`, and the handshake may be rejected.
- Serving the page through `http://localhost:3000` gives it a normal HTTP origin and makes testing easier.

## 6. 기본 사용 흐름 / Basic Usage Flow
### KO
1. `broker URL` 입력
2. `protocol mode` 선택
2. 필요 시 `connect headers(JSON)` 입력
3. `connect` 클릭
4. `topic` 입력 후 `subscribe`
5. 필요 시 `destination`, `headers`, `body` 입력 후 `send`
6. 오른쪽 로그 패널에서 debug / message / error 확인
7. 자주 쓰는 조합은 preset으로 저장

### EN
1. Enter the `broker URL`
2. Select the `protocol mode`
3. Add `connect headers(JSON)` if needed
4. Click `connect`
5. Enter a `topic` and click `subscribe`
6. If needed, enter `destination`, `headers`, and `body`, then click `send`
7. Check debug / message / error logs in the log panel
8. Save reusable combinations as presets

## 7. 현황판 테스트 예시 / Panel Status Board Example
### KO
- broker URL: `ws://localhost:5001/ws`
- protocol mode: `STOMP`
- transport: `WebSocket`
- topic: `/topic/panel/status-board/202604060001`

### EN
- Broker URL: `ws://localhost:5001/ws`
- Protocol mode: `STOMP`
- Transport: `WebSocket`
- Topic: `/topic/panel/status-board/202604060001`

## 8. Raw WebSocket 모드 설명 / Raw WebSocket Mode
### KO
- Raw mode는 STOMP 프레임 없이 WebSocket 문자열 메시지를 직접 주고받는 용도입니다.
- Raw WebSocket에는 `subscribe` / `destination` 같은 표준 개념이 없습니다.
- 그래서 raw mode에서는:
  - `connect`는 순수 WebSocket 연결
  - `send`는 body 문자열을 그대로 송신
  - `subscribe` / `unsubscribe`는 안내용 메시지를 출력
- 서버가 구독 메시지를 별도 규약으로 요구하면, 그 메시지를 `send body`에 직접 입력해서 보내야 합니다.

### EN
- Raw mode is for sending and receiving plain WebSocket messages without STOMP framing.
- Raw WebSocket has no standard `subscribe` or `destination` concept.
- In raw mode:
  - `connect` opens a plain WebSocket connection
  - `send` transmits the body as-is
  - `subscribe` / `unsubscribe` only show guidance messages
- If your server expects a custom subscription message, send it manually through the `send body` field.

## 9. 제한 사항 / Limitations
### KO
- 현재 버전은 브라우저 수동 테스트용 MVP입니다.
- 다중 topic 동시 구독, JSON pretty print, preset export/import는 아직 미구현입니다.
- CDN으로 `sockjs-client`, `@stomp/stompjs`를 로드합니다.
- 사내망/폐쇄망에서 CDN 접근이 막히면 로컬 번들로 교체해야 합니다.

### EN
- The current version is an MVP for manual browser-based testing.
- Multi-topic subscriptions, JSON pretty printing, and preset export/import are not implemented yet.
- It loads `sockjs-client` and `@stomp/stompjs` from a CDN.
- If your internal network blocks CDN access, replace them with local bundles.
