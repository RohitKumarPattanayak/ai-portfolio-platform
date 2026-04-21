import { FolderDot, Briefcase, GraduationCap, Code2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SUGGESTIONS = [
    { icon: FolderDot, text: "List Projects ?" },
    { icon: Briefcase, text: "List Work Experience ?" },
    { icon: GraduationCap, text: "Highest Education ?" },
    { icon: Code2, text: "List Skills ?" }
];

interface SuggestionPromptProps {
    handleSend: (forcedInput?: string) => void;
    setCurrentInput: (currentInput: string) => void;
}

const SuggestionPrompt = ({ handleSend, setCurrentInput }: SuggestionPromptProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSuggestionSelect = (suggestion: string) => {
        setCurrentInput(suggestion);
        handleSend(suggestion);
        setShowSuggestions(false);
    }

    return <div className="flex flex-col">
        {/* Suggestions Toggle Button */}
        <div className="flex items-center gap-3 mb-2 self-start group">
            <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="px-3 py-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/20 hover:bg-white/60 dark:hover:bg-black/40 border border-transparent hover:border-gray-200/60 dark:hover:border-white/10 rounded-full transition-all duration-300"
            >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 dark:text-indigo-400" />
                Suggestions
                {showSuggestions ? (
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" />
                ) : (
                    <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" />
                )}
            </button>
            <span className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Pick a Suggestion for a Visualized Response
            </span>
        </div>

        {/* Quick Suggestions - Toggled */}
        {showSuggestions && (
            <div className="animate-in slide-in-from-bottom-2 fade-in duration-300 flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide mb-3 sm:mb-4 pb-1 -mx-2 px-2 sm:mx-0 sm:px-0">
                {SUGGESTIONS.map((suggestion, i) => (
                    <button
                        key={i}
                        onClick={() => handleSuggestionSelect(suggestion.text)}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/60 dark:bg-black/40 border border-gray-200/60 dark:border-white/10 hover:bg-white dark:hover:bg-black/60 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-sm transition-all duration-300 whitespace-nowrap group text-left flex-shrink-0 cursor-pointer"
                    >
                        <suggestion.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {suggestion.text}
                        </span>
                    </button>
                ))}
            </div>
        )}
    </div>
}

export default SuggestionPrompt