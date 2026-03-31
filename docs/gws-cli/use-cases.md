# 실전 활용 사례

GWS CLI의 기본 사용법을 익혔으니, 이제 **실무에서 바로 쓸 수 있는 워크플로우**를 소개할게요!

> 각 사례마다 "이런 상황에서 쓰세요" + 실제 명령어 예시를 포함했어요.

---

## 아침 스탠드업 자동 요약

:::tip 이런 상황에서 쓰세요
매일 아침 팀 스탠드업 회의 전에, 어제 한 일과 오늘 할 일을 자동으로 정리하고 싶을 때
:::

```bash
gws workflow +standup-report
```

### 이 명령어가 하는 일

1. **어제 보낸 이메일** 요약 → 어제 뭘 했는지 파악
2. **오늘 캘린더 일정** 조회 → 오늘 뭘 해야 하는지 파악
3. **최근 수정한 드라이브 파일** 목록 → 어떤 작업을 했는지 파악
4. 이 모든 걸 **깔끔한 리포트**로 정리

### 비유

> 출근하자마자 비서가 "어제는 이런 일을 하셨고, 오늘은 이런 일정이 있습니다"라고 브리핑해주는 것과 같아요!

### 수동으로 비슷하게 구현하기

```bash
# 오늘 일정 확인
gws calendar +agenda --today

# 어제 보낸 이메일 확인
gws gmail +sent --after yesterday --limit 10

# 최근 수정한 파일 확인
gws drive files list --params '{"orderBy": "modifiedTime desc", "pageSize": 5}'
```

---

## 이메일 → 할 일 변환

:::tip 이런 상황에서 쓰세요
받은 이메일 중 중요한 것들을 자동으로 할 일 목록으로 변환하고 싶을 때
:::

```bash
gws workflow +email-to-task
```

### 이 명령어가 하는 일

1. 최근 받은 이메일 중 **중요 표시된 것** 또는 **특정 키워드**가 포함된 것을 찾기
2. 이메일 내용에서 **할 일(Action Item)을 추출**
3. 구글 캘린더에 **할 일 이벤트로 등록** 또는 구글 시트에 기록

### 비유

> 우편함에 쌓인 편지를 열어보고, 중요한 내용만 골라서 **냉장고 메모판**에 붙여주는 것과 같아요!

### Claude Code와 함께 더 똑똑하게

```bash
# Claude Code에서 자연어로 요청
claude
> 오늘 받은 이메일 중에서 내가 해야 할 일이 있는 것들을 정리해줘
```

AI가 이메일 내용을 분석해서 할 일을 자동으로 추출해줍니다.

---

## 주간 다이제스트

:::tip 이런 상황에서 쓰세요
매주 금요일, 이번 주에 무슨 일이 있었는지 자동으로 요약 보고서를 만들고 싶을 때
:::

```bash
gws workflow +weekly-digest
```

### 이 명령어가 하는 일

1. 이번 주에 **주고받은 이메일** 요약
2. 이번 주 **캘린더 일정** 리뷰
3. 이번 주 **수정/생성한 파일** 목록
4. 모든 내용을 **주간 보고서 형태**로 정리

### 비유

> 일주일 동안 촬영한 영상을 자동으로 편집해서 **주간 하이라이트 영상**으로 만들어주는 것과 같아요!

### 수동으로 비슷하게 구현하기

```bash
# 이번 주 일정 리뷰
gws calendar +agenda --week

# 이번 주 받은 이메일
gws gmail +inbox --after "7 days ago" --limit 20

# 이번 주 수정한 파일
gws drive files list --params '{"orderBy": "modifiedTime desc", "pageSize": 20}'
```

---

## 파일 공유 자동 알림

:::tip 이런 상황에서 쓰세요
구글 드라이브에 새 파일을 공유했을 때, 자동으로 관련자에게 알림 이메일을 보내고 싶을 때
:::

```bash
gws workflow +file-announce
```

### 이 명령어가 하는 일

1. 지정한 드라이브 폴더를 **모니터링**
2. 새 파일이 추가되면 **자동 감지**
3. 미리 설정한 수신자에게 **알림 이메일 발송**

### 비유

> 우체통에 새 편지가 들어오면 자동으로 "편지 왔어요!"라고 **문자를 보내주는 시스템**과 같아요!

### 직접 구현해보기

```bash
# 특정 폴더의 최신 파일 확인
gws drive files list --params '{"q": "'\''FOLDER_ID'\'' in parents", "orderBy": "createdTime desc", "pageSize": 3}'

# 파일을 다른 사람과 공유
gws drive +share --file FILE_ID --email colleague@example.com --role reader

# 공유 알림 이메일 보내기
gws gmail +send --to colleague@example.com --subject '새 파일 공유됨' --body '프로젝트 폴더에 새 파일이 추가되었습니다. 확인해주세요!'
```

---

## AI 에이전트 연동

:::tip 이런 상황에서 쓰세요
GWS CLI를 AI 에이전트의 도구로 활용해서, 자연어만으로 복잡한 구글 워크스페이스 작업을 처리하고 싶을 때
:::

### Claude Code에서 GWS 스킬 활용

GWS CLI에 포함된 **100개 이상의 스킬**을 Claude Code에서 바로 사용할 수 있어요:

```bash
# Claude Code 실행 후
claude

# 복잡한 작업도 자연어로 한 번에
> 이번 주 캘린더에서 회의가 3개 이상인 날을 찾고,
> 그 날의 회의 참석자들에게 "회의 준비 자료 확인해주세요"라는
> 이메일을 보내줘
```

### 활용 시나리오

```bash
# 시나리오 1: 이메일 기반 자동 응답
> 읽지 않은 이메일 중 견적 요청이 있으면 알려줘

# 시나리오 2: 캘린더 + 드라이브 연동
> 내일 회의에 필요한 파일을 드라이브에서 찾아서 참석자들에게 공유해줘

# 시나리오 3: 데이터 수집 자동화
> 팀원들의 주간 보고서 시트에서 이번 주 데이터를 모아서 요약해줘
```

### 스킬 목록 확인하기

사용 가능한 모든 스킬을 확인하려면:

```bash
gws skills list
```

---

## 나만의 워크플로우 만들기

:::info 위 사례들을 조합하면 나만의 워크플로우를 만들 수 있어요!

예를 들어, **"월요일 아침 루틴"** 워크플로우:
1. 이번 주 일정 확인 → `gws calendar +agenda --week`
2. 읽지 않은 중요 이메일 확인 → `gws gmail +inbox --unread --important`
3. 지난주 공유받은 파일 확인 → `gws drive files list --params '{"orderBy": "modifiedTime desc"}'`

이 모든 걸 **하나의 쉘 스크립트**로 만들어두면, 매주 월요일 아침에 명령어 하나로 실행할 수 있어요!
:::

```bash
#!/bin/bash
# monday-morning.sh — 월요일 아침 루틴

echo "📅 이번 주 일정"
echo "===================="
gws calendar +agenda --week

echo ""
echo "📧 읽지 않은 중요 이메일"
echo "===================="
gws gmail +inbox --unread --important --limit 10

echo ""
echo "📁 최근 공유받은 파일"
echo "===================="
gws drive files list --params '{"orderBy": "modifiedTime desc", "pageSize": 5}'
```

---

다음으로, GWS CLI를 사용하면서 **자주 만나는 문제와 해결 방법**을 알아볼까요?

[FAQ & 트러블슈팅](/gws-cli/faq)에서 확인하세요!
