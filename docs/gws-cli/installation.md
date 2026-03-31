# GWS CLI 설치하기

사전 준비가 끝났으면, 이제 주인공인 **GWS CLI**를 설치할 차례예요!

> 비유: 재료(Node.js)와 주방(Google Cloud 프로젝트)은 준비됐으니, 이제 **요리 도구(GWS CLI)를 꺼내는** 단계입니다.

---

## npm으로 설치하기 (Windows / Mac 공통)

가장 간단한 설치 방법입니다. 터미널에 아래 명령어 한 줄만 입력하면 돼요:

```bash
npm install -g @googleworkspace/cli
```

:::tip `-g`가 뭔가요?
`-g`는 **global**(전역)의 약자예요. 이걸 붙이면 컴퓨터 어디서든 `gws` 명령어를 사용할 수 있어요. 마치 앱을 설치하면 바탕화면 어디서든 실행할 수 있는 것처럼요!
:::

---

## Homebrew로 설치하기 (Mac 전용)

Mac 사용자라면 Homebrew를 이용해서 설치할 수도 있어요:

```bash
brew install googleworkspace-cli
```

---

## 설치 확인

설치가 잘 됐는지 확인해볼까요?

```bash
gws --version
```

아래처럼 버전 번호가 나오면 성공입니다:

```
@googleworkspace/cli/1.x.x
```

:::info 축하해요!
버전 번호가 보인다면, GWS CLI 설치가 완료된 거예요! 🎉
:::

---

## 자주 나오는 에러와 해결법

설치 과정에서 에러가 나올 수 있어요. 당황하지 마세요! 대부분 흔한 문제이고, 아래에서 해결 방법을 찾을 수 있어요.

### 에러 1: 권한 에러 (EACCES)

```
npm ERR! Error: EACCES: permission denied
```

:::danger 이 에러가 나온다면
npm이 전역 패키지를 설치할 권한이 없다는 뜻이에요.
:::

::: code-group

```bash [Mac — 방법 1: sudo 사용]
# 비밀번호를 입력하면 관리자 권한으로 설치됩니다
sudo npm install -g @googleworkspace/cli
```

```bash [Mac — 방법 2: npm 경로 변경 (추천)]
# npm 전역 디렉토리를 사용자 폴더로 변경
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'

# 환경변수 추가 (~/.zshrc 또는 ~/.bashrc에 추가)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# 다시 설치
npm install -g @googleworkspace/cli
```

```powershell [Windows]
# PowerShell을 관리자 권한으로 실행한 후 설치
# 시작 메뉴 → PowerShell 우클릭 → "관리자 권한으로 실행"
npm install -g @googleworkspace/cli
```

:::

### 에러 2: npm을 찾을 수 없음

```
'npm' is not recognized as an internal or external command
```

또는

```
zsh: command not found: npm
```

:::warning 해결 방법
Node.js가 제대로 설치되지 않았거나, 터미널을 다시 시작해야 할 수 있어요.

1. 터미널(또는 PowerShell)을 **완전히 종료**하고 다시 열기
2. `node --version`으로 Node.js가 설치됐는지 확인
3. 안 된다면 [사전 준비](/gws-cli/prerequisites)로 돌아가서 Node.js를 다시 설치하세요
:::

### 에러 3: 네트워크 에러

```
npm ERR! network request to https://registry.npmjs.org/ failed
```

:::warning 해결 방법
인터넷 연결을 확인하세요. 회사 네트워크에서 프록시를 사용하는 경우:

```bash
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port
```
:::

### 에러 4: Node.js 버전이 너무 낮음

```
npm ERR! engine Unsupported engine
```

:::danger 해결 방법
Node.js v18 이상이 필요합니다. `node --version`으로 확인하고, 버전이 낮다면 [사전 준비](/gws-cli/prerequisites)에서 Node.js를 업데이트하세요.
:::

---

## 설치 완료! 다음은?

GWS CLI 설치가 끝났어요! 하지만 아직 한 단계가 남았어요. GWS CLI가 여러분의 구글 계정에 접근할 수 있도록 **인증 설정**을 해줘야 합니다.

[인증 설정하기](/gws-cli/authentication)로 이동해서 마저 설정해볼까요!
