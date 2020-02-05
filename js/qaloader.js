function submitForm(formname) {
  document.getElementById('formWrapper').style.display = 'none';
  const inputBtn = document.querySelector('input.btn')
  const form = $('form[name='+formname+']');
  inputBtn.value = "送信中です しばらくお待ち下さい"
  inputBtn.disabled = "true"
  $.ajax({
    type: 'post',
    url: form.attr('action'),
    cache: false,
    data: form.serializeArray().concat({ name: 'entry.1756693142',value: window.navigator.userAgent }),
    success: function () {
      inputBtn.value = '回答ありがとうございました';
    },
    error: function () {
      inputBtn.value = '送信に失敗しました';
    }
  });
}

const generateUuid = function () {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

const qa_loader = function (uri) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', uri);
  xhr.responseType = 'text'
  xhr.addEventListener('loadend', function () {
    if (xhr.status === 200) {
      const json_response = JSON.parse(xhr.response);
      const question_html = document.getElementById('question')

      Array.prototype.slice.call(json_response.question,0).forEach(function(question){
        const root_card_html = document.createElement('div');
        question_html.appendChild(root_card_html)
        root_card_html.className = 'card bg-light mb-3'

        const root_cardbody_html = document.createElement('div');
        root_card_html.appendChild(root_cardbody_html)
        root_cardbody_html.className = 'card-body'

        const root_cardtitle_html = document.createElement('h5');
        root_cardbody_html.appendChild(root_cardtitle_html)
        root_cardtitle_html.className = 'card-title'
        root_cardtitle_html.textContent = question.title
        if (question.subtitle) {
          root_cardtitle_html.textContent += ' : ' + question.subtitle
        }

        Array.prototype.slice.call(question.choice,0).forEach(function(choice){
          const choice_id = generateUuid()
          const choice_html = document.createElement('div');
          choice_html.className = 'custom-control custom-' + question.type

          const input_html = document.createElement('input');
          input_html.type = question.type
          input_html.className = 'custom-control-input'
          input_html.id = choice_id
          input_html.name = 'entry.' + question.entry
          input_html.value = choice

          const label_html = document.createElement('label');
          label_html.className = 'custom-control-label'
          label_html.htmlFor = choice_id
          label_html.textContent = choice

          choice_html.appendChild(input_html)
          choice_html.appendChild(label_html)
          root_cardbody_html.appendChild(choice_html)
        })
      })

    };
  });
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  qa_loader('./json/qa.json')
});