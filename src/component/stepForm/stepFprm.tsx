import React, { useState } from "react";
import OptionSelect from "../optionSelect/optionSelect";
import Divider from "../divider/divider";
import { Row, Col } from "../gridLayout/gridLayout";
import Button from "../btn/button";
import Text from "../text/text";

import styles from "../../../css/main.module.scss";

interface Field {
  label: string;
  required?: boolean;
  placeholder: string;
  type?: "select" | "text";
  apiUrl?: string;
}

interface StepFormProps {
  title: string;
  steps: string[];
  formDescriptions: string[];
  currentStep: number;
  formTitle: string;
  cancelText: string;
  fields: Field[];
  onNext?: () => void;
}

const StepForm: React.FC<StepFormProps> = ({
  title,
  steps,
  formDescriptions,
  currentStep,
  formTitle,
  cancelText,
  fields,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
    console.log("گزینه انتخاب‌شده:", option);
  };

  return (
    <div className={styles.stepFormWrapper}>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Col>
              <Row className={styles.stepItem}>
                <Col lg={5}>
                  <div
                    className={`${styles.circle} ${
                      currentStep === index ? styles.active : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                </Col>
                <Col lg={3}>
                  <Text
                    className={`${styles.stepTitle} ${
                      currentStep === index ? styles.activeTitle : ""
                    }`}
                  >
                    {step}
                  </Text>
                  <Text className={styles.stepDescription}>
                    {formDescriptions[index]}
                  </Text>
                </Col>
              </Row>
            </Col>

            {index !== steps.length - 1 && (
              <Col lg={1} className={styles.stepDivider}>
                <div className={styles.dividerLine}></div>
              </Col>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <h3>{formTitle}</h3>
          <span className={styles.cancel}>{cancelText}</span>
        </div>

        <Row gutter={[16, 16]} className={styles.formGrid}>
          {fields.map((field, idx) => (
            <Col key={idx} lg={3} md={6} sm={12}>
              <div className={styles.formField}>
                <label>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>
                {field.type === "select" && field.apiUrl ? (
                  <OptionSelect
                    apiUrl={field.apiUrl}
                    onChange={handleOptionChange}
                  />
                ) : (
                  <input placeholder={field.placeholder} />
                )}
              </div>
            </Col>
          ))}
        </Row>

        {onNext && (
          <Row>
            <Col lg={3} md={6} sm={12}>
              <div></div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div></div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div></div>
            </Col>
            <Col lg={2} md={6} sm={12}>
              <Button
                label="تایید و ادامه"
                size="large"
                styleType="bSuccess"
                borderRadius="bRoundedSmall"
                fontFamily="vazir"
                onClick={onNext}
              />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default StepForm;
