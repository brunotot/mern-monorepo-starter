import { useLocalStorage } from "react-use";

export type SizePreference = "small" | "medium";

const TABLE_SIZE_PREFERENCE_STORAGE_KEY = "tableSize";
const DEFAULT_TABLE_SIZE_PREFERENCE_VALUE = "small";

export default function useSizePreference() {
  return useLocalStorage<SizePreference>(
    TABLE_SIZE_PREFERENCE_STORAGE_KEY,
    DEFAULT_TABLE_SIZE_PREFERENCE_VALUE,
  );
}
