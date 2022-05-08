import React, { useEffect } from "react";
import css from './Modal.module.css';


interface Props {
    title:string,
    content:string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleConfirm: () => void 
}

const Modal = ({title,content, setOpen,handleConfirm }: Props) => {

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickAny = (e: any) => {
        if (!e.target.closest('#modal_content')) {
            setOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickAny)
        return () => {
            window.removeEventListener("click", handleClickAny)

        }
    })

    return (
        <div className={css.modal}>
            <div id="modal_content" className={css.modal_content}>
                <div className={css.modal_title}>
                    <h6>{title}</h6>
                    <span onClick={handleClose} className={css.close}>&times;</span>
                </div>
                <div className={css.modal_body}>
                    <span>{content}</span>
                </div>
                <div className={css.modal_actions}>
                    <button className={css.btn_confirm} onClick={handleConfirm}>Yes</button>
                    <button className={css.btn_cancel} onClick={handleClose}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Modal