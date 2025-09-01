import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../../css/main.module.scss";

interface SearchBoxProps {
  options: string[]; // لیست آیتم‌ها
  onSearch: (value: string) => void;
  placeholder: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  options,
  onSearch,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = options.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className={styles.searchBoxContainer}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <span className={styles.iconSearchBox}>
        <FaSearch />
      </span>

      {/* Dropdown results */}
      {inputValue && (
        <ul className={styles.dropdown}>
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <li key={index} className={styles.dropdownItem}>
                {item}
              </li>
            ))
          ) : (
            <li className={styles.noResult}>موردی یافت نشد</li>
          )}
        </ul>
      )}
    </div>
  );
};
