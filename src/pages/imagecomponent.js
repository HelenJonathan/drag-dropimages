import Image from "next/image";
import { getUnsplashImages, searchImages } from "@/lib/utils";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const data = await getUnsplashImages();

  return { props: { data } };
}

export default function ImageComponent({ data }) {
  const [images, setImages] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedImage, setDraggedImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    if (searchQuery === "") {
      setImages(data);
    } else {
      async function search() {
        const data = await searchImages(searchQuery);
        return data.results;
      }
      search().then((res) => setImages(res));
    }
  }, [searchQuery]);

  const handleDragStart = (image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (image) => {
    if (!draggedImage || image.id === draggedImage.id) return;

    const newImages = images.filter((img) => img.id !== draggedImage.id);
    const draggedIndex = images.findIndex((img) => img.id === draggedImage.id);
    const dropIndex = images.findIndex((img) => img.id === image.id);

    newImages.splice(dropIndex, 0, draggedImage);
    setImages(newImages);
    setDraggedImage(null);
  };

  return (
    <div>
      <main>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative w-full h-96 max-w-md"
              draggable
              onDragStart={() => handleDragStart(image)}
              onDragOver={() => handleDragOver(image)}
            >
              <Image
                alt={image.alt_description}
                src={image.urls.regular}
                fill
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
