import React from "react";
import "./index.css";
import { Background, Awning } from "./Style";

var i = 0;

let localAnimals = [];
const animalsAsString = localStorage.getItem("imageUrls");
if (animalsAsString) {
  localAnimals = JSON.parse(animalsAsString);
}

function App() {
  const [imageUrls, setImageUrls] = React.useState([]);
  const [saveUrls, setSaveUrls] = React.useState(localAnimals);

  //calls the API
  async function loadAnimalImageUrl() {
    const response = await fetch("https://kimsngeon.github.io/api.json");
    const animals = await response.json();

    setImageUrls([animals[i].image_url]);
  }

  //
  React.useEffect(function() {
    loadAnimalImageUrl();
  }, []);

  //load next image
  function loadNextImage() {
    if (i === 99) {
      i = 0;
    } else {
      i++;
    }

    loadAnimalImageUrl();
  }

  //load pervious image
  function loadPreviousImage() {
    if (i === 0) {
      i = 99;
    } else {
      i--;
    }

    loadAnimalImageUrl();
  }

  //save image to favorite list
  function saveImageUrl(indexToSave) {
    const newSaveurls = [...saveUrls, indexToSave];
    setSaveUrls(newSaveurls);

    const animalsAsString = JSON.stringify(newSaveurls);
    localStorage.setItem("imageUrls", animalsAsString);
  }

  //remove image from favorite list
  function removeImageUrl(indexToRemove) {
    const updatedImageUrls = saveUrls.filter(function(saveUrl, index) {
      const keepImage = indexToRemove !== index;
      return keepImage;
    });
    setSaveUrls(updatedImageUrls);

    const animalsAsString = JSON.stringify(updatedImageUrls);
    localStorage.setItem("imageUrls", animalsAsString);
  }

  //return image with save button
  const ImageElements = imageUrls.map(function(imageUrl) {
    return (
      <div>
        <h1>{i + 1}/100</h1>
        <img src={imageUrl} alt="animal" style={{ maxHeight: 200 }} />
        <br />
        <button onClick={() => saveImageUrl(imageUrl)}>invite home</button>
      </div>
    );
  });

  //return saved images
  const savedImageElements = saveUrls.map(function(saveUrl, index) {
    return (
      <div id="savedListItem">
        <img src={saveUrl} alt="saved-animal" style={{ maxHeight: 200 }} />
        <br />
        <button onClick={() => removeImageUrl(index)}>let go home</button>
      </div>
    );
  });

  //if there is any saved images
  function Noone() {
    if (saveUrls === undefined || saveUrls.length === 0) {
      return (
        <div>
          <br />
          <h1>anybody here?</h1>
        </div>
      );
    } else {
      return <div />;
    }
  }

  //return to html
  return (
    <div>
      <Background />

      <div className="load-box">
        {ImageElements}
        <button className="arrow" onClick={loadPreviousImage}>
          {" "}
          ←{" "}
        </button>
        <button className="arrow" onClick={loadNextImage}>
          {" "}
          →{" "}
        </button>
      </div>

      <div>
        <Awning />

        <div className="favorite-box">
          <h1 style={{ marginTop: 50 + "px" }}>Your Favorite Friends</h1>
          <Noone />

          {savedImageElements}
        </div>
      </div>
    </div>
  );
}

export default App;
