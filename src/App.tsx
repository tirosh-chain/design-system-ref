import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const FormsScenarioPage = lazy(() => import("./pages/FormsScenarioPage"));
const MonitoringScenarioPage = lazy(
  () => import("./pages/MonitoringScenarioPage"),
);
const WorkflowScenarioPage = lazy(() => import("./pages/WorkflowScenarioPage"));

const navItems = [
  { path: "/forms", title: "Forms" },
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
    path: "/monitoring",
    title: "Monitoring Data Table",
    description: "상태 요약, 진행률, 환자 리스트가 필요한 운영 대시보드",
    focus: "데이터 가독성과 반복 업무",
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
            <Route path="/monitoring" element={<MonitoringScenarioPage />} />
            <Route path="/workflow" element={<WorkflowScenarioPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
