export type MongoSort = [string, "asc" | "desc"][];

export function buildSortPipeline(sort: MongoSort = []) {
  if (sort.length === 0) return [];

  return [
    {
      $sort: sort.reduce(
        (acc, [field, order]) => ({ ...acc, [field]: order === "asc" ? 1 : -1 }),
        {},
      ),
    },
  ];
}
