import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SOPA의 학습가이드',
  description: '지피터스 실습반장 SOPA의 AI 도구 학습 가이드',
  lang: 'ko-KR',

  head: [
    ['meta', { name: 'theme-color', content: '#5b7bd5' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'SOPA의 학습가이드' }],
    ['meta', { name: 'og:description', content: '지피터스 실습반장 SOPA의 AI 도구 학습 가이드' }],
  ],

  themeConfig: {
    logo: '🎓',
    siteTitle: 'SOPA의 학습가이드',

    nav: [
      { text: '홈', link: '/' },
      { text: 'GWS CLI 가이드', link: '/gws-cli/intro' },
    ],

    sidebar: [
      {
        text: 'GWS CLI 가이드',
        items: [
          { text: '소개', link: '/gws-cli/intro' },
          { text: '사전 준비', link: '/gws-cli/prerequisites' },
          { text: '설치하기', link: '/gws-cli/installation' },
          { text: '인증 설정하기', link: '/gws-cli/authentication' },
          { text: '실습 — 직접 써보기', link: '/gws-cli/hands-on' },
          { text: '실전 활용 사례', link: '/gws-cli/use-cases' },
          { text: 'FAQ & 트러블슈팅', link: '/gws-cli/faq' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '검색',
            buttonAriaLabel: '검색',
          },
          modal: {
            displayDetails: '상세 목록 표시',
            resetButtonTitle: '검색 초기화',
            backButtonTitle: '검색 닫기',
            noResultsText: '검색 결과 없음',
            footer: {
              selectText: '선택',
              navigateText: '탐색',
              closeText: '닫기',
            },
          },
        },
      },
    },

    outline: {
      label: '목차',
      level: [2, 3],
    },

    docFooter: {
      prev: '이전 페이지',
      next: '다음 페이지',
    },

    lastUpdated: {
      text: '최종 수정일',
    },

    darkModeSwitchLabel: '다크 모드',
    lightModeSwitchTitle: '라이트 모드로 전환',
    darkModeSwitchTitle: '다크 모드로 전환',
    sidebarMenuLabel: '메뉴',
    returnToTopLabel: '맨 위로',
  },
})
