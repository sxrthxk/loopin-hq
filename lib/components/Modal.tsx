import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import Loader from "./Loader";

const Modal = ({
  animeId,
  closeModal,
}: {
  animeId: string;
  closeModal: () => void;
}) => {
  const [anime, setAnime] = useState<AnimeDetails | undefined>(undefined);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    fetch(`https://ghibliapi.herokuapp.com/films/${animeId}`)
      .then((res) => res.json())
      .then((data: APIAnimeType) =>
        setAnime({
          banner: data.movie_banner,
          description: data.description,
          director: data.director,
          id: data.id,
          imgUrl: data.image,
          originalTitle: data.original_title,
          release: data.release_date,
          romanizedTitle: data.original_title_romanised,
          title: data.title,
        })
      );
  }, [animeId]);

  const imageLoadHandler = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-20"
    >
      <div
        className="fixed top-0 bottom-0 w-screen h-screen bg-black opacity-75"
        onClick={closeModal}
      ></div>
      <motion.div
        initial={{
          y: 500,
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: 500,
        }}
        transition={{
          ease: "easeOut",
        }}
        className="bg-white rounded-lg z-30 w-[90vw] md:w-3/4 h-[75vh] md:h-4/5 overflow-hidden drop-shadow-lg relative"
      >
        <IoMdClose
          onClick={closeModal}
          className="absolute m-2 top-0 right-0 w-6 h-6 z-30 fill-current text-white drop-shadow-md cursor-pointer"
        />
        {anime ? (
          <>
            <div className="relative w-full h-80">
              <Image
                src={anime.banner}
                alt="Banner"
                layout="fill"
                objectFit="cover"
                onLoad={imageLoadHandler}
              />
              {!imageLoaded && (
                <div className="z-20 w-full h-full absolute bg-white flex justify-center items-center">
                  <Loader className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="p-2">
              <div className="flex justify-between flex-col md:flex-row">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">
                    {anime.title}
                  </h1>
                  <h1 className="font-semibold text-base md:text-lg">
                    <span className="text-gray-500">Original: </span>
                    {anime.originalTitle}
                    <span className="italic text-gray-500">
                      {` (${anime.romanizedTitle})`}
                    </span>
                  </h1>
                </div>
                <div className="flex flex-col">
                  <span className="italic text-gray-600">
                    <strong>Release:</strong> {anime.release}
                  </span>
                  <span className="italic text-gray-600">
                    <strong>Director:</strong> {anime.director}
                  </span>
                </div>
              </div>
              <p className="rounded-lg my-2 p-2 overflow-y-auto h-24 md:h-36">
                {anime.description}
              </p>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Loader className="h-12 w-12" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
