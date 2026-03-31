# 실습 — 직접 써보기

드디어 실습 시간이에요! 이제부터 GWS CLI로 실제 구글 워크스페이스를 다뤄봅시다.

> 각 실습은 **목표 → 명령어 → 결과 확인 → 응용** 순서로 진행됩니다. 차근차근 따라해보세요!

:::warning 시작 전 확인
아래 명령어가 정상적으로 실행되는지 먼저 확인하세요:
```bash
gws --version        # GWS CLI 설치 확인
gws auth status      # 인증 상태 확인
```
인증이 안 되어 있다면, [인증 설정하기](/gws-cli/authentication)를 먼저 완료하세요.
:::

---

## 5-1. 드라이브 파일 조회하기

> 비유: **구글 드라이브 서랍 열어보기** 📂

### 목표
내 구글 드라이브에 어떤 파일이 있는지 터미널에서 확인해보기

### 명령어

```bash
gws drive files list --params '{"pageSize": 5}'
```

이 명령어는 구글 드라이브에서 **최근 파일 5개**를 보여줘요.

:::tip 명령어 뜯어보기
| 부분 | 의미 |
|------|------|
| `gws` | GWS CLI 실행 |
| `drive` | 구글 드라이브 서비스 선택 |
| `files list` | 파일 목록 조회 |
| `--params '{"pageSize": 5}'` | "5개만 보여줘" 옵션 |
:::

### 결과 확인

아래와 같은 형태로 파일 목록이 나옵니다:

```json
{
  "files": [
    {
      "id": "1abc...",
      "name": "회의록.docx",
      "mimeType": "application/vnd.google-apps.document"
    },
    ...
  ]
}
```

### 응용해보기

```bash
# 특정 이름이 포함된 파일 검색
gws drive files list --params '{"q": "name contains '\''보고서'\''", "pageSize": 10}'

# 폴더만 검색
gws drive files list --params '{"q": "mimeType = '\''application/vnd.google-apps.folder'\''", "pageSize": 5}'

# 최근 수정된 파일 순으로 정렬
gws drive files list --params '{"orderBy": "modifiedTime desc", "pageSize": 5}'
```

:::warning Windows PowerShell 사용자
PowerShell에서는 따옴표 처리가 다릅니다. 작은따옴표 안의 JSON을 이스케이프해야 해요:
```powershell
gws drive files list --params '{\"pageSize\": 5}'
```
자세한 내용은 [FAQ](/gws-cli/faq)를 참고하세요.
:::

---

## 5-2. 이메일 보내기

> 비유: **터미널에서 편지 보내기** ✉️

### 목표
터미널에서 이메일을 보내보기

### 명령어

```bash
gws gmail +send --to test@example.com --subject '테스트 메일' --body '안녕하세요! GWS CLI로 보낸 첫 번째 이메일입니다.'
```

:::danger 주의!
`test@example.com`을 **실제 본인 이메일 주소**로 바꿔서 테스트하세요. 모르는 사람에게 보내지 마세요!
:::

:::tip `+send`에서 `+`는 뭔가요?
`+`가 붙은 명령어는 GWS CLI의 **스킬(Skill)** 명령이에요. 기본 API 명령어를 더 쉽게 쓸 수 있도록 만든 단축 명령어라고 생각하면 돼요. 마치 전화기의 **단축 다이얼** 같은 거예요!
:::

### 결과 확인

명령이 성공하면 이메일이 발송되고, 발송된 메시지의 ID가 표시됩니다. 실제로 이메일함을 열어서 도착했는지 확인해보세요!

### 응용해보기

```bash
# 여러 명에게 보내기
gws gmail +send --to user1@example.com,user2@example.com --subject '공지' --body '회의가 변경되었습니다.'

# 받은 편지함 확인하기
gws gmail +inbox

# 최근 이메일 5개 보기
gws gmail +inbox --limit 5
```

---

## 5-3. 오늘 일정 보기

> 비유: **비서한테 오늘 스케줄 물어보기** 📅

### 목표
오늘의 캘린더 일정을 터미널에서 확인해보기

### 명령어

```bash
# 다가오는 일정 보기
gws calendar +agenda

# 오늘 일정만 보기
gws calendar +agenda --today
```

### 결과 확인

오늘의 일정이 시간순으로 정리되어 나타납니다:

```
📅 오늘의 일정 (2024-01-15)
──────────────────────────
09:00 - 10:00  팀 스탠드업 미팅
14:00 - 15:00  프로젝트 리뷰
17:00 - 17:30  1:1 면담
```

### 응용해보기

```bash
# 이번 주 일정 보기
gws calendar +agenda --week

# 새 일정 만들기
gws calendar +create --title '점심 약속' --start '2024-01-20T12:00:00' --end '2024-01-20T13:00:00'

# 특정 캘린더의 일정 보기
gws calendar +agenda --calendar 'work@example.com'
```

:::tip 일정 관리 팁
매일 아침 터미널을 열면 `gws calendar +agenda --today`를 실행하는 습관을 들이면, 오늘 뭘 해야 하는지 한눈에 파악할 수 있어요!
:::

---

## 5-4. 스프레드시트 다루기

> 비유: **엑셀 파일을 터미널로 편집하기** 📊

### 목표
구글 스프레드시트의 데이터를 읽고 추가해보기

### 사전 준비

먼저 테스트할 스프레드시트의 ID가 필요해요. 구글 시트 URL에서 ID를 찾을 수 있습니다:

```
https://docs.google.com/spreadsheets/d/여기가_스프레드시트_ID/edit
```

:::tip 스프레드시트 ID 찾는 법
구글 시트를 열면 주소창에 긴 URL이 보여요. `/d/` 다음부터 `/edit` 앞까지가 스프레드시트 ID예요. 예를 들어:
- URL: `https://docs.google.com/spreadsheets/d/1AbC2dEf3GhI/edit`
- ID: `1AbC2dEf3GhI`
:::

### 명령어 — 데이터 읽기

```bash
# 스프레드시트 내용 읽기
gws sheets +read --spreadsheet SPREADSHEET_ID
```

`SPREADSHEET_ID`를 실제 ID로 바꿔서 실행하세요.

### 명령어 — 데이터 추가하기

```bash
# 스프레드시트에 새 행 추가
gws sheets +append --spreadsheet SPREADSHEET_ID --values 'Alice,95'
```

이 명령어는 스프레드시트의 마지막 행 아래에 `Alice`와 `95`를 추가해요.

### 결과 확인

스프레드시트를 브라우저에서 열어서 데이터가 추가됐는지 확인해보세요!

### 응용해보기

```bash
# 특정 범위만 읽기
gws sheets +read --spreadsheet SPREADSHEET_ID --range 'Sheet1!A1:C10'

# 여러 값 한번에 추가
gws sheets +append --spreadsheet SPREADSHEET_ID --values 'Bob,88'
gws sheets +append --spreadsheet SPREADSHEET_ID --values 'Charlie,92'

# 특정 셀 업데이트
gws sheets +update --spreadsheet SPREADSHEET_ID --range 'A1' --values '이름,점수'
```

---

## 5-5. Claude Code와 함께 실습

> 이 섹션이 핵심이에요! AI와 GWS CLI를 함께 쓰면 어떤 일이 벌어지는지 경험해봅시다.

### Claude Code에서 GWS 사용하기

Claude Code는 GWS CLI를 **도구(tool)**로 인식해서, 자연어 요청을 GWS CLI 명령어로 변환해줍니다.

```bash
# Claude Code 실행
claude

# 그리고 자연어로 요청하기
> 내 구글 드라이브에서 최근 파일 5개 보여줘
```

Claude Code가 알아서 `gws drive files list --params '{"pageSize": 5}'`를 실행하고, 결과를 보기 좋게 정리해줍니다.

### 더 다양한 요청 예시

```
> 오늘 캘린더 일정 알려줘
> 어제 받은 중요한 이메일 요약해줘
> '프로젝트 보고서'라는 이름의 구글 시트에서 데이터 읽어줘
> 팀원들에게 회의 일정 변경 메일 보내줘
```

### AI 에이전트가 GWS를 도구로 활용하는 원리

:::info AI + GWS CLI의 작동 원리
1. 여러분이 자연어로 요청 → "오늘 일정 보여줘"
2. AI가 요청을 분석 → "캘린더 조회가 필요하구나"
3. AI가 GWS CLI 명령어 생성 → `gws calendar +agenda --today`
4. GWS CLI가 구글 API 호출 → 구글 서버에서 데이터 가져옴
5. AI가 결과를 정리해서 보여줌 → "오늘 회의가 3개 있어요..."

마치 **통역사**가 여러분의 말을 구글이 이해하는 언어로 번역해주는 것과 같아요!
:::

### GWS 스킬 설치하기

Claude Code에 GWS 스킬을 설치하면 더 자연스럽게 사용할 수 있어요:

```bash
# Claude Code에서 GWS 스킬 설치
claude install-skill gws
```

스킬이 설치되면 Claude Code가 GWS CLI의 100개 이상의 명령어를 자동으로 인식하고 활용할 수 있습니다.

---

## 실습 마무리

:::tip 여기까지 따라온 여러분, 대단해요!
이제 여러분은 터미널에서 구글 드라이브, 지메일, 캘린더, 시트를 자유롭게 다룰 수 있게 됐어요. 그리고 AI와 함께 쓰면 자연어로도 이 모든 걸 할 수 있다는 것도 경험했습니다!
:::

다음으로, 이 기능들을 **실무에서 어떻게 활용**할 수 있는지 알아볼까요?

[실전 활용 사례](/gws-cli/use-cases)에서 다양한 워크플로우를 확인해보세요!
