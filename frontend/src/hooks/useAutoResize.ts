import { useRef, useEffect } from 'react'

export function useAutoResize<T extends HTMLTextAreaElement>(value: string) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return
        
        element.style.height = 'auto'
        element.style.height = `${element.scrollHeight}px`
    }, [value])

    return ref
}