import {
  Button as SpectrumButton,
  Checkbox as SpectrumCheckbox,
  Flex as SpectrumFlex,
  Heading as SpectrumHeading,
  Item as SpectrumItem,
  Picker as SpectrumPicker,
  Provider as SpectrumProvider,
  Text as SpectrumText,
  TextArea as SpectrumTextArea,
  TextField as SpectrumTextField,
  View as SpectrumView,
  defaultTheme,
} from "@adobe/react-spectrum";
import {
  Button as CarbonButton,
  Checkbox as CarbonCheckbox,
  Select as CarbonSelect,
  SelectItem as CarbonSelectItem,
  TextArea as CarbonTextArea,
  TextInput as CarbonTextInput,
  Tile,
} from "@carbon/react";
import {
  Button,
  Card,
  Checkbox,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

const departments = [
  { id: "ward", name: "일반 병동" },
  { id: "icu", name: "중환자실" },
  { id: "er", name: "응급실" },
];

export default function FormsScenarioPage() {
  return (
    <section className="scenario-page">
      <div className="scenario-heading">
        <p className="eyebrow">Scenario 01</p>
        <h2>Patient Intake Form</h2>
        <p>
          환자 등록, 필수값, 부서 선택, 동의 상태처럼 입력 밀도가 높은 업무
          화면을 같은 조건으로 비교합니다.
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
              <SpectrumHeading level={3}>신규 환자 등록</SpectrumHeading>
              <SpectrumTextField
                label="환자 이름"
                placeholder="예: 김도윤"
                necessityIndicator="label"
                isRequired
                width="100%"
              />
              <SpectrumTextField
                label="환자 번호"
                placeholder="MRN-2048"
                validationState="invalid"
                errorMessage="환자 번호 형식이 올바르지 않습니다."
                width="100%"
              />
              <SpectrumPicker label="배정 부서" items={departments} width="100%">
                {(item) => <SpectrumItem>{item.name}</SpectrumItem>}
              </SpectrumPicker>
              <SpectrumTextArea
                label="초기 관찰 메모"
                placeholder="증상, 위험 요인, 보호자 요청 사항"
                width="100%"
              />
              <SpectrumCheckbox defaultSelected>
                보호자 연락처 확인 완료
              </SpectrumCheckbox>
              <SpectrumFlex gap="size-150" wrap>
                <SpectrumButton variant="cta">등록</SpectrumButton>
                <SpectrumButton variant="secondary">임시 저장</SpectrumButton>
              </SpectrumFlex>
              <SpectrumText>차분하고 규칙적인 폼 리듬이 강점입니다.</SpectrumText>
            </SpectrumFlex>
          </SpectrumView>
        </SpectrumProvider>

        <Tile className="comparison-panel carbon-panel">
          <div className="library-label">Carbon</div>
          <h3>신규 환자 등록</h3>
          <div className="carbon-form-stack">
            <CarbonTextInput
              id="carbon-patient-name"
              labelText="환자 이름"
              placeholder="예: 김도윤"
            />
            <CarbonTextInput
              id="carbon-patient-id"
              labelText="환자 번호"
              placeholder="MRN-2048"
              invalid
              invalidText="환자 번호 형식이 올바르지 않습니다."
            />
            <CarbonSelect id="carbon-department" labelText="배정 부서">
              <CarbonSelectItem value="ward" text="일반 병동" />
              <CarbonSelectItem value="icu" text="중환자실" />
              <CarbonSelectItem value="er" text="응급실" />
            </CarbonSelect>
            <CarbonTextArea
              id="carbon-intake-note"
              labelText="초기 관찰 메모"
              placeholder="증상, 위험 요인, 보호자 요청 사항"
            />
            <CarbonCheckbox
              id="carbon-contact-confirmed"
              labelText="보호자 연락처 확인 완료"
              defaultChecked
            />
            <div className="button-row">
              <CarbonButton kind="primary">등록</CarbonButton>
              <CarbonButton kind="secondary">임시 저장</CarbonButton>
            </div>
            <p className="panel-note">엔터프라이즈 폼 검증 표현이 명확합니다.</p>
          </div>
        </Tile>

        <Card className="comparison-panel mantine-panel" padding="lg" radius="md">
          <Stack gap="md">
            <div className="library-label">Mantine</div>
            <Title order={3}>신규 환자 등록</Title>
            <TextInput
              label="환자 이름"
              placeholder="예: 김도윤"
              withAsterisk
            />
            <TextInput
              label="환자 번호"
              placeholder="MRN-2048"
              error="환자 번호 형식이 올바르지 않습니다."
            />
            <Select
              label="배정 부서"
              placeholder="부서 선택"
              data={["일반 병동", "중환자실", "응급실"]}
            />
            <Textarea
              label="초기 관찰 메모"
              placeholder="증상, 위험 요인, 보호자 요청 사항"
              minRows={3}
            />
            <Checkbox
              defaultChecked
              label="보호자 연락처 확인 완료"
            />
            <Group>
              <Button>등록</Button>
              <Button variant="outline">임시 저장</Button>
            </Group>
            <Text size="sm" c="dimmed">
              빠르게 제품 톤을 입히기 좋은 유연함이 보입니다.
            </Text>
          </Stack>
        </Card>
      </div>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" className="score-grid">
        <div className="score-card">
          <strong>Spectrum</strong>
          <span>정돈된 밀도, 안정적인 접근성 기본값</span>
        </div>
        <div className="score-card">
          <strong>Carbon</strong>
          <span>검증/상태 표현과 B2B 업무 톤</span>
        </div>
        <div className="score-card">
          <strong>Mantine</strong>
          <span>빠른 조합, 높은 커스터마이징 자유도</span>
        </div>
      </SimpleGrid>
    </section>
  );
}
