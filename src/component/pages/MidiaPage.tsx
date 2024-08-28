import React, { useEffect } from "react";
import { SearchMidia } from "./SearchMidia";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import { MovieIcon } from "../icons/MovieIcon";
import { TVIcon } from "../icons/TvIcon";
import { TokusatsuIcon } from "../icons/TokusatsuIcon";
import { AnimeIcon } from "../icons/AnimeIcon";
import { ComicIcon } from "../icons/ComicIcon";
import { MangaIcon } from "../icons/MangaIcon";

const TAB_MOVIES_KEY = "movies";
const TAB_TV_KEY = "tv_shows";
const TAB_TV_TOKU_KEY = "tv_toku";
const TAB_ANIMES_KEY = "animes";
const TAB_COMICS_KEY = "comics";
const TAB_MANGAS_KEY = "mangas";

interface MidiaPageProps {
    expandSearch: boolean;
    setExpandSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MidiaPage = ({
    expandSearch,
    setExpandSearch,
}: MidiaPageProps) => {

    const [selected, setSelected] = React.useState(TAB_MOVIES_KEY);

    useEffect(() => {
        setExpandSearch(false);
    }, [])

    return (<>
        <SearchMidia
            expandSearch={expandSearch}
            setExpandSearch={setExpandSearch}
            valueSearch=""
            setValueSearch={() => { }}
            genres={[]}
            selectedGenres={[]}
            setSelectedGenres={() => { }}
            countries={[]}
            selectedCountries={[]}
            setSelectedCountries={() => { }}
            isSelectedOwner={false}
            setIsSelectedOwner={() => { }}
        />

        <div className="flex w-full flex-col ">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                }}
                selectedKey={selected}
                onSelectionChange={setSelected}
            >
                <Tab
                    key={TAB_MOVIES_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <MovieIcon />
                            <span>Movies</span>
                            <Chip size="sm" variant="faded">{0}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_TV_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <TVIcon />
                            <span>TV Shows</span>
                            <Chip size="sm" variant="faded">{0}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_TV_TOKU_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <TokusatsuIcon />
                            <span>TV Tokusatsu</span>
                            <Chip size="sm" variant="faded">{0}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_ANIMES_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <AnimeIcon />
                            <span>Animes</span>
                            <Chip size="sm" variant="faded">{0}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_COMICS_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <ComicIcon />
                            <span>Comics</span>
                            <Chip size="sm" variant="faded">{0}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_MANGAS_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <MangaIcon />
                            <span>Mangas</span>
                            <Chip size="sm" variant="faded">{0}</Chip>
                        </div>
                    }
                />
            </Tabs>
        </div>
    </>)
}