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
const SPIRIT = `<svg viewBox="279 140 694 866" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <linearGradient id="sBody" x1="28%" y1="4%" x2="72%" y2="100%">
      <stop offset="0%" stop-color="#fefdfb"/><stop offset="52%" stop-color="#f9f3ea"/><stop offset="100%" stop-color="#ebe0d0"/>
    </linearGradient>
    <linearGradient id="sEye" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#58493f"/><stop offset="100%" stop-color="#3a2e27"/>
    </linearGradient>
    <radialGradient id="sGloss" cx="34%" cy="20%" r="42%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".55"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="sClip"><path d="M627 283 C487 283 387 324 349 424 C320 501 330 628 342 701 C351 756 326 807 303 842 C279 880 295 916 324 925 C353 934 380 925 404 915 C425 906 438 918 454 937 C486 974 525 993 562 980 C594 969 611 946 638 951 C670 957 689 983 718 992 C758 1005 792 994 820 965 C891 891 929 791 948 666 C969 526 938 407 866 341 C808 288 720 281 627 283 Z"/></clipPath>
  </defs>
  <!-- 꼭지 (spirit-character-stem) -->
  <path d="M 610 293 C 602 237 618 185 648 150 C 657 139 672 139 678 150 C 684 164 675 188 657 210 C 642 230 626 260 622 286 Z" fill="url(#sBody)"/>
  <path d="M627 283 C487 283 387 324 349 424 C320 501 330 628 342 701 C351 756 326 807 303 842 C279 880 295 916 324 925 C353 934 380 925 404 915 C425 906 438 918 454 937 C486 974 525 993 562 980 C594 969 611 946 638 951 C670 957 689 983 718 992 C758 1005 792 994 820 965 C891 891 929 791 948 666 C969 526 938 407 866 341 C808 288 720 281 627 283 Z" fill="url(#sBody)"/>
  <ellipse cx="520" cy="430" rx="250" ry="200" fill="url(#sGloss)" clip-path="url(#sClip)"/>
  <ellipse cx="436" cy="585" rx="37" ry="57" fill="url(#sEye)"/>
  <ellipse cx="559" cy="585" rx="37" ry="57" fill="url(#sEye)"/>
</svg>`;

/* 사람 아바타는 원형 사진, Ringo는 검정 라운드 타일 + 유령 (제품과 동일) */
const av = who => `<div class="av person"><img src="avatars_en/${who}.png" alt=""></div>`;

/* 채널 헤더에 겹쳐 놓는 멤버 아바타 그룹 */
const facepile = (list, more) => `
        <div class="facepile">
          ${list.map(w => `<img src="avatars_en/${w}.png" alt="">`).join('')}
          ${more ? `<span class="fmore">+${more}</span>` : ''}
        </div>`;
const avRingo = `<div class="av ringo">${SPIRIT}</div>`;

const msg = (avatar, name, time, body, badge) => `
      <div class="msg">
        ${avatar}
        <div class="mbody">
          <div class="mhead">
            <span class="mname">${name}</span>
            ${badge ? `<span class="badge">APP</span>` : ''}
            <span class="mtime">${time}</span>
          </div>
          ${body}
        </div>
      </div>`;

const SLIDES = [
  /* 01 · 선제성 */
  {
    logo: true, wash: 'w1',
    h1: 'The AI employee who <em>just gets to work</em>',
    sub: 'Nobody asked. Ringo brought it up first.',
    win: {
      ch: 'product', meta: '14 members', faces: ['emma','marcus','sofia','chloe'], more: 10,
      body: `
      ${msg(av('emma'), 'Emma', '2:14 PM',
        `<div class="mtext">Should we just move everyone to <strong>annual-only</strong> billing? Cleaner for forecasting</div>`)}
      ${msg(avRingo, 'Ringo', 'just now',
        `<div class="mtext">The team settled this <strong class="hl">3 weeks ago</strong> Annual-only churned 4 SMB trials, so you kept both.<br>Bringing it back so nobody re-runs it:</div>
         <div class="att">
           <div class="aline">#product · Jun 9</div>
           <div class="aquote">“Keep monthly + annual. Annual-only lost 4 SMB trials in the test.”</div>
           <div class="afoot">Logged by Marcus · 6 teammates agreed</div>
         </div>
         <div class="rx"><span class="on">🙌 5</span><span>👀 3</span></div>`, true)}`,
      composer: 'Message #product'
    }
  },

  /* 02 · 공유 기억 */
  {
    h1: 'One brain for the <em>whole team</em>',
    sub: 'Not 50 private histories. One shared memory.',
    custom: 'graph', inverted: true
  },

  /* 03 · 실행 */
  {
    wash: 'w3',
    h1: 'Not suggestions. <em>Results.</em>',
    sub: 'Finds the cause and opens the fix.',
    win: {
      ch: 'eng-alerts', meta: '9 members', faces: ['daniel','marcus','lucas'], more: 6,
      body: `
      ${msg(av('daniel'), 'Daniel', '9:41 AM',
        `<div class="mtext"><span class="mention">@Ringo</span> the signup webhook has been throwing 500s since this morning. Can you trace it?</div>`)}
      ${msg(avRingo, 'Ringo', 'just now',
        `<div class="mtext">A null email introduced in PR #4821 <strong class="hl err">is the cause</strong>. I prepared a safe fix.</div>
         <div class="steps">
           <div class="step"><span class="dot">✓</span>Fix drafted as PR #4830 <span class="tag">· tests passing</span></div>
           <div class="step"><span class="dot">✓</span>Incident opened <span class="tag">· status page updated</span></div>
         </div>
         <div class="acts"><span class="btn primary">Merge PR</span><span class="btn">Request changes</span></div>`, true)}`,
      composer: 'Message #eng-alerts'
    }
  },

  /* 04 · 자동화 */
  {
    wash: 'w4',
    h1: 'Leave the busywork <em>to Ringo</em>',
    sub: 'Offers to run it again next month.',
    win: {
      ch: 'finance', meta: '6 members', faces: ['lucas','sofia','emma'], more: 4,
      body: `
      ${msg(av('lucas'), 'Lucas', '5:02 PM',
        `<div class="mtext"><span class="mention">@Ringo</span> reconcile this month's invoices and flag anything odd.</div>`)}
      ${msg(avRingo, 'Ringo', 'just now',
        `<div class="mtext">Matched <strong class="hl">312 invoices</strong> across Stripe + QuickBooks.</div>
         <div class="steps">
           <div class="step"><span class="dot warn">!</span>Caught: <strong class="hl warn">~$2,400 overcharge to ACME</strong></div>
           <div class="step"><span class="dot">✓</span>Refund email drafted for ACME</div>
           <div class="step"><span class="dot file">↓</span>Month-end pack ready <span class="tag">· Excel · 6 sheets</span></div>
         </div>
         <div class="acts"><span class="btn primary">Run monthly</span><span class="btn">Not now</span></div>`, true)}`,
      composer: 'Message #finance'
    }
  },

  /* 05 · 주도권 & 보안 */
  {
    h1: 'Access and control, <em>exactly as you want</em>',
    sub: 'Reads only what you connect. Scoped per project.',
    custom: 'perms'
  }
];

/* ── 02 지식 그래프 (Slack 창 안의 다크 패널) ─────────── */

const PEOPLE = ['emma', 'daniel', 'lucas', 'chloe'];

/* 02 비주얼: 추상 그래프 대신 "각자 따로 vs 하나를 함께"를 직접 대비시킵니다.
   왼쪽은 사람마다 분리된 기억, 오른쪽은 하나로 모이는 공유 기억. */
/* 02 비주얼: "각자 따로 vs 하나를 함께" 대비.
   요소를 키우고 세로 공간을 끝까지 써서 여백이 뜨지 않게 배치. */
const LX = [167, 322, 477, 632];      // 왼쪽 인물 x (중심 400)
const RX = [968, 1123, 1278, 1433];   // 오른쪽 인물 x (중심 1200)
const AY = 190, AR = 56;              // 인물 y / 반지름

/* 02 비주얼: 각자 따로 vs 하나를 함께.
   상단 카피 블록이 156px로 고정되면서 확보된 세로를 요소 확대에 씁니다. */
const GRAPH_SVG = `
      <svg viewBox="0 0 1600 662" width="1600" height="662">
        <defs>
          <linearGradient id="goldb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f7eddb"/>
            <stop offset="46%" stop-color="#e6d0a9"/>
            <stop offset="100%" stop-color="#d3b78c"/>
          </linearGradient>
          <!-- 유리 표면: 위쪽이 밝고 아래로 투명해지는 반투명 판 -->
          <linearGradient id="glassBox" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#ffffff" stop-opacity=".16"/>
            <stop offset="44%"  stop-color="#ffffff" stop-opacity=".05"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity=".02"/>
          </linearGradient>
          <!-- 테두리 광택: 좌상단이 밝고 우하단으로 사라짐 -->
          <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stop-color="#ffffff" stop-opacity=".85"/>
            <stop offset="38%"  stop-color="#ffffff" stop-opacity=".18"/>
            <stop offset="72%"  stop-color="#c9b28f" stop-opacity=".22"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity=".55"/>
          </linearGradient>
          <!-- 상단 스펙큘러 -->
          <linearGradient id="spec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#ffffff" stop-opacity=".55"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </linearGradient>
          <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <line x1="800" y1="44" x2="800" y2="620" stroke="#6b5c48"
              stroke-width="1.6" stroke-dasharray="8 11" opacity=".45"/>

        <!-- 왼쪽: 다른 AI 도구 -->
        <text x="400" y="70" text-anchor="middle"
              style="font:700 34px Pretendard,sans-serif;fill:#9b8d7c;letter-spacing:-.02em">Other AI tools</text>
        ${LX.map((x, i) => `
        <clipPath id="cl${i}"><circle cx="${x}" cy="${AY}" r="${AR}"/></clipPath>
        <image href="avatars_en/${PEOPLE[i]}.png" x="${x - AR}" y="${AY - AR}"
               width="${AR * 2}" height="${AR * 2}" clip-path="url(#cl${i})"
               style="filter:grayscale(.8) brightness(.55)"/>
        <circle cx="${x}" cy="${AY}" r="${AR}" fill="none" stroke="#5d5244" stroke-width="3"/>
        <line x1="${x}" y1="${AY + AR + 8}" x2="${x}" y2="340" stroke="#5d5244" stroke-width="2.4" opacity=".75"/>
        <rect x="${x - 70}" y="340" width="140" height="152" rx="20" fill="#2b251d"/>
        <rect x="${x - 70}" y="340" width="140" height="152" rx="20" fill="url(#glassBox)"/>
        <rect x="${x - 66}" y="344" width="132" height="58" rx="16" fill="url(#spec)" opacity=".5"/>
        <rect x="${x - 70}" y="340" width="140" height="152" rx="20"
              fill="none" stroke="url(#glassEdge)" stroke-width="1.6"/>
        ${[0, 1, 2, 3].map(k => `<rect x="${x - 44}" y="${372 + k * 28}" width="${[88, 66, 78, 54][k]}" height="9" rx="4.5" fill="#5d5244"/>`).join('')}
        `).join('')}
        <text x="400" y="564" text-anchor="middle"
              style="font:700 31px Pretendard,sans-serif;fill:#8d8071;letter-spacing:-.025em">4 separate memories</text>
        <text x="400" y="610" text-anchor="middle"
              style="font:500 26px Pretendard,sans-serif;fill:#6f6558;letter-spacing:-.025em">None of them know what the others know</text>

        <!-- 오른쪽: Ringo -->
        <text x="1200" y="70" text-anchor="middle"
              style="font:700 34px Pretendard,sans-serif;fill:#e8d3ad;letter-spacing:-.02em">Ringo</text>
        ${RX.map((x, i) => `
        <path d="M${x} ${AY + AR + 8} C ${x} 298, ${1200 + (x - 1200) * 0.22} 308, ${1200 + (x - 1200) * 0.34} 346"
              stroke="#c9b28f" stroke-width="3.4" fill="none" opacity=".92"/>
        <clipPath id="cr${i}"><circle cx="${x}" cy="${AY}" r="${AR}"/></clipPath>
        <image href="avatars_en/${PEOPLE[i]}.png" x="${x - AR}" y="${AY - AR}"
               width="${AR * 2}" height="${AR * 2}" clip-path="url(#cr${i})"/>
        <circle cx="${x}" cy="${AY}" r="${AR}" fill="none" stroke="#f3e9d6" stroke-width="3.5"/>
        `).join('')}
        <g filter="url(#softglow)">
          <rect x="900" y="346" width="600" height="146" rx="28" fill="url(#goldb)"/>
        </g>
        <rect x="908" y="352" width="584" height="62" rx="24" fill="url(#spec)" opacity=".62"/>
        <rect x="900" y="346" width="600" height="146" rx="28"
              fill="none" stroke="url(#glassEdge)" stroke-width="1.8"/>
        <text x="1200" y="398" text-anchor="middle"
              style="font:800 20px Pretendard,sans-serif;fill:#6b5433;letter-spacing:.16em">SHARED MEMORY</text>
        <text x="1200" y="452" text-anchor="middle"
              style="font:800 42px Pretendard,sans-serif;fill:#2a2016;letter-spacing:-.03em">One brain</text>
        <text x="1200" y="564" text-anchor="middle"
              style="font:700 31px Pretendard,sans-serif;fill:#e2ceac;letter-spacing:-.025em">One memory the whole team shares</text>
        <text x="1200" y="610" text-anchor="middle"
              style="font:500 26px Pretendard,sans-serif;fill:#b8a68c;letter-spacing:-.025em">Same context, whoever asks</text>
      </svg>`;

const GRAPH = `<div class="gfull">${GRAPH_SVG}</div>`;

/* ── 05 권한 패널 ────────────────────────────────── */
const CHANNELS = [
  ['product', 'Product decisions', 1],
  ['growth', 'Metrics and experiments', 1],
  ['eng-alerts', 'Incidents and deploys', 1],
  ['finance', 'Invoices and spend', 1],
  ['hr-private', 'Not connected', 0],
  ['exec-private', 'Not connected', 0]
];


/* 05 — 리퀴드 글라스. 카드를 하나의 패널이 아니라 개별 유리 조각으로 흩뿌립니다.
   블러가 보이려면 뒤에 색이 있어야 해서 배경 블롭을 먼저 깝니다. */
const SECS = [
  ['Reads only what you connect', 'Nothing outside the channels you enable'],
  ['Scoped per project', 'Team data stays inside its own project'],
  ['A human makes the call', 'Irreversible actions run only after approval']
];

/* 05 — 왼쪽은 Slack 설정 패널 형태를 유지하되 표면만 리퀴드 글라스로.
   블러가 보이려면 뒤에 색이 있어야 해서 배경 블롭을 먼저 깝니다. */
const PERMS = `
  <div class="g5">
    <div class="blobs" aria-hidden="true">
      <i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i><i class="b5"></i>
    </div>

    <div class="gpanel">
      <div class="gphead">
        <span class="ch"><span class="hash">#</span> Channels</span>
        <span class="meta">You choose</span>
      </div>
      <div class="gplist">
        ${CHANNELS.map(([c, d, on]) => `
        <div class="gprow${on ? '' : ' off'}">
          <div class="gptext">
            <b><span class="hash">#</span>${c}</b>
            <i>${d}</i>
          </div>
          <div class="tog${on ? ' on' : ''}"><span></span></div>
        </div>`).join('')}
      </div>
    </div>

    <div class="gcol gright">
      ${SECS.map(([t, d]) => `
      <div class="gcard">
        <span class="sdot">✓</span>
        <div><b>${t}</b><i>${d}</i></div>
      </div>`).join('')}
    </div>
  </div>`;

const EXTRA = `
  /* Ringo 아바타: 검정 타일 + 크림 유령 (제품 실제 아바타) */
  /* 배경/크기는 base.css에서 관리. 정령이 타일을 꽉 채우면 답답해 보여서 62%로 여백 확보 */
  .av.ringo svg { width: 62%; height: 62%; display: block; }
  .lockup .markimg svg { width: 60%; height: 60%; display: block; }

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

  /* ── 05 리퀴드 글라스 ────────────────────────────
     유리는 뒤에 색이 있어야 읽히므로 블롭을 먼저 깔고 그 위에 얹습니다. */
  .g5 { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 44px; width: 100%; }
  /* 헤드라인 영역까지 색이 올라오면 글자가 지저분해져서
     콘텐츠 영역 안으로만 번지게 제한합니다. */
  .blobs { position: absolute; inset: -30px -120px -80px; z-index: 0; pointer-events: none; overflow: visible; }
  .blobs i { position: absolute; display: block; border-radius: 50%; filter: blur(66px); }
  .blobs .b1 { width: 600px; height: 440px; left: -4%;  top: 40px;   background: rgba(201,178,143,.58); }
  .blobs .b2 { width: 520px; height: 400px; left: 28%;  top: 250px;  background: rgba(178,199,158,.44); }
  .blobs .b3 { width: 560px; height: 430px; right: 0%;  top: 60px;   background: rgba(240,193,132,.54); }
  .blobs .b4 { width: 480px; height: 380px; right: 24%; bottom: -40px; background: rgba(214,162,148,.40); }
  .blobs .b5 { width: 440px; height: 280px; left: 22%;  top: 20px;   background: rgba(226,206,172,.46); }

  .gcol { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 18px; }

  /* 유리 표면 공통 */
  /* 유리 표면. 강하게 줬더니 과해서 원래 농도로 되돌림 */
  .gpanel, .gcard {
    background: linear-gradient(142deg, rgba(255,253,248,.82) 0%, rgba(255,251,242,.46) 100%);
  }
  /* 왼쪽 채널 리스트만 흰색 쪽으로 회복 (내용이 많아 바탕이 받쳐줘야 읽힘) */
  .gpanel {
    background: linear-gradient(150deg, rgba(255,255,255,.94) 0%, rgba(255,253,248,.86) 100%);
    backdrop-filter: blur(22px) saturate(150%);
    -webkit-backdrop-filter: blur(22px) saturate(150%);
    border: 1px solid rgba(255,255,255,.70);
    box-shadow:
      0 12px 38px rgba(94,68,34,.15),
      inset 0 1px 0 rgba(255,255,255,.88);
  }

  /* 왼쪽: Slack 설정 패널 형태 유지 */
  .gpanel { position: relative; z-index: 1; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; }
  .gphead {
    display: flex; align-items: center; gap: 12px;
    padding: 20px 26px;
    border-bottom: 1px solid rgba(120,100,74,.16);
  }
  .gphead .ch { font-size: 19px; font-weight: 800; color: #241c14; letter-spacing: -.015em; }
  .gphead .ch .hash { color: #9c8258; }
  .gphead .meta {
    font-size: 15px; color: #6f6053; font-weight: 500;
    padding-left: 12px; border-left: 1px solid rgba(120,100,74,.22);
  }
  .gplist { flex: 1; display: flex; flex-direction: column; }
  .gprow {
    flex: 1;
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    padding: 16px 26px;
  }
  .gprow + .gprow { border-top: 1px solid rgba(120,100,74,.13); }
  .gprow b { display: block; font-size: 21px; font-weight: 800; color: #241c14; letter-spacing: -.02em; }
  .gprow b .hash { color: #9c8258; margin-right: 1px; }
  .gprow i {
    display: block; font-style: normal; font-size: 15px; font-weight: 500;
    color: #6f6053; margin-top: 4px; letter-spacing: -.015em;
  }
  .gprow.off b, .gprow.off i { color: #a2968a; }
  .gprow.off { opacity: .7; }

  .tog {
    width: 54px; height: 31px; border-radius: 999px; flex: none; position: relative;
    background: rgba(120,105,88,.28);
    box-shadow: inset 0 1px 3px rgba(60,44,26,.22);
  }
  .tog span {
    position: absolute; top: 3px; left: 3px; width: 25px; height: 25px;
    border-radius: 50%; background: #fffdf8;
    box-shadow: 0 2px 5px rgba(50,36,20,.3);
  }
  .tog.on { background: #2f6b45; box-shadow: inset 0 1px 3px rgba(20,60,35,.35); }
  .tog.on span { left: 26px; }

  /* 오른쪽 보안 카드 */
  .gcard {
    flex: 1;
    display: flex; align-items: center; gap: 20px;
    border-radius: 24px; padding: 26px 30px;
  }
  .sdot {
    flex: none; width: 52px; height: 52px; border-radius: 17px;
    background: rgba(47,107,69,.15); color: #2f6b45;
    display: grid; place-items: center; font-size: 28px; font-weight: 900;
  }
  .gcard b { display: block; font-size: 25px; font-weight: 800; color: #241c14; letter-spacing: -.022em; }
  .gcard i {
    display: block; font-style: normal; font-size: 19px; font-weight: 500;
    color: #6f6053; margin-top: 6px; letter-spacing: -.015em;
  }
`;

const slideHtml = s => `
<div class="slide${s.inverted ? ' inverted' : ''}">
  ${s.wash ? `<div class="wash ${s.wash}" aria-hidden="true"><i></i><i></i><i></i></div>` : ''}
  <div class="brand">${s.logo
    ? `<span class="markimg">${SPIRIT}</span><span class="wordmark">Ringo</span>`
    : ''}</div>
  <div class="copy">
    <h1>${s.h1}</h1>
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
           <div class="winpad"></div>
         </div>`}
  </div>
</div>`;

const FIT_JS = `
  /* 입력창을 없앤 대신 창을 하단으로 흘려보내고 내부 요소를 키웁니다.
     창 맨 아래 .winpad(=PAD px) 만큼만 캔버스 밖으로 나가게 역산하므로
     메시지·버튼·리액션은 절대 잘리지 않습니다. */
  const SLIDE_H = 1000, BASE_W = 1428, PAD = 92, MIN = 0.72, MAX = 2.1;
  async function fit() {
    await document.fonts.ready;
    document.querySelectorAll('.slide').forEach(slide => {
      const box = slide.querySelector('.fit');
      const el = box.firstElementChild;
      if (el.classList.contains('gfull')) { el.dataset.zoom = '1'; return; }

      const top = box.getBoundingClientRect().top - slide.getBoundingClientRect().top;
      const bleeds = !!el.querySelector('.winpad');
      const avail = SLIDE_H - top - (bleeds ? 0 : 46);

      let z = 1.2;
      for (let i = 0; i < 9; i++) {
        el.style.zoom = '';
        el.style.width = (BASE_W / z) + 'px';
        const h = el.getBoundingClientRect().height;
        // bleeds: (h - PAD) * z = avail  → PAD 만큼이 화면 밖으로
        const denom = bleeds ? Math.max(1, h - PAD) : h;
        const cap = bleeds ? MAX : 1.45;
        const next = Math.min(cap, Math.max(MIN, avail / denom));
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

  /* ?preview=1 로 열면 5장을 한 화면에 축소해서 보여줍니다. */
  function preview() {
    /* 브라우저(http/https)로 열면 기본이 축소 보기.
       PNG 캡쳐는 file:// 로 열므로 항상 원본 1:1 유지 → 결과물에 영향 없음.
       원본 크기로 보려면 ?full=1 */
    const served = location.protocol !== 'file:';
    const wantFull = location.search.includes('full');
    const wantPreview = location.search.includes('preview');
    if (!(wantPreview || (served && !wantFull))) return;
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
<html lang="en"><head><meta charset="utf-8">
<title>Ringo Marketplace Images (EN)</title>
<link rel="stylesheet" href="base.css">
<style>${EXTRA}</style>
</head><body>
${SLIDES.map(slideHtml).join('\n')}
<script>${FIT_JS}</script>
</body></html>`;

fs.writeFileSync(path.join(DIR, 'v1_en.html'), html);
console.log('wrote v1_en.html (English)');
