import { Modal, Form, Select } from "antd";
import { useEffect, useState } from "react";
import CustomInput from "../../ui/Input";
import CustomSwitch from "../../ui/Switch";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  status: "Active" | "Inactive";
}

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Employee, "_id">) => void;
  editData?: Employee | null;
}

const { Option } = Select;

const EmployeeModal = ({
  open,
  onClose,
  onSubmit,
  editData,
}: EmployeeModalProps) => {
  const [form] = Form.useForm();
  const isEdit = !!editData;
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
      setIsActive(editData.status === "Active");
    } else {
      form.resetFields();
      setIsActive(true);
    }
  }, [editData, form, open]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit({ ...values, status: isActive ? "Active" : "Inactive" });
      form.resetFields();
      onClose();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      title={
        <div className="flex items-center gap-2 pb-2">
          <span className="text-base font-bold text-gray-900">
            {isEdit ? " Update Employee" : "Add New Employee"}
          </span>
        </div>
      }
      okText={isEdit ? "Update" : "Create"}
      cancelText="Cancel"
      okButtonProps={{
        style: {
          backgroundColor: "#052e16",
          borderColor: "#052e16",
          fontWeight: 600,
        },
      }}
      width={660}
      centered
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="pt-2">
        {/* Name */}
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter employee name" }]}
        >
          <CustomInput placeholder="e.g. Sujon Ahmed" size="large" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <CustomInput placeholder="e.g. sujon@example.com" size="large" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <CustomInput placeholder="e.g. +880 1234 567890" size="large" />
        </Form.Item>

        {/* Designation + Department */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="designation"
            label="Designation"
            rules={[{ required: true, message: "Please enter designation" }]}
          >
            <CustomInput placeholder="e.g. UI Designer" size="large" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Select department" }]}
          >
            <Select placeholder="Select" size="large">
              <Option value="Engineering">Engineering</Option>
              <Option value="Design">Design</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Operations">Operations</Option>
              <Option value="Sales">Sales</Option>
            </Select>
          </Form.Item>
        </div>

        {/* Status — Switch Toggle */}
        <Form.Item label="Status">
          <div className="flex items-center gap-3">
            <CustomSwitch
              checked={isActive}
              onChange={setIsActive}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
            <span
              className={`text-sm font-semibold ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;
