import {GridColDef} from "@mui/x-data-grid";

interface Field {
    title: string,
    field: string
}

interface DetailsPanel {
    tableNames?: string[],
    getRow?: boolean,
    getRowField?: any
}

interface TablesMetaType {
    [key: string]: {
        title: string,
        fields: (Field & GridColDef)[],
        searchFields: string[],
        listing?: string,
        detailsPanel?: DetailsPanel
    }

}


export const TablesMeta: TablesMetaType = {
    'glottolog-language': {
        title: 'Glottolog Language',
        listing: 'glottologLanguages',
        fields: [
            {
                title: 'ID',
                field: 'id',
                align: 'right',
            },
            {
                title: 'Glotto Code',
                field: 'glottocode',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Top Level Family',
                field: 'top_level_family',
            },
            {
                title: 'Iso 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Macro Area',
                field: 'macro_area',
            },
            {
                title: 'Child Dialects',
                field: 'child_dialects',
            },
            {
                title: 'Latitude',
                field: 'latitude',
            },
            {
                title: 'Longitude',
                field: 'longitude',
            },
        ],
        searchFields: ['glottocode', 'name', 'top_level_family', 'iso_639_3', 'macro_area'],
    },
    'iso-639-2': {
        title: 'ISO 639 2',
        listing: 'iso6392s',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'ISO 639 2',
                field: 'iso_639_2',
            },
            {
                title: 'Entry Type',
                field: 'entry_type',
            },
            {
                title: 'ISO 639 1',
                field: 'iso_639_1',
            },
            {
                title: 'English Name',
                field: 'english_name',
            },
            {
                title: 'French Name',
                field: 'french_name',
            },
            {
                title: 'German Name',
                field: 'german_name',
            },
        ],
        searchFields: ['iso_639_2', 'english_name', 'french_name', 'english_name'],
    },
    'glottolog language': {
        title: 'Glottolog Language',
        listing: 'silLanguageIndices',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Glotto Code',
                field: 'glottocode',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Top Level Family',
                field: 'top_level_family',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Macro Area',
                field: 'macro_area',
            },
            {
                title: 'Child Dialects',
                field: 'child_dialects',
            },
            {
                title: 'Latitude',
                field: 'latitude',
            },
            {
                title: 'Longitude',
                field: 'longitude',
            },
        ],
        searchFields: ['glottocode', 'name', 'iso_639_3', 'macro_area'],
    },
    'sil-language-index': {
        title: 'SIL Language Index',
        listing: 'silLanguageIndices',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Language Code',
                field: 'language_code',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            },
            {
                title: 'Name Type',
                field: 'name_type',
            },
            {
                title: 'Name',
                field: 'name',
            },
        ],
        searchFields: ['language_code', 'country_code', 'name_type', 'name'],
    }
}
