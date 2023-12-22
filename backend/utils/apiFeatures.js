export class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log("Keyword", keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    console.log("queryCopy", queryCopy);

    const removeFields = ["keyword"];
    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    console.log("query str", queryStr);

    const filters = Object.entries(JSON.parse(queryStr)).reduce(
      (acc, [key, value]) => {
        if (key === "price") {
          const { $lt } = value;
          acc[key] = { $lt };
        } else {
          acc[key] = { $regex: value, $options: "i" };
        }
        return acc;
      },
      {}
    );

    this.query = this.query.find(filters);

    return this;
  }
}
