import React,{useState} from "react";

interface editProps {
    value: any,
    onBlur?: any
    onChange?: any
}

const Editable = (props: editProps) => {

    const { value, onBlur,onChange } = props
    const [state, setState] = useState(value)

    return (
        <input type="text"
            className="editable"
            value={state}
            onChange={(e: any) => {
                setState(e.target.value)
            }}
            onBlur={(e) => onBlur(e)}
        />
    )
}

export default Editable