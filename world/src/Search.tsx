import { useState } from 'react'
import './styles/search.css'
import type {CountryData} from './types/types.ts'

function Search({countriesData, setSelectedCountry}: {countriesData: any[]; setSelectedCountry: (country: string | null) => void}){
    const [searchData, setSearchData]=useState<CountryData[] | null>(null)
    const countryCodes: Record<string,string> ={
        FRA: 'fr',
        NOR: 'no'
    }
    const [inputValue, setInputValue]=useState<string>('')

    function searchCountry(searched: string){
        if(searched === ''){
            setSearchData(null)
            return
        }
        const result: CountryData[]=countriesData.filter((c)=>c.properties.NAME?.toLowerCase().includes(searched.toLowerCase()));
        setSearchData(result)
    }

    return (
    <div className='search-div'>
        <input type="text" id='search-input' value={inputValue} onChange={e=>{
            searchCountry(e.target.value);
            setInputValue(e.target.value);
        }}/>
        {searchData?.length > 0 && (
            <div className='searched-countries'>
                {searchData.map((c, index)=>(
                    <div className='searched-country' key={index} onClick={()=>{
                        setSelectedCountry(c.properties.NAME) ;
                        setSearchData(null);
                        setInputValue('');
                    }}>
                        <img id='country-flag' src={`https://flagcdn.com/w160/${c.properties.ISO_A2 !== '-99' ? c.properties.ISO_A2.toLowerCase() : countryCodes[c.properties.ADM0_A3]}.png`} onError={(e)=>e.currentTarget.src= `https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk=`} alt="country-flag" />
                        <h4>{c.properties.NAME}</h4>
                    </div>
                ))}
            </div>
        )}
    </div>
)
}

export default Search