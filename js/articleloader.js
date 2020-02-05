const article_loader = function (uri) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', uri);
  xhr.responseType = 'text'
  xhr.addEventListener('loadend', function () {
    if (xhr.status === 200) {
      const json_response = JSON.parse(xhr.response);
      const path = json_response.path
      const filename = json_response.filename

      Array.prototype.slice.call(json_response.application, 0).forEach(function (app) {
        const app_html = document.createElement('a');
        app_html.href = '#' + app.name + 'Collapse'
        app_html.className = 'col-md-4'
        app_html.setAttribute('data-toggle','collapse')
        app_html.setAttribute('role','button')
        app_html.setAttribute('aria-expanded','false')
        app_html.setAttribute('aria-controls',app.name + 'Collapse')
        articles_content.appendChild(app_html)

        const app_title_html = document.createElement('h1');
        app_title_html.id = app.name
        app_title_html.textContent = app.name
        app_html.appendChild(app_title_html)

        const app_articles_html = document.createElement('div');
        app_articles_html.className = 'collapse'
        app_articles_html.id = app.name + 'Collapse'
        articles_content.appendChild(app_articles_html)

        const app_articles_list_html = document.createElement('ul');
        app_articles_html.appendChild(app_articles_list_html)

        Array.prototype.slice.call(app.articles, 0).forEach(function (article) {
          const article_path = path + '/' +  app.name + '/' + article + '/' + filename

          const article_html = document.createElement('li');
          app_articles_list_html.appendChild(article_html)

          const article_anchor_html = document.createElement('a');
          article_anchor_html.href = '#' + article_path
          article_anchor_html.setAttribute('onclick','md_loader(\'' + article_path + '\')')
          article_anchor_html.textContent = article
          article_html.appendChild(article_anchor_html)
        })
      })
      articles_content.id = 'markdown_content'
    };
  });
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  article_loader('./json/articles.json')
});