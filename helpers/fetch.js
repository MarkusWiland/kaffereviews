export const getAllArticles = async () => {
  const res = await fetch(`/api/getArticles`);
  const articles = await res.json();
  return articles;
};

export const getArticle = async (id) => {
  const res = await fetch(`/api/getArticle?id=${id}`);
  const article = await res.json();
  return article;
};
