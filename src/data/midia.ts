import { TAB_ANIMES_KEY, TAB_COMICS_KEY, TAB_MANGAS_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY } from "../utils/constantes";

import movies from './development/movies.json';
import tvShows from './development/tv-shows.json';
import tvTokusatsu from './development/tv-tokusatsu.json';
import animes from './development/animes.json';
import comics from './development/comics.json';
import mangas from './development/mangas.json';
import { groupByToMap } from "../utils/utils";

export interface IMidia {
    id: number;
    title: string;
    originalTitle?: string | null;
    subtitle?: string | null;
    year: number;
    owned?: boolean;
    typeMidia: string;

    countries?: string;
    language?: string;

    synopsis?: string | null;
    notes?: string | null;
    img?: string | null;

    flagMainMidia?: boolean;

    // leitura
    publicationTitle?: string;
    authors?: string;
    publisher?: string;
    read?: string | null;
    genre?: string | null;
    collection?: boolean | null;
    collectionTitle?: boolean | null;
    idPhase?: number;
    phase?: string;
    volume?: string;
    readVolume?: string;
    totalVolume?: number;

    // video
    typeMidiaVideo?: string | null;
    cast?: string;
    watched?: string | null;
    season?: number | null;
    episodes?: string | null;
    watchedEpisodes?: number;
    type?: string;

    midiasTvs?: IMidia[]
}

export const createMidia = (data: IMidia[], type: string) => {
    const midiaGrouped = groupByToMap(data, (e) => e.title);
    const midiaArray = [] as IMidia[];

    if (TAB_TV_KEY === type || TAB_ANIMES_KEY === type) {
        for (let m of midiaGrouped) {
            const firstObject = m?.[1][0] ?? {} as IMidia;

            midiaArray.push({
                ...firstObject,
                type: type,
                midiasTvs: m?.[1]
            })
        }
    } else {
        for (let midia of data) {
            const midiasByTitle = midiaGrouped.get(midia.title);
            const firstObject = midiasByTitle?.[0] ?? {} as IMidia;
    
            if (midia?.collection && !midia?.countries) continue;
    
            midiaArray.push({
                ...midia,
                type: type,
                flagMainMidia: false ,//(midiasByTitle?.length??0 ) > 1 && firstObject.id === midia.id,
                originalTitle: midia.originalTitle ?? firstObject.originalTitle,
                year: midia.year?? 1900,
                genre: firstObject.genre,
                countries: firstObject.countries,
                synopsis: midia.synopsis ?? firstObject.synopsis,
                notes: midia.notes ?? firstObject.notes,
                img: midia.img ?? firstObject.img
            })
        }
    }
    return midiaArray;
}

export const nOfEdition = (volume: any | undefined) => {
    if (volume === undefined || volume === null) {
        return 0;
    }

    const editions = String(volume);
    if (editions?.includes(' | ')) {
        return Number(editions.substring(editions.indexOf('|') + 2));
    }

    return Number(editions);
}

export const status = (midia: IMidia) => {
    var value = statusByMidia(midia);
    if (value === 'W') return 'Watched'
    else if (value === 'NOTW') return 'Not watched'
    else if (value === 'R') return 'Read'
    else if (value === 'NOTR') return 'Not read'
    else return 'Pause';
}

export const statusByMidia = (midia: IMidia) => {
    return (!!midia.read ? midia.read : midia.watched) ?? '';
}

export const ownedByMidia = (midia: IMidia) => {
    return midia.owned === true ? 'Y' : 'N';
}

export const loadMidia = async (type: string, username: any) => {
    return createMidia(await load(getValueEnv(type, `REACT_APP_${type}`, username)) as IMidia[], type); 
}

const getValueEnv = (type: string, value: string, username: any) => {
    const URL_ = value+'_URL_'+username?.toLocaleUpperCase();
    const URL_COMPLETO = process.env[URL_] ;
    return { type: type, url: URL_COMPLETO, status: URL_COMPLETO !== undefined } ;
}

const load = async (envURL?: any) => {
    if (envURL.status) {
        const response = await fetch(envURL.url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'cache-control': 'no-cache'
            }
        });

        return response.json();
    }

    let data;
    switch (envURL.type) {
        case TAB_MOVIES_KEY: data = movies; break;
        case TAB_TV_KEY: data = tvShows; break;
        case TAB_TV_TOKU_KEY: data = tvTokusatsu; break;
        case TAB_ANIMES_KEY: data = animes; break;
        case TAB_COMICS_KEY: data = comics; break;
        case TAB_MANGAS_KEY: data = mangas; break;
    }

    return data;
}