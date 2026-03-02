import styled from 'styled-components'

export const FieldWrap = styled.div`
  width: 100%;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 0.45rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  font-size: 0.92rem;
`

export const Input = styled.input`
  width: 100%;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blueDeep};
    box-shadow: 0 0 0 4px rgba(244, 93, 34, 0.2);
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
    box-shadow: 0 0 0 4px rgba(255, 107, 122, 0.16);
  }
`

export const Helper = styled.p`
  margin-top: 0.45rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.success};
  min-height: 1.1rem;

  &[data-error='true'] {
    color: ${({ theme }) => theme.colors.danger};
  }
`
