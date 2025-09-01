import React, { useEffect, useState } from "react";
import avatar1 from "./assets/avatar1.png";
import avatar2 from "./assets/avatar2.jpg";
import avatar3 from "./assets/new_logo.0b4a2b55 (1) 1.png";
import Text from "../text/text";
//icons
import { FaChevronRight, FaChevronLeft, FaChevronDown } from "react-icons/fa";

import styles from "../../../css/main.module.scss";

interface SidebarItem {
  title: string;
  access: boolean;
  hasAbstract: boolean;
  ficon: string;
  isNew: any;
  url: string | null;
  children: SidebarItem[] | null;
}

interface SidebarProps {
  data: {
    status: boolean;
    data: SidebarItem[];
  };
  toggleSidebar: () => void;
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  data,
  toggleSidebar,
  isCollapsed,
  isMobileOpen,
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<
    Record<string, string | null>
  >({});

  const handleSubmenuToggle = (level: string, id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [level]: prev[level] === id ? null : id,
    }));
  };

  const [gender, setGender] = useState<string>("");

  // useEffect(() => {
  //   const fetchGender = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://samizco.ir/ogp/pages/core/persons/input_persons_inner.php?page_item=',
  //         {
  //           method: 'POST',
  //           credentials: 'include',
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             Accept: 'text/html',
  //             'User-Agent':
  //               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  //             Origin: 'https://samizco.ir',
  //             Referer:
  //               'https://samizco.ir/ogp/pages/core/persons/input_persons_inner.php?page_action=profile&tk=47d4ea3e66d82c9c0215f624e968728ac3feedf7',
  //           },
  //           body: `------WebKitFormBoundaryrgEUzI7xvCF3Q5zt\r\nContent-Disposition: form-data; name="key"\r\n\r\nvalue\r\n------WebKitFormBoundaryrgEUzI7xvCF3Q5zt--`,
  //         },
  //       );

  //       const text = await response.text();

  //       const genderMatch = text.match(
  //         /<select[^>]*name=["']ismale["'][^>]*>[\s\S]*?<option[^>]*value=['"]1['"][^>]*selected[^>]*>مرد<\/option>/i,
  //       );

  //       if (genderMatch) {
  //         setGender('مرد');
  //       } else if (text.includes("<option value='0' selected>زن</option>")) {
  //         setGender('زن');
  //       } else {
  //         setGender('نامشخص');
  //       }
  //     } catch (error) {
  //       console.error('خطا در دریافت اطلاعات جنسیت:', error);
  //       setGender('خطا');
  //     }
  //   };

  //   fetchGender();
  // }, []);
  const sidebarItems = Array.isArray(data?.data) ? data.data : [];

  const renderSidebarItem = (
    item: SidebarItem,
    index: number,
    level: number = 0,
    parentLevel: string = ""
  ) => {
    const id = `${parentLevel}-${index}`;
    const currentLevel = `${level}`;
    const isOpen = openSubmenus[currentLevel] === id;
    const hasChildren = item.children && item.children.length > 0;
    return (
      <div key={id} className={`mb-2 ${isOpen ? styles.submenuOpen : ""}`}>
        {item.url ? (
          <a
            href={item.url || "#"}
            onClick={(e) => {
              e.preventDefault();
              if (item.url) {
                window.location.href = item.url;
              } else {
                console.warn("URL is null or undefined");
              }
            }}
            className={`${styles.sidebarItem} ${
              isCollapsed ? styles.collapsed : ""
            } d-flex align-items-center justify-content-between`}
          >
            <div className="d-flex align-items-center">
              <i
                className={`fa ${item.ficon || "fa-file-alt"} ${
                  styles.fIcon
                } me-2`}
              />
              {!isCollapsed && (
                <span className={styles.labelSidebar}>{item.title}</span>
              )}
            </div>
            {hasChildren && (
              <i
                className={`${styles.arrowIcon} ${isCollapsed ? "d-none" : ""}`}
              >
                {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
              </i>
            )}
          </a>
        ) : (
          <div
            className={`${styles.sidebarItem} ${
              isCollapsed ? styles.collapsedSidebarItem : ""
            } d-flex align-items-center justify-content-between`}
            onClick={() => hasChildren && handleSubmenuToggle(currentLevel, id)}
          >
            <div className="d-flex align-items-center">
              <i
                className={`fa ${item.ficon || "fa-file-alt"} ${styles.fIcon} ${
                  isCollapsed ? styles.centeredIcon : ""
                } me-2`}
              />

              {!isCollapsed && (
                <span className={styles.labelSidebar}>{item.title}</span>
              )}
            </div>
            {hasChildren && (
              <i
                className={`${styles.arrowIcon} ${isCollapsed ? "d-none" : ""}`}
              >
                {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
              </i>
            )}
          </div>
        )}
        {hasChildren && isOpen && (
          <div>
            {(item.children ?? []).map((subItem, subIndex) =>
              renderSidebarItem(subItem, subIndex, level + 1, id)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        isCollapsed ? styles.collapsedSidebar : ""
      }      `}
    >
      <div className={styles.profileSection}>
        <img
          src={gender === "مرد" ? avatar2 : avatar3}
          alt="Profile"
          className={`${styles.avatar} img-fluid rounded-circle`}
        />
        <div>
          {/* <Text
            className={`${styles.tColor1} ${styles.tSize4} ${styles.tNormal} ${styles.tWhiteSpace1}`}
          >
            سامانه میز خدمت اوقاف
          </Text> */}
        </div>
      </div>
      <button
        className={`btn ${styles.buttonSidebar} ${
          isCollapsed ? styles.collapsed : ""
        }`}
        onClick={() => toggleSidebar()}
      >
        {isCollapsed ? (
          <FaChevronLeft className={styles.buttonSidebarIcon} />
        ) : (
          <FaChevronRight className={styles.buttonSidebarIcon} />
        )}
      </button>
      <div className={styles.scrollWrapper}>
        {sidebarItems.map((item, index) => renderSidebarItem(item, index))}
      </div>
    </aside>
  );
};
