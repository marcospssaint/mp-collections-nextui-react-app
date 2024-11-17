import { Accordion, AccordionItem, Badge, Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, cn, Input, Radio, RadioGroup, ScrollShadow, User } from "@nextui-org/react";
import { linkFlags } from "../../utils/utils";
import { MinusIcon } from "../icons/MinusIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { SearchIcon } from "../icons/SearchIcon";

interface SearchMidiaProps {
    expandSearch: boolean;
    setExpandSearch: React.Dispatch<React.SetStateAction<boolean>>;

    valueSearch: string;
    setValueSearch: React.Dispatch<React.SetStateAction<string>>;

    genres: string[],
    selectedGenres: string[],
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;

    countries: string[],
    selectedCountries: string[],
    setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;

    owners: string[];
    isSelectedOwner: string,
    setIsSelectedOwner: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchMidia = ({
    expandSearch,
    setExpandSearch,

    valueSearch,
    setValueSearch,

    genres,
    selectedGenres,
    setSelectedGenres,

    countries,
    selectedCountries,
    setSelectedCountries,

    owners,
    isSelectedOwner,
    setIsSelectedOwner
}: SearchMidiaProps) => {

    const onInputChange = (value: any) => {
        setValueSearch(value)
    };

    return (
        <div
            className={`flex w-[250px] transition-[margin-left] ease-in-out duration-500 fixed top-[0px] bottom-0 right-0 z-40 ${expandSearch ? " m-0" : " hidden"}`}>
            <div className="grid justify-items-end">
                <Card>
                    <CardHeader className="flex items-center justify-between px-4">
                        <h2 className="text-xl font-semibold text-black">Filters</h2>
                        <button className="text-gray-500 hover:text-gray-700 border-0"
                            onClick={() => setExpandSearch(!expandSearch)}>
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" x-description="Heroicon name: x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                aria-label="Search filter"
                                radius="full"
                                placeholder="Filter by keywords..."
                                variant="bordered"
                                size="md"
                                isClearable
                                startContent={
                                    <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                value={valueSearch}
                                onValueChange={onInputChange}
                            />

                            <div className="flex justify-between items-center">
                                <div>
                                    <Button color="primary" variant="light" size="sm" onPress={() => {
                                        setSelectedGenres([]);
                                        setSelectedCountries([]);
                                        setIsSelectedOwner('all')
                                    }}>
                                        Reset all
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Accordion isCompact defaultExpandedKeys={['3']}>
                            <AccordionItem
                                key="1"
                                aria-label="Genre"
                                title="Genre"
                                classNames={{
                                    title: "text-default-500"
                                }}
                                indicator={({ isOpen }) => (isOpen ? <MinusIcon /> :
                                    <Badge color="default" placement="top-left" content={selectedGenres.length} shape="circle">
                                        <PlusIcon />
                                    </Badge>
                                )}
                                disableIndicatorAnimation={true}>
                                <ScrollShadow className="h-[150px]">
                                    <CheckboxGroup value={selectedGenres}
                                        onValueChange={setSelectedGenres}>
                                        {genres.map((g) => <Checkbox classNames={{
                                            label: "text-default-500"
                                        }} key={`chbox_g_${g}`} value={g}>{g}</Checkbox>)}
                                    </CheckboxGroup>
                                </ScrollShadow>
                            </AccordionItem>
                            <AccordionItem
                                key="2"
                                aria-label="Country"
                                title="Country"
                                classNames={{
                                    title: "text-default-500"
                                }}
                                indicator={({ isOpen }) => (isOpen ? <MinusIcon className="fill-current" /> :
                                    <Badge color="default" placement="top-left" content={selectedCountries.length} shape="circle">
                                        <PlusIcon className="fill-current" />
                                    </Badge>
                                )}
                                disableIndicatorAnimation={true}>
                                <ScrollShadow className="h-[150px]">
                                    <CheckboxGroup
                                        value={selectedCountries}
                                        onValueChange={setSelectedCountries}>
                                        {
                                            countries.map((c) => (
                                                <Checkbox
                                                    key={`chbox_c_${c}`}
                                                    aria-label={c}
                                                    classNames={{
                                                        base: cn(
                                                            "inline-flex max-w-md w-full bg-content1 m-0",
                                                            "hover:bg-content2 items-center justify-start",
                                                            "cursor-pointer rounded-lg gap-2 border-transparent",
                                                            "data-[selected=true]:border-primary"
                                                        ),
                                                        label: "text-default-500"
                                                    }}
                                                    value={c}
                                                >
                                                    <div className="w-full flex">
                                                        <User
                                                            avatarProps={{ size: "sm", src: linkFlags(c) }}
                                                            name={c}
                                                        />
                                                    </div>
                                                </Checkbox>
                                            ))
                                        }
                                    </CheckboxGroup>
                                </ScrollShadow>
                            </AccordionItem>
                            <AccordionItem
                                key="3"
                                aria-label="Control"
                                title="Control"
                                classNames={{
                                    title: "text-default-500"
                                }}>

                                <ScrollShadow className="h-[150px]">
                                    <RadioGroup
                                        label="Owner"
                                        defaultValue={isSelectedOwner}
                                        value={isSelectedOwner}
                                        onValueChange={setIsSelectedOwner}>
                                        {owners.map((o) => <Radio value={o}>{o}</Radio>)}
                                    </RadioGroup>
                                </ScrollShadow>
                            </AccordionItem>
                        </Accordion>
                    </CardBody>
                </Card>

            </div>
        </div>
    )
}