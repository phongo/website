jsonstring_order="["
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

        var price = Number(table.rows[r+1].cells[2].innerHTML)

        var name = table.rows[r+1].cells[1].innerHTML

        sum += quantity * price

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
            console.log(jsonstring_order)
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
    console.log(jsonstring_order)
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
        orderprice = order_array[x]["quantity"]*order_array[x]["price"];
        cell3.innerHTML = orderprice
        cell4.innerHTML = order_array[x]["quantity"];  
        total_amount += orderprice
    }
    var row = tbody.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "Total"
    cell3.innerHTML = total_amount
    document.getElementById('searchbar').focus();
    table = document.getElementById('mytable');
    table.rows[2+cursor_pos%(table.rows.length-2)].style.background = "#FFFFFF";
    cursor_pos = 0

}

function genqrcode(){
    var table = document.getElementById('mytable');
    sum=0
    jsonstring="["

    for (var r = 1, n = table.rows.length-1; r < n; r++) {
//        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
            thisid = "course_quant"+r
            //console.log(thisid)
            quantity = Number(document.getElementById(thisid).value)
            price = Number(table.rows[r+1].cells[2].innerHTML)
            name = table.rows[r+1].cells[1].innerHTML
            sum += quantity * price

            if (quantity != 0) {
            	if ( jsonstring != "[" ){
            		jsonstring += ","
            	}
	            jsonstring += '{"name":"' + name +'","quantity":'+quantity+ ',"price":'+price +'}'
	            //alert(jsonstring)
			}

            
//        }
    }
    jsonstring+=']'
    //jsonstring = encodeURIComponent(jsonstring)
    //alert(jsonstring)
    // if(sum == 0) {
    // 	sum = "nothing"
    // }
    // qr = '<img src = "https://api.qrserver.com/v1/create-qr-code/?data='
    // qr += jsonstring
    // qr += '&size=200x200" height = 200 width = 200>'
    prompt_array = JSON.parse(jsonstring_order);
    prompt = "You had "
    for (x in prompt_array) {
    	prompt += prompt_array[x]["quantity"] + '个 ' + prompt_array[x]["name"] + ';'
    }
    prompt += "\nthe total is: " + sum + ". Please scan the QR code below to pay"
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



// document.addEventListener("keyup", function(event) {


// });

// $('.document.getElementById("searchbar")').each(function() {
//    var elem = $(this);

//    // Save current value of element
//    elem.data('oldVal', elem.val());

//    // Look for changes in the value
//    elem.bind("propertychange keyup input paste", function(event){
//       // If value has changed...
//       if (elem.data('oldVal') != elem.val()) {
//        // Updated stored value
//        elem.data('oldVal', elem.val());
//        //console.log("lol")
//        // Do action
//      }
//    });
//  });
document.getElementById("searchbar").addEventListener("paste", function(event) {
    console.log("paste");
    // if(event)
    //     searchstring = document.getElementById('searchbar').value
    //     console.log(searchstring)
    //     totalmenu_array = JSON.parse(totalmenustring)
    //     console.log(totalmenustring)
    //     menustring = '['
    //     if (searchstring !="") {
    //         for (x in totalmenu_array) {
    //             if(totalmenu_array[x]["name"].indexOf(searchstring) > -1) {
    //                 if(menustring != "["){
    //                     menustring+=","
    //                 }
    //                 newchild = '{"name":"'+totalmenu_array[x]["name"]+'", "price":'+totalmenu_array[x]["price"]+' }'
                    
    //                 menustring +=newchild
    //                 console.log("here: "+menustring)
    //             }       
    //         }

    //         menustring+=']'
    //         console.log(menustring)
    //         loadtable();
    //     } else {
    //         menustring+= "]"
    //         loadtable();
});
document.getElementById("searchbar").addEventListener("click", function(event) {
    console.log("click");
    // if(event)
    //     searchstring = document.getElementById('searchbar').value
    //     console.log(searchstring)
    //     totalmenu_array = JSON.parse(totalmenustring)
    //     console.log(totalmenustring)
    //     menustring = '['
    //     if (searchstring !="") {
    //         for (x in totalmenu_array) {
    //             if(totalmenu_array[x]["name"].indexOf(searchstring) > -1) {
    //                 if(menustring != "["){
    //                     menustring+=","
    //                 }
    //                 newchild = '{"name":"'+totalmenu_array[x]["name"]+'", "price":'+totalmenu_array[x]["price"]+' }'
                    
    //                 menustring +=newchild
    //                 console.log("here: "+menustring)
    //             }       
    //         }

    //         menustring+=']'
    //         console.log(menustring)
    //         loadtable();
    //     } else {
    //         menustring+= "]"
    //         loadtable();
});
document.getElementById("searchbar").addEventListener("keyup", function(event) {
    console.log("keyup");
    if(event)
        searchstring = document.getElementById('searchbar').value
        console.log(searchstring)
        totalmenu_array = JSON.parse(totalmenustring)
        console.log(totalmenustring)
        menustring = '['
        if (searchstring !="") {
            for (x in totalmenu_array) {
                if(totalmenu_array[x]["name"].indexOf(searchstring) > -1) {
                    if(menustring != "["){
                        menustring+=","
                    }
                    newchild = '{"name":"'+totalmenu_array[x]["name"]+'", "price":'+totalmenu_array[x]["price"]+' }'
                    
                    menustring +=newchild
                    console.log("here: "+menustring)
                }       
            }

            menustring+=']'
            console.log(menustring)
            loadtable();
        } else {
            menustring+= "]"
            loadtable();
        }
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13 && event.ctrlKey) {
        //console.log("up")
        genqrcode();
    }
});
document.getElementById("mytable").addEventListener("keyup", function(event) {
    if (event.keyCode == 38) {
        //console.log("down")
        keyup();
    }
    else if (event.keyCode == 40) {
        //console.log("up")
        keydown_render();
    }
    else if (event.keyCode == 13) {
        //console.log("up")
        addorder();
    }
    else {
        // searchstring = document.getElementById('searchbar').value
        // console.log(searchstring)
        // totalmenu_array = JSON.parse(totalmenustring)
        // console.log(totalmenustring)
        // menustring = '['
        // if (searchstring !="") {
        //     for (x in totalmenu_array) {
        //         if(totalmenu_array[x]["name"].indexOf(searchstring) > -1) {
        //             if(menustring != "["){
        //                 menustring+=","
        //             }
        //             newchild = '{"name":"'+totalmenu_array[x]["name"]+'", "price":'+totalmenu_array[x]["price"]+' }'
                    
        //             menustring +=newchild
        //             console.log("here: "+menustring)
        //         }       
        //     }

        //     menustring+=']'
        //     console.log(menustring)
        //     loadtable();
        // } else {
        //     menustring+= "]"
        //     loadtable();
        
    }
});     

virgin = 1

function keyup(){
        //console.log(thisid)

        cursor_pos--;
        while(cursor_pos<0){
            cursor_pos+=4;
        }
        var table = document.getElementById("mytable");
        table.rows[2+(cursor_pos+1)%(table.rows.length-2)].style.background = "#FFFFFF";
        table.rows[2+cursor_pos%(table.rows.length-2)].style.background = "#FFBF00";
        focusthis = "course_quant" + (1+cursor_pos%(table.rows.length-2))
        document.getElementById(focusthis).focus();
}
function keydown_render(){
        //console.log(thisid)
        cursor_pos++;
        var table = document.getElementById("mytable");
        table.rows[2+(cursor_pos-1)%(table.rows.length-2)].style.background = "#FFFFFF";
        table.rows[2+cursor_pos%(table.rows.length-2)].style.background = "#FFBF00";
        focusthis = "course_quant" + (1+cursor_pos%(table.rows.length-2))
        document.getElementById(focusthis).focus();
        //console.log(table.rows[2+cursor_pos%(table.rows.length-2)].cells[3]);
        //console.log(cursor_pos)
        //console.log(table.rows.length)

}
totalmenustring = '[{"name":"Kung Pao Chicken","price":10}, {"name":"Spicy Chicken","price":12},{"name":"Salmon","price":100},{"name":"Unit","price":1}]'
//menustring = '[{"name":"Salad","price":10}, {"name":"Shit","price":12},{"name":"Fuck you","price":100}]'
function loadtable(){
    //console.log(menustring)
    menu_array = JSON.parse(menustring)
    var table = document.getElementById("mytable");
    tbody = table.getElementsByTagName("tbody")[0];

    tbody.innerHTML = ""
    total_amount = 0
    for (x in menu_array){

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = tbody.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        // Add some text to the new cells:
        cell1.innerHTML = x
        cell2.innerHTML = menu_array[x]["name"];
        menuprice = menu_array[x]["price"];
        cell3.innerHTML = menuprice
        thisinputbox = 'course_quant' + (Number(x) + 1)
        //console.log(thisinputbox)
        cell4.innerHTML = '<input id="'+thisinputbox + '">'
        //total_amount += menuprice
    }
}
