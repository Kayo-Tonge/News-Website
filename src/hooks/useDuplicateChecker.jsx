

export default function useDuplicateChecker() {
    const ids = new Set() //Set is a special js object that keeps unique elments. In this case, I wanted every article to be unique, so I keep track of the ids of each article and made sure no articles share any identical ids
    const urls = new Set()
    function hasNotDuplicateId(article){
            if (ids.has(article.id) || urls.has(article.url)){
                return false
            }
            ids.add(article.id)
            urls.add(article.url)
            return true
        }
    return {hasNotDuplicateId}
}