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
        <div className="relative w-full mb-3 sm:my-4.5 min-h-[28px] flex justify-center text-center">
            {
                isActiveResumeLoading ?
                    <div className="flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-indigo-500 animate-ping"></div>
                    </div>
                    :
                    <h2 className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold tracking-[0.04em] text-gray-900 dark:text-white font-mono">
                        {typedText}
                        {!isTypingComplete && <span className="animate-pulse">|</span>}
                    </h2>
            }

        </div>
    )
})

export default TypingHeading;