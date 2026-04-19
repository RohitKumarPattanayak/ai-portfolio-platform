import { useEffect, useState, memo } from "react";

const TypingHeading = memo(({ fullText, isActiveResumeLoading, isTypingComplete, setIsTypingComplete }: { fullText: string, isActiveResumeLoading: boolean, isTypingComplete: boolean, setIsTypingComplete: (complete: boolean) => void }) => {
    const [typedText, setTypedText] = useState("")

    useEffect(() => {
        if (isActiveResumeLoading) return;

        setTypedText("")
        setIsTypingComplete(false)

        let currentIndex = 0
        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex))
                currentIndex++
            } else {
                setIsTypingComplete(true)
                clearInterval(intervalId)
            }
        }, 45) // Adjust typing speed here (lower is faster)

        return () => clearInterval(intervalId)
    }, [fullText, isActiveResumeLoading, setIsTypingComplete])

    return (
        <div className="relative w-full mb-2 min-h-[28px] flex justify-center text-center">
            {/* Invisible placeholder */}
            <h2 className="text-sm sm:text-base md:text-lg font-medium tracking-[0.04em] invisible pointer-events-none select-none font-mono">
                {fullText}
                <span>|</span>
            </h2>

            <h2 className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold tracking-[0.04em] text-gray-900 dark:text-white font-mono">
                {typedText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
            </h2>
        </div>
    )
})

export default TypingHeading;