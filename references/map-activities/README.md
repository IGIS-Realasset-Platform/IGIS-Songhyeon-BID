# Songhyeon Map & Activities 데이터 스테이징

이 디렉터리는 `260804_songhyeon_bid_dashboard_v1.1.html`의 `<script id="dashboard-data">`에 내장된 JSON을 검토·이관하기 위한 **참조용 스테이징 영역**입니다. 파일들은 `src` 런타임 번들에 포함하지 않으며, 원본 HTML이나 Supabase/IOTA 데이터베이스를 변경하지 않습니다.

## 재생성

기본 다운로드 경로의 원본을 사용할 때:

```bash
node scripts/extract-songhyeon-map-activities.mjs
node scripts/build-songhyeon-map-data.mjs
```

원본 경로를 명시할 때:

```bash
node scripts/extract-songhyeon-map-activities.mjs \
  --source /Users/jkjeon2025/Downloads/260804_songhyeon_bid_dashboard_v1.1.html
```

`SONGHYEON_MAP_DASHBOARD_SOURCE` 환경 변수도 사용할 수 있습니다. 출력 위치는 이 디렉터리로 고정되어 있어 다른 프로젝트나 IOTA 경로에 쓰지 않습니다.

### v1.2 호텔 추가 데이터

v1.2에서 새로 추가된 호텔 데이터만 갱신할 때는 별도 생성기를 사용합니다. 이 명령은 v1.2의 기존 21개 데이터셋이 v1.1 참조본과 동일한지 먼저 검증하고, `hotels`와 `hotel_display_audit`만 `hotel/` 아래에 추출합니다.

```bash
node scripts/build-songhyeon-hotel-data.mjs \
  --source /Users/jkjeon2025/Downloads/260814_songhyeon_bid_dashboard_v1.2.html
```

추출된 참조본으로 런타임 파일만 다시 만들 때는 다음 명령을 사용합니다.

```bash
npm run build:hotel-data
```

전체 런타임을 재생성하는 `npm run build:map-data`도 기존 6개 묶음을 만든 뒤 호텔 묶음을 덧붙입니다. 기본 manifest의 `bundles` 6개, `datasets` 21개, `summary` 값은 유지하고 호텔의 1개 묶음과 2개 데이터셋 provenance는 `additions.hotel`에만 기록합니다.

## 산출물

- `manifest.json`: 원본/내장 JSON SHA-256, 데이터셋 수, 데이터셋별 레코드 수·필드·ID 중복·파일 SHA-256
- `datasets/<dataset>.json`: 최상위 JSON 키별로 분리한 정렬·포맷된 데이터
- `public/map-activities/data/manifest.json`: 브라우저에서 화면별로 지연 로딩하는 전체 런타임 데이터 목록
- `public/map-activities/data/*.json`: 21개 데이터셋을 값 손실 없이 분리한 6개 런타임 묶음. 점포 10,571건은 별도 `stores.json`으로 로딩합니다.
- `hotel/manifest.json`, `hotel/datasets/*.json`: v1.2에서 분리한 호텔 266건과 표시 감사값의 참조본
- `public/map-activities/data/hotel.json`: 호텔 화면에서만 지연 로딩하는 독립 런타임 묶음

런타임 묶음은 원본 21개 데이터셋, 합산 12,102개 레코드의 모든 필드와 값을 그대로 유지합니다. 화면에서는 지도 성능을 위해 좌표를 묶거나 표를 페이지로 나누어 렌더링할 수 있지만, 저장 데이터와 검색·상세 접근 범위는 줄이지 않습니다. `manifest.json`의 `sourceSha256`과 `runtimeValueSha256`가 데이터셋별로 일치하는지 생성 스크립트가 매번 검증합니다.

원본 전체 HTML은 복사하지 않습니다. 스크립트는 객체 키를 정렬하고 생성 시각 같은 가변 값을 기록하지 않으므로, 동일한 원본으로 재실행하면 산출물 바이트와 해시가 동일합니다. `source.modifiedAt`은 실행 시각이 아니라 원본 파일의 수정 시각입니다.

## Manifest 해석

- 배열 데이터셋은 배열 자체(`recordPath: "$"`)를 레코드로 계산합니다.
- GeoJSON 형태는 `features`(`recordPath: "$.features"`)를 계산합니다.
- `records` 배열을 가진 객체는 해당 배열(`recordPath: "$.records"`)을 계산합니다.
- 그 밖의 객체는 최상위 값(`recordPath: "$.*"`)을 레코드로 계산합니다.
- `fields`는 계산 대상 레코드의 직접 필드 합집합입니다.
- `containerFields`는 객체형 데이터셋의 최상위 키입니다.
- `idFields`는 레코드의 직접 필드 중 `id` 또는 `_id`로 끝나는 스칼라 필드별 채움/누락/고유/중복 현황입니다.

이 데이터는 원본 구조를 보존한 이관 후보입니다. 제품 코드나 송현 전용 Supabase 테이블에 반영하기 전에는 데이터셋별 의미, 좌표·출처, 중복 ID 및 개인정보 포함 여부를 별도로 검토해야 합니다.
