import { useState } from "react";
import {
  ActionButton as SpectrumActionButton,
  Button as SpectrumButton,
  Flex as SpectrumFlex,
  Heading as SpectrumHeading,
  Provider as SpectrumProvider,
  StatusLight,
  Text as SpectrumText,
  View as SpectrumView,
  defaultTheme,
} from "@adobe/react-spectrum";
import {
  Button as CarbonButton,
  Tag,
  Tile,
} from "@carbon/react";
import {
  ActionIcon,
  Badge,
  Button as MantineButton,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

type SetupVariant = "spectrum" | "carbon" | "mantine";
type SetupOverlay = "patient" | "threshold" | null;

const keyboardRows = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["shift", "z", "x", "c", "v", "b", "n", "m", "back"],
];

const keypadKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "back"];

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fd-setup-icon">
      <path d="M4 10v4h4l5 4V6L8 10H4Z" />
      <path d="M16 9c1.2 1.2 1.2 4.8 0 6" />
      <path d="M18.5 6.5c3 3 3 8 0 11" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fd-setup-icon">
      <path d="M15 6 9 12l6 6" />
    </svg>
  );
}

function clampVolume(value: number) {
  return Math.min(100, Math.max(0, value));
}

function VolumeTrack({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const percent = `${value}%`;

  return (
    <div className="fd-volume-track" style={{ "--fd-volume": percent } as React.CSSProperties}>
      <span className="fd-volume-fill" />
      <span className="fd-volume-thumb" />
      <input
        aria-label="알람 볼륨"
        className="fd-volume-range"
        max={100}
        min={0}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        type="range"
        value={value}
      />
    </div>
  );
}

function ScreenShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <article className={`fd-setup-screen ${className}`}>{children}</article>;
}

function LibraryActionButton({
  variant,
  tone,
  children,
  onPress,
}: {
  variant: SetupVariant;
  tone: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const className =
    tone === "primary"
      ? "fd-primary-action"
      : tone === "danger"
        ? "fd-danger-action"
        : "fd-secondary-action";

  if (variant === "spectrum") {
    return (
      <SpectrumButton
        UNSAFE_className={className}
        variant={tone === "primary" ? "accent" : tone === "danger" ? "negative" : "secondary"}
        style={tone === "secondary" ? "outline" : "fill"}
        onPress={onPress}
      >
        {children}
      </SpectrumButton>
    );
  }

  if (variant === "carbon") {
    return (
      <CarbonButton
        className={className}
        kind={tone === "primary" ? "primary" : tone === "danger" ? "danger" : "secondary"}
        size="lg"
        type="button"
        onClick={onPress}
      >
        {children}
      </CarbonButton>
    );
  }

  return (
    <MantineButton
      className={className}
      color={tone === "danger" ? "red" : "blue"}
      variant={tone === "secondary" ? "default" : "filled"}
      onClick={onPress}
    >
      {children}
    </MantineButton>
  );
}

function LibraryKey({
  variant,
  className = "",
  children,
  onPress,
}: {
  variant: SetupVariant;
  className?: string;
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const keyClassName = `fd-key-button ${className}`.trim();

  if (variant === "spectrum") {
    return (
      <SpectrumActionButton UNSAFE_className={keyClassName} onPress={onPress}>
        {children}
      </SpectrumActionButton>
    );
  }

  if (variant === "carbon") {
    return (
      <CarbonButton className={keyClassName} kind="tertiary" size="lg" type="button" onClick={onPress}>
        {children}
      </CarbonButton>
    );
  }

  return (
    <MantineButton className={keyClassName} variant="default" type="button" onClick={onPress}>
      {children}
    </MantineButton>
  );
}

function PatientIdField({
  variant,
  onPatientInput,
}: {
  variant: SetupVariant;
  onPatientInput: () => void;
}) {
  if (variant === "spectrum") {
    return (
      <div className="fd-patient-field fd-spectrum-field">
        <span className="fd-field-label">
          환자 ID <b>*</b>
        </span>
        <SpectrumActionButton UNSAFE_className="fd-patient-trigger" onPress={onPatientInput}>
          터치하여 입력
        </SpectrumActionButton>
      </div>
    );
  }

  if (variant === "carbon") {
    return (
      <div className="fd-patient-field">
        <span className="fd-field-label">
          환자 ID <b>*</b>
        </span>
        <CarbonButton className="fd-patient-trigger" kind="tertiary" size="lg" type="button" onClick={onPatientInput}>
          터치하여 입력
        </CarbonButton>
      </div>
    );
  }

  return (
    <div className="fd-patient-field">
      <span className="fd-field-label">
        환자 ID <b>*</b>
      </span>
      <MantineButton className="fd-patient-trigger" variant="default" onClick={onPatientInput}>
        터치하여 입력
      </MantineButton>
    </div>
  );
}

function ThresholdField({
  variant,
  onThresholdInput,
}: {
  variant: SetupVariant;
  onThresholdInput: () => void;
}) {
  if (variant === "spectrum") {
    return (
      <SpectrumFlex
        UNSAFE_className="fd-library-inline fd-spectrum-inline"
        alignItems="center"
        justifyContent="space-between"
        gap="size-200"
      >
        <SpectrumText>임계값</SpectrumText>
        <SpectrumActionButton UNSAFE_className="fd-percent-button" onPress={onThresholdInput}>
          30%
        </SpectrumActionButton>
      </SpectrumFlex>
    );
  }

  if (variant === "carbon") {
    return (
      <div className="fd-library-inline">
        <span>임계값</span>
        <CarbonButton className="fd-percent-button" kind="tertiary" size="md" type="button" onClick={onThresholdInput}>
          30%
        </CarbonButton>
      </div>
    );
  }

  return (
    <div className="fd-library-inline">
      <span>임계값</span>
      <MantineButton className="fd-percent-button" variant="light" color="blue" onClick={onThresholdInput}>
        30%
      </MantineButton>
    </div>
  );
}

function VolumeField({
  variant,
  value,
  onChange,
}: {
  variant: SetupVariant;
  value: number;
  onChange: (value: number) => void;
}) {
  const decrease = () => onChange(clampVolume(value - 5));
  const increase = () => onChange(clampVolume(value + 5));

  if (variant === "spectrum") {
    return (
      <div className="fd-volume-library">
        <SpectrumText>알람 볼륨</SpectrumText>
        <SpectrumFlex UNSAFE_className="fd-volume-row" alignItems="center" gap="size-150">
          <SpectrumActionButton UNSAFE_className="fd-icon-button" aria-label="볼륨 낮추기" onPress={decrease}>−</SpectrumActionButton>
          <VolumeIcon />
          <VolumeTrack value={value} onChange={onChange} />
          <strong>{value}</strong>
          <SpectrumActionButton UNSAFE_className="fd-icon-button" aria-label="볼륨 높이기" onPress={increase}>＋</SpectrumActionButton>
        </SpectrumFlex>
      </div>
    );
  }

  if (variant === "carbon") {
    return (
      <div className="fd-volume-library">
        <span>알람 볼륨</span>
        <div className="fd-volume-row fd-volume-carbon">
          <CarbonButton className="fd-icon-button" kind="tertiary" size="md" type="button" onClick={decrease}>
            −
          </CarbonButton>
          <VolumeIcon />
          <VolumeTrack value={value} onChange={onChange} />
          <strong>{value}</strong>
          <CarbonButton className="fd-icon-button" kind="tertiary" size="md" type="button" onClick={increase}>
            ＋
          </CarbonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="fd-volume-library">
      <span>알람 볼륨</span>
      <Group className="fd-volume-row" gap="sm" align="center" wrap="nowrap">
        <ActionIcon className="fd-icon-button" variant="default" size="lg" aria-label="볼륨 낮추기" onClick={decrease}>
          −
        </ActionIcon>
        <VolumeIcon />
        <VolumeTrack value={value} onChange={onChange} />
        <strong>{value}</strong>
        <ActionIcon className="fd-icon-button" variant="default" size="lg" aria-label="볼륨 높이기" onClick={increase}>
          ＋
        </ActionIcon>
      </Group>
    </div>
  );
}

function StartScreen({
  variant,
  volume,
  onVolumeChange,
  onPatientInput,
  onThresholdInput,
}: {
  variant: SetupVariant;
  volume: number;
  onVolumeChange: (value: number) => void;
  onPatientInput: () => void;
  onThresholdInput: () => void;
}) {
  return (
    <ScreenShell className="fd-setup-start">
      <header className="fd-setup-topbar">
        <span className="fd-back-link">
          <BackIcon />
          뒤로
        </span>
        <h3>분만실 태아심박동 감소 모니터링</h3>
      </header>
      <section className="fd-setup-card">
        <PatientIdField variant={variant} onPatientInput={onPatientInput} />
        <div className="fd-divider" />
        <ThresholdField variant={variant} onThresholdInput={onThresholdInput} />
        <div className="fd-divider" />
        <VolumeField variant={variant} value={volume} onChange={onVolumeChange} />
        <div className="fd-action-row">
          <LibraryActionButton variant={variant} tone="secondary">취소</LibraryActionButton>
          <LibraryActionButton variant={variant} tone="primary">시작</LibraryActionButton>
        </div>
      </section>
    </ScreenShell>
  );
}

function PatientKeyboardScreen({
  variant,
  onClose,
}: {
  variant: SetupVariant;
  onClose: () => void;
}) {
  return (
    <ScreenShell className="fd-setup-keyboard">
      <header className="fd-modal-header">
        <h3>환자 ID</h3>
        <LibraryKey variant={variant} className="fd-close-key" onPress={onClose}>×</LibraryKey>
      </header>
      <div className="fd-keyboard-input">|</div>
      <div className="fd-qwerty">
        {keyboardRows.map((row) => (
          <div className="fd-qwerty-row" key={row.join("")}>
            {row.map((key) => (
              <LibraryKey
                variant={variant}
                className={key === "shift" || key === "back" ? "wide" : ""}
                key={key}
              >
                {key === "shift" ? "↑" : key === "back" ? "⌫" : key}
              </LibraryKey>
            ))}
          </div>
        ))}
      </div>
      <div className="fd-action-row">
        <LibraryActionButton variant={variant} tone="danger">초기화</LibraryActionButton>
        <LibraryActionButton variant={variant} tone="primary" onPress={onClose}>확인</LibraryActionButton>
      </div>
    </ScreenShell>
  );
}

function ThresholdKeypadScreen({
  variant,
  onClose,
}: {
  variant: SetupVariant;
  onClose: () => void;
}) {
  return (
    <ScreenShell className="fd-setup-keypad">
      <header className="fd-keypad-value">
        <div>
          <span>임계값 (0~100)</span>
          <strong>
            30 <small>%</small>
          </strong>
        </div>
        <LibraryKey variant={variant} className="fd-close-key" onPress={onClose}>×</LibraryKey>
      </header>
      <div className="fd-keypad-grid">
        {keypadKeys.map((key) => (
          <LibraryKey
            variant={variant}
            className={key === "C" || key === "back" ? "accent" : ""}
            key={key}
          >
            {key === "back" ? "⌫" : key}
          </LibraryKey>
        ))}
      </div>
      <div className="fd-action-row">
        <LibraryActionButton variant={variant} tone="secondary" onPress={onClose}>취소</LibraryActionButton>
        <LibraryActionButton variant={variant} tone="primary" onPress={onClose}>적용</LibraryActionButton>
      </div>
    </ScreenShell>
  );
}

function SetupScreens({ variant }: { variant: SetupVariant }) {
  const [overlay, setOverlay] = useState<SetupOverlay>(null);
  const [volume, setVolume] = useState(50);

  return (
    <div className={`fd-setup-interactive fd-variant-${variant}`}>
      <StartScreen
        variant={variant}
        volume={volume}
        onVolumeChange={(nextVolume) => setVolume(clampVolume(nextVolume))}
        onPatientInput={() => setOverlay("patient")}
        onThresholdInput={() => setOverlay("threshold")}
      />
      {overlay ? (
        <div className="fd-setup-overlay" role="dialog" aria-modal="true">
          {overlay === "patient" ? (
            <PatientKeyboardScreen variant={variant} onClose={() => setOverlay(null)} />
          ) : (
            <ThresholdKeypadScreen variant={variant} onClose={() => setOverlay(null)} />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function MonitoringSetupPage() {
  return (
    <section className="scenario-page perivio-page">
      <div className="scenario-heading">
        <p className="eyebrow">Scenario 05</p>
        <h2>Monitoring Setup</h2>
        <p>
          모니터링 시작, 환자 ID 입력, 임계값 변경 화면을 같은 조건으로 두고
          Spectrum, Carbon, Mantine 스타일의 차이를 비교합니다.
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
                  <SpectrumHeading level={3}>모니터링 설정</SpectrumHeading>
                </div>
                <StatusLight variant="info">차분한 설정 흐름</StatusLight>
              </div>
              <SetupScreens variant="spectrum" />
              <SpectrumText>
                Spectrum은 여백, 부드러운 grouping, 낮은 시각 소음으로 설정 흐름을
                차분하게 정돈하는 방향입니다.
              </SpectrumText>
            </SpectrumFlex>
          </SpectrumView>
        </SpectrumProvider>

        <Tile className="comparison-panel carbon-panel fd-carbon-panel fd-system-section">
          <div className="fd-section-header">
            <div>
              <div className="library-label fd-label">Carbon</div>
              <h3>모니터링 설정</h3>
            </div>
            <Tag type="blue">운영 장비 설정</Tag>
          </div>
          <SetupScreens variant="carbon" />
          <p className="panel-note">
            Carbon은 각진 field, 선명한 구획, 강한 primary action으로 운영 장비
            설정 업무감을 강조합니다.
          </p>
        </Tile>

        <Card className="comparison-panel mantine-panel fd-mantine-panel fd-system-section" padding="lg" radius="md">
          <Stack gap="md">
            <Group justify="space-between" align="start">
              <div>
                <div className="library-label fd-label">Mantine</div>
                <Title order={3}>모니터링 설정</Title>
              </div>
              <Badge color="blue">터치 UI</Badge>
            </Group>
            <SetupScreens variant="mantine" />
            <Text size="sm" c="dimmed">
              Mantine은 rounded card, 부드러운 contrast, blue CTA로 현대적인 터치
              설정 인터페이스를 빠르게 만들기 좋습니다.
            </Text>
          </Stack>
        </Card>
      </div>
    </section>
  );
}
