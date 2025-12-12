/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Enhanced form component with better performance and validation
 */

import * as React from "react";
import { DatePicker, Form, Input, Select, Radio } from "antd";
import PropTypes from "prop-types";
import { FORM_DEFAULTS, UI_CONSTANTS, DEPARTMENT_OPTIONS, THEME_COLORS } from "../utils/constants";
import { useTheme } from "../contexts/ThemeContext";

const FormComponent = React.memo(({ formData, onFormChange, form }) => {
  const { isDarkMode } = useTheme();
  
  return (
  <Form
    form={form}
    initialValues={formData}
    layout="horizontal"
    size="large"
    variant="outlined"
    scrollToFirstError={{ behavior: "smooth", block: "end", focus: true }}
    labelCol={{ span: UI_CONSTANTS.FORM_LABEL_SPAN }}
    wrapperCol={{ span: UI_CONSTANTS.FORM_WRAPPER_SPAN }}
    style={{ width: "100%", paddingBottom: "20px" }}
    onValuesChange={onFormChange}
  >
    <Form.Item
      name="jobTitle"
      label={<label style={{ fontWeight: "bold" }}>Job Title</label>}
      required={true}
    >
      <Input placeholder="Library Associate" />
    </Form.Item>
    <Form.Item
      name="department"
      label={<label style={{ fontWeight: "bold" }}>Department</label>}
      required={true}
    >
      <Select
        showSearch
        placeholder="Select a Department"
        filterOption={(input, option) =>
          (option?.label || "").toLowerCase().includes(input.toLowerCase())
        }
        options={DEPARTMENT_OPTIONS}
      />
    </Form.Item>
    <Form.Item
      name="classification"
      label={<label style={{ fontWeight: "bold" }}>Classification</label>}
      required={true}
    >
      <Select
        showSearch
        placeholder="Select a Classification"
        options={FORM_DEFAULTS.CLASSIFICATION_OPTIONS}
      />
    </Form.Item>
    <Form.Item
      name="exemption"
      label={
        <label style={{ fontWeight: "bold" }} required={true}>
          Exemption Type
        </label>
      }
      required={true}
    >
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={FORM_DEFAULTS.EXEMPTION_OPTIONS}
        defaultValue="Non-exempt"
        block
      />
    </Form.Item>
    <Form.Item
      name="supervisor"
      label={<label style={{ fontWeight: "bold" }}>Reports to</label>}
      required={true}
    >
      <Input placeholder="Information Services Manager" />
    </Form.Item>
    <Form.Item
      name="supervises"
      label={<label style={{ fontWeight: "bold" }}>Supervises</label>}
      extra={
        <span style={{ color: isDarkMode ? THEME_COLORS.DARK.TEXT_SECONDARY : THEME_COLORS.LIGHT.TEXT_SECONDARY }}>
          {`Defaults to "${FORM_DEFAULTS.SUPERVISES_DEFAULT}" if left blank`}
        </span>
      }
    >
      <Input placeholder={FORM_DEFAULTS.SUPERVISES_DEFAULT} />
    </Form.Item>
    <Form.Item
      name="jobSummary"
      label={<label style={{ fontWeight: "bold" }}>Job Summary</label>}
      required={true}
    >
      <Input.TextArea
        placeholder="Job Summary"
        autoSize={{ minRows: 2, maxRows: 6 }}
      ></Input.TextArea>
    </Form.Item>
    <Form.Item
      name="dateRevised"
      label={<label style={{ fontWeight: "bold" }}>Date Revised</label>}
      extra={
        <span style={{ color: isDarkMode ? THEME_COLORS.DARK.TEXT_SECONDARY : THEME_COLORS.LIGHT.TEXT_SECONDARY }}>
          Defaults to today's date if left blank
        </span>
      }
    >
      <DatePicker
        placeholder={new Date().toLocaleDateString()}
        size="large"
      />
    </Form.Item>
  </Form>
  );
});

FormComponent.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

FormComponent.displayName = "FormComponent";

export default FormComponent;
