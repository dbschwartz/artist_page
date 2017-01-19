$(function () {
    resize();
	followStatus();
    $(".dropdown .dropdown-pane").hide();
    $(".dropdown").click(function () {
        $(".dropdown .dropdown-pane").slideToggle("fast");
    });
    setTracks();
});
$(window).resize(function () {
    resize();
});


$(document).ready(function(){
    $.getJSON( "js/artist.json", function( data ) {
    })
    .done(function(data) {
        $('#page-title').text(data.artist.artist_name)
                        .append('<p>'+data.artist.profile+'</p>')
                        .append('<img src="'+data.artist.profile_picture+'"/>');

  })

    .fail(function(err){
        console.log("error"+ err);
    })


$.getJSON( "js/tracks.json", function( data ) {
    })
    .done(function(data) {

        $("#track-data1").text(data[0].title);



       




  })

    .fail(function(err){
        console.log("error"+ err);
    })




});


$("button.follow").click(function() {
	if($(this).hasClass("following")) {
		$(this).removeClass("following");
		$(this).html("FOLLOW");
	} else {
		$(this).addClass("following");
		$(this).html("UNFOLLOW");
	}
	
});

function resize() {
    var width = $(window).width();
    var height = width / 1.78;
	
	$("a.sample-item").height($("a.sample-item").width());
}

function followStatus() {
	if($("button.follow").hasClass("following"))
		$('button.follow').html("UNFOLLOW");
	else
		$('button.follow').html("FOLLOW");
}

function toggleBtn(target, single) {
    target.click(function () {
        if (single)
            target.not(this).removeClass('active');
        $(this).toggleClass('active');
        return false;
    });
}

function setTracks() {
    toggleBtn($('.play'), true);
    toggleBtn($('.track-fav'), false);
    $(".track-pos-graph").each(function () {
        var self = $(this);
        self.css('-webkit-mask-box-image', "url('" + self.attr("data-mask") + "')");
        self.css('mask-border', "url('" + self.attr("data-mask") + "')");
        setTrackTime(self, 0);
    });
    $(".track-pos-graph").slider({
        range: "min",
        animate: true,
        value: 0,
        min: 0,
        max: 1,
        step: .01,
        slide: function (event, ui) {
            setTrackTime($(this), ui.value)
        }
    });

    $(".track-share .share-dropdown-pane").hide();
    $(".track-share").click(function () {
        
        $(this).children(".share-dropdown-pane").slideToggle("fast");
    });
}

function setTrackTime(target, value) {
    var length = target.attr("data-length");
    var curTime = secondsToHms(length * value);
    var maxTime = secondsToHms(length);
    target.siblings(".track-pos-details").children("p").text(curTime + " / " + maxTime);
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

