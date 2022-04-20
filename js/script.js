'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
 
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
 
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    
    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [?] find the title element */



    /* [DONE] get the title from the title element */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  /* [DONE] insert link into titleList */

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  } 

}



function generateTags(){

  /* [DONE]  find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
 
  /* [DONE]  START LOOP: for every article: */

  for(let article of articles){

    /* [DONE]  find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);

    /* [DONE]  make html variable with empty string */

    let html = '';

    /*[DONE]  get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    for(let tag of tags);{
    /*[DONE]  split tags into array */
      const articleTagsArray = articleTags.split(' ');
    /*[DONE]  START LOOP: for each tag */
      for(let tag of articleTagsArray){
      /*[DONE]  generate HTML of the link */
        const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      /*[DONE]  add generated code to html variable */
        html = html + tagLinkHTML;
    /*[DONE] END LOOP: for each tag */
      }
    
    /* [DONE]  insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    const links = article.querySelectorAll('.post-tags .list');

    for(let tag of tags){
      links.addEventListener('click', titleClickHandler);
    }
  /* [DONE]  END LOOP: for every article: */
    }
}

}


function tagClickHandler(event){

  /*[DONE]  prevent default action for this event */
  
  event.preventDefault();
  
  /* [DONE]  make new constant named "clickedElement" and give it the value of "this" */
  
  const clickedElement = this;

  /* [DONE]  make a new constant "href" and read the attribute "href" of the clicked element */
  
  const href = clickedElement.getAttribute('href');
  
  /* [DONE]  make a new constant "tag" and extract tag from the "href" constant */
  
  const tag = href.replace('#tag-', '');
  
  /*[DONE]  find all tag links with class active */
  
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  
  /*[DONE]  START LOOP: for each active tag link */
  
  for(let activeTag of activeTags){
    
    /*[DONE] remove class active */
    activeTag.classList.remove('active');
 
    /*[DONE] END LOOP: for each active tag link */
  }
  
  /*[DONE] find all tag links with "href" attribute equal to the "href" constant */
  
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  
  /*[DONE] START LOOP: for each found tag link */
  
  for(let tagLinkHref of tagLinksHref){
    
    /* add class active */
   
    tagLinkHref.classList.add('active');
  
    /*[DONE] END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /*[DONE] find all links to tags */
  const tagLinksHref = document.querySelectorAll('a[href^="#tag-"]');
  
  /*[DONE] START LOOP: for each link */
  for(let link of tagLinksHref){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /*[DONE] END LOOP: for each link */
  }
}

function generateAuthors(){


  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find authors wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    const articleAuthors = article.getAttribute('data-author');
    const articleAuthorsArray = [];
    articleAuthorsArray.push(articleAuthors);
    for(let articleAuthor of articleAuthorsArray){

      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      html = linkHTML;

      if(!allAuthors.hasOwnProperty(articleAuthor)){

        /* [DONE] add generated code to allTags array*/
        
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
    }

    authorsWrapper.innerHTML = html;

  }

  const authorList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = {author: []};

  for(let articleAuthor in allAuthors){

    allAuthorsData.author.push({
      author: articleAuthor,
      count: allAuthors.articleAuthor,

    });

  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);



}

function authorClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault('');

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');

  /* [DONE] find all author links with class active */

  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */

  for(let authorActiveLink of authorActiveLinks){

    /* [DONE] remove class active */

    authorActiveLink.classList.remove('active');

  /* [DONE] END LOOP: for each active author link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const authorsAll = document.querySelectorAll('a [href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */

  for(let authorAll of authorsAll){

    /* [DONE] add class active */

    authorAll.classList.add('active');
  /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author ="' + author + '"]');
}

function addClickListenersToAuthors(){

  /* [DONE] find all links to authors */

  const authorsAll = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for(let authorAll of authorsAll){
    /* [DONE] add authorClickHandler as event listener for that link */

    authorAll.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}
generateTitleLinks();
generateTags();
addClickListenersToTags(); 
generateAuthors();
addClickListenersToAuthors();
