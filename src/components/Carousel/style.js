import styled from 'styled-components'

export const CarouselWrap = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  min-height: 320px;
`

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  min-height: 320px;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  text-align: center;
`

export const SlideTitle = styled.h4`
  font-size: 1.2rem;
`

export const SlideDescription = styled.p`
  margin-top: 0.45rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Controls = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 0.5rem;
`

export const DotWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 18px;
  display: flex;
  justify-content: center;
  gap: 0.45rem;
`

export const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  background: rgba(27, 42, 74, 0.25);

  &[data-active='true'] {
    background: ${({ theme }) => theme.colors.blueDeep};
  }

  &:hover {
    transform: scale(1.15);
  }
`

export const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.84);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`
