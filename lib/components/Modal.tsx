import Image from "next/image";
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const Modal = ({
  anime,
  closeModal,
}: {
  anime: Anime;
  closeModal: () => void;
}) => {
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
          ease: 'easeOut'
        }}
        className="bg-white rounded-lg z-30 w-3/4 h-4/5 overflow-hidden drop-shadow-lg relative"
      >
        <IoMdClose
          onClick={closeModal}
          className="absolute m-2 top-0 right-0 w-6 h-6 z-30 fill-current text-white drop-shadow-md cursor-pointer"
        />

        <div className="relative w-full h-80">
          <Image
            src={anime.banner}
            alt="Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-2">
          <h1 className="text-2xl font-bold">{anime.title}</h1>
          <h1 className="font-semibold text-lg">
            <span className="text-gray-500">Original: </span>
            {anime.originalTitle}
            <span className="italic text-gray-500">
              {` (${anime.romanizedTitle})`}
            </span>
          </h1>
          <p className=" rounded-lg my-2 p-2 overflow-y-auto h-36">{anime.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
