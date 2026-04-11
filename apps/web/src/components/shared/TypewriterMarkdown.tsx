import { useState, useEffect, memo } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    content: string;
    animate: boolean;
    onComplete?: () => void;
}

const remarkPlugins = [remarkGfm];

const TypewriterMarkdown = memo(({ content, animate, onComplete }: Props) => {
    const [displayedContent, setDisplayedContent] = useState(animate ? "" : content);
    
    useEffect(() => {
        if (!animate) {
            setDisplayedContent(content);
            return;
        }
        
        let i = 0;
        setDisplayedContent("");
        const interval = setInterval(() => {
            i += 4;
            if (i >= content.length) {
                setDisplayedContent(content);
                clearInterval(interval);
                if (onComplete) onComplete();
            } else {
                setDisplayedContent(content.slice(0, i));
            }
        }, 15);

        return () => clearInterval(interval);
    }, [content, animate, onComplete]);

    return (
         <ReactMarkdown remarkPlugins={remarkPlugins}>
            {displayedContent}
        </ReactMarkdown>
    );
});

TypewriterMarkdown.displayName = "TypewriterMarkdown";

export default TypewriterMarkdown;
