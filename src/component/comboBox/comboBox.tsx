import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import Input from "../input/input";
import Styles from "../../../css/main.module.scss";

interface ComboBoxProps {
  options: string[];
  onSelect: (
    value: string,
    extraData?: { fromDate: string; toDate: string }
  ) => void;
  placeholder?: string;
  enableDateRange?: boolean;
  enableMultiSelect?: boolean;
  className?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  onSelect,
  placeholder = "انتخاب کنید",
  enableDateRange = false,
  enableMultiSelect = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    if (enableMultiSelect) {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelected);
      onSelect(newSelected.join(", "));
    } else {
      setSelectedOptions([option]);
      onSelect(option);
      setIsOpen(false);
    }
  };

  const handleRemove = (option: string) => {
    const newSelected = selectedOptions.filter((opt) => opt !== option);
    setSelectedOptions(newSelected);
    onSelect(newSelected.join(", "));
  };

  const handleSubmitDates = () => {
    const value = enableMultiSelect
      ? selectedOptions.join(", ")
      : selectedOptions[0] || "";
    onSelect(value, { fromDate, toDate });
    setIsOpen(false);
  };

  const displayContent = enableMultiSelect ? (
    selectedOptions.length > 0 ? (
      <div className={Styles.selectedTagsContainer}>
        {selectedOptions.map((opt, idx) => (
          <div key={idx} className={Styles.selectedTag}>
            {opt}
            <IoIosCloseCircle
              className={Styles.tagCloseIcon}
              onClick={() => handleRemove(opt)}
            />
          </div>
        ))}
      </div>
    ) : (
      <span className={Styles.placeholderText}></span>
    )
  ) : (
    <span className={Styles.placeholderText}>{selectedOptions[0] || ""}</span>
  );

  return (
    <div className={`${Styles.comboBoxContainer} ${className}`}>
      {placeholder && (
        <label className={Styles.comboBoxLabel}>{placeholder}</label>
      )}

      <div className={Styles.comboBox} onClick={() => setIsOpen(!isOpen)}>
        {displayContent}
        <span className={Styles.iconComboBox}>
          <MdKeyboardArrowDown />
        </span>
      </div>

      {/* یکسان برای همه (موبایل و دسکتاپ) */}
      {isOpen && (
        <div className={Styles.dropdownComboBox}>
          {enableDateRange && selectedOptions.includes("بازه تاریخ") ? (
            <div>
              <div className={Styles.divDateRange}>
                <label>از تاریخ</label>
              </div>
              <div className={Styles.divDateRange}>
                <Input
                  type="text"
                  placeholder="YYYY/MM/DD"
                  maxLength={10}
                  value={fromDate}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length > 4)
                      val = val.slice(0, 4) + "/" + val.slice(4);
                    if (val.length > 7)
                      val = val.slice(0, 7) + "/" + val.slice(7, 9);
                    setFromDate(val);
                  }}
                />
              </div>

              <div className={Styles.divDateRange}>
                <label>تا تاریخ</label>
              </div>
              <div className={Styles.divDateRange}>
                <Input
                  type="text"
                  placeholder="YYYY/MM/DD"
                  maxLength={10}
                  value={toDate}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length > 4)
                      val = val.slice(0, 4) + "/" + val.slice(4);
                    if (val.length > 7)
                      val = val.slice(0, 7) + "/" + val.slice(7, 9);
                    setToDate(val);
                  }}
                />
              </div>

              <div className={Styles.divDateRange}>
                <button
                  className={Styles.buttonDateRange}
                  onClick={handleSubmitDates}
                >
                  ثبت
                </button>
              </div>
            </div>
          ) : (
            <ul>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => (
                  <li key={idx} onClick={() => handleSelect(option)}>
                    {option}
                    {enableMultiSelect &&
                      selectedOptions.includes(option) &&
                      " (انتخاب شده)"}
                  </li>
                ))
              ) : (
                <li>هیچ موردی یافت نشد</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
