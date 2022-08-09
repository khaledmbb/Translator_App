const languages = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
}

const select = document.querySelectorAll('select')
let textFrom = document.querySelector('.from-text')
const button = document.querySelector('button')
let outputText = document.querySelector('.to-text')
let error = document.querySelector('.error p')
const copy_1 = document.getElementById('copy1')
const copy_2 = document.getElementById('copy2')
const sound_2 = document.getElementById('sound2')
const sound_1 = document.getElementById('sound1')
const changeTrans = document.querySelector('.exchange')

function setLanguages(langs) {
  select.forEach((el, index) => {

    for (const keyLang in langs) {
      let selected
      let option = document.createElement('option')

      if (index == 0 && keyLang === 'en-GB') {
        selected = 'selected'
      } else if (index == 1 && keyLang === 'ar-SA') {
        selected = 'selected'
      }

      option.value = keyLang;
      option.selected = selected
      option.innerHTML = langs[keyLang]
      el.append(option)
    }
  })
}

setLanguages(languages)

button.addEventListener('click', () => {
  let currentLang = select[0].options[select[0].selectedIndex].value
  let willTransLang = select[1].options[select[1].selectedIndex].value
  let text = textFrom.value.trim()
  outputText.value = ''
  outputText.placeholder = 'Translating...'

  fetchTrans(text, currentLang, willTransLang)
})

function fetchTrans(text, currLang, wTLang) {

  fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${currLang}|${wTLang}`)
    .then(response => response.json())
    .then(response => {
      error.innerHTML = ''
      writeText(response)
    })
    .catch(err => {
      outputText.placeholder = 'Translation'
      error.innerHTML = "Please Try Again!!"
    })
}

function writeText(res) {
  if (res.responseStatus == 200) {
    error.innerHTML = ''
    outputText.value = res.responseData.translatedText
  } else {
    error.innerHTML = 'Please Enter Something!!'
  }
}

textFrom.addEventListener('input', (e) => {
  if (e.target.value == '') {
    outputText.value = ''
    outputText.placeholder = 'Translation'
    error
  }
})

copy_1.addEventListener('click', () => {
  textFrom.select()
  navigator.clipboard.writeText(textFrom.value)
})
copy_2.addEventListener('click', () => {
  outputText.select()
  navigator.clipboard.writeText(outputText.value)
})

changeTrans.addEventListener('click', () => {
  if (outputText.value === '' && textFrom.value !== '') {
    error.innerHTML = 'Please Click Translate And Then Switch Language'
  } else {
    error.innerHTML = ''
    let fromLang = select[0].value,
      fromLangTxt = select[0].options[select[0].selectedIndex],
      fromTxt = textFrom.value

    select[0].value = select[1].value
    select[0].options[select[0].selectedIndex].innerText = select[1].options[select[1].selectedIndex].innerText
    textFrom.value = outputText.value

    select[1].value = fromLang
    select[1].options[select[1].selectedIndex].innerText = fromLangTxt.innerText
    outputText.value = fromTxt
  }
})

sound_1.addEventListener('click', () => {

  if (textFrom.value === '') {
    let txtToSpeech = new SpeechSynthesisUtterance('There Is No thing To Say Just Go Away')
    txtToSpeech.lang = select[0].value
    speechSynthesis.speak(txtToSpeech)
    error.innerHTML = 'There Is No Thing To Say!!, Please Type Something'
  } else {
    let txtToSpeech = new SpeechSynthesisUtterance(textFrom.value)
    txtToSpeech.lang = select[0].value
    speechSynthesis.speak(txtToSpeech)
    error.innerHTML = ''
  }

})

sound_2.addEventListener('click', () => {
  if (outputText.value === '') {
    let txtToSpeech = new SpeechSynthesisUtterance('There Is No thing To Say Just Go Away')
    txtToSpeech.lang = select[1].value
    speechSynthesis.speak(txtToSpeech)
    error.innerHTML = 'There Is No Thing To Say!!, Please Type Something'
  } else {
    let txtToSpeech = new SpeechSynthesisUtterance(outputText.value)
    txtToSpeech.lang = select[1].value
    speechSynthesis.speak(txtToSpeech)
    error.innerHTML = ''
  }
})