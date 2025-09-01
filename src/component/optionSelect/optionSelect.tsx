import React, { useState } from "react";
import styles from "../../../css/main.module.scss";

type Option = {
  id: string | number;
  label: string;
};

type OptionSelectProps = {
  apiUrl: string;
  onChange: (selectedValue: Option) => void;
  defaultValue?: string | number;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  apiUrl,
  onChange,
  defaultValue,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | number | undefined>(
    defaultValue
  );
  const [fetched, setFetched] = useState(false);

  const fetchOptions = async () => {
    if (fetched) return;

    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const result = await res.json();

      if (Array.isArray(result.data)) {
        const mappedOptions = result.data.map((item: any) => ({
          id: item.process_temp_code,
          label: item.process_temp_title,
        }));
        setOptions(mappedOptions);
        setFetched(true);
      } else {
        console.error("فرمت داده صحیح نیست:", result);
      }
    } catch (error) {
      console.error("خطا در دریافت داده:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelected(selectedId);
    const selectedOption = options.find((opt) => String(opt.id) === selectedId);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <div className={`${styles.selectWrapper} ${loading ? styles.loading : ""}`}>
      <select
        value={selected}
        onChange={handleChange}
        onClick={fetchOptions}
        className={styles.selectBox}
      >
        <option value="">انتخاب کنید</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.selectArrow}></div>
      )}
    </div>
  );
};

export default OptionSelect;
