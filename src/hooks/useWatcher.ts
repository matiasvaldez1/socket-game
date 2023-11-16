import { useEffect } from 'react'
import useRenderIndicator from '@/hooks/useRenderIndicator'

export default function useWatcher(reaction: () => any, deps?: any[]) {
  const render = useRenderIndicator()
  useEffect(() => {
    if (render.first) return
    reaction()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
