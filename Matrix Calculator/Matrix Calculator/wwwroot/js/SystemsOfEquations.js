var matrixa = new Array(5);
var matrixb = new Array(5);

for (var i = 0; i < 5; i++) {
    matrixa[i] = new Array(5);
    matrixb[i] = new Array(5);
    for (var j = 0; j < 5; j++) {
        matrixa[i][j] = '';
        matrixb[i][j] = '';
    }
}

function addDelete(action) {
    document.getElementById("resultOut").innerHTML = '';
    var actionName = action;
    eval("var thisField = document.calcf.nr");
    var thisValue = thisField.value;
    if (actionName == 'add') thisValue++;
    if (actionName == 'remove') thisValue--;

    if (thisValue > 5) thisValue = 5;
    if (thisValue < 2) thisValue = 2;

    thisField.value = thisValue;
    readInput('a');
    readInput('b');
    updateSystem('a');
    updateSystem('b');

    return false;
}

function readInput(mname) {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            eval("var thisField = document.calcf." + mname + i + j);
            if (!(thisField === undefined)) {
                if (mname == 'a') matrixa[i][j] = thisField.value;
                if (mname == 'b') matrixb[i][j] = thisField.value;
            }
        }
    }
}

function updateSystem(mname) {
    eval("var thisField = document.calcf.nr");
    var n = thisField.value;
    if (mname == 'a') {
        var outHtml = '<table>';
        for (var i = 0; i < n; i++) {
            outHtml += '<tr>';
            for (var j = 0; j < n; j++) {
                if (j != n - 1) {
                    outHtml += '<td><input type="text" name="a' + i + j + '" value="' + matrixa[i][j] + '" class="in4char"> X<sub>' + (j + 1) + '</sub> +</td>'; 
                }

                if (j == n - 1) {
                    outHtml += '<td><input type="text" name="a' + i + j + '" value="' + matrixa[i][j] + '" class="in4char"> X<sub>' + (j + 1) + '</sub> =</td>'; 
                }
            }

            outHtml += '</tr>';
        }

        outHtml += '</table>';

        document.getElementById("minputa").innerHTML = outHtml;
    }

    if (mname == 'b') {
        var outHtml = '<table>';
        for (var i = 0; i < n; i++) {
            outHtml += '<tr>';
            for (var j = 0; j < 1; j++) {
                outHtml += '<td><input type="text" name="b' + i + j + '" value="' + matrixb[i][j] + '" class="in4char"></td>';
            }           
            outHtml += '</tr>';
        }

        outHtml += '</table>';
        document.getElementById('minputb').innerHTML = outHtml;
    }
}

function popValue(mtype) {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var thisVal = mtype;
            if (mtype == 'r') thisVal = Math.floor(Math.random() * 10);
            eval("var thisField = document.calcf.a" + i + j);
            matrixa[i][j] = thisVal;
            if (!(thisField === undefined)) thisField.value = thisVal;
        }
    }

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 1; j++) {
            var thisVal = mtype;
            if (mtype == 'r') thisVal = Math.floor(Math.random() * 10);
            eval("var thisField = document.calcf.b" + i + j);
            matrixb[i][j] = thisVal;
            if (!(thisField === undefined)) thisField.value = thisVal;
        }
    }
}

updateSystem('a');
updateSystem('b');

var extendedMatrix = new Array();

function findDet(matrix, size) {
    if (size < 3) {
        if (size < 2) {
            return matrix[0][0];
        }
        else {
            return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
        }
    }
    else {
        var signValue = -1;
        var det = 0;
        for (var i = 0; i < size; i++) {
            signValue *= -1;
            var tempArray = new Array();
            var c = 0;
            for (var j = 0; j < size; j++) {
                if (i != j) {
                    tempArray[c] = new Array();
                    for (var k = 1; k < size; k++) {
                        tempArray[c][k - 1] = matrix[j][k];
                    }
                    c++;
                }
            }
            det += signValue * matrix[i][0] * findDet(tempArray, (size - 1));
        }

        return det;
    }
}

function swap(matrix, row1, row2, col) {
    for (var i = 0; i < col; i++) {
        var temp = matrix[row1][i];
        matrix[row1][i] = matrix[row2][i];
        matrix[row2][i] = temp;
    }
}

function rankOfMatrix(matrix, r, c) {
    var rank = c;
    for (var row = 0; row < rank; row++) {
        if (matrix[row][row] != 0) {
            for (var col = 0; col < r; col++) {
                if (col != row) {
                    var mult = matrix[col][row] / matrix[row][row];

                    for (var i = 0; i < rank; i++) {
                        matrix[col][i] -= mult * matrix[row][i];
                    }
                }
            }
        }
        else {
            var reduce = true;
            for (var i = row + 1; i < r; i++) {
                if (matrix[i][row] != 0) {
                    swap(matrix, row, i, rank);
                    reduce = false;
                    break;
                }
            }

            if (reduce == true) {
                rank--;
                for (var i = 0; i < r; i++) {
                    matrix[i][row] = matrix[i][rank];
                }
            }

            row--;
        }
    }

    return rank;
}

function testCompatibility(){
    readInput('a');
    readInput('b');

    eval("var thisField = document.calcf.nr");
    var message;
    var n = thisField.value;
    var n1 = n;
    n1++;

    for (var i = 0; i < n; i++) {
        extendedMatrix[i] = new Array();
        for (var j = 0; j <= n; j++) {
            if (j == n)
                extendedMatrix[i][j] = matrixb[i][0];
            else
                extendedMatrix[i][j] = matrixa[i][j];
        }
    }

    extendedMatrix[n] = new Array();
    for (var j = 0; j < n1; j++) {
        extendedMatrix[n][j] = 0;
    }

    var tempArray = new Array();
    for (var i = 0; i < n; i++) {
        tempArray[i] = new Array();
        for (var j = 0; j < n; j++) {
            tempArray[i][j] = matrixa[i][j];
        }
    }

    var rank1 = rankOfMatrix(extendedMatrix, n1, n1);
    var rank2 = rankOfMatrix(tempArray, n, n);
    var det = findDet(matrixa, n);

    if (rank1 != rank2) {
        message = 'The system is incosistent and has no solutions.';
    }
    else {
        if (n == thisField.value && det != 0)
            message = 'The system is consistent and has one unique solution.';
        else
            message = 'The system consistent and has an infinity of solutions';
    }

    document.getElementById("resultOut").innerHTML = message;
    updateSystem('a');
    updateSystem('b');
    return false;
}

function swapC(firstMatrix, secondMatrix, fc, sc, size) {
    for (var i = 0; i < size; i++) {
        var temp = firstMatrix[i][fc];
        firstMatrix[i][fc] = secondMatrix[i][sc];
        secondMatrix[i][sc] = temp;
    }

    var det = findDet(firstMatrix, size);
    return det;
}

function solveWithCramer() {
    readInput('a');
    readInput('b');

    eval("var thisField = document.calcf.nr");
    var message;
    var n = thisField.value;

    var det = findDet(matrixa, n);
    if (det != 0) {
        message = 'This system is consistent and has a unique solution.';
    }
    else {
        message = 'This system is inconsistent and has no solution';
    }

    if (message != 'This system is consistent and has a unique solution.') {
        document.getElementById('resultOut').innerHTML = 'This system can not be solved using Cramer Rule';
    }
    else {
        var mes = '<div class="solution">';
        for (var i = 0; i < n; i++) {
            var Det = swapC(matrixa, matrixb, i, 0, n);
            var sol = Det / det;
            mes += ' X <sub>' + (i + 1) + '</sub>=' + sol + '<br />';
            swapC(matrixa, matrixb, i, 0, n);
        }

        mes += '</div>';
        document.getElementById('resultOut').innerHTML = mes;
    }

    return false;
}