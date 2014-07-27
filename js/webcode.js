jsonstring_order="["

$("#mytablebody").on("swiperight","tr",function(){
    this.style.backgroundColor='#0F0';
    var table = document.getElementById('mytable');
    var sum=0
    if (jsonstring_order!="["){
        jsonstring_order = jsonstring_order.slice(0,-1)
    }
    for (var r = 1, n = table.rows.length-1; r < n; r++) {
//        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
        //console.log(thisid)

        var quantity = 1
        var price = Number(this.cells[2].innerHTML)
        var name = this.cells[1].innerHTML
        sum += (quantity * price).toFixed(2)
        if (quantity != 0) {

            // Find a <table> element with id="myTable":
            jsonstring_order += ']'
            order_array = JSON.parse(jsonstring_order)
            var exist = 0
            for (x in order_array){
                if (order_array[x]["name"] == name){
                    order_array[x]["quantity"]+=1;
                    exist = 1;
                    jsonstring_order = JSON.stringify(order_array)
                    jsonstring_order=jsonstring_order.slice(0,-1)
                    break;
                }
            }
           // console.log(jsonstring_order)
            if (exist==0){
                jsonstring_order=jsonstring_order.slice(0,-1)
                if ( jsonstring_order != "[" ){
                    jsonstring_order += ","
                }
                console.log("lol")
                jsonstring_order += '{"name":"' + name +'","quantity":'+quantity+ ',"price":'+price +'}'
            } 
            
            //alert(jsonstring_order)
        }
    }
    jsonstring_order+=']'
    //console.log(jsonstring_order)
    order_array = JSON.parse(jsonstring_order)

    
    var table = document.getElementById("ordertable");
    tbody = table.getElementsByTagName("tbody")[0];

    tbody.innerHTML = ""
    total_amount = 0
    for (x in order_array){

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = tbody.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        // Add some text to the new cells:
        cell1.innerHTML = "id"
        cell2.innerHTML = order_array[x]["name"];
        orderprice = (order_array[x]["quantity"]*order_array[x]["price"]).toFixed(2);
        cell3.innerHTML = orderprice
        cell4.innerHTML = order_array[x]["quantity"];  
        total_amount += Number(orderprice)
    }
    var row = tbody.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    //console.log(total_amount)
    cell1.innerHTML = "Tax"
    cell3.innerHTML = (Number(total_amount)*0.0625).toFixed(2)
    var row = tbody.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "Total"
    cell3.innerHTML = (total_amount*1.0625).toFixed(2)
    document.getElementById('searchbar').focus();
    document.getElementById('searchbar').value = ""
    table = document.getElementById('mytable');
    //table.rows[indexarray[(cursor_pos)%indexarray.length]].style.background = "#FFFFFF";
    cursor_pos = 0
    clearit();
});
$("#mytable").on("swipeleft","#searchbar",function(){
  clearit();
  menustring = '[]'
  loadtable();
});
$("#mytablebody").on("touchstart","tr",function(){
    document.getElementById("searchbar").blur();
});


$("#mytablebody").on("swipeleft","tr",function(){
  this.style.backgroundColor='#F00';
  clearit();
});
$("#mytablebody").on("touchend","tr",function(){
  this.style.backgroundColor='#FFF';
});


function addorder(){
    var table = document.getElementById('mytable');
    var sum=0
    if (jsonstring_order!="["){
        jsonstring_order = jsonstring_order.slice(0,-1)
    }
    for (var r = 1, n = table.rows.length-1; r < n; r++) {
//        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
        var thisid = "course_quant"+r
        //console.log(thisid)

        var quantity = document.getElementById(thisid).value
        var price = Number(table.rows[r].cells[2].innerHTML)
        var name = table.rows[r].cells[1].innerHTML
        sum += (quantity * price).toFixed(2)
        if (quantity != 0) {

            // Find a <table> element with id="myTable":
            jsonstring_order += ']'
            order_array = JSON.parse(jsonstring_order)
            var exist = 0
            for (x in order_array){
                if (order_array[x]["name"] == name){
                    order_array[x]["quantity"]= quantity;
                    exist = 1;
                    jsonstring_order = JSON.stringify(order_array)
                    jsonstring_order=jsonstring_order.slice(0,-1)
                    break;
                }
            }
           // console.log(jsonstring_order)
            if (exist==0){
                jsonstring_order=jsonstring_order.slice(0,-1)
                if ( jsonstring_order != "[" ){
                    jsonstring_order += ","
                }
                jsonstring_order += '{"name":"' + name +'","quantity":'+quantity+ ',"price":'+price +'}'
            } 
            
            //alert(jsonstring_order)
        }
    }           
    jsonstring_order+=']'
    //console.log(jsonstring_order)
    order_array = JSON.parse(jsonstring_order)

    
    var table = document.getElementById("ordertable");
    tbody = table.getElementsByTagName("tbody")[0];

    tbody.innerHTML = ""
    total_amount = 0
    for (x in order_array){

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = tbody.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        // Add some text to the new cells:
        cell1.innerHTML = "id"
        cell2.innerHTML = order_array[x]["name"];
        orderprice = (order_array[x]["quantity"]*order_array[x]["price"]).toFixed(2);
        cell3.innerHTML = orderprice
        cell4.innerHTML = order_array[x]["quantity"];  
        total_amount += Number(orderprice)
    }
    var row = tbody.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    //console.log(total_amount)
    cell1.innerHTML = "Tax"
    cell3.innerHTML = (Number(total_amount)*0.0625).toFixed(2)
    var row = tbody.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "Total"
    cell3.innerHTML = (total_amount*1.0625).toFixed(2)
    document.getElementById('searchbar').focus();
    document.getElementById('searchbar').value = ""
    table = document.getElementById('mytable');
    //table.rows[indexarray[(cursor_pos)%indexarray.length]].style.background = "#FFFFFF";
    cursor_pos = 0
}

function genqrcode(){
    var table = document.getElementById('mytable');
    sum=0
    prompt_array = JSON.parse(jsonstring_order);
    for (x in prompt_array) {
        //console.log(thisid)
        quantity = prompt_array[x]["quantity"]
        price = prompt_array[x]["price"]
        name = prompt_array[x]["name"]
        sum += quantity * price
    }
    prompt_array = JSON.parse(jsonstring_order);
    prompt = "Dear Customer, <br><br>You ordered <br><br>"
    for (x in prompt_array) {
    	prompt += prompt_array[x]["quantity"] + ' ' + prompt_array[x]["name"] + '<br>'
    }
    tax = Number((sum * 0.0625).toFixed(2));
    sum += tax
    sum = sum.toFixed(2)
    prompt += "<br>the total is: " + sum + ".<br> Please scan the QR code below to pay<br>"
    document.getElementById("confirmation").innerHTML = prompt
    //query = 'https://venmo.com/?txn=pay&recipients=ray-xiao&amount='+sum+'&note=nice food!! We had '+prompt_array["quantity"] + ' awesome ' + prompt_array["name"] +'!!Yummy!!&audience=private'

    query = 'https://venmo.com/?txn=pay&recipients=ray-xiao&amount='+sum+'&note=YummyAtRaysSteakHouse&audience=private'
    //    console.log(query)
    query = encodeURIComponent(query)
    qr = '<img src = "https://api.qrserver.com/v1/create-qr-code/?data='
    qr += query
    qr += '&size=200x200" height = 200 width = 200>'
    document.getElementById("qrcode").innerHTML = qr
    //alert(sum)
}

cursor_pos = 0

document.getElementById("searchbar").addEventListener("paste", function(event) {
    //console.log("paste");

});
document.addEventListener("keydown", function(event) {
    if(event.keyCode == 9) {
        event.preventDefault();
    }

});
document.getElementById("searchbar").addEventListener("keyup", function(event) {
    //console.log("keyup");

    if (event.keyCode != 38 && event.keyCode != 40){
        searchstring = document.getElementById('searchbar').value
        //console.log(searchstring)
        totalmenu_array = JSON.parse(totalmenustring)
        //console.log(totalmenustring)
        menustring = '['
        if (searchstring !="") {
            for (x in totalmenu_array) {
                if((totalmenu_array[x]["name"].toLowerCase()).indexOf(searchstring.toLowerCase()) > -1) {
                    if(menustring != "["){
                        menustring+=","
                    }
                    newchild = '{"name":"'+totalmenu_array[x]["name"]+'", "price":'+totalmenu_array[x]["price"]+' }'
                    menustring +=newchild
                    //console.log("here: "+menustring)
                }       
            }

            menustring+=']'
            //console.log(menustring)
            loadtable();
            cursor_pos=0
        } else {
            menustring = '[]'
            loadtable();
        }
    }
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13 && event.ctrlKey) {
        //console.log("up")
        genqrcode();
    }
});
document.getElementById("mytable").addEventListener("keydown", function(event) {
    if (event.keyCode == 38 ) {
        //console.log("down")
        keyup();
    }
    else if (event.keyCode == 40 ) {
        //console.log("up")
        keydown_render();
    }
    else if (event.keyCode == 13) {
        //console.log("up")
        addorder();
    }
    else {

    }
});     

virgin = 1

function keyup(){
        //console.log(thisid)

        cursor_pos--;

        var table = document.getElementById("mytable");
        var tableheight = table.rows.length;
        var indexarray = [];
        //console.log(tableheight)
        for (var i = 0; i < tableheight; i++){
            //if(i!=1) {
            indexarray.push(i);
            //}
        }
        //console.log(indexarray)
        while(cursor_pos<0){
            cursor_pos+=tableheight-1;
        }
        //console.log("cursor_pos:" + cursor_pos)
        //table.rows[(indexarray[cursor_pos+1])%(indexarray.length)].style.background = "#FFFFFF";
        //table.rows[(indexarray[cursor_pos])%(indexarray.length)].style.background = "#FFBF00";
        if(indexarray.length>1){
            if(cursor_pos%indexarray.length==0){
                focusthis ="searchbar"
                table.rows[indexarray[cursor_pos%indexarray.length]].style.background = "#FFBF00";
                table.rows[indexarray[(cursor_pos+1)%indexarray.length]].style.background = "#FFFFFF";                

            } else {
                focusthis = "course_quant" + ((cursor_pos%(indexarray.length)))
                table.rows[indexarray[cursor_pos%indexarray.length]].style.background = "#FFBF00";
                table.rows[indexarray[(cursor_pos+1)%indexarray.length]].style.background = "#FFFFFF";
            }
        } else {
            focusthis ="searchbar"
            cursor_pos++
            table.rows[indexarray[cursor_pos%indexarray.length]].style.background = "#FFBF00";
        }
        document.getElementById(focusthis).focus();
}
function keydown_render(){
    //console.log(thisid)

    cursor_pos++;

    var table = document.getElementById("mytable");
    var tableheight = table.rows.length;
    var indexarray = [];
    //console.log(tableheight)
    for (var i = 0; i < tableheight; i++){
        //if(i!=1) {
            indexarray.push(i);
        //}          
    }
    //console.log(indexarray)
    while(cursor_pos<0){
        cursor_pos+=tableheight-1;
    }
   // console.log("cursor_pos:" + cursor_pos)
    //table.rows[(indexarray[cursor_pos+1])%(indexarray.length)].style.background = "#FFFFFF";
    //table.rows[(indexarray[cursor_pos])%(indexarray.length)].style.background = "#FFBF00";
    if(indexarray.length>1){
        if(cursor_pos%indexarray.length==0){
            focusthis ="searchbar"
            table.rows[indexarray[cursor_pos%indexarray.length]].style.background = "#FFBF00";
            table.rows[indexarray[(cursor_pos-1)%indexarray.length]].style.background = "#FFFFFF"; 
        } else {
            focusthis = "course_quant" + ((cursor_pos%(indexarray.length)))
            table.rows[indexarray[cursor_pos%indexarray.length]].style.background = "#FFBF00";
            table.rows[indexarray[(cursor_pos-1)%indexarray.length]].style.background = "#FFFFFF"; 
        }
    } else {
        focusthis ="searchbar"
        cursor_pos--
        table.rows[indexarray[cursor_pos%indexarray.length]].style.background = "#FFBF00";
    }
    document.getElementById(focusthis).focus();

}

totalmenustring = '[{"name":"Chicken Noodle Soup","price":3.25},{"name":"Hot and Sour Soup","price":3.25},{"name":"Miso Soup (vegetarian soup) Tofu, scallion and seaweed","price":2.55},{"name":"Mushroom Soup","price":2.55},{"name":"Seafood Soup (Lg.)","price":7.95},{"name":"Black Pepper Tuna Tataki","price":11.75},{"name":"Ocean Treasure","price":8.95},{"name":"Seafood Island","price":8.25},{"name":"Spicy Tuna Bowl","price":8.95},{"name":"Sushi Sandwich","price":11.95},{"name":"Sushi Sashimi Sampler","price":9.75},{"name":"Tuna Tartar","price":10.5},{"name":"Yellowtail Jalapeno","price":10.95},{"name":"Edamame Steamed green soy bean","price":4.25},{"name":"Shao Mai Fried shrimp and crab dumplings","price":5.75},{"name":"Peking Ravioli Pan fried pork dumplings","price":6.25},{"name":"Fried Calamari Fried squids","price":7.95},{"name":"Soft Shell Crab Deep fried","price":8.5},{"name":"Vegetable Spring Rolls Fried","price":3.95},{"name":"Crab Rangoons Fried crab, cream cheese","price":5.95},{"name":"Crispy Tofu Deep fried tofu","price":5.5},{"name":"Miso Eggplant Fried with miso dressing","price":5.75},{"name":"Beef Teriyaki on skewer","price":8.25},{"name":"Scallion Pancake Fried","price":4.75},{"name":"Chicken Wings Fried","price":6.95},{"name":"Chicken Fingers Fried","price":7.95},{"name":"Mixed Vegetable Tempura","price":6.25},{"name":"Shrimp & Vegetable Tempura","price":8.95},{"name":"Pu Pu Platter For 2","price":16.95},{"name":"Steamed Chicken with mixed vegetables","price":10.75},{"name":"Steamed Jumbo Shrimp with mixed vegetables","price":13.25},{"name":"Steamed Mixed Vegetables","price":9.25},{"name":"Avocado Salad","price":5.75},{"name":"Crabmeat Salad","price":5.95},{"name":"House Salad Lettuce, cucumber and carrot with ginger dressing","price":4.5},{"name":"Rainbow Salad","price":9.5},{"name":"Salmon Skin Salad","price":6.5},{"name":"Seaweed Salad","price":5.45},{"name":"Spicy Pork in Garlic Sauce ","price":10.95},{"name":"Stir-Fried Spicy Onion Pork ","price":11.5},{"name":"Twice Cooked Pork","price":10.95},{"name":"Chicken with Broccoli Brown sauce","price":7.45},{"name":"Beef with Broccoli Brown sauce","price":7.95},{"name":"General Gau s Chicken Ginger spicy sauce","price":7.95},{"name":"Jumbo Shrimp with Vegetables","price":7.95},{"name":"Sautéed String Beans with Pork","price":7.95},{"name":"Sesame Chicken Honey sesame sauce","price":7.95},{"name":"Singapore Rice Noodle ","price":7.55},{"name":"Spicy Chicken with Peanut ","price":7.45},{"name":"Vegetables  Delight White sauce","price":6.55},{"name":"Wok-fried Tofu in garlic sauce","price":6.95},{"name":"Bento A","price":10.75},{"name":"Bento B Seaweed salad, shrimp and vegetable tempura, California roll and white rice","price":0.12},{"name":"Bento C General Gau s chicken, white rice, California roll and house salad","price":13.95},{"name":"Bento D Pork fried rice, crab rangoon, spicy tuna roll and house salad","price":13.95},{"name":"Crispy Jumbo Shrimp with Vegetables","price":12.95},{"name":"Golden Fried Shrimp Ball","price":11.95},{"name":"Jumbo Shrimp with Broccoli","price":13.5},{"name":"Jumbo Shrimp with Stir-Fried String Beans","price":13.5},{"name":"Mango Jumbo Shrimp","price":13.5},{"name":"Scallops in Homemade Wine Sauce","price":14.5},{"name":"Spicy Coconut Shrimp ","price":13.5},{"name":"Spicy Jumbo Shrimp in Garlic Sauce ","price":13.5},{"name":"Spicy Scallops in Garlic Sauce ","price":14.5},{"name":"Seafood Tempura","price":19.95},{"name":"Shrimp and Vegetable Tempura","price":15.95},{"name":"Shrimp Tempura only with tempura sauce","price":14.95},{"name":"Vegetables Tempura","price":11.45},{"name":"Chicken Katsu with broccoli","price":13.75},{"name":"Shrimp Katsu with broccoli","price":16.45},{"name":"Dry Sautéed String Bean with tofu","price":9.75},{"name":"Chinese Eggplant in Garlic Sauce ","price":9.75},{"name":"Family Style Tofu Fried tofu with vegetables in sweet and spicy sauce","price":9.95},{"name":"Stir-Fried Fresh Vegetables","price":10.25},{"name":"Stir-Fried Green Napa Chinese cabbage","price":11.25},{"name":"Szechuan Spicy Tofu (Spicy ma po tofu)","price":9.5},{"name":"Wok-Fried Tofu in garlic sauce","price":9.75},{"name":"Sashimi Lunch 8pcs. assorted raw ﬁsh","price":12.95},{"name":"Sushi Lunch 4pcs. assorted sushi and California","price":9.5},{"name":"Sushi Sashimi Lunch 4pcs. sushi, 4pcs. sashimi and spicy tuna roll","price":14.95},{"name":"Curry Fried Rice ","price":8.95},{"name":"Fried Rice","price":8.35},{"name":"House Fried Rice","price":9.5},{"name":"Thai Pineapple Fried Rice","price":9.95},{"name":"Choose any 2 Every roll cut by 6pcs","price":9.5},{"name":"Choose any 3 Every roll cut by 6pcs","price":13.95},{"name":"Coke","price":1.35},{"name":"Diet Coke","price":1.35},{"name":"Sprite","price":1.35},{"name":"Ginger Ale","price":1.35},{"name":"Chicken with Broccoli","price":10.75},{"name":"Chicken with Cashew Nuts","price":10.75},{"name":"Dragon and Phoenix","price":12.95},{"name":"General Gau s Chicken ","price":12.25},{"name":"Mango Chicken","price":12.25},{"name":"Orange Flavor Chicken Light coating chunk chicken","price":12.25},{"name":"Sesame Chicken","price":12.25},{"name":"Spicy Basil Chicken With ginger and rice wine sauce","price":11.75},{"name":"Spicy Coconut Chicken ","price":10.95},{"name":"Szechuan Spicy Chicken With peanuts","price":10.95},{"name":"Curry Lo Mein Choice of chicken, beef, pork, shrimp, vegetables","price":8.95},{"name":"Lo Mein Choice of chicken, beef, pork, shrimp, vegetables","price":8.55},{"name":"House Lo Mein","price":9.25},{"name":"Pad Thai (peanut)","price":10.75},{"name":"Seafood Curry Udon Noodles with shrimp and scallops","price":10.95},{"name":"Singapore Rice Noodle ","price":9.95},{"name":"Stir-Fried Rice Stick","price":10.95},{"name":"Tempura Udon Soup","price":12.95},{"name":"Beef with Broccoli","price":11.25},{"name":"Beef with String Beans Ginger sauce","price":11.25},{"name":"Black Pepper Steak Light coating steak","price":13.5},{"name":"Hawaiian Special Beef","price":11.75},{"name":"Orange Flavored Beef Light coating steak","price":13.5},{"name":"Szechuan Spicy Beef with peanuts","price":11.25},{"name":"Beef with Sesame Light coating steak with chef sesame sauce","price":13.5},{"name":"Three Delights ","price":13.95},{"name":"Fried Banana","price":3.5},{"name":"Fried Cheese Cake","price":4.95},{"name":"Steamed Brown Rice","price":1.45},{"name":"Steamed White Rice","price":1.45},{"name":"Sushi Rice","price":2},{"name":"Black Pepper Tuna 6.50 Sea Urchin with quail egg","price":7.95},{"name":"Flying Fish Roe (Caviar) Tobiko 4.85 Sea Urchin Uni","price":6.95},{"name":"Flying Fish Roe with quail egg 5.95 Spicy Scallop","price":6.75},{"name":"Mackerel Saba 4.95 Spicy Tuna with quail egg","price":6.45},{"name":"Red Clam Hokkigai 4.95 Squid Ika","price":4.5},{"name":"Red Snapper Tai 4.85 Tuna maguro","price":5.95},{"name":"Salmon Sake 5.25 Yellowtail Hamachi","price":5.5},{"name":"Salmon Roe Ikura 5.25 White Tuna Shiro Maguro","price":5.5},{"name":"Crab Stick Kani 3.95 Octopus Tako","price":4.5},{"name":"Eel Unagi 5.50 Shrimp Ebi","price":4.5},{"name":"Egg Tamago 3.95 Smoked Salmon","price":4.5},{"name":"Tofu Skin Inari","price":3.95},{"name":"Sushi Regular 6pcs. assorted sushi and California roll","price":14.95},{"name":"Sushi Deluxe 10pcs. assorted sushi and salmon avocado roll","price":21.95},{"name":"Sushi for Two 20pcs. assorted sushi with spicy tuna roll and French roll","price":49.95},{"name":"Sushi for Three 30pcs. assorted sushi with sexy girl roll and green dragon roll","price":75.95},{"name":"Salmon Combo 3pcs. salmon sushi and salmon avocado roll","price":11.55},{"name":"Tuna Combo 3pcs. tuna sushi and tuna cucumber roll","price":11.55},{"name":"American Sushi Platter 3pcs. tuna, 3pcs. salmon and 3pcs. yellowtail sushi","price":18.95},{"name":"Trio Sashimi 5pcs.tuna, 5pcs. salmon and 5pcs. yellowtail of raw ﬁsh","price":29.95},{"name":"Sashimi Combo 8pcs.assorted raw ﬁsh","price":17.5},{"name":"Sashimi Regular 15pcs. assorted raw ﬁsh","price":24.95},{"name":"Sashimi Deluxe 21pcs. assorted raw ﬁsh","price":32.95},{"name":"Sushi and Sashimi Combo for One","price":23.95},{"name":"Sushi and Sashimi for Two","price":49.95},{"name":"Sushi and Sashimi for Three 15pcs. assorted sushi,","price":75.95},{"name":"Sushi Vegetarian Platter 8pcs. sushi: 4pcs. avo., 4pcs. inari and peanut avo. roll","price":15.95},{"name":"Makimono Combo 24pcs. Spicy tuna roll, salmon avocado roll,","price":21.95},{"name":"Spicy Roll Combo ","price":24.95},{"name":"Tuna and Salmon Chirashi 4pcs. tuna and 4pcs. salmon on sushi rice","price":17.95},{"name":"Salmon Don 8pcs. salmon on sushi rice","price":17.75},{"name":"Tuna Don 8pcs. tuna on sushi rice","price":18.95},{"name":"Unagi Don 8pcs. eel on sushi rice","price":15.95},{"name":"Yellowtail Don 8 yellowtail on sushi rice","price":19.95},{"name":"Asparagus Roll Seaweed outside","price":3.95},{"name":"Avocado Roll Seaweed outside","price":3.95},{"name":"Cucumber Roll Seaweed outside","price":3.95},{"name":"AAC Roll Avocado, asparagus, cucumber","price":4.95},{"name":"Avocado and Cream Cheese Roll","price":4.95},{"name":"Avocado and Cucumber Roll","price":4.95},{"name":"Peanut Avocado Roll","price":4.5},{"name":"Sunshine Roll Cucumber, avocado, lemon","price":4.95},{"name":"Sweet Potato Roll Deep fried crispy","price":4.5},{"name":"Vegetable Dragon Maki Asparagus, cucumber and yamagobo,","price":7.55},{"name":"Vegetable Tempura Roll (5 pcs.) Deep fried broccoli and sweet potato","price":5.75},{"name":"Veggie Roll (5pcs.) Avocado, asparagus, lettuce, cucumber, yellow pickle","price":5.95},{"name":"Rainbow Naruto Tuna, salmon, yellowtail, avocado, caviar and scallion","price":12.95},{"name":"Salmon Naruto With avocado and crabmeat","price":11.75},{"name":"Spicy Tuna Naruto With avocado and crunchy","price":12.5},{"name":"Tuna Naruto With avocado and crabmeat","price":11.75},{"name":"Eel Lover Naruto Eel and Avocado","price":12.75},{"name":"White Snow Naruto Crabmeat, mayo, crunchy and sesame seed","price":11.75},{"name":"Amazing Maki (fried)","price":12.95},{"name":"Black Dragon Eel, crabmeat, cucumber and eel on the top","price":11.65},{"name":"Batman Roll Crabmeat, cucumber and avocado, with peanut sauce on top","price":6.35},{"name":"Boston Roll (5pcs) Shrimp, cucumber, avocado, lettuce, asparagus and mayo","price":6.35},{"name":"California Roll Crabmeat, cucumber and avocado","price":4.95},{"name":"Spicy California Roll ","price":5.55},{"name":"Caterpillar Maki Crabmeat, cucumber, avocado, topped with eel and avocado","price":10.75},{"name":"Chicken Tempura Roll (5pcs)","price":7.75},{"name":"Crab Roll with mayo, crunchy and avocado","price":5.95},{"name":"Dinosaur Maki (fried) Deep fried crabmeat, avocado, crunchy and asparagus,","price":15.95},{"name":"Eel Avocado Roll","price":6.5},{"name":"Eel Cucumber Roll","price":6.5},{"name":"Fantasy Roll (6pcs.) Shrimp tempura, topped with grilled crabmeat,","price":12.95},{"name":"French Roll Shrimp tempura, avocado, crebmeat, cucumber and eel sauce","price":7.95},{"name":"Kamikaze Maki","price":11.35},{"name":"Komodo Dragon Maki (10pcs.) Shrimp tempura and avocado,","price":12.95},{"name":"Mango Shrimp Roll","price":6.35},{"name":"Manhattan Box (Sushi cake/5pcs.) Spicy crabmeat salad, crunchy in the","price":12.45},{"name":"Philadelphia Roll Smoked salmon, cream cheese and cucumber","price":6.95},{"name":"Pineapple Roll Pineapple, smoked salmon and cream cheese","price":7.75},{"name":"Red Sox Maki (10pcs.) Shrimp tempura, avocado, crabmeat and","price":12.95},{"name":"Salmon Skin Roll with yamagobo, salmon skin, cucumber and avocado","price":6.55},{"name":"Samurai Maki (10pcs.) Eel, cucumber, cream cheese and crunchy,","price":12.95},{"name":"Scorpion Roll Deep fried squid, cucumber, avocado and spicy mayo","price":8.35},{"name":"Shrimp Avocado Roll","price":5.55},{"name":"Spicy Shrimp Roll with spicy mayo, cucumber","price":5.95},{"name":"Spicy Shrimp Asparagus Roll ","price":6.25},{"name":"Shrimp Crab Roll Shrimp, crunchy, crabmeat and avocado","price":6.95},{"name":"Shrimp Tempura Roll","price":8.95},{"name":"Spicy Spider Maki (peanut/10pcs)","price":12.95},{"name":"Taipei Tokyo Maki (10pcs.) Deep fried shrimp tempura, avocado,","price":13.55},{"name":"Alaska Roll Salmon, avocado and cucumber","price":6.95},{"name":"Angels  Dream Maki (10pcs)","price":13.75},{"name":"Atlantic Meets Paciﬁc Maki (10pcs.)","price":15.95},{"name":"Crazy Maki (5pcs.) Shrimp tempura, cucumber, avocado, caviar and spicy mayo","price":8.95},{"name":"Crazy Salmon Maki Spicy salmon, avocado and crunchy,","price":12.95},{"name":"Dancing Eel Maki ","price":12.75},{"name":"Davis Square Box (5pcs.) Spicy tuna, crunchy in the middle","price":11.75},{"name":"Dragon Fly Maki Spicy tuna, eel and crunchy, w. avocado and red caviar on top","price":12.95},{"name":"Futo Roll (5pcs.)","price":8.95},{"name":"Fire Dragon Maki ","price":11.25},{"name":"Green Dragon Maki Cucumber, eel and crabmeat, topped with avocado and caviar","price":11.25},{"name":"Godzilla Maki (fried/10pcs.) Deep fried spicy tuna, avocado, asparagus","price":14.95},{"name":"James Bond 007 Maki Spicy crunchy tuna, topped with","price":12.95},{"name":"Orange Roll Orange, Tuna and Avocado","price":7.75},{"name":"Out of Control Maki Yellowtail, avocado and crunchy,","price":12.45},{"name":"Mexican Roll Tuna, spicy mayo and red chili pepper outside","price":6.35},{"name":"Ninja Roll Deep fried crabmeat, mayo, brown sauce on top and caviar","price":6.75},{"name":"Rainbow Maki","price":11.95},{"name":"Rock-N-Roll Scallop, avocado, crabmeat, crunchy, spicy mayo and caviar","price":8.75},{"name":"Sakura Maki","price":13.95},{"name":"Salmon Avocado Roll","price":6.75},{"name":"Salmon Jalapeno Roll","price":6.5},{"name":"Salmon Roll Seaweed outside","price":5.75},{"name":"Sexy Girl Maki (10pcs.) Spicy tuna, crunchy, avocado,","price":13.95},{"name":"Somerville Maki (10pcs.) Yellowtail, tuna, salmon, eel, avocado,","price":11.95},{"name":"Spicy Girl Maki (peanut) ","price":11.95},{"name":"Spicy Salmon Roll with avocado","price":6.95},{"name":"Spicy Tuna Roll with cucumber","price":6.95},{"name":"Spicy Yellowtail Roll with cucumber","price":6.95},{"name":"Spider Maki Deep fried soft shell crab, cucumber, avocado, spicy mayo and caviar","price":11.45},{"name":"Tiger Maki (10pcs.) Spicy tuna, avocado and crunchy,","price":13.75},{"name":"Tuna Avocado Roll","price":6.35},{"name":"Tuna RollSeaweed outside","price":6.35},{"name":"Volcano Maki Crabmeat, avocado, caviar, eel, spicy mayo and spicy tuna on top","price":10.75},{"name":"Yellowtail Cucumber Roll with cucumber, scallion","price":5.95},{"name":"Yellowtail Roll Seaweed outside, scallion","price":5.75},{"name":"Bento A Salad, California roll, shrimp and vegetable tempura, orange, rice and miso soup","price":16.95},{"name":"Bento B California roll, crab rangoon, shrimp and vegetable tempura,","price":18.95}]'
//totalmenustring = '[{"name":"Kung Pao Chicken","price":10}, {"name":"Spicy Chicken","price":12},{"name":"Salmon","price":100},{"name":"Unit","price":1}]'
//menustring = '[{"name":"Salad","price":10}, {"name":"Shit","price":12},{"name":"Fuck you","price":100}]'
function loadtable(){
    //console.log(menustring)
    menu_array = JSON.parse(menustring)
    var table = document.getElementById("mytable");
    tbody = table.getElementsByTagName("tbody")[0];

    tbody.innerHTML = ""
    total_amount = 0
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    for (x in menu_array){

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = tbody.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        //console.log(menu_array[x])
        // Add some text to the new cells:
        cell1.innerHTML = x
        cell2.innerHTML = menu_array[x]["name"];
        menuprice = menu_array[x]["price"];
        cell3.innerHTML = menuprice
        //console.log(menuprice)
        thisinputbox = 'course_quant' + (Number(x) + 1)
        //console.log(thisinputbox) 
        cell4.innerHTML =  width>640 ? '<input id="'+thisinputbox + '">' : ''
        //total_amount += menuprice
    }
}
