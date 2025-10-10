class ApiFeatuers {
  constructor(query, queryString) {
    this.query = query; // mongoose query object ex-> Post.find()
    this.queryString = queryString; // from the request -> req.query
  }
  //127.0.0.1:8000/api/posts?tags=Node.js&likes[lte]=50
  filter() {
    let queryObj = {};
    const execludeFields = ['page', 'sort', 'limit', 'fields'];
    //workin with req.query (querystring) { "tags"="Node.js" , 'likes[lte]'=50}
    for (let key in this.queryString) {
      if (!execludeFields.includes(key)) {
        if (key.includes('[')) {
          const [field, operator] = key.replace(']', '').split('[');
          if (!queryObj[field]) queryObj[field] = {};
          queryObj[field][`$${operator}`] = this.queryString[key];
        } else {
          queryObj[key] = this.queryString[key];
        }
      }
    }
    for (let field in queryObj) {
      for (let op in queryObj[field]) {
        const value = queryObj[field][op];
        if (value === 'true') queryObj[field][op] = true;
        else if (value === 'false') queryObj[field][op] = false;
        else if (!isNaN(value)) queryObj[field][op] = Number(value);
      }
    }
    this.query = this.query.find(queryObj);
    return this;
  }
  //127.0.0.1:8000/api/posts?sort=-likes
  sort() {
    if (this.queryString.sort) {
      //req.query.sort
      //console.log(this.queryString);
      let sourtBy = this.queryString.sort.split(',').join(' ');
      //console.log(sourtBy);
      this.query = this.query.sort(sourtBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }
  //127.0.0.1:8000/api/posts?fields=title,likes,author
  limitFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  //127.0.0.1:8000/api/posts?page=2&limit=3
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatuers;
