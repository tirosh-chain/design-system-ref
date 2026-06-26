import {
  Button,
  Header,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  Tag,
  Tile,
  TextInput,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Row,
  Column,
} from "@carbon/react";

const rows = [
  { id: "1", patient: "최수진", heart: 82, spo2: 97, status: "안정" },
  { id: "2", patient: "이태희", heart: 128, spo2: 90, status: "관찰" },
  { id: "3", patient: "정유진", heart: 70, spo2: 94, status: "정상" },
];

const headers = [
  { key: "patient", header: "환자" },
  { key: "heart", header: "심박수" },
  { key: "spo2", header: "SpO₂" },
  { key: "status", header: "상태" },
];

function statusTag(status: string) {
  if (status === "안정") return <Tag type="green">안정</Tag>;
  if (status === "관찰") return <Tag type="warm-gray">관찰</Tag>;
  return <Tag type="red">주의</Tag>;
}

export default function CarbonPage() {
  return (
    <div className="carbon-page">
      <Header aria-label="Carbon demo header">
        <HeaderName href="#">Healthcare</HeaderName>
        <HeaderNavigation aria-label="Carbon site navigation">
          <HeaderMenuItem href="#">홈</HeaderMenuItem>
          <HeaderMenuItem href="#">대시보드</HeaderMenuItem>
          <HeaderMenuItem href="#">리포트</HeaderMenuItem>
        </HeaderNavigation>
      </Header>

      <section className="page-section">
        <h2>Carbon 랜딩 페이지</h2>
        <p>
          IBM Carbon 스타일은 명확한 그리드 레이아웃과 단단한 타이포그래피로
          엔터프라이즈 환경에 적합합니다.
        </p>
        <Grid fullWidth>
          <Row>
            <Column sm={4} md={8} lg={8}>
              <Tile>
                <h3>통합 환자 모니터링</h3>
                <p>
                  병동 전체의 현재 상태를 한눈에 파악할 수 있는 대시보드. 실시간
                  알림과 심층 분석이 함께합니다.
                </p>
                <Button kind="primary">대시보드 열기</Button>
              </Tile>
            </Column>
            <Column sm={4} md={8} lg={8}>
              <Tile>
                <TextInput
                  id="carbon-patient-search"
                  labelText="환자 검색"
                  placeholder="환자 이름을 입력하세요"
                />
                <div style={{ marginTop: "1rem" }}>
                  <Button kind="secondary">검색</Button>
                </div>
              </Tile>
            </Column>
          </Row>
        </Grid>
      </section>

      <section className="page-section">
        <h2>Carbon 환자 모니터링</h2>
        <p>
          상태 카드를 통해 위험 환자를 빠르게 식별하고, 표 형태로 중요한
          데이터와 추세를 제공합니다.
        </p>
        <div className="monitoring-grid">
          <Tile className="monitoring-card">
            <h3>환자 집중 모니터</h3>
            <p>실시간 경고 및 심박수, 산소포화도를 한 번에 확인합니다.</p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "16px",
              }}
            >
              <Button kind="tertiary">알림 확인</Button>
              <Button kind="primary">보고서 생성</Button>
            </div>
          </Tile>

          <Tile className="table-card">
            <h3>바로 보기 환자 상태</h3>
            <DataTable rows={rows} headers={headers} isSortable>
              {({ rows, headers, getHeaderProps, getRowProps }) => (
                <TableContainer title="active patients">
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => {
                          const { key, ...headerProps } = getHeaderProps({
                            header,
                          });

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
                                {cell.info.header === "status"
                                  ? statusTag(cell.value as string)
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
          </Tile>
        </div>
      </section>
    </div>
  );
}
