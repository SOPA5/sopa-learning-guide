# 사전 준비 — 필요한 도구 설치

GWS CLI를 쓰기 전에 먼저 준비해야 할 것들이 있어요. 요리를 시작하기 전에 재료와 도구를 준비하는 것처럼요!

:::info 준비물 체크리스트
- [x] Node.js (v18 이상) — **필수**
- [x] Google Cloud 프로젝트 — **필수**
- [ ] gcloud CLI — 선택 (인증 자동화에 사용)
- [ ] Claude Code — 선택 (AI 연동 실습에 사용)
:::

---

## 1. Node.js 설치 (필수)

GWS CLI는 Node.js 위에서 동작하는 도구예요. Node.js는 **자바스크립트를 실행하는 엔진**이라고 생각하면 됩니다.

> 비유: Node.js는 GWS CLI가 달리는 **도로**예요. 도로가 없으면 자동차가 달릴 수 없듯이, Node.js가 없으면 GWS CLI가 실행될 수 없어요.

:::warning 중요
Node.js **v18 이상**이 필요합니다. 그보다 낮은 버전이면 GWS CLI가 제대로 동작하지 않아요.
:::

::: code-group

```bash [Mac]
# Homebrew로 설치 (추천)
brew install node

# 또는 공식 사이트에서 다운로드
# https://nodejs.org/ko 에서 LTS 버전 다운로드
```

```powershell [Windows]
# 공식 사이트에서 다운로드
# https://nodejs.org/ko 에서 LTS 버전 다운로드 후 인스톨러 실행

# 또는 winget으로 설치
winget install OpenJS.NodeJS.LTS
```

:::

### 설치 확인

설치가 끝났으면 터미널(Mac) 또는 PowerShell(Windows)을 열고 아래 명령어를 입력해보세요:

```bash
node --version
# 예: v20.11.0 ← v18 이상이면 OK!

npm --version
# 예: 10.2.4
```

:::tip
npm은 Node.js를 설치하면 자동으로 함께 설치됩니다. npm은 Node.js 패키지(프로그램)를 설치할 때 쓰는 도구예요. 비유하면 **앱스토어** 같은 거예요!
:::

:::danger 버전이 v18 미만이라면?
이미 Node.js가 설치되어 있지만 버전이 낮다면, 위 설치 과정을 다시 진행하세요. 기존 버전 위에 덮어씌워 설치됩니다.
:::

---

## 2. Google Cloud 프로젝트 준비 (필수)

GWS CLI가 여러분의 구글 계정에 접근하려면, 구글에게 "이 앱이 접근해도 괜찮아요"라고 알려줘야 해요. 이게 바로 **Google Cloud 프로젝트**입니다.

> 비유: 구글한테 우리 앱의 **이름표(명찰)를 만들어주는 것**이에요. 회사에 방문할 때 방문증을 받는 것처럼, GWS CLI도 구글 서비스를 이용하려면 명찰이 필요해요.

### 프로젝트 만드는 방법

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 상단의 프로젝트 선택 드롭다운 클릭
3. **"새 프로젝트"** 클릭
4. 프로젝트 이름 입력 (예: `my-gws-cli`)
5. **"만들기"** 클릭

### API 활성화

프로젝트를 만들었으면, GWS CLI가 사용할 API들을 켜줘야 해요:

1. Google Cloud Console에서 **"API 및 서비스"** → **"라이브러리"** 클릭
2. 아래 API들을 검색해서 각각 **"사용"** 버튼 클릭:
   - Google Drive API
   - Gmail API
   - Google Calendar API
   - Google Sheets API
   - Google Docs API

:::tip
API를 켜는 건 마치 **구글에게 "이 기능 쓸게요!"라고 신고하는 것**이에요. 신고하지 않으면 해당 기능을 쓸 수 없어요.
:::

:::warning 주의
Google Cloud 프로젝트는 **무료**로 만들 수 있어요. 하지만 결제 계정 연결을 요구하는 경우가 있어요. GWS CLI 사용 자체는 무료 할당량 내에서 충분히 가능합니다.
:::

---

## 3. gcloud CLI 설치 (선택)

gcloud CLI는 Google Cloud를 터미널에서 관리하는 도구예요. GWS CLI의 인증 설정을 **자동으로** 해주는 `gws auth setup` 명령을 쓰려면 필요합니다.

> 없어도 수동으로 인증 설정이 가능하니, 설치가 어렵다면 건너뛰어도 괜찮아요!

::: code-group

```bash [Mac]
# Homebrew로 설치 (추천)
brew install google-cloud-sdk

# 설치 확인
gcloud --version
```

```powershell [Windows]
# 공식 인스톨러 다운로드
# https://cloud.google.com/sdk/docs/install 에서 Windows용 인스톨러 다운로드

# 또는 winget으로 설치
winget install Google.CloudSDK

# 설치 확인
gcloud --version
```

:::

설치 후 초기 설정:

```bash
gcloud init
# 브라우저가 열리면 구글 계정으로 로그인
# 프로젝트 선택 → 위에서 만든 프로젝트 선택
```

---

## 4. Claude Code 설치 (선택)

Claude Code는 터미널에서 AI 비서를 부르는 도구예요. GWS CLI와 함께 사용하면 **자연어로 구글 워크스페이스를 제어**할 수 있습니다.

> 비유: AI 비서를 터미널에 부르는 것이에요. "내 이메일 중 오늘 온 거 보여줘"라고 말하면, AI가 알아서 GWS CLI 명령을 실행해줘요.

```bash
npm install -g @anthropic-ai/claude-code
```

설치 확인:

```bash
claude --version
```

:::warning Anthropic API 키 필요
Claude Code를 사용하려면 Anthropic API 키가 필요합니다. [Anthropic Console](https://console.anthropic.com/)에서 API 키를 발급받으세요.
:::

---

## 다음 단계

모든 준비가 끝났으면, 이제 [GWS CLI를 설치](/gws-cli/installation)하러 가볼까요!

:::details 체크리스트로 최종 확인
아래 명령어들이 모두 정상적으로 결과가 나오는지 확인하세요:

```bash
# 1. Node.js 확인 (v18 이상)
node --version

# 2. npm 확인
npm --version

# 3. (선택) gcloud 확인
gcloud --version

# 4. (선택) Claude Code 확인
claude --version
```
:::
