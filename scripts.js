async function getArticles() {
  // If html file is running with localserver use url as articles.json
  // let url = 'articles.json';
  let url = 'https://run.mocky.io/v3/82844fb8-9913-40eb-a128-745a31bb14f2';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderArticles() {
  let [heroArticle, mainArticle, ...subArticles] = await getArticles();

  // hero Article

  let heroArticleHtml = `<div class="hero-image" style="background-image: url(${heroArticle.image_url})"></div>
                        <h1 class="headline highlight"><span class="bullet">+&nbsp;</span>${heroArticle.headline}</h1>
                        <p><span class="title">${heroArticle.title}</span> ${heroArticle.description}</p>
                        <div class="comments">
                          <i class="fa-regular fa-clock"></i><label>2m</label>
                          <i class="fa-regular fa-message"></i>
                        </div>`
  let heroSection = document.querySelector('.hero-article');
  heroSection.innerHTML = heroArticleHtml;

  // sub Article
  let subArticleHtml = `<div class="main-image" style="background-image: url(${mainArticle.image_url})"></div>
                        <h2 class="headline"><span class="bullet">+&nbsp;</span>${mainArticle.headline}</h2>
                        <p><span class="title blue">${mainArticle.title}</span>${mainArticle.description}</p>
                        <div class="comments">
                          <i class="fa-regular fa-clock"></i><label>&nbsp;1hr</label>
                          <i class="fa-regular fa-message"></i>
                        </div>`

  let subArticleSection = document.querySelector('.featured');
  subArticleSection.innerHTML = subArticleHtml;

  // Articles List
  let subArticlesHtml = '';
  subArticles.forEach(article => {
    let subArticleHtml = `<div class="list grey-border pos-relative">
                            <h3 class="folded"><span class="bullet">+&nbsp;</span>${article.headline}</h3>
                          <div class="suggestion-image" style="background-image: url(${mainArticle.image_url})"></div>
                          <div class="comments">
                            <i class="fa-regular fa-clock"></i><label>&nbsp;1hr</label>
                          </div>
                          </div>`;

    subArticlesHtml += subArticleHtml;
  });

  let lists = document.querySelector('.lists');
  lists.innerHTML = subArticlesHtml;
}

renderArticles();
