import React from "react";
import classes from "./ImageBox.module.css";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ImageBoxProfile = ({passIsPhoto, passSetNewImage, title}) => {
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        passSetNewImage(selectedFilesArray[0])
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        passIsPhoto(imagesArray[0])

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    return (
        <div>
            <section className={classes.section}>
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
                </label>
            </section>
        </div>
    );
};

export default ImageBoxProfile;
