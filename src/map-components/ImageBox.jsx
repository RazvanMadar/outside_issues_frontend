import React, {useState} from "react";
import classes from "./ImageBox.module.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// luata de pe git -> https://www.youtube.com/watch?v=PDtW-XAshqs
const ImageBox = ({passIsPhoto}) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        passIsPhoto((previousImages) => previousImages.concat(selectedFilesArray));

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        console.log(imagesArray)

        if (selectedImages.length < 3)
            setSelectedImages((previousImages) => previousImages.concat(imagesArray));

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

    return (
        <div>
            <section className={classes.section}>
                <label className={classes.label}>
                    <AddAPhotoIcon/>
                    <span className={classes.span}>până la 3 imagini (max. 20MB)</span>
                    <input
                        className={classes.input}
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png , image/jpeg, image/webp"
                    />
                </label>
                {/*<Button variant="contained" onClick={() => console.log(images.map((e) => e))}>Contained</Button>*/}
                {/*<input className={classes.input} type="file" multiple/>*/}
                {selectedImages.length > 3 && (
                    <p className={classes.error}>
                        You can't upload more than 3 images! <br/>
                        <span className={classes.span}>
              please delete <b> {selectedImages.length - 3} </b> of them{" "}
            </span>
                    </p>
                )}

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
