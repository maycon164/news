import { CSSProperties, useEffect, useState } from "react"

const content: CSSProperties = {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
}

export const Loading = ({ text = "Loading", speed = 300 }: { text?: string, speed?: number }) => {
    const [textDisplay, setTextDisplay] = useState(text);

    useEffect(() => {
        const id = setInterval(() => {
            if (textDisplay === `${text}...`) {
                setTextDisplay(`${text}`)
            } else {
                setTextDisplay(old => `${old}.`)
            }
        }, speed)
        return () => clearInterval(id)
    }, [textDisplay, text, setTextDisplay])

    return (
        <p style={content}>{textDisplay}</p>
    )
}
