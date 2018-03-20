function filterTable(table) {
    var tr, tdall, td, i, j;
    tr = document.getElementById(table).getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tdall = tr[i].getElementsByTagName("td");
        for (j = 0; j < tdall.length - 1; j++) {
            td = tdall[j];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(document.getElementById("search").value.toUpperCase()) > -1) {
                    tr[i].style.display = "";
                    break;
                } else if (j == tdall.length - 2) {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
