import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import Modal from "../lib/components/Modal";

const Home: NextPage = () => {
  const [animeList, setAnimeList] = useState<{
    animes: Anime[];
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
      .then((data: APIAnimeType[]) =>
        setAnimeList((x) => ({
          ...x,
          animes: data.map((d: any) => ({
            description: d.description,
            id: d.id,
            imgUrl: d.image,
            release: d.release_date,
            title: d.title,
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <title>LoopIn HQ</title>
      </Head>
      <AnimatePresence>
        {selectedAnime > -1 && (
          <Modal
            animeId={animeList.animes[selectedAnime].id}
            closeModal={() => setSelectedAnime(-1)}
          />
        )}
      </AnimatePresence>
      <div className="max-w-screen min-h-screen bg-blakc flex gap-6 flex-wrap justify-center relative py-12">
        {animeList.animes.map((anime: Anime, index: number) => (
          <div
            key={anime.id}
            className="bg-white flex flex-col justify-between rounded-lg md:hover:scale-110 hover:scale-100 drop-shadow-md overflow-hidden w-60 max-w-[15rem] transition-all"
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
