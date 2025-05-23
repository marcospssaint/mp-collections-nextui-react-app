import { ChipProps } from "@nextui-org/react";
import { DROPD_SORTBY_DT_ASC_KEY, DROPD_SORTBY_DT_DESC_KEY, DROPD_SORTBY_TL_AZ_KEY, DROPD_SORTBY_TL_ZA_KEY, M_READING, M_VIDEO, TAB_ANIMES_KEY, TAB_BOOKS_KEY, TAB_COMICS_KEY, TAB_MANGAS_KEY, TAB_MOVIES_KEY, TAB_TV_KEY, TAB_TV_TOKU_KEY, TYPE_F_AUTHOR, TYPE_F_CAST, TYPE_F_COUNTRIES, TYPE_F_GENRE, TYPE_F_LANGUAGE, TYPE_F_ORIGINAL_TITLE, TYPE_F_OWNED, TYPE_F_PUBLICATION_TITLE, TYPE_F_PUBLISHER, TYPE_F_STATUS, TYPE_F_SUBTITLE, TYPE_F_TITLE, TYPES_FIELD } from "./constantes";

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const textMidia = (str: string) => {
    return str?.length > 20 ? str.substring(0, 16) : str;
}

export const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
    array.reduce((map, value, index, array) => {
        const key = predicate(value, index, array);
        map.get(key)?.push(value) ?? map.set(key, [value]);
        return map;
    }, new Map<Q, T[]>());

export const squash = <T>(arr: T[] | undefined) => {
    if (arr === undefined) return [];
    var tmp :string[] = [] ;
    for (var i = 0; i < arr.length; i++) {
        if (tmp.indexOf(arr[i]+'') === -1) {
            tmp.push(arr[i]+'');
        }
    }
    return tmp.filter((t) => t !== undefined);
}

export const isNotNull = (value: any | undefined): boolean => value !== undefined && value !== null;
export const isNotNullStr = (value: String | undefined | null): boolean => value !== undefined && value !== null && value !== '';
export const isNotNullArray = (value: any[] | undefined): boolean => value !== undefined && value?.length > 0;

export const isNotNullSelectionArray = (value: Selection | any | any[] | undefined): boolean => value !== undefined && Array.from(value)?.length > 0;

export const isNumberObject = (value: any) => {
    return value !== null && typeof value === 'number';
} 

export const rangeBySeparator = (value: string, separator: string) => {
    var arr: (number | number[])[] = [];
    var primeiroRead = value.substring(0, value.indexOf(separator));
    var segundoRead = value.substring(value.indexOf(separator)+1);

    if (primeiroRead.length === 0) {
        arr.push(Number(segundoRead));
    } else {
        arr.push(...range(Number(primeiroRead), Number(segundoRead)));
    }

    return arr;
}

export const range = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

export const isFilterSearch = (value: any | undefined, midia: any) => {
    if (!isNotNullStr(value)) return true;

    return TYPES_FIELD.some(t => isFilterSearchByType(value, midia, t));
}

const isFilterSearchByType = (value: any, midia: any, type: string) => {
    if (midia === undefined) return true;
    let valueSearch;

    if (type === TYPE_F_TITLE) valueSearch = midia.title;
    else if (type === TYPE_F_SUBTITLE) valueSearch = midia.subtitle;
    else if (type === TYPE_F_ORIGINAL_TITLE) valueSearch = midia.originalTitle;
    else if (type === TYPE_F_PUBLICATION_TITLE) valueSearch = midia.publicationTitle;
    else if (type === TYPE_F_AUTHOR) valueSearch = midia.authors;
    else if (type === TYPE_F_PUBLISHER) valueSearch = midia.publisher;
    else if (type === TYPE_F_CAST) valueSearch = midia.cast;

    var valueSearchStr = valueSearch?.toString();
    return valueSearchStr?.toLowerCase().includes(value?.toLowerCase());
}

export const isFilterMultipleSelect = (values: Selection | any | any[] | undefined, midia: any, type: string) => {
    if (!isNotNullSelectionArray(values)) return true;

    return Array.from(values)?.some((value: any) => isFilterByType(value, midia, type));
}

export const isFilterSingleSelect = (value: any | undefined, midia: any, type: string) => {
    if (value === undefined || Array.from(value).length === 0) return true;
    return isFilterByType(Array.from(value).at(0), midia, type);
}

export const isFilterByType = (value: any | any[], midia: any, type: string) => {
    if (type === TYPE_F_GENRE) {
        let genres: string[] = [];
        genres = midia?.genre?.split(', ');
        return genres?.some((genre: string) => genre === value);
    } else if (type === TYPE_F_COUNTRIES) {
        let countries : string[] = [];
        countries = midia?.countries?.split(', ');
        return countries?.some((country: string) => country === value);
    } else if (type === TYPE_F_LANGUAGE) {
        if (midia?.type === TAB_COMICS_KEY || midia?.type === TAB_MANGAS_KEY || midia?.type === TAB_BOOKS_KEY) {
            return midia?.language === value;
        }
        return true;
    }
    else if (type === TYPE_F_OWNED) {
        return midia?.owned+'' === value;
    } else if (type === TYPE_F_STATUS) {
        if (midia?.midiasTvs !== undefined) {
            if (value === 'O') return midia?.midiasTvs?.some((m: any) => m?.watched === 'P')
            else if (value === 'N') return midia?.midiasTvs?.filter((m: any) => m?.watched === 'NOTW').length === midia?.midiasTvs?.length
            return midia?.midiasTvs?.filter((m: any) => m?.watched === 'W').length === midia?.midiasTvs?.length
        } else if (midia?.watched !== undefined) {
            if (value === 'O') return midia?.watched === 'P'
            else if (value === 'N') return midia?.watched === 'NOTW'
            return midia?.watched === 'W'
        } else if (midia?.read !== undefined) {
            if (value === 'O') return midia?.read === 'P'
            else if (value === 'N') return midia?.read === 'NOTR'
            return midia?.read === 'R'
        }
        return false;
    }
    return true;
}

export const getFlagCountries = (countries?: string) => {
    if (!isNotNullStr(countries)) return [];
    
    var options = [''];
    countries?.split(', ').forEach((c: any) => {
        options.push(linkFlags(c))
    });

    return options?.filter(isNotNullStr);
}

export const typeMidia = (type?: string) => {
    switch (type) {
        case TAB_MOVIES_KEY:
        case TAB_TV_KEY:
        case TAB_TV_TOKU_KEY:
        case TAB_ANIMES_KEY:
            return M_VIDEO;
        default:
            return M_READING;
    }
}

export const statusColorMap: Record<string, ChipProps["color"]> = {
    W: "success",
    Y: "success",
    R: "success",
    P: "danger",
    N: "danger",
    NOTW: "warning",
    NOTR: "warning",
};

export const sortBy = [
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

export const owner = [
    {
        key: "true",
        label: "I have"
    },
    {
        key: "false",
        label: "I don't have"
    }
]

export const status = [
    {
        key: "O",
        label: "Ongoing"
    },
    {
        key: "C",
        label: "Completed"
    },
    {
        key: "N",
        label: "Not initiated"
    }
]
export const linkFlagsByLanguage = (language?: string) => {
    var flag = 'https://flagcdn.com/';

    switch(language) {
        case 'Portugues': flag += 'br.svg'; break;
        case 'Italian': flag += 'it.svg'; break;
        case 'French': flag += 'fr.svg'; break;
        case 'Japanese': flag += 'jp.svg'; break;
        case 'Portugues-pt': flag += 'pt.svg'; break;
        case 'Spanish': flag += 'es.svg'; break;
        case 'English': flag += 'us.svg'; break;

    }
    return flag;
}


export const linkFlags = (country?: string) => {
    var flag = 'https://flagcdn.com/';

    switch(country) {
        case 'Argentina': flag += 'ar.svg'; break;
        case 'Australia': flag += 'au.svg'; break;
        case 'Austria': flag += 'at.svg'; break;
        case 'Brazil': flag += 'br.svg'; break;
        case 'Belgium': flag += 'be.svg'; break;
        case 'Bulgaria': flag += 'bg.svg'; break;
        case 'Canada': flag += 'ca.svg'; break;
        case 'Canada UK': flag += 'ca.svg'; break;
        case 'China': flag += 'cn.svg'; break;
        case 'Colombia': flag += 'co.svg'; break;
        case 'Czech Republic': flag += 'cz.svg'; break;
        case 'Greece': flag += 'gr.svg'; break;
        case 'Germany': flag += 'de.svg'; break;
        case 'Hong Kong': flag += 'hk.svg'; break;
        case 'Hungary': flag += 'hu.svg'; break;
        case 'India': flag += 'in.svg'; break;
        case 'Italy': flag += 'it.svg'; break;
        case 'Ireland': flag += 'ie.svg'; break;
        case 'Israel': flag += 'il.svg'; break;
        case 'Japan': flag += 'jp.svg'; break;
        case 'Mexico': flag += 'mx.svg'; break;
        case 'Taiwan': flag += 'tw.svg'; break;
        case 'Netherlands': flag += 'nl.svg'; break;
        case 'Philippines': flag += 'ph.svg'; break;
        case 'Portugal': flag += 'pt.svg'; break;
        case 'USA': flag += 'us.svg'; break;
        case 'UK': flag += 'gb.svg'; break;
        case 'Russia': flag += 'ru.svg'; break;
        case 'South Africa': flag += 'za.svg'; break;
        case 'South Korea': flag += 'kr.svg'; break;
        case 'France': flag += 'fr.svg'; break;
        case 'Switzerland': flag += 'ch.svg'; break;
        case 'Singapore': flag += 'sg.svg'; break;
        case 'Spain': flag += 'es.svg'; break;
    }
    return flag;
}

export const iconFlagLanguage = (language: string | undefined) => {
    if (language !== undefined) {
        let imageFlag;
        switch (language) {
            case 'Argentina': imageFlag = 'ar.svg'; break;
            case 'Belgian': imageFlag = 'be.svg'; break;
            case 'Portugues-pt': imageFlag = 'pt.svg'; break;
            case 'Portugues': imageFlag = 'br.svg'; break;
            case 'Chinese':
            case 'Mandarin':
                imageFlag = 'cn.svg'; break;
            case 'French': imageFlag = 'fr.svg'; break;
            case 'Germany': imageFlag = 'de.svg'; break;
            case 'Italian': imageFlag = 'it.svg'; break;
            case 'Japanese': imageFlag = 'jp.svg'; break;
            case 'Philippines': imageFlag = 'ph.svg'; break;
            case 'Singapore': imageFlag = 'sg.svg'; break;
            case 'South Korea': imageFlag = 'kr.svg'; break;
            case 'Spanish': imageFlag = 'es.svg'; break;
            case 'Switzerland': imageFlag = 'ch.svg'; break;
            case 'English': imageFlag = 'gb.svg'; break;
            default: imageFlag = '';
        }

        return 'https://flagcdn.com/' + imageFlag;
    }
    return '';
}

export const createByType = (midias: any[], type: string) => {
    var options = [''];
    midias
        .filter((data) => {
            if (type === TYPE_F_GENRE)
                return isNotNullStr(data?.genre)
            else if (type === TYPE_F_COUNTRIES)
                return isNotNullStr(data?.countries)
            else if (type === TYPE_F_LANGUAGE)
                return isNotNullStr(data?.language)
            return '';
        })
        .forEach((data) => {
            var value;
            if (type === TYPE_F_GENRE) value = data?.genre
            else if (type === TYPE_F_COUNTRIES) value = data?.countries;
            else if (type === TYPE_F_LANGUAGE) value = data?.language;

            value?.split(', ').forEach((c: any) => options.push(c))
        });

    const optionsSets = [...new Set(options)];
    return optionsSets
        .filter(isNotNullStr)
        .sort((a, b) => (a ?? '').localeCompare(b ?? ''));
}


export const imageModified = (image: string | null | undefined) => {
    const IMG_DEFAULT = process.env.VITE_HOMEPAGE_URL + '/imagens/imgDefault.png';
    if (!isNotNull(image)) return IMG_DEFAULT;

    let imageModified = image?.slice(1, -1);
    const imageMultipleArr = image?.split('", "') ?? [];

    if (imageMultipleArr?.length > 1) {
        imageModified = image?.split('", "')[0]?.slice(1);
    }

    return imageModified;
}