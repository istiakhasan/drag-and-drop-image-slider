import { v4 as uuidv4 } from 'uuid';
import Image from './Image';
import { handleMove } from '../utils/utils';
 const Gallery = ({ cart, setCart, setImages, images }) => {
  
    return (
      <div className="gallery_wraper">
        {images.map((item, index) => (
          <Image
            key={item.id}
            id={item.id}
            src={item.image}
            index={index}
            onMove={handleMove}
            images={images}
            setImages={setImages}
            setCart={setCart}
            cart={cart}
          />
        ))}
        <label 
          htmlFor="file_upload"
          style={{
            border: "1px dashed #C3C3C3",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height:"200px"
          }}
        >
          <i className="fa-solid fa-image  mb-2"></i>
          <p style={{fontSize:"16px",fontWeight:"500",color:"#363636"}}>Add Images</p>
          <input onChange={(e)=>{
              e.preventDefault();
              const file = e.target.files[0];
              const imageUrl = URL.createObjectURL(file);
              const newData={
                  image:imageUrl,
                  id:uuidv4()
              }
              setImages([...images,newData])
              e.target.value = null;
          }} style={{display:"none"}} type="file" id="file_upload" />
        </label>
      </div>
    );
  };


  export default Gallery