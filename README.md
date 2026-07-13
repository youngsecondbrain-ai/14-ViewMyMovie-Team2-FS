# MovieFun:D

MovieFun:D는 영화 크라우드 펀딩을 주제로 만든 팀 프로젝트입니다. 사용자가 영화 목록을 둘러보고, 관심 있는 영화에 펀딩하거나 기대작을 비교해볼 수 있는 서비스를 목표로 합니다.

이 README는 팀원이 프로젝트를 처음 내려받았을 때 필요한 내용을 빠르게 확인할 수 있도록 정리한 문서입니다. 로컬 실행 방법, 브랜치 전략, 커밋 규칙, 폴더 구조를 한곳에서 확인할 수 있습니다.

## 기술 스택

| 영역         | 기술                                 |
| ------------ | ------------------------------------ |
| Frontend     | React, Vite, React Router, plain CSS |
| Backend      | Express                              |
| Database     | PostgreSQL                           |
| ORM          | Prisma                               |
| Validation   | Superstruct                          |
| Code Quality | ESLint, Prettier                     |
| Git Hooks    | Husky, Commitlint                    |
| Deployment   | Netlify, Render                      |
| CI           | GitHub Actions                       |

## 시작하기

프로젝트를 처음 실행할 때는 아래 순서대로 진행합니다.

### 요구 사항

- Node.js 22
- npm
- PostgreSQL
- Git

Node.js 버전은 `.nvmrc`로 맞춥니다. nvm을 사용한다면 아래 명령어를 먼저 실행합니다.

```bash
nvm install
nvm use
```

### 설치

```bash
git clone https://github.com/codeit-fs14-part2-team1/14-MovieFunD-Team2-FS.git movie-fun-d
cd movie-fun-d
npm install
```

환경 변수 파일을 준비합니다.

```bash
cp .env.example .env
```

`.env` 파일의 `DATABASE_URL`은 각자 로컬 PostgreSQL 환경에 맞게 수정합니다. 실제 `.env` 파일은 민감한 정보를 포함할 수 있으므로 커밋하지 않습니다.

### 데이터베이스 준비

```bash
npm run prisma:generate
npm run prisma:migrate
```

데이터를 직접 확인하고 싶을 때는 Prisma Studio를 사용할 수 있습니다.

```bash
npm run prisma:studio
```

### 로컬 실행

프론트엔드와 백엔드 개발 서버를 함께 실행합니다. 프론트엔드는 Vite 개발 서버로, 백엔드는 Node.js의 watch 모드로 실행되어 파일 변경 시 자동으로 반영됩니다.

```bash
npm run dev
```

각 서버를 개별적으로 실행하려면 아래 명령어를 사용합니다.

```bash
npm run dev:fe
npm run dev:be
```

`npm run start`는 watch 모드 없이 Express 백엔드 서버만 실행하는 배포용 명령어입니다.

기본 포트는 다음과 같습니다.

| 서버         | 주소                           |
| ------------ | ------------------------------ |
| Frontend     | `http://localhost:5173`        |
| Backend      | `http://localhost:3000`        |
| Health Check | `http://localhost:3000/health` |

## 환경 변수

`.env.example`을 기준으로 프로젝트 루트에 `.env`를 생성합니다. Express와 Prisma뿐 아니라 Vite도 루트의 환경 변수 파일을 사용하며, 프론트엔드 코드에는 `VITE_` 접두사가 붙은 변수만 노출됩니다.

| 이름            | 설명                                  |
| --------------- | ------------------------------------- |
| `PORT`          | Express 서버 포트                     |
| `CLIENT_ORIGIN` | CORS에서 허용할 프론트엔드 주소       |
| `VITE_API_URL`  | 프론트엔드에서 사용할 백엔드 API 주소 |
| `DATABASE_URL`  | PostgreSQL 연결 문자열                |

## 주요 명령어

| 명령어                    | 설명                                     |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | 프론트엔드와 백엔드 개발 서버 동시 실행  |
| `npm run dev:fe`          | Vite 프론트엔드 개발 서버만 실행         |
| `npm run dev:be`          | watch 모드로 Express 백엔드 서버만 실행  |
| `npm run build`           | 프론트엔드 프로덕션 빌드                 |
| `npm run preview`         | 프론트엔드 빌드 결과 미리보기            |
| `npm run start`           | watch 모드 없이 Express 백엔드 서버 실행 |
| `npm run lint`            | ESLint 검사                              |
| `npm run lint:fix`        | ESLint 자동 수정                         |
| `npm run format`          | Prettier로 전체 포맷팅                   |
| `npm run format:check`    | Prettier 포맷 검사                       |
| `npm run prisma:generate` | Prisma Client 생성                       |
| `npm run prisma:migrate`  | Prisma 개발 마이그레이션 실행            |
| `npm run prisma:studio`   | Prisma Studio 실행                       |
| `npm run precommit`       | 커밋 대상 파일에 lint-staged 실행        |

## 폴더 구조

현재 프로젝트는 프론트엔드와 백엔드를 분리해서 관리합니다.

```txt
movie-fun-d/
  frontend/
    public/
    src/
      app/
      assets/
        images/
      features/
        comparison/
          api/
          components/
          hooks/
          styles/
        funding/
          api/
          components/
          hooks/
          styles/
        movies/
          api/
          components/
          hooks/
          styles/
      pages/
      shared/
        components/
        constants/
        hooks/
        lib/
        styles/
        utils/

  backend/
    prisma/
      migrations/
      seed-data/
    src/
      config/
      controllers/
      middlewares/
      routes/
      services/
      utils/
      validators/

  .github/
    workflows/

  .husky/
```

### Frontend

- `frontend/src/app`: 앱의 최상위 컴포넌트
- `frontend/src/pages`: 라우트별 페이지 컴포넌트
- `frontend/src/shared`: 여러 페이지에서 재사용하는 공통 코드
- `frontend/src/features`: 영화, 펀딩, 비교 도메인별 API, 컴포넌트, 훅, 스타일

### Backend

- `backend/src`: Express 백엔드 애플리케이션 코드
- `backend/src/config`: Prisma Client 등 공통 설정
- `backend/src/routes`: API 라우터
- `backend/src/controllers`: 요청과 응답 처리
- `backend/src/middlewares`: Express 미들웨어
- `backend/src/services`: 비즈니스 로직
- `backend/src/utils`: 백엔드 공통 유틸리티
- `backend/src/validators`: Superstruct 기반 검증 로직
- `backend/prisma`: Prisma 스키마, 마이그레이션, 시드 관련 구성
- `backend/prisma/migrations`: 데이터베이스 마이그레이션 이력
- `backend/prisma/seed-data`: 영화와 펀딩 더미 데이터

현재 기본 API는 `/health`입니다.

## 데이터 모델

현재 Prisma에는 다음 모델이 정의되어 있습니다.

| 모델      | 설명                    |
| --------- | ----------------------- |
| `Movie`   | 펀딩 대상 영화 정보     |
| `Funding` | 사용자의 영화 펀딩 정보 |

`Movie`와 `Funding`은 관계를 가지며, 영화가 삭제되어도 기존 펀딩 기록은 남을 수 있도록 `onDelete: SetNull`이 설정되어 있습니다.

## 브랜치 전략

팀 개발은 `develop`을 중심으로 진행합니다. 각자 작업 브랜치를 만든 뒤 PR을 통해 `develop`에 반영하고, 배포가 필요할 때만 `develop`에서 `main`으로 올립니다.

| 브랜치    | 용도                          |
| --------- | ----------------------------- |
| `main`    | 프로덕션 배포 브랜치          |
| `develop` | 팀 개발 통합 브랜치           |
| `feat/*`  | 기능 개발                     |
| `fix/*`   | 버그 수정                     |
| `chore/*` | 설정, 패키지, 문서, 정리 작업 |
| `docs/*`  | 문서 작업                     |

기능 작업은 `develop`에서 새 브랜치를 만들어 진행하고, PR과 리뷰를 거쳐 병합합니다. `develop`으로는 squash merge, `main`으로는 merge commit을 사용합니다.

## Pull Request 규칙

- `main`과 `develop`에는 직접 push하지 않습니다.
- PR은 리뷰하기 쉬운 크기로 나누어 작성합니다.
- UI 변경이 있다면 스크린샷을 첨부합니다.
- 환경 변수가 추가되면 `.env.example`을 함께 수정합니다.

## 커밋 메시지 규칙

이 프로젝트는 Commitlint를 사용하므로 커밋 메시지는 Conventional Commits 형식을 따릅니다.

```txt
type: short description
```

예시:

```txt
feat: add movie list page
fix: handle missing funding amount
docs: update local setup guide
chore: configure eslint and prettier
```

## Husky와 Commitlint

Husky는 커밋 전에 기본 검사를 실행해서, 자주 생기는 실수를 로컬에서 먼저 잡아줍니다.

현재 설정:

| Hook         | 실행 내용                     |
| ------------ | ----------------------------- |
| `pre-commit` | `npm run precommit` 실행      |
| `commit-msg` | Commitlint로 커밋 메시지 검사 |

`pre-commit`에서는 lint-staged를 사용해서 커밋 대상 파일만 검사하고, 필요한 경우 자동 수정합니다. 커밋이 실패하면 터미널 메시지를 확인한 뒤 수정해서 다시 커밋합니다.

작업 전후로 아래 명령어를 실행해보면 PR 전에 문제를 줄이는 데 도움이 됩니다.

```bash
npm run lint
npm run format:check
npm run build
```

## 배포

배포 대상:

- Frontend: Netlify
- Backend: Render

예정 브랜치 정책:

- `main`에 병합되면 프로덕션 배포
- PR 생성 시 Netlify, Render preview deployment 활용

Prisma 마이그레이션은 `develop`과 `main`에 병합되면 GitHub Actions에서 자동으로 실행합니다. Netlify와 Render 설정은 현재 각 서비스의 Dashboard에서 관리합니다.
