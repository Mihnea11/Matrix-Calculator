function isNumber(val) {
	val = val + "";
	if (val.length < 1)
		return false;
	if (isNaN(val)) {
		return false;
	}
	else {
		return true;
	}
}

function isInteger(val) {
	if (isNumber(val)) {
		return val % 1 === 0;
	}
	else {
		return false;
	}
}
function formatNum(inNum) {
	outStr = "" + inNum;
	inNum = parseFloat(outStr);
	if ((outStr.length) > 10) {
		outStr = "" + inNum.toPrecision(10);
	}
	if (outStr.indexOf(".") > -1) {
		while (outStr.charAt(outStr.length - 1) == "0") {
			outStr = outStr.substr(0, (outStr.length - 1));
		}
		if (outStr.charAt(outStr.length - 1) == ".")
			outStr = outStr.substr(0, (outStr.length - 1)); return outStr;
	}
	else {
		return outStr;
	}
}

var matrixa = new Array(10);
var matrixb = new Array(10);
for (var i = 0; i < 10; i++) {
	matrixa[i] = new Array(10);
	matrixb[i] = new Array(10);
	for (var j = 0; j < 10; j++) {
		matrixa[i][j] = '';
		matrixb[i][j] = '';
	}
}
function addRemove(arname, arfield, arop) {
	var arFieldName = arname;
	if (arfield == 'row') {
		arFieldName += 'row';
	} else {
		arFieldName += 'column';
	}
	eval("var thisField = document.calcf." + arFieldName);
	var thisValue = thisField.value;
	if (arop == 'add') thisValue++;
	if (arop == 'remove') thisValue--;
	if (thisValue < 1) thisValue = 1;
	if (thisValue > 10) thisValue = 10;
	thisField.value = thisValue;
	readInput(arname);
	updateInput(arname);
	return false;
}
function readInput(mname) {
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			eval("var thisField = document.calcf." + mname + i + j);
			if (!(thisField === undefined)) {
				if (mname == 'a') matrixa[i][j] = thisField.value;
				if (mname == 'b') matrixb[i][j] = thisField.value;
			}
		}
	}
}
function updateInput(mname) {
	eval("var rowField = document.calcf." + mname + "row");
	eval("var columnField = document.calcf." + mname + "column");
	var rowAmt = rowField.value;
	var columnAmt = columnField.value;
	if (rowAmt < 1) {
		rowAmt = 1;
		rowField.value = rowAmt;
	}
	if (rowAmt > 10) {
		rowAmt = 10;
		rowField.value = rowAmt;
	}
	if (columnAmt < 1) {
		columnAmt = 1;
		columnField.value = columnAmt;
	}
	if (columnAmt > 10) {
		columnAmt = 10;
		columnField.value = columnAmt;
	}
	var outHMTL = "<table>";
	for (var i = 0; i < rowAmt; i++) {
		outHMTL += "<tr>";
		for (var j = 0; j < columnAmt; j++) {
			if (mname == 'a') outHMTL += '<td><input type="text" name="a' + i + j + '" value="' + matrixa[i][j] + '" class="in4char"></td>';
			if (mname == 'b') outHMTL += '<td><input type="text" name="b' + i + j + '" value="' + matrixb[i][j] + '" class="in4char"></td>';
		}
		outHMTL += "</tr>";
	}
	outHMTL += "</table>";
	document.getElementById("minput" + mname).innerHTML = outHMTL;
}
function popValue(mname, mtype) {
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var thisVal = mtype;
			if (mtype == 'r') thisVal = Math.floor(Math.random() * 10);
			eval("var thisField = document.calcf." + mname + i + j);
			if (mname == 'a') matrixa[i][j] = thisVal;
			if (mname == 'b') matrixb[i][j] = thisVal;
			if (!(thisField === undefined)) thisField.value = thisVal;
		}
	}
	return false;
}
updateInput('a');
updateInput('b');
var aArray = new Array();
var bArray = new Array();
var resultArray = new Array();
var aValid = true;
var bValid = true;
var aRowAmt = 0;
var bRowAmt = 0;
var aColumnAmt = 0;
var bColumnAmt = 0;
var hasError = false;
var errMsg = "";
function cClear() {
	document.getElementById("resultout").innerHTML = "";
	document.getElementById("resultouta").innerHTML = "";
	document.getElementById("resultoutb").innerHTML = "";
	aValid = true;
	bValid = true;
	hasError = false;
	errMsg = "";
	aArray = new Array();
	bArray = new Array();
	resultArray = new Array();

	var tempRow = document.calcf.arow.value + "";
	var tempColumn = document.calcf.acolumn.value + "";
	if ((tempRow.length > 0) && (tempColumn.length > 0) && (isInteger(tempRow)) && (isInteger(tempColumn))) {
		tempRow = parseInt(tempRow);
		tempColumn = parseInt(tempColumn);
		if ((tempRow > 0) && (tempRow < 11) && (tempColumn > 0) && (tempColumn < 11)) {
			for (var i = 0; i < tempRow; i++) {
				aArray[i] = new Array();
				for (var j = 0; j < tempColumn; j++) {
					eval("var tempVal = document.calcf.a" + i + j + ".value");
					var tempValStr = "" + tempVal;
					if (tempValStr.length > 0) {
						if (!isNumber(tempValStr)) {
							aValid = false;
						} else {
							tempVal = parseFloat(tempVal);
						}
					} else {
						tempVal = 0;
					}
					aArray[i][j] = tempVal;
				}
			}
			aRowAmt = tempRow;
			aColumnAmt = tempColumn;
		} else {
			aValid = false;
		}
	} else {
		aValid = false;
	}
	var tempRow = document.calcf.brow.value + "";
	var tempColumn = document.calcf.bcolumn.value + "";
	if ((tempRow.length > 0) && (tempColumn.length > 0) && (isInteger(tempRow)) && (isInteger(tempColumn))) {
		tempRow = parseInt(tempRow);
		tempColumn = parseInt(tempColumn);
		if ((tempRow > 0) && (tempRow < 11) && (tempColumn > 0) && (tempColumn < 11)) {
			for (var i = 0; i < tempRow; i++) {
				bArray[i] = new Array();
				for (var j = 0; j < tempColumn; j++) {
					eval("var tempVal = document.calcf.b" + i + j + ".value");
					var tempValStr = "" + tempVal;
					if (tempValStr.length > 0) {
						if (!isNumber(tempValStr)) {
							bValid = false;
						} else {
							tempVal = parseFloat(tempVal);
						}
					} else {
						tempVal = 0;
					}
					bArray[i][j] = tempVal;
				}
			}
			bRowAmt = tempRow;
			bColumnAmt = tempColumn;
		} else {
			bValid = false;
		}
	} else {
		bValid = false;
	}
}
function showArray(saArray) {
	var saOut = '<table class="matrixTable"><tr><th></th><th><table>';
	for (var i = 0; i < saArray.length; i++) {
		saOut += '<tr>';
		for (var j = 0; j < saArray[i].length; j++) saOut += '<td>' + formatNum(saArray[i][j]) + '</td>';
		saOut += '</tr>';
	}
	saOut += '</table></th><th></th></tr></table>';
	return saOut;
}
function showErr(seID, seMsg) {
	document.getElementById(seID).innerHTML = seMsg;
}
function showResult(srID, srNote, srVar) {
	document.getElementById(srID).innerHTML = '<h2 class="h2result">Result</h2><table><tr><td valign="top" nowrap><span class="verybigtext">' + srNote + '</span><br><br><a href="#" class="copy" onClick="return cpToA();">Copy To A</a><br><a class="copyOption" href="#" onClick="return cpToB();">Copy To B</a></td><td valign="top">' + srVar + '</td></tr></table>';
}

function cPower(mname) {
	cClear();
	var ctNum = 1;
	var tempArray = new Array();
	var ctDesc = '';
	if (mname == 'a') {
		ctNum = document.calcf.pa.value + "";
		if (!aValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
		}
		if (aRowAmt != aColumnAmt) {
			hasError = true;
			errMsg += '<div class="err">The row and column size need to be the same.</div>';
		}
		tempArray = aArray;
		ctDesc = 'A<sup>' + ctNum + '</sup> =';
	} else {
		ctNum = document.calcf.pb.value + "";
		if (!bValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix B.</div>';
		}
		if (bRowAmt != bColumnAmt) {
			hasError = true;
			errMsg += '<div class="err">The row and column size need to be the same.</div>';
		}
		tempArray = bArray;
		ctDesc = 'B<sup>' + ctNum + '</sup> =';
	}
	if ((ctNum.length < 1) || (!isInteger(ctNum))) {
		errMsg += '<div class="err">Please provide a positive integer power value.</div>';
		hasError = true;
	} else {
		ctNum = parseInt(ctNum);
		if (ctNum < 1) {
			errMsg += '<div class="err">Please provide a positive integer power value.</div>';
			hasError = true;
		}
	}

	if (hasError) {
		showErr("resultout" + mname, errMsg);
	} else {
		resultArray = tempArray;
		var tempSize = tempArray.length;
		for (var m = 0; m < (ctNum - 1); m++) {
			var newResultA = new Array();
			for (var i = 0; i < tempSize; i++) {
				newResultA[i] = new Array();
				for (var j = 0; j < tempSize; j++) {
					newResultA[i][j] = 0;
					for (var k = 0; k < tempSize; k++) {
						newResultA[i][j] += resultArray[i][k] * tempArray[k][j];
					}
				}
			}
			resultArray = newResultA;
		}
		showResult("resultout" + mname, ctDesc, showArray(resultArray));
	}
	return false;
}
function cTimes(mname) {
	cClear();
	var ctNum = 1;
	var tempArray = new Array();
	var ctDesc = '';
	if (mname == 'a') {
		ctNum = document.calcf.ta.value + "";
		if (!aValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
		}
		tempArray = aArray;
		ctDesc = 'A &#215 ' + ctNum + ' =';
	} else {
		ctNum = document.calcf.tb.value + "";
		if (!bValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix B.</div>';
		}
		tempArray = bArray;
		ctDesc = 'B &#215 ' + ctNum + ' =';
	}
	if ((ctNum.length < 1) || (!isNumber(ctNum))) {
		errMsg += '<div class="err">Please provide a value to multiple.</div>';
		hasError = true;
	}

	if (hasError) {
		showErr("resultout" + mname, errMsg);
	} else {
		ctNum = parseFloat(ctNum);
		for (var i = 0; i < tempArray.length; i++) {
			resultArray[i] = new Array();
			for (var j = 0; j < tempArray[i].length; j++) {
				resultArray[i][j] = tempArray[i][j] * ctNum;
			}
		}
		showResult("resultout" + mname, ctDesc, showArray(resultArray));
	}
	return false;
}
function findDet(fdArray, fdSize) {
	if (fdSize < 3) {
		if (fdSize < 2) {
			return fdArray[0][0];
		} else {
			return (fdArray[0][0] * fdArray[1][1] - fdArray[0][1] * fdArray[1][0]);
		}
	} else {
		var signVal = -1;
		var tempOutVal = 0;
		for (var i = 0; i < fdSize; i++) {
			signVal *= -1;
			var tempArray = new Array();
			var c = 0;
			for (var j = 0; j < fdSize; j++) {
				if (i != j) {
					tempArray[c] = new Array();
					for (var k = 1; k < fdSize; k++) {
						tempArray[c][k - 1] = fdArray[j][k];
					}
					c++;
				}
			}
			tempOutVal += signVal * fdArray[i][0] * findDet(tempArray, (fdSize - 1));
		}
		return tempOutVal;
	}
}

function cDeterminant(mname) {
	cClear();
	var cdSize = 1;
	var tempArray = new Array();
	var ctDesc = '';
	if (mname == 'a') {
		if (!aValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
		}
		if (aRowAmt != aColumnAmt) {
			hasError = true;
			errMsg += '<div class="err">The row and column size need to be the same.</div>';
		}
		cdSize = aRowAmt;
		tempArray = aArray;
		ctDesc = 'Determinant of A =';
	} else {
		if (!bValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix B.</div>';
		}
		if (bRowAmt != bColumnAmt) {
			hasError = true;
			errMsg += '<div class="err">The row and column size need to be the same.</div>';
		}
		cdSize = bRowAmt;
		tempArray = bArray;
		ctDesc = 'Determinant of B =';
	}

	if (hasError) {
		showErr("resultout" + mname, errMsg);
	} else {
		document.getElementById("resultout" + mname).innerHTML = '<h2 class="h2result">Result</h2><p class="verybigtext">' + ctDesc + ' ' + findDet(tempArray, cdSize) + '</p>';
	}
	return false;
}
function cInverse(mname) {
	cClear();
	var cdSize = 1;
	var tempArray = new Array();
	var ctDesc = '';
	if (mname == 'a') {
		if (!aValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
		}
		if (aRowAmt != aColumnAmt) {
			hasError = true;
			errMsg += '<div class="err">The row and column size need to be the same.</div>';
		}
		cdSize = aRowAmt;
		tempArray = aArray;
		ctDesc = 'A<sup>-1</sup> =';
	} else {
		if (!bValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix B.</div>';
		}
		if (bRowAmt != bColumnAmt) {
			hasError = true;
			errMsg += '<div class="err">The row and column size need to be the same.</div>';
		}
		cdSize = bRowAmt;
		tempArray = bArray;
		ctDesc = 'B<sup>-1</sup> =';
	}

	if (hasError) {
		showErr("resultout" + mname, errMsg);
	} else {
		var tempDetVal = findDet(tempArray, cdSize);
		if (tempDetVal == 0) {
			showErr("resultout" + mname, '<div class="err">Determinant is 0. Inverse does not exist.</div>');
		} else {
			//create Cofactor Matrix cdSize
			if (cdSize < 2) {
				resultArray[0] = new Array();
				resultArray[0][0] = 1 / tempArray[0][0];
			} else {
				for (var i = 0; i < cdSize; i++) {
					resultArray[i] = new Array();
					for (var j = 0; j < cdSize; j++) {
						var signVal = Math.pow(-1, (i + j));

						var x = 0;
						var y = 0;
						var tempArray2 = new Array();
						for (var m = 0; m < cdSize; m++) {
							if (m != i) {
								tempArray2[x] = new Array();
								y = 0;
								for (var n = 0; n < cdSize; n++) {
									if (n != j) {
										tempArray2[x][y] = tempArray[m][n];
										y++;
									}
								}
								x++;
							}
						}
						resultArray[i][j] = signVal * findDet(tempArray2, (cdSize - 1));
					}
				}

				for (var i = 0; i < cdSize; i++) {
					for (var j = 0; j < cdSize; j++) {
						tempArray[j][i] = resultArray[i][j] / tempDetVal;
					}
				}
				resultArray = tempArray;
			}
			showResult("resultout" + mname, ctDesc, showArray(resultArray));
		}
	}
	return false;
}
function cTranspose(mname) {
	cClear();
	var ctNum = 1;
	var tempArray = new Array();
	var ctDesc = '';
	if (mname == 'a') {
		if (!aValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
		}
		tempArray = aArray;
		ctDesc = 'A<sup>T</sup> =';
	} else {
		if (!bValid) {
			hasError = true;
			errMsg = '<div class="err">Please provide valid data in Matrix B.</div>';
		}
		tempArray = bArray;
		ctDesc = 'B<sup>T</sup> =';
	}
	if (hasError) {
		showErr("resultout" + mname, errMsg);
	} else {
		for (var i = 0; i < tempArray[0].length; i++) {
			resultArray[i] = new Array();
			for (var j = 0; j < tempArray.length; j++) {
				resultArray[i][j] = tempArray[j][i];
			}
		}
		showResult("resultout" + mname, ctDesc, showArray(resultArray));
	}
	return false;
}

function cAdd() {
	cClear();
	if (!aValid) {
		hasError = true;
		errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
	}
	if (!bValid) {
		hasError = true;
		errMsg += '<div class="err">Please provide valid data in Matrix B.</div>';
	}
	if (hasError) {
		showErr("resultout", errMsg);
	} else {
		if ((aRowAmt == bRowAmt) && (aColumnAmt == bColumnAmt)) {
			for (var i = 0; i < aRowAmt; i++) {
				resultArray[i] = new Array();
				for (var j = 0; j < aColumnAmt; j++) {
					resultArray[i][j] = aArray[i][j] + bArray[i][j];
				}
			}
			showResult("resultout", 'A + B =', showArray(resultArray));
		} else {
			showErr("resultout", '<div class="err">Matrix A and B need to be the same in size.</div>');
		}
	}
	return false;
}
function cSub() {
	cClear();
	if (!aValid) {
		hasError = true;
		errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
	}
	if (!bValid) {
		hasError = true;
		errMsg += '<div class="err">Please provide valid data in Matrix B.</div>';
	}
	if (hasError) {
		showErr("resultout", errMsg);
	} else {
		if ((aRowAmt == bRowAmt) && (aColumnAmt == bColumnAmt)) {
			for (var i = 0; i < aRowAmt; i++) {
				resultArray[i] = new Array();
				for (var j = 0; j < aColumnAmt; j++) {
					resultArray[i][j] = aArray[i][j] - bArray[i][j];
				}
			}
			showResult("resultout", 'A &ndash; B =', showArray(resultArray));
		} else {
			showErr("resultout", '<div class="err">Matrix A and B need to be the same in size.</div>');
		}
	}
	return false;
}
function cMultiple() {
	cClear();
	if (!aValid) {
		hasError = true;
		errMsg = '<div class="err">Please provide valid data in Matrix A.</div>';
	}
	if (!bValid) {
		hasError = true;
		errMsg += '<div class="err">Please provide valid data in Matrix B.</div>';
	}
	if (hasError) {
		showErr("resultout", errMsg);
	} else {
		if (aColumnAmt == bRowAmt) {
			for (var i = 0; i < aRowAmt; i++) {
				resultArray[i] = new Array();
				for (var j = 0; j < bColumnAmt; j++) {
					resultArray[i][j] = 0;
					for (var k = 0; k < aColumnAmt; k++) {
						resultArray[i][j] += aArray[i][k] * bArray[k][j];
					}
				}
			}
			showResult("resultout", 'A * B =', showArray(resultArray));
		} else {
			showErr("resultout", '<div class="err">Matrix A column and B row amount need to be the same.</div>');
		}
	}
	return false;
}
function cSwap() {
	cClear();
	readInput('a');
	readInput('b');
	var tempRow = document.calcf.arow.value;
	var tempColumn = document.calcf.acolumn.value;
	document.calcf.arow.value = document.calcf.brow.value;
	document.calcf.acolumn.value = document.calcf.bcolumn.value;
	document.calcf.brow.value = tempRow;
	document.calcf.bcolumn.value = tempColumn;
	var tempArray = matrixa;
	matrixa = matrixb;
	matrixb = tempArray;
	updateInput('a');
	updateInput('b');
	document.getElementById("resultout").innerHTML = '<h2 class="h2result">Result</h2><div>Matrix A and B were swapped.</div>';
	return false;
}
function cpToA() {
	var ctRow = resultArray.length;
	var ctColumn = resultArray[0].length;
	document.calcf.arow.value = ctRow;
	document.calcf.acolumn.value = ctColumn;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			matrixa[i][j] = '';
		}
	}
	for (var i = 0; i < ctRow; i++) {
		for (var j = 0; j < ctColumn; j++) {
			matrixa[i][j] = resultArray[i][j];
		}
	}
	updateInput('a');
	return false;
}
function cpToB() {
	var ctRow = resultArray.length;
	var ctColumn = resultArray[0].length;
	document.calcf.brow.value = ctRow;
	document.calcf.bcolumn.value = ctColumn;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			matrixb[i][j] = '';
		}
	}
	for (var i = 0; i < ctRow; i++) {
		for (var j = 0; j < ctColumn; j++) {
			matrixb[i][j] = resultArray[i][j];
		}
	}
	updateInput('b');
	return false;
}
