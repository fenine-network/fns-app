import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Helper } from '@ensdomains/thorin'

const StyledHelper = styled(Helper)(
  ({ theme }) => css`
    border-radius: 0;
    background: rgba(255, 244, 244, 0.96);
    border: 1px solid rgba(255, 71, 71, 0.24);
    color: ${theme.colors.text};

    html[data-theme='dark'] & {
      background: rgba(56, 18, 18, 0.92);
      border-color: rgba(255, 108, 108, 0.32);
      color: ${theme.colors.textPrimary};
    }
  `,
)

const InnerContainer = styled.div(
  ({ theme }) => css`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: ${theme.space['4']};
  `,
)

const calcPercent = (percent: number, order: number) => {
  const padding = 10
  const orderPercent = (1 / 3) * order
  const minimumBarrier = Math.max(100 * ((1 / 3) * (order - 1)) + padding, padding)
  const maximumBarrier = Math.min(100 * orderPercent - padding, 100 - padding)
  return Math.min(Math.max((100 - percent * 0.9) * orderPercent, minimumBarrier), maximumBarrier)
}

const Bar = styled.div<{ $highlightPercent: number }>(
  ({ theme, $highlightPercent }) => css`
    --bar-width: calc(${$highlightPercent}% - ${theme.space['1']});
    background: linear-gradient(
      90deg,
      rgb(255, 116, 116) var(--bar-width),
      rgb(255, 71, 71) var(--bar-width)
    );
    width: 100%;
    height: ${theme.space['4']};
    border-radius: 0;
    margin-bottom: ${theme.space['11']};

    html[data-theme='dark'] & {
      background: linear-gradient(
        90deg,
        rgb(255, 138, 138) var(--bar-width),
        rgb(255, 108, 108) var(--bar-width)
      );
    }
  `,
)

const Marker = styled.div<{ $percent: number }>(
  ({ theme, $percent }) => css`
    position: absolute;
    transform-style: preserve-3d;
    bottom: 0;
    left: ${$percent}%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space['1']};

    width: ${theme.space['16']};
    height: ${theme.space['10']};
    padding: 0 ${theme.space['2']};

    border-radius: 0;
    background-color: rgba(255, 250, 245, 0.98);
    &:last-of-type {
      background-color: rgb(255, 108, 108);
      color: rgb(255, 255, 255);
    }

    html[data-theme='dark'] & {
      background-color: rgba(24, 24, 18, 0.98);
      color: ${theme.colors.textPrimary};
    }

    html[data-theme='dark'] &:last-of-type {
      background-color: rgb(255, 108, 108);
      color: rgb(255, 255, 255);
    }

    font-size: ${theme.fontSizes.extraSmall};
    line-height: ${theme.lineHeights.extraSmall};

    b {
      display: block;
      white-space: nowrap;
    }

    :not(b) {
      white-space: nowrap;
    }

    @media (min-width: 360px) {
      width: ${theme.space['18']};
      font-size: ${theme.fontSizes.small};
    }

    &::before {
      content: '';

      position: absolute;
      transform: translateZ(-1px);
      bottom: ${theme.space['9']};

      height: ${theme.space['7']};
      width: ${theme.space['1']};

      outline: ${theme.space['0.5']} solid rgba(255, 196, 196, 0.75);
      border-radius: 0;
      background-color: inherit;

      html[data-theme='dark'] & {
        outline-color: rgba(255, 108, 108, 0.35);
      }
    }
  `,
)

type Props = {
  yearlyFee: bigint
  transactionFee: bigint
  message?: string
}

const unit = 1e12
const unitBigInt = BigInt(unit)

const yearsToGasPercent = (targetYears: bigint, f: bigint, y: bigint) => {
  const gasPercent = Number(f * unitBigInt) / Number(y * targetYears + f)
  const rounded = Math.round((gasPercent / unit) * 100)
  return rounded
}

const gasPercentToYears = (targetPercent: bigint, f: bigint, y: bigint, min: number) => {
  const fp = f / 100n
  const yp = y / 100n
  const top = (f - fp * targetPercent) * unitBigInt
  const bottom = yp * targetPercent
  const years = Number(top / bottom / unitBigInt)
  const rounded = Math.max(Math.round(years), min)
  const gasPercent = yearsToGasPercent(BigInt(rounded), f, y)
  return { gas: gasPercent, years: rounded }
}

export const RegistrationTimeComparisonBanner = ({ message, yearlyFee, transactionFee }: Props) => {
  const { t } = useTranslation('common')
  const oneYearGasPercent = yearsToGasPercent(1n, transactionFee, yearlyFee)
  const forty = gasPercentToYears(40n, transactionFee, yearlyFee, 2)
  const twenty = gasPercentToYears(20n, transactionFee, yearlyFee, 5)

  const twentyRounded = calcPercent(twenty.gas, 3)

  return (
    <StyledHelper alert="info">
      <InnerContainer>
        <div>{message}</div>
        <Bar $highlightPercent={twentyRounded} />
        <Marker data-testid="year-marker-0" $percent={calcPercent(oneYearGasPercent, 1)}>
          <b>{t('unit.years', { count: 1 })}</b>
          {t('unit.gas', { value: `${oneYearGasPercent}%` })}
        </Marker>
        <Marker data-testid="year-marker-1" $percent={calcPercent(forty.gas, 2)}>
          <b>{t('unit.years', { count: forty.years })}</b>
          {t('unit.gas', { value: `${forty.gas}%` })}
        </Marker>
        <Marker data-testid="year-marker-2" $percent={twentyRounded}>
          <b>{t('unit.years', { count: twenty.years })}</b>
          {t('unit.gas', { value: `${twenty.gas}%` })}
        </Marker>
      </InnerContainer>
    </StyledHelper>
  )
}
