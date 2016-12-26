$(function() {
    // this will run on DOM ready
    console.log('dom ready');
    console.log(window.location.href);
    var url = window.location.href;
    var sub = url.replace('http://revvid.eu:1337/r/', '');
    $.get("/api/r/" + sub, function(data) {
        console.log(data);
        var player = videojs('my-video', {
            autoplay: true
        });
        // construct playlist
        var length = data.length;
        var s = [];

        for (var i = 0; i < length; i++) {
            var x = {
                sources: [{
                    src: data[i],
                    type: 'video/mp4'
                }]



            };
            s.push(x);
        }
        console.log(s);
        player.playlist(s);

        // Play through the playlist automatically.
        player.playlist.autoadvance(0);


    });

});
