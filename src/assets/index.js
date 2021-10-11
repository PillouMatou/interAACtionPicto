var tokens = [];
var text = "";
var languageSelect;
var sentenceInput;
var sentenceAlternative;
var textHighlights;
var inputSection;
var outputSection;
var meaningsList;
var highlitTokenCss;
var pictoGroups;
var pictoSentence;
var loadingIndicator;
var uploadButton;
var trash;
var textUpdated = true;
var selectedMeanings = [];
var openTokens = {};
var selectedLibrary;
var dragged;
var lang;
var mobile = false;
var urlImage = [];

var internationalization = {
  'fra': {
    'sentence-input.placeholder': 'Saisissez le texte ici',
    'upload-translation.innerText': 'Envoyer l\'annotation',
    'missing-placholder.innerText': 'Signaler',
    'missing-token.innerText': 'Mot non reconnu',
    'missing-meaning.innerText': 'Sens manquant',
    'missing-pictogram.innerText': 'Pictogramme manquant',
    'missing-expression.innerText': 'Expression non reconnue',
    '_missing-comment': 'Partie manquante: ',
    '_missing-thanks': 'Merci de votre aide !',
    '_network-error': 'Erreur liée au réseau'
  },
  'eng': {
    'sentence-input.placeholder': 'Enter text here',
    'upload-translation.innerText': 'Upload translation',
    'missing-placholder.innerText': 'Report',
    'missing-token.innerText': 'Unknown word',
    'missing-meaning.innerText': 'Missing meaning',
    'missing-pictogram.innerText': 'Missing pictogram',
    'missing-expression.innerText': 'Unknown expression',
    '_missing-comment': 'Missing part: ',
    '_missing-thanks': 'Thanks for your help!',
    '_network-error': 'Network error'
  }
};

function onBodyLoad() {
  languageSelect = document.getElementById('language-select');
  sentenceInput = document.getElementById('sentence-input');
  textHighlights = document.getElementById('text-highlights');
  meaningsList = document.getElementById('meanings-list');
  highlitTokenCss = document.getElementById('highlit-token-css');
  pictoGroups = document.getElementById('picto-groups');
  pictoSentence = document.getElementById('picto-sentence');
  loadingIndicator = document.getElementById('loading-indicator');
  uploadButton = document.getElementById('upload-translation');
  sentenceAlternative = document.getElementById('sentence-alternative');
  let mobileSwitchViewButton = document.getElementById('mobile-switch-view');
  let missingEntitySelect = document.getElementById('missing-entity');

  let param = window.location.search.substring(1);
  if (param.length) {
    try {
      let [language, sentence] = param.split(':');
      languageSelect.value = language;
      sentenceInput.value = atob(sentence);
    } catch (e) {
      // fail silently
    }
  }

  missingEntitySelect.value = 'none';
  trash = document.getElementById('trash');
  setInterval(monitorInput, 500);
  sentenceInput.addEventListener('keydown', notifyTextUpdate);
  languageSelect.addEventListener('change', changeLanguage);
  missingEntitySelect.addEventListener('change', reportMissingEntity);
  pictoSentence.addEventListener('dragover', allowDrag);
  pictoSentence.addEventListener('drop', pictoSentenceDrop);
  trash.addEventListener('dragover', allowDrag);
  trash.addEventListener('click', trashClick);
  trash.addEventListener('drop', trashDrop);
  uploadButton.addEventListener('click', uploadTranslation);
  pictoSentence.addEventListener('wheel', scrollHorizontally);
  mobileSwitchViewButton.addEventListener('click', mobileSwitchView);
  document.documentElement.addEventListener('mousemove', highlightToken);
  changeLanguage();
}

// tell the user there has been a problem
function networkError() {
  alert(internationalization[lang]['_network-error']);
}

// callback of the "Mode 🗘" button visible on mobile clients
// we detect mobile clients when they press this button,
// because they are required to press it at least once before
// they can assemble pictograms
function mobileSwitchView() {
  mobile = true;
  document.body.classList.toggle('m-view-sentence');
}

// callback of the "Report" buttons
function reportMissingEntity(e) {
  if (e.target.value == 'none') return;
  let p = internationalization[lang]['_missing-comment'];
  let comment = prompt(p); // the user can cancel here
  if (comment !== null) {
    setVisibility(loadingIndicator, true);
    this.report(e.target.value, lang, text, comment, issueReported);
  }
  e.target.value = 'none';
}

// network callback (user report uploaded)
function issueReported(e) {
  if (e === undefined) return networkError();
  setVisibility(loadingIndicator, false);
  alert(internationalization[lang]['_missing-thanks']);
}

// utility function to control elements visibility
function setVisibility(e, shown) {
  if (shown) e.classList.add('shown');
  else e.classList.remove('shown');
}

// called when the user selects an option in the language menu
function changeLanguage() {
  lang = languageSelect.value;
  let texts = internationalization[lang];
  for (let i in texts) {
    if (i.startsWith('_')) continue;
    let id_and_prop = i.split('.');
    document.getElementById(id_and_prop[0])[id_and_prop[1]] = texts[i];
  }
  textUpdated = true;
}

// called on user keypress in the text field
function notifyTextUpdate(e) {
  textHighlights.textContent = "";
  textUpdated = true;
}

// called when user moves the mouse cursor
// highlights related UI parts
function highlightToken(e) {
  let target = e.target;
  if (target && target.classList.contains('token')) {
    let selectors = [];
    let classes = Array.from(target.classList);
    for (let i in classes) {
      let parts = classes[i].split('-');
      if (parts.length != 2) continue;
      selectors.push('.token-' + parts[1]);
    }
    let css = selectors.join(', ') + ' { background-color: teal !important; }';
    highlitTokenCss.textContent = css;
  } else {
    highlitTokenCss.textContent = '';
  }
}

// called every 500ms
// this function sends the text field's content to the API
// for tokenization, as a first step of the translation process
function monitorInput(textInput) {
  lang = 'fra';
  if (!textUpdated) return;
  let currentText = textInput;

  sentenceInput = currentText;

  // setVisibility(loadingIndicator, true);
  this.tokenize(currentText, lang, tokenized);
}

// called on api response with tokenization results
function tokenized(result) {
  // setVisibility(loadingIndicator, false);
  if (result === undefined) return networkError();
  tokens = result.tokens;
  // textHighlights.textContent = "";
  // meaningsList.textContent = "";
  // let len = selectedMeanings.length;
  // selectedMeanings.length = tokens.length;
  // selectedMeanings.fill(0, len);
  let lastStop = 0;
  for (let t in tokens) {
    let meaning = tokens[t];
    let before = text.slice(lastStop, meaning.start);
    let token = text.slice(meaning.start, meaning.stop);
    tokens[t].text = token;
    lastStop = meaning.stop;
    addSentencePart(before, -1);
    addSentencePart(token, t);
    if (selectedMeanings[t] >= meaning.synsets.length) {
      selectedMeanings[t] = 0;
    }
    addTokenMeanings(token, t, result.definitions);
    // don't care about the last part because it would be invisible.
  }
  refreshPictograms();
}

// adds a token or unrecognized text to the background of the sentence
// input; this is what makes the meanings visual ('teal' background color)
function addSentencePart(text, tokenIndex) {
  let partElement;
  if (tokenIndex != -1) {
    partElement = document.createElement('u');
    partElement.classList.add('token');
    partElement.classList.add('token-' + tokenIndex.toString());
    partElement.innerText = text;
  } else {
    partElement = document.createTextNode(text);
  }
  // textHighlights.appendChild(partElement);
}

// adds a new meaning to the meanings list, containing the relevant token
// and its potential meanings
function addTokenMeanings(tokenText, tokenIndex, definitions) {
  let token = tokens[tokenIndex];
  let name = 'token-' + tokenIndex.toString();
  let details = document.createElement('details');
  let summary = document.createElement('summary');
  details.appendChild(summary);
  for (let s in token.synsets) {
    let synset = token.synsets[s];
    let id = name + '-' + s.toString();
    let input = document.createElement('input');
    let label = document.createElement('label');
    let content = document.createTextNode(definitions[synset]);
    input.type = 'radio';
    input.name = name;
    input.classList.add('token-input');
    input.addEventListener('click', onMeaningSelection);
    input.id = id;
    input.checked = s == selectedMeanings[tokenIndex];
    label.htmlFor = id;
    label.appendChild(input);
    label.appendChild(content);
    details.appendChild(label);
  }
  summary.innerText = tokenText + ' (' + token.synsets.length + ')';
  summary.classList.add('token');
  summary.classList.add(name);
  details.classList.add(name);
  details.id = name + '-meanings';
  let open = openTokens[details.id];
  details.open = open ? open : false;
  summary.addEventListener('click', onToggleMeaning);
  // meaningsList.appendChild(details);
}

// saving UI state (open meanings)
function onToggleMeaning(e) {
  let details = e.target.parentElement;
  openTokens[details.id] ^= true;
}

// called when a meaning is selected, pictograms
// get refreshed to match the selected meanings
function onMeaningSelection(e) {
  let id = e.target.id.split('-');
  let t = parseInt(id[1]);
  let s = parseInt(id[2]);
  selectedMeanings[t] = s;
  refreshPictograms();
}

// called when the pictogram list needs to be refreshed,
// either on user input or when meanings were received.
function refreshPictograms() {
  // let checkedMeanings = document.querySelectorAll('.token-input:checked');
  let synsets = tokens.map((token, t) => {
    let s = selectedMeanings[t];
    return token.synsets[0];
  });
  /* pictoGroups.textContent = '';
  let exprList = document.createElement('div');
  exprList.classList.add('b-right');
  exprList.classList.add('mb-bottom');
  pictoGroups.appendChild(exprList);
   */
  if (synsets.length > 0) {
    // setVisibility(loadingIndicator, true);
    this.pictograms(synsets, pictogramsReceived);
  }
}

// used by pictogramsReceived to sort pictograms by relevance,
// taking the current list of meanings into account.
function relevanceComparator(a, b) {
  return b[0] - a[0];
}

// called when the API has found relevant pictograms
// for the selected meanings. This function will organize
// pictograms in "libraries".
function pictogramsReceived(pictograms) {
  // setVisibility(loadingIndicator, false);
  if (pictograms === undefined) return networkError();
  let expressions = {};
  for (let p in pictograms) {
    let pictoData = pictograms[p];
    let count = pictoData.shift();
    let matches = pictoData.length;
    let relevance = matches / count;
    let indexes = pictoData.map(synsetIndex => synsetIndex.toString());
    indexes.sort();
    let key = indexes.join('-');
    if (key in expressions) expressions[key].push([relevance, p]);
    else expressions[key] = [[relevance, p]];
  }
  // let exprList = pictoGroups.children[0];
  if (selectedLibrary === undefined || expressions[selectedLibrary] === undefined) {
    selectedLibrary = Object.keys(expressions)[0];
  }
  for (key in expressions) {
    let pictograms = expressions[key];
    pictograms.sort(relevanceComparator);
    let indexes = key.split('-');
    let text = indexes.map(i => tokens[parseInt(i)].text);
    let button = document.createElement('button');
    button.innerText = text.join(', ') + ' (' + pictograms.length + ')';
    button.id = 'group-' + key;
    button.addEventListener('click', selectPictoGroup);
    button.classList.add('token');
    button.classList.add('mb-right');
    for (let i in indexes) {
      button.classList.add('token-' + indexes[i]);
    }
    // exprList.appendChild(button);

    let library = document.createElement('div');
    library.id = 'library-' + key;
    library.classList.add('picto-library');
    if (key === selectedLibrary) {
      library.classList.add('selected-library');
      button.classList.add('selected-group');
    }
    library.addEventListener('wheel', scrollHorizontally);
    // pictoGroups.appendChild(library);
    for (let p in pictograms) {
      let url = 'http://localhost:4201/' + pictograms[p][1];
      let picto = document.createElement('img');
      picto.src = url;
      picto.draggable = true;
      picto.dataset.key = key;
      picto.dataset.url = url;
      urlImage.push(url);
      console.log('fin d"url picto :',url);
      picto.addEventListener('dragstart', pictoDragStart);
      picto.addEventListener('click', pictoClick);
      library.appendChild(picto);
    }
  }
}

function getUrlPicto(){
  return urlImage;
}

// on library pictogram click, add the pictogram to the
// pictogram sentence
function pictoClick(e) {
  let copy = e.target.cloneNode();
  addSentenceEvents(copy);
  pictoSentence.appendChild(copy);
  refreshUploadButton();
}

// on sentence pictogram click, remove the pictogram from
// the pictogram sentence
function pictoDelete(e) {
  e.target.remove();
  refreshUploadButton();
}

// remember from which pictogram the drag was originated
function pictoDragStart(e) {
  dragged = e.target;
}

// add various drag event callbacks to a pictogram
// (called indirectly when a pictogram is inserted in
// the pictogram sentence)
function addSentenceEvents(picto) {
  picto.removeEventListener('click', pictoClick);
  picto.addEventListener('click', pictoDelete);
  picto.addEventListener('dragstart', pictoDragStart);
  picto.addEventListener('dragover', allowDrag);
  picto.addEventListener('drop', dropOnPicto);
}

// when the user drops a pictogram on the pictogram sentence
function pictoSentenceDrop(e) {
  e.preventDefault();
  if (dragged !== undefined) {
    moveToPicto(null);
  }
}

// when the user drops a pictogram on another pictogram,
// which is also in the pictogram sentence
function dropOnPicto(e) {
  e.preventDefault();
  moveToPicto(e.target);
  dragged = undefined;
}

// when the user drops a pictogram on the trashcan
function trashDrop(e) {
  e.preventDefault();
  if (dragged.parentElement == pictoSentence) {
    dragged.remove();
    dragged = undefined;
  }
  refreshUploadButton();
}

// when the trashcan is clicked, empty the pictogram sentence
function trashClick(e) {
  pictoSentence.textContent = '';
  refreshUploadButton();
}

// utility function to move the dragged pictogram somewhere in
// the pictogram sentence
function moveToPicto(picto) {
  if (dragged.parentElement != pictoSentence) {
    dragged = dragged.cloneNode();
    addSentenceEvents(dragged);
  } else {
    if (picto) {
      let nodes = pictoSentence.children;
      let i = Array.prototype.indexOf.call(nodes, dragged);
      let j = Array.prototype.indexOf.call(nodes, picto);
      if (i < j) picto = picto.nextElementSibling;
    }
  }
  pictoSentence.insertBefore(dragged, picto);
  refreshUploadButton();
}

// tell the browser this element accepts drag from everything
function allowDrag(e) {
  e.preventDefault();
}

// refresh the upload button's availability: if the pictogram
// sentence is empty, it should not be available.
function refreshUploadButton() {
  let shown = pictoSentence.childElementCount != 0;
  setVisibility(uploadButton, shown);
}

// allows the user to scroll horizontally in pictogram libraries
function scrollHorizontally(e) {
  let element = e.target;
  while (!element.classList.contains('picto-library')) {
    element = element.parentElement;
  }
  element.scrollLeft += e.deltaY * 5;
}

// toggle libraries and buttons visibility (see next function)
function switchSelected(newSelected, className) {
  let current = document.querySelector('.' + className);
  current.classList.remove(className);
  newSelected.classList.add(className);
}

// switch from one visible pictogram library to another,
// using the buttons located to the center/left
function selectPictoGroup(e) {
  let ps = 'selected-library';
  let group = e.target.id;
  selectedLibrary = group.split('-')[1];
  let library = group.replace('group', 'library');
  current = document.getElementById(library);
  switchSelected(current, ps);
  switchSelected(e.target, 'selected-group');
}

// callback of the "Upload translation" button: upload
// the translation using the API.
function uploadTranslation(e) {
  let images = Array.from(pictoSentence.children);
  let pictograms = images.map(img => [img.dataset.key.split('-').map(key => {
    let i = parseInt(key);
    return tokens[i].synsets[selectedMeanings[i]];
  }).join('-'), img.dataset.url]);
  setVisibility(loadingIndicator, true);
  let alt = sentenceAlternative.value;
  this.feed(mobile, lang, text, alt, pictograms, translationUploaded);
}

// network callback on API response from translation upload requests.
function translationUploaded(e) {
  setVisibility(loadingIndicator, false);
  if (e === undefined) return networkError();
  alert(internationalization[lang]['_missing-thanks']);
}

function _phoneHome(path, callback, error) {
  if (error === undefined) error = callback;
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', (e) => {
    let xhr = e.target;
    if (xhr.status == 200) callback(xhr.response);
    else error(undefined, xhr.response);
  });
  console.log('url :', 'http://localhost:4201/' +path.join('/'));
  xhr.open('GET', 'http://localhost:4201/' + path.join('/'));
  xhr.send();
}

function _encode(text) {
  return encodeURIComponent(text);
}

// PUBLIC ENDPOINTS
function tokenize(sentence, language, callback, error) {
  let path = ['t2s', language, this._encode(sentence)];
  this._phoneHome(path, callback, error);
}

function pictograms(synsets, callback, error) {
  let path = ['s2p', synsets.map(encodeURIComponent).join('+')];
  this._phoneHome(path, callback, error);
}

// DIRECT DATA SEARCH
function findWordVariation(word, language, callback, error) {
  let path = ['find-word-variation', language, this._encode(word)];
  this._phoneHome(path, callback, error);
}

function findWordMeanings(word, language, callback, error) {
  let path = ['find-word-meanings', language, this._encode(word)];
  this._phoneHome(path, callback, error);
}

function findMeaningDefinition(word, language, callback, error) {
  let path = ['find-meaning-definition', language, this._encode(word)];
  this._phoneHome(path, callback, error);
}

// DIRECT DATA ACCESS
function wordsVariations(start, length, language, callback, error) {
  let path = ['words-variations', language, start, length];
  this._phoneHome(path, callback, error);
}

function wordsMeanings(start, length, language, callback, error) {
  let path = ['words-meanings', language, start, length];
  this._phoneHome(path, callback, error);
}

function meaningsDefinitions(start, length, language, callback, error) {
  let path = ['meanings-definitions', language, start, length];
  this._phoneHome(path, callback, error);
}

function stopList(language, callback, error) {
  let path = ['stop-list', language];
  this._phoneHome(path, callback, error);
}

// AUTHENTICATED ENDPOINTS
function feed(mobile, language, sentence, alt, pictograms, callback, error) {
  let data = {mobile, language, sentence, alt, pictograms};
  let path = ['feed', 'anonymous', this._encode(JSON.stringify(data))];
  this._phoneHome(path, callback, error);
}

function report(issue, language, sentence, comment, callback, error) {
  let data = {issue, language, sentence, comment};
  let path = ['issue', 'anonymous', this._encode(JSON.stringify(data))];
  this._phoneHome(path, callback, error);
}

// ADMIN ENDPOINTS
function summary(callback, error) {
  let path = ['summary'];
  this._phoneHome(path, callback, error);
}

// set
function setWordVariation(variant, canonical, language, callback, error) {
  let [key, value] = [this._encode(variant), this._encode(canonical)];
  let path = ['set-word-variation', language, key, value];
  this._phoneHome(path, callback, error);
}

function setWordMeanings(word, synsets, language, callback, error) {
  let [key, value] = [this._encode(word), this._encode(synsets.join('+'))];
  let path = ['set-word-synsets', language, key, value];
  this._phoneHome(path, callback, error);
}

function setMeaningDefinition(synset, definition, language, callback, error) {
  let [key, value] = [this._encode(synset), this._encode(definition)];
  let path = ['set-synset-definition', language, key, value];
  this._phoneHome(path, callback, error);
}

function addStopWord(word, language, callback, error) {
  let path = ['add-stop-word', language, this._encode(word)];
  this._phoneHome(path, callback, error);
}

// del
function delWordVariation(variant, language, callback, error) {
  let path = ['del-word-variation', language, this._encode(variant)];
  this._phoneHome(path, callback, error);
}

function delWordMeanings(word, language, callback, error) {
  let path = ['del-word-synsets', language, this._encode(word)];
  this._phoneHome(path, callback, error);
}

function delMeaningDefinition(synset, language, callback, error) {
  let path = ['del-synset-definition', language, this._encode(synset)];
  this._phoneHome(path, callback, error);
}

function remStopWord(word, language, callback, error) {
  let path = ['rem-stop-word', language, this._encode(word)];
  this._phoneHome(path, callback, error);
}

// SESSIONS
function currentSessionId(callback, error) {
  let path = ['current-session-id'];
  this._phoneHome(path, callback, error);
}

// contributions
function uploads(sessionId, callback, error) {
  let path = ['storage', sessionId];
  this._phoneHome(path, callback, error);
}

function issues(sessionId, callback, error) {
  let path = ['issues', sessionId];
  this._phoneHome(path, callback, error);
}

function updates(sessionId, callback, error) {
  let path = ['updates', sessionId];
  this._phoneHome(path, callback, error);
}

function revokeUpload(sessionId, timestamp, user, callback, error) {
  let path = ['revoke-storage', sessionId, timestamp, user];
  this._phoneHome(path, callback, error);
}

function revokeUpdate(sessionId, timestamp, user, callback, error) {
  let path = ['revoke-update', sessionId, timestamp, user];
  this._phoneHome(path, callback, error);
}

function revokeIssue(sessionId, timestamp, user, callback, error) {
  let path = ['revoke-issue', sessionId, timestamp, user];
  this._phoneHome(path, callback, error);
}
