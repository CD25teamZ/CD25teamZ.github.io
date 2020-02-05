document.addEventListener("DOMContentLoaded", function () {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', "./include/header.html");
  xhr.addEventListener('loadend', function() {
    if (xhr.status === 200) {
      const title_text = document.getElementsByTagName('title')[0].textContent
      header.innerHTML = xhr.response    
      jumbotron_title.getElementsByClassName('text-dark')[0].innerHTML =  title_text
      jumbotron_title.getElementsByTagName('a')[0].setAttribute('href',location.href.split("#")[0])
      Array.prototype.slice.call(document.querySelectorAll('.nav-item a'),0).forEach(function(navitem){
        if(navitem.textContent == title_text){
          navitem.classList.add('active')
        }
      })
    };
  });
  xhr.send();
});