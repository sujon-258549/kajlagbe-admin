import { Modal, Checkbox, Input, Tag, Button } from "antd";
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
    "Orders-Create",
    "Orders-Update",
    "Orders-Delete",
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

  const handleSelectAllBtn = () => {
    const all = modules.flatMap((m) =>
      m.permissions.map((p) => `${m.name}-${p}`),
    );
    setSelectedPermissions(all);
  };

  const handleClearAllBtn = () => {
    setSelectedPermissions([]);
  };

  const handleGlobalToggle = (checked: boolean) => {
    if (checked) handleSelectAllBtn();
    else handleClearAllBtn();
  };

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPermissionsCount = modules.reduce(
    (acc, m) => acc + m.permissions.length,
    0,
  );
  const isAllSelected = selectedPermissions.length === totalPermissionsCount;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      width={1000}
      centered
      closable={true}
      footer={null}
      title={
        <div className="flex items-center justify-between pr-8 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Manage Permissions
            </h3>
            <p className="text-sm text-gray-400 font-medium tracking-tight">
              Configure access for {designationName}
            </p>
          </div>
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search modules..."
            className="w-80 h-10 rounded-lg bg-gray-50 border-gray-100 focus:bg-white transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      }
    >
      <div className="pt-4">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 px-2">
          <Checkbox
            className="text-gray-600 font-bold text-sm tracking-tight"
            checked={isAllSelected}
            onChange={(e) => handleGlobalToggle(e.target.checked)}
          >
            Select all permissions
          </Checkbox>
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-gray-500 tracking-tight">
              {selectedPermissions.length} / {totalPermissionsCount} selected
            </span>
            <div className="flex gap-2">
              <Button
                size="middle"
                onClick={handleSelectAllBtn}
                className="font-bold border-gray-200 text-gray-700 rounded-lg py-1.5 px-6 h-auto hover:bg-gray-50 transition-all border-2"
              >
                Select All
              </Button>
              <Button
                size="middle"
                onClick={handleClearAllBtn}
                className="font-bold border-gray-200 text-gray-700 rounded-lg py-1.5 px-6 h-auto hover:bg-gray-50 transition-all border-2"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar pb-6 px-1">
          {filteredModules.map((module) => (
            <div
              key={module.name}
              className="border border-gray-100 rounded-2xl p-5 bg-white hover:border-emerald-100 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-5">
                <h4 className="font-extrabold text-gray-800 text-sm uppercase tracking-wider">
                  {module.name}
                </h4>
                <Checkbox
                  checked={isModuleSelected(module.name)}
                  onChange={() => toggleModule(module.name)}
                  className="custom-checkbox h-5 w-5 scale-125"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {module.permissions.map((perm) => {
                  const permId = `${module.name}-${perm}`;
                  const isSelected = selectedPermissions.includes(permId);
                  return (
                    <Tag
                      key={perm}
                      className={`cursor-pointer px-4 pt-1.5 pb-2 rounded-lg border-0 text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-50"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                      }`}
                      onClick={() => togglePermission(permId)}
                    >
                      {perm
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Final Save Button Section (Optional but usually needed) */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 px-2">
          <Button
            onClick={onClose}
            className="px-8 h-12 rounded-xl font-bold border-2 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="px-10 h-12 rounded-xl font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-100 border-0"
          >
            Save Permissions
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionModal;
