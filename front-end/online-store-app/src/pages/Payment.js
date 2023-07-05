import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import yourImage from "../assets/login-icon-2.svg";

function Payment() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <Cropper
      image={yourImage}
      crop={crop}
      zoom={zoom}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
}

export default Payment;
