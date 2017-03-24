/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(obj) {
//   const ele = `
//     <article class="tweet">
//       <header><img src="${ obj.user.avatars.small }"</header>
//       <h1>${ obj.user.name }</h1>
//     </article>
//   `

  var $tweet = $("<article>").addClass("tweet")
  .append($("<header>").append("<img src='" + obj.user.avatars.small + "'>")
  .append($("<h1>").text(obj.user.name))
  .append($("<h2>").text(obj.user.handle)))  //appending everyting under header
  .append($("<div>").addClass("tweet-body").append($("<p>").text(obj.content.text))) //appending everyting under div-tweet-body
  .append($("<footer>").append($("<p>").text(getTheCurrentTime(obj.created_at))).append( $("<span>").append("<i class='fa fa-flag' aria-hidden='true'>").append("<i class='fa fa-retweet' aria-hidden='true'>").append("<i class='fa fa-heart' aria-hidden='true'>")));
  return $tweet;
}

function renderTweets(tweets) {
  var $container = $('.tweets-container');
  // $('.tweet').remove();
  for (i in tweets) {
    var $elem = createTweetElement(tweets[i]);
    $container.prepend($elem);
    console.log($elem);
  }
}

function getTheCurrentTime(date) {
  var currentDate = Date.now();
  var howLongAgoSeconds = (currentDate - date) / 1000 / 60;
  var howLongAgoMinutes = (currentDate - date) / 1000 / 60;
  var howLongAgoHours = (currentDate - date) / 1000 / 60 / 60;
  if (howLongAgoMinutes < 1) {
    return `${Math.floor(howLongAgoSeconds)} seconds ago`;
  } else if (howLongAgoMinutes > 1 && howLongAgoMinutes < 60) {
    return `${Math.floor(howLongAgoMinutes)} minutes ago`;
  } else if (howLongAgoMinutes > 60 && howLongAgoHours < 24) {
    return `${Math.floor(howLongAgoHours)} hours ago`;
  } else if (howLongAgoHours > 24) {
    return `${Math.floor(howLongAgoHours / 24)} days ago`;
  }
}

$(document).ready(function() {
/* attach a submit handler to the form */
  $("#compose").on('submit', function (event) {
    event.preventDefault();
    if($("textarea").val() === "" || $(this).val() === null) {
      return alert("Tweet content is not present.");
    } else if ($("textarea").val().length > 140) {
      return alert("Tweet content exceeds the maximum limit.");
    } else {
      /* stop form from submitting normally */
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function () {
          loadTweets();
        }
      });
    }
  });

  function loadTweets() {
    console.log('Tweet sent, performing ajax call...');
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  };

  loadTweets();
  $("button").click(function(){
    $(".new-tweet").slideToggle("fast", function (){});
  });


});
