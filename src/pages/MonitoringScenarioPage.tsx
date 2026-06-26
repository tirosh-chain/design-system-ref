import {
  Badge as SpectrumBadge,
  Button as SpectrumButton,
  Cell as SpectrumCell,
  Column as SpectrumColumn,
  Flex as SpectrumFlex,
  Heading as SpectrumHeading,
  ProgressBar,
  Provider as SpectrumProvider,
  Row as SpectrumRow,
  TableBody as SpectrumTableBody,
  TableHeader as SpectrumTableHeader,
  TableView as SpectrumTableView,
  Text as SpectrumText,
  View as SpectrumView,
  Well,
  defaultTheme,
} from "@adobe/react-spectrum";
import {
  Button as CarbonButton,
  DataTable,
  ProgressBar as CarbonProgressBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  Tile,
} from "@carbon/react";
import {
  Badge,
  Button,
  Card,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Table as MantineTable,
  Text,
  Title,
} from "@mantine/core";

const patients = [
  { id: "p-01", name: "김민수", unit: "ICU-2", heart: 78, spo2: 98, risk: "안정" },
  { id: "p-02", name: "이서현", unit: "ER-1", heart: 118, spo2: 91, risk: "주의" },
  { id: "p-03", name: "박지훈", unit: "WARD-4", heart: 64, spo2: 94, risk: "관찰" },
];

const carbonHeaders = [
  { key: "name", header: "환자" },
  { key: "unit", header: "병상" },
  { key: "heart", header: "심박수" },
  { key: "spo2", header: "SpO2" },
  { key: "risk", header: "상태" },
];

function spectrumStatus(status: string) {
  if (status === "안정") return <SpectrumBadge variant="positive">안정</SpectrumBadge>;
  if (status === "관찰") return <SpectrumBadge variant="neutral">관찰</SpectrumBadge>;
  return <SpectrumBadge variant="yellow">주의</SpectrumBadge>;
}

function carbonStatus(status: string) {
  if (status === "안정") return <Tag type="green">안정</Tag>;
  if (status === "관찰") return <Tag type="blue">관찰</Tag>;
  return <Tag type="magenta">주의</Tag>;
}

function mantineStatus(status: string) {
  if (status === "안정") return <Badge color="green">안정</Badge>;
  if (status === "관찰") return <Badge color="blue">관찰</Badge>;
  return <Badge color="yellow">주의</Badge>;
}

export default function MonitoringScenarioPage() {
  return (
    <section className="scenario-page">
      <div className="scenario-heading">
        <p className="eyebrow">Scenario 02</p>
        <h2>Monitoring Data Table</h2>
        <p>
          병동 현황, 상태 요약, 환자 리스트, 조치 버튼처럼 반복 확인이 많은
          운영형 화면을 비교합니다.
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
              <SpectrumHeading level={3}>병동 모니터링</SpectrumHeading>
              <Well>
                <SpectrumFlex direction="column" gap="size-150">
                  <SpectrumText>전체 안정도</SpectrumText>
                  <ProgressBar label="안정 환자 비율" value={82} />
                  <ProgressBar label="주의 알림 처리율" value={58} />
                </SpectrumFlex>
              </Well>
              <SpectrumTableView aria-label="Spectrum patient monitoring">
                <SpectrumTableHeader>
                  <SpectrumColumn key="name">환자</SpectrumColumn>
                  <SpectrumColumn key="unit">병상</SpectrumColumn>
                  <SpectrumColumn key="heart">심박수</SpectrumColumn>
                  <SpectrumColumn key="spo2">SpO2</SpectrumColumn>
                  <SpectrumColumn key="risk">상태</SpectrumColumn>
                </SpectrumTableHeader>
                <SpectrumTableBody>
                  {patients.map((patient) => (
                    <SpectrumRow key={patient.id}>
                      <SpectrumCell>{patient.name}</SpectrumCell>
                      <SpectrumCell>{patient.unit}</SpectrumCell>
                      <SpectrumCell>{patient.heart} bpm</SpectrumCell>
                      <SpectrumCell>{patient.spo2}%</SpectrumCell>
                      <SpectrumCell>{spectrumStatus(patient.risk)}</SpectrumCell>
                    </SpectrumRow>
                  ))}
                </SpectrumTableBody>
              </SpectrumTableView>
              <SpectrumFlex gap="size-150" wrap>
                <SpectrumButton variant="cta">상태 업데이트</SpectrumButton>
                <SpectrumButton variant="secondary">보고서 열기</SpectrumButton>
              </SpectrumFlex>
              <SpectrumText>
                정돈된 간격으로 상태 요약과 테이블이 차분하게 이어집니다.
              </SpectrumText>
            </SpectrumFlex>
          </SpectrumView>
        </SpectrumProvider>

        <Tile className="comparison-panel carbon-panel">
          <div className="library-label">Carbon</div>
          <h3>병동 모니터링</h3>
          <div className="metric-stack">
            <CarbonProgressBar label="안정 환자 비율" value={82} max={100} />
            <CarbonProgressBar label="주의 알림 처리율" value={58} max={100} />
          </div>
          <DataTable rows={patients} headers={carbonHeaders} isSortable>
            {({ rows, headers, getHeaderProps, getRowProps }) => (
              <TableContainer title="patient monitoring">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => {
                        const { key, ...headerProps } = getHeaderProps({ header });

                        return (
                          <TableHeader key={key} {...headerProps}>
                            {header.header}
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const { key, ...rowProps } = getRowProps({ row });

                      return (
                        <TableRow key={key} {...rowProps}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>
                              {cell.info.header === "risk"
                                ? carbonStatus(cell.value as string)
                                : cell.value}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
          <div className="button-row">
            <CarbonButton kind="primary" size="sm">
              상태 업데이트
            </CarbonButton>
            <CarbonButton kind="secondary" size="sm">
              보고서 열기
            </CarbonButton>
          </div>
          <p className="panel-note">
            밀도 높은 운영 테이블과 상태 태그가 업무 도구처럼 단단합니다.
          </p>
        </Tile>

        <Card className="comparison-panel mantine-panel" padding="lg" radius="md">
          <Stack gap="md">
            <div className="library-label">Mantine</div>
            <Title order={3}>병동 모니터링</Title>
            <SimpleGrid cols={2}>
              <Card withBorder radius="sm" padding="md">
                <Text size="sm" c="dimmed">
                  안정 환자 비율
                </Text>
                <Progress value={82} mt="sm" />
              </Card>
              <Card withBorder radius="sm" padding="md">
                <Text size="sm" c="dimmed">
                  주의 알림 처리율
                </Text>
                <Progress value={58} mt="sm" color="yellow" />
              </Card>
            </SimpleGrid>
            <MantineTable striped highlightOnHover verticalSpacing="sm">
              <MantineTable.Thead>
                <MantineTable.Tr>
                  <MantineTable.Th>환자</MantineTable.Th>
                  <MantineTable.Th>병상</MantineTable.Th>
                  <MantineTable.Th>심박수</MantineTable.Th>
                  <MantineTable.Th>SpO2</MantineTable.Th>
                  <MantineTable.Th>상태</MantineTable.Th>
                </MantineTable.Tr>
              </MantineTable.Thead>
              <MantineTable.Tbody>
                {patients.map((patient) => (
                  <MantineTable.Tr key={patient.id}>
                    <MantineTable.Td>{patient.name}</MantineTable.Td>
                    <MantineTable.Td>{patient.unit}</MantineTable.Td>
                    <MantineTable.Td>{patient.heart} bpm</MantineTable.Td>
                    <MantineTable.Td>{patient.spo2}%</MantineTable.Td>
                    <MantineTable.Td>{mantineStatus(patient.risk)}</MantineTable.Td>
                  </MantineTable.Tr>
                ))}
              </MantineTable.Tbody>
            </MantineTable>
            <Group>
              <Button>상태 업데이트</Button>
              <Button variant="outline">보고서 열기</Button>
            </Group>
            <Text size="sm" c="dimmed">
              카드와 테이블 조합을 빠르게 제품 톤에 맞출 수 있습니다.
            </Text>
          </Stack>
        </Card>
      </div>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" className="score-grid">
        <div className="score-card">
          <strong>Spectrum</strong>
          <span>상태 요약과 표의 시각적 리듬이 안정적입니다.</span>
        </div>
        <div className="score-card">
          <strong>Carbon</strong>
          <span>운영 테이블, 정렬, 상태 태그 표현이 가장 업무적입니다.</span>
        </div>
        <div className="score-card">
          <strong>Mantine</strong>
          <span>요약 카드와 테이블을 가볍게 조합하기 좋습니다.</span>
        </div>
      </SimpleGrid>
    </section>
  );
}
