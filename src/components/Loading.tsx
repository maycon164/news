import { useState } from "react"

export const Loading = ({ text = "Loading" }: { text?: string }) => {
    const [textDisplay, setTextDisplay] = useState(text);

    return (
        <div>{text}</div>
    )
}
