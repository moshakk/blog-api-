class ApiFeatuers {
  constructor(query, queryString) {
    this.query = query; // mongoose query object ex-> Post.find()
    this.queryString = queryString; // from the request -> req.query
  }
  //127.0.0.1:8000/api/posts?tags=Node.js&likes[lte]=50
  filter() {
    const queryObj = { ...this.queryString }; // { tags: 'Node.js', 'likes[gte]': '30' }
    //console.log(queryObj);
    const excludedField = ['page', 'sort', 'limit', 'fields']; // fileds not required with filtering
    excludedField.forEach((el) => delete queryObj[el]); //{ tags: 'Node.js', 'likes[gte]': '30' }
    let queryStr = JSON.stringify(queryObj); //{"tags":"Node.js","likes[gte]":"30"}
    console.log(queryStr);

    return this; // {"tags":"Node.js","likes":{"$lte":"50"}}
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
