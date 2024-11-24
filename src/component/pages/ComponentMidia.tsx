import React from "react";

import { IMidia } from "../../data/midia";
import { GridMidiaComponent } from "./GridMidia";
import { TableMidia } from "./TableMidia";

interface ComponentMidiaProps {
    filteredItems: any[],
    selected: any,
    changeVisibleMidia: boolean,
    rowsPerPage: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,
    onOpen: any,

    pageTopRef: React.RefObject<HTMLDivElement>
}

export const ComponentMidia = ({
    filteredItems,
    selected,
    changeVisibleMidia,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    setMidiaSelected,
    onOpen,

    pageTopRef
}: ComponentMidiaProps) => {
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        pageTopRef.current?.scrollIntoView();

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    return (
        <div className="relative flex flex-col px-2">
            {
                changeVisibleMidia &&
                    <TableMidia
                        items={items}
                        selected={selected}
                        filteredItems={filteredItems}
                        //initialColumns={initialColumns}
                        //columns={columns}
                        setRowsPerPage={setRowsPerPage}
                        page={page}
                        setPage={setPage}
                        pages={pages}
                        setMidiaSelected={setMidiaSelected}
                        onOpen={onOpen} />
            }
            {
                !changeVisibleMidia &&
                    <GridMidiaComponent
                        items={items}
                        page={page}
                        pages={pages}
                        setPage={setPage}
                        setMidiaSelected={setMidiaSelected}
                        onOpen={onOpen} />
            }
        </div>
    )
}