import { useEffect, useRef, useState } from 'react';
import './styles/news.css'
import type {ReactArticle} from './types/types.ts'
import noImage from '/no-image.png'
import LoadingIcon from '/loading.svg'

function News({selectedCountry}: {selectedCountry: string | null}){
    const [articles, setArticles]=useState<ReactArticle[]>([]);
    const newsRef=useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading]=useState<boolean>(false)

    useEffect(()=>{
        if(selectedCountry === null) return;

        setIsLoading(true)

        fetch(`/api/getNews/${selectedCountry}`)
        .then(r => r.json())
        .then(data=>{
            setArticles(data)
        })
        .catch(error => console.error(error))
        .finally(()=> setIsLoading(false))

        newsRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }, [selectedCountry]);
    
    return (
    <div
        className={articles.length > 0 ? 'country-news active' : 'country-news'}
        ref={newsRef}
    >
        {isLoading ? (
            <img src={LoadingIcon} alt="loading-icon" id='loading-icon'/>
        ) : (
            articles.length > 0 && articles.map((article, index) => (
                <div
                    className="article"
                    key={index}
                    onClick={() => window.open(article.url, "_blank")}
                >
                    <img
                        src={article.image || noImage}
                        alt="article-image"
                        id="article-image"
                        onError={e => e.currentTarget.src = noImage}
                    />

                    <span className="publisher">
                        <img
                            src={article.publisherIcon}
                            alt="publisher-icon"
                            width={20}
                            height={20}
                        />
                        <p id="article-publisher">{article.publisherName}</p>
                    </span>

                    <h5>{article.title}</h5>
                    <h6>{article.publishedAt}</h6>
                </div>
            ))
        )}
    </div>
);
}

export default News;