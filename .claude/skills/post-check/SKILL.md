---
name: post-check
description: 사용자가 쓴 블로그 글(content/posts/*.md)을 배포 전에 점검한다. 파일 이름(주소), frontmatter, 제목 단계, 이미지·링크, 공개 사이트 개인정보, 빌드 결과(HTML, 제목, 설명)를 확인하고 결과만 보고한다. "글 점검해줘", "이 글 올려도 돼?", 글을 draft에서 공개로 바꾸기 전에 사용한다.
metadata:
  author: project
  version: "1.0.0"
---

# post-check

글 본문은 사용자가 쓴다. 이 스킬은 **점검만 하고 본문을 고치지 않는다.** 찾은 문제는 위치와 이유를 보고하고, 사용자가 고쳐 달라고 한 부분만 고친다.

세부 규칙은 `.agents/rules/20-routing-content.md`, 형식의 기준은 `content/posts/_template.md`, 검증 코드는 `src/utils/posts.server.ts`다.

## 점검 항목

1. **파일 이름 = 주소**: 영문 소문자, 숫자, 하이픈만. `_`로 시작하면 글로 읽지 않는다.
2. **frontmatter**
   - `title`, `summary`가 비어 있지 않다. `summary`는 목록 카드와 링크 미리보기(description, og:description)에 그대로 쓰이므로 한두 문장으로 끝난다.
   - `date`는 `YYYY-MM-DD`.
   - `category`는 `src/constants/Posts.ts`의 `POST_CATEGORIES` id 중 하나다.
   - `pinned`, `draft`는 `true`나 `false`. 배포하려면 `draft: false`. `pinned: true`는 홈 대표 글 후보다(최근 날짜 순 상한은 `PINNED_POST_COUNT`).
3. **제목 단계**: 글 제목이 h1로 그려지므로 본문 제목은 `##`(h2)부터 쓴다. 글 본문 스타일은 h2, h3까지 정해져 있다(DESIGN.md §3.3).
4. **이미지와 링크**
   - 이미지 경로가 `public/` 아래에 실제로 있고, 대체 텍스트가 있다.
   - 외부 링크는 주소 형식만 확인한다. 열어서 확인하지 못했으면 `TBD`로 적는다.
5. **공개 사이트 개인정보**: 생년월일, 거주지, 가리지 않은 연락처 번호가 없다(DESIGN.md §9 2026-10-12). 토큰, 키, 내부 주소가 코드 블록에 남아 있지 않다.
6. **빌드 결과** — `npm run build` 뒤 확인한다. `draft: true`인 글은 빌드에 없는 것이 정상이다.

```bash
npm run build
ls build/client/posts/<파일 이름>/index.html
grep -o '<title>[^<]*</title>' build/client/posts/<파일 이름>/index.html
grep -o '<meta name="description" content="[^"]*"' build/client/posts/<파일 이름>/index.html
```

   - `<title>`이 `<글 제목> | <이름>`, description이 `summary`와 같다.
   - frontmatter가 형식에 어긋나면 빌드가 `content/posts/<파일>: ...` 오류로 멈춘다. 그 문장을 그대로 보고한다.
7. **메뉴 변화**: 이 글로 분류의 글 수가 `minPostsForNav`에 닿으면 위쪽 메뉴에 그 분류가 새로 보인다. 그 사실을 알린다.

## 보고 형식

| 항목 | 결과 | 위치·내용 |
| --- | --- | --- |
| 파일 이름 | 통과 / 문제 / TBD | |
| frontmatter | | |
| 제목 단계 | | |
| 이미지·링크 | | |
| 개인정보 | | |
| 빌드 결과 | | |
| 메뉴 변화 | | |

- 맞춤법이나 문장 다듬기는 요청받았을 때만 제안으로 따로 적는다. 본문에 직접 반영하지 않는다.
