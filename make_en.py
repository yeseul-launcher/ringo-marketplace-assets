# -*- coding: utf-8 -*-
"""build1.js -> build_en.js  (영문판 생성)

헤드라인은 제품 공식 EN 카피(ringoai.app i18n)를 우선 사용하고,
없는 것은 국문 의도에 맞춰 새로 씀. 출력은 v1_en.html.
"""
import re, io

src = open('build1.js', encoding='utf-8').read()

M = [
    # ── 헤드라인 ─────────────────────────────
    ("'알아서 일하는 <em>AI 직원</em>'",            "'The AI employee who <em>just gets to work</em>'"),
    ("'팀 전체가 함께 쓰는 <em>하나의 두뇌</em>'",   "'One brain for the <em>whole team</em>'"),
    ("'제안이 아니라, <em>실행합니다</em>'",         "'Not suggestions. <em>Results.</em>'"),
    ("'반복 업무는 <em>Ringo에게</em>'",             "'Leave the busywork <em>to Ringo</em>'"),
    ("'역할과 권한, <em>원하는 대로</em>'",          "'Access and control, <em>exactly as you want</em>'"),

    # ── 서브(미노출이지만 일관성 유지) ────────
    ("'아무도 묻지 않았는데, Ringo가 먼저 꺼냈습니다.'", "'Nobody asked. Ringo brought it up first.'"),
    ("'50개의 개인 기록이 아니라, 하나의 공유 기억.'",   "'Not 50 private histories. One shared memory.'"),
    ("'원인을 찾고 수정본까지 올려둡니다.'",             "'Finds the cause and opens the fix.'"),
    ("'다음 달 자동 실행까지 먼저 제안합니다.'",         "'Offers to run it again next month.'"),
    ("'연결한 소스만 읽고, 프로젝트별로 분리해 보관합니다.'", "'Reads only what you connect. Scoped per project.'"),

    # ── 인물 / 시각 ──────────────────────────
    ("'최유진'", "'Yujin'"), ("'김도현'", "'Dohyun'"), ("'박지민'", "'Jimin'"),
    ("'오후 2:14'", "'2:14 PM'"), ("'오전 9:41'", "'9:41 AM'"), ("'오후 5:02'", "'5:02 PM'"),
    ("'방금'", "'just now'"),
    ("'멤버 14명'", "'14 members'"), ("'멤버 9명'", "'9 members'"), ("'멤버 6명'", "'6 members'"),
    (">앱<", ">APP<"),

    # ── 01 선제성 ────────────────────────────
    (">우리 그냥 다 <", ">Should we just move everyone to <"),
    (">연간 결제만<", ">annual-only<"),
    ("> 받는 걸로 갈까요? 매출 예측도 깔끔해지고요<", "> billing? Cleaner for forecasting<"),
    (">이 논의는 <", ">The team settled this <"),
    (">3주 전에<", ">3 weeks ago<"),
    ("> 이미 결론이 났어요. 연간 전용은 SMB 체험 4건이 이탈해서 둘 다 유지하기로 했죠.<",
     "> Annual-only churned 4 SMB trials, so you kept both.<"),
    (">같은 논의를 반복하지 않게 다시 가져왔어요:<", ">Bringing it back so nobody re-runs it:<"),
    (">#product · 6월 9일<", ">#product · Jun 9<"),
    ("“월간 + 연간 둘 다 유지. 연간 전용은 테스트에서 SMB 체험 4건을 잃었음.”",
     "“Keep monthly + annual. Annual-only lost 4 SMB trials in the test.”"),
    (">Sam이 정리 · 팀원 6명이 동의했어요<", ">Logged by Sam · 6 teammates agreed<"),

    # ── 02 공유 기억 ─────────────────────────
    (">다른 AI 도구<", ">Other AI tools<"),
    (">각자의 기억 4개<", ">4 separate memories<"),
    (">서로 뭘 아는지 모릅니다<", ">None of them know what the others know<"),
    (">공유 기억<", ">SHARED MEMORY<"),
    (">하나의 두뇌<", ">One brain<"),
    (">팀이 함께 쓰는 하나의 기억<", ">One memory the whole team shares<"),
    (">누가 물어도 같은 맥락으로 답합니다<", ">Same context, whoever asks<"),

    # ── 03 실행 ──────────────────────────────
    ("> 가입 웹훅이 아침부터 500 오류가 나요. 원인을 추적해줄래요?<",
     "> the signup webhook has been throwing 500s since this morning. Can you trace it?<"),
    (">PR #4821 이후 발생한 <", ">A null email introduced in PR #4821 <"),
    (">null 이메일<", ">is the cause<"),
    (">이 원인이에요. 안전한 수정안을 준비했어요.<", ">. I prepared a safe fix.<"),
    (">수정본 PR #4830 초안 작성 <", ">Fix drafted as PR #4830 <"),
    (">· 테스트 통과<", ">· tests passing<"),
    (">인시던트 등록 <", ">Incident opened <"),
    (">· 상태 페이지 업데이트<", ">· status page updated<"),
    (">PR 병합<", ">Merge PR<"), (">수정 요청<", ">Request changes<"),

    # ── 04 자동화 ────────────────────────────
    ("> 이번 달 인보이스 대사하고 이상한 거 있으면 짚어줘.<",
     "> reconcile this month's invoices and flag anything odd.<"),
    (">Stripe + QuickBooks에서 인보이스 <", ">Matched <"),
    (">312건<", ">312 invoices<"),
    (">을 대사했어요.<", "> across Stripe + QuickBooks.<"),
    (">이상 발견: ACME에 <", ">Caught: <"),
    (">약 $2,400 과다 청구<", ">~$2,400 overcharge to ACME<"),
    (">ACME 환불 이메일 초안 작성<", ">Refund email drafted for ACME<"),
    (">월말 마감 자료 준비 완료 <", ">Month-end pack ready <"),
    (">· Excel · 시트 6개<", ">· Excel · 6 sheets<"),
    (">매달 자동 실행<", ">Run monthly<"), (">나중에<", ">Not now<"),

    # ── 05 권한 ──────────────────────────────
    ("> 채널 연결<", "> Channels<"),
    (">팀이 직접 선택합니다<", ">You choose<"),
    ("'제품 논의 · 결정 기록'", "'Product decisions'"),
    ("'지표 · 실험 결과'", "'Metrics and experiments'"),
    ("'장애 · 배포 알림'", "'Incidents and deploys'"),
    ("'인보이스 · 지출'", "'Invoices and spend'"),
    ("'연결 안 함'", "'Not connected'"),
    ("'연결한 소스만 읽음'", "'Reads only what you connect'"),
    ("'켜둔 채널 밖은 접근하지 않습니다'", "'Nothing outside the channels you enable'"),
    ("'프로젝트별 접근 분리'", "'Scoped per project'"),
    ("'팀 데이터는 각자의 프로젝트 안에만'", "'Team data stays inside its own project'"),
    ("'최종 결정은 사람이'", "'A human makes the call'"),
    ("'되돌릴 수 없는 작업은 승인 후 실행합니다'", "'Irreversible actions run only after approval'"),


    # ── 영문판 인물 (글로벌 팀 구성) ──────────
    ("'Yujin'", "'Emma'"), ("'Dohyun'", "'Daniel'"), ("'Jimin'", "'Lucas'"),
    (">Logged by Sam · 6 teammates agreed<", ">Logged by Marcus · 6 teammates agreed<"),
    # ── 기타 ─────────────────────────────────
    ("'#product에 메시지 보내기'", "'Message #product'"),
    ("'#eng-alerts에 메시지 보내기'", "'Message #eng-alerts'"),
    ("'#finance에 메시지 보내기'", "'Message #finance'"),
    (">Ringo 마켓플레이스 이미지 · 1차 구조 복원<", ">Ringo Marketplace Images (EN)<"),
]

missed = []
for a, b in M:
    if a in src:
        src = src.replace(a, b)
    else:
        missed.append(a)

# 출력 파일명 변경
src = src.replace("path.join(DIR, 'v1.html')", "path.join(DIR, 'v1_en.html')")
src = src.replace("wrote v1.html — 1차 구조 복원 (미리보기: http://localhost:8765/v1.html)",
                  "wrote v1_en.html (English)")
src = src.replace('<html lang="ko">', '<html lang="en">')

# 아바타는 파일 경로가 아니라 이름 토큰으로 참조됨: av('yujin'), faces:[...], PEOPLE
# 따옴표 포함 토큰을 통째로 바꿔야 av()·facepile·02번 다이어그램이 모두 반영됨
for a, b in [('yujin','emma'), ('dohyun','daniel'), ('jimin','lucas'),
             ('seoyeon','chloe'), ('sam','marcus'), ('elena','sofia')]:
    src = src.replace(f"'{a}'", f"'{b}'")
src = src.replace('avatars/', 'avatars_en/')

open('build_en.js', 'w', encoding='utf-8').write(src)

left = re.findall(r'[가-힣]+', src)
print(f'치환 {len(M)-len(missed)}/{len(M)}')
if missed:
    print('못 찾음:'); [print('  ', m[:60]) for m in missed]
print('남은 한글 토큰:', len(left))
if left:
    print(' ', sorted(set(left))[:25])
