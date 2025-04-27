import { Avatar, Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect } from "react";
import { IMidia, ownedByMidia, statusByMidia } from "../../data/midia";
import { TAB_ANIMES_KEY, TAB_BOOKS_KEY, TAB_COMICS_KEY, TAB_MANGAS_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY } from "../../utils/constantes";
import { capitalize, getFlagCountries } from "../../utils/utils";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
    W: "success",
    Y: "success",
    R: "success",
    P: "danger",
    N: "danger",
    NOTW: "warning",
    NOTR: "warning",
};

interface TableMidiaProps {
    items: any[],
    selected: any,
    filteredItems: any[],

    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    pages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,

    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,

    onOpen: any,
    pageTopRef: React.RefObject<HTMLDivElement>
}

export const TableMidia = ({
    items,
    selected,
    filteredItems,

    setRowsPerPage,
    page,
    setPage,
    pages,

    setMidiaSelected,

    onOpen,
    pageTopRef
}: TableMidiaProps) => {
    type Midia = typeof filteredItems[0];

    const [columns, setColumns] = React.useState<any[]>([]);
    const [visibleColumns, setVisibleColumns] = React.useState<any>();

    React.useMemo(() => {
        if (selected === TAB_MOVIES_KEY) {
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "YEAR", uid: "year" },
                { name: "COUNTRIES", uid: "countries" },
                { name: "STATUS", uid: "status", },
                { name: "OWNED", uid: "owned", }
            ]);
            setVisibleColumns(new Set(["title", "year", "status", "owned"]));
        } else if (selected === TAB_TV_KEY) {
            setVisibleColumns(new Set(["title", "season", "year", "status", "owned"]));
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "SEASON", uid: "season" },
                { name: "YEAR", uid: "year" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", },
                { name: "COUNTRIES", uid: "countries" },
            ]);
        } else if (selected === TAB_TV_TOKU_KEY) {
            setVisibleColumns(new Set(["title", "season", "year", "type", "status", "owned"]));
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "SEASON", uid: "season" },
                { name: "YEAR", uid: "year" },
                { name: "TYPE", uid: "type" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
        } else if (selected === TAB_ANIMES_KEY) {
            setVisibleColumns(new Set(["title", "season", "year", "type", "status", "owned"]));
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "SEASON", uid: "season" },
                { name: "YEAR", uid: "year" },
                { name: "TYPE", uid: "type" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
        } else if (selected === TAB_COMICS_KEY) {
            setVisibleColumns(new Set(["title", "year", "publisher", "status", "owned"]));
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
        } else if (selected === TAB_MANGAS_KEY) {
            setVisibleColumns(new Set(["title", "year", "publisher", "status", "owned"]));
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "YEAR", uid: "year" },
                { name: "PUBLISHER", uid: "publisher" },
                { name: "LANGUAGE", uid: "language" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
        } else if (selected === TAB_BOOKS_KEY) {
            setVisibleColumns(new Set(["title", "year", "publisher", "status", "owned"]));
            setColumns([
                { name: "ID", uid: "id" },
                { name: "TITLE", uid: "title" },
                { name: "YEAR", uid: "year" },
                { name: "PUBLISHER", uid: "publisher" },
                { name: "STATUS", uid: "status" },
                { name: "OWNED", uid: "owned", }
            ]);
        }
    }, [selected]);

    useEffect(() => {
        setPage(1);
    }, [visibleColumns]);

    const headerColumns = React.useMemo(() => {
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [columns, visibleColumns]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const renderCell = React.useCallback((midia: Midia, columnKey: React.Key) => {
        const cellValue = midia[columnKey as keyof Midia];

        switch (columnKey) {
            case "title":
                return (
                    <div className="inline-flex flex-col items-start">
                        <span className="text-small text-inherit">{cellValue}</span>
                        <span className="text-tiny text-default-500">{midia.subtitle ?? midia.publicationTitle ?? midia.originalTitle}</span>
                    </div>
                );
            case "countries":
                return (
                    <div className="flex h-5 items-center space-x-4 text-small">
                        {
                            getFlagCountries(midia.countries)
                                .map((c) => <Avatar key={`flag_tb_${c}`} className="w-6 h-6" src={c} />)
                        }
                    </div>
                )
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[statusByMidia(midia)]}
                        size="sm"
                        variant="dot" />
                );
            case "owned":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[ownedByMidia(midia)]}
                        size="sm"
                        variant="dot" />
                );
            default:
                return cellValue;
        }
    }, [columns, visibleColumns]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 py-2">
                <div className="flex justify-between items-center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                endContent={<ChevronDownIcon className="text-small" />}
                                variant="light"
                                radius="full">
                                Columns
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode="multiple"
                            onSelectionChange={setVisibleColumns}>
                            {columns.map((column) => (
                                <DropdownItem key={column.uid} className="capitalize">
                                    {capitalize(column.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <label className="flex items-center text-default-400 text-small">
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}>
                            <option value="24">24</option>
                            <option value="44">44</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        visibleColumns,
        onRowsPerPageChange,
        filteredItems
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <>
                <div className="flex justify-between items-center">
                    <div></div>
                    <Pagination
                        isCompact
                        radius="full"
                        siblings={0}
                        showControls
                        showShadow
                        color="primary"
                        variant="light"
                        page={page}
                        total={pages}
                        onChange={(e) => {
                            setPage(e);
                            pageTopRef.current?.scrollIntoView();
                        }}
                    />

                    <span className="text-small text-default-400 pb-2 pl-1">
                        Total {filteredItems.length} items
                    </span>
                </div>
            </>
        );
    }, [items.length, page, pages]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[390px]"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            //th: ["text-default-500"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table
            aria-label="Data of midias"
            isCompact
            removeWrapper
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={classNames}
            selectionBehavior="replace"
            onRowAction={(key) => {
                setMidiaSelected(filteredItems.filter((m: any) => m.id + '' === key)[0])
                onOpen();
            }}
            topContent={topContent}
            topContentPlacement="outside"
            selectionMode="single">
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No data found"} items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};