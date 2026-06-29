import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const FormsScenarioPage = lazy(() => import("./pages/FormsScenarioPage"));
const MonitoringSetupPage = lazy(() => import("./pages/MonitoringSetupPage"));
const PerivioFdPage = lazy(() => import("./pages/PerivioFdPage"));
const WorkflowScenarioPage = lazy(() => import("./pages/WorkflowScenarioPage"));

const navItems = [
  { path: "/forms", title: "Forms" },
  { path: "/monitoring-setup", title: "Monitoring Setup" },
  { path: "/monitoring", title: "Monitoring" },
  { path: "/workflow", title: "Workflow" },
];

const scenarios = [
  {
    path: "/forms",
    title: "Patient Intake Form",
    description: "검색, 선택, 검증, 체크박스가 섞인 입력 중심 업무 화면",
    focus: "폼 밀도와 검증 UX",
  },
  {
    path: "/monitoring-setup",
    title: "Monitoring Setup",
    description: "모니터링 시작, 환자 ID 입력, 임계값 설정 화면을 디자인 시스템별로 비교",
    focus: "설정 플로우와 터치 입력",
  },
  {
    path: "/monitoring",
    title: "Perivio FD Monitoring",
    description: "태아심박동 모니터링 화면을 안전/위험 상태와 디자인 시스템별로 비교",
    focus: "장비 UI와 디자인 시스템 톤",
  },
  {
    path: "/workflow",
    title: "Alert Workflow",
    description: "위험 알림 확인, 담당자 배정, 조치 완료로 이어지는 업무 흐름",
    focus: "상태 전환과 액션 계층",
  },
];

function HomePage() {
  return (
    <section className="home-page">
      <div className="home-hero">
        <p className="eyebrow">Design System References</p>
        <h2>같은 의료 업무 화면으로 비교하는 UI 레퍼런스</h2>
        <p>
          Spectrum, Carbon, Mantine을 라이브러리별로 따로 보는 대신, 같은
          시나리오 안에서 나란히 비교합니다. 팀원이 실제 제품 화면을 만들 때
          어떤 라이브러리가 더 잘 맞는지 판단하기 위한 구조입니다.
        </p>
      </div>

      <div className="scenario-card-grid">
        {scenarios.map((scenario) => (
          <NavLink
            key={scenario.path}
            to={scenario.path}
            className="scenario-card"
          >
            <span>{scenario.focus}</span>
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
          </NavLink>
        ))}
      </div>

      <div className="comparison-summary">
        <h3>비교 기준</h3>
        <div className="summary-grid">
          <span>기본 완성도</span>
          <span>업무 화면 밀도</span>
          <span>상태 표현</span>
          <span>커스터마이징 부담</span>
          <span>테이블/폼 품질</span>
          <span>제품 톤 적합성</span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="brand">Design System References</p>
          <h1>Scenario Comparison Lab</h1>
        </div>
        <nav className="main-nav">
          <NavLink to="/" end className="nav-link">
            홈
          </NavLink>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="nav-link">
              {item.title}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-content">
        <Suspense
          fallback={<p className="page-loading">페이지를 불러오는 중입니다.</p>}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forms" element={<FormsScenarioPage />} />
            <Route path="/monitoring-setup" element={<MonitoringSetupPage />} />
            <Route path="/monitoring" element={<PerivioFdPage />} />
            <Route path="/workflow" element={<WorkflowScenarioPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
