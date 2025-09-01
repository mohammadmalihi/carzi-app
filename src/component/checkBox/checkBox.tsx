import React, { useState } from "react";
import Styles from "../../../css/main.module.scss";

interface CheckboxItem {
  id: number;
  label: string;
}

interface CheckboxProps {
  items: CheckboxItem[];
  onChange?: (selected: CheckboxItem[]) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ items, onChange }) => {
  const [selectedItems, setSelectedItems] = useState<CheckboxItem[]>([]);

  const handleChange = (item: CheckboxItem) => {
    let updatedSelected: CheckboxItem[] = [];
    if (selectedItems.some((i) => i.id === item.id)) {
      updatedSelected = selectedItems.filter((i) => i.id !== item.id);
    } else {
      updatedSelected = [...selectedItems, item];
    }
    setSelectedItems(updatedSelected);
    if (onChange) onChange(updatedSelected);
  };

  return (
    <div className={Styles.checkboxWrapper}>
      {items.map((item) => (
        <label key={item.id} className={Styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedItems.some((i) => i.id === item.id)}
            onChange={() => handleChange(item)}
            className={Styles.checkboxInput}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
