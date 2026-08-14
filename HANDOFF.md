# Ringo · Slack Marketplace 소개 이미지 — 진행 상황

**마지막 업데이트:** 2026-08-14
**공개 링크:** https://yeseul-launcher.github.io/ringo-marketplace-assets/
**레포:** https://github.com/yeseul-launcher/ringo-marketplace-assets

---

## 1. 지금 뭘 만들고 있나

Slack Marketplace 리스팅에 등록할 **소개 이미지 5장** (국문).
규격은 **1600×1000 (8:5) PNG**, 21MB 이하. [Slack 가이드라인](https://docs.slack.dev/slack-marketplace/slack-marketplace-app-guidelines-and-requirements/)

기존에 `Viktor` 이름으로 등록된 리스팅을 `Ringo` 로 리브랜딩하면서 이미지를 새로 만드는 작업.

---

## 2. 5장 구성

| # | 헤드라인 | 화면 | 포맷 |
|---|---|---|---|
| 1 | 팀의 AI가 **먼저 말을 걸어요** | #product · 아무도 안 물었는데 3주 전 결정을 먼저 꺼냄 | Slack 창 + 결정 카드 + 리액션 |
| 2 | 팀 전체가 함께 쓰는 **하나의 두뇌** | 각자의 기억 4개 vs 팀이 함께 쓰는 하나의 기억 | **전면 다크 대비 다이어그램** |
| 3 | 답만 하지 않아요, **일을 끝냅니다** | #eng-alerts · 500 오류 원인 진단 + 코드 diff | Slack 창 + diff 카드 + 버튼 |
| 4 | 매달 반복되는 일, **이제 맡기세요** | #finance · 인보이스 312건 대사, $2,400 과다청구 적발 | Slack 창 + 결과 3줄 + 버튼 |
| 5 | 경계도 권한도 **팀이 정합니다** | 채널 연결 토글 + 보안 3항목 | **리퀴드 글라스 패널** |

5장이 전부 같은 포맷이면 단조로워서 2번과 5번을 다른 포맷으로 뺐다.

---

## 3. 디자인 규칙 (합의된 것)

- **로고**: 1번 페이지 상단에만. 배경 있는 심볼(에스프레소 타일 + 정령) + `Ringo` 워드마크 46px, 가운데 정렬.
  나머지 4장은 같은 높이의 **빈 슬롯**을 둬서 헤드라인·목업 시작 Y를 5장 모두 일치시킴
- **헤드라인**: 가운데 정렬, 72px, **마침표 없음**, 한 줄
- **서브 텍스트**: 없음 (뺐다)
- **상단 블록 높이 90px 고정** → 목업 시작 Y가 5장 동일
- **배경 색 번짐**: 1·3·4번은 앰버·오크 **한 계열로 통일**. 장마다 색을 바꿨더니 세트로 안 보여서 되돌림
  (5번 블롭은 원래 혼합 팔레트 유지. 통일 대상 아님)
- **하이라이트**: 핵심 숫자에 오크 20% 형광펜. 여러 색 쓰면 겉돌아서 한 톤으로 통일
- **Slack 창**: 리퀴드 글라스 (광택 테두리 + 상단 하이라이트 + 내부 그림자)
- **5번 글라스**: 농도 약하게 (강하게 줬다가 과해서 되돌림)

---

## 4. 브랜드 실측값 (ringoai.app에서 추출)

제품 디자인시스템 토큰 (`--color-ds-*`)

```
primary        #c9b28f      primary-text  #574431
text           #1f1f1f      text-2        #595959     text-3  #8c8c8c
success        #2f6b45      success-bg    #edf5ec
warning        #8a5d10      warning-bg    #fff7e6
error          #ad3f43      error-bg      #fbeeed
link           #348f94      border        #d9d9d9 / #f0f0f0
ink            #141413      spirit        #f0eee6
```

- **서체**: Pretendard (본문/한글) + AnthropicSans (워드마크)
- **마스코트**: **정령**(spirit). 유령 아님. 크림색 사과 실루엣 + 검은 세로 타원 눈
- **주의**: og 이미지는 **광택 초록 사과**, 인앱 아바타는 **크림 정령**. 둘이 다름

---

## 5. 파일 구조

```
scratchpad/
├── build1.js        슬라이드 정의 + 마크업 생성 (여기만 고치면 됨)
├── base.css         전체 스타일
├── v1.html          생성 결과물 (build1.js 실행으로 자동 생성)
├── avatars/         인물 사진 6장 (256px)
├── fonts/           Pretendard, AnthropicSans/Serif
└── out/             렌더된 PNG 5장 + 소개글 md
```

**빌드**
```bash
node build1.js                       # v1.html 생성
python3 -m http.server 8765          # 로컬 미리보기
open http://localhost:8765/v1.html
```

**PNG 캡쳐** (한 번에 5장, 약 2분)
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --user-data-dir=./shotprofile \
  --window-size=1600,5000 --virtual-time-budget=11000 \
  --screenshot=all.png "file://$PWD/v1.html"
# 이후 all.png 를 1000px 단위로 5등분
```

> 웹(http)으로 열면 기본이 축소 보기, `file://` 로 열면 원본 1:1.
> 캡쳐가 축소되지 않도록 프로토콜로 분기해둠. `?full=1` 로 웹에서도 원본 크기 확인 가능.

---

## 6. 인물 사진

ChatGPT로 생성. 배경은 단색 파스텔, 정사각 1024, 입 다문 편안한 표정.

| 파일 | 인물 | 배경 |
|---|---|---|
| `yujin.png` | 30대 초 한국인 여성 | 샌드 `#EBD3A8` |
| `dohyun.png` | 30대 중 한국인 남성 (안경) | 세이지 `#C7D3BB` |
| `jimin.png` | 20대 후 한국인 남성 | 클레이핑크 `#E8C4B4` |
| `seoyeon.png` | 20대 중 한국인 여성 | 웜그레이 `#D9D3C7` |
| `sam.png` | 40대 초 흑인 남성 | 오크탄 `#DFC49B` |
| `elena.png` | 30대 후 백인 여성 | 더스티로즈 `#E3C0C0` |

**Slack 메시지 아바타는 원형이 아니라 라운드 사각형**이 맞음.

---

## 7. ⚠️ 등록 전 반드시 확인할 것

### 7-1. Dominic님 초안에 경쟁사 이름이 남아 있음
> "**Viktor**가 접근할 수 있는 채널과 툴은 직접 선택하며"

그대로 등록되면 안 됨. 소개글은 `out/ringo_listing_ko.md` 에 재구성해둠.

### 7-2. SOC 2 는 "준수"가 아니라 "준비"
제품 FAQ 원문:
> "SOC 2 준비는 출시 필수 조건이며 **아직 완료된 인증으로 표시하지 않습니다**."

인증 완료가 아니므로 "검증된 보안", "SOC 2 준수" 표현 불가. 이미지에는 `SOC 2 준비 중`으로 반영함.
**확인 필요:** SOC 2 Type 1/2 중 어느 단계이고 완료 예정 시점. 다른 인증(ISO 27001, ISMS)이 있으면 그건 "검증된"으로 쓸 수 있음.

### 7-3. Anthropic 서체 라이선스
워드마크를 `AnthropicSans` 로 조판함. 홈페이지가 이미 그렇게 배포 중이지만,
마켓플레이스 등록 이미지는 외부 공개물이라 **개발팀에 사용 권한 확인 필요**.

### 7-4. 앱 아이콘 아이덴티티
og 이미지(초록 사과)와 인앱 아바타(크림 정령)가 다름.
앱 아이콘을 정령으로 가기로 했으나 **개발팀 확인 권장**.
아이콘 시안은 `~/Desktop/ringo-마켓플레이스-이미지/앱아이콘시안/` 에 6종.
사용자가 고른 건 **B(웜 오크)** 와 **F(에스프레소+발광)**.

---

## 8. 다음에 이어서 할 것

- [ ] 최종 PNG 5장 재캡쳐 (지금 `out/` 는 이전 버전)
- [ ] 앱 아이콘 B / F 중 최종 결정 → 512·1024 출력
- [ ] 위 7번 항목 4개 개발팀 확인
- [ ] 소개글 `out/ringo_listing_ko.md` 최종 검토

---

## 9. 작업하면서 걸렸던 것 (반복 방지)

- **문자열 패치 실패를 확인 안 하고 넘어간 적이 있음.** `deck.css` 형식으로 `base.css` 를 패치해서
  "적용했다"고 말했는데 실제로는 안 됐음. 패치 후 결과 검증 필수
- **최대 배율을 올릴 때 레이아웃 방식이 다른 장에 미칠 영향을 확인해야 함.**
  1·3·4번(하단 블리드) 키우려고 상한을 2.1로 올렸다가 5번(고정폭 그리드)이 깨짐
- **마크업을 문자열로 자르면 태그 균형이 깨짐.** DOM 추출은 HTMLParser 사용
- **화면을 보지 않고 추측으로 고치지 말 것.** 5번을 여러 번 헛돌았음
