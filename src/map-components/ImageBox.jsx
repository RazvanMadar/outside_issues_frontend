import React, { useState } from "react";
import classes from "./ImageBox.module.css";
import BackspaceIcon from "@mui/icons-material/Backspace";

// luata de pe git -> https://www.youtube.com/watch?v=PDtW-XAshqs
const ImageBox = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <div>
      <section className={classes.section}>
        <label className={classes.label}>
          + Add Images
          <br />
          <span className={classes.span}>up to 4 images</span>
          <input
            className={classes.input}
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
          />
        </label>
        <br />

        <input className={classes.input} type="file" multiple />

        {selectedImages.length > 0 && selectedImages.length > 4 && (
          <p className={classes.error}>
            You can't upload more than 4 images! <br />
            <span className={classes.span}>
              please delete <b> {selectedImages.length - 4} </b> of them{" "}
            </span>
          </p>
        )}

        <div className={classes.images}>
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className={classes.image}>
                  <img src={image} height="150" width="150" alt="upload" />
                  <BackspaceIcon
                    style={{
                      position: "absolute",
                      left: "80%",
                    }}
                    onClick={() => deleteHandler(image)}
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
