import {
  Flex as SpectrumFlex,
  Heading as SpectrumHeading,
  Provider as SpectrumProvider,
  StatusLight,
  Text as SpectrumText,
  View as SpectrumView,
  defaultTheme,
} from "@adobe/react-spectrum";
import { Tag, Tile } from "@carbon/react";
import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";

type TraceColor = "cyan" | "blue" | "magenta";
type RiskTone = "stable" | "critical";
type MonitoringState = {
  stateLabel: string;
  device: string;
  risk: string;
  riskTone: RiskTone;
  traces: {
    label: string;
    unit: string;
    value: string;
    color: TraceColor;
    path: string;
  }[];
};
type MonitoringVariant = "spectrum" | "carbon" | "mantine";

const monitoringStates: MonitoringState[] = [
  {
    stateLabel: "안전 화면",
    device: "Device device_1",
    risk: "20.9%",
    riskTone: "stable",
    traces: [
      {
        label: "FHR",
        unit: "bpm",
        value: "143",
        color: "cyan",
        path: "M0 58 C34 54 54 48 70 36 S102 58 130 54 S180 60 220 58 S278 60 314 50 S346 34 366 48 S420 63 470 58 S526 58 610 48",
      },
      {
        label: "TOCO",
        unit: "mmHg",
        value: "7",
        color: "blue",
        path: "M0 94 C36 94 48 82 62 46 S95 93 140 94 S274 98 326 92 S370 28 406 88 S454 96 610 94",
      },
      {
        label: "NCA3",
        unit: "AVG %",
        value: "22",
        color: "magenta",
        path: "M250 72 C270 68 286 76 304 72 S340 73 366 72 S402 70 430 72 S474 74 506 78 S560 80 610 76",
      },
    ],
  },
  {
    stateLabel: "위험 화면",
    device: "Device device_1",
    risk: "78%",
    riskTone: "critical",
    traces: [
      {
        label: "FHR",
        unit: "bpm",
        value: "151",
        color: "cyan",
        path: "M0 48 C46 44 76 38 102 44 S162 70 210 58 S280 32 324 48 S392 76 438 52 S520 42 610 46",
      },
      {
        label: "TOCO",
        unit: "mmHg",
        value: "11",
        color: "blue",
        path: "M0 92 C54 92 70 42 98 34 S134 88 190 92 S282 92 326 30 S380 88 430 94 S510 52 610 90",
      },
      {
        label: "NCA3",
        unit: "AVG %",
        value: "78",
        color: "magenta",
        path: "M110 72 C150 68 184 76 228 72 S304 64 356 70 S430 84 486 76 S550 70 610 72",
      },
    ],
  },
];

const summaries = {
  safe: "안전 20.9%",
  risk: "위험 78%",
};

function Waveform({ path, color }: { path: string; color: TraceColor }) {
  return (
    <svg className="fd-waveform" viewBox="0 0 610 120" aria-hidden="true">
      <path className="fd-wave-grid" d="M0 30 H610 M0 60 H610 M0 90 H610" />
      <path className={`fd-wave-line ${color}`} d={path} />
    </svg>
  );
}

function MonitoringScreen({
  variant,
  stateLabel,
  device,
  risk,
  riskTone,
  traces,
}: MonitoringState & { variant: MonitoringVariant }) {
  const isStable = riskTone === "stable";

  return (
    <div className="fd-screen-frame">
      <div className={`fd-state-chip fd-state-${riskTone}`}>
        {variant === "spectrum" ? (
          <StatusLight variant={isStable ? "positive" : "negative"}>{stateLabel}</StatusLight>
        ) : variant === "carbon" ? (
          <Tag type={isStable ? "green" : "red"}>{stateLabel}</Tag>
        ) : (
          <Badge color={isStable ? "green" : "red"}>{stateLabel}</Badge>
        )}
      </div>
      <div className="fd-screen-scroll">
        <article className={`fd-monitor-screen fd-risk-${riskTone}`}>
          <header className="fd-screen-header">
            <h3>{device}</h3>
          </header>
          <div className="fd-screen-body">
            <section className="fd-risk-panel">
              <span className="fd-risk-value">{risk}</span>
            </section>
            <section className="fd-trace-list" aria-label={`${device} ${stateLabel} charts`}>
              {traces.map((trace) => (
                <div className="fd-trace-row" key={trace.label}>
                  <div className="fd-trace-label">{trace.label}</div>
                  <Waveform path={trace.path} color={trace.color} />
                  <div className={`fd-trace-value ${trace.color}`}>
                    <small>{trace.unit}</small>
                    <strong>{trace.value}</strong>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

function StateStack({ variant }: { variant: MonitoringVariant }) {
  return (
    <div className={`fd-state-stack fd-variant-${variant}`}>
      {monitoringStates.map((state) => (
        <MonitoringScreen key={`${variant}-${state.stateLabel}`} variant={variant} {...state} />
      ))}
    </div>
  );
}

export default function PerivioFdPage() {
  return (
    <section className="scenario-page perivio-page">
      <div className="scenario-heading">
        <p className="eyebrow">Scenario 04</p>
        <h2>Perivio FD</h2>
        <p>
          실제 운영 가능성이 높은 가로형 모니터링 비율을 유지한 채, 같은 안전
          화면과 위험 화면을 Spectrum, Carbon, Mantine 세 가지 스타일로
          비교합니다.
        </p>
      </div>

      <div className="perivio-stack">
        <SpectrumProvider theme={defaultTheme} colorScheme="dark">
          <SpectrumView
            borderWidth="thin"
            borderColor="gray-300"
            borderRadius="medium"
            padding="size-300"
            backgroundColor="gray-50"
          >
            <SpectrumFlex direction="column" gap="size-200">
              <div className="fd-section-header">
                <div>
                  <div className="library-label fd-label">Spectrum</div>
                  <SpectrumHeading level={3}>모니터링 화면</SpectrumHeading>
                </div>
                <SpectrumFlex gap="size-150" wrap>
                  <StatusLight variant="positive">{summaries.safe}</StatusLight>
                  <StatusLight variant="negative">{summaries.risk}</StatusLight>
                </SpectrumFlex>
              </div>
              <StateStack variant="spectrum" />
              <SpectrumText>
                Spectrum은 부드러운 경계, 낮은 시각 소음, 균일한 정보 리듬으로
                장비 판독 화면을 차분하게 정돈합니다.
              </SpectrumText>
            </SpectrumFlex>
          </SpectrumView>
        </SpectrumProvider>

        <Tile className="comparison-panel carbon-panel fd-carbon-panel fd-system-section">
          <div className="fd-section-header">
            <div>
              <div className="library-label fd-label">Carbon</div>
              <h3>모니터링 화면</h3>
            </div>
            <div className="fd-tag-row">
              <Tag type="green">{summaries.safe}</Tag>
              <Tag type="red">{summaries.risk}</Tag>
            </div>
          </div>
          <StateStack variant="carbon" />
          <p className="panel-note">
            Carbon은 각진 패널, 선명한 구획, 고대비 수치 표현으로 운영 콘솔에
            가까운 단단한 판독감을 보여줍니다.
          </p>
        </Tile>

        <Card className="comparison-panel mantine-panel fd-mantine-panel fd-system-section" padding="lg" radius="md">
          <Stack gap="md">
            <Group justify="space-between" align="start">
              <div>
                <div className="library-label fd-label">Mantine</div>
                <Title order={3}>모니터링 화면</Title>
              </div>
              <Group gap="xs">
                <Badge color="green">{summaries.safe}</Badge>
                <Badge color="red">{summaries.risk}</Badge>
              </Group>
            </Group>
            <StateStack variant="mantine" />
            <Text size="sm" c="dimmed">
              Mantine은 rounded card, 은은한 depth, 선명한 accent color로 현대적인
              실시간 대시보드 톤을 빠르게 만들기 좋습니다.
            </Text>
          </Stack>
        </Card>
      </div>
    </section>
  );
}
