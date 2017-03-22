/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 var data = [
   {
     "user": {
       "name": "Newton",
       "avatars": {
         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
       },
       "handle": "@SirIsaac"
     },
     "content": {
       "text": "If I have seen further it is by standing on the shoulders of giants"
     },
     "created_at": 1461116232227
   },
   {
     "user": {
       "name": "Descartes",
       "avatars": {
         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
       },
       "handle": "@rd" },
     "content": {
       "text": "Je pense , donc je suis"
     },
     "created_at": 1461113959088
   },
   {
     "user": {
       "name": "Johann von Goethe",
       "avatars": {
         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
       },
       "handle": "@johann49"
     },
     "content": {
       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
     },
     "created_at": 1461113796368
   }
 ];

function createTweetElement(obj) {
  const ele = `
    <article class="tweet">
      <header><img src="${ obj.user.avatars.small }"</header>
      <h1>${ obj.user.name }</h1>
    </article>
  `

  var $tweet = $("<article>").addClass("tweet")
  .append($("<header>").append("<img src='" + obj.user.avatars.small + "'>")
  .append($("<h1>").text(obj.user.name))
  .append($("<h2>").text(obj.user.handle)))  //appending everyting under header
  .append($("<div>").addClass("tweet-body").append($("<p>").text(obj.content.text))) //appending everyting under div-tweet-body
  .append($("<footer>").append($("<p>").text(obj.created_at)).append( $("<span>").append("<i class='fa fa-flag' aria-hidden='true'>").append("<i class='fa fa-retweet' aria-hidden='true'>").append("<i class='fa fa-heart' aria-hidden='true'>")));
  return $tweet;
}

function renderTweets(tweets) {
  var $container = $('.container');
  for (i in tweets) {
    var $elem = createTweetElement(tweets[i]);
    $container.append($elem);
    console.log($elem);
  }
}

$(document).ready(function() {
  renderTweets(data);

/* attach a submit handler to the form */
  $("#compose").on('submit', function (event) {
    $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function (data) {
          console.log(data);
        }
      });
      /* stop form from submitting normally */
      event.preventDefault();
    });
});
