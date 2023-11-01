import { useDrag, useDrop } from "react-dnd";
import { handleMove } from "../utils/utils";
const ItemTypes = {
  IMAGE: "image",
};

const Image = ({ src, id, index, images, setImages, setCart, cart }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: (item, monitor) => {
      handleMove(item.id, id, item.index, index, images, setImages);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`img_card ${
        images[index].isChecked ? " img_card_after_select" : ""
      } ${index === 0 ? "active" : ""}`}
      style={{
        opacity,
        border: isOver ? "1px dashed #C3C3C3" : "1px solid #C3C3C3",
        marginBottom: "10px",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        minHeight: "200px",
      }}
    >
      <input
        onChange={(e) => {
          const _data = [...images];
          _data[index]["isChecked"] = e.target.checked;
          if (!!e.target.checked) {
            setCart([...cart, images[index]]);
          }

          if (e.target.checked === false) {
            const deleteItem = cart?.filter((item) => item?.id !== id);
            setCart(deleteItem);
          }
          setImages(_data);
        }}
        className={`card_checkbox ${
          images[index]?.isChecked ? "show" : "hide"
        }`}
        type="checkbox"
      />
      <img
        src={src}
        alt={`gallery-item-${id}`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Image;
