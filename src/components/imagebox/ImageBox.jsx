import React, {useEffect, useState} from "react";
import classes from "./ImageBox.module.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// luata de pe git -> https://www.youtube.com/watch?v=PDtW-XAshqs
const ImageBox = ({passIsPhoto, title, numberOfPhotos, deleteImage}) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        passIsPhoto((previousImages) => previousImages.concat(selectedFilesArray));

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        if (selectedImages.length < numberOfPhotos)
            setSelectedImages((previousImages) => previousImages.concat(imagesArray));
        console.log(selectedImages)

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function deleteHandler(image, index) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        passIsPhoto((previousImages) => {
            const img = previousImages[index];
            return previousImages.filter((e) => e !== img);
        });
        URL.revokeObjectURL(image);
    }

    useEffect(() => {
        deleteHandler(selectedImages[0], 1);
    }, [deleteImage])

    return (
        <div>
            <section className={classes.section}>
                {numberOfPhotos > 1 || selectedImages.length == 0 ?
                    <label className={classes.label}>
                        <AddAPhotoIcon/>
                        <span className={classes.span}>{title}</span>
                        <input
                            className={classes.input}
                            type="file"
                            name="images"
                            onChange={onSelectFile}
                            multiple
                            accept="image/png, image/jpeg, image/webp, image/jpg"
                        />
                    </label> : ""}
                <div className={classes.images}>
                    {selectedImages &&
                        selectedImages.map((image, index) => {
                            return (
                                <div key={image} className={classes.image}>
                                    <img src={image} height="80" width="80" alt="upload"/>
                                    <RemoveCircleIcon
                                        style={{
                                            position: "absolute",
                                            left: "65px",
                                            top: "-13px",
                                            color: "red"
                                        }}
                                        onClick={() => deleteHandler(image, index)}
                                    />
                                </div>
                            );
                        })}
                </div>
            </section>
        </div>
    );
};

export default ImageBox;
