import React, { useState } from "react";
import Styles from "../../../css/main.module.scss";

interface RadioItem {
  id: number;
  label: string;
}

interface RadioProps {
  items: RadioItem[];
  onChange?: (selected: RadioItem | null) => void;
  name: string;
}

const RadioButton: React.FC<RadioProps> = ({ items, onChange, name }) => {
  const [selectedItem, setSelectedItem] = useState<RadioItem | null>(null);

  const handleChange = (item: RadioItem) => {
    setSelectedItem(item);
    if (onChange) onChange(item);
  };

  return (
    <div className={Styles.radioWrapper}>
      {items.map((item) => (
        <label key={item.id} className={Styles.radioLabel}>
          <input
            type="radio"
            name={name}
            checked={selectedItem?.id === item.id}
            onChange={() => handleChange(item)}
            className={Styles.radioInput}
          />
          <span className={Styles.radioCustom}></span>
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
