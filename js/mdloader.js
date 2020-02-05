const image_render = function (href, title, text) {
  const img = document.createElement('img');
  const param = location.href.split("#")[1].split("/")
  param.pop();
  img.src = param.join("/") + "/" + href;
  img.className = 'img-fluid'
  if (title) {
    img.title = title
  }
  if (text) {
    img.alt = text
  }
  return img.outerHTML
};

const link_render = function (href, title, text) {
  const anchor = document.createElement('a');
  if (href.match(/.md/i)) {
    anchor.href = '#' + href
    anchor.setAttribute("onclick", "md_loader('" + href + "')");
  } else {
    anchor.href = href;
  }
  if (title) {
    anchor.title = title
  }
  if (text) {
    anchor.textContent = text
  }
  return anchor.outerHTML
}

const table_render = function (header, body) {
  return '<table class="table table-bordered table-hover table-striped">' + '<thead>' + header + '</thead>' + body + '</table>';
}

const md_loader = function (uri) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', uri);
  xhr.addEventListener('loadend', function () {
    if (xhr.status === 200) {
      const renderer = new marked.Renderer()
      renderer.table = table_render,
      renderer.image = image_render
      renderer.image = image_render
      renderer.link = link_render
      marked.setOptions({
        renderer: renderer,
      });
      markdown_content.innerHTML = marked(xhr.response);
    } else {
      markdown_content.innerHTML = marked("Failed to load `" + md_uri + "`");
    };
  });
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  const mdurl = location.href.split("#")[1]
  const mdcontent = document.getElementById('markdown_content')
  if(mdurl){
    md_loader(mdurl);
  }else if(mdcontent){
    md_loader(mdcontent.getAttribute("src"));
  }
});