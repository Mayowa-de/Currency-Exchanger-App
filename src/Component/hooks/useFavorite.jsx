import React,{useState, useEffect} from 'react'

export default function useFavorite() {
 const [favoriteList, setFavoriteList] = useState(() =>{
    const storedFavorites = localStorage.getItem('favoriteList');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
 })
useEffect(() => {
  localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
}, [favoriteList]);

 function addFavorite(pair) {
    setFavoriteList((prev) => {
        if (!prev.some((item) => item.baseCurrency === pair.baseCurrency && item.baseReceiveCurrency === pair.baseReceiveCurrency)) {
            return [...prev, pair];
        }
        return prev;
    });
}
    function removeFavorite(pair) {
        setFavoriteList((prev) => prev.filter((item) => !(item.baseCurrency === pair.baseCurrency && item.baseReceiveCurrency === pair.baseReceiveCurrency)));
    }
 function isFavorite(baseCurrency, baseReceiveCurrency) {
  return favoriteList.some(
    (item) =>
      item.baseCurrency === baseCurrency && item.baseReceiveCurrency === baseReceiveCurrency
  );
 }
    return { favoriteList, addFavorite, removeFavorite, isFavorite };
}
