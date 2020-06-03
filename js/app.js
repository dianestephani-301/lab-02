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

$('select').on('change', function () {
  let $selection = $(this).val();
  console.log($selection)
  $('section').hide()
  $(`section[class="${$selection}"]`).show()
})

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
      $('#photographs').append(photoHtml);
    })
  })

// Both ajax calls inside if/else statement, reference value of the button that was pushed to decide which ajax gets called.**
// Single ajax call: make first ajax file path a template literal, change page 1 to just "variable" that depends on which button was clicked.

// $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })

let runSecondHalf = () => {
  // render half of the array
  // direct it to the second page
  // will end up calling...

  // let newArray = [];
  // let secondArray = allPhotos.slice(20, 39);
  // newArray.push(secondArray);
  // return newArray;
  // let.html = Mustache.render(newArray)
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

$('button').on('click', function () {
  console.log(event);
  // console.log(allPhotos.slice(20, 39));
  allPhotos = [];
  // $('img').attr('');
  // $('h2').text('');
  // $('p').text('');
  $('section').empty();
  runSecondHalf();
})



// add click event


// Add navigation button xxx
// CLear page, render second set of data
// Render correct data to the right page
// Reset the filters (sean: filters don't change, stay basically the same)
// Repopulate them using only keywords from the images currently being displayed.

// Handle the event, render all the new data when that happens
// BUtton = submit event. .on submit, etc.
// COuld put entire ajax into an event handler
// COuld create a new value and run a new loop.
