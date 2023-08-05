import React, { useState } from "react";

const Create = () => {
  const hiddenFileInput = React.useRef(null);
  const [images, setImages] = React.useState([]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const files = event.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length && i < 10; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (i === files.length - 1 || i === 9) {
          setImages([...images, ...imageArray]);
        }
      };
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <section className="bg-primary py-[100px]">
      <div className="w-[450px] h-[300px] bg-grey border-b-2 border-lightgrey relative hover:bg-lightgrey transition duration-300 ease-in-out">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[75px] h-[75px] mt-10"></div>
      </div>
      <div className="flex justify-center">
        <input
          type="file"
          ref={hiddenFileInput}
          multiple
          onChange={handleChange}
          style={{ display: "none" }}
          accept="image/*"
        />
      </div>
      <div className="image-previews flex justify-center flex-col">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img
              className="m-auto max-w-[1000px] px-8 py-2 w-[100%]"
              src={image}
              alt={`Preview ${index}`}
            />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className=" m-auto max-w-[800px] w-[100%] h-[50px] px-8 py-2 bg-grey hover:border-dashed hover:border-2 border-purple"
        >
          <i className="fa-solid fa-image text-white fa-xl"></i>
        </button>
      </div>
    </section>
  );
};

export default Create;
