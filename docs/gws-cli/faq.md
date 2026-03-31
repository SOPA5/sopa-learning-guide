# FAQ & 트러블슈팅

GWS CLI를 사용하다 보면 여러 가지 에러를 만날 수 있어요. 걱정 마세요! 여기에 자주 나오는 문제와 해결 방법을 모두 정리해놨습니다.

---

## 자주 묻는 질문

### GWS CLI는 무료인가요?

:::info 답변
네! GWS CLI 자체는 무료 오픈소스 도구입니다. 다만, 구글 API에는 일일 사용량 제한(쿼터)이 있어요. 개인 사용 수준에서는 거의 제한에 걸리지 않습니다.
:::

### 회사 구글 계정(Google Workspace)에서도 쓸 수 있나요?

:::info 답변
네, 사용할 수 있어요. 다만 회사 IT 관리자가 외부 앱 접근을 제한한 경우에는 관리자의 승인이 필요할 수 있습니다.
:::

### 인증 토큰은 어디에 저장되나요?

:::info 답변
기본적으로 `~/.config/gws/` 디렉토리에 저장됩니다. 이 폴더에는 OAuth 자격 증명과 토큰이 포함되어 있으니, 다른 사람과 공유하지 마세요!
:::

---

## 에러별 해결 가이드

### "Access blocked" 에러

```
Error 403: access_denied
The developer hasn't given you access to this app.
```

:::danger 원인
OAuth 동의 화면에서 **테스트 사용자를 등록하지 않았을 때** 발생합니다.
:::

**해결 방법:**

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **"API 및 서비스"** → **"OAuth 동의 화면"** 이동
3. **"테스트 사용자"** 섹션에서 **"+ ADD USERS"** 클릭
4. 사용하는 구글 이메일 주소 입력
5. 저장 후, 다시 로그인:

```bash
gws auth login
```

---

### "permission_denied" 에러

```
Error: Request had insufficient authentication scopes.
```

:::warning 원인
로그인할 때 필요한 **스코프(권한)를 포함하지 않았을 때** 발생합니다. 예를 들어, Gmail 스코프 없이 이메일을 보내려고 하면 이 에러가 나요.
:::

**해결 방법:**

필요한 스코프를 추가해서 다시 로그인하세요:

```bash
# 필요한 스코프를 모두 포함해서 재로그인
gws auth login -s drive,gmail,sheets,calendar
```

:::tip 어떤 스코프가 필요한지 모르겠다면?
사용하려는 서비스에 따라 아래 스코프를 참고하세요:

| 서비스 | 스코프 |
|--------|--------|
| Google Drive | `drive` |
| Gmail | `gmail` |
| Google Calendar | `calendar` |
| Google Sheets | `sheets` |
| Google Docs | `docs` |
| Google Chat | `chat` |
:::

---

### "invalid_auth" / 토큰 만료 에러

```
Error: invalid_grant
Token has been expired or revoked.
```

:::warning 원인
인증 토큰이 **만료되거나 취소**된 경우입니다. OAuth 토큰은 일정 기간이 지나면 만료돼요.
:::

**해결 방법:**

다시 로그인하면 새 토큰이 발급됩니다:

```bash
gws auth login
```

---

### "invalid_client" 에러

```
Error: invalid_client
The OAuth client was not found.
```

:::danger 원인
`client_secret.json` 파일이 없거나, 잘못된 위치에 있을 때 발생합니다.
:::

**해결 방법:**

1. Google Cloud Console에서 자격 증명을 다시 다운로드
2. 올바른 위치에 배치:

::: code-group

```bash [Mac / Linux]
# 파일 확인
ls ~/.config/gws/client_secret.json

# 없다면 다시 복사
mv ~/Downloads/client_secret_*.json ~/.config/gws/client_secret.json
```

```powershell [Windows]
# 파일 확인
dir "$env:USERPROFILE\.config\gws\client_secret.json"

# 없다면 다시 복사
Move-Item "$env:USERPROFILE\Downloads\client_secret_*.json" "$env:USERPROFILE\.config\gws\client_secret.json"
```

:::

---

### "quota_exceeded" 에러

```
Error: Rate Limit Exceeded
```

:::warning 원인
구글 API의 일일 사용량 제한을 초과했을 때 발생합니다.
:::

**해결 방법:**

- 잠시 기다렸다가 다시 시도하세요 (보통 몇 분 후 리셋)
- 대량 작업의 경우 요청 사이에 간격을 두세요
- Google Cloud Console에서 쿼터를 확인하고, 필요하면 상향 요청할 수 있어요

---

## Windows PowerShell 따옴표 처리

Windows PowerShell에서는 따옴표 처리가 Mac/Linux의 bash와 다릅니다.

### 문제 상황

```powershell
# 이 명령은 PowerShell에서 에러가 날 수 있어요
gws drive files list --params '{"pageSize": 5}'
```

### 해결 방법

::: code-group

```powershell [방법 1: 이스케이프 문자 사용]
gws drive files list --params '{\"pageSize\": 5}'
```

```powershell [방법 2: 큰따옴표로 감싸기]
gws drive files list --params "{`"pageSize`": 5}"
```

```powershell [방법 3: 변수에 담아서 사용]
$params = '{"pageSize": 5}'
gws drive files list --params $params
```

:::

:::tip 추천
PowerShell 대신 **Windows Terminal의 Git Bash**를 사용하면 Mac/Linux와 동일한 명령어를 쓸 수 있어요!
:::

---

## 종료 코드 설명

GWS CLI 명령어가 끝나면 **종료 코드(exit code)**를 반환해요. 이 코드로 명령이 성공했는지, 어떤 에러가 났는지 알 수 있습니다:

| 종료 코드 | 의미 | 설명 |
|-----------|------|------|
| **0** | 성공 | 명령이 정상적으로 실행됨 |
| **1** | API 에러 | 구글 API에서 에러 응답이 옴 (권한 부족, 리소스 없음 등) |
| **2** | 인증 에러 | 인증 토큰이 만료되었거나 유효하지 않음 |
| **3** | 검증 에러 | 명령어 형식이 잘못되었거나 필수 옵션이 빠짐 |

종료 코드 확인하는 방법:

::: code-group

```bash [Mac / Linux (bash/zsh)]
gws drive files list --params '{"pageSize": 1}'
echo $?
# 0이면 성공!
```

```powershell [Windows (PowerShell)]
gws drive files list --params '{\"pageSize\": 1}'
echo $LASTEXITCODE
# 0이면 성공!
```

:::

---

## 도움말 보기

GWS CLI의 내장 도움말을 활용하면 명령어를 더 자세히 알 수 있어요:

```bash
# GWS CLI 전체 도움말
gws --help

# 특정 서비스 도움말
gws drive --help
gws gmail --help
gws calendar --help
gws sheets --help

# 특정 명령어의 상세 도움말
gws drive files --help
gws drive files list --help

# 사용 가능한 스킬 목록
gws skills list
```

:::tip 도움말이 최고의 치트시트
뭔가 막히면 `--help`를 붙여보세요. 사용법, 옵션, 예시를 모두 볼 수 있어요. 비유하면, 게임에서 **튜토리얼**을 다시 보는 것과 같아요!
:::

---

## 아직 해결이 안 된다면?

:::info 도움받을 수 있는 곳
- **GWS CLI GitHub Issues**: 버그 리포트나 기능 요청
- **Stack Overflow**: `google-workspace-cli` 태그로 질문
- **지피터스 커뮤니티**: 실습반장 SOPA에게 질문하기
:::

---

[← 실전 활용 사례로 돌아가기](/gws-cli/use-cases) | [소개 페이지로 가기](/gws-cli/intro)
