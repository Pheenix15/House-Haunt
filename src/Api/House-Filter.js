import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function HouseFilter ({onSearch}) {
    const [searchParams, setSearchParams] = useSearchParams(); //Used to sync filters to URL
    const debounceRef = useRef(null);

    // Filter States
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [price, setPrice] = useState(searchParams.get("price") || "");
    

    // Apply filters ONLY when search button is clicked
    const applyFilters = () => {
        const params = {};

        if (search.trim()) params.search = search.trim();
        if (price) params.price = price;

        // Sync filters to URL
        setSearchParams(params);

        // Send filters to backend
        onSearch(params);
    };

    // Filtering logic
    const filteredHouses = useMemo(() => {
        return houses.filter(house => {
        const matchesSearch =
            !searchQuery ||
            house.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            house.location?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice =
            !priceQuery || Number(house.price) <= Number(priceQuery);

        return matchesSearch && matchesPrice;
        });
    }, [houses, searchQuery, priceQuery]);


    return {
        searchInput,
        setSearchInput,
        priceInput,
        setPriceInput,
        applyFilters,
        filteredHouses,
    };
}

export default HouseFilter ;