var limits = {
    what: 20,
    others: 30,
    network: 50,
    why: 100,
    who: 100,
    done: 100,
    after: 50
}

function setKey(groupkey) {
    groupkey = groupkey.replace(/[^-_.a-zA-Z0-9%!]/g, '-');
    $(".hero-unit").hide();
    $(".editor").show();
    window.location.hash = "#" + groupkey;
    $("#hashlink").attr("href", window.location.hash);
    for (key in limits) {
        (function(key) {
            var el = document.getElementById(key)
            sharejs.open('knc2012.1-' + groupkey + key, 'text', function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    el.disabled = false;
                    doc.attach_textarea(el);
                }
            });
            $("#" + key).keydown();
        })(key);
    }
}

for (key in limits) {
    (function(key) {
        $("#" + key).keydown(function() {
            var counter = $("#" + key + "count");
            var count = $(this).val().length > 0 ? $.trim($(this).val()).replace(/\s+/g, ' ').split(" ").length : 0;
            if (count > limits[key]) {
                $(this).parent().addClass("error");
            } else {
                $(this).parent().removeClass("error");
            }
            counter.html(count + " / " + limits[key]);
        })
        $("#" + key).keyup(function() { $("#" + key).keydown(); });
    })(key)
    
}
$("#showall").click(function() {
    $("#showallbox").modal();
    $dest = $("#showallbox").find(".modal-body");
    $dest.html("");
    var parts = [];
    for (key in limits) {
        (function(key) {
            console.log($k);
            var $k = $("#" + key);
            $dest.append($("<h3/>").html($k.parent().find("label").html()));
            $dest.append($("<div>").html($k.val().replace(/[\n]/g, "<br />")));
        })(key)
    }
});

$("#keyform").submit(function() {
    setKey($("#key").val());
    return false;
});
if (window.location.hash.length > 1) {
    var key = window.location.hash.substring(1);
    setKey(key);
}

