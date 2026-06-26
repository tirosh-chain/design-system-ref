import {
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Progress,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Table,
} from "@mantine/core";

const patients = [
  { name: "김현수", heart: 88, spo2: 95, alert: "정상" },
  { name: "박지은", heart: 132, spo2: 89, alert: "위험" },
  { name: "송민호", heart: 74, spo2: 96, alert: "관찰" },
];

function alertBadge(alert: string) {
  if (alert === "정상") return <Badge color="green">정상</Badge>;
  if (alert === "관찰") return <Badge color="yellow">관찰</Badge>;
  return <Badge color="red">위험</Badge>;
}

export default function MantinePage() {
  return (
    <AppShell padding="md">
      <AppShell.Header p="md" style={{ height: 70 }}>
        <Group justify="space-between" style={{ height: "100%" }}>
          <div>
            <Text size="sm" color="dimmed">
              Modern Health
            </Text>
            <Title order={3}>Mantine 디자인 시스템</Title>
          </div>
          <Group>
            <Button variant="outline">로그인</Button>
            <Button>대시보드</Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap="xl">
          <section className="page-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              <div>
                <Title order={2}>Mantine 랜딩 페이지</Title>
                <Text>
                  자유로운 커스터마이징과 간결한 컴포넌트 조합으로 빠르게
                  프로토타입을 만들 수 있습니다.
                </Text>
              </div>
              <Group>
                <Button size="md">시작하기</Button>
                <Button variant="outline" size="md">
                  디자인 보기
                </Button>
              </Group>
            </div>

            <SimpleGrid
              cols={2}
              spacing="md"
              verticalSpacing="md"
              style={{ gap: "1rem" }}
            >
              <Card shadow="sm" padding="lg" radius="md">
                <TextInput label="검색" placeholder="환자 또는 장비 검색" />
                <Button fullWidth mt="md">
                  검색
                </Button>
              </Card>
              <Card shadow="sm" padding="lg" radius="md">
                <Text size="sm" color="dimmed">
                  의료 알림
                </Text>
                <Text mt="xs">세 건의 혈압 경고가 대기 중입니다.</Text>
                <Button variant="light" fullWidth mt="md">
                  알림 확인
                </Button>
              </Card>
            </SimpleGrid>
          </section>

          <section className="page-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              <div>
                <Title order={2}>Mantine 환자 모니터링</Title>
                <Text>
                  실시간 환자 카드와 상태 테이블을 통해 현장 의료진의 집중력을
                  높입니다.
                </Text>
              </div>
              <Button variant="outline">상태 업데이트</Button>
            </div>

            <SimpleGrid
              cols={3}
              spacing="md"
              verticalSpacing="md"
              style={{ gap: "1rem" }}
            >
              <Card shadow="sm" padding="lg" radius="md">
                <Text fw={700}>환자 A</Text>
                <Text color="dimmed" mt="xs">
                  심박수 78, SpO₂ 98%
                </Text>
                <Text size="sm" color="dimmed" mt="md">
                  산소포화도
                </Text>
                <Progress value={86} mt="xs" />
              </Card>
              <Card shadow="sm" padding="lg" radius="md">
                <Text fw={700}>환자 B</Text>
                <Text color="dimmed" mt="xs">
                  심박수 126, SpO₂ 91%
                </Text>
                <Text size="sm" color="dimmed" mt="md">
                  위험도
                </Text>
                <Progress value={60} mt="xs" color="orange" />
              </Card>
              <Card shadow="sm" padding="lg" radius="md">
                <Text fw={700}>환자 C</Text>
                <Text color="dimmed" mt="xs">
                  심박수 70, SpO₂ 96%
                </Text>
                <Text size="sm" color="dimmed" mt="md">
                  안정도
                </Text>
                <Progress value={92} mt="xs" color="green" />
              </Card>
            </SimpleGrid>

            <Card shadow="sm" padding="lg" radius="md" mt="xl">
              <Title order={4}>모니터링 요약</Title>
              <ScrollArea style={{ height: 260, marginTop: 14 }}>
                <Table verticalSpacing="sm">
                  <thead>
                    <tr>
                      <th>환자</th>
                      <th>심박수</th>
                      <th>SpO₂</th>
                      <th>알림</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.name}>
                        <td>{patient.name}</td>
                        <td>{patient.heart}</td>
                        <td>{patient.spo2}%</td>
                        <td>{alertBadge(patient.alert)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ScrollArea>
            </Card>
          </section>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
