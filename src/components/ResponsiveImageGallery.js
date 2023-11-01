import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DATA } from "../utils/data";
import Gallery from "./Gallery";
const ResponsiveImageGallery = () => {
  const [images, setImages] = useState(DATA);
  const [cart, setCart] = useState([]);
  return (
    <div className="container  px-5 py-3">
      <div className="image_gallary_container">
        <div className="d-flex justify-content-between align-items-center px-4 py-3">
          {!cart?.length > 0 ? (
            <h4 className="mb-0  ">Gallery</h4>
          ) : (
            <h4 className="mb-0 ">
              {cart.length} {cart.length > 1 ? "Files" : "File"} Selected
            </h4>
          )}

          {cart?.length > 0 && (
            <h6
              onClick={() => {
                const _data = [...images];
                const remaining_items = _data.filter(
                  (item) => !cart.some((cartItem) => cartItem.id === item.id)
                );
                setImages(remaining_items);
                setCart([]);
              }}
              style={{ cursor: "pointer" }}
              className="text-danger mb-0 delete_btn"
              
              
            >
              Delete {cart.length>1?"files":"file"}
            </h6>
          )}
        </div>
        <div style={{ background: "rgba(0,0,0,.1)", height: "1px" }}></div>
        <div className="mb-0 px-4 py-3">
          <DndProvider backend={HTML5Backend}>
            <div style={{ margin: "20px" }}>
              <Gallery
                cart={cart}
                setCart={setCart}
                images={images}
                setImages={setImages}
              />
            </div>
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveImageGallery;


