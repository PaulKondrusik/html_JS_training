/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function czyLiczba(doSprawdzenia)
{
    return !isNaN(doSprawdzenia);
}

function Clock(handler)  // funkcja konstruująca do zegara
{
    this.handler = handler;
    this.actualDate = new Date();
    this.start = function()
    {
        var self = this;
        setInterval(function(){self.updateHandler();}, 1000);
    };
   
    this.updateHandler = function()
    {
        this.actualDate = new Date(); //add 1 second
        this.handler.innerHTML = this.actualDate; //display updated value
    };
}

window.onload = function()
{
    // formularz, wpisz A wyswietli obrazek 
    
    var liczby = document.getElementById("formularz").liczby;
    var tekst = document.getElementById("formularz").tekst;
    var info1 = document.getElementById("info1");
    
    liczby.onkeyup = function(e)
    {
        var klawisz = info1.innerHTML = String.fromCharCode(e.which);
        
        if (!czyLiczba(this.value))
        {
            this.style.borderColor = "red";
            this.style.borderWidth = "3px";
        }
        else
        {
            this.style.borderColor = "green";
            this.style.borderWidth = "3px";
        }
        
        if (klawisz === "A") //wywalone narazie
            document.getElementById("fota1").style.display = "block";    
        else
            document.getElementById("fota1").style.display = "none";    
    }; 
    
    // checkboxy
    
    var imgArray = ['img/3562.jpg','img/3563.jpg', 'img/3564.jpg', 'img/3565.jpg', 'img/3566.jpg', 'img/3567.jpg'];
    var checkBoxy = document.getElementById("checkBoxy");
    var przycisk = document.getElementById("checkBoxy").przycisk;
    // var mainImg = document.getElementById("mainImg");
    var displayImage = document.getElementById("displayImage");
    
    przycisk.onclick = function(e)
    {
        while (displayImage.hasChildNodes()) 
        {
            displayImage.removeChild(displayImage.firstChild);
        };
        
        for (var i = 0; i < checkBoxy.fajneFoty.length; i++)
        {
            if (checkBoxy.fajneFoty[i].checked)
                showImg(i);   
        }
        e.preventDefault();
        
    };
 
    function showImg(index) 
    {
        let picture = new Image();
        
        picture.src = Array[index];
        
        displayImage.appendChild(picture);
        
        //mainImg.setAttribute("src",imgArray[index]);
        // document.images.style.display = "block";
    }



    // regulamin
    
    var regulamin = document.getElementById("regulamin");
    var RegAcc = document.getElementById("regulamin").RegAcc;
    
    for (var i = 0; i < regulamin.checkReg.length; i++)
    {
        regulamin.checkReg[i].onclick = function()
        {
            RegAcc.disabled = this.value === "true";
        };
    }
    
    // rozwijane menu
    
    var menu = document.getElementById("menu");
    var focia = document.getElementById("focia");
    
    menu.pics.onchange = function()
    {
        focia.setAttribute("src", this.value);
    };
    
    // czy haslo jest "mocne" - regexp
    
    var pass = document.getElementById("pass");
    var passButton = document.getElementById("passCheck").passButton;
    
    passButton.onclick = function(e)
    {
        e.preventDefault();
        var password = document.getElementById("passCheck").passwordSet.value;
        var regExpPattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{7,}/;
        
        if(regExpPattern.test(password))
            document.getElementById("passCheck").submit();
        else
            pass.innerHTML = "Hasło niepoprawne";
    };
    
    // zegar
    
    var clockInfo = document.getElementById("clockInfo");
    
    var clock = new Clock(clockInfo);
    
    clock.start();
    
    // losowe foty - wykorzystanie tablicy imgArray
    
    var randomize = document.getElementById("randomize");
    var randomPic = document.getElementById("randomPic");
    
    randomize.onclick = function(evt)
    {
        var randomNumber = Math.floor(Math.random()*5);
        randomPic.setAttribute("src",imgArray[randomNumber]);
        randomPic.style.display = "block";
        evt.preventDefault();
    };
    
    // slideshow co 1 sec, wykorzystuje tablice imgArray
   
    var slideShowCounter = 0;
    
    //metoda ze zmiana source w img
    /*
    var slideShow = document.getElementById("slideShow");
    
    setInterval(function()
    {
        slideShow.src = "356"+ ((slideShowCounter1 % imgArray.length)+2) +".jpg";
        slideShowCounter++;
    }, 1500);
    */
    // ladowanie obrazków i przejscie z animacja
    
    var slideShowDiv = document.getElementById("slideShowDiv");
    
    for(var j=0; j < imgArray.length; j++) //load all images
    {
        let slideImage = new Image();
        slideImage.src = imgArray[j];
        slideShowDiv.appendChild(slideImage);
    }
    slideShowDiv.childNodes[0].setAttribute("class","current"); // "current" will be displayed
    
    setInterval(function()
    {
        slideShowDiv.childNodes[slideShowCounter % imgArray.length].setAttribute("class","");
        slideShowDiv.childNodes[(slideShowCounter+1) % imgArray.length].setAttribute("class","current");
        slideShowCounter++;
    }, 4000);

    function makeAdder(x) {
            // parameter `x` is an inner variable

            // inner function `add()` uses `x`, so
            // it has a "closure" over it
            function add(y) {
                    return y + x;
                    
            };

            return add;
    };
    // `plusOne` gets a reference to the inner `add(..)`
    // function with closure over the `x` parameter of
    // the outer `makeAdder(..)`
    var plusOne = makeAdder( 1 );

    // `plusTen` gets a reference to the inner `add(..)`
    // function with closure over the `x` parameter of
    // the outer `makeAdder(..)`
    var plusTen = makeAdder( 10 );

    console.log(plusOne + 3);		// 4  <-- 1 + 3
    console.log(plusOne( 41 ));		// 42 <-- 1 + 41

    console.log(plusTen( 13 ));		// 23 <-- 10 + 13
};

$("document").ready(function()
{
   $("input[value='Losuj']").click(function(){
       alert("Czy na pewno tego chcesz ?");
   });
   $(":text").css("border", "2px solid black");
});


