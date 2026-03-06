import { Modal, Checkbox, Input, Tag } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

interface PermissionModalProps {
  open: boolean;
  onClose: () => void;
  designationName: string;
}

const modules = [
  { name: "Dashboard", permissions: ["View"] },
  { name: "Employees", permissions: ["View", "Create", "Update", "Delete"] },
  { name: "Designations", permissions: ["View", "Create", "Update", "Delete"] },
  { name: "Orders", permissions: ["View", "Create", "Update", "Delete"] },
  { name: "Inventory", permissions: ["View", "Create", "Update", "Delete"] },
  {
    name: "Incomplete Orders",
    permissions: ["View", "Create", "Update", "Delete"],
  },
  {
    name: "Completed Orders",
    permissions: [
      "View",
      "Create",
      "Update",
      "Delete",
      "View_all",
      "View_pending",
      "View_incomplete",
      "View_no_response",
      "View_good_but_no_response",
      "View_advance_payment",
      "View_hold",
      "View_approved",
      "View_cancelled",
    ],
  },
];

const PermissionModal = ({
  open,
  onClose,
  designationName,
}: PermissionModalProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "Dashboard-View",
    "Orders-View",
    "Orders-Update",
    "Orders-Delete",
    "Incomplete Orders-View",
    "Incomplete Orders-Create",
    "Incomplete Orders-Update",
    "Incomplete Orders-Delete",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePermission = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((p) => p !== permId)
        : [...prev, permId],
    );
  };

  const isModuleSelected = (moduleName: string) => {
    const module = modules.find((m) => m.name === moduleName);
    if (!module) return false;
    return module.permissions.every((p) =>
      selectedPermissions.includes(`${moduleName}-${p}`),
    );
  };

  const toggleModule = (moduleName: string) => {
    const module = modules.find((m) => m.name === moduleName);
    if (!module) return;

    const allPerms = module.permissions.map((p) => `${moduleName}-${p}`);
    if (isModuleSelected(moduleName)) {
      setSelectedPermissions((prev) =>
        prev.filter((p) => !allPerms.includes(p)),
      );
    } else {
      setSelectedPermissions((prev) =>
        Array.from(new Set([...prev, ...allPerms])),
      );
    }
  };

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      width={1000}
      centered
      title={
        <div className="flex items-center justify-between pr-8 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Manage Permissions
            </h3>
            <p className="text-sm text-gray-400 font-medium">
              Configure access for {designationName}
            </p>
          </div>
          <Input
            prefix={<SearchOutlined className="text-gray-300" />}
            placeholder="Search modules..."
            className="w-72 rounded-lg bg-gray-50 border-gray-200"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      }
      closable={true}
      footer={[
        <div
          key="footer"
          className="flex justify-between items-center w-full px-4 py-2 mt-4 border-t border-gray-100"
        >
          <span className="text-sm font-semibold text-gray-500">
            {selectedPermissions.length} / 223 selected
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => {
                /* Select All Logic */
              }}
              className="px-6 py-2 text-sm font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedPermissions([])}
              className="px-6 py-2 text-sm font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>,
      ]}
    >
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-6 px-2">
          <Checkbox className="text-gray-600 font-semibold text-sm">
            Select all permissions
          </Checkbox>
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
          {filteredModules.map((module) => (
            <div
              key={module.name}
              className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800">{module.name}</h4>
                <Checkbox
                  checked={isModuleSelected(module.name)}
                  onChange={() => toggleModule(module.name)}
                  className="custom-checkbox h-5 w-5"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {module.permissions.map((perm) => {
                  const permId = `${module.name}-${perm}`;
                  const isSelected = selectedPermissions.includes(permId);
                  return (
                    <Tag
                      key={perm}
                      className={`cursor-pointer px-4 py-1.5 rounded-md border-0 text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                      onClick={() => togglePermission(permId)}
                    >
                      {perm.charAt(0) +
                        perm.slice(1).toLowerCase().replace("_", " ")}
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PermissionModal;
