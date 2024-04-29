// -----------------Elements------------
const btnCloseModal=document.querySelector('#btnCloseModal');
const btnOpenAcc=document.querySelectorAll('.btnOpenAccount');
const containerModal=document.querySelector('#modal');
const overlay=document.querySelector('.overlay');
const btnLearn=document.querySelector('#btnText');
const section1=document.querySelector('#section-1');
// const headerLinks=document.querySelector('.headerLinks');
// -----------------Functions------------
btnCloseModal.addEventListener('click',function(){
     containerModal.classList.add('hidden');
     overlay.classList.add('hidden');
})
const OpenAcc=function(e){
    e.preventDefault();
    containerModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
btnOpenAcc.forEach(function(btnOpenAcc){
    btnOpenAcc.addEventListener('click',OpenAcc);

});
btnLearn.addEventListener('click',function(){
section1.scrollIntoView({behavior:"smooth"});
btnLearn.blur();
});

//Event Delegation:-
// 1- add event listener on common parent Element
// 2-determine which element originated the event.

const navHeader=document.querySelector('#navHeader');
navHeader.addEventListener('click',function(e){
 e.preventDefault();
 if(e.target.classList.contains('headerLinks')){
    const id=e.target.getAttribute('href');
    const links=document.querySelector(id);
    links.scrollIntoView({behavior:'smooth'});
    // console.log(id);
 };

});

// --------Tabs--------------
const section2=document.querySelector('.section-2');
const tabs=document.querySelectorAll('.tab');
section2.addEventListener('click',function(e){
    const id=e.target.closest('.tab');
    if(!id) return;

    tabs.forEach(function(e){
       e.classList.remove('activeTab');
    });
    // console.log(tabs);
    id.classList.add('activeTab');
    const content=document.querySelector(`.operContent-${id.dataset.tab}`);
    const operContent=document.querySelectorAll('.operContent');
    operContent.forEach(function(e){
        e.classList.remove('operContent-active');
    })
    content.classList.add('operContent-active');

//    console.log(content);
});
//----------navBar opacity Effect----
const handleHover=function(e,opacity){
    if(e.target.classList.contains('headerLinks')){
        const link= e.target;
        const sibling=link.closest('#navHeader')
        .querySelectorAll('.headerLinks');
        const logo=link.closest('#navHeader').querySelector('#logo');
        sibling.forEach(function(e){
            if(e !== link){
                e.style.opacity=opacity;
            };
            logo.style.opacity=opacity;
        })
    };

};
navHeader.addEventListener('mouseover',function(e){
       handleHover(e,0.5);
    });
navHeader.addEventListener('mouseout',function(e){
        handleHover(e,1);
});
//-------------Sticky Navbar--------
const header=document.querySelector('#header');
const navHeight=navHeader.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav=function(entries){
    const [entry]=entries;
    if(!entry.isIntersecting){
        navHeader.classList.add('sticky');
    }else{
        // navHeader.classList.remove('sticky');
    };
};
const headerObs=new IntersectionObserver(stickyNav,{root:null,threshold:0,rootMargin:`-${navHeight}px`});
headerObs.observe(header);
//------------Revealing sections------
const sections=document.querySelectorAll('.section');
const sectionObserv=function(entries,observes){
   const [entry]=entries;
//    console.log(entry);
   if(entry.isIntersecting){
    entry.target.classList.remove('sectionHidden');
    observes.unobserve(entry.target);
   }
}
const sectionObs=new IntersectionObserver(sectionObserv,{});
 sections.forEach(function(sec){
    sectionObs.observe(sec);
    sec.classList.add('sectionHidden');
 });

 //----------Lazy Image Loading--------
 const images=document.querySelectorAll('img[data-src]');
//  console.log(images);
 const imgObservs=function(entries,observes){
   const [entry]=entries;
//    console.log(entry);
   if(!entry.isIntersecting) return;
   //replacing lazy imag with original
   entry.target.src=entry.target.dataset.src;
   entry.target.addEventListener('load',function(){
       entry.target.classList.remove('imgLazy');
    });
    observes.unobserve(entry.target);

//    console.log(entry.target.src);
 };
 const imgObs= new IntersectionObserver(imgObservs,{
    root:null,
    threshold:0,
    rootMargin:'-200px',
 });
 images.forEach(function(img){
imgObs.observe(img);
 });




//This method will create a copy of code for every link without need. bad for performance
// const headerLinks=document.querySelectorAll('.headerLinks');
// headerLinks.forEach(function(li){
//     li.addEventListener('click',function(e){
//         e.preventDefault();
//         const id=this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({behavior:'smooth'});
//         li.blur();
//     });
// });


