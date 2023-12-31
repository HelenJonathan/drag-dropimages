// import Image from "next/image";
import { getUnsplashImages, searchImages } from "@/lib/utils";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const data = await getUnsplashImages();

  return { props: { data } };
}

export default function Home({ data }) {
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
    <>
      <header className="p-5">
        <div className="flex justify-between items-center">
          <h1>Image Gallery</h1>
        </div>

        <div>
          {" "}
          <form className="border-2 border-gray-800 rounded-md px-3 py-1 w-full max-w-[525px] mx-auto flex justify-between items-center">
            {" "}
            <input
              type="text"
              name="query"
              className="bg-transparent placeholder:text-xs outline-none w-full"
              placeholder="Search"
              id="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </header>

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
    </>
  );
}
