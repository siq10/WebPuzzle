<html>
<head>
   <style>

* {
  margin: 0;
  padding: 0;
  text-align:center;
}

body {
  background-color: #fafafa;
}

table {
  color: #333;
  font-size: .9em;
  font-weight: 300;
  line-height: 40px;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid #ed1c40;
  width: 500px;
  margin: 50px auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.16);
  border-radius: 2px;
}

th {
  background: #ed1c40;
  color: #fff;
  border: none;
}

tr:hover:not(th) {background-color: rgba(237,28,64,.1);}


input[type="button"] {
    transition: all .3s;
    border: 1px solid #ddd;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 15px;
}

input[type="button"]:not(.active) {
    background-color:transparent;
}

.active {
    background-color: #ff4d4d;
    color :#fff;
}

input[type="button"]:hover:not(.active) {
    background-color: #ddd;
}


   </style>


</head>
<body>

<table  id="myTable">
						<thead>
							<tr>
								<th>Position</th>
								<th>Name</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
						<?php
							session_start();
							$conn = mysqli_connect("localhost","root","","monster_party");
							
						
							$sql = "SELECT user.username,sum(user_map.score) FROM user
										LEFT JOIN user_map ON user_map.USER_ID = user.id
										GROUP BY user.id
										ORDER BY 2 DESC";
						
							$result = mysqli_query($conn,$sql);
							if (!$result) {
								printf("Error: %s\n", mysqli_error($conn));
								exit();
							}
							$rownum=0;
							while($row = mysqli_fetch_array($result,MYSQLI_BOTH)){
								if($row[0]!=null){
									$rownum++;
									if($row[1]!=null){
										echo "<tr><td>".$rownum."</td><td>".$row[0]."</td><td>".$row[1]."</td></tr>";
									}
									else{
										echo "<tr><td>".$rownum."</td><td>".$row[0]."</td><td>0</td></tr>";
									}
								}
							}
							if($rownum==0){
								echo "<tr><td></td><td>No Player Found</td><td></td></tr>";
							}
							
							mysqli_free_result($result);
							
							?>
							
						</tbody>
						
					</table>
<table id="myTable1">
    <tr>
        <th>Position</th>
        <th>Name</th>
        <th>Score</th>
    </tr>
    <tr>
        <td>first row col1</td>
        <td>first row col2</td>
        <td>first row col3</td>
    </tr>
    <tr>
        <td>row #2 col1</td>
        <td>row #2 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #3 col1</td>
        <td>row #3 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #4 col1</td>
        <td>row #4 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #5 col1</td>
        <td>row #5 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #6 col1</td>
        <td>row #6 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #7 col1</td>
        <td>row #7 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #8 col1</td>
        <td>row #8 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #9 col1</td>
        <td>row #9 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #10 col1</td>
        <td>row #10 col2</td>
        <td>row #2 col2</td>
    </tr>
    <tr>
        <td>row #11 col1</td>
        <td>row #11 col2</td>
    </tr>
</table>

<script> 

var table = document.getElementById("myTable"),
// number of rows per page
n = 5,
// number of rows of the table
rowCount = table.rows.length,

// get the first cell's tag name (in the first row)
firstRow = table.rows[0].firstElementChild.tagName,
// boolean var to check if table has a head row
hasHead = (firstRow === "TH"),
// an array to hold each row
tr = [],
// loop counters, to start count from rows[1] (2nd row) if the first row has a head tag
i,ii,j = (hasHead)?1:0,
// holds the first row if it has a (<TH>) & nothing if (<TD>)
th = (hasHead?table.rows[(0)].outerHTML:"");
console.log(rowCount);
// count the number of pages
var pageCount = Math.ceil(rowCount / n);
// if we had one page only, then we have nothing to do ..
if (pageCount > 1) {
    // assign each row outHTML (tag name & innerHTML) to the array
    for (i = j,ii = 0; i < rowCount; i++, ii++)
        tr[ii] = table.rows[i].outerHTML;
    // create a div block to hold the buttons
    table.insertAdjacentHTML("afterend","<div id='buttons'></div");
    // the first sort, default page is the first one
    sort(1);
}

// (p) is the selected page number. it will be generated when a user clicks a button
function sort(p) {
    /* create (rows) a variable to hold the group of rows
    ** to be displayed on the selected page,
    ** (s) the start point .. the first row in each page, Do The Math
    */
    var rows = th,s = ((n * p)-n);
    for (i = s; i < (s+n) && i < tr.length; i++)
        rows += tr[i];
    
    // now the table has a processed group of rows ..
    table.innerHTML = rows;
    // create the pagination buttons
    document.getElementById("buttons").innerHTML = pageButtons(pageCount,p);
    // CSS Stuff
    document.getElementById("id"+p).setAttribute("class","active");
}


// (pCount) : number of pages,(cur) : current page, the selected one ..
function pageButtons(pCount,cur) {
    /* this variables will disable the "Prev" button on 1st page
       and "next" button on the last one */
    var prevDis = (cur == 1)?"disabled":"",
        nextDis = (cur == pCount)?"disabled":"",
        /* this (buttons) will hold every single button needed
        ** it will creates each button and sets the onclick attribute
        ** to the "sort" function with a special (p) number..
        */
        buttons = "<input type='button' value='&lt;&lt; Prev' onclick='sort("+(cur - 1)+")' "+prevDis+">";
    for (i=1; i<=pCount;i++)
        buttons += "<input type='button' id='id"+i+"'value='"+i+"' onclick='sort("+i+")'>";
    buttons += "<input type='button' value='Next &gt;&gt;' onclick='sort("+(cur + 1)+")' "+nextDis+">";
    return buttons;
}
</script>

</body>

</html>