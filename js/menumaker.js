function addorder(){
    var table = document.getElementById('mytable');
    sum=0
    jsonstring="["

    for (var r = 1, n = table.rows.length-1; r < n; r++) {
//        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
        thisid = "course_quant"+r
        //console.log(thisid)
        quantity = document.getElementById(thisid).value

        price = Number(table.rows[r+1].cells[2].innerHTML)
        name = table.rows[r+1].cells[1].innerHTML
        sum += quantity * price

        if (quantity != 0) {
            if ( jsonstring != "[" ){
                jsonstring += ","
            }
            // Find a <table> element with id="myTable":

            jsonstring += '{"name":"' + name +'","quantity":'+quantity+ ',"price":'+price +'}'
            //alert(jsonstring)
        }
    }           
    jsonstring+=']'
    console.log(jsonstring)
    order_array = JSON.parse(jsonstring)
    
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
    prompt_array = JSON.parse(jsonstring);
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


    //setInterval(basicboard,33);
    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 38) {
            //console.log("down")
            keyup();
        }
        if (event.keyCode == 40) {
            //console.log("up")
            keydown_render();
        }
        if (event.keyCode == 13) {
            //console.log("up")
            addorder();
        }
        if (event.keyCode == 13 && event.ctrlKey) {
            //console.log("up")
            genqrcode();
        }
        event=""
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