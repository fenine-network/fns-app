import styled, { css } from 'styled-components'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: 'small' | 'extraSmall'
  leftLabel?: string
  rightLabel?: string
}

const Container = styled.div<{ $size: 'small' | 'extraSmall' }>(
  ({ theme, $size }) => css`
    display: inline-flex;
    border: 1px solid ${theme.colors.border};
    border-radius: 0;
    overflow: hidden;
    min-height: ${$size === 'extraSmall' ? theme.space['8'] : theme.space['10']};
    background: ${theme.colors.backgroundSecondary};
  `,
)

const ToggleButton = styled.button<{ $active?: boolean }>(
  ({ theme, $active }) => css`
    border: 0;
    border-radius: 0;
    padding: ${theme.space['2']} ${theme.space['3']};
    font-size: ${theme.fontSizes.small};
    font-weight: ${theme.fontWeights.bold};
    cursor: pointer;
    background: ${$active ? theme.colors.accentPrimary : 'transparent'};
    color: ${$active ? theme.colors.accentPrimaryText : theme.colors.greyPrimary};
    min-width: ${theme.space['10']};
  `,
)

export const CurrencySwitch = ({
  checked,
  onChange,
  size = 'small',
  leftLabel = 'FEN',
  rightLabel = 'USD',
}: Props) => {
  return (
    <Container $size={size}>
      <ToggleButton type="button" $active={!checked} onClick={() => onChange(false)}>
        {leftLabel}
      </ToggleButton>
      <ToggleButton type="button" $active={checked} onClick={() => onChange(true)}>
        {rightLabel}
      </ToggleButton>
    </Container>
  )
}
