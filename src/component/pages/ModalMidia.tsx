import { Accordion, AccordionItem, Avatar, Divider, Image, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IMidia } from "../../data/midia";
import { getFlagCountries, iconFlagLanguage, imageModified, range, rangeBySeparator } from "../../utils/utils";

interface ModalMidiaProps {
    midiaSelected: IMidia,
    isOpen: boolean,
    onOpenChange: any,
}

export const ModalMidia = ({
    midiaSelected,
    isOpen,
    onOpenChange,
}: ModalMidiaProps) => {

    const directors = () => {
        const directors = midiaSelected?.cast?.replaceAll(',', ' · ')
            .split('*');

        return directors?.at(0)?.replaceAll('<<>>', '')
            .replaceAll('<>', '');
    }

    const stars = () => {
        const stars = midiaSelected?.cast?.replaceAll(',', ' · ')
            .split('*');

        return stars?.at(1)?.replaceAll('*', '') ?? '-';
    }

    const genres = () => {
        return midiaSelected?.genre?.replaceAll(',', ' · ');
    }

    const writes = () => {
        const writes = midiaSelected?.authors?.replaceAll(',', ' · ')
            .split('*');

        return writes?.at(0)?.replaceAll('<<>>', '')
            .replaceAll('<>', '');
    }

    const pencilers = () => {
        const pencilers = midiaSelected?.authors?.replaceAll(',', ' · ')
            .split('*');

        return pencilers?.at(1)?.replaceAll('*', '') ?? '-';
    }

    const nOfEpisodesSeason = (md: any) => {
        var episode = String(md.episodes);
        if (episode === undefined) {
            return 0;
        } else if (episode != null && episode.includes('|')) {
            return Number(episode.substring(episode.indexOf('|') + 2));
        }
        return Number(episode);
    }

    return (<>
        {
            !!midiaSelected && <Modal
                key={`modal_midia_${midiaSelected?.id}`}
                aria-label="Modal Midia"
                isOpen={isOpen}
                placement="bottom-center"
                onOpenChange={onOpenChange}
                size="4xl"
                scrollBehavior="inside"
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent key={`card_modal_${midiaSelected?.id}`}>
                    <ModalHeader className="flex flex-col gap-1 font-bold">
                        {midiaSelected?.title}
                        {!!midiaSelected?.subtitle && <> ({midiaSelected?.subtitle})</>}
                        {!!midiaSelected.type ? (midiaSelected.type === 'TV Show' ? ` (Season ${midiaSelected?.season})` : ' (Movie)') : ''}
                        {!!midiaSelected.publicationTitle && <> ({midiaSelected.publicationTitle}) </>}
                    </ModalHeader>

                    <ModalBody>
                        <div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center col-span-1 sm-app:col-span-3">
                                    <div className="image-card-col">
                                        <Image
                                            key={`image_modal_${midiaSelected?.id}`}
                                            isBlurred
                                            width={240}
                                            height={350}
                                            src={imageModified(midiaSelected?.img)}
                                            isZoomed
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 sm-app:col-span-3 text-justify">

                                    <div className="flex w-full flex-col">
                                        <Tabs
                                            key={`tabs_${midiaSelected?.id}`}
                                            defaultSelectedKey={`perfil_${midiaSelected?.id}`}
                                            variant="underlined"
                                            color="primary">
                                            <Tab key={`info_${midiaSelected?.id}`} title="Details">
                                                <div className="h-[298px]">
                                                    <div className="flex h-4 items-center space-x-4 text-small">
                                                        <div className="text-small text-default-500">{midiaSelected.year}
                                                            {!!midiaSelected.season ? (midiaSelected.type === 'TV Show' ? ` · ${nOfEpisodesSeason(midiaSelected)} Episodes` : ' · Movie') : ''}
                                                        </div>

                                                        {
                                                            !!midiaSelected.countries && <>
                                                                <Divider orientation="vertical" />
                                                                <div className="flex h-5 items-center space-x-4 text-small">
                                                                    {
                                                                        getFlagCountries(midiaSelected.countries).map((c) => <Avatar key={`c_${midiaSelected?.id}_${c}`} className="w-6 h-6" src={c} />)
                                                                    }
                                                                </div>
                                                            </>
                                                        }

                                                        {
                                                            !!midiaSelected?.publisher && <>
                                                                <Divider orientation="vertical" />
                                                                <div className="text-small text-default-500 py-2">
                                                                    <p className="text-default-500 ">{midiaSelected?.publisher}</p>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>

                                                    <div className="pt-2">
                                                        <div className="text-small text-default-500 py-2">{genres()}</div>

                                                        {!!midiaSelected?.cast &&
                                                            <>
                                                                <div className="text-small text-default-500 py-2">
                                                                    Director <p className="text-default-500">{
                                                                        directors()
                                                                    }</p>
                                                                </div>
                                                                <Divider className="my-4" />
                                                                <div className="text-small text-default-500 py-2">
                                                                    Stars <p className="text-default-500 ">{
                                                                        stars()
                                                                    }</p>
                                                                </div>
                                                                <Divider className="my-4" />
                                                            </>
                                                        }

                                                        {!!midiaSelected?.authors &&
                                                            <>
                                                                <div className="text-small text-default-500 py-2">
                                                                    Write <p className="text-default-500">{writes()}</p>
                                                                </div>
                                                                <Divider className="my-4" />
                                                                <div className="text-small text-default-500 py-2">
                                                                    Perciler <p className="text-default-500">{pencilers()}</p>
                                                                </div>
                                                            </>
                                                        }

                                                        {
                                                            midiaSelected?.type === 'TV Show' &&
                                                            <ScrollShadow key={`scroll_ep_${midiaSelected?.id}`} orientation="horizontal" hideScrollBar className="h-[150px]">
                                                                <NOfEpisodesWatchedComponent key={`nepisodies_${midiaSelected.season}`} midiaVideo={midiaSelected} />
                                                            </ScrollShadow>
                                                        }
                                                        <div className="">
                                                        <Divider className="my-4" />
                                                            <Accordion selectionMode="single">
                                                                {
                                                                    Array.from({ length: midiaSelected?.language?.split(', ')?.length ?? 0 }).map((_, index) => {
                                                                        const languageCurrent = midiaSelected?.language?.split(',').at(index)?.trim();
                                                                        const volumeCurrent_ = (midiaSelected?.volume + '')?.split(';').at(index);
                                                                        const readVolumeCurrent_ = Number((midiaSelected?.readVolume + '')?.split(';').at(index));

                                                                        return (<AccordionItem
                                                                            key={index + ''}
                                                                            aria-label="Issues"
                                                                            isCompact
                                                                            startContent={
                                                                                <Avatar
                                                                                    key={`c_${index}`}
                                                                                    className="w-6 h-6"
                                                                                    src={iconFlagLanguage(languageCurrent?.trim())} />
                                                                            }
                                                                            title={`Issue(s) (${languageCurrent})`}
                                                                            classNames={{
                                                                                title: "font-bold h3"
                                                                            }}>
                                                                            <ScrollShadow key={`scroll_issue_${midiaSelected?.id}`}
                                                                                orientation="horizontal"
                                                                                hideScrollBar className="h-[150px]">
                                                                                <NOfEditionsComponent
                                                                                    readVolumeCurrent={readVolumeCurrent_}
                                                                                    volumeCurrent={volumeCurrent_} />
                                                                            </ScrollShadow>
                                                                        </AccordionItem>)
                                                                    })
                                                                }
                                                            </Accordion>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab key={`perfil_${midiaSelected?.id}`} title="Perfil">
                                                <div className="h-[298px]">
                                                    <div className="text-default-500 text-justify font-serif pb-4">
                                                        {!!midiaSelected?.originalTitle && <div className="py-1">{midiaSelected.originalTitle}</div>}
                                                    </div>
                                                    <ScrollShadow key={`scroll_synopsis_${midiaSelected?.id}`}
                                                        orientation="horizontal" hideScrollBar className="h-[260px]">
                                                        <div className="border-solid border-1 border-indigo-600 p-2">
                                                            <p className="text-default-500 text-justify font-serif">
                                                                {midiaSelected.synopsis}
                                                            </p>
                                                        </div>
                                                    </ScrollShadow>
                                                </div>
                                            </Tab>
                                            <Tab key={`control_${midiaSelected?.id}`} title="Control">
                                                <div className="h-[298px]">
                                                    {
                                                        !midiaSelected.flagMainMidia &&
                                                        <>
                                                            <div className="text-small text-default-500 py-2">
                                                                Owned <p className="text-default-500">{midiaSelected.owned === true ? 'YES' : 'NO'}</p>
                                                            </div>
                                                            <Divider className="my-4" />
                                                            <div className="text-small text-default-500 py-2">
                                                                Watched <p className="text-default-500">{midiaSelected.watched === 'W' ? 'YES' : 'NO'}</p>
                                                            </div>
                                                            <Divider className="my-4" />
                                                        </>
                                                    }
                                                    <ScrollShadow key={`scroll_notes_${midiaSelected?.id}`}
                                                        orientation="horizontal"
                                                        hideScrollBar className={`h-[${midiaSelected.flagMainMidia ? '298' : '150'}px]`}>
                                                        <div className="text-small text-default-500 py-2">
                                                            Notes <p className="text-default-500 whitespace-pre-wrap">{midiaSelected.notes}</p>
                                                        </div>
                                                    </ScrollShadow>
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        }

    </>)
}

interface NOfComponentProps {
    total: number;
    numeros: any[];
    list: any[];
}

const NOfComponent = ({ total, numeros, list }: NOfComponentProps) => {
    return (
        <div key={`_noof`} className="flex flex-wrap gap-2 items-center py-2">
            {
                [...Array(total).keys()].map((index) => {
                    const indexCurrent = index + 1;
                    const contais = numeros.includes(indexCurrent);

                    return <div key={`issue_${index}_${indexCurrent}`} className="px-1">
                        <Avatar
                            key={`avatar_${indexCurrent}`}
                            name={`${indexCurrent}`}
                            radius="md"
                            isBordered
                            color={colorNOfComponent(list, indexCurrent, contais)}
                            size="sm" />
                    </div>
                })
            }
        </div>
    )
}

const colorNOfComponent = (list: any[], indexCurrent: number, contais: boolean) => {
    if (list.includes(indexCurrent)) {
        return "success";
    } else if (contais) {
        return "primary";
    }
    return "warning";
}

interface NOfEditionsComponentProps {
    volumeCurrent?: string,
    readVolumeCurrent?: number,
}

const NOfEditionsComponent = ({ volumeCurrent, readVolumeCurrent }: NOfEditionsComponentProps) => {

    const [total, setTotal] = useState<number>(0);
    const [numeros, setNumeros] = useState<(number | number[])[]>([0]);
    const [reads, setReads] = useState<(number | number[])[]>([0]);

    useEffect(() => {
        var numerosCurrent: (number | number[])[] = [];

        if (volumeCurrent?.includes('|') || volumeCurrent?.includes(',')) {
            setTotal(Number(volumeCurrent.substring(volumeCurrent.indexOf('|') + 2)));

            var edicoes = volumeCurrent.substring(0, volumeCurrent.indexOf('|')); //'1-5, 6-7, 9';
            var edicoesSplit = edicoes.split(',');
            edicoesSplit.forEach((e) => numerosCurrent.push(...rangeBySeparator(String(e), '-')));
            setNumeros([...numerosCurrent]);
        } else {
            const total = Number(volumeCurrent);
            setTotal(total);
            setNumeros([...range(1, total)]);
        }

        if (readVolumeCurrent !== undefined && !Number.isNaN(readVolumeCurrent)) {
            setReads([...range(0, readVolumeCurrent)]);
        }
    }, [readVolumeCurrent, volumeCurrent]);

    return <NOfComponent total={total} numeros={numeros} list={reads} />
}

interface NOfEpisodesWatchedComponentProps {
    midiaVideo: IMidia | undefined;
}

const NOfEpisodesWatchedComponent = ({ midiaVideo }: NOfEpisodesWatchedComponentProps) => {

    const [total, setTotal] = useState<number>(0);
    const [numeros, setNumeros] = useState<(number | number[])[]>([0]);
    const [watched, setWatched] = useState<(number | number[])[]>([0]);

    useEffect(() => {
        if (midiaVideo !== undefined) {
            var numerosCurrent: (number | number[])[] = [];
            const episodes = String(midiaVideo?.episodes);

            if (episodes?.includes('|') || episodes?.includes(',')) {
                setTotal(Number(episodes.substring(episodes.indexOf('|') + 2)));

                var episodesSubstr = episodes.substring(0, episodes.indexOf('|')); //'1-5, 6-7, 9';
                var episodesSplit = episodesSubstr.split(',');
                episodesSplit.forEach((e) => numerosCurrent.push(...rangeBySeparator(String(e), '-')));
                setNumeros([...numerosCurrent]);
            } else {
                const total = Number(episodes);
                setTotal(total);
                setNumeros([...range(1, total)]);
            }

            if (midiaVideo?.watchedEpisodes !== undefined) {
                setWatched([...range(0, midiaVideo?.watchedEpisodes)]);
            } else {
                setWatched([0]);
            }
        }
    }, [midiaVideo, midiaVideo?.episodes, midiaVideo?.watchedEpisodes]);

    return <NOfComponent total={total} numeros={numeros} list={watched} />
}