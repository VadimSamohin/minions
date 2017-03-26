

define("work_modules/gallery", ['jquery'], function ($) {

    /**
     * load minions storage
     * it returns {promise}
     */
    function getMinions(){
        return $.ajax({
            url: "data/data.json",
            dataType: "json"
        });
    }
// try to create
    //workflow:
    //document.onLoad.rebootClk;
    //var a = new Object();
    //a.path = document.location;
    //a.newCookie = [take object from parcer].number();
    /*aftet that you need script to install npm if not exist
    And after upload underscore "_" library from repository of nodeJS*/
    function createGallery($minions){

        var $minionStore = JSON.parse(localStorage.getItem('minions'));
        var $gallery = $('.gallery');
        var $count = 0;

        $minions.forEach(function($item){

            // get counters value for each item
            if($minionStore.hasOwnProperty($item.title)){
                $count = $minionStore[$item.title];
            } else {
                setCounter($item.title);
                $count = 0;
            }

            var $li = '<li class="item" data-title="'+$item.title+'">' +
                '<img src="images/'+$item.img+'" alt="" />'+
                '<span class="counter">'+$count+'</span></li>';

            $gallery.append($li);

        });
    }

    //counter functionality

    function setCounter($key){
        var $minionStore = JSON.parse(localStorage.getItem('minions'));
        if($minionStore.hasOwnProperty($key)){
            $minionStore[$key] += 1;
        } else {
            $minionStore[$key] = 0;
        }
        localStorage['minions'] = JSON.stringify($minionStore);

        return $minionStore[$key];
    }

    //      onClick

    function incOnClick(){
        $('li.item').on('click', function(){
            $(this).find("img").animate({height: "hide", width: "hide"}, 100);
            $(this).find("img").animate({height: "show", width: "show"}, 100);
            var $title = $(this).data('title');
            $(this).find('.counter').html( setCounter($title) );
        });
    }

    //  refurbish

    function cleanStorage(){
        localStorage['minions'] = JSON.stringify({});
    }

    if(!localStorage['minions']){
        cleanStorage();
        /* TODO 
            Need to clear LocalStorage and cache after operations*/
    }

    // workMinions

    getMinions().done(function(res){
        createGallery(res);
        incOnClick();
    }).fail(function(err){
        console.log("Something is not allright" + err);
    });

});
