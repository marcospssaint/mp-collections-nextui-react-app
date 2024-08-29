import type { Selection, SortDescriptor } from "@nextui-org/react";
import { Avatar, Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import React, { useEffect } from "react";
import { capitalize, getFlagCountries, imageModified } from "../../utils/utils";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
    W: "success",
    R: "success",
    P: "danger",
    NOTW: "warning",
    NOTR: "warning",
};

const sortBy = [
    {
        key: 1,
        label: "Release Date Descending",
    },
    {
        key: 2,
        label: "Release Date Ascending",
    },
    {
        key: 3,
        label: "Title (A-Z)",
    },
    {
        key: 4,
        label: "Title (Z-A)",
    },
];

interface TableMidiaProps {
    filteredItems: any[],
    initialColumns: any,
    columns: any[],
    rowsPerPage: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMidiaSelected: any,
    onOpen: any
}

export const TableMidia = ({
    filteredItems,
    initialColumns = [],
    columns,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    setMidiaSelected,
    onOpen
}: TableMidiaProps) => {
    type Midia = typeof filteredItems[0];

    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(initialColumns);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "title",
    });

    useEffect(() => {
        setVisibleColumns(visibleColumns);
    }, [filteredItems, visibleColumns]);

    const headerColumns = React.useMemo(() => {
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [columns, visibleColumns]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Midia, b: Midia) => {
            const first = a[sortDescriptor.column as keyof Midia] as number;
            const second = b[sortDescriptor.column as keyof Midia] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

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
                    <User
                        avatarProps={{ className: "", radius: "full", size: "lg", src: imageModified(midia.img) }}
                        classNames={{
                            description: "text-default-500",
                        }}
                        description={midia.subtitle ?? midia.publicationTitle}
                        name={cellValue}>
                        {midia.subtitle ?? midia.publicationTitle}
                    </User>
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
                        //color={statusColorMap[statusByMidia(midia)]}
                        size="sm"
                        variant="dot"
                    >
                        {/* {status(midia)} */}
                    </Chip>
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
                            selectionMode="single"
                            items={sortBy}>
                            {(item) => (
                                <DropdownItem key={item.key}>
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                        {/* <DropdownMenu
                            disallowEmptySelection
                            aria-label="Sort by"
                            closeOnSelect={false}
                            //selectedKeys={visibleColumns}
                            selectionMode="single"
                        //onSelectionChange={setVisibleColumns}
                        >
                            <DropdownItem>Release Date Descending</DropdownItem>
                            <DropdownItem>Release Date Ascending</DropdownItem>
                            <DropdownItem>Title (A-Z)</DropdownItem>
                            <DropdownItem>Title (Z-A)</DropdownItem>
                        </DropdownMenu>*/}
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
                            onSelectionChange={setVisibleColumns}
                        >
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
                            <option value="3">3</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
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
            <Table
                aria-label="Data of midias"
                isCompact
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={classNames}
                selectionBehavior="replace"
                onRowAction={(key) => {
                    setMidiaSelected(filteredItems.filter((m: any) => m.id + '' === key)[0])
                    onOpen();
                }}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
                selectionMode="single">
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No data found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </>)
};