/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/interactive-supports-focus */
import { ForwardedRef, forwardRef, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Input, MagnifyingGlassSVG } from '@ensdomains/thorin'

const SearchInputWrapper = styled.div<{ $size: 'medium' | 'extraLarge' }>(
  ({ theme, $size }) => css`
    z-index: 1;
    box-shadow: ${theme.boxShadows['0.25']};
    border-radius: ${theme.radii['2.5xLarge']};
    border-color: ${theme.colors.border};
    width: 100%;
    & input {
      padding-right: ${theme.space['12']};
    }
    & button {
      position: relative;
      right: -${theme.space['4']};
    }
    & input::placeholder {
      color: ${theme.colors.greyPrimary};
      font-weight: ${theme.fontWeights.bold};
    }

    ${$size === 'extraLarge' &&
    css`
      box-shadow: none;
      border-radius: 0;
    `}

    ${$size === 'medium' &&
    css`
      max-width: ${theme.space['96']};
      box-shadow: none;
      border-radius: ${theme.radii.full};
      & input::placeholder {
        color: ${theme.colors.greyPrimary};
        font-weight: ${theme.fontWeights.normal};
      }
    `}
  `,
)

const PanelShell = styled.div(
  ({ theme }) => css`
    position: relative;
    min-height: ${theme.space['20']};
    border: ${theme.borderWidths.px} ${theme.borderStyles.solid} rgba(22, 18, 16, 0.14);
    background: rgba(255, 250, 245, 0.96);
    box-shadow: 0 18px 40px rgba(44, 22, 18, 0.06);
    overflow: hidden;

    html[data-theme='dark'] & {
      border-color: rgba(255, 255, 255, 0.16);
      background: rgba(24, 24, 18, 0.96);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
    }
  `,
)

const PanelInput = styled.input(
  ({ theme }) => css`
    width: 100%;
    min-height: ${theme.space['20']};
    background: transparent;
    border: 0;
    outline: none;
    color: rgb(33, 30, 27);
    padding: ${theme.space['5']} ${theme.space['6']};
    font-size: ${theme.fontSizes.headingFour};
    font-weight: ${theme.fontWeights.bold};
    letter-spacing: -0.02em;

    html[data-theme='dark'] & {
      color: ${theme.colors.textPrimary};
    }

    &::placeholder {
      color: rgba(40, 36, 33, 0.52);
      font-weight: ${theme.fontWeights.bold};

      html[data-theme='dark'] & {
        color: rgba(255, 255, 255, 0.52);
      }
    }
  `,
)

const ClearButton = styled.button(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.space['4']};
    right: ${theme.space['4']};
    border: 0;
    background: transparent;
    color: ${theme.colors.greyPrimary};
    font-size: ${theme.fontSizes.large};
    cursor: pointer;
    padding: ${theme.space['1']};
    line-height: 1;
  `,
)

const MagnifyingGlassIcon = styled.svg(
  ({ theme }) => css`
    width: ${theme.space['4']};
    height: ${theme.space['4']};
  `,
)

// const ResetButton = styled.div(
//   ({ theme }) => css`
//     display: block;
//     transition: all 0.15s ease-in-out;
//     cursor: pointer;
//     color: rgba(${theme.shadesRaw.foreground}, 0.25);
//     width: ${theme.space['7']};
//     height: ${theme.space['7']};
//     margin-right: ${theme.space['2']};
//     &:hover {
//       color: rgba(${theme.shadesRaw.foreground}, 0.3);
//       transform: translateY(-1px);
//     }
//   `,
// )

type SearchInputBoxProps = {
  size?: 'medium' | 'extraLarge'
  input: string
  setInput: (value: string) => void
  containerRef: ForwardedRef<HTMLDivElement>
}

export const SearchInputBox = forwardRef<HTMLInputElement, SearchInputBoxProps>(
  ({ size = 'extraLarge', input, setInput, containerRef }, ref) => {
    const { t } = useTranslation('common')
    if (size === 'extraLarge') {
      return (
        <SearchInputWrapper ref={containerRef} $size={size}>
          <PanelShell>
            <PanelInput
              aria-label={t('search.label')}
              placeholder={t('search.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={ref}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              data-testid="search-input-box"
            />
            {!!input && (
              <ClearButton type="button" aria-label="Clear search" onClick={() => setInput('')}>
                ×
              </ClearButton>
            )}
          </PanelShell>
        </SearchInputWrapper>
      )
    }
    return (
      <SearchInputWrapper ref={containerRef} $size={size}>
        <Input
          size={size}
          label={t('search.label')}
          hideLabel
          placeholder={t('search.placeholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={ref}
          clearable
          autoComplete="off"
          autoCorrect="off"
          icon={size === 'medium' ? <MagnifyingGlassIcon as={MagnifyingGlassSVG} /> : undefined}
          spellCheck="false"
          data-testid="search-input-box"
        />
      </SearchInputWrapper>
    )
  },
)

type FakeSearchInputBoxProps = {
  size?: 'medium' | 'extraLarge'
  onClick: (e: MouseEvent<HTMLInputElement>) => void
}

export const FakeSearchInputBox = forwardRef<HTMLInputElement, FakeSearchInputBoxProps>(
  ({ size = 'extraLarge', onClick }, ref) => {
    const { t } = useTranslation('common')
    if (size === 'extraLarge') {
      return (
        <SearchInputWrapper $size={size}>
          <PanelShell>
            <PanelInput
              aria-label={t('search.label')}
              placeholder={t('search.placeholder')}
              ref={ref}
              onClick={onClick}
              readOnly
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              data-testid="search-input-box-fake"
            />
          </PanelShell>
        </SearchInputWrapper>
      )
    }
    return (
      <SearchInputWrapper $size={size}>
        <Input
          size={size}
          label={t('search.label')}
          hideLabel
          placeholder={t('search.placeholder')}
          ref={ref}
          onClick={onClick}
          readOnly
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          data-testid="search-input-box-fake"
        />
      </SearchInputWrapper>
    )
  },
)
