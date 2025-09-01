import React, { useEffect, useState } from "react";
import ComboBox from "../comboBox/comboBox";
import Text from "../text/text";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Pagination from "../pagination/pagination";
import Modal from "../modal/modal";
import Input from "../input/input";
import RadioButton from "../radioButton/radioButton";
import { Row, Col } from "react-bootstrap";
import { VscEye, VscSearch } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import styles from "../../../css/main.module.scss";

interface BoxContent {
  right?: React.ReactNode[];
  center?: React.ReactNode[];
  left?: React.ReactNode[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerContent: BoxContent;
  bodyContent: BoxContent;
  footerContent: BoxContent;
}

interface DynamicTableProps {
  apiUsers: string;
  apiUnit: string;
  apiComboBox: string;
  motivationOptions: string[];
  texts: {
    text1: string;
    text2: string;
    text3: string;
    applyFilter: string;
    filterPlaceholder1: string;
    filterPlaceholder2: string;
    filterPlaceholder3: string;
    filterPlaceholder4: string;
    filterPlaceholder5: string;
    filterPlaceholder6: string;
    filterPlaceholder7: string;
  };
  detailsModal?: ModalProps;
  motivationModal?: ModalProps;
  setIsDetailsModalOpen?: (open: boolean) => void;
  setIsMotivationModalOpen?: (open: boolean) => void;
  setSelectedRow?: (row: any) => void;
  selectedRow?: any | null;
}

const options = [
  { id: 1, label: "صعودی " },
  { id: 2, label: "نزولی " },
];

const DynamicTable: React.FC<DynamicTableProps> = ({
  apiUsers,
  apiUnit,
  apiComboBox,
  motivationOptions,
  texts,
  detailsModal,
  motivationModal,
  setIsDetailsModalOpen,
  setIsMotivationModalOpen,
  setSelectedRow,
  selectedRow,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [columnTitles, setColumnTitles] = useState<{ [key: string]: string }>(
    {}
  );

  const [selectedValues1, setSelectedValues1] = useState<string>("");
  const [selectedValues2, setSelectedValues2] = useState<string>("");
  const [comboOptions1, setComboOptions1] = useState<string[]>([]);
  const [comboOptions2, setComboOptions2] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [process, setProcess] = useState("");

  const handleSelectionChange = (selected: (typeof options)[0] | null) => {
    console.log("گزینه انتخاب شده:", selected);
  };

  // ---- API helpers
  const fetchUsers = async (url: string) => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      if (result.status) {
        setData(result.data);
        setColumns(Object.keys(result.columns));
        setColumnTitles(result.columns);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // initial load + combo options
  useEffect(() => {
    fetchUsers(apiUsers);
    const fetchComboData = async () => {
      try {
        const response = await fetch(apiComboBox);
        const result = await response.json();
        if (result.status) {
          setComboOptions1(result.data.comboOptions1 || []);
          setComboOptions2(result.data.comboOptions2 || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchComboData();
  }, [apiUsers, apiComboBox]);

  // switch data source by first combo
  useEffect(() => {
    if (selectedValues1 === "فرایند") fetchUsers(apiUsers);
    else if (selectedValues1 === "واحد سازمانی") fetchUsers(apiUnit);
  }, [selectedValues1, apiUsers, apiUnit]);

  // filtered data
  const [filteredData, setFilteredData] = useState<any[]>([]);
  useEffect(() => {
    setFilteredData(data);
    setCurrentPage(1);
  }, [data]);

  const applyFilter = () => {
    if (!filterValue) {
      setFilteredData(data);
    } else {
      const vals = filterValue.split(", ").filter((v) => v);
      if (vals.length > 0) {
        setFilteredData(data.filter((row) => vals.includes(row.motivation)));
      } else {
        setFilteredData(data);
      }
    }
    setCurrentPage(1);
  };

  // pagination (based on filteredData)
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  // export
  const exportToExcel = () => {
    const worksheetData = data.map((row) => {
      const newRow: { [key: string]: any } = {};
      columns.forEach((col) => {
        newRow[columnTitles[col]] = row[col];
      });
      return newRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "table.xlsx");
  };

  return (
    <div>
      <div
        className={`${styles.filterBoxWrapper} ${
          showFilter ? styles.open : styles.close
        }`}
      >
        {showFilter && (
          <Row className={styles.fillterBoxRow}>
            <Col>
              <Row>
                <Col lg={5}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder1}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
                <Col lg={3}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder2}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
                <Col lg={4}>
                  <Input
                    placeholder=""
                    type="text"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    className={styles.inputFillter}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={5}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder3}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
                <Col lg={3}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder4}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
                <Col lg={4}>
                  <Input
                    placeholder=""
                    type="text"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    className={styles.inputFillter}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={5}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder5}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
                <Col lg={3}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder6}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
                <Col lg={4}>
                  <Input
                    placeholder=""
                    type="text"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    className={styles.inputFillter}
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={4} className={styles.fillterBoxCol2}>
              <Row>
                <Col lg={12}>
                  <ComboBox
                    options={motivationOptions}
                    onSelect={setFilterValue}
                    placeholder={texts.filterPlaceholder7}
                    enableMultiSelect={true}
                    className={styles.ComboBoxFillter}
                  />
                </Col>
              </Row>
              <Row className={styles.inputFillter}>
                <Col lg={12}>
                  <Input
                    placeholder="تعداد ردیف در صفحه"
                    type="text"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className={styles.fillterRow}>
                <Col lg={12}>
                  <RadioButton
                    items={options}
                    onChange={handleSelectionChange}
                    name=""
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={2}>
              <Row className={styles.fillterRow2}>
                <div className={styles.applyFilterBtn} onClick={applyFilter}>
                  {texts.applyFilter}
                </div>
              </Row>
            </Col>
          </Row>
        )}
      </div>

      <div className={styles.tableBox}>
        <div className={styles.tableActions}>
          <div
            className={styles.btn}
            onClick={() => {
              if (setSelectedRow && setIsDetailsModalOpen) {
                if (selectedRow) {
                  setSelectedRow(selectedRow);
                  setIsDetailsModalOpen(true);
                } else if (data.length > 0) {
                  setSelectedRow(data[0]);
                  setIsDetailsModalOpen(true);
                } else {
                  alert("لطفاً یک ردیف را انتخاب کنید");
                }
              }
            }}
          >
            <VscEye className={styles.btnIcon} />
            <div className={styles.btnText}>مشاهده</div>
          </div>

          <div
            className={styles.btn}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <FiSearch className={styles.btnIcon} />
            <div className={styles.btnText}>جستجو</div>
          </div>

          <div className={styles.btn} onClick={exportToExcel}>
            <RiFileExcel2Line className={styles.btnIcon} />
            <div className={styles.btnText}>گزارش</div>
          </div>
        </div>

        {/* ====== کمبوهای بالای جدول ====== */}
        <div className={styles.comboRow}>
          <div className={styles.comboCol}>
            <ComboBox
              options={comboOptions1}
              onSelect={setSelectedValues1}
              placeholder={texts.text1}
              className={styles.comboOptions1}
            />
          </div>
          <div>/</div>
          <div className={styles.comboCol}>
            <ComboBox
              options={comboOptions2}
              onSelect={(val) => {
                setSelectedValues2(val);
                const selectedColumns = val
                  .split(", ")
                  .filter((col) => col.trim() !== "");
                setExtraColumns(selectedColumns);
              }}
              placeholder={texts.text2}
              enableMultiSelect={true}
              className={styles.comboOptions2}
            />
          </div>
        </div>

        {/* ====== جدول ====== */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{columnTitles[col]}</th>
                ))}
                {extraColumns.map((col) => (
                  <th key={col}>
                    <div>
                      <span>{col}</span>
                      <IoClose
                        className={styles.IconClose}
                        onClick={() => {
                          const updated = extraColumns.filter((c) => c !== col);
                          setExtraColumns(updated);
                          const newVal = updated.join(", ");
                          setSelectedValues2(newVal);
                        }}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentRows &&
              currentRows.length > 0 &&
              columns &&
              columns.length > 0 ? (
                currentRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      color: "#000",
                    }}
                    onClick={() => setSelectedRow && setSelectedRow(row)}
                    className={`${styles.tableRow} ${
                      selectedRow === row ? styles.selectedRow : ""
                    }`}
                  >
                    {columns.map((col) => (
                      <td key={col}>
                        {col === "status" ? (
                          <span
                            style={{
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              backgroundColor: row.rowColor || "#000",
                            }}
                          />
                        ) : col === "details" ? (
                          <VscEye
                            className={styles.eyeBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (setSelectedRow && setIsDetailsModalOpen) {
                                setSelectedRow(row);
                                setIsDetailsModalOpen(true);
                              }
                            }}
                          />
                        ) : col === "motivation" ? (
                          <span
                            style={{
                              color: row.color || "#000",
                              backgroundColor: row.bgColor || "transparent",
                              padding: "4px 10px",
                              borderRadius: "10px",
                              display: "inline-block",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (setSelectedRow && setIsMotivationModalOpen) {
                                setSelectedRow(row);
                                setIsMotivationModalOpen(true);
                              }
                            }}
                          >
                            {row.motivation || "N/A"}
                          </span>
                        ) : (
                          row[col] || "N/A"
                        )}
                      </td>
                    ))}

                    {extraColumns.map((col) => (
                      <td key={col}>{row[col] || "-"}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      (columns?.length || 0) + (extraColumns?.length || 0)
                    }
                  >
                    داده‌ای برای نمایش وجود ندارد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ====== صفحه‌بندی ====== */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* ====== مودال‌ها ====== */}
        {detailsModal && (
          <Modal
            isOpen={detailsModal.isOpen}
            onClose={detailsModal.onClose}
            header={detailsModal.headerContent}
            body={detailsModal.bodyContent}
            footer={
              detailsModal.footerContent || { left: [], right: [], center: [] }
            }
          />
        )}

        {motivationModal && (
          <Modal
            isOpen={motivationModal.isOpen}
            onClose={motivationModal.onClose}
            header={motivationModal.headerContent}
            body={motivationModal.bodyContent}
            footer={
              motivationModal.footerContent || {
                left: [],
                right: [],
                center: [],
              }
            }
          />
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
