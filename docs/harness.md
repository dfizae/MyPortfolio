# 에이전트 하네스

이 저장소에서 AI 코딩 에이전트(Claude Code, Codex 등)가 일관되게 일하도록 만든 규칙 묶음의 설명이다. 에이전트의 진입점은 `CLAUDE.md`(프로젝트 정보)와 `AGENTS.md`(하네스 지침)이고, 이 문서는 사람이 구성을 파악하기 위한 요약이다.

- 출처: React Native 앱 프로젝트에서 쓰던 프론트엔드 하네스에서 웹에 맞는 부분만 골라 이 저장소에 맞게 고쳤다(2026-11-24). 그 하네스의 상류는 dfizae/reactNativeHaness `version-2` 브랜치다.
- 옮기지 않은 것과 이유
  - API 호출과 서버 상태(TanStack Query), 디자인 도구(Pencil) 값을 토큰으로 옮기기, 위치·사진·사용자 업로드, 네이티브 모듈, 백엔드 계약과 MSW 규칙: React Native 앱과 그 서버 전용
  - Pencil 디자인 스킬과 앱 화면 패턴 스킬: Pencil과 앱 화면 전용. 이 저장소용 스킬 3종으로 대신했다
  - 하네스 백업·복원 명령: 원래 하네스는 하네스 파일을 저장소 밖에 두는 경우가 있어 필요했다. 이 저장소는 하네스를 git으로 추적한다

## 구성

```text
AGENTS.md            # 하네스 지침 — 규칙·스킬 적용, 승인, 완료와 보고 (CLAUDE.md가 @AGENTS.md로 불러온다)
CLAUDE.md            # 프로젝트 정보 — 명령, 구조, 디자인·콘텐츠 규칙, 작업 관례
docs/DESIGN.md       # 디자인 값과 의도의 단일 소스
.agents/             # 하네스 정본 — rules/(00~60), skills/(3종)
.claude/             # Claude Code 미러(rules, skills) + settings.json(권한, 편집 직후 훅)
scripts/             # check-tokens · token-allowlist.json · sync-harness · check-harness · hooks/post-edit-check
skills-lock.json     # 스킬 출처 기록
```

## 명령

```bash
npm run tokens:check    # src 코드의 토큰 위반 + DESIGN.md ↔ @theme + 허용 목록 정리 여부
npm run harness:sync    # .agents → .claude 미러 동기화
npm run harness:check   # 미러, JSON, 스킬 잠금, 규칙·스킬 frontmatter, CLAUDE.md → AGENTS.md, 문서가 가리키는 경로
                        # 통과하면 한 줄, 실패하면 실패 항목만. --verbose로 전체 (npm run harness:check -- --verbose)
```

## 규칙 요약

| 파일 | 적용 경로 | 핵심 |
| --- | --- | --- |
| `00-baseline` | src, content, 빌드 설정 | 범위 준수, 기존 구조 우선, 토큰·문구 위치, 코드 품질 4기준 |
| `10-react-state` | 라우트, 화면, 공용 컴포넌트, 훅 | 상태 5분류(빌드 때 데이터·주소·폼·로컬 UI·파생), Hook 선택 |
| `20-routing-content` | routes, root, posts.server, 설정, content | 경로 등록, prerender, 빌드 멈춤 조건, 서버 전용 모듈 경계, frontmatter 변경 범위 |
| `30-typescript-structure` | src | strict, 생성 타입, 컨테이너·프레젠터, 파일 배치 표, 주석은 역할 한 줄과 "왜" |
| `40-styling-accessibility` | 화면, 공용 컴포넌트, styles | DESIGN.md 단일 소스, tokens:check와 허용 목록, 모션 재사용, 마크업·포커스·링크 |
| `50-error-security` | src, content, env | 오류 UX, 빈 상태, 공개 사이트 개인정보, VITE_ 변수, HTML 주입 범위 |
| `60-dependencies-tests` | package, 설정, 테스트 | npm 전용, 승인 대상, Vitest 범위와 형식 |

## 스킬

| 스킬 | 용도 |
| --- | --- |
| `portfolio-ui-patterns` | 화면 패턴과 완성 체크리스트. 읽을 DESIGN.md 절과 빠뜨리기 쉬운 상태를 정한다 |
| `new-page-route` | 새 주소를 더하는 순서와 `build/client` HTML·OG 확인 명령 |
| `post-check` | 사용자가 쓴 글의 배포 전 점검. 본문은 고치지 않는다 |

## 자동 검사

- **편집 직후 훅** (`.claude/settings.json` → `scripts/hooks/post-edit-check.cjs`, node로 실행). 훅은 Claude의 현재 작업 폴더에서 실행되므로, 스크립트는 `${CLAUDE_PROJECT_DIR}`(프로젝트 루트) 기준 경로로 부른다. `command` + `args` 형식이라 셸을 거치지 않아 경로의 공백이나 OS별 셸 차이에 영향받지 않는다
  - `.agents/` 편집 → `.claude/` 미러 동기화
  - `src/`의 `.ts`·`.tsx` 편집(테스트 제외) → 그 파일의 토큰 검사. 위반이 있으면 Claude에게 오류로 돌려준다
  - `src/styles/App.css` 편집 → DESIGN.md ↔ `@theme` 검사
- **토큰 검사가 잡는 것**: Tailwind 기본 팔레트 색 유틸리티, white·black 색 유틸리티, 대괄호 임의 값(`mt-[2rem]`, `shadow-[0_4px_8px_#000]`, `[font-size:13px]`) 안의 색과 단위가 붙은 수, `'#ff0000'`처럼 문자열로 쓴 색, 인라인 `style={{ }}` 안의 고정 크기(`fontSize: 13`). 단위 없는 값(`leading-[1.35]`, `z-[60]`)과 `style` 밖 객체의 숫자는 보지 않는다. `@theme`의 토큰마다 DESIGN.md에 같은 이름과 값이 적혀 있는지. 테스트 파일은 디자인 결정을 단언하느라 클래스 문자열을 담고 있어 제외한다.
- **허용 목록** (`scripts/token-allowlist.json`): 하네스를 들일 때 이미 있던 임의 px 2곳만 이유와 함께 둔다. 코드에서 사라지면 검사가 목록에서 지우라고 알린다.
- CI 워크플로는 없다. 푸시 전 검증은 로컬 명령으로 한다.
- 공유 `settings.json`에는 어느 PC에서나 이름이 같은 권한(검증 명령, IDE 진단)만 둔다. Figma처럼 연결 방식에 따라 PC나 계정마다 도구 이름이 달라지는 MCP 권한은 PC마다 같은 `.claude` 폴더의 `settings.local.json`(git 무시)에 둔다. 읽기 도구는 허용하고 쓰기 도구(`use_figma`, `create_new_file`, `add_code_connect_map`, `upload_assets`)는 매번 묻는다.

## 하네스 유지보수

- 규칙은 `.agents/rules/<NN>-<주제>.md`에 `paths` frontmatter와 함께 쓰고 `npm run harness:sync`로 미러를 갱신한다.
- 스킬을 더하면 `.agents/skills/<이름>/SKILL.md`(frontmatter `name`은 폴더 이름과 같게)를 만들고 `skills-lock.json`에 출처를 적는다.
- 프로젝트 고유 값은 `docs/DESIGN.md`와 `src/constants/`에 둔다. 규칙과 스킬에는 다루는 방식만 둔다.
- 문서에 경로를 적으면 `harness:check`가 그 경로가 있는지 확인한다. 파일을 옮기면 문서도 같이 고친다.
