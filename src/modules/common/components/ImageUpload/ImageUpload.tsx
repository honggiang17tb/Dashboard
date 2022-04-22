import React, { useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";


interface Props {
    data?: any
    setValueUpdate?: any
    setFile?:any
}

export function ImageUpload({ data, setValueUpdate,setFile }: Props) {
    const [images, setImages] = React.useState<ImageListType>(data);
    const maxNumber = 100;

    const handleChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // Data for submit
        setImages(imageList as never[]);
    };
    
    

    useEffect(() => {
        setValueUpdate((prev: any) => {
            return { ...prev, imagesOrder: images.map((item) => { return typeof (item.file) == 'object' ? item.file.name : item.file }) }
        })
        const listFile:any = []
        images.forEach((x:any,i:any)=>{
           typeof(x.file) === 'object' ? listFile.push({file:x.file,order:i}) : null
        })
        setFile(listFile)
        
    }, [images])



    return (
        <div className="upload__image">
            <ImageUploading
                multiple
                value={images}
                onChange={handleChange}
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    // Write your building UI
                    <div className="upload__image-wrapper">
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.dataURL} alt="" width="124px" height='124px' />
                                <div className="image-item__btn-wrapper">

                                    <i className="fa fa-times-circle" onClick={() => {
                                        setValueUpdate((prev: any) => {
                                            return { ...prev, deleted_images: [...prev.deleted_images,+image.id] }
                                        })
                                        onImageRemove(index)
                                    }}
                                    ></i>
                                </div>
                            </div>
                        ))}
                        <div
                            className="file-cta"
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <i className="fa fa-camera icon-camera"></i>
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
