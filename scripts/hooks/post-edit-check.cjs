#!/usr/bin/env node
// Claude Code PostToolUse 훅 (Edit|Write|MultiEdit). stdin으로 훅 JSON을 받는다.
// - .agents/ 편집 → .claude/ 미러 동기화
// - src/의 .ts·.tsx 편집(테스트 제외) → 그 파일의 토큰 검사
// - src/styles/App.css 편집 → DESIGN.md ↔ @theme 검사
// 검사에 걸리면 exit 2로 Claude에게 위반 내용을 돌려준다.
// bash 대신 node로 써서 Windows(Git Bash·WSL 여부와 무관)와 macOS에서 같게 동작한다.
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
let input = "";
process.stdin.on("data", (d) => (input += d)).on("end", main);

function main() {
  let file = "";
  try {
    const j = JSON.parse(input);
    file = j.tool_input?.file_path || j.tool_response?.filePath || "";
  } catch {
    process.exit(0);
  }
  if (!file) process.exit(0);

  const rel = path.relative(ROOT, path.resolve(ROOT, file)).split(path.sep).join("/");
  if (rel.startsWith("..")) process.exit(0);

  if (rel.startsWith(".agents/")) {
    const r = run("scripts/sync-harness.cjs");
    if (r.status === 0) console.log(".agents 변경 → .claude 미러 동기화 완료");
    else report("미러 동기화 실패", r);
    return;
  }

  const isCode = rel.startsWith("src/") && !rel.startsWith("src/tests/") && /\.(ts|tsx)$/.test(rel);
  if (isCode || rel === "src/styles/App.css") {
    const r = run("scripts/check-tokens.cjs", rel);
    if (r.status !== 0) report("[tokens:check 실패] 규칙 40 — DESIGN.md 토큰으로 고친다", r);
  }
}

function run(script, ...args) {
  return spawnSync(process.execPath, [path.join(ROOT, script), ...args], { cwd: ROOT, encoding: "utf8" });
}

function report(title, r) {
  process.stderr.write(`${title}:\n${r.stdout ?? ""}${r.stderr ?? ""}`);
  process.exit(2);
}
