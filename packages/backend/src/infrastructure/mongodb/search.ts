export type MongoSearch = {
  fields: string[];
  regex: string;
  options?: string;
};

export function buildSearchCondition({ fields, regex, options = "i" }: MongoSearch) {
  return {
    $or: fields.map(field => ({ [field]: { $regex: regex, $options: options } })),
  };
}
