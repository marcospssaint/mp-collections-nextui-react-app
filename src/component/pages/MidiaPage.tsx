import { Chip, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import { TAB_ANIMES_KEY, TAB_COMICS_KEY, TAB_MANGAS_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY, TYPE_F_COUNTRIES, TYPE_F_GENRE } from "../../utils/constantes";
import { isFilterMultipleSelect, isFilterSearch, isNotNullArray, isNotNullStr } from "../../utils/utils";
import { AnimeIcon } from "../icons/AnimeIcon";
import { ComicIcon } from "../icons/ComicIcon";
import { MangaIcon } from "../icons/MangaIcon";
import { MovieIcon } from "../icons/MovieIcon";
import { TokusatsuIcon } from "../icons/TokusatsuIcon";
import { TVIcon } from "../icons/TvIcon";
import { SearchMidia } from "./SearchMidia";

import { Key } from '@react-types/shared';
import { TableMidia } from "./TableMidia";

interface MidiaPageProps {
    expandSearch: boolean;
    setExpandSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MidiaPage = ({
    expandSearch,
    setExpandSearch,
}: MidiaPageProps) => {

    const [selected, setSelected] = React.useState<Key>(TAB_MOVIES_KEY);
    const [valueSearch, setValueSearch] = React.useState('');
    const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = React.useState<string[]>([]);
    const [isSelectedOwner, setIsSelectedOwner] = React.useState(true);

    const hasSearchFilter = isNotNullStr(valueSearch);

    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [page, setPage] = React.useState(1);

    const [initialColumns, setInitialColumns] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<any[]>([]);

    useEffect(() => {
        setExpandSearch(false);
    }, [])

    const data = React.useMemo(() => {
        const initialVisibleDefault = ["title", "year", "originalTitle",];
        const columnsDefault = [
            { name: "ID", uid: "id", sortable: true },
            { name: "TITLE", uid: "title", sortable: true },
            { name: "YEAR", uid: "year", sortable: true },
            { name: "ORIGINAL TITLE", uid: "originalTitle", sortable: true },
            { name: "COUNTRIES", uid: "countries" },
        ];

        if (selected === TAB_MOVIES_KEY) {
            setInitialColumns([...initialVisibleDefault, "status"]);
            setColumns([...columnsDefault, { name: "STATUS", uid: "status" }]);

        } else if (selected === TAB_TV_KEY) {

        } else if (selected === TAB_TV_TOKU_KEY) {

        } else if (selected === TAB_ANIMES_KEY) {

        } else if (selected === TAB_COMICS_KEY) {

        } else if (selected === TAB_MANGAS_KEY) {

        }
        return [{
            "id": 1,
            "title": "... E o Vento Levou",
            "originalTitle": "Gone with the Wind",
            "year": 1939,
            "genre": "Drama, Romance, War",
            "cast": "<<>>Victor Fleming, George Cukor, Sam Wood\n\n*Clark Gable, Vivien Leigh, Thomas Mitchell",
            "countries": "USA",
            "synopsis": "Durante a Guerra Civil Americana, quando fortunas e famílias foram destruídas, um cínico aventureiro e uma determinada jovem, que foi duramente atingida pela guerra, se envolvem numa relação de amor e ódio.",
            "img": "\"https://res.cloudinary.com/dwvqty6kx/image/upload/v1688660563/data-imagens/movies/0-9/..._E_o_Vento_Levou.jpg\"",
            "flagWatched": false,
            "owned": false,
            "watched": "NOTW"
        }];
    }, [selected]);

    const wasResearch = () => {
        return hasSearchFilter
            || isNotNullArray(selectedGenres)
            || isNotNullArray(selectedCountries);
    }

    const filteredItems = React.useMemo(() => {
        let filtered = [...data];

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
            /* .filter((m: any) => {
                return isFilterSingleSelect(isSelectedOwner, m, TYPE_F_OWNED);
            }) */
            : filtered;
    }, [data, valueSearch, selectedGenres, selectedCountries, isSelectedOwner, rowsPerPage]);

    return (<>
        <SearchMidia
            expandSearch={expandSearch}
            setExpandSearch={setExpandSearch}
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
            genres={[]}
            selectedGenres={selectedCountries}
            setSelectedGenres={setSelectedGenres}
            countries={[]}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            isSelectedOwner={isSelectedOwner}
            setIsSelectedOwner={setIsSelectedOwner}
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

        <TableMidia
            filteredItems={filteredItems}
            initialColumns={initialColumns}
            columns={columns}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            setMidiaSelected={() => { }}
            onOpen={() => { }}
        />
    </>)
}