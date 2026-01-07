// Extract applied filters from the URL
export const getFiltersFromURL = (searchString) => {
    const params = new URLSearchParams(searchString);

    const search = params.get("search") || "";
    const maxPriceRaw = params.get("max_price");

    const maxPrice = maxPriceRaw && !isNaN(maxPriceRaw)
        ? Number(maxPriceRaw)
        : null;

    return {
        search,
        maxPrice,
    };
};

// Build query parameters for axios
export const buildQueryParams = ({ search, maxPrice }) => {
    const params = {};

    if (search && search.trim() !== "") {
        params.search = search.trim();
    }

    if (typeof maxPrice === "number") {
        params.max_price = maxPrice;
    }

    return params;
};

// Preserve, replace or apply search filter
export const applySearchFilter = (currentFilters, searchValue) => {
    return {
        ...currentFilters,
        search: searchValue.trim(),
    };
};

//Preserve, replace or apply price filter
export const applyPriceFilter = (currentFilters, priceValue) => {
    if (priceValue === "" || priceValue === null) {
        return {
            ...currentFilters,
            maxPrice: null,
        };
    }

    const parsedPrice = Number(priceValue);

    return {
        ...currentFilters,
        maxPrice: !isNaN(parsedPrice) ? parsedPrice : null,
    };
};

//Clears all filters
export const clearAllFilters = () => {
    return {
        search: "", 
        maxPrice: null,
    };
};