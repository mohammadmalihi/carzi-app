// تعریف فایل‌های SCSS
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.scss';
  
  // تعریف فایل‌های MP4
  declare module '*.mp4' {
    const value: string;
    export default value;
  }

  // تعریف فایل‌های PNG
  declare module '*.png' {
    const value: string;
    export default value;
  }
  
  // تعریف فایل‌های SVG
  declare module '*.svg' {
    import * as React from 'react';
    const value: string;
    export default ReactComponent;
  }
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  // تعریف سایر فایل‌ها (در صورت نیاز)
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.gif';
  declare module '*.bmp';
  declare module '*.tiff';
  