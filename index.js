$( document ).ready(function() {
  var userRating = 5;
  var actorCounter = 1;
  var genreCounter = 1;
  var producerCounter = 1;
  var directorCounter = 1;
  var writerCounter = 1;
  var apiKey = '';

  if (localStorage.getItem('apiKey')) {
    apiKey = localStorage.getItem('apiKey');
    $('#apiKeyInput').val(apiKey);
    $('#apiKeyInput').prop("disabled", true);
    $('#apiKeySaveButton').hide();
  } else {
    $('#apiKeySaveButton').show();
    $('#apiKeyClearButton').hide();
  }

  $('#apiKeyInput').keypress(function(e) {
    if (e.keyCode == '13') {
      e.preventDefault();
      $('#apiKeySaveButton').click();
    }
  });

  $('#apiKeySaveButton').on('click', function(e) {
    e.preventDefault();
    var apiKeyFromInput = $('#apiKeyInput').val();
    if (apiKeyFromInput.trim() != '') {
      localStorage.setItem('apiKey', apiKeyFromInput);
      console.log('API-Key: ' + apiKeyFromInput + ' stored.');
      apiKey = apiKeyFromInput;
      $('#apiKeyInput').prop("disabled", true);
      $('#apiKeySaveButton').hide();
      $('#apiKeyClearButton').show();
    }
  });

  $('#apiKeyClearButton').on('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('apiKey');
    $('#apiKeyInput').val('');
    console.log('API-Key removed!');
    apiKey = '';
    $('#apiKeyInput').prop("disabled", false);
    $('#apiKeySaveButton').show();
    $('#apiKeyClearButton').hide();
  });

  $('#movie').on('click', function(e) {
    e.preventDefault();
    $('#typeSelect').html('Movie  <span class="caret"></span>');
    $('#typeSelect').val('movie');
  });

  $('#tvshow').on('click', function(e) {
    e.preventDefault();
    $('#typeSelect').html('TV-Show  <span class="caret"></span>');
    $('#typeSelect').val('tv');
  });

  $('#fsk0').on('click', function(e) {
    e.preventDefault();
    $('#ratingSelect').html('FSK-0  <span class="caret"></span>');
    $('#ratingSelect').val('FSK-0');
    $('#ratingSelect').removeClass().addClass('btn btn-default dropdown-toggle');
  });

  $('#fsk6').on('click', function(e) {
    e.preventDefault();
    $('#ratingSelect').html('FSK-6  <span class="caret"></span>');
    $('#ratingSelect').val('FSK-6');
    $('#ratingSelect').removeClass().addClass('btn btn-warning dropdown-toggle');
  });

  $('#fsk12').on('click', function(e) {
    e.preventDefault();
    $('#ratingSelect').html('FSK-12  <span class="caret"></span>');
    $('#ratingSelect').val('FSK-12');
    $('#ratingSelect').removeClass().addClass('btn btn-success dropdown-toggle');
  });

  $('#fsk16').on('click', function(e) {
    e.preventDefault();
    $('#ratingSelect').html('FSK-16  <span class="caret"></span>');
    $('#ratingSelect').val('FSK-16');
    $('#ratingSelect').removeClass().addClass('btn btn-primary dropdown-toggle');
  });

  $('#fsk18').on('click', function(e) {
    e.preventDefault();
    $('#ratingSelect').html('FSK-18  <span class="caret"></span>');
    $('#ratingSelect').val('FSK-18');
    $('#ratingSelect').removeClass().addClass('btn btn-danger dropdown-toggle');
  });

  $('#decRating').on('click', function() {
    if (userRating !== 0) {
      userRating--;
    }
    $('#userRating').val(userRating);
    $('#userRating').html(userRating);
  });

  $('#incRating').on('click', function() {
    if (userRating !== 10) {
      userRating++;
    }
    $('#userRating').val(userRating);
    $('#userRating').html(userRating);
  });

  // Load Template and compile
  var source   = $('#multiInput').html();
  var template = Handlebars.compile(source);

  // Load Data
  var actorData = { type: "actor", types: "Schauspieler", placeholder: "Name", addButton: "addActor" };
  var genreData = { type: "genre", types: "Genre(s)", placeholder: "Genre", addButton: "addGenre" };
  var producerData = { type: "producer", types: "Produzent(en)", placeholder: "Name", addButton: "addProducer" };
  var directorData = { type: "director", types: "Regisseur(e)", placeholder: "Name", addButton: "addDirector" };
  var writerData = { type: "writer", types: "Autor(en)", placeholder: "Name", addButton: "addWriter" };

  // Assign templates
  $('.actors').html(template(actorData));
  $('.genres').html(template(genreData));
  $('.producers').html(template(producerData));
  $('.directors').html(template(directorData));
  $('.writers').html(template(writerData));

  $('#addActor').on('click', function() {
    actorCounter++;
    $('.actors').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Name" id="actor'+ actorCounter +'"><span class="input-group-btn"><button id="remActor" class="btn btn-danger" type="button"><span class="glyphicon glyphicon-minus"></span></button></span></div>');
  });

  $('.actors').on('click', '#remActor', function() {
    $(this).parent().parent().remove();
    actorCounter--; // TODO: Set actor counter to remove the actual removed id ...
  });

  $('#addGenre').on('click', function() {
    genreCounter++;
    $('.genres').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Genre" id="genre'+ genreCounter +'"><span class="input-group-btn"><button id="remGenre" class="btn btn-danger" type="button"><span class="glyphicon glyphicon-minus"></span></button></span></div>');
  });

  $('.genres').on('click', '#remGenre', function() {
    $(this).parent().parent().remove();
    genreCounter--;
  });

  $('#addProducer').on('click', function() {
    producerCounter++;
    $('.producers').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Name" id="producer'+ producerCounter +'"><span class="input-group-btn"><button id="remProducer" class="btn btn-danger" type="button"><span class="glyphicon glyphicon-minus"></span></button></span></div>');
  });

  $('.producers').on('click', '#remProducer', function() {
    $(this).parent().parent().remove();
    producerCounter--;
  });

  $('#addDirector').on('click', function() {
    directorCounter++;
    $('.directors').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Name"  id="director'+ directorCounter +'"><span class="input-group-btn"><button id="remDirector" class="btn btn-danger" type="button"><span class="glyphicon glyphicon-minus"></span></button></span></div>');
  });

  $('.directors').on('click', '#remDirector', function() {
    $(this).parent().parent().remove();
    directorCounter--;
  });

  $('#addWriter').on('click', function() {
    writerCounter++;
    $('.writers').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Name"  id="writer'+ writerCounter +'"><span class="input-group-btn"><button id="remWriter" class="btn btn-danger" type="button"><span class="glyphicon glyphicon-minus"></span></button></span></div>');
  });

  $('.writers').on('click', '#remWriter', function() {
    $(this).parent().parent().remove();
    writerCounter--;
  });

  $('#searchTitle').keypress(function(e) {
    if (e.keyCode == '13') {
      e.preventDefault();
      $('#search').click();
    }
  });

  $('#search').on('click', function() {
    $('.selection').html('');
    var searchType = $('#typeSelect').val();
    console.log(searchType);
    var searchTitle = $('#searchTitle').val();
    var searchUrl = 'https://api.themoviedb.org/3/search/'+searchType+'?api_key=' + apiKey + '&language=de&query=' + searchTitle.split(' ').join('+');
    console.log(searchUrl);

    $.ajax({
      dataType: "json",
      url: searchUrl,
      success: function(data) {
        // Load Template and compile
        var movieSelectionSource   = $('#movieSelection').html();
        var movieSelectionTemplate = Handlebars.compile(movieSelectionSource);
        var posterBase = "https://image.tmdb.org/t/p/w154";

        for (result of data.results) {
          console.log(posterBase + result.poster_path);

          // Assign templates
          $('.selection').append(movieSelectionTemplate({id: result.id, source: posterBase + result.poster_path, title: result.title}));
        }
      }
    });
  });

  $('.selection').on('click', 'a', function(e) {
    e.preventDefault();
    $('.selection').html('');

    while(actorCounter !== 1) {
      $('#actor' + actorCounter).parent().remove();
      actorCounter--;
    }

    while(genreCounter !== 1) {
      $('#genre' + genreCounter).parent().remove();
      genreCounter--;
    }

    while(producerCounter !== 1) {
      $('#producer' + producerCounter).parent().remove();
      producerCounter--;
    }

    while(directorCounter !== 1) {
      $('#director' + directorCounter).parent().remove();
      directorCounter--;
    }

    while(writerCounter !== 1) {
      $('#writer' + writerCounter).parent().remove();
      writerCounter--;
    }

    var mediaType = $('#typeSelect').val();
    var apiKey = $('#apiKeyInput').val();
    var reqUrl = "https://api.themoviedb.org/3/" + mediaType + "/" + this.id + "?api_key=" + apiKey + "&append_to_response=credits&language=de";
    var fskReqUrl = "https://altersfreigaben.de/api2/s/"+ this.id +"/de";
    console.log(reqUrl);
    console.log(fskReqUrl);

    $.ajax({
      dataType: "text/html",
      // beforeSend: function(jqXHR, settings) {
      //   jqXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
      // },
      url: fskReqUrl,
      success: function(someData) {
        console.log("FSK-" + someData);
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      }
    });

    $.ajax({
      dataType: "json",
      url: reqUrl,
      success: function(win) {
        $('#title').val(win.title || win.name);
        $('#description').val(win.overview);
        $('#userRating').val(Math.round(win.vote_average));
        $('#userRating').html(Math.round(win.vote_average));
        $('#date').val(win.release_date || win.first_air_date);

        var first = true;
        for (genre of win.genres) {
          if (!first) {
            $('#addGenre').click();
          }
          $('#genre' + genreCounter).val(genre.name);
          first = false;
        }

        for (var i = 0; i < 5; i++) {
          if (i !== 0) {
            $('#addActor').click();
          }
          $('#actor' + actorCounter).val(win.credits.cast[i].name);
        }

        var firstProducer = true, firstDirector = true, firstWriter = true;
        for (var i = 0; i < win.credits.crew.length; i++) {
          if (win.credits.crew[i].job == "Producer") {
            if (!firstProducer) {
              $('#addProducer').click();
            }
            $('#producer' + producerCounter).val(win.credits.crew[i].name);
            firstProducer = false;
          }

          if (win.credits.crew[i].job == "Director") {
            if (!firstDirector) {
              $('#addDirector').click();
            }
            $('#director' + directorCounter).val(win.credits.crew[i].name);
            firstDirector = false;
          }

          if (win.credits.crew[i].department == "Writing") {
            if (!firstWriter) {
              $('#addWriter').click();
            }
            $('#writer' + writerCounter).val(win.credits.crew[i].name + " (" + win.credits.crew[i].job + ")");
            firstWriter = false;
          }
        }
      }
    });
  });





  $('#finalize').on('click', function() {
    var type = $('#typeSelect').val();
    var title = $('#title').val();
    var description = $('#description').val();
    var rating = $('#ratingSelect').val();
    var userStarRating = $('#userRating').val();
    var published = $('#date').val();
    var actors = [];
    $('.actors input').each(function() {
      actors.push($(this).val());
    });
    var genres = [];
    $('.genres input').each(function() {
      genres.push($(this).val());
    });
    var producers = [];
    $('.producers input').each(function() {
      producers.push($(this).val());
    });
    var directors = [];
    $('.directors input').each(function() {
      directors.push($(this).val());
    });
    var writers = [];
    $('.writers input').each(function() {
      writers.push($(this).val());
    });

    var finalXml =
      '<media type="' + type + '">\n' +
        '<title>'+ title +'</title>\n' +
        '<description>\n' + description + '\n</description>\n' +
        '<cast>\n';

    for (actor of actors) {
      finalXml += '<name>' + actor + '</name>\n';
    }

    finalXml +=
      '</cast>\n' +
      '<rating>' + rating + '</rating>\n' +
      '<userStarRating>' + userStarRating + '</userStarRating>\n' +
      '<published>' + published + '</published>\n' +
      '<genres>\n';

    for (genre of genres) {
      finalXml += '<genre>' + genre + '</genre>\n';
    }

    finalXml += '</genres>\n<producers>\n';

    for (producer of producers) {
      finalXml += '<name>' + producer + '</name>\n';
    }

    finalXml += '</producers>\n<directors>\n';

    for (director of directors) {
      finalXml += '<name>' + director + '</name>\n';
    }

    finalXml += '</directors>\n<writers>\n';

    for (writer of writers) {
      finalXml += '<name>' + writer + '</name>\n';
    }

    finalXml += '</writers>\n</media>\n';

    var blob = new Blob([finalXml], {type: "application/xml;charset=utf-8"});
    var filename = title + ".xml";
    saveAs(blob, filename);

    console.log(finalXml);
  });
});
