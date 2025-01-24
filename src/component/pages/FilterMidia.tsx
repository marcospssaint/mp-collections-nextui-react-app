import type { Selection } from "@nextui-org/react";
import { Avatar, Button, Input, Select, SelectItem, SwitchProps, useSwitch, VisuallyHidden } from "@nextui-org/react";
import React, { useEffect } from "react";
import { linkFlags, linkFlagsByLanguage, owner, sortBy, status } from "../../utils/utils";
import { Adult18Icon } from "../icons/Adult18Icon";
import { MinusIcon } from "../icons/MinusIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { SearchIcon } from "../icons/SearchIcon";

interface FilterMidiaProps {
    valueSearch: string;
    setValueSearch: React.Dispatch<React.SetStateAction<string>>;

    setSelectedSortByKeys: React.Dispatch<React.SetStateAction<Selection>>;
    setAdult18: React.Dispatch<React.SetStateAction<boolean>>;

    genres: string[],
    selectedGenres: Selection,
    setSelectedGenres: React.Dispatch<React.SetStateAction<Selection>>;

    countries: string[],
    selectedCountries: Selection,
    setSelectedCountries: React.Dispatch<React.SetStateAction<Selection>>;

    languages: string[],
    selectedLanguages: Selection,
    setSelectedLanguages: React.Dispatch<React.SetStateAction<Selection>>;

    isSelectedOwner: Selection,
    setIsSelectedOwner: React.Dispatch<React.SetStateAction<Selection>>;

    selectedStatus: Selection,
    setSelectedStatus: React.Dispatch<React.SetStateAction<Selection>>;
}

export const FilterMidia = ({
    valueSearch,
    setValueSearch,

    setSelectedSortByKeys,
    setAdult18,

    genres,
    selectedGenres,
    setSelectedGenres,

    countries,
    selectedCountries,
    setSelectedCountries,

    languages,
    selectedLanguages,
    setSelectedLanguages,

    isSelectedOwner,
    setIsSelectedOwner,

    selectedStatus,
    setSelectedStatus
}: FilterMidiaProps) => {

    const [expandFilter, setExpandFilter] = React.useState(false);

    const onInputChange = (value: any) => {
        setValueSearch(value)
    };

    return (
        <div className="p-4">
            <div className="grid gap-2 md:grid-cols-[1fr_12rem] pt-2">
                <div >
                    <Input
                        aria-label="Search filter"
                        //radius="full"
                        placeholder="Search"
                        size="md"
                        isClearable
                        startContent={
                            <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        value={valueSearch}
                        onValueChange={onInputChange}
                    />
                </div>

                <Button
                    className="md:hidden rounded custom-opacity relative md-btn flex items-center px-3 overflow-hidden accent md:hidden"
                    onPress={() => setExpandFilter(!expandFilter)}
                    color="default"
                    startContent={!expandFilter ? <PlusIcon /> : <MinusIcon />}>
                    {!expandFilter ? `Show filters` : `Hide filters`}
                </Button>
            </div>

            <div className={`w-full flex flex-col gap-4 p-4 ${expandFilter ? " m-0" : " hidden"}`}>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 gap-4">
                        <Select
                            labelPlacement="outside"
                            label="Sort by"
                            placeholder="Any"
                            selectionMode="single"
                            className="max-w-xs"
                            onSelectionChange={setSelectedSortByKeys}>
                            {sortBy.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Adult18Switch setAdult18={setAdult18} />
                    </div>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 gap-4">
                        <Select
                            labelPlacement="outside"
                            label="Genres"
                            placeholder="Any"
                            selectionMode="multiple"
                            className="max-w-xs"
                            selectedKeys={selectedGenres}
                            onSelectionChange={setSelectedGenres}>
                            {genres.map((g) => (
                                <SelectItem key={g}>
                                    {g}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            labelPlacement="outside"
                            label="Countries"
                            placeholder="Any"
                            selectionMode="single"
                            className="max-w-xs"
                            selectedKeys={selectedCountries}
                            onSelectionChange={setSelectedCountries}
                            renderValue={(items) => {
                                return items.map((item) => (
                                    <div key={item.key} className="flex items-center gap-2">
                                        <div className="flex gap-2 items-center">
                                            <Avatar alt={item.textValue} className="flex-shrink-0" size="sm" src={linkFlags(item.textValue)} />
                                            <div className="flex flex-col">
                                                <span className="text-small">{item.textValue}</span>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            }}>
                            {countries.map((c) => (
                                <SelectItem key={c} textValue={c}>
                                    <div className="flex gap-2 items-center">
                                        <Avatar alt={c} className="flex-shrink-0" size="sm" src={linkFlags(c)} />
                                        <div className="flex flex-col">
                                            <span className="text-small">{c}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            labelPlacement="outside"
                            label="Language"
                            placeholder="Any"
                            selectionMode="single"
                            className="max-w-xs"
                            selectedKeys={selectedLanguages}
                            onSelectionChange={setSelectedLanguages}
                            renderValue={(items) => {
                                return items.map((item) => (
                                    <div key={item.key} className="flex items-center gap-2">
                                        <div className="flex gap-2 items-center">
                                            <Avatar alt={item.textValue} className="flex-shrink-0" size="sm" src={linkFlagsByLanguage(item.textValue)} />
                                            <div className="flex flex-col">
                                                <span className="text-small">{item.textValue}</span>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            }}>
                            {languages.map((l) => (
                                <SelectItem key={l} textValue={l}>
                                    <div className="flex gap-2 items-center">
                                        <Avatar alt={l} className="flex-shrink-0" size="sm" src={linkFlagsByLanguage(l)} />
                                        <div className="flex flex-col">
                                            <span className="text-small">{l}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 gap-4">

                        <Select
                            labelPlacement="outside"
                            label="Owner"
                            placeholder="Any"
                            selectionMode="single"
                            className="max-w-xs"
                            selectedKeys={isSelectedOwner}
                            onSelectionChange={setIsSelectedOwner}>
                            {owner.map((o) => (
                                <SelectItem key={o.key}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            labelPlacement="outside"
                            label="Status"
                            placeholder="Any"
                            selectionMode="single"
                            className="max-w-xs"
                            selectedKeys={selectedStatus}
                            onSelectionChange={setSelectedStatus}>
                            {status.map((s) => (
                                <SelectItem key={s.key}>
                                    {s.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <Button color="primary" variant="light" size="sm" onPress={() => {
                                setSelectedGenres(new Set([]));
                                setSelectedCountries(new Set());
                                setIsSelectedOwner(new Set());
                                setSelectedStatus(new Set());
                            }}>
                                Reset filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface Adult18SwitchProps extends SwitchProps {
    setAdult18: React.Dispatch<React.SetStateAction<boolean>>;
}

const Adult18Switch = ({ setAdult18, ...props }: Adult18SwitchProps) => {
    const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } =
        useSwitch(props);

    useEffect(() => {
        setAdult18(isSelected ?? false)
    }, [isSelected]);

    return (
        <div className="flex flex-col gap-2">
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            "w-10 h-10",
                            "flex items-center justify-center",
                            "hover:bg-default-200"
                        ],
                    })}
                    //</Component>onVolumeChange={(s) => setAdult18()}
                    >
                    <Adult18Icon />
                </div>
            </Component>

        </div>
    );
};