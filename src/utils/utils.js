export const handleMove = (id, newId, oldIndex, newIndex,images,setImages) => {
    const newImages = [...images];
    const movedImage = newImages[oldIndex];
    newImages.splice(oldIndex, 1);
    newImages.splice(newIndex, 0, movedImage);
    setImages(newImages);
  };