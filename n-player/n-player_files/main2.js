

$(document).ready( () => {	
    $('.mob-link').click(function(){
        $('.mob-link').removeClass("active");
        $(this).addClass('active');
    });
	$(document).delegate(".bws-modal-overlay, .bws-modal-cancel", "click", function(){
        $(".bws-modal").css("display", "none");
        unlockBody('.bws-modal-body');
    });
    $(document).delegate("#ersy-notepad-editor-content", "input", function(){
        $(".notepad__control-btn-save").addClass("active");
    });

    $(document).on("click", ".fa_menu", function(event){
        $(".fa_menu > .drop-down-menu").css("display", "none");
        $(".fa_menu").css("z-index", "5");
        $(event.target).children(".fa_menu > .drop-down-menu").css("display", "block");
        $(event.target).css("z-index", "6");
    });
    $(document).delegate("*", "click", function(event){ 
        if (!event.target.matches('.fa_menu > *, .fa_menu')){
            $(".fa_menu > .drop-down-menu").css("display", "none");
            $(".fa_menu").css("z-index", "5");
        }
    });
    $(document).on("click", ".playlist-remove", function(){
        $(this).closest('.playlist-item').addClass('is-remove')
        setTimeout(() => {
            $(this).closest('.playlist-item').remove()
        }, 450);
    });
    $(document).on("click", ".playlist-item__left, .playlist-item__cover", function(){
        launchPlayListVideo($(this).closest('.playlist-item').attr("data-video-id"));
    });

    $("#basic-addon2").click( function(){
        image.src = $('#pic-url').val();
    });
    $('#crop-image').click(function(){
        canvas = cropper.getCroppedCanvas({
      		width: 400,
      		height: 400,
    	});
    	canvas.toBlob((blob) => {
        	//url = URL.createObjectURL(blob);
        	var reader = new FileReader();
         	reader.readAsDataURL(blob); 
         	reader.onloadend = function() {
            	var base64data = reader.result;  
                $('#'+croppedImage).attr('src', base64data); 
                $("#image-cropper").css("display", "none");
                cropper.destroy();
   		        cropper = null;
                //unlockBody('.crop-system');
                if(cropperCallback){
                    cropperCallback();
                }
         	}
    	});
    });
    $('#close-image-cropper, .crop-overlay').click(function(){
      $("#image-cropper").css("display", "none");
      cropper.destroy();
   	    cropper = null;
        //unlockBody('.crop-system');
    });
});
var toPlaylistVideoId = null;
var photoViewerCurrentName = null;
function closeBurgerMenu(){
    // $('.m-ham').click();
    // $('.burger-icon').trigger('click');
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let mobMenu = $('.m-menu')
    let menuList = $('.menu-list');
    let menuItems = menuList.children('div');
    unlockBody(mobMenu);
    $(this).removeClass('m-close').addClass('m-open');
    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems.eq(i);
        var delay = (i + 1) / 10;
        item.css({
            'transition-delay': delay + "s",
            'transition-duration': '.30s',
            'transition-timing-function': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
        }).css({
            'opacity': '0',
            'transform': 'translate(0px,-15px)'
        })
    };
    setTimeout(() => {
        mobMenu.css('opacity', '0')
        setTimeout(() => {
            mobMenu.css('display', 'none')
        }, 300);
    }, 400);
    //$('.burger-icon').trigger('click');
    if(width < 768){
        console.log(width);
        $('.burger-icon').trigger('click');
    }
    
}
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


}
function closeSearch(){
    $('.search__body').addClass('hidden');
    setTimeout(() => {
        $('.search__content').addClass('hidden');
    }, 60);
    setTimeout(() => {
        $('.search__content').css('display', 'none');
    }, 400);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        }
    });
}
function onPlayerReady(event) {
    //event.target.playVideo();
    var url = new URL(location.href);
    if(url.searchParams.get("play") == "true"){
        loadVideo($("[data-playlist=discography]").first().attr("data-video-id"),'discography');
    }
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        if($("[data-playlist-action=repeat]").hasClass("is-active")){
            player.playVideo();
        }else{
            playNextVideo();
        }
      
    }
}
function playNextVideo(){
    var videoTag = document.querySelector(".playlist__list [data-video-id='"+currentVideo+"']");
    var next = videoTag.nextElementSibling;
    if(next && next.hasAttribute('data-video-id')){
        currentVideo = next.getAttribute('data-video-id');
        player.loadVideoById(currentVideo);
        onVideoLaunch();
    }
}
function playPreviousVideo(){
    var videoTag = document.querySelector(".playlist__list [data-video-id='"+currentVideo+"']");
    var next = videoTag.previousElementSibling;
    if(next){
        currentVideo = next.getAttribute('data-video-id');
        player.loadVideoById(currentVideo);
        onVideoLaunch();
    }
}
function launchPlayListVideo(videoId){
        currentVideo = videoId;
        player.loadVideoById(videoId);
        onVideoLaunch();
}


function openPlayer() {
    $('.player').css({ 'display': 'block' })
    setTimeout(() => {
        $('.player').removeClass('is-hidden')
    }, 1);
}
function closePlayer() {
    $('.player').addClass('is-hidden')
    setTimeout(() => {
        $('.player').css({ 'display': 'none' })
    }, 401);
}
function loadVideo(videoId, playList){
    currentVideo = videoId;
    currentPlayList = playList;
    $("#playlist_caption").text(playList);
    $(".playlist__list").empty();
    $("[data-playlist="+currentPlayList+"]").each(function() {
        $(".playlist__list").append(
            '<div class="playlist-item" data-video-id="'+$(this).attr("data-video-id")+'" data-video-name="'+$(this).attr("data-video-name")+'" data-video-full-date="'+$(this).attr("data-video-full-date")+'" data-artist-id="'+$(this).attr("data-artist-id")+'" data-artist-url="'+$(this).attr("data-artist-url")+'" data-artist-name="'+$(this).attr("data-artist-name")+'" data-video-views="'+$(this).attr("data-video-views")+'" >'
        +'<div class="playlist-item__wrapper">'
          +'<div class="playlist-item__cover">'
            +'<img src="'+$("[data-video-id="+$(this).attr("data-video-id")+"] img").attr("src")+'" loading="lazy" alt="" class="playlist-item__cover-pic">'
            +'<div class="playlist-item__cover-overlay">'
              +'<svg width="14px" height="14px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
                +'<path d="M3 24V0L21 12L3 24Z" fill="white"></path>'
              +'</svg>'
            +'</div>'
          +'</div>'
          +'<div class="playlist-item__body">'
            +'<div class="playlist-item__left">'
              +'<span class="playlist-item__name">'+$(this).attr("data-video-name")+'</span>'
              +'<span class="playlist-item__artist">'+$(this).attr("data-artist-name")+'</span>'
            +'</div>'
            +'<div class="playlist-item__right">'
              +'<span class="playlist-item__time">'+$(this).attr("data-duration")+'</span>'
              +'<div data-playlist-action="removeTrack" class="playlist-remove">'
                +'<svg width="14" height="14" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
                  +'<path d="M4 4L20 20" stroke="currentColor" stroke-width="3.4"></path>'
                  +'<path d="M20 4L4 20" stroke="currentColor" stroke-width="3.4"></path>'
                +'</svg>'
            +'</div>'
        +'</div>'
    +'</div>'
+'</div>'
+'</div>');
    });
    closeEmbed();
    openPlayer();
    player.loadVideoById(videoId);
    onVideoLaunch();
}
function stopVideo(){
    player.pauseVideo();
    var allPlayerStatus = document.querySelectorAll(".video__playing");
    allPlayerStatus.forEach(element => {
        element.style.display = "none";
    });
}
function onVideoLaunch(){
    isVideoHearted();
    isArtistFollowed($("[data-video-id="+currentVideo+"]").attr("data-artist-id"));
    removeFromNotifications();
    var allPlayerStatus = document.querySelectorAll(".video__playing");
    allPlayerStatus.forEach(element => {
        element.style.display = "none";
    });
    var allPlayingVideos = document.querySelectorAll("[data-video-id='"+currentVideo+"'] .video__playing");
    allPlayingVideos.forEach(element => {
        element.style.display = "flex";
    });
    let title = $("[data-video-id="+currentVideo+"]").attr("data-video-name");
    $(".player-header__title, .player-current__title").text(title);
    $(".playing_video_view").text($("[data-video-id="+currentVideo+"]").attr("data-video-views")+" views");
    $(".playing_video_name").text($("[data-video-id="+currentVideo+"]").attr("data-artist-name"));
    $(".playing_video_release_date").text("Released on "+$("[data-video-id="+currentVideo+"]").attr("data-video-full-date"));
    $(".player__artist-link").attr("href","/artists/"+$("[data-video-id="+currentVideo+"]").attr("data-artist-url"));
    $(".player__artist-link").attr("onclick","return(navigateTo('"+"/artists/"+$("[data-video-id="+currentVideo+"]").attr("data-artist-url")+"'))");
    $(".player-current__artist-img").attr("src","/img/profile/"+$("[data-video-id="+currentVideo+"]").attr("data-artist-id")+"_profile-pic.jpg");
    $(".player__folded-cover").attr("src",$("[data-video-id="+currentVideo+"] img").attr("src"));
    $(".playlist__list > div").each(function() { $(this).css("border", "none");});
    $(".playlist__list [data-video-id="+currentVideo+"]").css("border", "1px solid #0995c6");
    $(".player__follow-btn").attr("onclick", "followPlayingVideo('"+$("[data-video-id="+currentVideo+"]").attr("data-artist-id")+"')");
    loadRelatedVideos($("[data-video-id="+currentVideo+"]").attr("data-artist-id"));
}
function loadRelatedVideos(videoId){
    $.post("/api/get-related-videos", {id:videoId}, function(result){
        $(".player__related-list").empty();
        $(".player__related-list").html(result);
    });
}
function increaseOdometer(){
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/odometer', false);
    xhttp.send();
    var count = document.getElementById("odometer").innerText;
    document.getElementById("odometer").innerText = parseInt(count)+1;
}
function isVideoHearted(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',currentVideo);
    xhttp.open('POST', '/api/is-video-hearted', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                $("#player-fav-button").addClass("is-active");
                
            }else{
                $("#player-fav-button").removeClass("is-active");
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function isArtistFollowed(artistId){
    $.post("/api/is-artist-followed", {"artist-id":artistId}, (result) => {
        if(result == "ok"){
            $('.player__follow-btn').addClass('is-followed').html('Followed');
        }else{
            $('.player__follow-btn').removeClass('is-followed').html('Follow Artist');
        }
    });
}
function heartVideo(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',currentVideo);
    xhttp.open('POST', '/api/heart-video', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                $("#player-fav-button").addClass("is-active");
            }else if(responce.target.response == "removed"){
                $("#player-fav-button").removeClass("is-active");
            }else if(responce.target.response == "login"){
                fold();
                minimize();
                showSignIn();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function unHeartVideo(video_id){
    $.post("/api/unheart-video", {video_id:video_id}, function(result){
        $('[data-playlist=saved-items][data-video-id='+video_id+']').remove();
    });
}
function followPlayingVideo(artistId){
    $.post("/subscribe", {artist_id:artistId}, function(result){
        if(result == "subscribed"){
            $('.follow-artist').addClass('is-followed');
            $('.follow-artist span').html('Following');
        }else if(result == "unsubscribed"){
            $('.follow-artist').removeClass('is-followed');
            $('.follow-artist span').html('Follow Artist');
        }else if(result == "login"){
            fold();
            minimize();
            showSignIn();
        }
    });
}
function heartVideo2(videoId){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',videoId);
    xhttp.open('POST', '/api/heart-video', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                $("[data-video-id="+videoId+"] .ctr-fav").addClass("hearted");              
            }else if(responce.target.response == "removed"){
                $("[data-video-id="+videoId+"] .ctr-fav").removeClass("hearted");
            }else if(responce.target.response == "login"){
                fold();
                minimize();
                showSignIn();
            }
        }
    }
    xhttp.send(params);
}
function removeFromNotifications(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',currentVideo);
    xhttp.open('POST', '/api/remove-from-notifcations', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            getUserButton();
        }
    }
    xhttp.send(params);
}
function subscribe(artistid){
    $.post("/subscribe", {artist_id:artistid}, function(result){
        if(result == "subscribed"){
            $('.follow-artist').addClass('is-followed');
            $('.follow-artist span').html('Following');
        }else if(result == "unsubscribed"){
            $('.follow-artist').removeClass('is-followed');
            $('.follow-artist span').html('Follow Artist');
        }else if(result == "login"){
            fold();
            minimize();
            showSignIn();
        }
    });
}
function subscribe2(artistid){
    $.post("/subscribe", {artist_id:artistid}, function(result){
        if(result == "subscribed"){
            $('[data-artist-id='+artistid+'] .follow-artist').addClass('is-followed');
        }else if(result == "unsubscribed"){
            $('[data-artist-id='+artistid+'] .follow-artist').removeClass('is-followed');
        }else if(result == "login"){
            fold();
            minimize();
            showSignIn();
        }
    });
    return true;
}
function minimize(){
    if ($('.player').not('is-collapsed')) {
        $('.player').addClass('is-collapsed')
    }
}
function fold(){
    $('.player').addClass("player_full-fold");
    $('[data-player-action="fold"]').addClass('is-rotated');
}
function zoom(){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    container1 = document.getElementById("player-container");
    container2 = document.getElementById("player-container2"); 
    container1.style.width = "100vw";
    container1.style.height = "100vh";  
    container1.style.bottom = "0px";
    container1.style.right = "0px";
    if(vw < 650){ 
        container2.style.width = "90vw";
        container2.style.height = "54vw";
    }else{
        container2.style.width = "640px";
        container2.style.height = "360px";
    }
    document.getElementById("zoom").style.display = "none";
    document.getElementById("minimize").style.display = "inline-block";
    document.getElementById("played-video-title").style.display = "none";
}

function setSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/admin/set-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                location.reload();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setPoolSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-pools-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                refreshPool();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setAlbumSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-album-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                refreshPool();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setAlbumSortingMode0(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-album-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                updateCurrentPage();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setHeadingSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/admin/set-heading-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                location.reload();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setTabSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/admin/set-tab-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                navigateTo(location.href);
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setArtistSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-artist-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                navigateTo("/artists");
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setNotificationSortingMode(mode){
    $.post("/api/set-notification-sorting-mode", {mode:mode}, function (result){
        if(result == "ok"){
            updateCurrentPage();
        }
    });
}
function setListsSortingMode(mode){
    $.post("/api/set-lists-sorting-mode", {mode:mode}, function (result){
        if(result == "ok"){
            updateCurrentPage();
        }
    });
}
function clearNotifications(){
    $.post("/api/clear-notifications", function (result){
        if(result == "ok"){
            updateCurrentPage();
        }
    });
}
function setArtistViewMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-artist-view-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                navigateTo(location.href);
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}

function signinold(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('email', document.getElementById("signin-email").value);
    params.append('password', document.getElementById("signin-password").value);
    xhttp.open('POST', '/api/signin', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                hideModal();
                closeBurgerMenu();
                setTimeout(() => {
                    $('.modal').addClass('is-hidden')
                    setTimeout(() => {
                        $('.modal').css(cssDisplayNone)
                    }, 230);
                }, 260);
                getUserButton();
                getPlaylist();
                navigateTo(location.href);
            }else if(responce.target.response == "wrong"){
                $('#signin-fail .message').html('Oops! Wrong email or password.');
                $('#signin-fail').show();
            }else {
                $('#signin-fail .message').html('Oops! Something went wrong while submitting the form.');
                $('#signin-fail').show();
            }
        }
    }
    xhttp.send(params);
    return false;
}
function signupold(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('email', document.getElementById("signup-email").value);
    params.append('password', document.getElementById("signup-password").value);
    params.append('phone', document.getElementById("signup-phone").value);
    params.append('username', document.getElementById("signup-username").value);
    xhttp.open('POST', '/api/signup', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                hideModal();
                closeBurgerMenu();
                setTimeout(() => {
                    $('.modal').addClass('is-hidden')
                    setTimeout(() => {
                        $('.modal').css(cssDisplayNone)
                    }, 230);
                }, 260);
                getUserButton();
                getPlaylist();
            }else if(responce.target.response == "email"){
                $('#signup-fail .message').html('Email already used!');
                $('#signup-fail').show();
            }else if(responce.target.response == "username"){
                $('#signup-fail .message').html('Username already used!');
                $('#signup-fail').show();
            }else {
                $('#signup-fail .message').html('Oops! Something went wrong while submitting the form.');
                $('#signin-fail').show();
            }
        }
    }
    xhttp.send(params);
    return false;
}
function signup(){
    $.post("/api/signup", {
        email: $("#signup-email").val(), 
        password: $("#signup-password").val(), 
        phone: $("#signup-phone").val(), 
        username: $("#signup-username").val()
    }, function (result){
        getUserButton2();
    });
    return false;
}
function signin(){
    $.post("/api/signin", {email: $("#signin-email").val(), password: $("#signin-password").val()}, function (result){
        getUserButton2();
    });
    return false;
}
function getUserButton2(){
    $.post("/api-check-login", {}, function(result){
        if(result == "ok"){
            $('#login-header').load("/get-user-button2");
            $('.sign-modal').removeClass("is-visible");
            if (document.body.hasAttribute('data-body-scroll-fix')) {
                let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
                document.body.removeAttribute('data-body-scroll-fix');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.width = '';
                window.scroll(0, scrollPosition);
            }
        }
    });
}
function searchArtist2() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('artistSearchInput2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("artistSearchList");
    li = ul.getElementsByTagName('a');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "flex";
      } else {
        li[i].style.display = "none";
      }
    }
}
function openFirstArtist(){
    ul = document.getElementById("artistSearchList");
    li = ul.getElementsByTagName('a');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++){
        if(li[i].style.display != "none"){
            navigateTo(li[i].getAttribute("data-link"));
            return false;
        }
    }
    return true;
}

function navigateTo(url, isArtistPage = false, event = false){
    if(event){
        if(event.metaKey || event.ctrlKey){
            return true;
        }
    }
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        $('#page_content').empty();
        $('#page_content').html('<div class="pin__lottie-loader"><lottie-player src="https://gist.githubusercontent.com/steinway1/86621d159ac4dac68af6c03db7d8ffd3/raw/f805f7dcb844a24d15a2013248124a46640ae6c9/pinloader.json" background="transparent" speed="1" loop autoplay> </lottie-player> </div>');
        $('#page_content').load(url+"?type=ajax", function (responce){
            //console.log(responce);
            if(responce == "reload"){
                location.reload();
            }else{
                window.history.pushState("", "", url);
                document.title = "Ersy.com | "+document.getElementById("loaded-page-title").getAttribute("data-title");
                window.scrollTo(0, 0);
                closeModal();
            }
            //$('.js-basic-single-select2').select2();
        });
        if(isArtistPage && width < 768){
            document.querySelector(".mob-rs__open").style.display = "block";
        }else{
            document.querySelector(".mob-rs__open").style.display = "none";
        }
        closeSearch();
        minimize();
        return false;
}
function updateCurrentPage(){
    $('#page_content').empty();
    $('#page_content').html('<div class="pin__lottie-loader"><lottie-player src="https://gist.githubusercontent.com/steinway1/86621d159ac4dac68af6c03db7d8ffd3/raw/f805f7dcb844a24d15a2013248124a46640ae6c9/pinloader.json" background="transparent" speed="1" loop autoplay> </lottie-player> </div>');
    $('#page_content').load(location.href+"?type=ajax", function (responce){
        if(responce == "reload"){
            location.reload();
        }else{
            //window.history.pushState("", "", url);
            document.title = "Ersy.com | "+document.getElementById("loaded-page-title").getAttribute("data-title");
        }
    });
}
function refreshTab(){
    $('.btn-tab.active').click();
}
function openTab2(artist,tab, artistName = "", tabName = "", displayToggle = false){
    $('.rs-content').hide();
    $('.rs-content.'+tab).show();
    $('.btn-tab').removeClass('active');
    $('.btn-tab.'+tab).addClass('active');
    $('.mob__switch-category').removeClass('active');
    $('.mob__switch-category.'+tab).addClass('active');

    window.history.pushState("", "","/artists/"+artist+"/"+tab);
    if(tab == "music-videos" || tab == "audios" || tab == "interviews" || tab == "discography"){
        $('.additional-to-video').css("display", "flex");
    }else{
        $('.additional-to-video').css("display", "none");  
    }
    if(tab == "feed"){
        $("#feedContent").empty();
        loadFeed();
    }else{
        $(".rs-content").empty();
        $(".rs-content."+tab).html('<div class="pin__lottie-loader"><lottie-player src="https://gist.githubusercontent.com/steinway1/86621d159ac4dac68af6c03db7d8ffd3/raw/f805f7dcb844a24d15a2013248124a46640ae6c9/pinloader.json" background="transparent" speed="1" loop autoplay> </lottie-player> </div>');
        $(".rs-content."+tab).load("/artists/"+artistUrl+"/"+tab+"?type=tab", function(result){});
    }

    vCategory = tab;
    $(".search-field").val("");
    $(".video-element").css("display", "block");
    document.title = "Ersy.com | "+artistName+" - "+tabName;
    if(displayToggle){
        $("#solo-feat-toggle").css("display", "flex");
    }else{
        $("#solo-feat-toggle").css("display", "none");
    }
    selectedVideos = [];
    selectedVideosId = [];
    multiSelectMode = false;
    $("#select-count").text(0);
}
function openTab(artist,tab, artistName = "", tabName = "", displayToggle = false){
    $('.rs-content').hide();
    $('.rs-content.'+tab).show();
    $('.btn-tab').removeClass('active');
    $('.btn-tab.'+tab).addClass('active');
    $('.mob__switch-category').removeClass('active');
    $('.mob__switch-category.'+tab).addClass('active');

    window.history.pushState("", "","/artists/"+artist+"/"+tab);
    if(tab == "music-videos" || tab == "audios" || tab == "interviews" || tab == "discography"){
        $('.additional-to-video').css("display", "flex");
    }else{
        $('.additional-to-video').css("display", "none");  
    }
    if(tab == "feed"){
        loadFeed();
    }
    if(vCategory == "feed"){
        updateCurrentPage();
    }
    vCategory = tab;
    $(".search-field").val("");
    $(".video-element").css("display", "block");
    document.title = "Ersy.com | "+artistName+" - "+tabName;
    if(displayToggle){
        $("#solo-feat-toggle").css("display", "flex");
    }else{
        $("#solo-feat-toggle").css("display", "none");
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function searchArtistVideos(tab){
    // Declare variables
    var input, filter, li, i, txtValue;
    input = document.getElementById(tab+'-search-input');console.log(tab+'-search-input');
    filter = input.value.toUpperCase();
    li = document.querySelectorAll('.'+tab+' .video-element');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].getAttribute("data-video-name");
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "block";
      } else {
        li[i].style.display = "none";
      }
    }
}
function refreshPool(url=""){
    var pool_url = location.href;
    if(url != ""){
        pool_url = url;
    }
    $('#page_content').empty();
    $('#page_content').html('<div class="pin__lottie-loader"><lottie-player src="https://gist.githubusercontent.com/steinway1/86621d159ac4dac68af6c03db7d8ffd3/raw/f805f7dcb844a24d15a2013248124a46640ae6c9/pinloader.json" background="transparent" speed="1" loop autoplay> </lottie-player> </div>');
    $('#page_content').load(pool_url+"?type=ajax",{
        search: $("#pool-video-search").val(),
        gender: $("#pool-gender").val(),
        label: $("#pool-label").val(),
        group_type: $("#pool-group_type").val(),
        age_category: $("#pool-age_category").val(),
    }, function (responce, status, xhr){
        if (status == "error") {
            console.log(xhr.status);
            console.log(xhr.statusText);
            console.log(responce);
          }
        if(responce == "reload"){
            location.reload();
        }else{
            if(url != ""){
                window.history.pushState("", "", url);
            }
            
            document.title = "Ersy.com | "+document.getElementById("loaded-page-title").getAttribute("data-title");
            window.scrollTo(0, 0);
        }
    });
    return false;
}
function updatePersonalInfos(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('first-name',document.getElementById('first-name').value);
    params.append('last-name',document.getElementById('last-name').value);
    params.append('email',document.getElementById('email-address').value);
    params.append('phone',document.getElementById('my-phone').value);
    xhttp.open('POST', '/api/update-personal-infos', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                getUserButton();
                alert("Personal informations updated!");
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
    return false;
}
function updatePassword(){
    var new_password = document.getElementById('new-password').value;
    var confirm_password = document.getElementById('confirm-password').value;
    if(new_password.length < 6){
        alert("Password too short");
    }else if(new_password != confirm_password){
        alert("password are different");
    }else{
        var xhttp = new XMLHttpRequest();
        var params = new FormData();
        params.append('password',new_password);
        xhttp.open('POST', '/api/update-password', true);
        xhttp.onreadystatechange = (responce) => {
            if(responce.target.readyState == 4 && responce.target.status == 200){
                if(responce.target.response == "ok"){
                    alert("Password updated!");
                }
            }else{
                console.log(responce.target.response);
            }
        }
        xhttp.send(params);
    }
    return false;
}
function getUserButton(){
    $('#login-header').load("/get-user-button2");
    //$('#mobile-login-header').load("/get-user-mobile-button");
}
function getPlaylist(){
    $('.all_play_list').load("/get-all-playlist");
    $('.all_play_list_add').load("/get-all-playlist-add");
}
function reloadHits(){
    $('#hits-videos')
    .load(
        "/get-hits-videos",
        {
            pop:document.getElementById("check-pop").checked,
            rock:document.getElementById("check-rock").checked,
            rhytm:document.getElementById("check-rhytm").checked,
            soul:document.getElementById("check-soul").checked,
            hip_hop:document.getElementById("check-hip_hop").checked,
            reggae:document.getElementById("check-reggae").checked,
            contry:document.getElementById("check-contry").checked,
            folk:document.getElementById("check-folk").checked,
            jazz:document.getElementById("check-jazz").checked,
            eastern:document.getElementById("check-eastern").checked,
            disco:document.getElementById("check-disco").checked,
            classical:document.getElementById("check-classical").checked,
            electronic:document.getElementById("check-electronic").checked,
            children:document.getElementById("check-children").checked,
            vocal:document.getElementById("check-vocal").checked,
            christian:document.getElementById("check-christian").checked,
            ska:document.getElementById("check-ska").checked,
            traditional:document.getElementById("check-traditional").checked
        },
        function (response){
            //console.log(response);
        }
    );
}
function reloadExplore(){ 
    $('#explore-artists')
    .load(
        "/get-explore-artists",
        {
            pop:document.getElementById("check-pop").checked,
            rock:document.getElementById("check-rock").checked,
            rhytm:document.getElementById("check-rhytm").checked,
            soul:document.getElementById("check-soul").checked,
            hip_hop:document.getElementById("check-hip_hop").checked,
            reggae:document.getElementById("check-reggae").checked,
            contry:document.getElementById("check-contry").checked,
            folk:document.getElementById("check-folk").checked,
            jazz:document.getElementById("check-jazz").checked,
            eastern:document.getElementById("check-eastern").checked,
            disco:document.getElementById("check-disco").checked,
            classical:document.getElementById("check-classical").checked,
            electronic:document.getElementById("check-electronic").checked,
            children:document.getElementById("check-children").checked,
            vocal:document.getElementById("check-vocal").checked,
            christian:document.getElementById("check-christian").checked,
            ska:document.getElementById("check-ska").checked,
            traditional:document.getElementById("check-traditional").checked
        },
        function (response){
            //console.log(response);
        }
    );
}
function resetFilters(){
    document.getElementById("check-pop").checked = false;
    document.getElementById("check-rock").checked = false;
    document.getElementById("check-rhytm").checked = false;
    document.getElementById("check-soul").checked = false;
    document.getElementById("check-hip_hop").checked = false;
    document.getElementById("check-reggae").checked = false;
    document.getElementById("check-contry").checked = false;
    document.getElementById("check-folk").checked = false;
    document.getElementById("check-jazz").checked = false;
    document.getElementById("check-eastern").checked = false;
    document.getElementById("check-disco").checked = false;
    document.getElementById("check-classical").checked = false;
    document.getElementById("check-electronic").checked = false;
    document.getElementById("check-children").checked = false;
    document.getElementById("check-vocal").checked = false;
    document.getElementById("check-christian").checked = false;
    document.getElementById("check-ska").checked = false;
    document.getElementById("check-traditional").checked = false;
}
function toggleTagFilter(){
    if(!$("#solo-tag").hasClass("active-tag") && !$("#featuring-tag").hasClass("active-tag")){
        $("#featuring-tag").addClass("active-tag");
        $("#solo-tag").removeClass("active-tag");
        $(".solo-video").css("display", "none");
        $(".featured-video").css("display", "block");
    }else if(!$("#solo-tag").hasClass("active-tag") && $("#featuring-tag").hasClass("active-tag")){
        $("#featuring-tag").removeClass("active-tag");
        $("#solo-tag").addClass("active-tag");
        $(".solo-video").css("display", "block");
        $(".featured-video").css("display", "none");
    }else if($("#solo-tag").hasClass("active-tag") && !$("#featuring-tag").hasClass("active-tag")){
        $("#featuring-tag").removeClass("active-tag");
        $("#solo-tag").removeClass("active-tag");
        $(".solo-video").css("display", "block");
        $(".featured-video").css("display", "block");
    }
}
function openModal(modalId){
    $("#"+modalId).css("display", "block");
    //lockBody('.bws-modal-body');
}
function closeModal(modalId = ""){
    if(modalId == ""){
        $(".bws-modal").css("display", "none");
    }else{
        $("#"+modalId).css("display", "none");
    }
    unlockBody('.bws-modal-body');
}
function createPlayList(){
    var name = $("#new-playlist-name").val();
    $.post("/api/create-playlist", {name:name}, function(result){
        getPlaylist();
        $("#new-playlist-name").val("");
    });
    return false;
}
function openAddToPlaylist(videoId){
    if($('#showProfile').length > 0){
        toPlaylistVideoId = videoId;
        openModal("add-to-playlist-modal");
    }else{
        showSignIn();
    }
}
function addToPlayList(playlistId){
    $.post("/api/add-to-playlist", {play_list_id:playlistId, video_id:toPlaylistVideoId}, function(result){
        getPlaylist();
        closeModal("add-to-playlist-modal");
    });

    // $.ajax(
    //     {
    //         url: "/api/add-to-playlist",
    //         type: "post",
    //         data:{play_list_id:playlistId, video_id:toPlaylistVideoId},
    //         success: function (result){
    //             console.log(result);
    //         },
    //         error: function (result){
    //             console.log(result.responseText);
    //         }
    //     }
    // );
}
function addToNewPlaylist(){
    $.post("/api/add-to-new-playlist", {video_id:toPlaylistVideoId, name:$("#add-new-playlist-name").val()}, function(result){
        getPlaylist();
        closeModal("add-to-playlist-modal");
        $("#add-new-playlist-name").val("");
    });
    return false;
}
function deletePlayListEntry(playlistId, videoId){
    if(confirm("Remove video from PlayList?")){
        $.post("/api/delete-from-playlist", {play_list_id:playlistId, video_id:videoId}, function(result){
            if(result == "ok"){
                updateCurrentPage();
            }
            getPlaylist();
        });
    }
}
function deletePlaylist(playlistId){
    if(confirm("Delete PlayList?")){
        $.post("/api/delete-playlist", {play_list_id:playlistId}, function(result){
            getPlaylist();
            navigateTo("/");
        });
    }
}
function showPlayList(){
    openModal("playlist-modal");
}
function showEmbed(id){
    stopVideo();
    $.post("/api/get-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function showAppleEmbed(id){
    stopVideo();
    $.post("/api/get-apple-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function showSpotifyEmbed(id){
    stopVideo();
    $.post("/api/get-spotify-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function showYoutubeMusicEmbed(id){
    stopVideo();
    $.post("/api/get-youtube-music-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function showTidalEmbed(id){
    stopVideo();
    $.post("/api/get-tidal-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function showDatpiffEmbed(id){
    stopVideo();
    $.post("/api/get-datpiff-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function showAmazonEmbed(id){
    stopVideo();
    $.post("/api/get-amazon-music-embed-code", {id:id}, (result) => {
        $("#embed-content").html(result);
        $("#embed-container").css("display", "flex");
    });
}
function closeEmbed(){
    $("#embed-content").html("");
    $("#embed-container").css("display", "none");
}
function displayAlbum(albumId){
    minimize();
    //openModal("album_content_list");
    //$("#album_content_list .bws-modal-body").html('<div class="pin__lottie-loader"><lottie-player src="https://gist.githubusercontent.com/steinway1/86621d159ac4dac68af6c03db7d8ffd3/raw/f805f7dcb844a24d15a2013248124a46640ae6c9/pinloader.json" background="transparent" speed="1" loop autoplay> </lottie-player> </div>');
    $.post("/album_music_list", {id:albumId}, (result) => {
        $("#album_content_list .bws-modal-body").html(result);
        $("#album_content_list .bws-modal-body img")[0].click();
    });
}
function viewPhoto(photoUrl){
    photoViewerCurrentName = photoUrl;
    openModal("photo-gallery");
    $("#photo-gallery img").attr("src", "/img/gallery/full_size/"+photoUrl);
}
function viewPhoto2(id){
    photoUrl = $("[data-photo-id="+id+"]").attr("data-photo-full-url");
    photoViewerCurrentName = photoUrl;
    openModal("photo-gallery");
    $("#photo-gallery img").attr("src", "/img/gallery/full_size/"+photoUrl);
    $("#photo-gallery .photo-gallery_source").text($("[data-photo-id="+id+"]").attr("data-source0"));
    $("#photo-gallery .photo-gallery_location").text($("[data-photo-id="+id+"]").attr("data-location"));
    $("#photo-gallery .photo-gallery_date-taken").text($("[data-photo-id="+id+"]").attr("data-date-taken"));
    $("#photo-gallery .photo-gallery_dimension").text($("[data-photo-id="+id+"]").attr("data-width")+"X"+$("[data-photo-id="+id+"]").attr("data-height"));
}
function nextPhoto(){
    var currentPhoto = document.querySelector("[data-photo-full-url='"+photoViewerCurrentName+"']");
    var next = currentPhoto.nextElementSibling;
    if(next){
        viewPhoto(next.getAttribute('data-photo-full-url'));
    }
}
function previousPhoto(){
    var currentPhoto = document.querySelector("[data-photo-full-url='"+photoViewerCurrentName+"']");
    var next = currentPhoto.previousElementSibling;
    if(next){
        viewPhoto(next.getAttribute('data-photo-full-url'));
    }
}
function requestForm(){
    $.post( '/api/request-form', $('form#request-form-form').serialize(), function(data) {
       if(data == "ok"){
        closeModal("request-list");
        openModal("request-sent");
       }
      }
   );
    return false;
}
function playAll(){
    $(".discography img")[0].click();
    minimize();
}
function clearNotepad(){
    $('#ersy-notepad-editor-content').html("");
    $(".notepad__control-btn-save").addClass("active");
}
function saveNotepad(){
    $.post("/api/save-note", {note:$('#ersy-notepad-editor-content').html()}, function(result){
        $(".notepad__control-btn-save").removeClass("active");
        console.log(result);
    });
    
}
function switchListGraphView(){
    if($("#choice1").prop("checked")){
        $(".list-view").css("display", "none");
        $(".graph-view").css("display", "block");        
    }else{
        $(".graph-view").css("display", "none");
        $(".list-view").css("display", "block");
    }
}