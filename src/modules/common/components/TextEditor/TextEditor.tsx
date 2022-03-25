import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from "jodit-react";


interface Props{
    value:any
    onBlur?:any
}
const TextEditor = (props:Props) => {
    const {value,onBlur} = props
    const editor = useRef(null)
    const [content, setContent] = useState(value)
    
    useEffect(()=>{
        onBlur(content)
    },[content])

    return (
        <JoditEditor
            ref={editor}
            value={content}
            onBlur={newContent => setContent(newContent)} 
            onChange={newContent => { }}

        />
    );
}

export default TextEditor