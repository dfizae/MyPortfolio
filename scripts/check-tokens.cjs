#!/usr/bin/env node
// 디자인 토큰 규칙 검사 (CLAUDE.md "디자인 규칙", docs/DESIGN.md §2.3)
//
//   node scripts/check-tokens.cjs              src/의 .ts·.tsx 전체 + DESIGN.md ↔ @theme + 허용 목록 정리 여부
//   node scripts/check-tokens.cjs <파일...>    지정한 파일만 (편집 직후 훅이 쓴다)
//
// 통과하면 한 줄만, 실패하면 위반만 출력한다(에이전트 토큰 절약).
// 테스트(src/tests/**)는 디자인 결정을 단언하느라 클래스 문자열을 담고 있어 검사하지 않는다(DESIGN.md §10).
const fs = require("fs");
const path = require("path");

process.chdir(path.join(__dirname, ".."));

const DESIGN = "docs/DESIGN.md";
const THEME_CSS = "src/styles/App.css";
const ALLOWLIST = "scripts/token-allowlist.json";

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_UTILS =
  "bg|text|border|border-[trblxy]|ring|ring-offset|outline|decoration|divide|fill|stroke|from|via|to|shadow|accent|caret|placeholder";

const CHECKS = [
  {
    name: "Tailwind 기본 팔레트",
    re: new RegExp(`(?<![\\w-])(?:${COLOR_UTILS})-(?:${PALETTE})-\\d{2,3}(?![\\w-])`, "g"),
    hint: "DESIGN.md §2.1 역할 토큰(canvas · surface · ink · ink-muted · brand · brand-ink · line · success)으로 바꾼다",
  },
  {
    name: "white·black 색 유틸리티",
    re: new RegExp(`(?<![\\w-])(?:${COLOR_UTILS})-(?:white|black)(?![\\w-])`, "g"),
    hint: "surface · ink · brand-ink 토큰으로 바꾼다",
  },
];

const COLOR_HINT = "새 색은 DESIGN.md에 먼저 추가 → @theme → 컴포넌트 순서로";
const SIZE_HINT = "기존 크기·간격 유틸리티를 재사용한다. 새 값은 DESIGN.md에 먼저";

// 대괄호 임의 값: `mt-[2rem]`, `-mt-[4px]`, `shadow-[0_4px_8px_#000]` 같은 유틸리티와 `[font-size:13px]` 같은 임의 속성.
// 값 안에 색이나 단위가 붙은 수가 있으면 잡는다. 단위 없는 값(`leading-[1.35]`, `z-[60]`, `aspect-[4/3]`)은 보지 않는다.
const ARBITRARY = /(?<![\w-])(?:-?[a-z][a-z0-9-]*-\[[^\]\s]+\]|\[[a-z-]+:[^\]\s]+\])/g;
const COLOR_IN_VALUE = /#[0-9a-fA-F]{3,8}(?![0-9a-zA-Z])|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\(/i;
const UNIT_IN_VALUE = /\d(?:px|r?em|%|[sdl]?v(?:h|w|i|b|min|max)|ch|ex|pt|ms|s)(?![a-z])/i;

// 문자열로 쓴 색: 인라인 style이나 JS 값의 '#ff0000', "rgb(10, 20, 30)"
const COLOR_STRING = /(['"`])\s*(?:#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?|oklab|oklch)\([^'"`]*\))\s*\1/g;

// 인라인 style={{ … }} 안의 고정 크기. 변수나 motion 값(`height: height`, `x: x`)은 숫자가 아니라서 걸리지 않는다.
const STYLE_OPEN = /style=\{\{/;
const STYLE_SIZE =
  /\b(?:fontSize|lineHeight|letterSpacing|gap|rowGap|columnGap|borderRadius|(?:padding|margin)(?:Top|Right|Bottom|Left|Inline|Block)?|(?:min|max)?(?:Width|Height)|width|height|top|right|bottom|left|inset)\s*:\s*(['"`]?)-?(\d+(?:\.\d+)?)(?:px|r?em|%|v[hw])?\1(?![\w.])/g;

const failures = [];
const fileArgs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const allow = readAllowlist();

if (fileArgs.length) {
  for (const f of fileArgs) {
    const rel = toRel(f);
    if (rel === THEME_CSS) checkTheme();
    else if (isScanned(rel) && fs.existsSync(rel)) scanFile(rel);
  }
} else {
  const files = listFiles("src").filter(isScanned);
  for (const f of files) scanFile(f);
  checkTheme();
  checkStaleAllowlist();
}

if (failures.length) {
  console.log(failures.join("\n"));
  console.log(`\n토큰 검사 실패: ${failures.length}건`);
  process.exit(1);
}
console.log(fileArgs.length ? "토큰 검사 통과" : "토큰 검사 통과 (src 코드, DESIGN.md ↔ @theme, 허용 목록)");

// ---------- 코드의 클래스 문자열 ----------
function scanFile(rel) {
  const lines = fs.readFileSync(rel, "utf8").split(/\r?\n/);
  const report = (i, match, name, hint) => {
    if (allow.some((a) => a.file === rel && a.match === match)) return;
    failures.push(`${rel}:${i + 1}  ${match}  — ${name}. ${hint}`);
  };
  let inStyle = false;
  lines.forEach((line, i) => {
    // 대괄호 값을 먼저 보고 그 자리를 비운다. 같은 글자를 아래 검사가 다시 세지 않게 하려는 것이다.
    let rest = line;
    for (const m of line.matchAll(ARBITRARY)) {
      const value = m[0].slice(m[0].indexOf("[") + 1, -1);
      if (COLOR_IN_VALUE.test(value)) report(i, m[0], "임의 색 값", COLOR_HINT);
      else if (UNIT_IN_VALUE.test(value)) report(i, m[0], "임의 크기 값", SIZE_HINT);
      rest = rest.replace(m[0], " ".repeat(m[0].length));
    }
    for (const c of CHECKS) {
      for (const m of rest.matchAll(c.re)) report(i, m[0], c.name, c.hint);
    }
    for (const m of rest.matchAll(COLOR_STRING)) report(i, m[0], "문자열로 쓴 색", COLOR_HINT);

    let seg = rest;
    if (STYLE_OPEN.test(seg)) {
      inStyle = true;
      seg = seg.slice(seg.search(STYLE_OPEN));
    }
    if (inStyle) {
      for (const m of seg.matchAll(STYLE_SIZE)) {
        if (Number(m[2]) !== 0) report(i, m[0], "인라인 style의 고정 크기", SIZE_HINT);
      }
      if (seg.includes("}}")) inStyle = false;
    }
  });
}

// ---------- DESIGN.md ↔ @theme ----------
// @theme의 모든 토큰은 DESIGN.md에 이름이 있어야 하고, 이름이 적힌 줄 가운데 하나에 같은 값이 있어야 한다.
// DESIGN.md가 단일 소스라서 값을 바꾸는 순서는 DESIGN.md → @theme 이다.
function checkTheme() {
  const css = fs.readFileSync(THEME_CSS, "utf8");
  const block = css.match(/@theme\s*\{([\s\S]*?)\}/);
  if (!block) {
    failures.push(`${THEME_CSS}: @theme 블록이 없다`);
    return;
  }
  const design = fs.readFileSync(DESIGN, "utf8").split(/\r?\n/);
  const body = block[1].replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    const [, name, raw] = m;
    const value = raw.trim();
    const lines = design.filter((l) => l.includes("`" + name + "`") || l.includes("(`" + name));
    if (!lines.length) {
      failures.push(`${THEME_CSS}  ${name}  — DESIGN.md에 없는 토큰. DESIGN.md에 먼저 적는다`);
      continue;
    }
    const norm = (s) => s.toLowerCase();
    if (!lines.some((l) => norm(l).includes(norm(value)))) {
      failures.push(`${THEME_CSS}  ${name}: ${value}  — DESIGN.md의 ${name} 줄과 값이 다르다`);
    }
  }
}

// ---------- 허용 목록 ----------
function readAllowlist() {
  if (!fs.existsSync(ALLOWLIST)) return [];
  try {
    return JSON.parse(fs.readFileSync(ALLOWLIST, "utf8")).allow ?? [];
  } catch {
    failures.push(`${ALLOWLIST}: JSON 파싱 오류`);
    return [];
  }
}

// 고쳐서 사라진 예외가 목록에 남으면 같은 값을 다시 써도 통과하므로 지우게 한다.
function checkStaleAllowlist() {
  for (const a of allow) {
    const text = fs.existsSync(a.file) ? fs.readFileSync(a.file, "utf8") : "";
    if (!text.includes(a.match)) failures.push(`${ALLOWLIST}  ${a.file} ${a.match}  — 코드에 더 이상 없다. 목록에서 지운다`);
  }
}

// ---------- 유틸 ----------
function isScanned(rel) {
  return rel.startsWith("src/") && !rel.startsWith("src/tests/") && /\.(ts|tsx)$/.test(rel);
}

function toRel(f) {
  return path.relative(process.cwd(), path.resolve(f)).split(path.sep).join("/");
}

function listFiles(dir) {
  const out = [];
  const walk = (cur) => {
    for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, ent.name);
      if (ent.isDirectory()) walk(full);
      else out.push(full.split(path.sep).join("/"));
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out.sort();
}
