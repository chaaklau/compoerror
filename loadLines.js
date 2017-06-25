var data;

function doSearch(word,resultBox) {
    if (data != null) {
        actualSearch(word,resultBox);
    }
    else {
        $.get("input.txt", function(_data) {
            data = [];
            var templist = _data.split("\r\n\r\n\r\n");
            for (var i = 0; i < templist.length; ++i) {
                var templines = templist[i].split("\r\n");
                while (templines[0] == "") { templines.shift();}
                data.push({meta: templines.shift(), lines: templines});
            }
            actualSearch(word,resultBox);
        });
    }
}

function actualSearch(word,resultBox) {
    $(resultTable).empty();
    var resultCount = 0;
    $.each(data, function(index,entry){
        for (var i = 0; i < entry.lines.length; ++i) {
            if (entry.lines[i].indexOf(word) > -1) {
                $(resultTable).append(generateLine(word,entry,i));
                resultCount++;
            }
        }
    });
    $(resultTable).append("<p><small>共"+resultCount+"項結果</small></p>");
}

function generateLine(word,entry,line) {
	return "<tr><td class='annotation'>"
        + entry.meta + "<br>第"  + (line+1) + "行" + "</td><td class='annotation'>＿＿語"
        + "</td><td>" + entry.lines[line].replace(word,"<span style='color: blue'>"+word+"</span>").replace("(","<span class='tags'>(").replace(")",")</span>")
        + "</td></tr>";
}