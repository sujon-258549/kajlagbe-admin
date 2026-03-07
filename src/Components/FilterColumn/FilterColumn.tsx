import { ColumnHeightOutlined, DownOutlined } from "@ant-design/icons";
import { Card, Dropdown } from "antd";
import { useEffect, useState } from "react";
import CustomCheckbox from "../ui/Checkbox";
import Button from "../ui/Button";

interface Column {
  key: string;
  title: string;
}

interface ColumnFilterProps {
  tableName: string;
  columns: Column[];
  onChangeSelectedKeys?: (keys: string[]) => void;
}

const FilterColumn: React.FC<ColumnFilterProps> = ({
  tableName,
  columns,
  onChangeSelectedKeys,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Initialize selected columns from localStorage or default to all columns
  useEffect(() => {
    if (!columns?.length) return;

    const saved = localStorage.getItem(`table_columns_${tableName}`);
    let finalKeys: string[] = [];

    if (saved) {
      const savedKeys: string[] = JSON.parse(saved);
      const validKeys = savedKeys.filter((key) =>
        columns.some((col) => col.key === key),
      );
      finalKeys = validKeys.length ? validKeys : columns.map((col) => col.key);

      if (validKeys.length !== savedKeys.length) {
        localStorage.setItem(
          `table_columns_${tableName}`,
          JSON.stringify(finalKeys),
        );
      }
    } else {
      finalKeys = columns.map((col) => col.key);
      localStorage.setItem(
        `table_columns_${tableName}`,
        JSON.stringify(finalKeys),
      );
    }

    // Only update state if different
    setSelectedKeys((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(finalKeys)) {
        onChangeSelectedKeys?.(finalKeys);
        return finalKeys;
      }
      return prev;
    });

    // Run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (keys: string[]) => {
    setSelectedKeys(keys);
    onChangeSelectedKeys?.(keys);
    localStorage.setItem(`table_columns_${tableName}`, JSON.stringify(keys));
  };

  const columnMenu = (
    <Card className="p-4 w-56">
      <div className="flex flex-col gap-2">
        {/* Select All */}
        <CustomCheckbox
          checked={selectedKeys.length === columns.length}
          indeterminate={
            selectedKeys.length > 0 && selectedKeys.length < columns.length
          }
          onChange={(e) =>
            handleChange(e.target.checked ? columns.map((col) => col.key) : [])
          }
        >
          Select All
        </CustomCheckbox>

        {/* Individual columns */}
        {columns.map((col) => (
          <CustomCheckbox
            key={col.key}
            checked={selectedKeys.includes(col.key)}
            onChange={(e) =>
              handleChange(
                e.target.checked
                  ? [...selectedKeys, col.key]
                  : selectedKeys.filter((k) => k !== col.key),
              )
            }
          >
            {col.title}
          </CustomCheckbox>
        ))}
      </div>
    </Card>
  );

  return (
    <Dropdown dropdownRender={() => columnMenu} trigger={["click"]}>
      <Button icon={<ColumnHeightOutlined />} type="default">
        Filter Columns <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterColumn;
