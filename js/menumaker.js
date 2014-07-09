document.getElementById("menuload").addEventListener("click", function(event) {
    menu = document.getElementById("menubox").value;
    menu_list = menu.split('\n');
    menu_text = "";
    len = menu_list.length;
    menu_json = []
    for (var i = 0; i < len; i++){
        item = menu_list[i];
        item_list = item.split(' ');
        item_len = item_list.length;
        var price = parseFloat(item_list[item_len - 1].replace(/[A-Za-z]* */g,'')); 
        if (!isNaN(price)){
            var name = "";
            var n = "";
            for (var j = 0; j < item_len - 1; j++){
                n = item_list[j].replace(/ *\** */g,'');
                n = n.replace('\'',' ');
                name += n;
                if (j != item_len -2 && n.length > 0 ){
                    name += " ";
                }
            }
            menu_json.push({"name":name,"price":price});
        }
    }
    menu_text = JSON.stringify(menu_json);
    document.getElementById("menubox").value = menu_text;
});