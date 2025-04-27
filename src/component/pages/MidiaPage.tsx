import { Button, Chip, Navbar, NavbarBrand, NavbarContent, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import React, { useCallback, useEffect, useRef } from "react";
import { DROPD_SORTBY_DT_ASC_KEY, DROPD_SORTBY_DT_DESC_KEY, DROPD_SORTBY_TL_AZ_KEY, DROPD_SORTBY_TL_ZA_KEY, TAB_ANIMES_KEY, TAB_BOOKS_KEY, TAB_COMICS_KEY, TAB_MANGAS_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY, TYPE_F_COUNTRIES, TYPE_F_GENRE, TYPE_F_LANGUAGE, TYPE_F_OWNED, TYPE_F_STATUS } from "../../utils/constantes";
import { createByType, isFilterMultipleSelect, isFilterSearch, isFilterSingleSelect, isNotNullSelectionArray, isNotNullStr } from "../../utils/utils";
import { AnimeIcon } from "../icons/AnimeIcon";
import { ComicIcon } from "../icons/ComicIcon";
import { MangaIcon } from "../icons/MangaIcon";
import { MovieIcon } from "../icons/MovieIcon";
import { TokusatsuIcon } from "../icons/TokusatsuIcon";
import { TVIcon } from "../icons/TvIcon";

import { Key } from '@react-types/shared';
import { useAuth } from "../../contexts/auth";
import { loadMidia } from "../../data/midia";

import type { Selection } from "@nextui-org/react";
import { GridIcon } from "../icons/GridIcon";
import { TableIcon } from "../icons/TableIcon";
import { ComponentMidia } from "./ComponentMidia";
import { FilterMidia } from "./FilterMidia";
import { ModalMidia } from "./ModalMidia";

interface MidiaPageProps {
}

export const MidiaPage = ({
}: MidiaPageProps) => {

    const { username } = useAuth();
    const [selected, setSelected] = React.useState<Key>(TAB_MOVIES_KEY);
    const [valueSearch, setValueSearch] = React.useState('');
    const [isAdult18, setAdult18] = React.useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = React.useState<Selection>(new Set([]));
    const [selectedCountries, setSelectedCountries] = React.useState<Selection>(new Set());
    const [selectedLanguages, setSelectedLanguages] = React.useState<Selection>(new Set());
    const [isSelectedOwner, setIsSelectedOwner] = React.useState<Selection>(new Set());
    const [selectedStatus, setSelectedStatus] = React.useState<Selection>(new Set());

    const hasSearchFilter = isNotNullStr(valueSearch);
    const hasAdult18Filter = !!isAdult18;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [midiaSelected, setMidiaSelected] = React.useState<any>();

    const [selectedSortByKeys, setSelectedSortByKeys] = React.useState<Selection>(new Set([DROPD_SORTBY_DT_DESC_KEY]));
    const [rowsPerPage, setRowsPerPage] = React.useState(24);
    const [page, setPage] = React.useState(1);

    const [changeVisibleMidia, setChangeVisibleMidia] = React.useState(true);

    const pageTopRef = useRef<HTMLDivElement>(null);

    const [moviesLoaded, setMoviesLoaded] = React.useState<any[]>([]);
    const [tvShowLoaded, setTvShowLoaded] = React.useState<any[]>([]);
    const [tvTokuLoaded, setTvTokuLoaded] = React.useState<any[]>([]);
    const [animesLoaded, setAnimesLoaded] = React.useState<any[]>([]);
    const [comicsLoaded, setComicsLoaded] = React.useState<any[]>([]);
    const [mangasLoaded, setMangasLoaded] = React.useState<any[]>([]);
    const [booksLoaded, setBooksLoaded] = React.useState<any[]>([]);

    const handleLoad = useCallback(async () => {
        setMoviesLoaded(await loadMidia(TAB_MOVIES_KEY, username));
        setTvShowLoaded(await loadMidia(TAB_TV_KEY, username));
        setTvTokuLoaded(await loadMidia(TAB_TV_TOKU_KEY, username));
        setAnimesLoaded(await loadMidia(TAB_ANIMES_KEY, username));
        setComicsLoaded(await loadMidia(TAB_COMICS_KEY, username));
        setMangasLoaded(await loadMidia(TAB_MANGAS_KEY, username));
        setBooksLoaded(await loadMidia(TAB_BOOKS_KEY, username));
    }, [username]);

    useEffect(() => {
        //setExpandSearch(false);

        handleLoad();
    }, [handleLoad]);

    const data = React.useMemo(() => {
        var midiaLoaded = [];
        if (selected === TAB_MOVIES_KEY) {
            midiaLoaded = moviesLoaded;
        } else if (selected === TAB_TV_KEY) {
            midiaLoaded = tvShowLoaded;
        } else if (selected === TAB_TV_TOKU_KEY) {
            midiaLoaded = tvTokuLoaded
        } else if (selected === TAB_ANIMES_KEY) {
            midiaLoaded = animesLoaded;
        } else if (selected === TAB_COMICS_KEY) {
            midiaLoaded = comicsLoaded;
        } else if (selected === TAB_MANGAS_KEY) {
            midiaLoaded = mangasLoaded;
        } else if (selected === TAB_BOOKS_KEY) {
            midiaLoaded = booksLoaded;
        }

        return midiaLoaded;
    }, [selected, moviesLoaded, tvShowLoaded, tvTokuLoaded, animesLoaded, comicsLoaded, mangasLoaded, booksLoaded]);

    const genres = React.useMemo(() => {
        return createByType(data, TYPE_F_GENRE);
    }, [data]);

    const countries = React.useMemo(() => {
        return createByType(data, TYPE_F_COUNTRIES);
    }, [data]);

    const languages = React.useMemo(() => {
        return createByType(data, TYPE_F_LANGUAGE);
    }, [data]);

    const wasResearch = () => {
        return hasSearchFilter
            || !hasAdult18Filter
            || isNotNullSelectionArray(selectedGenres)
            || isNotNullSelectionArray(selectedCountries)
            || isNotNullSelectionArray(selectedLanguages)
            || isNotNullSelectionArray(isSelectedOwner)
            || isNotNullSelectionArray(selectedStatus);
    }

    const filteredItems = React.useMemo(() => {
        const sortByKey = Array.from(selectedSortByKeys).join(", ");

        let filtered = [...data].sort((a, b) => {

            if (DROPD_SORTBY_DT_DESC_KEY === sortByKey) {
                return b?.year - a?.year;
            } else if (DROPD_SORTBY_DT_ASC_KEY === sortByKey) {
                return a?.year - b?.year;
            } else if (DROPD_SORTBY_TL_ZA_KEY === sortByKey) {
                return b?.title?.localeCompare(a?.title)
            }

            return a?.title?.localeCompare(b?.title)
        });

        setRowsPerPage(hasSearchFilter ? 100 : rowsPerPage);
        setPage(1);

        return wasResearch() ?
            filtered
                .filter((m: any) => {
                    if (!hasAdult18Filter) {
                        return !isFilterMultipleSelect(new Set(['Adult', 'Erotic']), m, TYPE_F_GENRE);
                    }
                    return true;
                })
                .filter((m: any) => isFilterSearch(valueSearch, m))
                .filter((m: any) => isFilterMultipleSelect(selectedGenres, m, TYPE_F_GENRE))
                .filter((m: any) => isFilterSingleSelect(selectedCountries, m, TYPE_F_COUNTRIES))
                .filter((m: any) => isFilterSingleSelect(selectedLanguages, m, TYPE_F_LANGUAGE))
                .filter((m: any) => isFilterSingleSelect(isSelectedOwner, m, TYPE_F_OWNED))
                .filter((m: any) => isFilterSingleSelect(selectedStatus, m, TYPE_F_STATUS))
            : filtered;
    }, [data, valueSearch, hasAdult18Filter, selectedGenres, selectedCountries, selectedLanguages, selectedSortByKeys, isSelectedOwner, selectedStatus, changeVisibleMidia, rowsPerPage]);

    let tabs = [
        {
            id: TAB_MOVIES_KEY,
            icon: <MovieIcon />,
            title: 'Movies',
            length: moviesLoaded.length
        },
        {
            id: TAB_TV_KEY,
            icon: <TVIcon />,
            title: 'TV Shows',
            length: tvShowLoaded.length
        },
        {
            id: TAB_TV_TOKU_KEY,
            icon: <TokusatsuIcon />,
            title: 'TV Tokusatsu',
            length: tvTokuLoaded.length
        },
        {
            id: TAB_ANIMES_KEY,
            icon: <AnimeIcon />,
            title: 'Animes',
            length: animesLoaded.length
        },
        {
            id: TAB_COMICS_KEY,
            icon: <ComicIcon />,
            title: 'Comics',
            length: comicsLoaded.length
        },
        {
            id: TAB_MANGAS_KEY,
            icon: <MangaIcon />,
            title: 'Mangas',
            length: mangasLoaded.length
        },
        {
            id: TAB_BOOKS_KEY,
            icon: <ComicIcon />,
            title: 'Books',
            length: booksLoaded.length
        }
    ]

    return (<>
        <div className="flex flex-col">
            <Navbar
                isBordered isBlurred={false}>
                <NavbarContent justify="start">
                    <NavbarBrand>
                        <p className="font-bold font-mono text-3xl text-inherit">
                            MP Collections
                        </p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="end">
                <div className="flex flex-row justify-between gap-2">
                    <div></div>
                    <div className="flex gap-1 items-center">
                        <Button isIconOnly
                            size="lg"
                            aria-label="Grid"
                            variant={changeVisibleMidia ? 'faded' : 'shadow'}
                            onPress={() => setChangeVisibleMidia(!changeVisibleMidia)}>
                            <GridIcon />
                        </Button>

                        <Button isIconOnly
                            size="lg"
                            aria-label="Table"
                            variant={!changeVisibleMidia ? 'faded' : 'shadow'}
                            onPress={() => setChangeVisibleMidia(!changeVisibleMidia)}>
                            <TableIcon />
                        </Button>
                    </div>
                </div>
                </NavbarContent>
            </Navbar>

            <ModalMidia
                key='modal_midia'
                midiaSelected={midiaSelected}
                isOpen={isOpen}
                onOpenChange={onOpenChange} />

            <div className="px-0">
                <FilterMidia
                    valueSearch={valueSearch}
                    setValueSearch={setValueSearch}
                    setSelectedSortByKeys={setSelectedSortByKeys}
                    setAdult18={setAdult18}
                    genres={genres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    countries={countries}
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    languages={languages}
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                    isSelectedOwner={isSelectedOwner}
                    setIsSelectedOwner={setIsSelectedOwner}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus} />

                <div className="flex w-full flex-col" ref={pageTopRef}>
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
                        onSelectionChange={(e) => {
                            if (e === TAB_COMICS_KEY || e === TAB_MANGAS_KEY || e === TAB_BOOKS_KEY) {
                                setSelectedSortByKeys(new Set([DROPD_SORTBY_TL_AZ_KEY]))
                            } else {
                                setSelectedSortByKeys(new Set([DROPD_SORTBY_DT_DESC_KEY]))
                            }
                            setSelected(e);
                        }}
                        items={tabs}>
                        {(item) => (
                            <Tab key={item.id} title={<>
                                <div className="flex items-center space-x-2">
                                    {item.icon}
                                    <span>{item.title}</span>
                                    <Chip size="sm" variant="faded">{item.length}</Chip>
                                </div>
                            </>} />
                        )}
                    </Tabs>
                </div>

                <ComponentMidia
                    filteredItems={filteredItems}
                    selected={selected}
                    changeVisibleMidia={changeVisibleMidia}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    setMidiaSelected={setMidiaSelected}
                    onOpen={onOpen}
                    pageTopRef={pageTopRef}
                />
            </div>
        </div>
    </>)
}