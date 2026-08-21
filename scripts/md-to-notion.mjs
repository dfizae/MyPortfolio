#!/usr/bin/env node
/**
 * md-to-notion.mjs
 * 일반 Markdown(docs/WORKLOG.md 등)을 Notion-flavored Markdown으로 변환한다.
 * Notion MCP(create-pages / update-page)에 content로 넣기 위한 용도.
 *
 * 사용: node scripts/md-to-notion.mjs docs/WORKLOG.md > out.md
 *
 * 변환 규칙 (Notion enhanced-markdown-spec 기준):
 *  - 파이프 테이블  → <table header-row="true"> … </table>
 *  - 연속 blockquote → <callout> (줄마다 자식 블록)
 *  - 2칸 들여쓰기    → 탭
 *  - 코드 블록(```) 안은 그대로, 인라인 코드(`…`) 안도 그대로
 *  - 그 외 텍스트의  \ [ ] ~ < > { } | ^ $  를 백슬래시 이스케이프 (to-do 의 "- [ ]" 는 보존)
 *  - 빈 줄 제거 (Notion이 어차피 무시)
 */
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/md-to-notion.mjs <markdown-file>');
  process.exit(1);
}
const src = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const lines = src.split('\n');

// 코드 밖의 맨 파일명/경로(예: CLAUDE.md, docs/DESIGN.md)는 인라인 코드로 감싼다.
// Notion이 ".md" 등을 도메인으로 오인해 http://CLAUDE.md 링크로 자동 변환하는 것을 막기 위함.
const BARE_FILE = /(?<![`\w/.\-])((?:[\w.\-]+\/)*[\w.\-]+\.(?:md|mjs|cjs|js|ts|tsx|jsx|json|css|html|yml|yaml|svg|png))(?![`\w])/g;

// 인라인 코드(`…`) 바깥 구간만 이스케이프
function escapeRich(text) {
  return text
    .split(/(`[^`]*`)/)
    .map((seg, i) =>
      i % 2 === 1
        ? seg
        : seg
            .replace(BARE_FILE, '`$1`')
            .split(/(`[^`]*`)/)
            .map((s, j) => (j % 2 === 1 ? s : s.replace(/[\\\[\]~<>{}|^$]/g, (m) => '\\' + m)))
            .join(''),
    )
    .join('');
}

// 한 줄 변환: 들여쓰기 → 탭, to-do 접두사 보존, 나머지 이스케이프
function convertLine(line) {
  const m = line.match(/^( *)(.*)$/);
  const indent = '\t'.repeat(Math.floor(m[1].length / 2));
  let body = m[2];
  const todo = body.match(/^(- \[(?: |x)\] )(.*)$/);
  if (todo) return indent + todo[1] + escapeRich(todo[2]);
  if (/^---+$/.test(body)) return indent + '---';
  return indent + escapeRich(body);
}

function isTableLine(l) {
  return /^\s*\|.*\|\s*$/.test(l);
}
function isSeparatorRow(l) {
  return /^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(l);
}
function splitCells(l) {
  return l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
}

const out = [];
let i = 0;
let inFence = false;

while (i < lines.length) {
  const line = lines[i];

  // 코드 블록은 그대로 통과
  if (/^\s*```/.test(line)) {
    inFence = !inFence;
    out.push(line.replace(/^ +/, (s) => '\t'.repeat(Math.floor(s.length / 2))));
    i++;
    continue;
  }
  if (inFence) {
    out.push(line);
    i++;
    continue;
  }

  // 빈 줄 제거
  if (line.trim() === '') {
    i++;
    continue;
  }

  // 파이프 테이블 → <table>
  if (isTableLine(line)) {
    const rows = [];
    while (i < lines.length && isTableLine(lines[i])) {
      if (!isSeparatorRow(lines[i])) rows.push(splitCells(lines[i]));
      i++;
    }
    out.push('<table header-row="true" fit-page-width="true">');
    for (const cells of rows) {
      out.push('\t<tr>');
      for (const c of cells) out.push('\t\t<td>' + escapeRich(c) + '</td>');
      out.push('\t</tr>');
    }
    out.push('</table>');
    continue;
  }

  // 연속 blockquote → callout
  if (/^\s*>/.test(line)) {
    const quoteLines = [];
    while (i < lines.length && /^\s*>/.test(lines[i])) {
      const t = lines[i].replace(/^\s*>\s?/, '');
      if (t.trim() !== '') quoteLines.push(t);
      i++;
    }
    out.push('<callout icon="📝" color="gray_bg">');
    for (const q of quoteLines) out.push('\t' + convertLine(q).replace(/^\t*/, ''));
    out.push('</callout>');
    continue;
  }

  out.push(convertLine(line));
  i++;
}

process.stdout.write(out.join('\n') + '\n');
