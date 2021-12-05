$(function(){
    let windowHeight   = $(window).height(),
        upperNavHeight = $(".upper-navbar").innerHeight(),
        mainNavHeight  = $(".navbar").innerHeight(),
        sliderHeight   = windowHeight - (upperNavHeight + mainNavHeight); 
        
    $(".slider,.carousel-item").height(sliderHeight);



    //shuffle images
    // $('.featured-work ul li').on('click',function(){
    //     $(this).addClass('active').siblings().removeClass('active');
    //     var ListItemClicked = $(this).data('class');
        
    //     if(ListItemClicked === 'all'){
    //         $('.sheffle-image .row .col-md').css('opacity',1);
    //     }else{
    //         $('.sheffle-image .row .col-md').css('opacity',0.06);
    //         $(ListItemClicked).parent().css('opacity',1)
    //     }
    // });
});

//suffle image using Pure Js
let allListItems = document.querySelectorAll(".featured-work ul li");


for(index in allListItems){
    allListItems[index].onclick = function(){
        //note in pure js thre are not function equivalent to siblings() jquery func
        let previousActiveListItem = document.querySelector(".featured-work ul .active");
        previousActiveListItem.classList.remove('active');
        this.classList.add("active");

        let ListItemClicked = this.getAttribute("data-class");
        let allColMdDiv = document.querySelectorAll(".sheffle-image .row .col-md");
        
        if(ListItemClicked === "all"){
            for(let i = 0; i < allColMdDiv.length;i++)
            {
                allColMdDiv[i].style.opacity = 1;
            }
        }
        else{
            for(let i = 0; i < allColMdDiv.length;i++)
            {
                allColMdDiv[i].style.opacity = 0.08;
            }
            let allItem = document.querySelectorAll(ListItemClicked);//because there are the website link has 3 img so will retunr three <div class='col-md'>...</div>
            debugger;
            if(allItem.length > 1){
                for(let i = 0; i < allItem.length;i++)
                {
                    console.log(allItem[i].parentElement);
                    allItem[i].parentElement.style.opacity = 1;
                }
            }
            else
            {
                document.querySelector(ListItemClicked).parentElement.style.opacity = 1;

            }
        }
        
    }
}




//  let windowHeight = window.innerHeight,
//      upperNavHeight = document.getElementsByClassName("upper-navbar")[0].clientHeight,
//      mainNavHeight = document.getElementsByClassName("navbar")[0].clientHeight,
//      sliderHeight = windowHeight - (upperNavHeight + mainNavHeight);

//     document.getElementsByClassName("slider")[0].style.height = sliderHeight + "px";


/**
 * [start]
 * we want to make prev & next btn in testimonials Slider be  background red if there are 
 * pages after or before it else will be black
 * for ex: A- next btn if there are pages after it =>  will give it background red else black
 *         B- prev btn if there are pages before it => will give it background red else black
 */
//way1:using pure Js:

let prevSliderBtn = document.getElementById("prevBtn"),
    nextSliderBtn =  document.getElementById("nextBtn");

    prevSliderBtn.onclick = Prev_Next_Slider_Click_Event;
    nextSliderBtn.onclick = Prev_Next_Slider_Click_Event;



     
function Prev_Next_Slider_Click_Event(event){
    
    let activeSliderPageElement = document.querySelector(".testimonials .carousel-indicators .active"),
        nextOrPrevSliderPageElement = "",
        SliderPagesNumber = document.querySelectorAll(".testimonials .carousel-indicators li").length,
        currentSliderPageIndex = 0,
        numberOfRemainingPages = 0,
        eventSource = event.target,
        nextOrPrevBtnSlider = ""; 


        
        
         if(eventSource.getAttribute("id") == "nextBtn"){
            nextOrPrevSliderPageElement = activeSliderPageElement.nextElementSibling;
            nextOrPrevBtnSlider = nextSliderBtn;
         }
         else
         {
            nextOrPrevSliderPageElement = activeSliderPageElement.previousElementSibling;
            nextOrPrevBtnSlider = prevSliderBtn;
         }
         
         
        //  if(nextOrPrevSliderPageElement != null){
        //     console.log(parseInt(activeSliderPageElement.getAttribute("data-slide-to")));
        //  }else
        //  {
        //      console.log(2);
        //  }
         

            if(nextOrPrevSliderPageElement == null){
                /**
                 * here if f null => thats mean there aren't 
                 * nextElementSibling(there aren't next pages) so the 
                 * currentSliderPageIndex will be -1 and the slider will go back
                 * to first slider
                 */
                numberOfRemainingPages = -1;
            }
            else{
                if(eventSource.getAttribute("id") == "nextBtn"){
                    currentSliderPageIndex = parseInt(nextOrPrevSliderPageElement.getAttribute("data-slide-to")) + 1; //here we added 1 every time for currentSliderPageIndex in order become equivalent with SliderPagesNumber count
                    numberOfRemainingPages = SliderPagesNumber - currentSliderPageIndex;
                }
                else
                {
                    numberOfRemainingPages = parseInt(nextOrPrevSliderPageElement.getAttribute("data-slide-to"));
                }
                
            }
         
        // alert(numberOfRemainingPages);
        if(numberOfRemainingPages == 0){
            nextOrPrevBtnSlider.style.backgroundColor = "black";
        }
        else{
            nextOrPrevBtnSlider.style.backgroundColor = "red";
        }
}

 //[End]