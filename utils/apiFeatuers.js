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
}
module.exports = ApiFeatuers;
