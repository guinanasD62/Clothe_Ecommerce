import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'
//1.05
const Search = ({placeholder}) => {
  return (
    <div className={styles.container}>
    <MdSearch/>
    <input type="text" placeholder={placeholder} className={styles.input}></input>
    </div>
  )
}

export default Search