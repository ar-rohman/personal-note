import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialKeyword = searchParams.get('keyword');
    const [keyword, setKeyword] = useState(initialKeyword);

    const onSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setKeyword(keyword);
        setSearchParams({ keyword });
    };

    return [keyword, onSearch];
}
