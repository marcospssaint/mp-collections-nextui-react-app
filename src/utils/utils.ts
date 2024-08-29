import { TYPE_F_AUTHOR, TYPE_F_CAST, TYPE_F_COUNTRIES, TYPE_F_GENRE, TYPE_F_ORIGINAL_TITLE, TYPE_F_OWNED, TYPE_F_PUBLICATION_TITLE, TYPE_F_PUBLISHER, TYPE_F_SUBTITLE, TYPE_F_TITLE, TYPES_FIELD } from "./constantes";

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

export const isFilterMultipleSelect = (values: any[] | undefined, midia: any, type: string) => {
    if (!isNotNullArray(values)) return true;

    return values?.some((value) => isFilterByType(value, midia, type));
}

export const isFilterSingleSelect = (value: any | undefined, midia: any, type: string) => {
    return isFilterByType(value, midia, type);
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
    } 
    else if (type === TYPE_F_OWNED) return midia?.owned === value;
    return true;
}

export const getFlagCountries = (countries: string) => {
    if (!isNotNullStr(countries)) return [];
    
    var options = [''];
    countries?.split(', ').forEach((c: any) => {
        options.push(linkFlags(c))
    });

    return options?.filter(isNotNullStr);
}

export const linkFlags = (country: string) => {
    var flag = 'https://flagcdn.com/';
        if (country === 'USA')
            flag += 'us.svg';
        if (country === 'UK')
            flag += 'gb.svg';
        if (country === 'Italy')
            flag += 'it.svg';
        if (country === 'France')
            flag += 'fr.svg';
        if (country === 'Australia')
            flag += 'au.svg';
        if (country === 'Brazil')
            flag += 'br.svg';
        if (country === 'Switzerland')
            flag += 'ch.svg';
        if (country === 'Spain')
            flag += 'es.svg';
    return flag;
}

export const iconFlagLanguage = (language: string | undefined) => {
    if (language !== undefined) {
        let imageFlag;
        switch (language) {
            case 'Argentina': imageFlag = ''; break;
            case 'Belgian': imageFlag = ''; break;
            case 'Portugues-pt': imageFlag = 'pt.svg'; break;
            case 'Portugues': imageFlag = 'br.svg'; break;
            case 'Chinese': imageFlag = ''; break;
            case 'French': imageFlag = 'fr.svg'; break;
            case 'Germany': imageFlag = ''; break;
            case 'Italian': imageFlag = 'it.svg'; break;
            case 'Japanese': imageFlag = ''; break;
            case 'Philippines': imageFlag = ''; break;
            case 'Singapore': imageFlag = ''; break;
            case 'South Korea': imageFlag = ''; break;
            case 'Spanish': imageFlag = 'es.svg'; break;
            case 'Switzerland': imageFlag = ''; break;
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
            return '';
        })
        .forEach((data) => {
            var value;
            if (type === TYPE_F_GENRE) value = data?.genre
            else if (type === TYPE_F_COUNTRIES) value = data?.countries;

            value?.split(', ').forEach((c: any) => options.push(c))
        });

    const optionsSets = [...new Set(options)];
    return optionsSets
        .filter(isNotNullStr)
        .sort((a, b) => (a ?? '').localeCompare(b ?? ''));
}

export const imageModified = (image: string | null | undefined) => {
    if (!isNotNull(image)) return '';

    let imageModified = image?.slice(1, -1);
    const imageMultipleArr = image?.split('", "') ?? [];

    if (imageMultipleArr?.length > 1) {
        imageModified = image?.split('", "')[0]?.slice(1);
    }

    return imageModified;
}