import { Accordion, AccordionItem, Avatar, Chip, Divider, Image, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IMidia, nOfEdition, ownedByMidia, statusByMidia } from "../../data/midia";
import { TAB_ANIMES_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY } from "../../utils/constantes";
import { getFlagCountries, iconFlagLanguage, imageModified, isNotNullStr, range, rangeBySeparator, statusColorMap } from "../../utils/utils";

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

    const modalNew = () => <Modal
        key={`modal_midia__${midiaSelected?.id}`}
        aria-label="Modal Midia"
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside">
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
                                {midiaSelected.subtitle ?? midiaSelected.publicationTitle}
                            </div>
                            <div className="font-normal text-xs sm:text-base sm:truncate flex-shrink-0">
                                {midiaSelected.phase}
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
                        isVisible={midiaSelected?.cast !== undefined || midiaSelected?.authors !== undefined}
                        isMidiaVideo={midiaSelected?.cast !== undefined}
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
                        defaultSelectedKey={`info_${midiaSelected?.id}`}
                        variant="underlined"
                        color="default">
                        {
                            midiaSelected?.type !== TAB_MOVIES_KEY &&
                            <Tab key={`info_${midiaSelected?.id}`} title="Details" style={{ fontWeight: 400 }}>
                                {
                                    ((midiaSelected?.type === TAB_TV_KEY || midiaSelected?.type === TAB_ANIMES_KEY || midiaSelected?.type === TAB_TV_TOKU_KEY ) && !!midiaSelected?.midiasTvs) &&
                                    <>
                                        <Accordion selectionMode="single" defaultExpandedKeys={["0"]}>
                                            {
                                                midiaSelected?.midiasTvs.map((m, index) => {
                                                    return (<AccordionItem
                                                        key={index + ''}
                                                        aria-label="Watched"
                                                        isCompact
                                                        title={<>
                                                            Season {m?.season} · {m?.type}
                                                            <Chip
                                                                className="capitalize border-none gap-1 text-default-600"
                                                                color={statusColorMap[statusByMidia(m)]}
                                                                size="sm"
                                                                variant="dot" />
                                                        </>}
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
                        }
                        {
                            isNotNullStr(midiaSelected.notes) &&
                            <Tab key={`control_${midiaSelected?.id}`} title="Control">
                                <ScrollShadow key={`scroll_notes_${midiaSelected?.id}`}
                                    orientation="horizontal"
                                    hideScrollBar>
                                    <div className="text-small text-default-500 py-2">
                                        <p className="text-default-500 whitespace-pre-wrap">{midiaSelected.notes}</p>
                                    </div>
                                </ScrollShadow>
                            </Tab>
                        }
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
    isVisible: boolean;
    isMidiaVideo: boolean,
    type?: string,
    directors: any,
    staring: any,
    writers: any,
    pencillers: any,
}

const CreatorsMidias = ({ isVisible, isMidiaVideo, directors, staring, writers, pencillers }: CreatorsMidiasProps) => {
    return (
        isVisible && <>
            <div>
                <p style={{ fontSize: '1rem', fontWeight: '700' }}>{!!isMidiaVideo ? 'Diretors' : 'Writers'}</p>
                {!!isMidiaVideo ? directors : writers}
            </div>
            <div className="pb-2">
                <p style={{ fontSize: '1rem', fontWeight: '700' }}>{!!isMidiaVideo ? 'Staring' : 'Pencillers'}</p>
                {!!isMidiaVideo ? staring : pencillers}
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