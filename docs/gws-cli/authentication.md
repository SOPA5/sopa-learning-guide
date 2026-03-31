# 인증 설정하기

GWS CLI를 설치했으니, 이제 **구글 계정과 연결**해줘야 해요. 이 과정을 "인증(Authentication)"이라고 합니다.

> 비유: GWS CLI에게 **구글 계정 열쇠를 건네주는** 과정이에요. 열쇠 없이는 집(구글 서비스)에 들어갈 수 없으니까요!

---

## 방법 1: gcloud로 자동 셋업 (추천)

[사전 준비](/gws-cli/prerequisites)에서 gcloud CLI를 설치했다면, 이 방법이 가장 간편해요.

> 비유: 구글에 **명함 내밀고 인사하기**. 명함(gcloud)을 보여주면 자동으로 출입증을 발급해줘요!

### 1단계: 자동 셋업 실행

```bash
gws auth setup
```

이 명령어를 실행하면:
1. Google Cloud 프로젝트에 OAuth 동의 화면을 자동 생성
2. 필요한 자격 증명(credentials)을 자동 생성
3. 설정 파일을 자동으로 저장

### 2단계: 로그인 (스코프 지정)

셋업이 끝나면, 어떤 구글 서비스에 접근할지 **스코프(scope)**를 지정해서 로그인해요:

```bash
gws auth login -s drive,gmail,sheets,calendar
```

:::tip 스코프(scope)가 뭔가요?
스코프는 **접근 권한의 범위**예요. "드라이브만 볼게요" 또는 "이메일도 보고, 캘린더도 볼게요"처럼, 어떤 서비스에 접근할 건지 정하는 거예요. 비유하면 아파트 출입카드인데, 1층만 갈 수 있는 카드가 있고, 모든 층을 갈 수 있는 카드가 있는 것처럼요.
:::

브라우저가 열리면:
1. 구글 계정으로 로그인
2. "허용" 버튼 클릭
3. 터미널에 "인증 성공" 메시지 확인

---

## 방법 2: 수동 OAuth 설정

gcloud CLI가 없거나, 수동으로 설정하고 싶을 때 사용하는 방법이에요.

### 1단계: OAuth 동의 화면 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. **"API 및 서비스"** → **"OAuth 동의 화면"** 클릭
3. 사용자 유형: **"외부"** 선택 → **"만들기"** 클릭
4. 앱 정보 입력:
   - 앱 이름: `GWS CLI` (원하는 이름)
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
5. **"저장 후 계속"** 클릭

### 2단계: 스코프 추가

1. "스코프 추가 또는 삭제" 클릭
2. 아래 스코프들을 검색해서 추가:
   - `https://www.googleapis.com/auth/drive`
   - `https://www.googleapis.com/auth/gmail.modify`
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/spreadsheets`
3. **"저장 후 계속"** 클릭

### 3단계: 테스트 사용자 등록

:::danger 이 단계를 빼먹으면 "Access blocked" 에러가 나요!
OAuth 앱이 "테스트 모드"일 때는, **테스트 사용자로 등록된 구글 계정만** 사용할 수 있어요.
:::

1. "테스트 사용자" 섹션에서 **"+ ADD USERS"** 클릭
2. 본인의 구글 이메일 주소 입력
3. **"저장"** 클릭

### 4단계: 자격 증명(Credentials) 만들기

1. **"API 및 서비스"** → **"사용자 인증 정보"** 클릭
2. 상단의 **"+ 사용자 인증 정보 만들기"** → **"OAuth 클라이언트 ID"** 클릭
3. 애플리케이션 유형: **"데스크톱 앱"** 선택
4. 이름: `GWS CLI Client` (원하는 이름)
5. **"만들기"** 클릭
6. **"JSON 다운로드"** 버튼 클릭 → `client_secret_xxxx.json` 파일 저장

### 5단계: 자격 증명 파일 배치

다운로드한 JSON 파일을 GWS CLI가 찾을 수 있는 위치에 놓아야 해요:

::: code-group

```bash [Mac / Linux]
# 설정 폴더 생성
mkdir -p ~/.config/gws

# 다운로드한 파일을 이동 (파일 이름은 다를 수 있어요)
mv ~/Downloads/client_secret_*.json ~/.config/gws/client_secret.json
```

```powershell [Windows]
# 설정 폴더 생성
mkdir -Force "$env:USERPROFILE\.config\gws"

# 다운로드한 파일을 이동
Move-Item "$env:USERPROFILE\Downloads\client_secret_*.json" "$env:USERPROFILE\.config\gws\client_secret.json"
```

:::

### 6단계: GWS CLI로 로그인

```bash
gws auth login
```

브라우저가 열리면 구글 계정으로 로그인하고 권한을 허용해주세요.

---

## 인증 확인하기

인증이 잘 됐는지 간단히 확인해볼까요?

```bash
gws drive files list --params '{"pageSize": 1}'
```

구글 드라이브에 있는 파일 1개가 표시되면 **인증 성공**입니다! 🎉

:::danger 'Access blocked' 에러가 나온다면
가장 흔한 원인은 **테스트 사용자 등록을 안 한 것**이에요!
→ Google Cloud Console → OAuth 동의 화면 → 테스트 사용자 → 본인 이메일 추가
→ 그 다음 `gws auth login`으로 다시 로그인
:::

:::warning OAuth 테스트 모드 스코프 제한
OAuth 앱이 테스트 모드일 때는 스코프가 **약 25개로 제한**됩니다. 대부분의 GWS CLI 기능에는 충분하지만, 만약 특수한 API를 사용하려 할 때 제한에 걸릴 수 있어요. 그럴 땐 앱을 "프로덕션" 모드로 전환해야 합니다.
:::

---

## 다음 단계

인증 설정까지 완료! 이제 드디어 **실제로 GWS CLI를 사용**해볼 시간이에요!

[첫 번째 실습 — 직접 써보기](/gws-cli/hands-on)로 이동해서 다양한 기능을 체험해보세요!
