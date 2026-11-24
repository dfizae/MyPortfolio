#!/usr/bin/env node
// 하네스 무결성 검사: 미러 동기화, JSON 유효성, 스킬 잠금, 규칙·스킬 frontmatter, 진입점 연결, 문서가 가리키는 경로
//
//   node scripts/check-harness.cjs            통과하면 한 줄, 실패하면 실패한 항목만 출력 (에이전트 토큰 절약)
//   node scripts/check-harness.cjs --verbose  항목별 결과를 모두 출력
//
// 셸 대신 node로 실행해 Windows와 macOS에서 같은 결과를 낸다.
const fs = require("fs");
const path = require("path");

process.chdir(path.join(__dirname, ".."));
const VERBOSE = process.argv.includes("--verbose");

// ---------- 결과 수집 ----------
const sections = [];
let current = null;
function section(title) {
  current = { title, lines: [], failed: false };
  sections.push(current);
}
function log(line) {
  current.lines.push(line);
}
function fail(line) {
  current.failed = true;
  if (line) current.lines.push(line);
}

/** 디렉터리 아래 모든 파일의 상대 경로 목록 (정렬) */
function listFiles(dir) {
  const out = [];
  const walk = (cur) => {
    for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, ent.name);
      if (ent.isDirectory()) walk(full);
      else out.push(path.relative(dir, full).split(path.sep).join("/"));
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out.sort();
}

/** 한쪽에만 있거나 내용이 다른 파일 목록. 줄바꿈(CRLF/LF) 차이는 같은 것으로 본다 */
function diffDirs(a, b) {
  const read = (p) => fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
  const fa = listFiles(a);
  const fb = new Set(listFiles(b));
  const problems = [];
  for (const f of fa) {
    if (!fb.has(f)) problems.push(`Only in ${a}: ${f}`);
    else if (read(path.join(a, f)) !== read(path.join(b, f))) problems.push(`Files ${a}/${f} and ${b}/${f} differ`);
  }
  const sa = new Set(fa);
  for (const f of fb) if (!sa.has(f)) problems.push(`Only in ${b}: ${f}`);
  return problems;
}

function frontmatter(file) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  if (lines[0] !== "---") return null;
  const end = lines.indexOf("---", 1);
  return end === -1 ? null : lines.slice(1, end);
}

// ---------- 검사 ----------
for (const d of ["rules", "skills"]) {
  section(`.agents/${d} ↔ .claude/${d}`);
  const problems = diffDirs(`.agents/${d}`, `.claude/${d}`);
  if (problems.length === 0) log("  OK");
  else {
    fail("  FAIL: 미러 불일치 (npm run harness:sync)");
    for (const p of problems.slice(0, 20)) log(`  ${p}`);
    if (problems.length > 20) log(`  … 외 ${problems.length - 20}건`);
  }
}

section("JSON 파싱");
for (const f of [".claude/settings.json", "skills-lock.json", "scripts/token-allowlist.json"]) {
  if (!fs.existsSync(f)) {
    if (f === ".claude/settings.json") log(`  -- ${f} 없음(훅·권한을 쓰지 않는 상태)`);
    else fail(`  FAIL: ${f} 없음`);
    continue;
  }
  try {
    JSON.parse(fs.readFileSync(f, "utf8"));
    log(`  OK ${f}`);
  } catch {
    fail(`  FAIL: ${f} 파싱 오류`);
  }
}

section("skills-lock.json 이 모든 스킬을 추적하는지");
{
  let lock = {};
  try {
    lock = JSON.parse(fs.readFileSync("skills-lock.json", "utf8"));
  } catch {
    fail("  FAIL: skills-lock.json 파싱 오류");
  }
  const skills = fs.existsSync(".agents/skills")
    ? fs
        .readdirSync(".agents/skills", { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort()
    : [];
  for (const name of skills) {
    if (lock.skills && lock.skills[name]) log(`  OK ${name}`);
    else fail(`  FAIL: skills-lock.json 에 ${name} 없음`);
  }
  for (const name of Object.keys(lock.skills ?? {})) {
    if (!skills.includes(name)) fail(`  FAIL: skills-lock.json 에만 있는 스킬 ${name} (폴더 없음)`);
  }
  if (!current.failed) log(`  OK 스킬 ${skills.length}개`);
}

section("규칙 frontmatter(paths)");
{
  const rules = fs.existsSync(".agents/rules") ? fs.readdirSync(".agents/rules").filter((f) => f.endsWith(".md")).sort() : [];
  for (const f of rules) {
    const fm = frontmatter(`.agents/rules/${f}`);
    if (!fm || !fm.some((l) => l.startsWith("paths:"))) fail(`  FAIL: .agents/rules/${f} 에 paths frontmatter 없음`);
    if (!/^\d{2}-[a-z0-9-]+\.md$/.test(f)) fail(`  FAIL: .agents/rules/${f} 이름은 NN-topic.md 로 쓴다`);
  }
  if (!current.failed) log(`  OK 규칙 ${rules.length}개`);
}

section("스킬 frontmatter(name = 폴더 이름, description)");
{
  const dirs = fs.existsSync(".agents/skills")
    ? fs.readdirSync(".agents/skills", { withFileTypes: true }).filter((e) => e.isDirectory())
    : [];
  for (const d of dirs) {
    const file = `.agents/skills/${d.name}/SKILL.md`;
    if (!fs.existsSync(file)) {
      fail(`  FAIL: ${file} 없음`);
      continue;
    }
    const fm = frontmatter(file) ?? [];
    const name = (fm.find((l) => l.startsWith("name:")) ?? "").replace("name:", "").trim();
    if (name !== d.name) fail(`  FAIL: ${file} 의 name(${name || "없음"})이 폴더 이름과 다르다`);
    if (!fm.some((l) => l.startsWith("description:"))) fail(`  FAIL: ${file} 에 description 없음`);
  }
  if (!current.failed) log(`  OK 스킬 ${dirs.length}개`);
}

section("진입점 연결 (CLAUDE.md → AGENTS.md)");
// AGENTS.md가 있으면 Claude Code가 함께 읽도록 CLAUDE.md가 불러와야 한다.
if (!fs.existsSync("AGENTS.md")) log("  -- AGENTS.md 없음");
else if (!/^@AGENTS\.md\s*$/m.test(fs.readFileSync("CLAUDE.md", "utf8"))) fail("  FAIL: CLAUDE.md 에 @AGENTS.md 줄이 없다");
else log("  OK");

section("하네스 문서가 가리키는 경로가 있는지");
{
  // 백틱 안의 저장소 경로만 본다. <slug> 같은 자리표시자, 글롭, 생성 파일(+types)은 건너뛴다.
  const docs = ["AGENTS.md", "docs/harness.md", ...listFiles(".agents").map((f) => `.agents/${f}`)].filter((f) =>
    f.endsWith(".md") && fs.existsSync(f),
  );
  const PATH = /^(?:\.agents|\.claude|src|docs|content|scripts|public)\/[^\s`*<>{}|]*$/;
  const missing = [];
  let count = 0;
  for (const doc of docs) {
    for (const m of fs.readFileSync(doc, "utf8").matchAll(/`([^`\n]+)`/g)) {
      const p = m[1].trim();
      if (!PATH.test(p) || p.includes("+types")) continue;
      count++;
      if (!fs.existsSync(p.replace(/\/$/, ""))) missing.push(`${doc}: ${p}`);
    }
  }
  if (missing.length) {
    fail(`  FAIL: 없는 경로 ${missing.length}개 — 문서를 고치거나 파일 위치를 확인한다`);
    for (const s of missing.slice(0, 20)) log(`    ${s}`);
  } else log(`  OK 경로 ${count}개`);
}

// ---------- 출력 ----------
const failed = sections.filter((s) => s.failed);
if (VERBOSE || failed.length) {
  for (const s of VERBOSE ? sections : failed) {
    console.log(`▶ ${s.title}${s.failed ? "  ✗" : ""}`);
    for (const l of s.lines) console.log(l);
  }
  console.log();
}
if (failed.length) {
  console.log(`하네스 검사 실패: ${failed.length}/${sections.length}개 항목 (${failed.map((s) => s.title).join(" · ")})`);
  process.exit(1);
}
console.log(`하네스 검사 통과 (${sections.length}개 항목)`);
