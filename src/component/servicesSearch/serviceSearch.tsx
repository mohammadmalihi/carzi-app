import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaAngleLeft, FaAngleDoubleLeft } from "react-icons/fa";
import img1 from "./assets/Component 196.png";
import img2 from "./assets/Component 197.png";
import styles from "../../css/main.module.scss";

interface ServicesSearchProps {
  placeholder?: string;
  api?: string;
}

interface Item {
  title: string;
  _children?: Item[];
  [key: string]: any;
}

const ServicesSearch: React.FC<ServicesSearchProps> = ({
  placeholder,
  api,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Item[]>([]);
  const [filteredResults, setFilteredResults] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(api);
        const json = await res.json();
        setData(json.data || []);
      } catch (error) {
        console.error("خطا در گرفتن داده‌ها:", error);
      }
    };

    fetchData();
  }, [api]);

  const searchInTree = (items: Item[], term: string): Item[] => {
    let results: Item[] = [];

    for (const item of items) {
      const lowerTerm = term.toLowerCase();

      if (
        typeof item?.title === "string" &&
        item.title.toLowerCase().includes(lowerTerm)
      ) {
        results.push(item);
      }

      if (Array.isArray(item._children) && item._children.length > 0) {
        const childMatches = searchInTree(item._children, term);
        results = results.concat(childMatches);
      }
    }

    return results;
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const filtered = searchInTree(data, searchTerm);
    setFilteredResults(filtered);
  }, [searchTerm, data]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={`${styles.searchInput} ${isFocused ? styles.expanded : ""}`}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IoSearch
        className={`${styles.searchIcon} ${isFocused ? styles.moveLeft : ""}`}
      />

      {isFocused && filteredResults.length > 0 && (
        <div className={styles.resultBox}>
          {filteredResults.map((item, index) => (
            <div key={index} className={styles.resultItem}>
              {/* <FaAngleLeft className={styles.iconChildrenSerchComponent} /> */}
              <span className={styles.iconWrapper}>
                <img src={img1} className={styles.defaultIcon} />
                <img src={img2} className={styles.hoverIcon} />
              </span>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesSearch;
