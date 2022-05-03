'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;


  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = ''){
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector (optTitleListSelector);
  document.querySelector(optTitleListSelector).innerHTML ='';
  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id'); 
    /* [DONE] find the title element */

    /*  [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*[DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags){
  const params = {
    min: 999999,
    max: 1
  };

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times ');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage*(optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW]  [DONE]create a new variable allTags with an empty objects */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] [DONE] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] [DONE] add tag to AllTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] [DONE] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] [DONE] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};

  /* [NEW] [DONE] START LOOP: for each tag in allTags:*/
  for(let tag in allTags){
    /* [NEW] [DONE] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '  ' + '</span></a></li>';
    console.log('taglinkHTML:', tagLinkHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }
  /* [NEW] [DONE] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('', allTagsData);

}

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault('');//po co to się daje?

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /*  [DONE] START LOOP: for each active tag link */
  for(let tagActiveLink of tagActiveLinks){
    /* [DONE] remove class active */
    tagActiveLink.classList.remove('active');
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagsAll = document.querySelectorAll('a [href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let tagAll of tagsAll){
    /* [DONE] add class active */
    tagAll.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagsAll = document.querySelectorAll('a[href^="#tag-"]');
  /* [DONE] START LOOP: for each link */
  for(let tagAll of tagsAll){
    /* [DONE] add tagClickHandler as event listener for that link */
    tagAll.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}



function generateAuthors(){

  /*[NEW] [DONE]*/
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){
    /*  [DONE] find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /*[NEW]  [DONE]*/
    const articleAuthors = article.getAttribute('data-author');
    const articleAuthorsArray = [];
    articleAuthorsArray.push(articleAuthors);
    for(let articleAuthor of articleAuthorsArray){
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      html = linkHTML;

      if(!allAuthors.hasOwnProperty(articleAuthor)){
        /* [NEW]  [DONE] add generated code to allTags array*/
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
  /*  [DONE] prevent default action for this event */
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