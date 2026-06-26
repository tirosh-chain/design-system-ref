import {
  ActionButton,
  Button as SpectrumButton,
  ButtonGroup,
  Content,
  Divider,
  Flex as SpectrumFlex,
  Heading as SpectrumHeading,
  InlineAlert,
  Provider as SpectrumProvider,
  StatusLight,
  Text as SpectrumText,
  View as SpectrumView,
  defaultTheme,
} from "@adobe/react-spectrum";
import {
  Button as CarbonButton,
  InlineNotification,
  ProgressIndicator,
  ProgressStep,
  Tile,
} from "@carbon/react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

const workflowItems = [
  "SpO2 88% 이하 경고 확인",
  "담당 간호사 배정",
  "산소 공급 조치 기록",
];

export default function WorkflowScenarioPage() {
  return (
    <section className="scenario-page">
      <div className="scenario-heading">
        <p className="eyebrow">Scenario 03</p>
        <h2>Alert Workflow</h2>
        <p>
          위험 알림을 확인하고 담당자를 배정한 뒤 조치를 기록하는 짧은 업무
          플로우를 비교합니다.
        </p>
      </div>

      <div className="comparison-grid">
        <SpectrumProvider theme={defaultTheme} colorScheme="light">
          <SpectrumView
            borderWidth="thin"
            borderColor="gray-300"
            borderRadius="medium"
            padding="size-300"
            backgroundColor="gray-50"
          >
            <SpectrumFlex direction="column" gap="size-200">
              <div className="library-label">Spectrum</div>
              <SpectrumHeading level={3}>위험 알림 처리</SpectrumHeading>
              <InlineAlert variant="negative">
                <SpectrumHeading>박지훈 환자 산소포화도 저하</SpectrumHeading>
                <Content>
                  5분 평균 SpO2가 88%로 떨어졌습니다. 재측정과 산소 공급 여부를
                  확인하세요.
                </Content>
              </InlineAlert>
              <SpectrumView
                borderWidth="thin"
                borderColor="gray-200"
                borderRadius="medium"
                padding="size-200"
              >
                <SpectrumFlex direction="column" gap="size-125">
                  {workflowItems.map((item, index) => (
                    <StatusLight
                      key={item}
                      variant={index === 2 ? "neutral" : "positive"}
                    >
                      {item}
                    </StatusLight>
                  ))}
                </SpectrumFlex>
              </SpectrumView>
              <Divider size="S" />
              <ButtonGroup>
                <SpectrumButton variant="cta">조치 완료</SpectrumButton>
                <SpectrumButton variant="secondary">담당자 변경</SpectrumButton>
                <ActionButton>기록 열기</ActionButton>
              </ButtonGroup>
              <SpectrumText>
                상태 안내와 확인 액션이 담백하게 이어지는 흐름입니다.
              </SpectrumText>
            </SpectrumFlex>
          </SpectrumView>
        </SpectrumProvider>

        <Tile className="comparison-panel carbon-panel">
          <div className="library-label">Carbon</div>
          <h3>위험 알림 처리</h3>
          <InlineNotification
            kind="error"
            title="박지훈 환자 산소포화도 저하"
            subtitle="5분 평균 SpO2가 88%로 떨어졌습니다."
            lowContrast
          />
          <div className="workflow-box">
            <ProgressIndicator currentIndex={1}>
              <ProgressStep
                label="경고 확인"
                description="SpO2 88% 이하"
                complete
              />
              <ProgressStep
                label="담당자 배정"
                description="간호사 배정 완료"
                current
              />
              <ProgressStep
                label="조치 기록"
                description="산소 공급 기록 대기"
              />
            </ProgressIndicator>
          </div>
          <div className="button-row">
            <CarbonButton kind="primary" size="sm">
              조치 완료
            </CarbonButton>
            <CarbonButton kind="secondary" size="sm">
              담당자 변경
            </CarbonButton>
            <CarbonButton kind="tertiary" size="sm">
              기록 열기
            </CarbonButton>
          </div>
          <p className="panel-note">
            진행 단계와 시스템 알림을 업무적으로 명확하게 보여줍니다.
          </p>
        </Tile>

        <Card className="comparison-panel mantine-panel" padding="lg" radius="md">
          <Stack gap="md">
            <div className="library-label">Mantine</div>
            <Title order={3}>위험 알림 처리</Title>
            <Alert color="red" title="박지훈 환자 산소포화도 저하">
              5분 평균 SpO2가 88%로 떨어졌습니다. 재측정과 산소 공급 여부를
              확인하세요.
            </Alert>
            <Stepper active={1} size="sm">
              <Stepper.Step label="경고 확인" description="SpO2 88% 이하" />
              <Stepper.Step label="담당자 배정" description="간호사 배정 완료" />
              <Stepper.Step label="조치 기록" description="산소 공급 기록 대기" />
            </Stepper>
            <div className="assignment-strip">
              <ThemeIcon radius="xl" size="lg">
                RN
              </ThemeIcon>
              <div>
                <Text fw={700}>담당자: 최수진 간호사</Text>
                <Badge color="yellow">응답 대기</Badge>
              </div>
            </div>
            <Group>
              <Button>조치 완료</Button>
              <Button variant="outline">담당자 변경</Button>
              <Button variant="light">기록 열기</Button>
            </Group>
            <Text size="sm" c="dimmed">
              단계형 업무 화면을 빠르게 구성하기 좋습니다.
            </Text>
          </Stack>
        </Card>
      </div>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" className="score-grid">
        <div className="score-card">
          <strong>Spectrum</strong>
          <span>알림, 상태, 액션이 과하지 않게 정돈됩니다.</span>
        </div>
        <div className="score-card">
          <strong>Carbon</strong>
          <span>단계 진행과 시스템 알림을 업무적으로 선명하게 보여줍니다.</span>
        </div>
        <div className="score-card">
          <strong>Mantine</strong>
          <span>알림, 스텝, 담당자 정보를 빠르게 조합하기 좋습니다.</span>
        </div>
      </SimpleGrid>
    </section>
  );
}
