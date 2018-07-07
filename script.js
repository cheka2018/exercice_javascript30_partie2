
/* cours n°11 : Vidéo HTML */

// declarer les variables 
var player = document.querySelector('.player');  
var video = player.querySelector('.viewer'); 
var progress = player.querySelector('.progress');  
var progressBar = player.querySelector('.progress__filled');  
var toggle = player.querySelector('.toggle');  
var skipButtons = player.querySelectorAll('[data-skip]');
var ranges = player.querySelectorAll('.player__slider');  

// brancher le bouton Lecture / Pause
function togglePlay() {  
  var method = video.paused ? 'play' : 'pause'
  video[method]()
   }
  video.addEventListener('click', togglePlay); 
  toggle.addEventListener('click', togglePlay);


// ajouter un visuel pour l'utilisateur avec l'icon 
function updatePlayButton() {  
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
     }
  video.addEventListener('play', updatePlayButton); 
  video.addEventListener('pause', updatePlayButton);   
// lecture rapide
function skip() {  
  video.currentTime += parseFloat(this.dataset.skip) // on a utilisé les attributs de donnée avec data-skip
     }
 skipButtons.forEach(button => button.addEventListener('click', skip));

//Commandes  du volume et de la lecture
function handleRangeUpdate() {  
  if (this.name === 'volume') {
    video.volume = this.value;
  }
  if (this.name === 'playbackRate') {
    video.playbackRate = this.value;
  }
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));  

//Barre de progression, on utilise pour ça, la properièté flex-basis de la bar de progression

function handleProgress() {  
  var percent = video.currentTime / video.duration * 100; // le pourcentage du taux de progression
  progressBar.style.flexBasis = `${percent}%`; 
  }
video.addEventListener('timeupdate', handleProgress); 

// Une fonction qui se mettent a l'endroit ou l'utilisateur click sur la barre de progression
function scrub(e) {  
  var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
progress.addEventListener('click', scrub);


/* Cours n°12 : Détection de séquence de clés (CODE KONAMI) */
var touche = [];
var secretCode = 'surprise';
window.addEventListener('keyup', (e) => {
  touche.push(e.key)
  touche.splice(-secretCode.lenght - 1, touche.lenght -secretCode.lenght);
  if(touche.join('').includes(secretCode)){
    cornify_add()
  };
})


/* cours n°13 : Scroll   */
 function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

var sliderImages = document.querySelectorAll('.slide-in');
function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
   var slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height /2;
   var imageBottom = sliderImage.offsetTop + sliderImage.height;
   var isHalfShown = slideInAt > sliderImage.offsetTop;
   var isNotScrolledPast = window.scrollY < imageBottom;

      if(isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active')
        } else {
          sliderImage.classList.remove('active')
            }
    });
}
window.addEventListener('scroll', debounce(checkSlide));


/* cours n°14 : Objet et arrays (copie ou réference )  */
    var players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    var team = players; // on déclare une variable qui as pour valeur players
       // les deux sont équivalent, ils ont les mêmes items
    team[3] = 'lux'; 
       //console.log(players, team); 
       //C'est parce que c'est une référence de tableau, pas une copie de tableau. Ils pointent tous deux vers le même tableau! pour avoir une copie il faut utiliser ES6 : var team = [...players] .
    var players = ['Wes', 'Sarah', 'Ryan', 'Poppy']; 
    var team = [...players] ; 
     //console.log(players, team); 
    team[3] = "Lux"  
     //console.log(players, team);
      // pour créer un nouveau tableau on a les trois possibilité suivantes, en plus de celle ES6 :
    var team2 = players.slice();
    //  créer un nouveau tableau et concaténer l'ancien:
    var team3  = [].concat(players);
    var team5 = Array.from(players); 
    /* avec les  Objects
    var person = {
      name: 'Mhand CHEKAOUI',
      age: 40
    };
    var moi = person;
     //console.log(person, moi); 
     moi.age = 30;
     moi.number = 99;
     //console.log(person, moi); 
    // on a le même problème avec les objets, "moi" est une réference pas une copie  */
    var person = {  
    name: 'Mhand ChEKAOUI',
    age: 40,
    }
    var me = Object.assign({}, person)  
    //console.log(person, me)  
    me.age = 30  
    //console.log(person, me) 


    /* cours n°15 : localStorage */
// on déclare les variables, avec la dernière variable qui retourne tableau vide ou un objet reformé par JSON.parse().
  var addItems = document.querySelector('.add-items');  
  var itemsList = document.querySelector('.plates'); 
  var items = JSON.parse(localStorage.getItem('items')) || [];  //  nous vérifions si nous pouvons récupérer le tableau de localStorage et si nous ne pouvons pas charger un tableau vide 
  function addItem(e) {
        e.preventDefault(); // Empêche la soumission de formulaire par défaut.
        var text = (this.querySelector('[name=item]')).value; // Récupère le texte que l'utilisateur a saisi.
        var item = { //Crée un objet en fonction de la soumission de l'utilisateur.
              text,
              done: false
              };

        items.push(item); //Poussez l'objet dans le tableau d'éléments.
        populateList(items, itemsList);
        localStorage.setItem('items', JSON.stringify(items)); // le localStorage est définie ici
        this.reset(); // Réinitialiser le formulaire
    }
    // Nous aurons alors besoin de créer la deuxième fonction appelée populateListqui 
    //gère l'affichage du itemstableau dans le document HTML. Nous passons cette fonction à deux arguments; 
    //le tableau d'objets que l'utilisateur a entré et l'élément HTML que nous voulons afficher dans la liste.
  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
   localStorage.removeItem('items'); 
  }

  function toggleDone(e) {
    if (!e.target.matches('input')) return;
    var el = e.target;
    var index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }
   var  deleteButton = document.querySelector('.delete')

function deleteHandler(e) {  
  localStorage.clear()
  localStorage.setItem('items', JSON.stringify(items))
  populateList([], itemsList)
}
var buttons = document.querySelectorAll('.button')

function handleButton(e) {  
  items.forEach(function(item, index, array) {
    e.target.name === 'checkAll'
      ? (items[index].done = true)
      : (items[index].done = false)
  })
  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone); // nous allons définir l'écouteur d'événement sur l' <ul class="plates">élément
  populateList(items, itemsList);  // nous sommes en mesure de définir la valeur par défaut lors du chargement de la page. Au bas de notre script, nous appelons:
  deleteButton.addEventListener('click', deleteHandler);
  buttons.forEach(button => button.addEventListener('click', handleButton))  



/* day 16 : effet sur la souris */
  var hero = document.querySelector('.hero');
  var text = hero.querySelector('h3');
  var movement = 50; // en px représente la distance de l'ombre 

      function shadow(e) {
        // il faut obtenir la largeur , et la hauteur de l'élément sur lequel on va appliquer nos mouvements
        var { offsetWidth : width, offsetHeight : height } = hero;
        let { offsetX: x, offsetY: y} = e; 
           if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
         }

      var xMovement = (x / width * movement) - (movement / 2)  
      var yMovement = (y / width * movement) - (movement / 2)

    text.style.textShadow = `  
        ${xMovement}px ${yMovement}px 0 rgba(255, 0, 255, 0.7),
        ${xMovement * -1}px ${yMovement}px 0 rgba(0, 255, 255, 0.7),
        ${xMovement}px ${yMovement * -1}px 0 rgba(0, 255, 0, 0.7),
        ${xMovement * -1}px ${yMovement * -1}px 0 rgba(0, 0, 255, 0.7)`
      }
    hero.addEventListener('mousemove', shadow);

/* day 17 : trier les bandes sans articles */
//  Nous trier cette liste de noms de groupes (moins les articles comme 'a' ou 'an' ou 'the'):
    var bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 
          'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

     function strip(bandname) {  
        return bandname.replace(/^(a |the |an)/i, '').trim()
           }        
    var sorteBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);  
      document.querySelector('#bands').innerHTML = sorteBands
                                                    .map(band => `<li>${band}</li>`)
                                                    .join('');

      
/* day 18 : calculer la durée total des vidéos */

     var timeNodes = [...document.querySelectorAll('[data-time]')];
     var seconds = timeNodes
                    .map(node => node.dataset.time)
                    .map(timeCode => {
                      var [mins, secs] = timeCode.split(':').map(parseFloat);
                      return (mins * 60) + secs 
                    })
                    .reduce((total, vidSeconds) => total + vidSeconds);
      let secondsLeft = seconds; 
      var hours = Math.floor(secondsLeft / 3600) ; 
      secondsLeft = secondsLeft % 3600; 
      var minutes = Math.floor(secondsLeft / 60);  
      secondsLeft = secondsLeft % 60;

   //console.log('Total Video Time: ' + hours + ':' + minutes + ':' + secondsLeft) ;



