# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 작업할 때 참고할 정보를 제공합니다.

## 프로젝트 개요

이 프로젝트는 인터랙티브 음악 플레이어 기능이 있는 React + Vite 기반의 뮤지션 프로필/포트폴리오 웹사이트입니다. 아티스트 정보, 앨범 목록, 재생 컨트롤을 제공합니다.

**주요 기술 스택:**
- React 19 + Vite 8 (HMR 지원)
- Context API로 상태 관리
- CSS Modules로 스타일링
- GitHub Pages 배포 (`/my-profile-site/` 경로에서 서빙)

## 명령어

### 개발
```bash
npm run dev          # Vite 개발 서버 시작 (HMR 활성화)
npm run build        # 프로덕션 빌드 (dist/ 폴더에 출력)
npm run preview      # 로컬에서 프로덕션 빌드 미리보기
npm run lint         # ESLint 실행
```

### 배포
- `main` 브랜치에 푸시하면 GitHub Actions 워크플로우 자동 실행 (`.github/workflows/deploy.yml`)
- 자동으로 빌드하고 GitHub Pages에 배포 (`https://jw059.github.io/my-profile-site/`)

## 아키텍처

### 상태 관리: PlayerContext
- **위치**: `src/context/PlayerContext.jsx`
- **관리 대상**: 오디오 재생 상태 (재생목록, 현재 곡, 재생/일시정지, 시크, 볼륨)
- **메서드**: `playTrack()`, `togglePlay()`, `next()`, `prev()`, `seek()`, `setVolumeLevel()`
- **Hook**: `usePlayer()` - 플레이어 상태가 필요한 모든 컴포넌트에서 사용

**컴포넌트에서 사용 예:**
```jsx
const { currentTrack, isPlaying, togglePlay } = usePlayer();
```

### 컴포넌트 구조
```
src/components/
├── Nav.jsx              # 네비게이션 헤더
├── Hero.jsx             # 아티스트 정보 섹션
├── Discography.jsx      # 앨범 그리드
├── AlbumCard.jsx        # 개별 앨범 카드 (클릭 시 재생)
├── Player.jsx           # 재생 컨트롤 및 진행 바
├── Contact.jsx          # 연락처/소셜 링크 섹션
└── Footer.jsx           # 푸터
```

각 컴포넌트마다 대응하는 CSS Module이 있습니다 (`src/styles/ComponentName.module.css`).

### 데이터 구조
- **위치**: `src/data.js`
- **포함 내용**: 아티스트 정보, 앨범 배열, 연락처 정보
- **곡 객체**: `id`, `title`, `duration`, `audioSrc` 포함 (현재 `audioSrc`는 비어있음)
- **재생 활성화 방법**: 곡 객체의 `audioSrc` 필드에 오디오 파일 URL 추가

## GitHub Pages 설정

**중요**: `vite.config.js`에 `base: '/my-profile-site/'`가 설정되어 있습니다. 이는 프로젝트 저장소 배포 경로를 반영하기 위해 필요하며, GitHub Pages에서 에셋이 올바르게 로드되도록 합니다.

**사용자/조직 사이트로 배포하는 경우** (예: `username.github.io`), `base`를 `'/'`로 변경하세요.

## 일반적인 작업 흐름

### 아티스트/앨범 데이터 수정
1. `src/data.js` 편집하여 아티스트 이름, 소개, 앨범, 곡 정보 업데이트
2. 곡 객체의 `audioSrc` 필드에 오디오 파일 URL 추가
3. `main` 브랜치로 푸시 → 자동 배포

### 스타일 변경
- `src/styles/` 폴더의 해당 CSS Module 수정
- 컴포넌트에서는 다음과 같이 import: `import styles from './ComponentName.module.css'`
- 클래스 사용: `<div className={styles.className}>`

### 새로운 기능 추가
1. `src/components/` 폴더에 새 컴포넌트 생성
2. 필요하면 `src/styles/` 폴더에 CSS Module 생성
3. `App.jsx`는 이미 `<PlayerProvider>`로 감싸져 있으므로 어디서나 `usePlayer()` 훅 사용 가능
4. 컴포넌트를 `App.jsx`나 다른 컴포넌트에서 import하여 사용
