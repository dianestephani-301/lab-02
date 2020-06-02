'use strict';

let allPhotos = [];

function Photo(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allPhotos.push(this);
}

Photo.prototype.render = function() {
  console.log('in render function')
  const myTemplate = $('#photo-template').html();
  const $newSection = $(`<section>${myTemplate}</section>`)
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('').html(this.keyword);
  $newSection.find('').html(this.horns);
  $('main').append($newSection);
}


$.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(photos => {
    photos.forEach(value => {
      new Photo(value).render();
    })
  })
