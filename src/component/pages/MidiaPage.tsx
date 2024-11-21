import { Button, Chip, Input, Select, SelectItem, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import React, { useCallback, useEffect } from "react";
import { DROPD_SORTBY_DT_ASC_KEY, DROPD_SORTBY_DT_DESC_KEY, DROPD_SORTBY_TL_AZ_KEY, DROPD_SORTBY_TL_ZA_KEY, TAB_ANIMES_KEY, TAB_COMICS_KEY, TAB_MANGAS_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY, TYPE_F_COUNTRIES, TYPE_F_GENRE, TYPE_F_OWNED } from "../../utils/constantes";
import { createByType, isFilterMultipleSelect, isFilterSearch, isFilterSingleSelect, isNotNullArray, isNotNullStr } from "../../utils/utils";
import { AnimeIcon } from "../icons/AnimeIcon";
import { ComicIcon } from "../icons/ComicIcon";
import { MangaIcon } from "../icons/MangaIcon";
import { MovieIcon } from "../icons/MovieIcon";
import { TokusatsuIcon } from "../icons/TokusatsuIcon";
import { TVIcon } from "../icons/TvIcon";
import { SearchMidia } from "./SearchMidia";

import { Key } from '@react-types/shared';
import { useAuth } from "../../contexts/auth";
import { loadMidia } from "../../data/midia";
import { TableMidia } from "./TableMidia";

import type { Selection } from "@nextui-org/react";
import { ModalMidia } from "./ModalMidia";
import { SearchIcon } from "../icons/SearchIcon";
import { MinusIcon } from "../icons/MinusIcon";
import { GridIcon } from "../icons/GridIcon";
import { TableIcon } from "../icons/TableIcon";
import { FilterMidia } from "./FilterMidia";

interface MidiaPageProps {
    expandSearch: boolean;
    setExpandSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MidiaPage = ({
    expandSearch,
    setExpandSearch,
}: MidiaPageProps) => {

    const { username } = useAuth();
    const [selected, setSelected] = React.useState<Key>(TAB_MOVIES_KEY);
    const [valueSearch, setValueSearch] = React.useState('');
    const [selectedGenres, setSelectedGenres] = React.useState<Selection>(new Set([]));
    const [selectedCountries, setSelectedCountries] = React.useState<string[]>([]);
    const [isSelectedOwner, setIsSelectedOwner] = React.useState('all');

    const hasSearchFilter = isNotNullStr(valueSearch);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [midiaSelected, setMidiaSelected] = React.useState<any>();

    const [selectedSortByKeys, setSelectedSortByKeys] = React.useState<Selection>(new Set([DROPD_SORTBY_TL_AZ_KEY]));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);

    const [initialColumns, setInitialColumns] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<any[]>([]);

    const [changeGrid, setChangeGrid] = React.useState(true);

    const [moviesLoaded, setMoviesLoaded] = React.useState<any[]>([]);
    const [tvShowLoaded, setTvShowLoaded] = React.useState<any[]>([]);
    const [tvTokuLoaded, setTvTokuLoaded] = React.useState<any[]>([]);
    const [animesLoaded, setAnimesLoaded] = React.useState<any[]>([]);
    const [comicsLoaded, setComicsLoaded] = React.useState<any[]>([]);
    const [mangasLoaded, setMangasLoaded] = React.useState<any[]>([]);

    const handleLoad = useCallback(async () => {
        setMoviesLoaded(await loadMidia(TAB_MOVIES_KEY, username));
        setTvShowLoaded(await loadMidia(TAB_TV_KEY, username));
        setTvTokuLoaded(await loadMidia(TAB_TV_TOKU_KEY, username));
        setAnimesLoaded(await loadMidia(TAB_ANIMES_KEY, username));
        setComicsLoaded(await loadMidia(TAB_COMICS_KEY, username));
        setMangasLoaded(await loadMidia(TAB_MANGAS_KEY, username));
    }, [username]);

    useEffect(() => {
        setExpandSearch(false);

        handleLoad();
    }, [handleLoad]);

    const data = React.useMemo(() => {
        var midiaLoaded = [];
        if (selected === TAB_MOVIES_KEY) {
            setInitialColumns(["title", "year", "status", "owned"]);
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "YEAR", uid: "year" },
                { name: "COUNTRIES", uid: "countries" },
                { name: "STATUS", uid: "status", },
                { name: "OWNED", uid: "owned", }
            ]);
            midiaLoaded = moviesLoaded;
        } else if (selected === TAB_TV_KEY) {
            setInitialColumns(["title", "season", "year", "status", "owned"]);
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "SEASON", uid: "season" },
                { name: "YEAR", uid: "year" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", },
                { name: "COUNTRIES", uid: "countries" },
            ]);
            midiaLoaded = tvShowLoaded;
        } else if (selected === TAB_TV_TOKU_KEY) {
            setInitialColumns(["title", "season", "year", "type", "status", "owned"]);
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "SEASON", uid: "season" },
                { name: "YEAR", uid: "year" },
                { name: "TYPE", uid: "type" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
            midiaLoaded = tvTokuLoaded
        } else if (selected === TAB_ANIMES_KEY) {
            setInitialColumns(["title", "season", "year", "type", "status", "owned"]);
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "SEASON", uid: "season" },
                { name: "YEAR", uid: "year" },
                { name: "TYPE", uid: "type" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
            midiaLoaded = animesLoaded;
        } else if (selected === TAB_COMICS_KEY) {
            setInitialColumns(["title", "year", "publisher", "status", "owned"]);
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "YEAR", uid: "year" },
                { name: "PHASE", uid: "phase" },
                { name: "PUBLISHER", uid: "publisher" },
                { name: "COUNTRIES", uid: "countries" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
            midiaLoaded = comicsLoaded;
        } else if (selected === TAB_MANGAS_KEY) {
            setInitialColumns(["title", "year", "publisher", "status", "owned"]);
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "YEAR", uid: "year" },
                { name: "PUBLISHER", uid: "publisher" },
                { name: "LANGUAGE", uid: "language" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
            midiaLoaded = mangasLoaded;
        }

        return midiaLoaded;
    }, [selected, moviesLoaded, tvShowLoaded, tvTokuLoaded, animesLoaded, comicsLoaded, mangasLoaded]);

    const genres = React.useMemo(() => {
        return createByType(data, TYPE_F_GENRE);
    }, [data]);

    const countries = React.useMemo(() => {
        return createByType(data, TYPE_F_COUNTRIES);
    }, [data]);

    const owners = React.useMemo(() => {
        return ['all', 'true', 'false'];
    }, []);

    const wasResearch = () => {
        return hasSearchFilter
            || selectedGenres != null
            || isNotNullArray(selectedCountries)
            || isNotNullStr(isSelectedOwner);
    }

    const filteredItems = React.useMemo(() => {
        const sortByKey = Array.from(selectedSortByKeys).join(", ");

        let filtered = [...data].sort((a, b) => {
            if (DROPD_SORTBY_DT_DESC_KEY === sortByKey) {
                return b?.year - a?.year;
            } else if (DROPD_SORTBY_DT_ASC_KEY === sortByKey) {
                return a?.year - b?.year;
            } else if (DROPD_SORTBY_TL_ZA_KEY === sortByKey) {
                return b.title?.localeCompare(a?.title)
            }

            return a.title?.localeCompare(b?.title)
        });

        setRowsPerPage(hasSearchFilter ? 100 : rowsPerPage);
        setPage(1);

        return wasResearch() ?
            filtered
                .filter((m: any) => {
                    return isFilterSearch(valueSearch, m);
                })
                .filter((m: any) => {
                    return isFilterMultipleSelect(selectedGenres, m, TYPE_F_GENRE);
                })
                .filter((m: any) => {
                    return isFilterMultipleSelect(selectedCountries, m, TYPE_F_COUNTRIES);
                })
                .filter((m: any) => {
                    return isFilterSingleSelect(isSelectedOwner, m, TYPE_F_OWNED);
                })
            : filtered;
    }, [data, valueSearch, selectedGenres, selectedCountries, selectedSortByKeys, isSelectedOwner, rowsPerPage]);

    return (<>
        <ModalMidia
            key='modal_midia'
            midiaSelected={midiaSelected}
            isOpen={isOpen}
            onOpenChange={onOpenChange} />

        {/* <SearchMidia
            expandSearch={expandSearch}
            setExpandSearch={setExpandSearch}
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            countries={countries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            owners={owners}
            isSelectedOwner={isSelectedOwner}
            setIsSelectedOwner={setIsSelectedOwner}
        /> */}

        <FilterMidia
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
            selectedSortByKeys={selectedSortByKeys}
            setSelectedSortByKeys={setSelectedSortByKeys}
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            countries={countries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            owners={owners}
            isSelectedOwner={isSelectedOwner}
            setIsSelectedOwner={setIsSelectedOwner}
        />

        <div className="flex my-4 flex-row justify-between gap-6">
            <div></div>
            <div className="flex gap-4 items-center pr-2">
                <Button isIconOnly
                    size="lg"
                    aria-label="Grid"
                    variant={changeGrid ? 'faded' : 'shadow'}
                    //color={!changeGrid ? 'primary' : 'default'}
                    onPress={() => setChangeGrid(!changeGrid)}
                >
                    <GridIcon />
                </Button>

                <Button isIconOnly
                    aria-label="Table"
                    size="lg"
                    variant={!changeGrid ? 'faded' : 'shadow'}
                    //color={changeGrid ? 'primary' : 'default'}
                    onPress={() => setChangeGrid(!changeGrid)}>
                    <TableIcon />
                </Button>
            </div>
        </div>

        <div className="flex w-full flex-col">
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
                            <Chip size="sm" variant="faded">{moviesLoaded.length}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_TV_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <TVIcon />
                            <span>TV Shows</span>
                            <Chip size="sm" variant="faded">{tvShowLoaded.length}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_TV_TOKU_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <TokusatsuIcon />
                            <span>TV Tokusatsu</span>
                            <Chip size="sm" variant="faded">{tvTokuLoaded.length}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_ANIMES_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <AnimeIcon />
                            <span>Animes</span>
                            <Chip size="sm" variant="faded">{animesLoaded.length}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_COMICS_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <ComicIcon />
                            <span>Comics</span>
                            <Chip size="sm" variant="faded">{comicsLoaded.length}</Chip>
                        </div>
                    }
                />
                <Tab
                    key={TAB_MANGAS_KEY}
                    title={
                        <div className="flex items-center space-x-2">
                            <MangaIcon />
                            <span>Mangas</span>
                            <Chip size="sm" variant="faded">{mangasLoaded.length}</Chip>
                        </div>
                    }
                />
            </Tabs>
        </div>

        <TableMidia
            filteredItems={filteredItems}
            initialColumns={initialColumns}
            columns={columns}
            changeGrid={changeGrid}
            setChangeGrid={setChangeGrid}
            selectedSortByKeys={selectedSortByKeys}
            setSelectedSortByKeys={setSelectedSortByKeys}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            setMidiaSelected={setMidiaSelected}
            onOpen={onOpen}
        />
    </>)
}