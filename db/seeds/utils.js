const db = require("../connection")

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};


exports.checkArticleExists = (article_id) =>{

  return db.query("SELECT * FROM articles WHERE article_id = $1",[article_id])
  .then(({rows})=>{
    if(!rows.length){
      return Promise.reject({status:404, msg:"Not Found"})
    }
  })
}

exports.checkTopicExists = (topic)=>{
  return db.query("SELECT * FROM topics WHERE slug = $1;",[topic])
  .then(({rows})=>{

  if(!rows.length)
  {return Promise.reject({status:404, msg:"Not Found"})}
  })
}

exports.checkCommentExists = (comment)=>{
  return db.query("SELECT * FROM comments WHERE comment_id = $1;",[comment])
  .then(({rows})=>{

  if(!rows.length)
  {return Promise.reject({status:404, msg:"Not Found"})}
  })
}