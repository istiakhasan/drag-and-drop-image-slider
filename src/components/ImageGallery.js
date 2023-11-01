import React, { useState } from "react";
import { DATA } from "../utils/data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { handleDragAndDrop } from "../utils/utils";

const ImageGallery = () => {
  const [stores, setStores] = useState(DATA);
const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };
  return (
    <div className="container-fluid  px-5 py-3">
      <div className="image_gallary_container">
        <h4 className="mb-0 px-4 py-3">Gallery</h4>
        <div style={{ background: "rgba(0,0,0,.1)", height: "1px" }}></div>
        <div className="mb-0 px-4 py-3">
          <DragDropContext onDragEnd={handleDragAndDrop}>
           
            <Droppable className="gallery_wraper"  droppableId="ROOT" type="group">
              {(provided) => (
                <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      index={index}
                      key={store.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            style={{
                              width: "300px",
                              height: "200px",
                              border: "1px solid #C3C3C3",
                              marginBottom: "10px",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              className="w-100 h-100"
                              src={store.image}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
         
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
