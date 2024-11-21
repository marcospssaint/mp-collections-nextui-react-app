import { Accordion, AccordionItem, Avatar, Button, Card, CardBody, CardFooter, Chip, Divider, Image, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IMidia, nOfEdition, ownedByMidia, statusByMidia } from "../../data/midia";
import { getFlagCountries, iconFlagLanguage, imageModified, range, rangeBySeparator, statusColorMap } from "../../utils/utils";
import { TAB_ANIMES_KEY, TAB_TV_KEY } from "../../utils/constantes";

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
            .replaceAll('<>', '') ?? '-';
    }

    const stars = () => {
        const stars = midiaSelected?.cast?.replaceAll(',', ' · ')
            .split('*');

        return stars?.at(1)?.replaceAll('*', '') ?? '-';
    }

    const genres = () => {
        return midiaSelected?.genre?.replaceAll(',', ' · ');
    }

    const genresList = () => {
        return midiaSelected?.genre?.split(',');
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

    const modalOld = () => <Modal
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
    </Modal>;

    const modalNew = () => <Modal
        key={`modal_midia__${midiaSelected?.id}`}
        aria-label="Modal Midia"
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        //backdrop="opaque"
        classNames={{
            //  backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
    >
        <ModalContent key={`card_modal__${midiaSelected?.id}`}>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
                <div className="md-content flex-grow">
                    <div className="layout-container modal-midia has-gradient px-4">
                        <div className="banner-container block">
                            <div
                                className="banner-image"
                                style={{
                                    backgroundImage: `url(${imageModified(midiaSelected?.img)})`
                                }} />
                            <div className="banner-shade" />
                        </div>

                        <div style={{ gridArea: 'art' }}>
                            <div>
                                <a className="group flex items-start relative mb-auto select-none">

                                    <Image
                                        key={`image_modal_${midiaSelected?.id}`}
                                        className="rounded shadow-md w-full h-auto object-cover"
                                        src={imageModified(midiaSelected?.img)}
                                    />

                                </a>
                            </div>
                        </div>
                        <div className="title-banner">
                            <p className="mb-1">{midiaSelected?.title}</p>
                            <div className="font-normal line-clamp-2 text-base sm:text-xl inline-block leading-5">
                                {midiaSelected.originalTitle}
                            </div>
                            <div className="font-normal text-xs sm:text-base sm:truncate flex-shrink-0">
                                {midiaSelected.subtitle}
                            </div>

                            <div className="flex flex-row gap-2">
                                <div className="flex h-4 items-center space-x-4 text-small" style={{
                                    marginTop: '20px'
                                }}>
                                    {
                                        getFlagCountries(midiaSelected.countries).map((c) =>
                                            <Avatar radius="sm" key={`c_${midiaSelected?.id}_${c}`}
                                                className="w-8 h-8"
                                                src={c} />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="sm:mx-2 pt-4" style={{ gridArea: 'info' }}>

                            <div className="flex w-full flex-col">
                                <div className="flex gap-1 items-center ">

                                    {
                                        genresList()?.map((g) =>
                                            <Chip
                                                className="genre-midia"
                                                style={{
                                                    backgroundColor: 'rgb(240 241 242)',
                                                    fontSize: '.625rem',
                                                    textTransform: 'uppercase'
                                                }}
                                                radius="sm">
                                                {g}
                                            </Chip>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-1 flex-wrap items-center">

                                <div className="flex items-center flex flex-wrap gap-1">
                                    <div className="tag dot no-wrapper sm:font-bold uppercase">{midiaSelected.year}</div>
                                    <div >
                                        <Chip
                                            className="capitalize border-none gap-1 "
                                            color={statusColorMap[statusByMidia(midiaSelected)]}
                                            size="md"
                                            variant="dot">
                                            <span className="tag dot no-wrapper sm:font-bold uppercase">Status</span>
                                        </Chip>
                                    </div>

                                    <Chip
                                        className="capitalize border-none gap-1"
                                        color={statusColorMap[ownedByMidia(midiaSelected)]}
                                        size="md"
                                        variant="dot">

                                        <span className="tag dot no-wrapper sm:font-bold uppercase">Owned</span>
                                    </Chip>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <CreatorsMidias
                        isCast={!!midiaSelected.cast}
                        type={midiaSelected.type}
                        directors={directors()}
                        writers={writes()}
                        staring={stars()}
                        pencillers={pencilers()}
                    />
                    <Divider className="my-2" />
                    <ScrollShadow key={`scroll_synopsis_${midiaSelected?.id}`}
                        orientation="horizontal" hideScrollBar>
                        <p className=" text-justify font-serif">
                            {midiaSelected.synopsis}
                        </p>
                    </ScrollShadow>
                </div>
                <div className="flex w-full flex-col">
                    <Tabs
                        key={`tabs_${midiaSelected?.id}`}
                        defaultSelectedKey={`control_${midiaSelected?.id}`}
                        variant="underlined"
                        color="default">
                        <Tab key={`control_${midiaSelected?.id}`} title="Control">
                            <ScrollShadow key={`scroll_notes_${midiaSelected?.id}`}
                                orientation="horizontal"
                                hideScrollBar>
                                <div className="text-small text-default-500 py-2">
                                    <p className="text-default-500 whitespace-pre-wrap">{midiaSelected.notes}</p>
                                </div>
                            </ScrollShadow>
                        </Tab>
                        <Tab key={`info_${midiaSelected?.id}`} title="Details" style={{ fontWeight: 400 }}>
                            {
                                ((midiaSelected?.type === TAB_TV_KEY || midiaSelected?.type === TAB_ANIMES_KEY) && !!midiaSelected?.midiasTvs) && <>
                                    <Accordion selectionMode="single" defaultExpandedKeys={["0"]}>
                                    {
                                        midiaSelected?.midiasTvs.map((m, index) => {
                                            return (<AccordionItem
                                                key={index + ''}
                                                aria-label="Watched"
                                                isCompact
                                                title={`Season ${m?.season} · ${m?.type}`}
                                                subtitle={<>
                                                    <p>{m.originalTitle}</p>
                                                    <p>{m.year} · {nOfEdition(m.episodes)} episódios</p>
                                                </>}
                                                classNames={{
                                                    title: "font-bold h3"
                                                }}>
                                                <ScrollShadow key={`scroll_ep_${m?.id}`} orientation="horizontal" hideScrollBar className="h-[150px]">
                                                    <NOfEpisodesWatchedComponent key={`nepisodies_${m.season}`} midiaVideo={m} />
                                                </ScrollShadow>
                                            </AccordionItem>
                                            )
                                        })
                                    }
                                    </Accordion>
                                </>
                            }
                            <Accordion selectionMode="single" defaultExpandedKeys={["0"]}>
                                {
                                    Array.from({ length: midiaSelected?.language?.split(', ')?.length ?? 0 }).map((_, index) => {
                                        const languageCurrent = midiaSelected?.language?.split(',').at(index)?.trim();
                                        const volumeCurrent_ = (midiaSelected?.volume + '')?.split(';').at(index);
                                        const readVolumeCurrent_ = Number((midiaSelected?.readVolume + '')?.split(';').at(index));
                                        const publicationTitleCurrent = (midiaSelected?.publisher + '')?.split(';').at(index);

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
                                            title={publicationTitleCurrent}
                                            subtitle={`${nOfEdition(volumeCurrent_)} issues in this volume`}
                                            classNames={{
                                                title: "font-bold h3"
                                            }}>
                                            <ScrollShadow key={`scroll_issue_${midiaSelected?.id}`}
                                                orientation="horizontal"
                                                hideScrollBar>
                                                <NOfEditionsComponent
                                                    readVolumeCurrent={readVolumeCurrent_}
                                                    volumeCurrent={volumeCurrent_} />
                                            </ScrollShadow>
                                        </AccordionItem>)
                                    })
                                }
                            </Accordion>
                        </Tab>
                    </Tabs>
                </div>
            </ModalBody>
        </ModalContent>
    </Modal>

    return (<>
        {
            !!midiaSelected && modalNew()
        }
    </>)
}

interface CreatorsMidiasProps {
    isCast: boolean;
    type?: string,
    directors: any,
    staring: any,
    writers: any,
    pencillers: any,
}

const CreatorsMidias = ({ isCast, type, directors, staring, writers, pencillers }: CreatorsMidiasProps) => {
    return (
        TAB_TV_KEY !== type && <>
            <div>
                <p style={{ fontSize: '1rem', fontWeight: '700' }}>{!!isCast ? 'Diretors' : 'Writers'}</p>
                {!!isCast ? directors : writers}
            </div>
            <div className="pb-2">
                <p style={{ fontSize: '1rem', fontWeight: '700' }}>{!!isCast ? 'Staring' : 'Pencillers'}</p>
                {!!isCast ? staring : pencillers}
            </div>
        </>
    )
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

                    return <div key={`issue_${index}_${indexCurrent}`} className="p-1">
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