import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import ErrorScreen from '@app/components/@atoms/ErrorScreen'
import Hamburger from '@app/components/@molecules/Hamburger/Hamburger'
import { LeadingHeading } from '@app/components/LeadingHeading'

const StyledLogo = styled.img(
  ({ theme }) => css`
    height: ${theme.space['8.5']};
    width: auto;
    display: block;
  `,
)

const LogoAndLanguage = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: ${theme.space['4']};
  `,
)

const StyledLeadingHeading = styled(LeadingHeading)(
  ({ theme }) => css`
    @media (min-width: ${theme.breakpoints.sm}px) {
      display: none;
    }
  `,
)

export default function Page() {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        {/* this is wrapped in a string because of the way nextjs renders content, don't remove! */}
        <title>{`Fenine - ${t('notFound')}`}</title>
      </Head>
      <StyledLeadingHeading>
        <LogoAndLanguage>
          <StyledLogo src="/favicon.svg" alt="Fenine" />
        </LogoAndLanguage>
        <Hamburger />
      </StyledLeadingHeading>
      <ErrorScreen errorType="not-found" />
    </>
  )
}
