import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import Modal from "../lib/components/Modal";

const Home: NextPage = () => {
  const [animeList, setAnimeList] = useState<{
    animes: any[];
    fetched: "yes" | "no" | "fetching";
  }>({
    animes: [],
    fetched: "no",
  });

  useEffect(() => {
    setAnimeList((x) => ({
      ...x,
      fetched: "fetching",
    }));
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => res.json())
      .then((data) =>
        setAnimeList((x) => ({
          ...x,
          animes: data.map((d: any) => ({
            description: d.description,
            id: d.id,
            imgUrl: d.image,
            banner: d.movie_banner,
            release: d.release_date,
            director: d.director,
            title: d.title,
            romanizedTitle: d.original_title_romanised,
            originalTitle: d.original_title,
          })),
        }))
      );
  }, []);

  const [selectedAnime, setSelectedAnime] = useState(-1);

  const detailsClickHandler = (index: number) => {
    setSelectedAnime(index);
  };

  return (
    <>
      <AnimatePresence>
        {selectedAnime > -1 && (
          <Modal
            anime={animeList.animes[selectedAnime]}
            closeModal={() => setSelectedAnime(-1)}
          />
        )}
      </AnimatePresence>
      <div className="max-w-screen min-h-screen bg-blakc flex gap-6 flex-wrap justify-center relative">
        {animeList.animes.map((anime: Anime, index: number) => (
          <div
            key={anime.id}
            className="bg-white flex flex-col justify-between rounded-lg hover:scale-110 drop-shadow-md overflow-hidden w-48 transition-all"
          >
            <div className="w-full h-72 relative">
              {
                <Image
                  src={anime.imgUrl}
                  layout="fill"
                  objectFit="cover"
                  alt="Cover Image"
                />
              }
            </div>
            <div className="flex flex-col p-3">
              <h1 className="font-semibold">{anime.title}</h1>
              <span className="text-md font-light italic text-gray-500">
                {anime.release}
              </span>
              <span className="text-gray-400 font-light">
                {anime.description.slice(0, 50)}...
              </span>
            </div>
            <button
              className="w-full outline-none flex items-center justify-between p-2 bg-red mb-0 text-white font-semibold"
              onClick={() => detailsClickHandler(index)}
            >
              <span>Show Details</span>
              <FiChevronsRight />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
