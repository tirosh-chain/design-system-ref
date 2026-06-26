import {
  Button,
  Content,
  Flex,
  Heading,
  Item,
  Picker,
  ProgressBar,
  Provider,
  TableBody,
  TableHeader,
  TableView,
  Column,
  Row,
  Cell,
  Text,
  TextField,
  View,
  Well,
  defaultTheme,
} from "@adobe/react-spectrum";

const vitals = [
  { id: "Z1", name: "김민수", heart: 78, spo2: 98, status: "정상" },
  { id: "Z2", name: "이서현", heart: 114, spo2: 92, status: "주의" },
  { id: "Z3", name: "박지훈", heart: 65, spo2: 88, status: "관찰" },
];

const dashboardItems = [
  { id: "overview", name: "개요" },
  { id: "monitoring", name: "모니터링" },
  { id: "reports", name: "리포트" },
];

export default function SpectrumPage() {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <div className="spectrum-page">
        <section className="page-section">
          <Heading level={2}>Spectrum 랜딩 페이지</Heading>
          <Text>
            Adobe Spectrum 스타일은 깔끔하고 여유 있는 레이아웃, 메뉴와 버튼의
            명확한 계층을 보여줍니다.
          </Text>
          <Content>
            <Flex direction="row" gap="size-200" wrap>
              <View
                padding="size-200"
                backgroundColor="gray-75"
                borderRadius="medium"
                width="size-6000"
              >
                <Heading level={3}>클라우드 헬스케어 플랫폼</Heading>
                <Text>
                  실시간 환자 모니터링, 통합 리포트, 의료진 알림까지 하나의
                  시스템으로 제공합니다.
                </Text>
                <Flex gap="size-200" marginTop="size-200">
                  <Button variant="cta">시작하기</Button>
                  <Button variant="secondary">데모 보기</Button>
                </Flex>
              </View>
              <View
                padding="size-200"
                backgroundColor="gray-75"
                borderRadius="medium"
                width="size-6000"
              >
                <TextField label="검색" placeholder="환자 이름 혹은 모듈 검색" />
                <Flex gap="size-200" marginTop="size-200" wrap>
                  <Picker label="대시보드" items={dashboardItems}>
                    {(item) => <Item>{item.name}</Item>}
                  </Picker>
                  <TextField label="알림" value="3건의 긴급 경고" isReadOnly />
                </Flex>
              </View>
            </Flex>
          </Content>
        </section>

      <section className="page-section">
        <Heading level={2}>Spectrum 환자 모니터링</Heading>
        <Text>
          실시간 환자 카드와 상태 요약을 통해 의료진이 빠르게 상황을 판단할 수
          있는 화면입니다.
        </Text>
        <div className="monitoring-grid">
          <Well>
            <Flex direction="row" gap="size-200" alignItems="end" wrap>
              <Heading level={3}>환자 상태 요약</Heading>
              <Button variant="secondary">전체 보기</Button>
            </Flex>
            <Flex direction="row" gap="size-200" wrap marginTop="size-150">
              <View
                backgroundColor="gray-75"
                borderRadius="medium"
                padding="size-200"
                width="100%"
              >
                <Text>심박수</Text>
                <ProgressBar label="심박수 안정화" value={75} />
              </View>
              <View
                backgroundColor="gray-75"
                borderRadius="medium"
                padding="size-200"
                width="100%"
              >
                <Text>산소포화도</Text>
                <ProgressBar label="산소 포화도" value={92} />
              </View>
            </Flex>
          </Well>

          <div className="table-card">
            <Heading level={3}>주요 환자 리스트</Heading>
            <TableView aria-label="Vital signs table">
              <TableHeader>
                <Column key="name">환자</Column>
                <Column key="heart">심박수</Column>
                <Column key="spo2">SpO₂</Column>
                <Column key="status">상태</Column>
              </TableHeader>
              <TableBody>
                <Row key={vitals[0].id}>
                  <Cell>{vitals[0].name}</Cell>
                  <Cell>{vitals[0].heart} bpm</Cell>
                  <Cell>{vitals[0].spo2}%</Cell>
                  <Cell>{vitals[0].status}</Cell>
                </Row>
                <Row key={vitals[1].id}>
                  <Cell>{vitals[1].name}</Cell>
                  <Cell>{vitals[1].heart} bpm</Cell>
                  <Cell>{vitals[1].spo2}%</Cell>
                  <Cell>{vitals[1].status}</Cell>
                </Row>
                <Row key={vitals[2].id}>
                  <Cell>{vitals[2].name}</Cell>
                  <Cell>{vitals[2].heart} bpm</Cell>
                  <Cell>{vitals[2].spo2}%</Cell>
                  <Cell>{vitals[2].status}</Cell>
                </Row>
              </TableBody>
            </TableView>
          </div>
        </div>
      </section>
      </div>
    </Provider>
  );
}
