import type { Selection } from "@nextui-org/react";
import { Avatar, Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect } from "react";
import { IMidia, ownedByMidia, statusByMidia } from "../../data/midia";
import { DROPD_SORTBY_DT_ASC_KEY, DROPD_SORTBY_DT_DESC_KEY, DROPD_SORTBY_TL_AZ_KEY, DROPD_SORTBY_TL_ZA_KEY } from "../../utils/constantes";
import { capitalize, getFlagCountries } from "../../utils/utils";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { GridMidiaComponent } from "./GridMidia";
import { GridIcon } from "../icons/GridIcon";
import { TableIcon } from "../icons/TableIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
    W: "success",
    Y: "success",
    R: "success",
    P: "danger",
    N: "danger",
    NOTW: "warning",
    NOTR: "warning",
};

const sortBy = [
    {
        key: DROPD_SORTBY_DT_DESC_KEY,
        label: "Release Date Descending",
    },
    {
        key: DROPD_SORTBY_DT_ASC_KEY,
        label: "Release Date Ascending",
    },
    {
        key: DROPD_SORTBY_TL_AZ_KEY,
        label: "Title (A-Z)",
    },
    {
        key: DROPD_SORTBY_TL_ZA_KEY,
        label: "Title (Z-A)",
    },
];

interface TableMidiaProps {
    filteredItems: any[],
    initialColumns: any,
    columns: any[],

    changeGrid: boolean,
    setChangeGrid: React.Dispatch<React.SetStateAction<boolean>>,

    selectedSortByKeys: Selection;
    setSelectedSortByKeys: React.Dispatch<React.SetStateAction<Selection>>;

    rowsPerPage: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,

    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,

    setMidiaSelected: React.Dispatch<React.SetStateAction<IMidia>>,

    onOpen: any
}

export const TableMidia = ({
    filteredItems,
    initialColumns = [],
    columns,

    changeGrid,
    setChangeGrid,
    
    selectedSortByKeys,
    setSelectedSortByKeys,
    
    rowsPerPage,
    setRowsPerPage,

    page,
    setPage,

    setMidiaSelected,

    onOpen
}: TableMidiaProps) => {
    type Midia = typeof filteredItems[0];

    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(initialColumns);

    useEffect(() => {
        setVisibleColumns(initialColumns);
        setPage(1);
    }, [initialColumns]);

    const headerColumns = React.useMemo(() => {
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [columns, visibleColumns]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const renderCell = React.useCallback((midia: Midia, columnKey: React.Key) => {
        const cellValue = midia[columnKey as keyof Midia];

        switch (columnKey) {
            case "title":
                return (
                    <>
                        <div className="inline-flex flex-col items-start">
                            <span className="text-small text-inherit">{cellValue}</span>
                            <span className="text-tiny text-default-500">{midia.subtitle ?? midia.publicationTitle ?? midia.originalTitle}</span>
                        </div>
                    </>
                );
            case "countries":
                return (
                    <div className="flex h-5 items-center space-x-4 text-small">
                        {
                            getFlagCountries(midia.countries).map((c) => <Avatar key={`flag_tb_${c}`} className="w-6 h-6" src={c} />)
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
                                Sort by
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Sort by"
                            closeOnSelect={false}
                            selectedKeys={selectedSortByKeys}
                            selectionMode="single"
                            onSelectionChange={setSelectedSortByKeys}
                            items={sortBy}>
                            {(item) => (
                                <DropdownItem
                                    key={item.key}
                                    color={item.key === "delete" ? "danger" : "default"}
                                    className={item.key === "delete" ? "text-danger" : ""}>
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
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
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="100">100</option>
                        </select>
                    </label>

                    <div>
                        {
                            changeGrid && <Button isIconOnly aria-label="Change" variant="light"
                                onPress={() => setChangeGrid(!changeGrid)}>
                                <GridIcon />
                            </Button>
                        }
                        {
                            !changeGrid && <Button isIconOnly aria-label="Change" variant="light"
                                onPress={() => setChangeGrid(!changeGrid)}>
                                <TableIcon />
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }, [
        visibleColumns,
        changeGrid,
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
                        //isDisabled={hasSearchFilter}
                        color="primary"
                        variant="light"
                        page={page}
                        total={pages}
                        onChange={setPage}
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

            th: ["text-default-500"],
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

    return (<>
        <div className="relative flex flex-col px-2">
            {
                changeGrid &&
                    <Table
                        aria-label="Data of midias"
                        isCompact
                        isHeaderSticky
                        isStriped
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
            }

            {
                !changeGrid && <>
                    {topContent}

                    <GridMidiaComponent
                        items={items}
                        page={page}
                        pages={pages}
                        setPage={(setPage)}
                        setMidiaSelected={setMidiaSelected}
                        onOpen={onOpen}
                    />
                </>
            }
        </div>
    </>)
};