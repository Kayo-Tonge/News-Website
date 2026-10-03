

export default function useDuplicateChecker() {
        const ids = new Set() //Set is a special js object that keeps unique elments. In this case, I wanted every article to be unique, so I keep track of the ids of each article and made sure no articles share any identical ids
    function hasNotDuplicateId(article){
            
            if (ids.has(article.id)){
                return false
            }
            ids.add(article.id)
            return true
        }
        return {hasNotDuplicateId}
}