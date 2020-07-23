// Trigger function get Data on each keyup event in input
// document.getElementById('hero-name').onkeyup=getData;
const debounce = (func, delay) => {
    let inDebounce
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  }
document.getElementById('hero-name').addEventListener('keyup', debounce(getData, 300));
const loader = document.querySelector('.loader');
const noSuperHeroFound=document.querySelector('.no-super-hero-found');

//hero id
let heroId=0;
// function to get data
function getData(){

    var val = document.getElementById('hero-name').value;
    console.log("Value is  ", val=="");
   
    var list = document.getElementById('auto-complete');
    clearList();
  
    var xhrRequest = new XMLHttpRequest();
    // Handling http request
    xhrRequest.onload = function (){
        var result=JSON.parse(xhrRequest.response);
        // Getting all the available data
        console.log("results", result);
        var names =result.results;
        clearNoSuperHeroFound();
        if(names==null){

            clearList();
            if(val=="")
            {
                clearNoSuperHeroFound();   
            }
            else
            {
            noSuperHeroFoundede();
            }
            console.log('not found!')
        }else{
            for(var i of names){
                // creating individual list item and appending it
                console.log("In for loop",i.image.url);
                var li = document.createElement('li');
                // li.innerText=i.name;
                li.innerHTML = `
                <div class="search-container">
                <div class="search-left">
                  <img src=${i.image.url} alt="" />
                </div>
                <div class="search-right ">${i.name}</div>
            </div>  
                `;
                li.id=i.id;
                li.classList.add('list-group-item');
                li.addEventListener('click',function(){
                    console.log("this id", this.id);
                    heroId=this.id;
                    document.getElementById('hero-name').value=this.innerText;
                    showHero();
                    clearList();
                    // brings the focus to input
                   
                    document.getElementById('hero-name').focus();
                    return;
                })
                var ul = document.getElementById('auto-complete').appendChild(li);
            }

        }
        
        clearLoader();
    }
    // xmlRequest
    clearNoSuperHeroFound();
        showLoader()
    
    xhrRequest.open('get','https://www.superheroapi.com/api.php/3328323083897178/search/'+val);
    
    xhrRequest.send();

    
}
// handling enter key event

document.getElementById('hero-name').addEventListener('keydown',function(ev){

    if(ev.keyCode==13){

        if(heroId==0){
            alert('No hero found! Try selecting the hero from the list');
        }else{
        showHero();
        }
    }
});

// Function to clear the list items from list
function clearList(){
    var list = document.getElementById('auto-complete');
    console.log("No fo child nodes", list);
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild)
    }

    // heroId=null;
}
function noSuperHeroFoundede()
{
    noSuperHeroFound.style.display='block';

}
function clearNoSuperHeroFound()
{
    noSuperHeroFound.style.display='none';

}
// on clicking search button
document.getElementById('btn-search').addEventListener('click',showHero);
function showHero(){
    var name = document.getElementById('hero-name').value;
    if(name==""){
        alert("Enter the name to be searched");
    }else if(heroId==0){
        alert('No hero found! Try selecting the hero from the list');
    }else{

        console.log("heroId", heroId);
            window.open('superhero.html?id='+heroId,'_blank');
        
    }
    // console.log(hero);
}
function showLoader() {
    loader.style.display = 'block';
  }
      function clearLoader()
      {
        loader.style.display = 'none';
    
      }
// on clicking my favourite button
document.getElementById('btn-favourite').addEventListener('click',function(){
    window.location.assign('favourite.html');
})