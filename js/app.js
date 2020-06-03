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

Photo.prototype.render = function () {
  console.log('in render function')
  const myTemplate = $('#photo-template').html();
  const $newSection = $(`<section class=${this.keyword}>${myTemplate}</section>`)
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
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

$('select').on('change', function(){
  let $selection = $(this).val();
  console.log($selection)
  $('section').hide()
  $(`section[class="${$selection}"]`).show()
})

$.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(photos => {
    photos.forEach(value => {
      new Photo(value).render();

    })
    getKeywords();
    dropDown();
  })
