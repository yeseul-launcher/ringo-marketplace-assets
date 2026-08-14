/* Ringo · Slack Marketplace 소개 이미지 5장 — 1차 구조 복원판
 *
 * 스타일: base.css (1차 구조 그대로. 왼쪽 정렬 + 하단 Slack 창 목업)
 * 반영한 확정 피드백
 *   - 우측 상단 페이지네이션(01/05) 제거
 *   - 소제목 칩(버그·배포·장애 등) 제거
 * 반영한 사실 정정
 *   - Ringo 아바타: 초록 사과 → 검정 타일 + 크림 유령 (제품 실제 아바타)
 *   - SOC 2 "준수" → "준비" (제품 FAQ가 인증 완료 아님을 명시)
 *
 * 미리보기: http://localhost:8765/v1.html  (캡쳐는 확정 후에만)
 */

const fs = require('fs');
const path = require('path');
const DIR = __dirname;

/* 제품 실제 마스코트 (ringoai.app DOM에서 가져온 path) */
const SPIRIT = `<svg viewBox="250 240 760 800" aria-hidden="true"><path d="M627 283 C487 283 387 324 349 424 C320 501 330 628 342 701 C351 756 326 807 303 842 C279 880 295 916 324 925 C353 934 380 925 404 915 C425 906 438 918 454 937 C486 974 525 993 562 980 C594 969 611 946 638 951 C670 957 689 983 718 992 C758 1005 792 994 820 965 C891 891 929 791 948 666 C969 526 938 407 866 341 C808 288 720 281 627 283 Z" fill="#f0eee6"/><ellipse cx="436" cy="585" rx="37" ry="57" fill="#141413"/><ellipse cx="559" cy="585" rx="37" ry="57" fill="#141413"/></svg>`;

/* 사람 아바타는 원형 사진, Ringo는 검정 라운드 타일 + 유령 (제품과 동일) */
const av = who => `<div class="av person"><img src="avatars/${who}.png" alt=""></div>`;

/* 채널 헤더에 겹쳐 놓는 멤버 아바타 그룹 */
const facepile = (list, more) => `
        <div class="facepile">
          ${list.map(w => `<img src="avatars/${w}.png" alt="">`).join('')}
          ${more ? `<span class="fmore">+${more}</span>` : ''}
        </div>`;
const avRingo = `<div class="av ringo">${SPIRIT}</div>`;

const msg = (avatar, name, time, body, badge) => `
      <div class="msg">
        ${avatar}
        <div class="mbody">
          <div class="mhead">
            <span class="mname">${name}</span>
            ${badge ? `<span class="badge">앱</span>` : ''}
            <span class="mtime">${time}</span>
          </div>
          ${body}
        </div>
      </div>`;

const SLIDES = [
  /* 01 · 선제성 */
  {
    h1: '팀의 AI가 <em>먼저 말을 걸어요.</em>',
    sub: '아무도 묻지 않았습니다. 팀이 3주 전에 내린 결정을 Ringo가 먼저 기억해 냈어요.',
    win: {
      ch: 'product', meta: '멤버 14명', faces: ['yujin','sam','elena','seoyeon'], more: 10,
      body: `
      ${msg(av('yujin'), '최유진', '오후 2:14',
        `<div class="mtext">우리 그냥 다 <strong>연간 결제만</strong> 받는 걸로 갈까요? 매출 예측도 깔끔해지고요</div>`)}
      ${msg(avRingo, 'Ringo', '방금',
        `<div class="mtext">이 논의는 <strong>3주 전에</strong> 이미 결론이 났어요. 연간 전용은 SMB 체험 4건이 이탈해서 둘 다 유지하기로 했죠. 같은 논의를 반복하지 않게 다시 가져왔어요:</div>
         <div class="att">
           <div class="atitle">결정 · 가격</div>
           <div class="aline">#product · 6월 9일</div>
           <div class="aquote">“월간 + 연간 둘 다 유지. 연간 전용은 테스트에서 SMB 체험 4건을 잃었음.”</div>
           <div class="afoot">Sam · 당시 👍 6</div>
         </div>
         <div class="rx"><span class="on">🙌 5</span><span>👀 3</span></div>`, true)}`,
      composer: '#product에 메시지 보내기'
    }
  },

  /* 02 · 공유 기억 */
  {
    h1: '팀 전체가 함께 쓰는 <em>하나의 두뇌.</em>',
    sub: '50개의 개인 채팅 기록이 아니라, 모든 결정과 사람과 업무를 잇는 살아 있는 공유 기억.',
    custom: 'graph', inverted: true
  },

  /* 03 · 실행 */
  {
    h1: '답만 하지 않아요. <em>일을 끝냅니다.</em>',
    sub: '원인을 찾고 수정본까지 올려둡니다. 머지할지 말지, 사람이 결정할 것만 남겨두고요.',
    win: {
      ch: 'eng-alerts', meta: '멤버 9명', faces: ['dohyun','sam','jimin'], more: 6,
      body: `
      ${msg(av('dohyun'), '김도현', '오전 9:41',
        `<div class="mtext"><span class="mention">@Ringo</span> 가입 웹훅이 아침부터 500 오류가 나요. 원인을 추적해줄래요?</div>`)}
      ${msg(avRingo, 'Ringo', '방금',
        `<div class="mtext">PR #4821 이후 발생한 <strong>null 이메일</strong>이 원인이에요. 안전한 수정안을 준비했어요.</div>
         <div class="steps">
           <div class="step"><span class="dot">✓</span>수정본 PR #4830 초안 작성 <span class="tag">· 테스트 통과</span></div>
           <div class="step"><span class="dot">✓</span>인시던트 등록 <span class="tag">· 상태 페이지 업데이트</span></div>
         </div>
         <div class="acts"><span class="btn primary">PR 병합</span><span class="btn">수정 요청</span></div>`, true)}`,
      composer: '#eng-alerts에 메시지 보내기'
    }
  },

  /* 04 · 자동화 */
  {
    h1: '매달 반복되는 일, <em>이제 맡기세요.</em>',
    sub: '한 번 처리하고 끝내지 않아요. 다음 달부터 알아서 돌릴지 Ringo가 먼저 제안합니다.',
    win: {
      ch: 'finance', meta: '멤버 6명', faces: ['jimin','elena','yujin'], more: 4,
      body: `
      ${msg(av('jimin'), '박지민', '오후 5:02',
        `<div class="mtext"><span class="mention">@Ringo</span> 이번 달 인보이스 대사하고 이상한 거 있으면 짚어줘.</div>`)}
      ${msg(avRingo, 'Ringo', '방금',
        `<div class="mtext">Stripe + QuickBooks에서 인보이스 <strong>312건</strong>을 대사했어요.</div>
         <div class="steps">
           <div class="step"><span class="dot warn">!</span>이상 발견: ACME에 <strong>약 $2,400 과다 청구</strong></div>
           <div class="step"><span class="dot">✓</span>ACME 환불 이메일 초안 작성</div>
           <div class="step"><span class="dot file">↓</span>월말 마감 자료 준비 완료 <span class="tag">· Excel · 시트 6개</span></div>
         </div>
         <div class="acts"><span class="btn primary">매달 자동 실행</span><span class="btn">나중에</span></div>`, true)}`,
      composer: '#finance에 메시지 보내기'
    }
  },

  /* 05 · 주도권 & 보안 */
  {
    h1: '읽는 채널도, 하는 일도 <em>팀이 정합니다.</em>',
    sub: '연결한 채널만 읽어요. 되돌리기 어려운 작업은 실행 전에 반드시 먼저 물어봅니다.',
    custom: 'perms'
  }
];

/* ── 02 지식 그래프 (Slack 창 안의 다크 패널) ─────────── */

const PEOPLE = ['yujin', 'dohyun', 'jimin', 'seoyeon'];

/* 02 비주얼: 추상 그래프 대신 "각자 따로 vs 하나를 함께"를 직접 대비시킵니다.
   왼쪽은 사람마다 분리된 기억, 오른쪽은 하나로 모이는 공유 기억. */
const GRAPH_SVG = `
      <svg viewBox="0 0 1428 470" width="1428" height="470">
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2e6cf"/><stop offset="100%" stop-color="#d9c19a"/>
          </linearGradient>
          <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="16" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- 가운데 구분선 -->
        <line x1="714" y1="34" x2="714" y2="436" stroke="#6b5c48" stroke-width="1.5"
              stroke-dasharray="6 9" opacity=".5"/>

        <!-- ── 왼쪽: 다른 AI 도구 (각자 따로) ── -->
        <text x="315" y="52" text-anchor="middle"
              style="font:700 25px Pretendard,sans-serif;fill:#9b8d7c;letter-spacing:-.02em">다른 AI 도구</text>
        ${[105, 245, 385, 525].map((x, i) => `
        <clipPath id="cl${i}"><circle cx="${x}" cy="142" r="33"/></clipPath>
        <image href="avatars/${PEOPLE[i]}.png" x="${x - 33}" y="109" width="66" height="66"
               clip-path="url(#cl${i})" style="filter:grayscale(.75) brightness(.62)"/>
        <circle cx="${x}" cy="142" r="33" fill="none" stroke="#5d5244" stroke-width="2"/>
        <line x1="${x}" y1="180" x2="${x}" y2="252" stroke="#5d5244" stroke-width="1.6" opacity=".8"/>
        <rect x="${x - 56}" y="252" width="112" height="92" rx="15"
              fill="#2f2921" stroke="#544838" stroke-width="1.5"/>
        ${[0, 1, 2].map(k => `<rect x="${x - 36}" y="${276 + k * 20}" width="${[70, 54, 62][k]}" height="7" rx="3.5" fill="#5d5244"/>`).join('')}
        `).join('')}
        <text x="315" y="392" text-anchor="middle"
              style="font:600 22px Pretendard,sans-serif;fill:#8d8071;letter-spacing:-.025em">각자의 대화 기록 4개</text>
        <text x="315" y="424" text-anchor="middle"
              style="font:500 20px Pretendard,sans-serif;fill:#726758;letter-spacing:-.025em">서로 뭘 아는지 모릅니다</text>

        <!-- ── 오른쪽: Ringo (하나로 모임) ── -->
        <text x="1071" y="52" text-anchor="middle"
              style="font:700 25px Pretendard,sans-serif;fill:#e8d3ad;letter-spacing:-.02em">Ringo</text>
        ${[861, 1001, 1141, 1281].map((x, i) => `
        <path d="M${x} 180 C ${x} 226, ${1071 + (x - 1071) * 0.18} 232, ${1071 + (x - 1071) * 0.30} 264"
              stroke="#c9b28f" stroke-width="2.4" fill="none" opacity=".9"/>
        <clipPath id="cr${i}"><circle cx="${x}" cy="142" r="33"/></clipPath>
        <image href="avatars/${PEOPLE[i]}.png" x="${x - 33}" y="109" width="66" height="66"
               clip-path="url(#cr${i})"/>
        <circle cx="${x}" cy="142" r="33" fill="none" stroke="#f3e9d6" stroke-width="2.5"/>
        `).join('')}
        <g filter="url(#softglow)">
          <rect x="861" y="266" width="420" height="96" rx="20" fill="url(#gold)"/>
        </g>
        <text x="1071" y="303" text-anchor="middle"
              style="font:800 15px Pretendard,sans-serif;fill:#6b5433;letter-spacing:.14em">공유 기억</text>
        <text x="1071" y="336" text-anchor="middle"
              style="font:800 27px Pretendard,sans-serif;fill:#2a2016;letter-spacing:-.03em">하나의 두뇌</text>
        <text x="1071" y="392" text-anchor="middle"
              style="font:600 22px Pretendard,sans-serif;fill:#e2ceac;letter-spacing:-.025em">팀 전체가 하나를 함께</text>
        <text x="1071" y="424" text-anchor="middle"
              style="font:500 20px Pretendard,sans-serif;fill:#b8a68c;letter-spacing:-.025em">누가 물어도 같은 맥락으로 답합니다</text>
      </svg>`;

const GRAPH = `<div class="gfull">${GRAPH_SVG}</div>`;

/* ── 05 권한 패널 ────────────────────────────────── */
const CHANNELS = [
  ['product', '제품 논의 · 결정 기록', 1],
  ['eng-alerts', '장애 · 배포 알림', 1],
  ['finance', '인보이스 · 지출', 1],
  ['hr-private', '연결 안 함', 0],
  ['exec-private', '연결 안 함', 0]
];

const PERMS = `
  <div class="perms">
    <div class="win pcard">
      <div class="win-head">
        <span class="ch">Ringo가 읽는 채널</span>
        <span class="meta">팀이 직접 선택</span>
      </div>
      <div class="plist">
        ${CHANNELS.map(([c, d, on]) => `
        <div class="prow${on ? '' : ' off'}">
          <div class="pmeta">
            <div class="pname"><span class="hash">#</span>${c}</div>
            <div class="pdesc">${d}</div>
          </div>
          <div class="tog${on ? ' on' : ''}"><i></i></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="pright">
      <div class="win ask">
        <div class="msg" style="padding:19px 22px 18px">
          ${avRingo}
          <div class="mbody">
            <div class="mhead">
              <span class="mname">Ringo</span><span class="badge">앱</span><span class="mtime">오후 3:20</span>
            </div>
            <div class="mtext">이 작업은 <strong>되돌리기 어려워요.</strong><br>정말 진행할까요?</div>
            <div class="acts"><span class="btn primary">승인</span><span class="btn">취소</span></div>
          </div>
        </div>
      </div>
      <div class="seclist">
        ${[['연결한 채널만 읽음', '팀이 켜둔 채널 외에는 접근하지 않아요'],
           ['프로젝트별 데이터 분리', '팀 데이터는 각자의 프로젝트 안에만'],
           ['자격 증명 암호화', 'SOC 2 준비 중']]
          .map(([t, d]) => `
        <div class="secrow"><span class="sdot">✓</span><div><b>${t}</b><i>${d}</i></div></div>`).join('')}
      </div>
    </div>
  </div>`;

const EXTRA = `
  /* Ringo 아바타: 검정 타일 + 크림 유령 (제품 실제 아바타) */
  .av.ringo { background: #141413; padding: 0; }
  .av.ringo svg { width: 100%; height: 100%; display: block; }

  /* 02 지식 그래프 다크 패널 */
  .gwrap {
    margin: 12px 22px 0; border-radius: 14px; padding: 10px 14px 6px;
    background:
      radial-gradient(72% 90% at 50% 46%, #40321f 0%, rgba(64,50,31,0) 68%),
      linear-gradient(152deg, #33281b 0%, #241c13 100%);
    border: 1px solid rgba(201,178,143,.20);
    box-shadow: inset 0 1px 0 rgba(233,214,181,.10);
  }
  .gwrap svg { display: block; width: 100%; height: auto; }

  /* 05 권한 패널 */
  .perms { display: grid; grid-template-columns: 640px 1fr; gap: 30px; align-items: start; width: 1428px; }
  .pcard .plist { padding: 6px 0 8px; }
  .prow { display: flex; align-items: center; justify-content: space-between; padding: 13px 22px; }
  .prow + .prow { border-top: 1px solid #f1efed; }
  .pname { font-size: 16px; font-weight: 800; color: var(--sk-ink); letter-spacing: -.01em; }
  .pname .hash { color: var(--sk-muted); font-weight: 600; margin-right: 1px; }
  .pdesc { font-size: 13px; color: var(--sk-muted); font-weight: 500; margin-top: 3px; }
  .prow.off .pname, .prow.off .pdesc { color: #b3afab; }
  .tog { width: 46px; height: 27px; border-radius: 999px; background: #d8d5d2; position: relative; flex: none; }
  .tog i { position: absolute; top: 3px; left: 3px; width: 21px; height: 21px; border-radius: 50%;
           background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.22); }
  .tog.on { background: #2f6b45; }
  .tog.on i { left: 22px; }
  .pright { display: flex; flex-direction: column; gap: 22px; }
  .ask .mtext { font-size: 16px; line-height: 1.5; }
  .seclist { display: flex; flex-direction: column; gap: 14px; padding-left: 4px; }
  .secrow { display: flex; align-items: flex-start; gap: 12px; }
  .sdot { flex: none; width: 25px; height: 25px; border-radius: 8px; background: rgba(119,96,63,.13);
          color: var(--brown); display: grid; place-items: center; font-size: 13px; font-weight: 900; }
  .secrow b { display: block; font-size: 17px; font-weight: 800; color: var(--ink); letter-spacing: -.015em; }
  .secrow i { display: block; font-style: normal; font-size: 14px; font-weight: 500; color: var(--muted); margin-top: 2px; }
`;

const slideHtml = s => `
<div class="slide${s.inverted ? ' inverted' : ''}">
  <div class="top">
    <div class="lockup"><span class="markimg">${SPIRIT}</span><span>Ringo</span></div>
  </div>
  <div class="copy">
    <h1>${s.h1}</h1>
    <div class="sub">${s.sub}</div>
  </div>
  <div class="fit">
    ${s.custom === 'graph' ? GRAPH
      : s.custom === 'perms' ? PERMS
      : `<div class="win">
           <div class="win-head">
             <span class="ch"><span class="hash">#</span>${s.win.ch}</span>
             ${facepile(s.win.faces, s.win.more)}
             <span class="meta">${s.win.meta}</span>
           </div>
           <div class="win-body">${s.win.body}</div>
           <div class="composer">${s.win.composer}</div>
           <div style="height:16px"></div>
         </div>`}
  </div>
</div>`;

const FIT_JS = `
  /* 비주얼을 남은 세로 공간에 맞춤. 내용이 캔버스(1000px) 밖으로 잘리지 않게 합니다. */
  const SLIDE_H = 1000, BOTTOM = 46, BASE_W = 1428, MIN = 0.72, MAX = 1.62;
  async function fit() {
    await document.fonts.ready;
    document.querySelectorAll('.slide').forEach(slide => {
      const box = slide.querySelector('.fit');
      const el = box.firstElementChild;
      if (el.classList.contains('gfull')) { el.dataset.zoom = '1'; return; }
      const top = box.getBoundingClientRect().top - slide.getBoundingClientRect().top;
      const avail = SLIDE_H - top - BOTTOM;
      let z = 1.2;
      for (let i = 0; i < 8; i++) {
        el.style.zoom = '';
        el.style.width = (BASE_W / z) + 'px';
        const h = el.getBoundingClientRect().height;
        const next = Math.min(MAX, Math.max(MIN, avail / h));
        if (Math.abs(next - z) < 0.003) { z = next; break; }
        z = next;
      }
      el.style.width = (BASE_W / z) + 'px';
      el.style.zoom = z;
      el.dataset.zoom = z.toFixed(3);
    });
    document.title = 'ready';
    preview();
  }

  /* ?preview=1 로 열면 5장을 한 화면에 축소해서 보여줍니다.
     캡쳐는 쿼리 없이 여는 원본 URL을 쓰므로 결과물에는 영향이 없습니다. */
  function preview() {
    if (!location.search.includes('preview')) return;
    document.documentElement.classList.add('preview');
    const fitScale = () => {
      const s = Math.min(0.9, (window.innerWidth - 80) / 1600);
      document.documentElement.style.setProperty('--pv', s);
    };
    fitScale();
    window.addEventListener('resize', fitScale);
    document.querySelectorAll('.slide').forEach((sl, i) => {
      const t = document.createElement('div');
      t.className = 'pvlabel';
      t.textContent = String(i + 1).padStart(2, '0') + ' / 05   ·   1600 × 1000';
      sl.after(t);
    });
  }

  fit();
`;

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<title>Ringo 마켓플레이스 이미지 · 1차 구조 복원</title>
<link rel="stylesheet" href="base.css">
<style>${EXTRA}</style>
</head><body>
${SLIDES.map(slideHtml).join('\n')}
<script>${FIT_JS}</script>
</body></html>`;

fs.writeFileSync(path.join(DIR, 'v1.html'), html);
console.log('wrote v1.html — 1차 구조 복원 (미리보기: http://localhost:8765/v1.html)');
