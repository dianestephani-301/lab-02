'use strict';

let allPhotos = [];
let allKeywords = [];


function Photo(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allPhotos.push(this);
}

Photo.prototype.toHtml = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}


const getKeywords = () => {
  allPhotos.forEach(picture => {
    allKeywords.push(picture.keyword);
  })
}

const dropDown = () => {
  let unique = [];
  // this forEach lop is filtering out duplicates
  allKeywords.forEach(picture => {
    let present = unique.includes(picture)
    if (!present) {
      unique.push(picture);
    }
  })
  unique.forEach(keyword => {
    const $newOption = $(`<option value=${keyword}>${keyword}</option>`);
    $('#photoBox').append($newOption);
  })
}

const firstPage = $('<a>Next Page</a>');
$('#page2').append(firstPage)

$('select').on('change', function () {
  let $selection = $(this).val();
  console.log($selection)
  $('div').hide()

  $(`div[class="${$selection}"]`).show()
})

function runFirstHalf() {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
    .then(photos => {
      photos.forEach(value => {
        new Photo(value);

      })
      getKeywords();
      dropDown();
      allPhotos.forEach(picture => {
        console.log(`This is the picture`, picture)
        let photoHtml = picture.toHtml();
        console.log(photoHtml);
        $('#photographs').append(photoHtml);

      })
    })
}

// Both ajax calls inside if/else statement, reference value of the button that was pushed to decide which ajax gets called.**
// Single ajax call: make first ajax file path a template literal, change page 1 to just "variable" that depends on which button was clicked.

// $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })

let runSecondHalf = () => {
  $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
    .then(photos => {
      photos.forEach(value => {
        new Photo(value);
      })
      getKeywords();
      dropDown();

      allPhotos.forEach(picture => {
        console.log(`This is the picture`, picture)
        let photoHtml = picture.toHtml();
        $('#photographs').append(photoHtml);

      })
    })
}

function button2() {
  const nextPage = $('<a>Home Page</a>');
  $('#page1').append(nextPage);

}
$(window).on('load', function () {
  runFirstHalf();
})



$('#page2').on('click', function () {
  console.log(event);
  allPhotos = [];
  $('section').empty();
  runSecondHalf();
})

$('#page1').on('click', function () {
  console.log(event);
  allPhotos = [];
  $('section').empty();
  button2();
  runFirstHalf();

})
