export type CountryData = {
    properties: {
        NAME: string;
        ISO_A2?: string;
        ADM0_A3?: string;
    }
}

export type Article = {
    title: string
    link: string
    thumbnail: string | null
    iso_date: string | null
    source:{
        name: string
        icon: string
    }
};

export type NewsResult = {
    title: string
    stories?: Article[]
} & Partial<Article>;

export type SerpApiResponse = {
    news_results: NewsResult[]
}

export type ReactArticle = {
    title: string,
    url: string,
    image: string | null,
    publishedAt: string,
    publisherName: string | null,
    publisherIcon: string | null
}

export type DatabaseResult = {
    id: number
    country_name: string
    last_updated: string
    news: ReactArticle[]
}