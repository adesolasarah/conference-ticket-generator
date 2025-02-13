// Example React Email template component
import { Column, Img, Link, Row, Section, Text } from '@react-email/components';

interface EmailTemplateProps {
  // userEmail: string;
  formName?: string;
  submissionData: Array<{
    key: string;
    value: string | number | boolean;
    type: string;
    label: string;
  }>;
}

export function EmailTemplate({ submissionData }: EmailTemplateProps) {
  return (
    <html>
      <Section className="px-[32px] py-[40px]">
        <Row>
          <Column className="w-[80%]">
            <Img
              alt="React Email logo"
              height="42"
              src="https://react.email/static/logo-without-background.png"
            />
          </Column>
          <Column align="right">
            <Row align="right">
              <Column>
                <Link href="#">
                  <Img
                    alt="X"
                    className="mx-[4px]"
                    height="36"
                    src="https://react.email/static/x-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
              <Column>
                <Link href="#">
                  <Img
                    alt="Instagram"
                    className="mx-[4px]"
                    height="36"
                    src="https://react.email/static/instagram-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
              <Column>
                <Link href="#">
                  <Img
                    alt="Facebook"
                    className="mx-[4px]"
                    height="36"
                    src="https://react.email/static/facebook-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
            </Row>
          </Column>
        </Row>
      </Section>
      <Section>
        <Text className="text-[24px] font-semibold leading-[32px] text-indigo-400">
          Amazing content
        </Text>
      </Section>
      <Text>
        {Object.entries(submissionData).map(([field, data]) => (
          <div key={field}>
            <strong>{data.key}:</strong> {String(data.value)}
          </div>
        ))}
      </Text>
      <Section>
        <Row>
          <Column colSpan={4}>
            <Img
              alt="React Email logo"
              height="42"
              src="https://react.email/static/logo-without-background.png"
            />
            <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
              Acme corporation
            </Text>
            <Text className="mb-[0px] mt-[4px] text-[16px] leading-[24px] text-gray-500">
              Think different
            </Text>
          </Column>
          <Column align="left" className="table-cell align-bottom">
            <Row className="table-cell h-[44px] w-[56px] align-bottom">
              <Column className="pr-[8px]">
                <Link href="#">
                  <Img
                    alt="Facebook"
                    height="36"
                    src="https://react.email/static/facebook-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
              <Column className="pr-[8px]">
                <Link href="#">
                  <Img
                    alt="X"
                    height="36"
                    src="https://react.email/static/x-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
              <Column>
                <Link href="#">
                  <Img
                    alt="Instagram"
                    height="36"
                    src="https://react.email/static/instagram-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
            </Row>
            <Row>
              <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500">
                123 Main Street Anytown, CA 12345
              </Text>
              <Text className="mb-[0px] mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
                mail@example.com +123456789
              </Text>
            </Row>
          </Column>
        </Row>
      </Section>
    </html>
  );
}
