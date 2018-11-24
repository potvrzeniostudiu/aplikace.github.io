
if('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('sw.js');
        console.log("Funguje");
    } catch (error) {
        console.log("nefunguje");
    }
}

$( document ).ready(function() {

    $.backstretch("images/background-clouds.gif");

    var server = "http://api.openweathermap.org/data/2.5/forecast?q="
    var api_klic = "&APPID=afb6e76426a0802ed7f8dcdb42900eab&units=metric"


    function vyprazdnit() {
        $("#error_message").empty();
        $(".results").children().empty();
        $(".graph_one").empty();
    }

    $('#odeslat').click(function() {
        mesto = $('#mesto').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": server + mesto + api_klic,
            "method": "GET",
            error: function(e) {
                vyprazdnit();
                $("#error_message").append("Nenalezeno");
            }
          }
    
        $.ajax(settings).done(function (response) {
            
            vyprazdnit();

            obdobi = $("#predpoved").val();
            var i;
            for (i = 0; i < obdobi; i++) {
                $(".graph_one").append("<div></div>");
                var vyska = 10*(response.list[i].main.temp);
                $(".graph_one div").eq(i).css( "height", vyska + "px" );
            }

            sirka_grafu = ($(".container").width()/$(".graph_one div").length);
            $(".graph_one div").css( "width", sirka_grafu-2 + "px" );

            //osetrit na zadanou dobu + prazdne = defaultne 0 (aktualni)

            //NASTAVENI     //.serializeArray
            //teplota
            if($("#teplota_radio").is(":checked") === true) {
                teplota = (response.list[0].main.temp); 
                $("#teplota").append("Teplota v " + mesto + " je právě " + teplota + "°C");
            }

            //vlhkost
            if($("#vlhkost_radio").is(":checked") === true) {
                vlhkost = (response.list[0].main.humidity);
                $("#vlhkost").append("Vlhkost v " + mesto + " je právě " + vlhkost);
            }

            //min. teplota
            if($("#min_teplota_radio").is(":checked") === true) {
                min_temp = (response.list[0].main.temp_min);
                $("#min-temp").append("Min. teplota v " + mesto + " je právě " + min_temp + "°C");
            }

            //max. teplota
            if($("#max_teplota_radio").is(":checked") === true) {
                max_temp = (response.list[0].main.temp_max);
                $("#max-temp").append("Max. teplota v " + mesto + " je právě " + max_temp + "°C");
            }

            //tlak
            if($("#tlak_radio").is(":checked") === true) {
                tlak = (response.list[0].main.pressure);
                $("#tlak").append("Tlak v " + mesto + " je právě " + tlak);
            }

            //vitr
            if($("#vitr_radio").is(":checked") === true) {
                vitr = (response.list[0].wind.speed);
                $("#vitr").append("Vitr v " + mesto + " je právě " + vitr);
            }

            var selection = $(".results");
            console.log(selection);

            /*
            var map;
            function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: sirka, lng: vyska},
                zoom: 8
                });
            }*/


        });
    });


    //pridat zarazovani vysledku

    $('.favorite_button').click(function() {
        if($("#error_message").not(":contains(Nenalezeno)") || $(".results").children().not(":empty")) { //opravit na pokud div obsahuje jakekoliv charactery
            var d = new Date();
            var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

            $(".vypis_okno").append("<span> Teplota v " + mesto + " je právě " + teplota + "°C </span><br>");
            $(".vypis_okno").append("<span> Vlhkost v " + mesto + " je právě " + vlhkost  + "</span><br>");
            $(".vypis_okno").append("<span> Min. teplota v " + mesto + " je právě " + min_temp + "°C </span><br>");
            $(".vypis_okno").append("<span> Max. teplota v " + mesto + " je právě " + max_temp + "°C </span><br>");
            $(".vypis_okno").append("<span> Tlak v " + mesto + " je právě " + tlak + "</span><br>");
            $(".vypis_okno").append("<span> Vitr v " + mesto + " je právě " + vitr + "</span><br>");
            $(".vypis_okno").append($( "</br>" ) );
            $(".vypis_bar").append(time);
        } else {
            return;
        }
    });

    $( window ).resize(function() {
        sirka_grafu = ($(".container").width()/$(".graph_one div").length);
        $(".graph_one div").css( "width", sirka_grafu-2 + "px" );
    });

    //$("#tab") //check if has class a pak odebere a prida ty na kterou se kliklo

    //pridat mazani vysledku

    $('.vypis_zobrazit').click(function() {
        $(".vypis_okno").toggle("slow");
    });


    $('.nastaveni').click(function() {
        $(this).toggleClass("nastaveni_rotate nastaveni_transition");
        $(".nastaveni_panel").toggle("slow");
    }); 
});
